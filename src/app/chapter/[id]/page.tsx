import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterPortrait } from "@/components/ChapterPortrait";
import { MomentCard } from "@/components/ChapterSection";
import { JsonLd } from "@/components/JsonLd";
import { ShareMenuClient } from "@/components/ShareMenuClient";
import { StitchDivider } from "@/components/decorative";
import { getChapterImage } from "@/lib/images";
import { createPageMetadata, truncateForMeta } from "@/lib/metadata";
import { getAllMomentsByChapter } from "@/lib/moments";
import {
  getChapterShareText,
  getChapterShareUrl,
  getMomentShareUrl,
} from "@/lib/share";
import { absoluteUrl } from "@/lib/site";
import { CHAPTERS, type Chapter } from "@/lib/types";

export function generateStaticParams() {
  return CHAPTERS.map((chapter) => ({ id: chapter.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/chapter/[id]">): Promise<Metadata> {
  const { id } = await params;
  const chapter = CHAPTERS.find((c) => c.id === id);
  if (!chapter) return { title: "Chapter — Dolly Legacy" };

  return createPageMetadata({
    title: chapter.title,
    description: truncateForMeta(chapter.subtitle),
    path: `/chapter/${chapter.id}`,
    keywords: [chapter.title, chapter.id, "Dolly Parton chapter", "Dolly Parton timeline"],
    ogType: "article",
    ogImage: {
      url: `/images/chapters/${chapter.id}.jpg`,
      alt: getChapterImage(chapter.id as Chapter).alt,
    },
  });
}

export default async function ChapterPage({ params }: PageProps<"/chapter/[id]">) {
  const { id } = await params;
  const chapter = CHAPTERS.find((c) => c.id === id);
  if (!chapter) notFound();

  const chapterId = chapter.id as Chapter;
  const chapterMoments = getAllMomentsByChapter(chapterId);
  const portrait = getChapterImage(chapterId);
  const shareUrl = getChapterShareUrl(chapterId);
  const shareText = getChapterShareText(chapterId);

  const chapterJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: chapter.title,
    description: chapter.subtitle,
    url: shareUrl,
    image: absoluteUrl(portrait.src),
    isPartOf: {
      "@type": "WebSite",
      name: "Dolly Legacy",
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "Person",
      name: "Dolly Parton",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={chapterJsonLd} />
      <Link href="/#life" className="text-sm font-semibold text-gold hover:text-burgundy">
        ← Back to her life
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
            {chapter.title}
          </h1>
          <p className="mt-4 text-lg text-burgundy/80">{chapter.subtitle}</p>
          <ShareMenuClient
            title={chapter.title}
            text={shareText}
            url={shareUrl}
            imageSrc={portrait.src}
            className="mt-6"
          />
          <StitchDivider className="my-10 max-w-md" />
          <div className="grid gap-6 md:grid-cols-2">
            {chapterMoments.map((moment, i) => (
              <MomentCard
                key={moment.id}
                moment={moment}
                index={i}
                shareUrl={getMomentShareUrl(moment.id)}
              />
            ))}
          </div>
        </div>
        <ChapterPortrait image={portrait} priority className="mx-auto w-full max-w-sm" />
      </div>
    </div>
  );
}
