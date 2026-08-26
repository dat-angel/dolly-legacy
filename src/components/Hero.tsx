"use client";

import Link from "next/link";
import { getOnThisDayMoment } from "@/lib/moments";
import { getMomentImage } from "@/lib/images";
import { absoluteUrl, getMomentShareText, getMomentShareUrl } from "@/lib/share";
import {
  Butterfly,
  QuiltPatchCollage,
  Rhinestone,
  SparkleField,
  StitchDivider,
} from "./decorative";
import { ShareMenu } from "./ShareMenu";
import { dollyButtonClass } from "./ui/DollyButton";

export function Hero() {
  const onThisDay = getOnThisDayMoment();

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 md:pb-28 md:pt-24">
      <div className="quilt-bg pointer-events-none absolute inset-0" />
      <QuiltPatchCollage className="hidden opacity-25 sm:block" />
      <SparkleField />

      <Butterfly
        size={56}
        className="absolute left-[8%] top-[20%] hidden text-hot-pink/60 md:block"
      />
      <Butterfly
        size={40}
        className="absolute right-[10%] top-[30%] hidden text-gold/70 md:block"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {onThisDay && (
          <Link
            href={`/moment/${onThisDay.id}`}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border-2 border-dashed border-gold/50 bg-gold/10 px-4 py-2.5 text-left text-sm text-burgundy transition hover:border-hot-pink hover:bg-hot-pink/10 sm:mb-6 sm:px-5"
          >
            <Rhinestone size={14} className="shrink-0 text-gold" />
            <span className="min-w-0">
              On this day:{" "}
              <span className="font-semibold">{onThisDay.title}</span>
              {onThisDay.year ? ` (${onThisDay.year})` : ""}
            </span>
          </Link>
        )}

        <p className="font-script text-2xl text-hot-pink sm:text-3xl md:text-4xl">
          sparkle &amp; grace
        </p>
        <p className="mb-3 mt-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold sm:text-xs sm:tracking-[0.25em]">
          Music · Generosity · Kindness
        </p>

        <h1 className="font-serif text-[2.35rem] font-bold leading-[1.08] text-burgundy-deep sm:text-5xl md:text-7xl lg:text-8xl rhinestone">
          The Imagination
          <br />
          <span className="text-hot-pink">Library</span>
          <br />
          <span className="text-2xl font-normal italic text-burgundy sm:text-3xl md:text-5xl">
            of a Legend
          </span>
        </h1>

        <StitchDivider className="mx-auto max-w-md" />

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-burgundy/85 sm:text-lg md:text-xl">
          A living tribute to Dolly Parton — her songs, her giving, and her
          lifelong stand with Black communities, LGBTQ+ people, and working women
          everywhere.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <Link href="/moments" className={dollyButtonClass("primary", "w-full sm:w-auto")}>
            <Rhinestone size={16} className="text-gold-light" />
            Explore all moments
          </Link>
          <Link
            href="#what-would-dolly-say"
            className={dollyButtonClass("secondary", "w-full sm:w-auto")}
          >
            What would Dolly say?
          </Link>
        </div>

        <ShareMenu
          title="Dolly Legacy"
          text="A living tribute to Dolly Parton — music, philanthropy, and advocacy."
          url={absoluteUrl("/")}
          className="mt-6 flex justify-center"
          compact
          label="Share this tribute"
        />

        {onThisDay && (
          <ShareMenu
            title={onThisDay.title}
            text={getMomentShareText(onThisDay)}
            url={getMomentShareUrl(onThisDay.id)}
            imageSrc={getMomentImage(onThisDay.id)?.src}
            className="mt-3 flex justify-center"
            compact
            label={`Share ${onThisDay.title}`}
          />
        )}
      </div>

      <div className="wavy-top mt-12 text-blush/30">
        <svg viewBox="0 0 1200 48" preserveAspectRatio="none" fill="currentColor">
          <path d="M0,24 C150,48 350,0 600,24 C850,48 1050,0 1200,24 L1200,48 L0,48 Z" />
        </svg>
      </div>
    </section>
  );
}
