"use client";

import Link from "next/link";
import type { Moment } from "@/lib/types";
import type { Chapter } from "@/lib/types";
import { getChapterImage, getMomentImage } from "@/lib/images";
import { getMomentShareText } from "@/lib/share";
import { ChapterPortrait } from "./ChapterPortrait";
import { MomentPortrait } from "./MomentPortrait";
import { ShareMenu } from "./ShareMenu";
import { Typewriter } from "./Typewriter";
import { Rhinestone, StitchDivider } from "./decorative";
import { cn } from "@/lib/utils";

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

interface MomentCardProps {
  moment: Moment;
  showHidden?: boolean;
  index?: number;
  shareUrl?: string;
  onOpen?: () => void;
}

export function MomentCard({
  moment,
  showHidden = false,
  index = 0,
  shareUrl,
  onOpen,
}: MomentCardProps) {
  const tilts = ["-1deg", "0.5deg", "-0.5deg", "1deg", "0deg"];
  const tilt = tilts[index % tilts.length];
  const image = getMomentImage(moment.id);

  return (
    <article
      className={cn(
        "patch-card group overflow-hidden p-0",
        onOpen && "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
      )}
      style={{ ["--tilt" as string]: tilt }}
      onClick={onOpen}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      {image && (
        <MomentPortrait
          image={image}
          framed={false}
          className="aspect-[4/5] sm:aspect-[4/3]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
        />
      )}
      <div className="p-4 sm:p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {moment.year && (
          <span className="rounded-sm border border-burgundy/20 bg-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-burgundy">
            {moment.year}
          </span>
        )}
        <span className="font-script text-lg text-gold capitalize">
          {moment.category}
        </span>
      </div>
      <h3 className="font-serif text-xl font-bold text-burgundy-deep group-hover:text-gold">
        {moment.title}
      </h3>
      {moment.quote ? (
        <p className="mt-2 font-script text-[0.95rem] leading-snug text-burgundy/90">
          &ldquo;
          {moment.quote.length > 90
            ? `${moment.quote.slice(0, 90)}…`
            : moment.quote}
          &rdquo;
        </p>
      ) : (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-burgundy/75">
          {moment.summary}
        </p>
      )}
      {showHidden && moment.hiddenFact && (
        <p className="mt-3 border-t border-gold/30 pt-3 text-sm italic text-burgundy/65">
          <span className="font-script text-lg not-italic text-gold">
            liner notes:{" "}
          </span>
          {moment.hiddenFact}
        </p>
      )}
      {moment.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {moment.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-gold/30 bg-white/60 px-2.5 py-0.5 text-xs text-burgundy/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {shareUrl ? (
          <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            <ShareLinkButton
              url={shareUrl}
              text={getMomentShareText(moment)}
              title={moment.title}
              imageSrc={image?.src}
              storySrc={`/moment/${moment.id}/story-image`}
            />
          </div>
        ) : null}
        <Link
          href={`/moment/${moment.id}`}
          className="inline-flex items-center gap-1 font-semibold text-gold transition hover:text-burgundy"
          onClick={(e) => e.stopPropagation()}
        >
          Read more
          <span aria-hidden>→</span>
        </Link>
      </div>
      </div>
    </article>
  );
}

function ShareLinkButton({
  url,
  text,
  title,
  imageSrc,
  storySrc,
}: {
  url: string;
  text: string;
  title: string;
  imageSrc?: string;
  storySrc?: string;
}) {
  return (
    <ShareMenu
      title={title}
      text={text}
      url={url}
      imageSrc={imageSrc}
      storySrc={storySrc}
      compact
      label="Share"
    />
  );
}

interface ChapterSectionProps {
  title: string;
  subtitle: string;
  moments: Moment[];
  id: string;
  chapterId: Chapter;
  typewriterQuote?: string;
}

export function ChapterSection({
  title,
  subtitle,
  moments,
  id,
  chapterId,
  typewriterQuote,
}: ChapterSectionProps) {
  const accent = CHAPTER_ACCENTS[chapterId];
  const portrait = getChapterImage(chapterId);

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 px-6 py-16 md:py-24", accent.bg)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="font-script text-2xl text-gold md:text-3xl">
              {accent.label}
            </p>
            <h2 className="font-serif text-3xl font-bold text-burgundy-deep md:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-burgundy/75">{subtitle}</p>
          </div>
          <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-end">
            <ChapterPortrait
              image={portrait}
              priority={chapterId === "origins"}
              className="mx-auto lg:mx-0"
            />
            <span
              className="hidden font-serif text-8xl font-bold leading-none text-blush/50 lg:block lg:text-9xl"
              aria-hidden
            >
              {accent.number}
            </span>
          </div>
        </div>

        {typewriterQuote && (
          <div className="typewriter-frame mb-12 rounded-sm p-6 md:p-10">
            <div className="mb-4 flex items-center gap-2">
              <Rhinestone size={16} className="text-gold" />
              <p className="font-script text-2xl text-burgundy">
                click-clack — written on a typewriter
              </p>
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

        <StitchDivider className="mb-10" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {moments.slice(0, 3).map((m, i) => (
            <MomentCard key={m.id} moment={m} showHidden index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
