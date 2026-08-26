"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LIFE_STAGES } from "@/lib/dolly-say";
import { getEraImage, getMomentImage } from "@/lib/images";
import {
  getLifeShareUrl,
  getMomentShareText,
  getMomentStoryUrl,
} from "@/lib/share";
import {
  getChapterMeta,
  getEraStartStops,
  getFirstStopForChapter,
  getStopIndex,
  TIMELINE_STOPS,
} from "@/lib/timeline";
import { CHAPTERS, type Chapter, type Moment } from "@/lib/types";
import { useDollyChat } from "./dolly-chat/DollyChatProvider";
import { MomentDrawer } from "./MomentDrawer";
import { ShareMenu } from "./ShareMenu";
import { Typewriter } from "./Typewriter";
import { dollyButtonClass } from "./ui/DollyButton";
import { cn } from "@/lib/utils";

const ERA_STOPS = getEraStartStops();

function indexFromParams(params: { get(name: string): string | null }): number {
  const momentId = params.get("moment");
  if (momentId) return getStopIndex(momentId);
  const chapterParam = params.get("chapter");
  if (chapterParam && CHAPTERS.some((item) => item.id === chapterParam)) {
    return getFirstStopForChapter(chapterParam as Chapter);
  }
  const eraStop = ERA_STOPS.find((item) => item.era === params.get("era"));
  if (eraStop) return eraStop.index;
  return 0;
}

function subscribeToSearch(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

export function LifeTimeline() {
  const sliderId = useId();
  const reduceMotion = useReducedMotion();
  const search = useSyncExternalStore(
    subscribeToSearch,
    () => window.location.search,
    () => "",
  );
  const { openDock } = useDollyChat();
  const urlIndex = indexFromParams(new URLSearchParams(search));
  const [userIndex, setUserIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<Moment | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const interacted = useRef(false);
  const index = userIndex ?? urlIndex;
  const moment = TIMELINE_STOPS[index] ?? TIMELINE_STOPS[0];
  const image = getMomentImage(moment.id) ?? getEraImage(moment.era);
  const stage = LIFE_STAGES[moment.era];
  const chapter = getChapterMeta(moment.chapter);
  const lastIndex = TIMELINE_STOPS.length - 1;

  const goTo = useCallback(
    (next: number, fromUser = false) => {
      if (fromUser) interacted.current = true;
      setUserIndex(Math.min(lastIndex, Math.max(0, next)));
    },
    [lastIndex],
  );

  useEffect(() => {
    if (!playing || reduceMotion) return;
    interacted.current = true;
    const timer = window.setInterval(() => {
      setUserIndex((current) => {
        const base = current ?? urlIndex;
        return base >= lastIndex ? 0 : base + 1;
      });
    }, 2800);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion, lastIndex, urlIndex]);

  useEffect(() => {
    if (!interacted.current) return;
    const stop = TIMELINE_STOPS[index];
    if (!stop) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("dolly")) return;
    window.history.replaceState(
      null,
      "",
      `/?moment=${encodeURIComponent(stop.id)}#life`,
    );
  }, [index]);

  function handleSlider(value: string) {
    setPlaying(false);
    goTo(Number(value), true);
  }

  function onPointerDown(event: React.PointerEvent) {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  }

  function onPointerUp(event: React.PointerEvent) {
    if (pointerStart.current == null) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    setPlaying(false);
    goTo(index + (dx < 0 ? 1 : -1), true);
  }

  const studioTypewriter =
    moment.era === "1980s" && Boolean(moment.quote) && !reduceMotion;

  return (
    <section
      id="life"
      className="relative scroll-mt-20 bg-cream text-burgundy-deep"
      aria-label="Interactive timeline of Dolly Parton's life"
    >
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div
          className="relative min-h-[42vh] lg:min-h-[100svh]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <AnimatePresence mode="wait">
            {image && (
              <motion.div
                key={image.src}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-[center_18%]"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-cream/15 lg:to-cream" />

          <div className="absolute left-3 top-3 z-10 flex gap-2 sm:left-5 sm:top-5">
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                goTo(index - 1, true);
              }}
              disabled={index === 0}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-gold bg-cream/90 text-lg text-burgundy-deep backdrop-blur-sm disabled:opacity-30"
              aria-label="Previous moment"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                goTo(index + 1, true);
              }}
              disabled={index === lastIndex}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-gold bg-cream/90 text-lg text-burgundy-deep backdrop-blur-sm disabled:opacity-30"
              aria-label="Next moment"
            >
              ›
            </button>
          </div>

          <p className="absolute bottom-4 left-4 z-10 bg-gold px-2 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-burgundy-deep sm:bottom-6 sm:left-6">
            {index + 1} / {TIMELINE_STOPS.length}
          </p>
        </div>

        <div className="relative z-10 flex flex-col justify-end px-4 pb-[max(6rem,env(safe-area-inset-bottom))] pt-5 sm:px-6 lg:justify-center lg:py-16 lg:pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-walnut">
            {stage.nickname} · {moment.year ?? moment.era}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" aria-live="polite">
            {moment.title}
          </h2>
          {moment.quote ? (
            <blockquote className="mt-3">
              {studioTypewriter ? (
                <Typewriter
                  key={moment.id}
                  text={`“${moment.quote}”`}
                  className="text-lg leading-snug text-burgundy-deep sm:text-xl"
                  speed={28}
                  startOnView={false}
                  playSound={!reduceMotion}
                />
              ) : (
                <p className="font-script text-lg leading-snug text-burgundy-deep sm:text-xl">
                  &ldquo;{moment.quote}&rdquo;
                </p>
              )}
            </blockquote>
          ) : (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-burgundy/75 sm:text-base">
              {moment.summary}
            </p>
          )}

          <div className="mt-6">
            <div
              role="tablist"
              aria-label="Decades"
              className="-mx-1 flex gap-1 overflow-x-auto pb-3 [scrollbar-width:none]"
            >
              {ERA_STOPS.map(({ era, index: eraIndex }) => {
                const active = moment.era === era;
                return (
                  <button
                    key={era}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setPlaying(false);
                      goTo(eraIndex, true);
                    }}
                    className={cn(
                      "min-h-10 shrink-0 rounded-sm px-3 font-mono text-xs font-bold uppercase tracking-wide",
                      active
                        ? "bg-gold text-burgundy-deep"
                        : "border border-burgundy/15 bg-white/70 text-burgundy hover:border-gold hover:bg-gold/15",
                    )}
                  >
                    {era.replace("s", "")}
                  </button>
                );
              })}
            </div>

            <label htmlFor={sliderId} className="sr-only">
              Scrub through Dolly Parton&apos;s life
            </label>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={lastIndex}
              step={1}
              value={index}
              onChange={(event) => handleSlider(event.target.value)}
              aria-valuetext={`${moment.year ?? moment.era}, ${moment.title}`}
              className="life-slider mt-1 w-full"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-wider text-burgundy/50">
              <span>1946</span>
              <span>now</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={playing}
                className={dollyButtonClass("secondary", "min-h-11 px-4")}
              >
                {playing ? "Pause" : "Play"}
              </button>
            )}
            <button
              type="button"
              onClick={() => setSelected(moment)}
              className={dollyButtonClass("primary", "min-h-11 px-4")}
            >
              Read this
            </button>
            <button
              type="button"
              onClick={openDock}
              className={dollyButtonClass("secondary", "min-h-11 px-5")}
            >
              Ask Dolly
            </button>
            <ShareMenu
              title={moment.title}
              text={getMomentShareText(moment)}
              url={getLifeShareUrl(moment.id)}
              imageSrc={image?.src}
              storySrc={getMomentStoryUrl(moment.id)}
              compact
              label="Share"
            />
          </div>

          {chapter && moment.chapter && (
            <Link
              href={`/chapter/${moment.chapter}`}
              className="mt-4 text-sm font-semibold text-walnut hover:text-burgundy-deep"
            >
              {chapter.title} →
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <MomentDrawer
            moment={selected}
            onClose={() => setSelected(null)}
            onSelect={(next) => {
              setSelected(next);
              goTo(getStopIndex(next.id), true);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
