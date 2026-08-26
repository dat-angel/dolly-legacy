"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getEraImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { DollyChatThread } from "./DollyChatThread";
import { useDollyChat } from "./DollyChatProvider";

export function DollyChatDock() {
  const { dockOpen, closeDock, toggleDock } = useDollyChat();
  const titleId = useId();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [sectionVisible, setSectionVisible] = useState(false);
  const portrait = getEraImage("1970s");

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
          className="pointer-events-auto absolute inset-0 bg-burgundy-deep/50 backdrop-blur-[2px] sm:hidden"
          onClick={closeDock}
        />
      )}

      {dockOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="vanity-frame pointer-events-auto relative z-10 flex max-h-[min(82vh,40rem)] w-full flex-col overflow-hidden rounded-t-sm p-4 shadow-2xl sm:max-h-[min(78vh,42rem)] sm:w-[24.5rem] sm:p-5"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 id={titleId} className="font-serif text-xl font-bold text-burgundy-deep">
                What would Dolly say?
              </h2>
            </div>
            <button
              type="button"
              onClick={closeDock}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-sm font-semibold text-burgundy/70 hover:bg-gold/10 hover:text-burgundy"
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
          "pointer-events-auto relative ml-auto inline-flex items-center gap-2 border border-gold/70 bg-burgundy-deep p-1.5 pr-4 text-left text-cream",
          hideFab && "invisible pointer-events-none",
          dockOpen && "max-sm:hidden",
        )}
        aria-haspopup="dialog"
        aria-expanded={dockOpen}
        tabIndex={hideFab ? -1 : 0}
      >
        <span className="relative h-12 w-12 overflow-hidden border border-gold/40">
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
          <span className="block text-sm font-semibold text-cream">
            {dockOpen ? "Hide" : "Ask Dolly"}
          </span>
        </span>
      </button>
    </div>
  );
}
