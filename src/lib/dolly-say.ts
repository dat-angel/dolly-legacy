import { getMomentById, moments } from "./moments";
import type { Era, Moment } from "./types";
import { ERAS } from "./types";

export type ChatEra = Era | "any";

export interface DollySayResult {
  moment: Moment;
  matchedKeyword?: string;
  requestedEra: ChatEra;
  fromAnotherEra: boolean;
  matched: boolean;
  frame: string;
}

export interface LifeStage {
  era: Era;
  nickname: string;
  sheWas: string;
  years: string;
  greeting: string;
  prompts: { label: string; text: string }[];
  fallbackIds: string[];
}

const FALLBACK_IDS = [
  "do-it-on-purpose",
  "everyone-matters",
  "storm-of-life",
  "dreamer-dream",
  "cup-of-ambition",
];

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "you",
  "your",
  "her",
  "she",
  "his",
  "him",
  "they",
  "them",
  "this",
  "that",
  "what",
  "when",
  "with",
  "from",
  "have",
  "has",
  "had",
  "was",
  "were",
  "are",
  "but",
  "not",
  "how",
  "why",
  "who",
  "would",
  "could",
  "should",
  "about",
  "dolly",
  "say",
  "said",
  "just",
  "like",
  "need",
  "want",
  "feel",
  "felt",
  "really",
  "today",
  "gonna",
  "going",
]);

export const LIFE_STAGES: Record<Era, LifeStage> = {
  "1950s": {
    era: "1950s",
    nickname: "Locust Ridge",
    sheWas: "a girl in a one-room cabin in Locust Ridge, Tennessee",
    years: "1946–1959",
    greeting:
      "Locust Ridge, the 1950s. Twelve kids, a coat sewn from scraps, and songs before she could hold a pencil. Ask her about home, family, or starting out.",
    prompts: [
      { label: "Home", text: "We don't have much money and I feel ashamed" },
      { label: "Family", text: "I want to take care of my family" },
      { label: "Starting out", text: "I want to write but I don't know how to begin" },
    ],
    fallbackIds: ["appalachian-roots", "first-song"],
  },
  "1960s": {
    era: "1960s",
    nickname: "Nashville",
    sheWas: "a young singer on The Porter Wagoner Show, leaving the mountains for Nashville",
    years: "1960–1969",
    greeting:
      "Nashville, the 1960s. Sequins, the Opry dream, and a woman who already knew she wasn't anyone's sidekick. Ask her about work, leaving home, or being underestimated.",
    prompts: [
      { label: "Work", text: "People at work don't take me seriously because I'm a woman" },
      { label: "Leaving", text: "I need to leave a situation that isn't fair" },
      { label: "Voice", text: "I'm tired of being told to stay in my place" },
    ],
    fallbackIds: ["just-because-woman", "porter-wagoner"],
  },
  "1970s": {
    era: "1970s",
    nickname: "Songwriter",
    sheWas: "a songwriter taking back her catalog and writing the songs the world still sings",
    years: "1970–1979",
    greeting:
      "The 1970s. Jolene and I Will Always Love You on the same day, a coat of many colors, and the moment she owned her masters. Ask her about leaving, love, or doing it on purpose.",
    prompts: [
      { label: "Leaving", text: "I need to leave with love, not bitterness" },
      { label: "Who I am", text: "I'm still figuring out who I am" },
      { label: "A song", text: "Someone is trying to take what I love" },
    ],
    fallbackIds: ["business-autonomy", "jolene-and-iwill", "coat-of-many-colors"],
  },
  "1980s": {
    era: "1980s",
    nickname: "9 to 5",
    sheWas: "crossing into film and pop, writing the workplace anthem, and building Dollywood",
    years: "1980–1989",
    greeting:
      "The 1980s. A cup of ambition, Nine to Five, and a theme park in the mountains she never really left. Ask her about work, bosses, or building something of her own.",
    prompts: [
      { label: "Work stress", text: "My boss doesn't respect me and I'm exhausted" },
      { label: "Ambition", text: "I need courage to go after something bigger" },
      { label: "Home", text: "I want to build something that lasts in my hometown" },
    ],
    fallbackIds: ["nine-to-five", "cup-of-ambition", "dollywood"],
  },
  "1990s": {
    era: "1990s",
    nickname: "Imagination Library",
    sheWas: "mailing free books to children because her daddy never learned to read",
    years: "1990–1999",
    greeting:
      "The 1990s. The Imagination Library is born — one book a month, in honor of a father who couldn't read. Ask her about kids, dreams, or giving back.",
    prompts: [
      { label: "Kids", text: "I want to help children in my community" },
      { label: "Dreams", text: "I'm scared my dream is too big" },
      { label: "Reading", text: "Someone I love never learned to read" },
    ],
    fallbackIds: ["imagination-library", "dreamer-dream"],
  },
  "2000s": {
    era: "2000s",
    nickname: "Living legend",
    sheWas: "in the Songwriters Hall of Fame, still talking about storms and deeper roots",
    years: "2000–2009",
    greeting:
      "The 2000s. Hall of Fame sequins and the line she kept giving people in hard weather: storms make trees take deeper roots. Ask her about getting through it.",
    prompts: [
      { label: "Hard times", text: "I'm going through a really tough time right now" },
      { label: "Writing", text: "I want to be taken seriously for my work" },
      { label: "Storms", text: "Everything feels like it's falling apart" },
    ],
    fallbackIds: ["storm-of-life", "songwriters-hall"],
  },
  "2010s": {
    era: "2010s",
    nickname: "Ally",
    sheWas: "showing up for her hometown, and saying out loud that everybody deserves respect",
    years: "2010–2019",
    greeting:
      "The 2010s. Wildfire relief in Gatlinburg, Dollywood on a world stage, and a public stand with LGBTQ+ people. Ask her about belonging, faith, or showing up.",
    prompts: [
      { label: "Acceptance", text: "Someone I love is different and I want to understand" },
      { label: "Belonging", text: "I feel like I don't belong" },
      { label: "Home", text: "My community is hurting and I want to help" },
    ],
    fallbackIds: ["lgbtq-allyship", "everyone-matters", "do-it-on-purpose"],
  },
  "2020s": {
    era: "2020s",
    nickname: "Still showing up",
    sheWas: "in her seventies and eighties, funding a vaccine, standing with Black and trans people, and mailing still more books",
    years: "2020–now",
    greeting:
      "The 2020s. A million dollars for a vaccine, Black lives, trans kids, and 200 million books. Same sparkle. Same spine. Ask her about courage, care, or showing up.",
    prompts: [
      { label: "Courage", text: "I'm scared to speak up and need courage today" },
      { label: "Care", text: "I want to help people who are being treated unfairly" },
      { label: "Health", text: "People around me are sick and I don't know how to help" },
    ],
    fallbackIds: ["blm-support", "trans-support", "covid-vaccine", "everyone-matters"],
  },
};

export const ANY_TIME_STAGE = {
  nickname: "Any time",
  years: "1946–now",
  greeting:
    "Pick a time in her life — or ask from any decade. Replies are words she actually said, tied to the year she said them.",
  prompts: [
    { label: "Work stress", text: "My boss doesn't respect me and I'm exhausted" },
    { label: "Need courage", text: "I'm scared and need courage today" },
    { label: "Acceptance", text: "Someone I love is different and I want to understand" },
    { label: "Giving back", text: "I want to help children in my community" },
    { label: "Hard times", text: "I'm going through a really tough time right now" },
  ],
} as const;

export function isEra(value: string | null | undefined): value is Era {
  return Boolean(value && (ERAS as string[]).includes(value));
}

export function getLifeStage(era: Era): LifeStage {
  return LIFE_STAGES[era];
}

export function getPromptsForEra(era: ChatEra): { label: string; text: string }[] {
  if (era === "any") return [...ANY_TIME_STAGE.prompts];
  return LIFE_STAGES[era].prompts;
}

export function getGreetingForEra(era: ChatEra): string {
  if (era === "any") return ANY_TIME_STAGE.greeting;
  return LIFE_STAGES[era].greeting;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));
}

function scoreMoment(
  moment: Moment,
  words: string[],
  normalized: string,
): { score: number; keyword?: string } {
  const keywords = moment.dollySayKeywords ?? [];
  let bestScore = 0;
  let matchedKeyword: string | undefined;

  for (const keyword of keywords) {
    const kw = keyword.toLowerCase();
    if (kw.length >= 4 && normalized.includes(kw)) {
      const score = kw.length + 18;
      if (score > bestScore) {
        bestScore = score;
        matchedKeyword = keyword;
      }
    }
  }

  for (const word of words) {
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

    const haystack = [
      moment.title,
      ...(moment.tags ?? []),
      moment.quote ?? "",
      moment.summary,
    ]
      .join(" ")
      .toLowerCase();
    if (word.length >= 4 && haystack.includes(word)) {
      const score = word.length + 2;
      if (score > bestScore) {
        bestScore = score;
        matchedKeyword = matchedKeyword ?? word;
      }
    }
  }

  return { score: bestScore, keyword: matchedKeyword };
}

function pickFallback(ids: string[], excludeIds: string[]): Moment {
  const found = ids
    .map((id) => getMomentById(id))
    .filter((moment): moment is Moment => moment !== undefined);
  const unused = found.filter((moment) => !excludeIds.includes(moment.id));
  const pool = unused.length > 0 ? unused : found;
  return pool[0] ?? moments[0];
}

export function frameDollyReply(
  moment: Moment,
  requestedEra: ChatEra,
  matched: boolean,
): string {
  const stage = LIFE_STAGES[moment.era];
  const when = moment.year ? String(moment.year) : `the ${moment.era}`;

  if (requestedEra !== "any" && requestedEra !== moment.era) {
    return `She wasn't on record about that in the ${requestedEra}. Closest words: ${when}, when she was ${stage.sheWas}.`;
  }

  if (!matched) {
    return `From ${when}, when she was ${stage.sheWas} — she didn't say that exactly, but this is what she was living:`;
  }

  return `From ${when}, when she was ${stage.sheWas}:`;
}

export function replyFromMoment(
  moment: Moment,
  requestedEra: ChatEra,
  matchedKeyword?: string,
  matched = true,
): DollySayResult {
  return {
    moment,
    matchedKeyword,
    requestedEra,
    fromAnotherEra: requestedEra !== "any" && requestedEra !== moment.era,
    matched,
    frame: frameDollyReply(moment, requestedEra, matched),
  };
}

export function whatWouldDollySay(
  input: string,
  options: { era?: ChatEra; excludeIds?: string[] } = {},
): DollySayResult {
  const requestedEra: ChatEra = options.era ?? "any";
  const excludeIds = options.excludeIds ?? [];
  const normalized = input.toLowerCase().trim();
  const words = tokenize(normalized);

  const pool =
    requestedEra === "any"
      ? moments
      : moments.filter((moment) => moment.era === requestedEra);
  const searchable =
    pool.filter((moment) => !excludeIds.includes(moment.id)).length > 0
      ? pool.filter((moment) => !excludeIds.includes(moment.id))
      : pool;

  let best: { moment: Moment; score: number; keyword?: string } | null = null;

  for (const moment of searchable) {
    const { score, keyword } = scoreMoment(moment, words, normalized);
    if (score > 0 && (!best || score > best.score)) {
      best = { moment, score, keyword };
    }
  }

  if (best) {
    return replyFromMoment(best.moment, requestedEra, best.keyword, true);
  }

  const fallbackIds =
    requestedEra === "any" ? FALLBACK_IDS : LIFE_STAGES[requestedEra].fallbackIds;
  const fallback = pickFallback(fallbackIds, excludeIds);
  return replyFromMoment(fallback, requestedEra, undefined, false);
}

export const DOLLY_SAY_PLACEHOLDERS = [
  "I'm scared to speak up at work…",
  "Someone I love came out to me",
  "I feel like I don't belong",
  "I need courage today",
  "My boss doesn't respect me",
  "I want to help my community",
];

export const DOLLY_SAY_PROMPTS = ANY_TIME_STAGE.prompts;
