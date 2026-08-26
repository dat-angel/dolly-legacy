"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { getMomentImage } from "@/lib/images";
import { getRelatedMoments } from "@/lib/moments";
import {
  getMomentShareText,
  getMomentShareUrl,
} from "@/lib/share";
import type { Moment } from "@/lib/types";
import { MomentPortrait } from "./MomentPortrait";
import { ShareMenu } from "./ShareMenu";

interface MomentDrawerProps {
  moment: Moment;
  onClose: () => void;
  onSelect: (moment: Moment) => void;
}

export function MomentDrawer({ moment, onClose, onSelect }: MomentDrawerProps) {
  const related = getRelatedMoments(moment);
  const shareUrl = getMomentShareUrl(moment.id);
  const shareText = getMomentShareText(moment);
  const image = getMomentImage(moment.id);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    const path = window.location.pathname;
    if (path === "/moments") {
      window.history.replaceState(null, "", `/moments?highlight=${moment.id}`);
    } else if (!path.startsWith("/moment/")) {
      window.history.replaceState(
        null,
        "",
        `/?moment=${moment.id}${moment.chapter ? `&chapter=${moment.chapter}` : ""}#life`,
      );
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [moment.id, moment.chapter, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-burgundy-deep/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-4 border-double border-gold/50 bg-cream p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[85vh] sm:rounded-sm sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="moment-drawer-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center text-burgundy/50 hover:text-burgundy sm:right-6 sm:top-6"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="mb-4 flex flex-wrap gap-2">
          {moment.year && (
            <span className="rounded-full bg-blush/50 px-2.5 py-0.5 text-xs font-medium">
              {moment.year}
            </span>
          )}
          <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs capitalize">
            {moment.category}
          </span>
          {moment.chapter && (
            <span className="rounded-full border border-blush/50 px-2.5 py-0.5 text-xs capitalize">
              {moment.chapter}
            </span>
          )}
        </div>

        <h2
          id="moment-drawer-title"
          className="pr-10 font-serif text-2xl font-bold text-burgundy-deep sm:text-3xl"
        >
          {moment.title}
        </h2>

        {image && (
          <MomentPortrait
            image={image}
            showCaption
            className="mt-6 aspect-[4/3] w-full sm:aspect-[16/10]"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        )}

        {moment.quote && (
          <blockquote className="mt-6 font-serif text-xl italic leading-snug text-burgundy rhinestone sm:text-2xl">
            &ldquo;{moment.quote}&rdquo;
          </blockquote>
        )}

        <p className="mt-6 leading-relaxed text-burgundy/80">
          {moment.body ?? moment.summary}
        </p>

        {moment.hiddenFact && (
          <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4">
            <p className="text-sm font-medium text-gold">Between the rhinestones</p>
            <p className="mt-2 text-sm italic text-burgundy/70">{moment.hiddenFact}</p>
          </div>
        )}

        {moment.source && (
          <a
            href={moment.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-gold hover:underline"
          >
            Source →
          </a>
        )}

        <ShareMenu
          title={moment.title}
          text={shareText}
          url={shareUrl}
          imageSrc={image?.src}
          className="mt-8"
          label={`Share ${moment.title}`}
        />

        {related.length > 0 && (
          <div className="mt-8 border-t border-blush/40 pt-6">
            <p className="mb-3 text-sm font-medium text-burgundy/60">
              This connects to…
            </p>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelect(r)}
                  className="min-h-11 rounded-full border border-blush/50 bg-white/60 px-4 py-2 text-sm text-burgundy transition hover:border-gold"
                >
                  {r.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
