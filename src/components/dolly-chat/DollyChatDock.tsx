"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getEraImage } from "@/lib/images";
import { LIFE_STAGES } from "@/lib/dolly-say";
import { cn } from "@/lib/utils";
import { DollyChatThread } from "./DollyChatThread";
import { useDollyChat } from "./DollyChatProvider";

export function DollyChatDock() {
  const { era, dockOpen, closeDock, toggleDock } = useDollyChat();
  const titleId = useId();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [sectionVisible, setSectionVisible] = useState(false);
  const portrait = era === "any" ? getEraImage("1970s") : getEraImage(era);
  const nickname = era === "any" ? "Any time" : LIFE_STAGES[era].nickname;

  useEffect(() => {
    if (!onHome) return;
    const section = document.getElementById("what-would-dolly-say");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.35;
        setSectionVisible(visible);
        if (visible) closeDock();
      },
      { threshold: [0, 0.35, 0.6] },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [onHome, closeDock]);

  const hideFab = onHome && sectionVisible && !dockOpen;

  useEffect(() => {
    if (!dockOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeDock();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dockOpen, closeDock]);

  useEffect(() => {
    if (!dockOpen) return;
    const media = window.matchMedia("(max-width: 639px)");
    if (!media.matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [dockOpen]);

  const hideFab = sectionVisible && !dockOpen;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-40 flex justify-end p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5",
        dockOpen ? "inset-0 items-end" : "inset-x-0 bottom-0",
      )}
    >
      {dockOpen && (
        <button
          type="button"
          aria-label="Dismiss Dolly chat"
          className="pointer-events-auto absolute inset-0 bg-burgundy-deep/40 backdrop-blur-[2px] sm:hidden"
          onClick={closeDock}
        />
      )}

      {dockOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="vanity-frame pointer-events-auto relative z-10 flex max-h-[min(82vh,40rem)] w-full flex-col overflow-hidden rounded-t-3xl p-4 shadow-2xl sm:max-h-[min(78vh,42rem)] sm:w-[24.5rem] sm:rounded-3xl sm:p-5"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-script text-2xl leading-none text-hot-pink">ask dolly</p>
              <h2 id={titleId} className="font-serif text-xl font-bold text-burgundy-deep">
                What would she say then?
              </h2>
              <p className="text-xs text-burgundy/65">{nickname}</p>
            </div>
            <button
              type="button"
              onClick={closeDock}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-sm font-semibold text-burgundy/70 hover:bg-blush/40 hover:text-burgundy"
              aria-label="Close Dolly chat"
            >
              Close
            </button>
          </div>
          <DollyChatThread compact />
        </section>
      )}

      <button
        type="button"
        onClick={toggleDock}
        className={cn(
          "pointer-events-auto relative ml-auto inline-flex items-center gap-2 rounded-full border-2 border-gold/60 bg-burgundy-deep p-1.5 pr-4 text-left text-cream shadow-[0_8px_28px_rgba(61,15,32,0.35)] transition hover:border-hot-pink",
          hideFab && "invisible pointer-events-none",
          dockOpen && "max-sm:hidden",
        )}
        aria-haspopup="dialog"
        aria-expanded={dockOpen}
        tabIndex={hideFab ? -1 : 0}
      >
        <span className="relative h-12 w-12 overflow-hidden rounded-full border border-cream/40">
          {portrait && (
            <Image
              src={portrait.src}
              alt=""
              fill
              sizes="48px"
              className="object-cover object-top"
            />
          )}
        </span>
        <span>
          <span className="block font-script text-xl leading-none text-hot-pink-light">
            {dockOpen ? "Hide chat" : "Ask Dolly"}
          </span>
          <span className="block text-[11px] text-cream/75">{nickname}</span>
        </span>
      </button>
    </div>
  );
}
