import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { HomeUrlSync } from "@/components/HomeUrlSync";
import { LifeTimeline } from "@/components/LifeTimeline";
import { OpenDataHarbor } from "@/components/OpenDataHarbor";
import { SheStoodWith } from "@/components/SheStoodWith";
import { StatsStrip } from "@/components/StatsStrip";
import { WhatWouldDollySay } from "@/components/WhatWouldDollySay";
import { dollyButtonClass } from "@/components/ui/DollyButton";
import { createPageMetadata } from "@/lib/metadata";
import { getMomentCount } from "@/lib/moments";
import { getSiteDescription } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "A living scrapbook of Dolly Parton",
  description: getSiteDescription(),
  path: "/",
  keywords: [
    "Dolly Parton celebration",
    "Dolly Parton timeline",
    "what would Dolly say",
    "Dolly Parton open data",
  ],
});

export default function HomePage() {
  const momentCount = getMomentCount();

  return (
    <>
      <Suspense fallback={null}>
        <HomeUrlSync />
      </Suspense>
      <Hero />
      <StatsStrip />
      <LifeTimeline />

      <section className="px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <WhatWouldDollySay />
        </div>
      </section>

      <SheStoodWith />
      <OpenDataHarbor />

      <section className="px-4 py-16 text-center sm:px-6 md:py-20">
        <h2 className="font-serif text-3xl font-bold text-burgundy-deep md:text-4xl">
          All {momentCount} moments
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-burgundy/75">
          Filter by era, category, and who she stood with. Press{" "}
          <kbd className="border border-burgundy/20 px-2 py-0.5 font-mono text-xs">
            ?
          </kbd>{" "}
          for a surprise.
        </p>
        <Link href="/moments" className={dollyButtonClass("primary", "mt-8 w-full sm:w-auto")}>
          Browse the scrapbook
        </Link>
      </section>
    </>
  );
}
