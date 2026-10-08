/**
 * AI Retrieval — TypeScript port of services/ai_retrieval.py
 *
 * Scores and retrieves the most relevant portfolio context items
 * for a given visitor query using keyword/token matching.
 */

import { normalizeText, isSafeUrl } from "./context";
import { AIConfigValues } from "./config";

// ─── Stop words (identical to Python source) ─────────────────────────────────

const STOPWORDS = new Set([
  "i","me","my","myself","we","our","ours","ourselves","you","your","yours",
  "yourself","yourselves","he","him","his","himself","she","her","hers","herself",
  "it","its","itself","they","them","their","theirs","themselves","what","which",
  "who","whom","this","that","these","those","am","is","are","was","were","be",
  "been","being","have","has","had","having","do","does","did","doing","a","an",
  "the","and","but","if","or","because","as","until","while","of","at","by","for",
  "with","about","against","between","into","through","during","before","after",
  "above","below","to","from","up","down","in","out","on","off","over","under",
  "again","further","then","once","here","there","when","where","why","how","all",
  "any","both","each","few","more","most","other","some","such","no","nor","not",
  "only","own","same","so","than","too","very","s","t","can","will","just","don",
  "should","now",
]);

const INTENT_MAP: Record<string, string[]> = {
  projects: ["project","work","showcase","featured"],
  "machine learning": ["ml","ai","artificial intelligence","machine learning","deep learning"],
  "data analysis": ["data analyst","data analysis","bi","dashboards","tableau","excel"],
  dashboards: ["dashboard","visualization","chart"],
  "web development": ["web","frontend","backend","fullstack","website","flask","django"],
  skills: ["skills","technologies","tools","languages"],
  certificates: ["certificate","certs","certification","completed"],
  experience: ["experience","job","work experience","history","employment"],
  blog: ["blog","article","post","writing"],
  "client work": ["client work","freelance","contract","collaboration"],
  contact: ["contact","email","message","reach","linkedin","github"],
  resume: ["resume","cv","pdf","hire"],
};

// ─── Tokenization ────────────────────────────────────────────────────────────

export function cleanAndTokenize(text: string): Set<string> {
  if (!text) return new Set();
  const cleaned = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  return new Set(tokens.filter((t) => !STOPWORDS.has(t)));
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

function setIntersectionSize(a: Set<string>, b: Set<string>): number {
  let count = 0;
  for (const item of a) { if (b.has(item)) count++; }
  return count;
}

function matchScore(
  item: Record<string, unknown>,
  queryLower: string,
  queryTokens: Set<string>
): number {
  let score = 0;
  const itemType = item.type as string | undefined;

  const title = ((item.title as string) ?? "").toLowerCase();
  const name = ((item.name as string) ?? "").toLowerCase();
  const category = ((item.category as string) ?? "").toLowerCase();
  const primaryText = title || name;

  if (primaryText && queryLower.includes(primaryText)) score += 15;
  if (category && queryLower.includes(category)) score += 8;

  const primaryTokens = cleanAndTokenize(primaryText);
  score += setIntersectionSize(queryTokens, primaryTokens) * 5;
  score += setIntersectionSize(queryTokens, cleanAndTokenize(category)) * 4;

  if (itemType === "project") {
    const tech = String(item.techStack ?? item.tech_stack ?? "").toLowerCase();
    const tags = String(item.tags ?? "").toLowerCase();
    score += setIntersectionSize(queryTokens, cleanAndTokenize(tech + " " + tags)) * 3.5;
    score += setIntersectionSize(queryTokens, cleanAndTokenize(String(item.shortDescription ?? item.short_description ?? "").toLowerCase())) * 2;
    score += setIntersectionSize(queryTokens, cleanAndTokenize(String(item.description ?? "").toLowerCase())) * 0.8;
  } else if (itemType === "certificate") {
    score += setIntersectionSize(queryTokens, cleanAndTokenize(((item.platform as string) ?? "").toLowerCase())) * 3;
  } else if (itemType === "experience") {
    const jobTitle = ((item.jobTitle as string) ?? "").toLowerCase();
    const company = ((item.company as string) ?? "").toLowerCase();
    score += setIntersectionSize(queryTokens, cleanAndTokenize(jobTitle + " " + company)) * 4;
    score += setIntersectionSize(queryTokens, cleanAndTokenize(((item.description as string) ?? "").toLowerCase())) * 1;
  } else if (itemType === "blog_post") {
    const excerpt = ((item.excerpt as string) ?? "").toLowerCase();
    const tags = String(item.tags ?? "").toLowerCase();
    score += setIntersectionSize(queryTokens, cleanAndTokenize(excerpt + " " + tags)) * 1.5;
  } else if (itemType === "client_work") {
    score += setIntersectionSize(queryTokens, cleanAndTokenize(((item.clientLabel as string) ?? "").toLowerCase())) * 3;
    score += setIntersectionSize(queryTokens, cleanAndTokenize(((item.shortDescription as string) ?? "").toLowerCase())) * 1.5;
  }

  return score;
}

// ─── Main retrieval function ──────────────────────────────────────────────────

export interface RetrievalResult {
  query: string;
  items: Record<string, unknown>[];
  sources: { type: string; title: string; url: string }[];
  matchedCategories: string[];
  truncated: boolean;
  totalCandidates: number;
}

export function retrievePortfolioContext(
  query: string,
  publicContext: Record<string, unknown>,
  config: AIConfigValues
): RetrievalResult {
  const cleanQuery = normalizeText(query, config.maxInputChars) ?? "";
  const queryLower = cleanQuery.toLowerCase();
  const queryTokens = cleanAndTokenize(queryLower);

  // Intent expansion
  const expandedTokens = new Set(queryTokens);
  const matchedIntents = new Set<string>();
  for (const [intent, aliases] of Object.entries(INTENT_MAP)) {
    for (const alias of aliases) {
      if (queryLower.includes(alias)) {
        matchedIntents.add(intent);
        for (const t of cleanAndTokenize(intent)) expandedTokens.add(t);
      }
    }
  }

  // Score all candidates across all list categories
  const listKeys = ["projects","skills","certificates","experiences","blog_posts","client_work"];
  const candidates: [number, Record<string, unknown>][] = [];

  for (const key of listKeys) {
    const items = publicContext[key] as Record<string, unknown>[] | undefined;
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      const score = matchScore(item, queryLower, expandedTokens);
      if (score > 0) candidates.push([score, item]);
    }
  }

  // Deterministic sort: descending score, then type, then title
  candidates.sort(([scoreA, itemA], [scoreB, itemB]) => {
    if (scoreB !== scoreA) return scoreB - scoreA;
    const typeA = (itemA.type as string) ?? "";
    const typeB = (itemB.type as string) ?? "";
    if (typeA !== typeB) return typeA.localeCompare(typeB);
    const titleA = ((itemA.title as string) ?? (itemA.name as string) ?? "");
    const titleB = ((itemB.title as string) ?? (itemB.name as string) ?? "");
    return titleA.localeCompare(titleB);
  });

  const maxItems = config.maxRetrievedItems;
  const retrieved = candidates.slice(0, maxItems).map(([, item]) => item);

  // Extract sources
  const sources: { type: string; title: string; url: string }[] = [];
  const seenUrls = new Set<string>();
  for (const item of retrieved) {
    const url = (item.sourceUrl as string) ?? (item.source_url as string);
    if (url && isSafeUrl(url) && !seenUrls.has(url)) {
      sources.push({
        type: (item.type as string) ?? "",
        title: ((item.title as string) ?? (item.name as string) ?? ""),
        url,
      });
      seenUrls.add(url);
    }
  }

  if (retrieved.length === 0) {
    sources.push({ type: "fallback_navigation", title: "Contact Page", url: "/contact" });
  }

  return {
    query: cleanQuery,
    items: retrieved,
    sources,
    matchedCategories: [...matchedIntents],
    truncated: candidates.length > maxItems,
    totalCandidates: candidates.length,
  };
}
