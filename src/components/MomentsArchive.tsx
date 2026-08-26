"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { filterMoments, getMomentById, getRandomMoment, getRelatedMoments } from "@/lib/moments";
import { CATEGORIES, ERAS, type Category, type Era, type Moment, type Mood } from "@/lib/types";
import { MomentCard } from "./ChapterSection";
import { EraGallery } from "./EraGallery";
import { cn } from "@/lib/utils";

const TAGS = [
  "LGBTQ+",
  "Black community",
  "women",
  "literacy",
  "Tennessee",
] as const;

const MOODS: { id: Mood; label: string }[] = [
  { id: "laugh", label: "Need a laugh" },
  { id: "courage", label: "Need courage" },
  { id: "facts", label: "Need the facts" },
  { id: "surprise", label: "Surprise me" },
];

export function MomentsArchive() {
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const [category, setCategory] = useState<Category | "all">("all");
  const [era, setEra] = useState<Era | "all">("all");
  const [tag, setTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Moment | null>(null);
  const [dismissedHighlight, setDismissedHighlight] = useState(false);
  const [showRhinestones, setShowRhinestones] = useState(false);

  const highlightedMoment =
    !dismissedHighlight && highlightId
      ? getMomentById(highlightId)
      : undefined;
  const activeMoment = selected ?? highlightedMoment ?? null;

  const filtered = useMemo(
    () =>
      filterMoments({
        category,
        era,
        tag: tag ?? undefined,
        search: search || undefined,
      }),
    [category, era, tag, search],
  );

  function surprise(mood?: Mood) {
    const m = getRandomMoment(mood);
    setDismissedHighlight(true);
    setSelected(m);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        surprise();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleSearchChange(value: string) {
    setSearch(value);
    if (value.toLowerCase() === "jolene") {
      const jolene = getMomentById("jolene-and-iwill");
      if (jolene) {
        setDismissedHighlight(true);
        setSelected(jolene);
      }
    }
  }

  function closeDrawer() {
    setSelected(null);
    setDismissedHighlight(true);
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-script text-3xl text-hot-pink">the archive</p>
          <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
            All Moments
          </h1>
          <p className="mt-2 text-burgundy/70">
            {filtered.length} moment{filtered.length !== 1 ? "s" : ""} · Press{" "}
            <kbd className="rounded border-2 border-dashed border-blush px-2 py-0.5 font-mono text-xs">
              ?
            </kbd>{" "}
            to surprise yourself
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => surprise(m.id)}
              className="rounded-full border-2 border-dashed border-blush-deep/40 bg-white/80 px-4 py-2 text-sm font-semibold text-burgundy transition hover:border-hot-pink hover:bg-hot-pink/10 hover:text-hot-pink"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <EraGallery activeEra={era} onSelectEra={setEra} />

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search moments, quotes, tags… try typing “jolene”"
          className="w-full rounded-full border-2 border-dashed border-hot-pink/30 bg-white/90 px-6 py-3.5 text-burgundy-deep placeholder:text-burgundy/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm transition",
            category === "all"
              ? "bg-gradient-to-r from-hot-pink to-burgundy text-cream"
              : "border-2 border-dashed border-blush/60 text-burgundy hover:border-hot-pink hover:text-hot-pink",
          )}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm capitalize transition",
              category === c.id
                ? "bg-gradient-to-r from-hot-pink to-burgundy text-cream"
                : "border-2 border-dashed border-blush/60 text-burgundy hover:border-hot-pink",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setEra("all")}
          className={cn(
            "rounded-full px-3 py-1 text-xs transition",
            era === "all"
              ? "bg-gold/20 text-burgundy-deep"
              : "text-burgundy/60 hover:text-burgundy",
          )}
        >
          All eras
        </button>
        {ERAS.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setEra(e)}
            className={cn(
              "rounded-full px-3 py-1 text-xs transition",
              era === e
                ? "bg-gold/20 text-burgundy-deep"
                : "text-burgundy/60 hover:text-burgundy",
            )}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(tag === t ? null : t)}
            className={cn(
              "rounded-full px-3 py-1 text-xs transition",
              tag === t
                ? "bg-blush text-burgundy-deep"
                : "border border-blush/40 text-burgundy/60 hover:text-burgundy",
            )}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowRhinestones(!showRhinestones)}
          className={cn(
            "ml-auto rounded-full px-3 py-1 text-xs transition",
            showRhinestones
              ? "bg-gold/30 text-burgundy-deep"
              : "border border-gold/40 text-gold",
          )}
        >
          {showRhinestones ? "✦ Rhinestones on" : "Read between the rhinestones"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelected(m)}
            className="text-left"
          >
            <MomentCard moment={m} showHidden={showRhinestones} />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-burgundy/60">
          No moments match — try a different filter or ask Dolly on the
          homepage.
        </p>
      )}

      <AnimatePresence>
        {activeMoment && (
          <MomentDrawer
            moment={activeMoment}
            onClose={closeDrawer}
            onSelect={(m) => {
              setDismissedHighlight(true);
              setSelected(m);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function MomentDrawer({
  moment,
  onClose,
  onSelect,
}: {
  moment: Moment;
  onClose: () => void;
  onSelect: (m: Moment) => void;
}) {
  const related = getRelatedMoments(moment);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-burgundy-deep/40 p-4 backdrop-blur-sm sm:items-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-sm border-4 border-double border-gold/50 bg-cream p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 text-burgundy/50 hover:text-burgundy"
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
          </div>

          <h2 className="font-serif text-3xl font-bold text-burgundy-deep">
            {moment.title}
          </h2>

          {moment.quote && (
            <blockquote className="mt-6 font-serif text-2xl italic leading-snug text-burgundy rhinestone">
              &ldquo;{moment.quote}&rdquo;
            </blockquote>
          )}

          <p className="mt-6 leading-relaxed text-burgundy/80">
            {moment.body ?? moment.summary}
          </p>

          {moment.hiddenFact && (
            <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-4">
              <p className="text-sm font-medium text-gold">
                Between the rhinestones
              </p>
              <p className="mt-2 text-sm italic text-burgundy/70">
                {moment.hiddenFact}
              </p>
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
                    className="rounded-full border border-blush/50 bg-white/60 px-4 py-2 text-sm text-burgundy transition hover:border-gold"
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {moment.quote && (
            <button
              type="button"
              onClick={() => {
                const text = `"${moment.quote}" — ${moment.title}${moment.year ? ` (${moment.year})` : ""}\nhttps://dolly-legacy.vercel.app/moments?highlight=${moment.id}`;
                navigator.clipboard.writeText(text);
              }}
              className="mt-6 rounded-full border border-gold/40 px-5 py-2 text-sm text-gold transition hover:bg-gold/10"
            >
              Copy quote to share
            </button>
          )}
        </motion.div>
      </motion.div>
  );
}
