import type { Chapter, Era, Moment } from "./types";
import { CHAPTERS } from "./types";

const FALLBACK_SITE_URL = "https://dolly-legacy.vercel.app";

export function getSiteUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
}

export function buildAbsoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function getMomentShareUrl(momentId: string): string {
  return buildAbsoluteUrl(`/moment/${momentId}`);
}

export function getChapterShareUrl(chapterId: Chapter): string {
  return buildAbsoluteUrl(`/chapter/${chapterId}`);
}

export function getEraShareUrl(era: Era): string {
  return buildAbsoluteUrl(`/moments?era=${encodeURIComponent(era)}`);
}

export function getDollySayShareUrl(momentId: string, query?: string): string {
  const params = new URLSearchParams({ dolly: momentId });
  if (query?.trim()) params.set("q", query.trim());
  return buildAbsoluteUrl(`/?${params.toString()}#what-would-dolly-say`);
}

export function getMomentShareText(moment: Moment): string {
  if (moment.quote) {
    return `"${moment.quote}" — ${moment.title}${moment.year ? ` (${moment.year})` : ""}`;
  }
  return `${moment.title}${moment.year ? ` (${moment.year})` : ""}: ${moment.summary}`;
}

export function getChapterShareText(chapterId: Chapter): string {
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) return "Dolly Legacy — a tribute to Dolly Parton";
  return `${chapter.title} — ${chapter.subtitle}`;
}

export function getEraShareText(era: Era): string {
  return `Explore Dolly Parton in the ${era} — moments, quotes, and stories from the Dolly Legacy tribute.`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function shareContent(options: {
  title: string;
  text: string;
  url: string;
}): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text,
        url: options.url,
      });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "failed";
    }
  }

  const copied = await copyToClipboard(`${options.text}\n${options.url}`);
  return copied ? "copied" : "failed";
}

export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text,
    url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function getFacebookShareUrl(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}
