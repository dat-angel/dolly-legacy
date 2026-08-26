import type { Metadata } from "next";
import { createPageMetadata } from "./metadata";
import { PREVIEW_IMAGES } from "./preview-images";
import { getSiteDescription, getSiteUrl, SITE, absoluteUrl } from "./site";

export function getRootMetadata(): Metadata {
  const description = getSiteDescription();
  const base = createPageMetadata({
    title: SITE.title,
    description,
    path: "/",
    ogType: "website",
    includeStoryImage: false,
    ogImage: {
      url: "/opengraph-image",
      alt: PREVIEW_IMAGES.allyship.alt,
    },
  });

  return {
    ...base,
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: SITE.title,
      template: `%s | ${SITE.name}`,
    },
    description,
    applicationName: SITE.name,
    openGraph: {
      ...base.openGraph,
      title: SITE.title,
      description,
      url: absoluteUrl("/"),
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      ...base.twitter,
      title: SITE.title,
      description,
    },
    icons: {
      icon: [
        { url: "/icon", type: "image/png", sizes: "32x32" },
        { url: "/apple-icon", type: "image/png", sizes: "180x180" },
      ],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
      shortcut: "/icon",
    },
    appleWebApp: {
      capable: true,
      title: SITE.name,
      statusBarStyle: "default",
    },
    formatDetection: {
      telephone: false,
    },
    other: {
      "apple-mobile-web-app-title": SITE.name,
      "og:site_name": SITE.name,
    },
  };
}
