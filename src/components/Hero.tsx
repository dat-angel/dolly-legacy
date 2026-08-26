"use client";

import Link from "next/link";
import { getOnThisDayMoment } from "@/lib/moments";
import { buildAbsoluteUrl, getMomentShareText, getMomentShareUrl } from "@/lib/share";
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
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="quilt-bg pointer-events-none absolute inset-0" />
      <QuiltPatchCollage className="opacity-25" />
      <SparkleField />

      <Butterfly
        size={56}
        className="absolute left-[8%] top-[20%] text-hot-pink/60"
      />
      <Butterfly
        size={40}
        className="absolute right-[10%] top-[30%] text-gold/70"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {onThisDay && (
          <Link
            href={`/moment/${onThisDay.id}`}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-gold/50 bg-gold/10 px-5 py-2 text-sm text-burgundy transition hover:border-hot-pink hover:bg-hot-pink/10"
          >
            <Rhinestone size={14} className="text-gold" />
            <span>
              On this day:{" "}
              <span className="font-semibold">{onThisDay.title}</span>
              {onThisDay.year ? ` (${onThisDay.year})` : ""}
            </span>
          </Link>
        )}

        <p className="font-script text-3xl text-hot-pink md:text-4xl">
          sparkle &amp; grace
        </p>
        <p className="mb-3 mt-1 text-xs font-bold uppercase tracking-[0.25em] text-gold">
          Music · Generosity · Kindness
        </p>

        <h1 className="font-serif text-5xl font-bold leading-[1.05] text-burgundy-deep md:text-7xl lg:text-8xl rhinestone">
          The Imagination
          <br />
          <span className="text-hot-pink">Library</span>
          <br />
          <span className="text-3xl font-normal italic text-burgundy md:text-5xl">
            of a Legend
          </span>
        </h1>

        <StitchDivider className="mx-auto max-w-md" />

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-burgundy/85 md:text-xl">
          A living tribute to Dolly Parton — her songs, her giving, and her
          lifelong stand with Black communities, LGBTQ+ people, and working women
          everywhere.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/moments" className={dollyButtonClass("primary")}>
            <Rhinestone size={16} className="text-gold-light" />
            Explore all moments
          </Link>
          <Link
            href="#what-would-dolly-say"
            className={dollyButtonClass("secondary")}
          >
            What would Dolly say?
          </Link>
        </div>

        <ShareMenu
          title="Dolly Legacy"
          text="A living tribute to Dolly Parton — music, philanthropy, and advocacy."
          url={buildAbsoluteUrl("/")}
          className="mt-8 justify-center"
          compact
          label="Share this tribute"
        />

        {onThisDay && (
          <ShareMenu
            title={onThisDay.title}
            text={getMomentShareText(onThisDay)}
            url={getMomentShareUrl(onThisDay.id)}
            className="mt-4 justify-center"
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
