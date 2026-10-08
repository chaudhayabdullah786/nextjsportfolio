/**
 * POST /api/assistant/chat
 *
 * Next.js Route Handler — TypeScript port of routes/api.py
 *
 * Security:
 * - Request size limit
 * - Content-Type validation
 * - JSON schema validation via Zod
 * - Input character limits (via AI config)
 * - Rate limiting NOTE: implement via middleware or edge config when deploying
 * - No-store cache headers
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { askAssistant, FALLBACK_DISABLED, FALLBACK_UNAVAILABLE, FALLBACK_TIMEOUT } from "@/lib/ai/assistant";
import { getAIConfig } from "@/lib/ai/config";

// ─── Zod schema ───────────────────────────────────────────────────────────────

const HistoryItemSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const ChatRequestSchema = z.object({
  message: z.string().min(1),
  history: z.array(HistoryItemSchema).default([]),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function noStoreHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    Pragma: "no-cache",
    "X-Content-Type-Options": "nosniff",
  };
}

function errorResponse(
  code: string,
  message: string,
  status: number
): NextResponse {
  return NextResponse.json(
    { ok: false, error: { code, message } },
    { status, headers: noStoreHeaders() }
  );
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const config = getAIConfig();

  // Content-Type check
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return errorResponse(
      "unsupported_media_type",
      "Content-Type must be application/json",
      415
    );
  }

  // Request size check
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > config.maxRequestBytes) {
    return errorResponse(
      "payload_too_large",
      "The assistant request is too large.",
      413
    );
  }

  // Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return errorResponse("invalid_json", "Malformed JSON in request body.", 400);
  }

  // Actual payload size check
  const bodyStr = JSON.stringify(rawBody);
  if (bodyStr.length > config.maxRequestBytes) {
    return errorResponse(
      "payload_too_large",
      "The assistant request is too large.",
      413
    );
  }

  // Schema validation
  const parsed = ChatRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const isMessage = firstIssue?.path[0] === "message";
    return errorResponse(
      isMessage ? "invalid_message" : "invalid_request",
      firstIssue?.message ?? "Invalid request body.",
      isMessage ? 422 : 400
    );
  }

  const { message, history } = parsed.data;

  // Message length check
  if (message.length > config.maxInputChars) {
    return errorResponse(
      "invalid_message",
      `Message exceeds maximum limit of ${config.maxInputChars} characters.`,
      422
    );
  }

  // Call assistant service
  const result = await askAssistant(message, history);

  // Map fallback answers to specific error codes (matching Flask behaviour)
  if (result.answer === FALLBACK_DISABLED) {
    return errorResponse("assistant_disabled", result.answer, 503);
  }
  if (result.answer === FALLBACK_UNAVAILABLE) {
    return errorResponse("assistant_unavailable", result.answer, 503);
  }
  if (result.answer === FALLBACK_TIMEOUT) {
    return errorResponse("assistant_timeout", result.answer, 504);
  }

  return NextResponse.json(
    { ok: true, answer: result.answer, sources: result.sources },
    { status: 200, headers: noStoreHeaders() }
  );
}
