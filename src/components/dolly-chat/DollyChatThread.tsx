"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  DOLLY_SAY_PLACEHOLDERS,
  DOLLY_SAY_PROMPTS,
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
import { useDollyChat, type ChatMessage } from "./DollyChatProvider";

interface DollyChatThreadProps {
  compact?: boolean;
  className?: string;
}

export function DollyChatThread({ compact = false, className }: DollyChatThreadProps) {
  const { messages, pending, ask } = useDollyChat();
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
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
          <p className="font-mono text-sm text-gold">…</p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 pb-2">
        {DOLLY_SAY_PROMPTS.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={() => ask(prompt.text)}
            className="min-h-10 rounded-sm border border-gold/40 bg-cream px-3 py-1.5 text-xs font-medium text-burgundy transition hover:border-gold hover:bg-gold/10"
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
          className="min-h-12 flex-1 rounded-sm border border-gold/40 bg-white/80 px-4 text-base text-burgundy-deep placeholder:text-burgundy/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
        />
        <button
          type="submit"
          className={dollyButtonClass("primary", "min-h-12 shrink-0 rounded-sm px-5 sm:px-6")}
        >
          Ask
        </button>
      </form>
    </div>
  );
}

function ChatBubble({ message, compact }: { message: ChatMessage; compact: boolean }) {
  if (message.role === "stage") {
    return (
      <p className="mx-auto max-w-[36ch] text-center font-mono text-sm leading-relaxed text-burgundy/70">
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
        <div className="relative mt-1 h-9 w-9 shrink-0 overflow-hidden border border-gold/50">
          <Image src={image.src} alt="" fill sizes="36px" className="object-cover" />
        </div>
      )}
      <div className="dolly-chat-dolly min-w-0 flex-1 px-4 py-3">
        {quote ? (
          <blockquote className="font-mono text-base leading-relaxed text-burgundy-deep sm:text-lg">
            &ldquo;{quote}&rdquo;
          </blockquote>
        ) : (
          <p className="text-sm leading-relaxed text-burgundy-deep">{reply.moment.summary}</p>
        )}
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gold">
          {reply.moment.year ?? reply.moment.era}
        </p>
        {!compact && !quote && (
          <p className="mt-2 line-clamp-2 text-sm text-burgundy/70">{reply.moment.summary}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            href={`/moment/${reply.moment.id}`}
            className="text-sm font-semibold text-gold hover:text-burgundy"
          >
            {reply.moment.title} →
          </Link>
          <ShareMenu
            title="What would Dolly say?"
            text={getMomentShareText(reply.moment)}
            url={getDollySayShareUrl(reply.moment.id, query)}
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
