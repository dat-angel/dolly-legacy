"use client";

import Image from "next/image";
import Link from "next/link";
import { getOnThisDayMoment } from "@/lib/moments";
import { absoluteUrl } from "@/lib/share";
import { Rhinestone } from "./decorative";
import { ShareMenu } from "./ShareMenu";
import { dollyButtonClass } from "./ui/DollyButton";

export function Hero() {
  const onThisDay = getOnThisDayMoment();

  return (
    <section className="relative isolate min-h-[min(92svh,860px)] overflow-hidden">
      <Image
        src="/images/chapters/music.jpg"
        alt="Dolly Parton publicity portrait, 1977"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/70 to-burgundy-deep/25" />

      <div className="relative z-10 mx-auto flex min-h-[min(92svh,860px)] max-w-3xl flex-col justify-end px-4 pb-12 pt-24 text-cream sm:px-6 md:pb-16">
        {onThisDay && (
          <Link
            href={`/moment/${onThisDay.id}`}
            className="mb-5 inline-flex max-w-full items-center gap-2 self-start rounded-full border border-cream/30 bg-burgundy-deep/40 px-4 py-2.5 text-left text-sm text-cream backdrop-blur-sm"
          >
            <Rhinestone size={14} className="shrink-0 text-gold-light" />
            <span className="min-w-0">
              Today:{" "}
              <span className="font-semibold">{onThisDay.title}</span>
              {onThisDay.year ? ` · ${onThisDay.year}` : ""}
            </span>
          </Link>
        )}

        <p className="font-script text-3xl text-hot-pink-light sm:text-4xl">
          y&apos;all already know
        </p>
        <h1 className="mt-1 font-serif text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl">
          Dolly.
        </h1>
        <p className="mt-3 max-w-xl font-serif text-2xl italic text-cream/90 sm:text-3xl">
          Songs. Books. Backbone.
        </p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/85 sm:text-lg">
          28 moments from the holler to the Hall of Fame — slide the timeline,
          don&apos;t scroll forever.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#life"
            className={dollyButtonClass("primary", "w-full sm:w-auto")}
          >
            <Rhinestone size={16} className="text-gold-light" />
            Slide her life
          </Link>
          <Link
            href="#what-would-dolly-say"
            className={dollyButtonClass(
              "secondary",
              "w-full border-cream/40 bg-white/10 text-cream hover:bg-white/20 sm:w-auto",
            )}
          >
            Ask Dolly
          </Link>
        </div>

        <ShareMenu
          title="Dolly Legacy"
          text="Songs. Books. Backbone. 28 Dolly Parton moments you can actually share."
          url={absoluteUrl("/")}
          imageSrc="/images/chapters/music.jpg"
          storySrc="/story-image"
          className="mt-5"
          compact
          label="Share this"
        />
      </div>
    </section>
  );
}
