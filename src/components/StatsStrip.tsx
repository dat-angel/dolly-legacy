"use client";

import { useEffect, useRef, useState } from "react";
import { getImpactStats } from "@/lib/moments";

const stats = [
  { key: "books" as const, label: "Books gifted" },
  { key: "songs" as const, label: "Songs written" },
  { key: "countries" as const, label: "Countries served" },
  { key: "years" as const, label: "Years" },
] as const;

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
    <section ref={ref} className="stats-strip py-8 text-cream sm:py-10">
      <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-6 px-4 sm:px-6 md:grid-cols-4">
        {stats.map(({ key, label }, i) => (
          <div
            key={key}
            className="text-center transition-opacity duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <p className="font-serif text-2xl font-bold text-gold-light md:text-3xl">
              {data[key]}
            </p>
            <p className="mt-1 text-xs text-cream/70 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
