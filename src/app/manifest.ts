import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteDescription, SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: SITE.name,
    description: getSiteDescription(),
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: SITE.backgroundColor,
    theme_color: SITE.themeColor,
    lang: "en-US",
    categories: ["entertainment", "education", "music"],
    icons: [
      {
        src: absoluteUrl("/icon"),
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: absoluteUrl("/apple-icon"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: absoluteUrl("/apple-icon"),
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: absoluteUrl("/opengraph-image"),
        sizes: "1200x630",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
