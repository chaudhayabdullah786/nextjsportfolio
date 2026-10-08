/**
 * AI Assistant — TypeScript port of services/ai_assistant.py
 *
 * Orchestrates the full RAG pipeline:
 * 1. Validate config
 * 2. Clean input
 * 3. Build public context
 * 4. Retrieve relevant items
 * 5. Build prompt
 * 6. Call provider
 * 7. Return structured result
 */

import { getAIConfig } from "./config";
import { buildPublicContext, normalizeText } from "./context";
import { retrievePortfolioContext } from "./retrieval";
import { buildPrompt, normalizeHistory, HistoryMessage } from "./prompt";
import {
  generateChatResponse,
  AIProviderTimeoutError,
  AIProviderError,
} from "./provider";

// ─── Fallback messages (matching Python source exactly) ──────────────────────

export const FALLBACK_DISABLED =
  "The portfolio assistant is currently disabled.";
export const FALLBACK_UNAVAILABLE =
  "The portfolio assistant is temporarily unavailable. Please explore the Projects page or use the Contact page.";
export const FALLBACK_TIMEOUT =
  "The portfolio assistant took too long to respond. Please try again shortly.";

// ─── Result type ─────────────────────────────────────────────────────────────

export interface AssistantResult {
  answer: string;
  sources: { type: string; title: string; url: string }[];
  provider: string;
  model: string;
  retrievedItemsCount: number;
}

// ─── Main service function ────────────────────────────────────────────────────

export async function askAssistant(
  question: string,
  history: HistoryMessage[]
): Promise<AssistantResult> {
  const config = getAIConfig();

  if (!config.enabled) {
    return {
      answer: FALLBACK_DISABLED,
      sources: [],
      provider: config.provider,
      model: config.model,
      retrievedItemsCount: 0,
    };
  }

  if (!config.configured) {
    return {
      answer: FALLBACK_UNAVAILABLE,
      sources: [],
      provider: config.provider,
      model: config.model,
      retrievedItemsCount: 0,
    };
  }

  // 1. Clean visitor question
  const cleanQuestion = normalizeText(question, config.maxInputChars);
  if (!cleanQuestion?.trim()) {
    return {
      answer: "Please enter a valid message.",
      sources: [],
      provider: config.provider,
      model: config.model,
      retrievedItemsCount: 0,
    };
  }

  try {
    // 2. Build public context (requires DB access — server-side only)
    const publicContext = await buildPublicContext(config);

    // 3. Retrieve relevant items
    const retrievalResult = retrievePortfolioContext(
      cleanQuestion,
      publicContext as unknown as Record<string, unknown>,
      config
    );

    // 4. Build prompt
    const cleanHistory = normalizeHistory(history, config);
    buildPrompt(cleanQuestion, retrievalResult, cleanHistory, config);

    // 5. Call provider (uses cleanHistory + cleanQuestion directly)
    const providerResponse = await generateChatResponse(
      config,
      cleanHistory,
      cleanQuestion
    );

    return {
      answer: providerResponse.text,
      sources: retrievalResult.sources,
      provider: providerResponse.provider,
      model: providerResponse.model,
      retrievedItemsCount: retrievalResult.items.length,
    };
  } catch (err) {
    if (err instanceof AIProviderTimeoutError) {
      return {
        answer: FALLBACK_TIMEOUT,
        sources: [],
        provider: config.provider,
        model: config.model,
        retrievedItemsCount: 0,
      };
    }
    if (err instanceof AIProviderError) {
      return {
        answer: FALLBACK_UNAVAILABLE,
        sources: [],
        provider: config.provider,
        model: config.model,
        retrievedItemsCount: 0,
      };
    }
    // Unexpected errors — silent fallback, no leakage
    return {
      answer: FALLBACK_UNAVAILABLE,
      sources: [],
      provider: config.provider,
      model: config.model,
      retrievedItemsCount: 0,
    };
  }
}
