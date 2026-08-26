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
        <h2 className="text-center font-serif text-2xl font-bold text-burgundy-deep sm:text-3xl md:text-4xl">
          What would Dolly say?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-burgundy/70 sm:text-base">
          Ask about something on your mind. The answer is a quote she actually
          said.
        </p>

        <Suspense fallback={null}>
          <DollyChatUrlSync />
        </Suspense>
        <DollyChatThread className="mt-6" />
      </div>
    </section>
  );
}
