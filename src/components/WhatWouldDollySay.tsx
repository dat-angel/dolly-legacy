"use client";

import { useEffect, useState, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DOLLY_SAY_PLACEHOLDERS,
  DOLLY_SAY_PROMPTS,
  whatWouldDollySay,
} from "@/lib/dolly-say";
import { getMomentImage } from "@/lib/images";
import { getMomentById } from "@/lib/moments";
import { MomentPortrait } from "./MomentPortrait";
import {
  getDollySayShareUrl,
  getMomentShareText,
} from "@/lib/share";
import type { Moment } from "@/lib/types";
import { Rhinestone, SparkleField, StarBurst } from "./decorative";
import { ShareMenu } from "./ShareMenu";
import { dollyButtonClass } from "./ui/DollyButton";

export function WhatWouldDollySay() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    moment: Moment;
    keyword?: string;
  } | null>(null);

  const placeholder = DOLLY_SAY_PLACEHOLDERS[0];
  const resultImage = result ? getMomentImage(result.moment.id) : null;

  useEffect(() => {
    const momentId = searchParams.get("dolly");
    const query = searchParams.get("q");
    if (!momentId) return;

    const moment = getMomentById(momentId);
    if (moment) {
      startTransition(() => {
        if (query) setInput(query);
        setResult({ moment, keyword: query ?? undefined });
      });
    }
  }, [searchParams]);

  function applyResult(moment: Moment, matchedKeyword?: string, queryText?: string) {
    setResult({ moment, keyword: matchedKeyword });
    const params = new URLSearchParams({ dolly: moment.id });
    if (queryText?.trim()) params.set("q", queryText.trim());
    window.history.replaceState(null, "", `/?${params.toString()}#what-would-dolly-say`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const { moment, matchedKeyword } = whatWouldDollySay(text);
    applyResult(moment, matchedKeyword, text);
  }

  function handlePrompt(text: string) {
    setInput(text);
    const { moment, matchedKeyword } = whatWouldDollySay(text);
    applyResult(moment, matchedKeyword, text);
  }

  function shufflePrompt() {
    const prompt =
      DOLLY_SAY_PROMPTS[Math.floor(Math.random() * DOLLY_SAY_PROMPTS.length)];
    handlePrompt(prompt.text);
  }

  return (
    <section
      id="what-would-dolly-say"
      className="vanity-frame relative overflow-hidden rounded-sm p-8 md:p-14"
    >
      <SparkleField />

      <div className="relative">
        <div className="flex items-center justify-center gap-3">
          <StarBurst size={24} className="text-gold" />
          <p className="font-script text-4xl text-hot-pink md:text-5xl">
            ask the rhinestones
          </p>
          <StarBurst size={24} className="text-gold" />
        </div>

        <h2 className="mt-2 text-center font-serif text-3xl font-bold text-burgundy-deep md:text-4xl">
          What would Dolly say?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-burgundy/80">
          Tell Dolly what&apos;s on your mind. She&apos;ll find the right words
          from a lifetime of songs, interviews, and wisdom.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-full border-2 border-dashed border-hot-pink/40 bg-white/90 px-6 py-3.5 text-burgundy-deep placeholder:text-burgundy/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
              aria-label="What's on your mind?"
            />
            <button type="submit" className={dollyButtonClass("primary", "shrink-0")}>
              <Rhinestone size={16} className="text-gold-light" />
              Ask Dolly
            </button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {DOLLY_SAY_PROMPTS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePrompt(p.text)}
              className="rounded-full border-2 border-blush-deep/40 bg-white/70 px-4 py-2 font-medium text-sm text-burgundy transition hover:border-hot-pink hover:bg-hot-pink/10 hover:text-hot-pink"
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={shufflePrompt}
            className="rounded-full border-2 border-dashed border-gold/50 bg-gold/10 px-4 py-2 text-sm font-semibold text-burgundy transition hover:bg-gold/20"
          >
            Surprise me
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.moment.id}
              initial={{ opacity: 0, y: 16, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="patch-card mt-10 overflow-hidden p-0"
            >
              {resultImage && (
                <MomentPortrait
                  image={resultImage}
                  framed={false}
                  className="aspect-[16/7]"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              )}
              <div className="p-8">
              {result.moment.quote ? (
                <blockquote className="text-center font-serif text-2xl leading-snug text-burgundy-deep md:text-3xl rhinestone">
                  &ldquo;{result.moment.quote}&rdquo;
                </blockquote>
              ) : (
                <p className="text-center font-serif text-xl text-burgundy-deep">
                  {result.moment.summary}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-burgundy/70">
                <span className="font-script text-2xl text-burgundy">
                  — {result.moment.title}
                </span>
                {result.moment.year && (
                  <span className="rounded-sm border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-xs">
                    {result.moment.year}
                  </span>
                )}
              </div>
              {result.moment.hiddenFact && (
                <p className="mt-5 border-t-2 border-dashed border-blush/50 pt-5 text-center text-sm italic text-burgundy/65">
                  <span className="font-script text-lg not-italic text-gold">
                    between the rhinestones:{" "}
                  </span>
                  {result.moment.hiddenFact}
                </p>
              )}
              <ShareMenu
                title="What would Dolly say?"
                text={getMomentShareText(result.moment)}
                url={getDollySayShareUrl(result.moment.id, input)}
                className="mt-6 justify-center"
                compact
                label="Share Dolly's answer"
              />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
