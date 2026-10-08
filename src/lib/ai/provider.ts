/**
 * AI Provider — TypeScript port of services/ai_provider.py + providers/gemini.py
 *
 * Abstracts the Gemini API call behind a provider interface.
 * Uses @google/generative-ai with timeout enforcement.
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { AIConfigValues } from "./config";
import { HistoryMessage, SYSTEM_INSTRUCTIONS } from "./prompt";

// ─── Error types ─────────────────────────────────────────────────────────────

export class AIProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIProviderError";
  }
}

export class AIProviderUnavailableError extends AIProviderError {
  constructor(message: string) {
    super(message);
    this.name = "AIProviderUnavailableError";
  }
}

export class AIProviderTimeoutError extends AIProviderError {
  constructor(message: string) {
    super(message);
    this.name = "AIProviderTimeoutError";
  }
}

export class AIProviderConfigurationError extends AIProviderError {
  constructor(message: string) {
    super(message);
    this.name = "AIProviderConfigurationError";
  }
}

// ─── Response type ────────────────────────────────────────────────────────────

export interface AIProviderResponse {
  text: string;
  provider: string;
  model: string;
  finishReason: string | null;
}

// ─── Gemini provider ──────────────────────────────────────────────────────────

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new AIProviderTimeoutError("AI provider timed out.")),
        timeoutMs
      )
    ),
  ]);
}

export async function generateChatResponse(
  config: AIConfigValues,
  history: HistoryMessage[],
  message: string
): Promise<AIProviderResponse> {
  if (!config.enabled) {
    throw new AIProviderUnavailableError("The AI assistant is currently disabled.");
  }
  if (!config.configured) {
    throw new AIProviderConfigurationError("The AI assistant is not fully configured.");
  }
  if (config.provider !== "gemini") {
    throw new AIProviderConfigurationError(
      `Unsupported provider: ${config.provider}`
    );
  }

  const genAI = new GoogleGenerativeAI(config.apiKey);

  const model = genAI.getGenerativeModel({
    model: config.model,
    systemInstruction: SYSTEM_INSTRUCTIONS,
    generationConfig: {
      maxOutputTokens: config.maxOutputTokens,
      temperature: 0.3,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });

  // Build Gemini-format history (exclude last user message — sent as current)
  const geminiHistory = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const chat = model.startChat({ history: geminiHistory });

  const result = await withTimeout(
    chat.sendMessage(message),
    config.timeoutSeconds * 1000
  );

  const text = result.response.text();
  const finishReason =
    result.response.candidates?.[0]?.finishReason?.toString() ?? null;

  return {
    text,
    provider: "gemini",
    model: config.model,
    finishReason,
  };
}
