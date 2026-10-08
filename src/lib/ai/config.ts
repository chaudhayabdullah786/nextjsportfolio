/**
 * AI Configuration module.
 * TypeScript port of services/ai_config.py.
 * Reads all AI settings from environment variables with clamped defaults.
 */

function clamp(valStr: string | undefined, min: number, max: number, defaultVal: number): number {
  const parsed = parseInt(valStr ?? "", 10);
  if (isNaN(parsed)) return defaultVal;
  return Math.min(max, Math.max(min, parsed));
}

export interface AIConfigValues {
  enabled: boolean;
  provider: string;
  apiKey: string;
  model: string;
  timeoutSeconds: number;
  maxInputChars: number;
  maxOutputTokens: number;
  maxHistoryMessages: number;
  maxHistoryChars: number;
  maxContextChars: number;
  maxRetrievedItems: number;
  maxPromptChars: number;
  rateLimitPerMinute: number;
  rateLimitPerDay: number;
  maxRequestBytes: number;
  configured: boolean;
  ready: boolean;
}

export function getAIConfig(): AIConfigValues {
  const enabled =
    (process.env.AI_ASSISTANT_ENABLED ?? "false").toLowerCase() === "true";
  const provider = (process.env.AI_PROVIDER ?? "gemini").toLowerCase();
  const apiKey = process.env.GEMINI_API_KEY ?? "";
  const model = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";

  const timeoutSeconds = clamp(process.env.AI_TIMEOUT_SECONDS, 3, 15, 8);
  const maxInputChars = clamp(process.env.AI_MAX_INPUT_CHARS, 100, 2000, 1000);
  const maxOutputTokens = clamp(process.env.AI_MAX_OUTPUT_TOKENS, 64, 500, 250);
  const maxHistoryMessages = clamp(process.env.AI_MAX_HISTORY_MESSAGES, 0, 10, 6);
  const maxHistoryChars = clamp(process.env.AI_MAX_HISTORY_CHARS, 0, 6000, 3000);
  const maxContextChars = clamp(process.env.AI_MAX_CONTEXT_CHARS, 2000, 20000, 12000);
  const maxRetrievedItems = clamp(process.env.AI_MAX_RETRIEVED_ITEMS, 1, 15, 8);
  const maxPromptChars = clamp(process.env.AI_MAX_PROMPT_CHARS, 5000, 30000, 18000);
  const rateLimitPerMinute = clamp(process.env.AI_RATE_LIMIT_PER_MINUTE, 1, 30, 5);
  const rateLimitPerDay = clamp(process.env.AI_RATE_LIMIT_PER_DAY, 5, 500, 50);
  const maxRequestBytes = clamp(process.env.AI_MAX_REQUEST_BYTES, 4096, 32768, 16384);

  const configured =
    provider === "gemini" &&
    apiKey.trim().length > 0 &&
    model.trim().length > 0;

  const ready = enabled && configured;

  return {
    enabled,
    provider,
    apiKey,
    model,
    timeoutSeconds,
    maxInputChars,
    maxOutputTokens,
    maxHistoryMessages,
    maxHistoryChars,
    maxContextChars,
    maxRetrievedItems,
    maxPromptChars,
    rateLimitPerMinute,
    rateLimitPerDay,
    maxRequestBytes,
    configured,
    ready,
  };
}
