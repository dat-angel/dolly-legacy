import type { Metadata } from "next";
import { absoluteUrl, SITE } from "./site";

type OgType = "website" | "article";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: OgType;
  ogImage?: string | { url: string; alt: string };
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogType = "website",
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const mergedKeywords = [...new Set([...SITE.keywords, ...keywords])];
  const image =
    typeof ogImage === "string"
      ? { url: ogImage, alt: title }
      : ogImage;

  return {
    title,
    description,
    keywords: mergedKeywords,
    authors: [{ name: SITE.creator, url: SITE.repository }],
    creator: SITE.creator,
    publisher: SITE.name,
    category: "entertainment",
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: ogType,
      ...(image
        ? {
            images: [
              {
                url: image.url.startsWith("http")
                  ? image.url
                  : absoluteUrl(image.url),
                width: 1200,
                height: 630,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@dat_angel",
      ...(image
        ? {
            images: [
              image.url.startsWith("http") ? image.url : absoluteUrl(image.url),
            ],
          }
        : {}),
    },
  };
}

export function truncateForMeta(text: string, max = 155): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trim()}…`;
}

export function getMomentMetaDescription(moment: {
  quote?: string;
  summary: string;
}): string {
  if (moment.quote && moment.summary) {
    return truncateForMeta(`"${moment.quote}" — ${moment.summary}`);
  }
  return truncateForMeta(moment.quote ?? moment.summary);
}

export function getMomentOgAlt(moment: {
  title: string;
  quote?: string;
}): string {
  if (moment.quote) {
    return `${moment.title}: "${moment.quote}" — Dolly Legacy`;
  }
  return `${moment.title} — Dolly Legacy`;
}
