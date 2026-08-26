import type { MetadataRoute } from "next";
import { absoluteUrl, SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: SITE.name,
    description: SITE.shortDescription,
    start_url: "/",
    scope: "/",
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
    ],
  };
}
