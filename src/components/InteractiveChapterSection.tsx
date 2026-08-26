"use client";

import { useEffect, useState } from "react";
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
import { Rhinestone, StitchDivider } from "./decorative";
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const chapterParam = params.get("chapter");
    const momentParam = params.get("moment");

    if (chapterParam === chapterId) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    if (momentParam) {
      const moment = getMomentById(momentParam);
      if (moment?.chapter === chapterId) {
        setSelected(moment);
        setExpanded(true);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chapterId, id]);

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 px-6 py-16 md:py-24", accent.bg)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="font-script text-2xl text-hot-pink md:text-3xl">
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
              className="mt-5"
              compact
              label={`Share ${title}`}
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
              <div className="flex items-center gap-2">
                <Rhinestone size={16} className="text-gold" />
                <p className="font-script text-2xl text-burgundy">
                  click-clack — written on a typewriter
                </p>
              </div>
              <ShareMenu
                title="9 to 5 — Dolly Parton"
                text={`"${typewriterQuote.slice(0, 120)}…"`}
                url={`${shareUrl}#typewriter`}
                compact
                label="Share typewriter quote"
              />
            </div>
            <Typewriter
              text={typewriterQuote}
              className="text-burgundy-deep"
              speed={38}
            />
            <p className="mt-4 font-script text-xl text-burgundy/55">
              Dolly clicked her acrylic nails on a typewriter at the Hotel
              Bel-Air to get the rhythm just right.
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={dollyButtonClass("secondary", "text-sm")}
          >
            {expanded
              ? "Show featured only"
              : `Explore all ${allMoments.length} moments`}
          </button>
          <button
            type="button"
            onClick={() => setRevealedFacts((v) => !v)}
            className={cn(
              "rounded-full border-2 border-dashed px-4 py-2 text-sm font-semibold transition",
              revealedFacts
                ? "border-gold bg-gold/20 text-burgundy-deep"
                : "border-blush-deep/40 text-burgundy hover:border-hot-pink",
            )}
          >
            {revealedFacts ? "Hide rhinestones" : "Reveal hidden facts"}
          </button>
          <Link
            href={`/chapter/${chapterId}`}
            className="text-sm font-semibold text-hot-pink hover:text-burgundy"
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
