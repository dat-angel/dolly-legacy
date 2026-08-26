"use client";

import { Suspense } from "react";
import { DollyChatThread } from "./dolly-chat/DollyChatThread";
import { DollyChatUrlSync } from "./dolly-chat/DollyChatUrlSync";

export function WhatWouldDollySay() {
  return (
    <section
      id="what-would-dolly-say"
      className="vanity-frame relative scroll-mt-24 overflow-hidden p-5 sm:p-8 md:p-10"
    >
      <div className="relative flex min-h-0 flex-col">
        <p className="text-center font-mono text-sm uppercase tracking-[0.2em] text-gold">
          country wisdom
        </p>
        <h2 className="mt-2 text-center font-script text-2xl text-burgundy-deep sm:text-3xl md:text-4xl">
          What would Dolly say?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-burgundy/75 sm:text-base">
          Daily stuff. Her words.
        </p>

        <Suspense fallback={null}>
          <DollyChatUrlSync />
        </Suspense>
        <DollyChatThread className="mt-6" />
      </div>
    </section>
  );
}
