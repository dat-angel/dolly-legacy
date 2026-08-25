"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  startOnView?: boolean;
  playSound?: boolean;
}

export function Typewriter({
  text,
  className,
  speed = 45,
  startOnView = true,
  playSound = true,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [active, setActive] = useState(!startOnView);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const done = active && displayed.length >= text.length;

  const playClick = useCallback(() => {
    if (!playSound || typeof window === "undefined") return;
    try {
      if (!audioRef.current) {
        audioRef.current = new AudioContext();
      }
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800 + Math.random() * 400;
      osc.type = "square";
      gain.gain.value = 0.03;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio not available
    }
  }, [playSound]);

  useEffect(() => {
    if (!startOnView) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          if (reduced) {
            setDisplayed(text);
          }
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView, text]);

  useEffect(() => {
    if (!active || displayed.length >= text.length) return;
    if (displayed === text) return;

    const timer = setTimeout(() => {
      const next = text[displayed.length];
      if (next && next !== " ") playClick();
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [active, displayed, text, speed, playClick]);

  const visibleText = active ? displayed : "";

  return (
    <p
      ref={containerRef}
      className={cn("font-mono text-lg leading-relaxed md:text-xl", className)}
      aria-label={done ? text : undefined}
    >
      {visibleText}
      {active && !done && (
        <span className="typewriter-caret ml-0.5 inline-block h-5 w-0.5 translate-y-0.5 bg-gold align-middle" />
      )}
    </p>
  );
}
