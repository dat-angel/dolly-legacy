import Link from "next/link";
import type { Moment } from "@/lib/types";
import type { Chapter } from "@/lib/types";
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
}

export function MomentCard({
  moment,
  showHidden = false,
  index = 0,
}: MomentCardProps) {
  const tilts = ["-1deg", "0.5deg", "-0.5deg", "1deg", "0deg"];
  const tilt = tilts[index % tilts.length];

  return (
    <article
      className="patch-card group p-6"
      style={{ ["--tilt" as string]: tilt }}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {moment.year && (
          <span className="rounded-sm border border-burgundy/20 bg-blush/40 px-2 py-0.5 font-mono text-xs font-bold text-burgundy">
            {moment.year}
          </span>
        )}
        <span className="font-script text-lg text-hot-pink capitalize">
          {moment.category}
        </span>
      </div>
      <h3 className="font-serif text-xl font-bold text-burgundy-deep group-hover:text-hot-pink">
        {moment.title}
      </h3>
      {moment.quote && (
        <p className="mt-3 font-serif text-base italic leading-snug text-burgundy/90">
          &ldquo;
          {moment.quote.length > 120
            ? `${moment.quote.slice(0, 120)}…`
            : moment.quote}
          &rdquo;
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-burgundy/75">
        {moment.summary}
      </p>
      {showHidden && moment.hiddenFact && (
        <p className="mt-4 border-t-2 border-dashed border-blush/50 pt-4 text-sm italic text-burgundy/65">
          <span className="font-script text-lg not-italic text-gold">
            between the rhinestones:{" "}
          </span>
          {moment.hiddenFact}
        </p>
      )}
      {moment.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {moment.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blush-deep/30 bg-white/60 px-2.5 py-0.5 text-xs text-burgundy/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/moments?highlight=${moment.id}`}
        className="mt-4 inline-flex items-center gap-1 font-semibold text-hot-pink transition hover:text-burgundy"
      >
        Read more
        <span aria-hidden>→</span>
      </Link>
    </article>
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

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 px-6 py-16 md:py-24", accent.bg)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-script text-2xl text-hot-pink md:text-3xl">
              {accent.label}
            </p>
            <h2 className="font-serif text-3xl font-bold text-burgundy-deep md:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-burgundy/75">{subtitle}</p>
          </div>
          <span
            className="font-serif text-8xl font-bold leading-none text-blush/50 md:text-9xl"
            aria-hidden
          >
            {accent.number}
          </span>
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
