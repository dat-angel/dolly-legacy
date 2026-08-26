export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  burgundy: "#5c1830",
  burgundyDeep: "#3d0f20",
  hotPink: "#e91e8c",
  gold: "#d4a017",
  cream: "#fff8f0",
  blush: "#ffc8d4",
} as const;

export const OG_BRAND = {
  eyebrow: "Dolly Legacy · Fan Tribute",
  footer: "dolly-legacy · music · generosity · kindness",
} as const;

export function truncateOg(text: string, max = 140): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trim()}…`;
}
