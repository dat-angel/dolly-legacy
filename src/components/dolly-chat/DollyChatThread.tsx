"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ERAS } from "@/lib/types";
import {
  DOLLY_SAY_PLACEHOLDERS,
  getPromptsForEra,
  LIFE_STAGES,
  type ChatEra,
} from "@/lib/dolly-say";
import { getEraImage, getMomentImage } from "@/lib/images";
import {
  getDollySayShareUrl,
  getMomentShareText,
  getMomentStoryUrl,
} from "@/lib/share";
import { cn } from "@/lib/utils";
import { ShareMenu } from "../ShareMenu";
import { dollyButtonClass } from "../ui/DollyButton";
import { Rhinestone } from "../decorative";
import { useDollyChat, type ChatMessage } from "./DollyChatProvider";

interface DollyChatThreadProps {
  compact?: boolean;
  className?: string;
}

export function DollyChatThread({ compact = false, className }: DollyChatThreadProps) {
  const { era, messages, pending, setEra, ask } = useDollyChat();
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const prompts = getPromptsForEra(era);
  const placeholder = DOLLY_SAY_PLACEHOLDERS[0];

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, pending, reduceMotion]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    ask(text);
    setInput("");
  }

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <EraStrip era={era} onSelect={setEra} compact={compact} />

      <div
        ref={scroller}
        className={cn(
          "min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-1 py-3",
          compact ? "max-h-[min(52vh,28rem)]" : "max-h-[min(62vh,34rem)] sm:max-h-[28rem]",
        )}
        aria-live="polite"
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} compact={compact} />
        ))}
        {pending && (
          <p className="pl-12 font-script text-lg text-hot-pink">thinking on it, hon…</p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 pb-2">
        {prompts.map((prompt) => (
          <button
            key={`${era}-${prompt.label}`}
            type="button"
            onClick={() => ask(prompt.text)}
            className="min-h-10 rounded-full border border-blush-deep/40 bg-white/80 px-3 py-1.5 text-xs font-medium text-burgundy transition hover:border-hot-pink hover:bg-hot-pink/10 hover:text-hot-pink"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <label className="sr-only" htmlFor={compact ? "dolly-dock-input" : "dolly-chat-input"}>
          What would you ask Dolly?
        </label>
        <input
          id={compact ? "dolly-dock-input" : "dolly-chat-input"}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="min-h-12 flex-1 rounded-full border-2 border-dashed border-hot-pink/40 bg-white/90 px-4 text-base text-burgundy-deep placeholder:text-burgundy/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
        />
        <button
          type="submit"
          className={dollyButtonClass("primary", "min-h-12 shrink-0 px-5 sm:px-6")}
        >
          <Rhinestone size={14} className="text-gold-light" />
          Ask
        </button>
      </form>
    </div>
  );
}

function EraStrip({
  era,
  onSelect,
  compact,
}: {
  era: ChatEra;
  onSelect: (era: ChatEra) => void;
  compact: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="A time in Dolly's life"
      className="-mx-1 flex gap-2 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]"
    >
      <EraChip
        selected={era === "any"}
        onSelect={() => onSelect("any")}
        label="Any time"
        sub="1946–now"
        compact={compact}
      />
      {ERAS.map((decade) => {
        const image = getEraImage(decade);
        const stage = LIFE_STAGES[decade];
        return (
          <EraChip
            key={decade}
            selected={era === decade}
            onSelect={() => onSelect(decade)}
            label={decade}
            sub={stage.nickname}
            photo={image?.src}
            photoAlt={image?.alt ?? `${decade} Dolly`}
            compact={compact}
          />
        );
      })}
    </div>
  );
}

function EraChip({
  selected,
  onSelect,
  label,
  sub,
  photo,
  photoAlt,
  compact,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  sub: string;
  photo?: string;
  photoAlt?: string;
  compact: boolean;
}) {
  const size = compact ? "h-12 w-12" : "h-14 w-14";
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${label}, ${sub}`}
      onClick={onSelect}
      className={cn(
        "flex shrink-0 flex-col items-center gap-1 rounded-2xl px-1 py-1 text-center transition",
        selected ? "text-hot-pink" : "text-burgundy/70 hover:text-burgundy",
      )}
    >
      <span
        className={cn(
          "relative overflow-hidden rounded-full border-2",
          size,
          selected
            ? "border-hot-pink shadow-[0_0_0_3px_rgba(233,30,140,0.25)]"
            : "border-blush-deep/50",
        )}
      >
        {photo ? (
          <Image src={photo} alt={photoAlt ?? label} fill sizes="56px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/40 to-hot-pink/30 font-script text-lg text-burgundy-deep" aria-hidden>
            all
          </span>
        )}
      </span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-wide">{label}</span>
      <span className="max-w-[4.6rem] truncate text-[10px] leading-tight">{sub}</span>
    </button>
  );
}

function ChatBubble({ message, compact }: { message: ChatMessage; compact: boolean }) {
  if (message.role === "stage") {
    return (
      <p className="mx-auto max-w-[34ch] text-center text-sm leading-relaxed text-burgundy/75">
        {message.text}
      </p>
    );
  }

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="dolly-chat-user max-w-[85%] px-4 py-2.5 text-sm leading-relaxed sm:text-base">
          {message.text}
        </p>
      </div>
    );
  }

  const { reply, query } = message;
  const image = getMomentImage(reply.moment.id) ?? getEraImage(reply.moment.era);
  const quote = reply.moment.quote;

  return (
    <div className="flex gap-2.5">
      {image && (
        <div className="relative mt-1 h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gold/50">
          <Image src={image.src} alt="" fill sizes="36px" className="object-cover" />
        </div>
      )}
      <div className="dolly-chat-dolly min-w-0 flex-1 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-gold">
          {LIFE_STAGES[reply.moment.era].nickname}
          {reply.moment.year ? ` · ${reply.moment.year}` : ` · ${reply.moment.era}`}
        </p>
        <p className="mt-1 text-sm text-burgundy/70">{reply.frame}</p>
        {quote ? (
          <blockquote className="mt-2 font-serif text-lg leading-snug text-burgundy-deep sm:text-xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-burgundy-deep">{reply.moment.summary}</p>
        )}
        {!compact && quote && (
          <p className="mt-2 line-clamp-2 text-sm text-burgundy/70">{reply.moment.summary}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            href={`/moment/${reply.moment.id}`}
            className="text-sm font-semibold text-hot-pink hover:text-burgundy"
          >
            {reply.moment.title} →
          </Link>
          <ShareMenu
            title="What would Dolly say?"
            text={getMomentShareText(reply.moment)}
            url={getDollySayShareUrl(
              reply.moment.id,
              query,
              reply.requestedEra === "any" ? undefined : reply.requestedEra,
            )}
            imageSrc={image?.src}
            storySrc={getMomentStoryUrl(reply.moment.id)}
            compact
            label="Share"
          />
        </div>
      </div>
    </div>
  );
}
