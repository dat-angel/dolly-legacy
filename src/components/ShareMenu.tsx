"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import {
  copyToClipboard,
  getBlueskyShareUrl,
  getInstagramCaption,
  getThreadsShareUrl,
  getTwitterShareUrl,
  shareContent,
} from "@/lib/share";
import { cn } from "@/lib/utils";

interface ShareMenuProps {
  title: string;
  text: string;
  url: string;
  imageSrc?: string;
  storySrc?: string;
  className?: string;
  label?: string;
  compact?: boolean;
}

export function ShareMenu({
  title,
  text,
  url,
  imageSrc,
  storySrc,
  className,
  label = "Share",
  compact = false,
}: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const canNativeShare = useSyncExternalStore(
    () => () => {},
    () => Boolean(navigator.share),
    () => false,
  );
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function flash(message: string) {
    setStatus(message);
    window.setTimeout(() => setStatus(null), 2200);
  }

  async function handleNativeShare() {
    const result = await shareContent({ title, text, url, imageSrc, storySrc });
    if (result === "shared") {
      setOpen(false);
      flash("Shared!");
    } else if (result === "copied") {
      flash("Link copied!");
    }
  }

  async function handleCopyLink() {
    const ok = await copyToClipboard(url);
    flash(ok ? "Link copied!" : "Copy failed");
  }

  async function handleInstagram() {
    const ok = await copyToClipboard(getInstagramCaption(text, url));
    flash(ok ? "Copied for Instagram" : "Copy failed");
  }

  const triggerClass = compact
    ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-gold/40 px-4 text-sm font-semibold text-gold transition hover:bg-gold/10 active:bg-gold/20"
    : "inline-flex min-h-11 items-center justify-center rounded-sm border border-gold/50 bg-white/80 px-5 text-sm font-semibold text-burgundy transition hover:border-gold hover:bg-gold/10 hover:text-burgundy-deep active:bg-gold/15";

  const badgeClass =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-burgundy-deep text-xs font-bold text-gold";
  const rowClass =
    "flex min-h-12 w-full items-center gap-3 rounded-sm border border-gold/30 bg-white/90 px-3 text-left text-base font-semibold text-burgundy-deep transition active:bg-gold/10";

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={triggerClass}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {status ?? label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-burgundy-deep/50 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md rounded-t-sm border border-gold/40 bg-cream p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-sm sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gold/40 sm:hidden" />
            <h2 id={titleId} className="font-serif text-2xl font-bold text-burgundy-deep">
              Share this
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-burgundy/70">{title}</p>

            <div className="mt-5 grid gap-2">
              {canNativeShare && (
                <button type="button" onClick={handleNativeShare} className={rowClass}>
                  <span className={badgeClass}>✦</span>
                  Instagram, Messages &amp; more
                </button>
              )}
              <button type="button" onClick={handleInstagram} className={rowClass}>
                <span className={badgeClass}>IG</span>
                Copy for Instagram
              </button>
              <a
                href={getTwitterShareUrl(text, url)}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
                onClick={() => setOpen(false)}
              >
                <span className={badgeClass}>𝕏</span>
                X / Twitter
              </a>
              <a
                href={getBlueskyShareUrl(text, url)}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
                onClick={() => setOpen(false)}
              >
                <span className={badgeClass}>🦋</span>
                Bluesky
              </a>
              <a
                href={getThreadsShareUrl(text, url)}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
                onClick={() => setOpen(false)}
              >
                <span className={badgeClass}>@</span>
                Threads
              </a>
              <button type="button" onClick={handleCopyLink} className={rowClass}>
                <span className={badgeClass}>URL</span>
                Copy link
              </button>
            </div>

            {status && (
              <p className="mt-4 text-center text-sm font-semibold text-gold" role="status">
                {status}
              </p>
            )}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 min-h-11 w-full rounded-sm text-sm font-semibold text-burgundy/70 active:text-burgundy"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
