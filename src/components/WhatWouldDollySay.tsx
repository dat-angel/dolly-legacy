"use client";

import { Suspense } from "react";
import { DollyChatThread } from "./dolly-chat/DollyChatThread";
import { DollyChatUrlSync } from "./dolly-chat/DollyChatUrlSync";
import { SparkleField, StarBurst } from "./decorative";

export function WhatWouldDollySay() {
  return (
    <section
      id="what-would-dolly-say"
      className="vanity-frame relative scroll-mt-24 overflow-hidden rounded-sm p-5 sm:p-8 md:p-10"
    >
      <SparkleField />

      <div className="relative flex min-h-0 flex-col">
        <div className="flex items-center justify-center gap-3">
          <StarBurst size={20} className="hidden text-gold sm:block" />
          <p className="font-script text-3xl text-hot-pink sm:text-4xl">
            ask the rhinestones
          </p>
          <StarBurst size={20} className="hidden text-gold sm:block" />
        </div>

        <h2 className="mt-2 text-center font-serif text-2xl font-bold text-burgundy-deep sm:text-3xl md:text-4xl">
          What would Dolly say?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-burgundy/80 sm:text-base">
          Pick a time in her life — Locust Ridge girl, Nashville songwriter, 9
          to 5, Imagination Library, or right now. She answers with words she
          actually said then.
        </p>

        <Suspense fallback={null}>
          <DollyChatUrlSync />
        </Suspense>
        <DollyChatThread className="mt-6" />
      </div>
    </section>
  );
}
