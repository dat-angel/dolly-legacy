import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { HomeUrlSync } from "@/components/HomeUrlSync";
import { LifeTimeline } from "@/components/LifeTimeline";
import { StatsStrip } from "@/components/StatsStrip";
import { WhatWouldDollySay } from "@/components/WhatWouldDollySay";
import { StitchDivider, Rhinestone, StarBurst } from "@/components/decorative";
import { dollyButtonClass } from "@/components/ui/DollyButton";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Interactive Dolly Parton tribute",
  description:
    "Slide through Dolly Parton's life from Locust Ridge to now, then ask what she'd say at a certain time — an open tribute to her music, philanthropy, and advocacy.",
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
      <Suspense fallback={<section id="life" className="min-h-[100svh] bg-burgundy-deep" />}>
        <LifeTimeline />
      </Suspense>

      <section className="section-warm px-4 py-12 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <WhatWouldDollySay />
        </div>
      </section>

      <section className="relative overflow-hidden border-t-2 border-dashed border-blush-deep/40 bg-gradient-to-b from-cream to-blush/20 px-4 py-16 text-center sm:px-6 md:py-20">
        <StarBurst
          size={32}
          className="absolute left-[15%] top-[20%] text-gold/40"
        />
        <Rhinestone
          size={20}
          className="absolute right-[18%] top-[30%] text-hot-pink/50"
        />

        <p className="font-script text-3xl text-hot-pink">one more thing, honey</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-burgundy-deep md:text-4xl">
          Ready to explore everything?
        </h2>
        <StitchDivider className="mx-auto max-w-xs" />
        <p className="mx-auto max-w-lg text-burgundy/75">
          Browse the full archive — filter by era, category, and theme. Press{" "}
          <kbd className="rounded border-2 border-dashed border-blush px-2 py-0.5 font-mono text-xs">
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
