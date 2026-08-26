import Link from "next/link";
import type { CommunityFilterMeta } from "@/lib/community-tags";
import { getMomentById } from "@/lib/moments";

interface CommunityFilterBannerProps {
  community: CommunityFilterMeta;
}

export function CommunityFilterBanner({ community }: CommunityFilterBannerProps) {
  return (
    <section
      className="mb-8 rounded-sm border border-gold/30 bg-gold/5 p-5 sm:p-6"
      aria-labelledby={`community-filter-${community.tag}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
        Community filter
      </p>
      <h2
        id={`community-filter-${community.tag}`}
        className="mt-2 font-serif text-2xl font-bold text-burgundy-deep md:text-3xl"
      >
        {community.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-burgundy/80 sm:text-base">
        {community.intro}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {community.highlights.map((highlight) => {
          const moment = getMomentById(highlight.id);
          if (!moment) return null;
          return (
            <li key={highlight.id}>
              <Link
                href={`/moment/${highlight.id}`}
                className="inline-flex min-h-10 items-center rounded-sm border border-burgundy/15 bg-cream px-3 py-2 text-xs font-semibold text-burgundy transition hover:border-gold hover:text-burgundy-deep"
              >
                {highlight.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
