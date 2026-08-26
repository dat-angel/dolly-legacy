"use client";

import Image from "next/image";
import Link from "next/link";
import { getOnThisDayMoment } from "@/lib/moments";
import { absoluteUrl } from "@/lib/share";
import { ShareMenu } from "./ShareMenu";
import { dollyButtonClass } from "./ui/DollyButton";

export function Hero() {
  const onThisDay = getOnThisDayMoment();

  return (
    <section className="relative isolate min-h-[min(88svh,820px)] overflow-hidden">
      <Image
        src="/images/chapters/music.jpg"
        alt="Dolly Parton publicity portrait, 1977"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep via-burgundy-deep/65 to-burgundy-deep/20" />

      <div className="relative z-10 mx-auto flex min-h-[min(88svh,820px)] max-w-3xl flex-col justify-end px-4 pb-12 pt-24 text-cream sm:px-6 md:pb-16">
        {onThisDay && (
          <Link
            href={`/moment/${onThisDay.id}`}
            className="mb-5 inline-flex max-w-full items-center gap-2 self-start border border-cream/25 bg-burgundy-deep/45 px-3 py-2 text-left text-sm text-cream backdrop-blur-sm"
          >
            <span className="min-w-0">
              Today:{" "}
              <span className="font-semibold">{onThisDay.title}</span>
              {onThisDay.year ? ` · ${onThisDay.year}` : ""}
            </span>
          </Link>
        )}

        <h1 className="font-serif text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl">
          Dolly.
        </h1>
        <p className="mt-3 max-w-xl font-serif text-2xl italic text-cream/90 sm:text-3xl">
          Songs. Books. Backbone.
        </p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
          Twenty-eight moments from Locust Ridge to now. Slide the timeline —
          her words are still on the record.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#life"
            className={dollyButtonClass("primary", "w-full sm:w-auto")}
          >
            Her life
          </Link>
          <Link
            href="#what-would-dolly-say"
            className={dollyButtonClass(
              "secondary",
              "w-full border-cream/40 text-cream hover:bg-white/10 sm:w-auto",
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
