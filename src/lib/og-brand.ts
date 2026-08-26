export const OG_SIZE = { width: 1200, height: 630 } as const;
export const STORY_SIZE = { width: 1080, height: 1920 } as const;

export const OG_COLORS = {
  burgundy: "#3d3126",
  burgundyDeep: "#2a221b",
  hotPink: "#e2b422",
  gold: "#e2b422",
  cream: "#fbf6ea",
  blush: "#efe4cc",
  forest: "#5c4332",
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
