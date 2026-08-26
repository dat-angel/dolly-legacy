import type { MetadataRoute } from "next";
import { moments } from "@/lib/moments";
import { absoluteUrl } from "@/lib/site";
import { CHAPTERS } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/moments"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/images"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const chapterRoutes: MetadataRoute.Sitemap = CHAPTERS.map((chapter) => ({
    url: absoluteUrl(`/chapter/${chapter.id}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const momentRoutes: MetadataRoute.Sitemap = moments.map((moment) => ({
    url: absoluteUrl(`/moment/${moment.id}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...chapterRoutes, ...momentRoutes];
}
