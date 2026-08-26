import { getMomentCount } from "./moments";

export const FALLBACK_SITE_URL = "https://www.dollyparton.page";
export const CANONICAL_SITE_URL = "https://www.dollyparton.page";

export const SITE = {
  name: "Dolly Legacy",
  title: "Dolly Legacy — A celebration of Dolly Parton",
  tagline: "Songs, books, backbone, and an open database you can remix",
  shortDescription:
    "Play Dolly's life, ask what she'd say, and remix the open quotes-and-credits database.",
  keywords: [
    "Dolly Parton",
    "Dolly Parton celebration",
    "Imagination Library",
    "Dollywood",
    "Dolly Parton quotes",
    "Dolly Parton philanthropy",
    "country music history",
    "Dolly Parton advocacy",
    "9 to 5",
    "Jolene",
    "Coat of Many Colors",
    "Dolly Parton LGBTQ ally",
    "Dolly Parton literacy",
    "women in country music",
    "Appalachian music",
  ],
  creator: "Dolly Legacy contributors",
  repository: "https://github.com/dat-angel/dolly-legacy",
  locale: "en_US",
  themeColor: "#e2b422",
  backgroundColor: "#f7f1e1",
} as const;

export function getSiteDescription(): string {
  return `A scrapbook of Dolly Parton — ${getMomentCount()} moments, quotes, song and film stories, and the people she stood with. Open CC BY 4.0 data for anyone to use.`;
}

export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/$/, "");
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "");
  if (vercelHost && !vercelHost.includes("vercel.app")) {
    return `https://${vercelHost}`;
  }

  return FALLBACK_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
