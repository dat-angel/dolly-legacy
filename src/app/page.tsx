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

      <section className="border-t border-burgundy/10 bg-cream px-4 py-16 text-center sm:px-6 md:py-20">
        <h2 className="font-serif text-3xl font-bold text-burgundy-deep md:text-4xl">
          All 28 moments
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-burgundy/70">
          Filter by era, category, and theme. Press{" "}
          <kbd className="border border-burgundy/20 px-2 py-0.5 font-mono text-xs text-burgundy">
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
