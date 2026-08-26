"use client";

import { useState } from "react";
import {
  copyToClipboard,
  getFacebookShareUrl,
  getTwitterShareUrl,
  shareContent,
} from "@/lib/share";
import { cn } from "@/lib/utils";

interface ShareMenuProps {
  title: string;
  text: string;
  url: string;
  className?: string;
  label?: string;
  compact?: boolean;
}

export function ShareMenu({
  title,
  text,
  url,
  className,
  label = "Share",
  compact = false,
}: ShareMenuProps) {
  const [status, setStatus] = useState<string | null>(null);

  async function handleNativeShare() {
    const result = await shareContent({ title, text, url });
    if (result === "shared") setStatus("Shared!");
    else if (result === "copied") setStatus("Link copied!");
    else setStatus("Could not share");
    resetStatus();
  }

  async function handleCopyLink() {
    const ok = await copyToClipboard(url);
    setStatus(ok ? "Link copied!" : "Copy failed");
    resetStatus();
  }

  async function handleCopyQuote() {
    const ok = await copyToClipboard(`${text}\n${url}`);
    setStatus(ok ? "Copied!" : "Copy failed");
    resetStatus();
  }

  function resetStatus() {
    window.setTimeout(() => setStatus(null), 2000);
  }

  const buttonClass = compact
    ? "rounded-full border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold transition hover:bg-gold/10"
    : "rounded-full border-2 border-dashed border-hot-pink/40 bg-white/80 px-4 py-2 text-sm font-semibold text-burgundy transition hover:border-hot-pink hover:bg-hot-pink/10 hover:text-hot-pink";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="sr-only">{label}</span>
      <button type="button" onClick={handleNativeShare} className={buttonClass}>
        {status ?? (compact ? "Share" : "Share")}
      </button>
      <button type="button" onClick={handleCopyLink} className={buttonClass}>
        Copy link
      </button>
      {!compact && (
        <button type="button" onClick={handleCopyQuote} className={buttonClass}>
          Copy quote
        </button>
      )}
      <a
        href={getTwitterShareUrl(text, url)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        Post
      </a>
      <a
        href={getFacebookShareUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        Facebook
      </a>
    </div>
  );
}
