export const OG_SIZE = { width: 1200, height: 630 } as const;
export const STORY_SIZE = { width: 1080, height: 1920 } as const;

export const OG_COLORS = {
  burgundy: "#1c1814",
  burgundyDeep: "#0c0b09",
  hotPink: "#c9a227",
  gold: "#c9a227",
  cream: "#f7f3ea",
  blush: "#e7dfd0",
} as const;

export const OG_BRAND = {
  eyebrow: "DOLLY LEGACY",
  footer: "dolly-legacy.vercel.app",
} as const;

export function truncateOg(text: string, max = 140): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trim()}…`;
}
