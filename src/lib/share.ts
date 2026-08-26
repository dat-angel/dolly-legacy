import type { Chapter, Era, Moment } from "./types";
import { CHAPTERS } from "./types";
import { absoluteUrl, FALLBACK_SITE_URL, getSiteUrl } from "./site";

export { FALLBACK_SITE_URL, getSiteUrl, absoluteUrl };

export function getMomentShareUrl(momentId: string): string {
  return absoluteUrl(`/moment/${momentId}`);
}

export function getChapterShareUrl(chapterId: Chapter): string {
  return absoluteUrl(`/chapter/${chapterId}`);
}

export function getEraShareUrl(era: Era): string {
  return absoluteUrl(`/moments?era=${encodeURIComponent(era)}`);
}

export function getDollySayShareUrl(momentId: string, query?: string): string {
  const params = new URLSearchParams({ dolly: momentId });
  if (query?.trim()) params.set("q", query.trim());
  return absoluteUrl(`/?${params.toString()}#what-would-dolly-say`);
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

export function getInstagramCaption(text: string, url: string): string {
  return `${text}\n\n${url}\n\n#DollyParton #DollyLegacy`;
}

export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: truncateShareText(text, 220),
    url,
  });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function getBlueskyShareUrl(text: string, url: string): string {
  const budget = Math.max(80, 300 - url.length - 1);
  const composed = `${truncateShareText(text, budget)}\n${url}`;
  return `https://bsky.app/intent/compose?text=${encodeURIComponent(composed)}`;
}

export function getThreadsShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text: truncateShareText(text, 400),
    url,
  });
  return `https://www.threads.com/intent/post?${params.toString()}`;
}

export function truncateShareText(text: string, max: number): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trim()}…`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(input);
      return ok;
    } catch {
      return false;
    }
  }
}

async function getShareImageFile(imageSrc?: string): Promise<File | undefined> {
  if (!imageSrc || typeof window === "undefined") return undefined;
  try {
    const src = imageSrc.startsWith("http")
      ? imageSrc
      : `${window.location.origin}${imageSrc.startsWith("/") ? "" : "/"}${imageSrc}`;
    const response = await fetch(src);
    if (!response.ok) return undefined;
    const blob = await response.blob();
    const name = imageSrc.split("/").pop() || "dolly-legacy.jpg";
    return new File([blob], name, { type: blob.type || "image/jpeg" });
  } catch {
    return undefined;
  }
}

export async function shareContent(options: {
  title: string;
  text: string;
  url: string;
  imageSrc?: string;
}): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      const file = await getShareImageFile(options.imageSrc);
      const payload: ShareData = {
        title: options.title,
        text: `${options.text}\n${options.url}`,
      };
      if (file && navigator.canShare?.({ files: [file] })) {
        payload.files = [file];
      } else {
        payload.url = options.url;
      }
      await navigator.share(payload);
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return "failed";
    }
  }

  const copied = await copyToClipboard(`${options.text}\n${options.url}`);
  return copied ? "copied" : "failed";
}
