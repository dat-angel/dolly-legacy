"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { AnimatePresence } from "framer-motion";
import {
  getAllMomentsByChapter,
  getMomentById,
} from "@/lib/moments";
import { getChapterImage } from "@/lib/images";
import {
  getChapterShareText,
  getChapterShareUrl,
  getMomentShareUrl,
} from "@/lib/share";
import type { Chapter, Moment } from "@/lib/types";
import { CHAPTERS } from "@/lib/types";
import { ChapterPortrait } from "./ChapterPortrait";
import { MomentCard } from "./ChapterSection";
import { MomentDrawer } from "./MomentDrawer";
import { ShareMenu } from "./ShareMenu";
import { Typewriter } from "./Typewriter";
import { StitchDivider } from "./decorative";
import { dollyButtonClass } from "./ui/DollyButton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CHAPTER_ACCENTS: Record<
  Chapter,
  { bg: string; label: string; number: string }
> = {
  origins: { bg: "section-warm", label: "Chapter I", number: "01" },
  music: { bg: "section-golden", label: "Chapter II", number: "02" },
  building: { bg: "section-mountain", label: "Chapter III", number: "03" },
  giving: { bg: "section-warm", label: "Chapter IV", number: "04" },
  standing: { bg: "section-golden", label: "Chapter V", number: "05" },
};

interface InteractiveChapterSectionProps {
  title: string;
  subtitle: string;
  featuredMoments: Moment[];
  id: string;
  chapterId: Chapter;
  typewriterQuote?: string;
}

export function InteractiveChapterSection({
  title,
  subtitle,
  featuredMoments,
  id,
  chapterId,
  typewriterQuote,
}: InteractiveChapterSectionProps) {
  const accent = CHAPTER_ACCENTS[chapterId];
  const portrait = getChapterImage(chapterId);
  const allMoments = getAllMomentsByChapter(chapterId);
  const chapterMeta = CHAPTERS.find((c) => c.id === chapterId);

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Moment | null>(null);
  const [revealedFacts, setRevealedFacts] = useState(false);

  const visibleMoments = expanded ? allMoments : featuredMoments;
  const shareUrl = getChapterShareUrl(chapterId);
  const shareText = getChapterShareText(chapterId);

  const deepLinkHandled = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || deepLinkHandled.current) return;
    const params = new URLSearchParams(window.location.search);
    const chapterParam = params.get("chapter");
    const momentParam = params.get("moment");

    if (chapterParam === chapterId) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    if (momentParam) {
      const moment = getMomentById(momentParam);
      if (moment?.chapter === chapterId) {
        deepLinkHandled.current = true;
        startTransition(() => {
          setSelected(moment);
          setExpanded(true);
        });
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chapterId, id]);

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 px-4 py-12 md:scroll-mt-20 md:px-6 md:py-24", accent.bg)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              {accent.label}
            </p>
            <h2 className="font-serif text-3xl font-bold text-burgundy-deep md:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-burgundy/75">{subtitle}</p>
            <ShareMenu
              title={chapterMeta?.title ?? title}
              text={shareText}
              url={shareUrl}
              imageSrc={portrait.src}
              className="mt-5"
              compact
              label="Share chapter"
            />
          </div>
          <ChapterPortrait
            image={portrait}
            priority={chapterId === "origins"}
            className="mx-auto lg:mx-0"
          />
        </div>

        {typewriterQuote && (
          <div className="typewriter-frame mb-12 rounded-sm p-6 md:p-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                9 to 5 · Hotel Bel-Air, 1980
              </p>
              <ShareMenu
                title="9 to 5 — Dolly Parton"
                text={`"${typewriterQuote.slice(0, 120)}…"`}
                url={`${shareUrl}#typewriter`}
                compact
                label="Share quote"
              />
            </div>
            <Typewriter
              text={typewriterQuote}
              className="text-burgundy-deep"
              speed={38}
            />
            <p className="mt-4 text-sm leading-relaxed text-burgundy/65">
              She wrote it on a typewriter, clicking her nails on the keys to
              get the rhythm right.
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={dollyButtonClass("secondary", "min-h-11 w-full text-sm sm:w-auto")}
          >
            {expanded
              ? "Show featured only"
              : `Explore all ${allMoments.length} moments`}
          </button>
          <button
            type="button"
            onClick={() => setRevealedFacts((v) => !v)}
            className={cn(
              "min-h-11 rounded-sm border px-4 py-2 text-sm font-semibold transition",
              revealedFacts
                ? "border-gold bg-gold/20 text-burgundy-deep"
                : "border-gold/40 text-burgundy hover:border-gold",
            )}
          >
            {revealedFacts ? "Hide extra facts" : "Show extra facts"}
          </button>
          <Link
            href={`/chapter/${chapterId}`}
            className="text-sm font-semibold text-gold hover:text-burgundy"
          >
            Open chapter page →
          </Link>
        </div>

        <StitchDivider className="mb-10" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleMoments.map((m, i) => (
            <MomentCard
              key={m.id}
              moment={m}
              showHidden={revealedFacts}
              index={i}
              shareUrl={getMomentShareUrl(m.id)}
              onOpen={() => setSelected(m)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <MomentDrawer
            moment={selected}
            onClose={() => setSelected(null)}
            onSelect={setSelected}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
