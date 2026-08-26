import momentsData from "@/content/moments.json";
import type { Category, Chapter, Era, Moment, Mood } from "./types";

export interface MomentsDatabaseMeta {
  name: string;
  version: string;
  description?: string;
  license: "CC-BY-4.0";
  licenseUrl?: string;
  attribution: string;
  repository?: string;
  schema?: string;
  thirdPartyNotice?: string;
}

export interface MomentsDatabase {
  meta: MomentsDatabaseMeta;
  moments: Moment[];
}

const database = momentsData as MomentsDatabase;

export const momentsMeta = database.meta;
export const moments = database.moments;

export function getMomentCount(): number {
  return moments.length;
}

export function getMomentById(id: string): Moment | undefined {
  return moments.find((m) => m.id === id);
}

export function getFeaturedMoments(): Moment[] {
  return moments.filter((m) => m.featured);
}

export function getMomentsByChapter(chapter: Chapter): Moment[] {
  return moments.filter((m) => m.chapter === chapter && m.featured);
}

export function getAllMomentsByChapter(chapter: Chapter): Moment[] {
  return moments.filter((m) => m.chapter === chapter);
}

export function getRelatedMoments(moment: Moment): Moment[] {
  if (!moment.relatedIds?.length) return [];
  return moment.relatedIds
    .map((id) => getMomentById(id))
    .filter((m): m is Moment => m !== undefined);
}

export function filterMoments(options: {
  category?: Category | "all";
  era?: Era | "all";
  tag?: string;
  search?: string;
}): Moment[] {
  const { category = "all", era = "all", tag, search } = options;
  const q = search?.toLowerCase().trim();

  return moments
    .filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (era !== "all" && m.era !== era) return false;
      if (tag && !m.tags.includes(tag)) return false;
      if (q) {
        const haystack = [
          m.title,
          m.summary,
          m.body,
          m.quote,
          m.hiddenFact,
          ...m.tags,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const yearA = a.year ?? Number.MAX_SAFE_INTEGER;
      const yearB = b.year ?? Number.MAX_SAFE_INTEGER;
      if (yearA !== yearB) return yearA - yearB;
      return a.title.localeCompare(b.title);
    });
}

export function getRandomMoment(mood?: Mood): Moment {
  const pool = mood
    ? moments.filter((m) => m.moodTags?.includes(mood))
    : moments;
  const source = pool.length > 0 ? pool : moments;
  return source[Math.floor(Math.random() * source.length)];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  moments.forEach((m) => m.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getImpactStats() {
  const born = new Date(1946, 0, 19);
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  if (
    now.getMonth() < born.getMonth() ||
    (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())
  ) {
    age -= 1;
  }

  return {
    books: "240M+",
    songs: "3,000+",
    countries: "5",
    years: String(age),
  };
}

export function getOnThisDayMoment(): Moment | null {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  if (month === 1 && day === 19) {
    return getMomentById("dolly-parton-day") ?? getMomentById("appalachian-roots") ?? null;
  }
  if (month === 4 && day === 2) {
    return getMomentById("covid-vaccine") ?? null;
  }
  if (month === 3 && day === 3) {
    return getMomentById("covid-vaccine") ?? null;
  }

  return null;
}
