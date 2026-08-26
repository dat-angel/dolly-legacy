"use client";

import { useEffect, useMemo, useState, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { filterMoments, getMomentById, getRandomMoment } from "@/lib/moments";
import { getMomentShareUrl } from "@/lib/share";
import { CATEGORIES, ERAS, type Category, type Era, type Moment, type Mood } from "@/lib/types";
import { MomentCard } from "./ChapterSection";
import { EraGallery } from "./EraGallery";
import { MomentDrawer } from "./MomentDrawer";
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

  useEffect(() => {
    const eraParam = searchParams.get("era");
    const categoryParam = searchParams.get("category");
    const tagParam = searchParams.get("tag");

    startTransition(() => {
      if (eraParam && ERAS.includes(eraParam as Era)) setEra(eraParam as Era);
      if (categoryParam && CATEGORIES.some((c) => c.id === categoryParam)) {
        setCategory(categoryParam as Category);
      }
      if (tagParam) setTag(tagParam);
    });
  }, [searchParams]);

  const activeMomentId = activeMoment?.id;

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (era !== "all") params.set("era", era);
    if (tag) params.set("tag", tag);
    if (activeMomentId) params.set("highlight", activeMomentId);

    const query = params.toString();
    window.history.replaceState(null, "", query ? `/moments?${query}` : "/moments");
  }, [category, era, tag, activeMomentId]);

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
        {filtered.map((m, i) => (
          <MomentCard
            key={m.id}
            moment={m}
            showHidden={showRhinestones}
            index={i}
            onOpen={() => {
              setDismissedHighlight(true);
              setSelected(m);
            }}
            shareUrl={getMomentShareUrl(m.id)}
          />
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
