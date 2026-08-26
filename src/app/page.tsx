import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { HomeUrlSync } from "@/components/HomeUrlSync";
import { LifeTimeline } from "@/components/LifeTimeline";
import { StatsStrip } from "@/components/StatsStrip";
import { WhatWouldDollySay } from "@/components/WhatWouldDollySay";
import { dollyButtonClass } from "@/components/ui/DollyButton";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Interactive Dolly Parton tribute",
  description:
    "Slide through Dolly Parton's life from Locust Ridge to now, then ask what she'd say — an open tribute to her music, philanthropy, and advocacy.",
  path: "/",
  keywords: [
    "interactive Dolly Parton exhibit",
    "Dolly Parton timeline",
    "what would Dolly say",
  ],
});

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <HomeUrlSync />
      </Suspense>
      <Hero />
      <StatsStrip />
      <LifeTimeline />

      <section className="section-warm px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <WhatWouldDollySay />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gold/20 bg-burgundy-deep px-4 py-16 text-center text-cream sm:px-6 md:py-20">
        <p className="font-script text-2xl text-gold sm:text-3xl">the archive</p>
        <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
          Every moment, on paper.
        </h2>
        <div className="mx-auto my-6 h-px max-w-xs bg-gold/30" />
        <p className="mx-auto max-w-lg text-cream/75">
          Browse the full archive — filter by era, category, and theme. Press{" "}
          <kbd className="rounded-sm border border-gold/40 px-2 py-0.5 font-mono text-xs text-gold">
            ?
          </kbd>{" "}
          for a surprise.
        </p>
        <Link href="/moments" className={dollyButtonClass("primary", "mt-8 w-full sm:w-auto")}>
          View all moments
        </Link>
      </section>
    </>
  );
}
