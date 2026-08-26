"use client";

import { Typewriter } from "./Typewriter";

export function FeaturedLetterLine({ text }: { text: string }) {
  return (
    <Typewriter
      text={`“${text}”`}
      className="text-lg leading-snug text-burgundy-deep sm:text-xl"
      speed={28}
      startOnView={false}
      playSound={false}
    />
  );
}
