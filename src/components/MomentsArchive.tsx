"use client";

import { useEffect, useMemo, useState, startTransition } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { CommunityFilterBanner } from "@/components/CommunityFilterBanner";
import { getCommunityFilter } from "@/lib/community-tags";
import { filterMoments, getMomentById, getMomentCount, getRandomMoment } from "@/lib/moments";
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
  const [showFacts, setShowFacts] = useState(false);

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

  const communityFilter = getCommunityFilter(tag);
  const momentCount = getMomentCount();

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
          <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
            All {momentCount} moments
          </h1>
          <p className="mt-2 text-burgundy/70">
            {filtered.length} moment{filtered.length !== 1 ? "s" : ""}
            <span className="hidden sm:inline">
              {" "}
              · Press{" "}
              <kbd className="rounded-sm border border-gold/40 px-2 py-0.5 font-mono text-xs">
                ?
              </kbd>{" "}
              to surprise yourself
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => surprise(m.id)}
              className="min-h-11 rounded-sm border border-gold/40 bg-white/80 px-4 py-2 text-sm font-semibold text-burgundy transition hover:border-gold hover:bg-gold/10 hover:text-burgundy-deep"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {communityFilter && <CommunityFilterBanner community={communityFilter} />}

      <EraGallery activeEra={era} onSelectEra={setEra} />

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search moments, quotes, tags… try typing “jolene”"
          className="min-h-12 w-full rounded-sm border border-gold/40 bg-white/90 px-4 py-3.5 text-base text-burgundy-deep placeholder:text-burgundy/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/25 sm:px-6"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "min-h-11 rounded-sm px-4 py-2 text-sm transition",
            category === "all"
              ? "bg-gold text-burgundy-deep"
              : "border border-burgundy/20 text-burgundy hover:border-gold hover:text-burgundy-deep",
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
              "min-h-11 rounded-sm px-4 py-2 text-sm capitalize transition",
              category === c.id
                ? "bg-gold text-burgundy-deep"
                : "border border-burgundy/20 text-burgundy hover:border-gold",
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
            "min-h-11 rounded-sm px-3 py-2 text-xs transition",
            era === "all"
              ? "bg-gold text-burgundy-deep"
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
              "min-h-11 rounded-sm px-3 py-2 text-xs transition",
              era === e
                ? "bg-gold text-burgundy-deep"
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
              "min-h-11 rounded-sm px-3 py-2 text-xs transition",
              tag === t
                ? "bg-gold/20 text-burgundy-deep"
                : "border border-gold/30 text-burgundy/60 hover:text-burgundy",
            )}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowFacts(!showFacts)}
          className={cn(
            "ml-auto min-h-11 rounded-sm px-3 py-2 text-xs transition",
            showFacts
              ? "bg-gold/30 text-burgundy-deep"
              : "border border-gold/40 text-gold",
          )}
        >
          {showFacts ? "Extra facts on" : "Show extra facts"}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m, i) => (
          <MomentCard
            key={m.id}
            moment={m}
            showHidden={showFacts}
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
