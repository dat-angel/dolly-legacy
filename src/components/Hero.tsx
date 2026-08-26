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
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/35 via-transparent to-gold/15" />

      <div className="relative z-10 mx-auto flex min-h-[min(88svh,820px)] max-w-3xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 md:pb-16">
        {onThisDay && (
          <Link
            href={`/moment/${onThisDay.id}`}
            className="mb-4 inline-flex max-w-full items-center gap-2 self-start bg-gold px-3 py-2 text-left text-sm font-semibold text-burgundy-deep"
          >
            <span className="min-w-0">
              Today: {onThisDay.title}
              {onThisDay.year ? ` · ${onThisDay.year}` : ""}
            </span>
          </Link>
        )}

        <div className="border border-gold bg-cream/95 p-5 text-burgundy-deep sm:p-8">
          <h1 className="font-serif text-5xl font-bold leading-[0.95] sm:text-7xl md:text-8xl">
            Dolly.
          </h1>
          <p className="mt-3 max-w-xl font-serif text-2xl italic sm:text-3xl">
            Songs. Books. Backbone. A cup of ambition.
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-burgundy/80 sm:text-lg">
            An open celebration — the hits, the typewriter, and everyone she
            stood with. Play the tape. Steal a quote. Remix the data.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#life"
              className={dollyButtonClass("primary", "w-full sm:w-auto")}
            >
              Play her life
            </Link>
            <Link
              href="#what-would-dolly-say"
              className={dollyButtonClass("secondary", "w-full sm:w-auto")}
            >
              Ask Dolly
            </Link>
          </div>

          <ShareMenu
            title="Dolly Legacy"
            text="Songs. Books. Backbone. An open celebration of Dolly Parton you can share and remix."
            url={absoluteUrl("/")}
            imageSrc="/images/chapters/music.jpg"
            storySrc="/story-image"
            className="mt-5"
            compact
            label="Share this"
          />
        </div>
      </div>
    </section>
  );
}
