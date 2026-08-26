export const FALLBACK_SITE_URL = "https://dolly-legacy.vercel.app";

export const SITE = {
  name: "Dolly Legacy",
  title: "Dolly Legacy — A Tribute to Dolly Parton",
  tagline: "Music, philanthropy, and grace across eight decades",
  description:
    "Explore Dolly Parton's life in an interactive tribute — 28 curated moments, chapter-by-chapter exhibits, the Imagination Library, and her advocacy for literacy, Black communities, LGBTQ+ people, and working women.",
  shortDescription:
    "Interactive Dolly Parton tribute with quotes, history, and shareable moments from the Imagination Library to today.",
  keywords: [
    "Dolly Parton",
    "Dolly Parton tribute",
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
  themeColor: "#2c4034",
  backgroundColor: "#f6f1e4",
} as const;

export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin.replace(/\/$/, "");
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }

  return FALLBACK_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
