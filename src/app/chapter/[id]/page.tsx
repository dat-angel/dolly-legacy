import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterPortrait } from "@/components/ChapterPortrait";
import { MomentCard } from "@/components/ChapterSection";
import { ShareMenuClient } from "@/components/ShareMenuClient";
import { StitchDivider } from "@/components/decorative";
import { dollyButtonClass } from "@/components/ui/DollyButton";
import { getChapterImage } from "@/lib/images";
import { getAllMomentsByChapter } from "@/lib/moments";
import {
  getChapterShareText,
  getChapterShareUrl,
  getMomentShareUrl,
} from "@/lib/share";
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

  const url = getChapterShareUrl(chapter.id);
  return {
    title: `${chapter.title} — Dolly Legacy`,
    description: chapter.subtitle,
    openGraph: {
      title: `${chapter.title} — Dolly Legacy`,
      description: chapter.subtitle,
      url,
      type: "article",
    },
  };
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/" className="text-sm font-semibold text-hot-pink hover:text-burgundy">
        ← Back to exhibit
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="font-script text-3xl text-hot-pink">Chapter share page</p>
          <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
            {chapter.title}
          </h1>
          <p className="mt-4 text-lg text-burgundy/80">{chapter.subtitle}</p>
          <ShareMenuClient
            title={chapter.title}
            text={shareText}
            url={shareUrl}
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
