export const OG_SIZE = { width: 1200, height: 630 } as const;
export const STORY_SIZE = { width: 1080, height: 1920 } as const;

export const OG_COLORS = {
  burgundy: "#1e3556",
  burgundyDeep: "#162844",
  hotPink: "#c4a046",
  gold: "#c4a046",
  cream: "#faf6ec",
  blush: "#ece4d2",
  forest: "#2c4034",
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
