"use client";

import { useEffect, useRef, useState } from "react";
import { getImpactStats } from "@/lib/moments";
import { Rhinestone, StarBurst } from "./decorative";

const stats = [
  { key: "books" as const, label: "Books gifted", icon: "📚" },
  { key: "songs" as const, label: "Songs written", icon: "♪" },
  { key: "countries" as const, label: "Countries served", icon: "🌎" },
  { key: "years" as const, label: "Years of grace", icon: "✦" },
];

export function StatsStrip() {
  const data = getImpactStats();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="stats-strip py-10 text-cream sm:py-12">
      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 sm:gap-6 sm:px-6 md:grid-cols-4 md:gap-8">
        {stats.map(({ key, label, icon }, i) => (
          <div
            key={key}
            className="stat-bubble mx-auto w-full max-w-[140px] transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.8)",
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <span className="text-2xl" aria-hidden>
              {icon}
            </span>
            <p className="font-serif text-2xl font-bold text-gold-light md:text-3xl">
              {data[key]}
            </p>
            <p className="mt-0.5 text-center text-xs font-medium text-cream/80">
              {label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <Rhinestone size={12} className="text-gold-light/60" />
        <StarBurst size={14} className="text-hot-pink-light/70" />
        <Rhinestone size={12} className="text-gold-light/60" />
      </div>
    </section>
  );
}
