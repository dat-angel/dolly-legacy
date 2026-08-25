import { getMomentById, moments } from "./moments";
import type { Moment } from "./types";

export interface DollySayResult {
  moment: Moment;
  matchedKeyword?: string;
}

const FALLBACK_IDS = [
  "do-it-on-purpose",
  "everyone-matters",
  "storm-of-life",
  "dreamer-dream",
  "cup-of-ambition",
];

function scoreMoment(moment: Moment, words: string[]): { score: number; keyword?: string } {
  const keywords = moment.dollySayKeywords ?? [];
  let bestScore = 0;
  let matchedKeyword: string | undefined;

  for (const word of words) {
    if (word.length < 3) continue;
    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      if (word === kw || kw.includes(word) || word.includes(kw)) {
        const score = kw.length + (word === kw ? 10 : 0);
        if (score > bestScore) {
          bestScore = score;
          matchedKeyword = keyword;
        }
      }
    }
  }

  return { score: bestScore, keyword: matchedKeyword };
}

export function whatWouldDollySay(input: string): DollySayResult {
  const normalized = input.toLowerCase().trim();
  const words = normalized.split(/\s+/).filter(Boolean);

  let best: { moment: Moment; score: number; keyword?: string } | null = null;

  for (const moment of moments) {
    const { score, keyword } = scoreMoment(moment, words);
    if (score > 0 && (!best || score > best.score)) {
      best = { moment, score, keyword };
    }
  }

  if (best) {
    return { moment: best.moment, matchedKeyword: best.keyword };
  }

  const fallbackId =
    FALLBACK_IDS[Math.floor(Math.random() * FALLBACK_IDS.length)];
  return { moment: getMomentById(fallbackId)! };
}

export const DOLLY_SAY_PLACEHOLDERS = [
  "I'm scared to speak up at work…",
  "Someone I love came out to me",
  "I feel like I don't belong",
  "I need courage today",
  "My boss doesn't respect me",
  "I want to help my community",
];

export const DOLLY_SAY_PROMPTS = [
  { label: "Work stress", text: "My boss doesn't respect me and I'm exhausted" },
  { label: "Need courage", text: "I'm scared and need courage today" },
  { label: "Acceptance", text: "Someone I love is different and I want to understand" },
  { label: "Giving back", text: "I want to help children in my community" },
  { label: "Hard times", text: "I'm going through a really tough time right now" },
];
