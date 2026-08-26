import Link from "next/link";
import { COMMUNITY_FILTERS } from "@/lib/community-tags";

const CAUSES = [
  {
    href: COMMUNITY_FILTERS["Black community"].filterHref,
    title: "Black communities",
    line: "TV diversity, Whitney royalties, Beyoncé's welcome, BLM, and renaming Dixie Stampede.",
    moments: [
      { href: "/moment/whitney-royalties", label: "The house Whitney built" },
      { href: "/moment/beyonce-welcome", label: "Welcoming Beyoncé" },
      { href: "/moment/dolly-variety-show", label: "Diverse TV guests" },
    ],
  },
  {
    href: COMMUNITY_FILTERS["Home state"].filterHref,
    title: "Tennessee",
    line: "Dollywood jobs, Smoky Mountain books, Gatlinburg wildfire relief, and a state holiday.",
    moments: [
      { href: "/moment/dollywood", label: "Dollywood opens" },
      { href: "/moment/gatlinburg-relief", label: "Wildfire relief" },
      { href: "/moment/imagination-library", label: "Imagination Library" },
    ],
  },
  {
    href: COMMUNITY_FILTERS["LGBTQ+"].filterHref,
    title: "LGBTQ+ people",
    line: "AIDS-era action, the 1991 song \"Family,\" drag culture, marriage equality, and Tennessee defense.",
    moments: [
      { href: "/moment/common-threads-aids", label: "AIDS documentary" },
      { href: "/moment/family-song", label: "\"Family\" (1991)" },
      { href: "/moment/lgbtq-allyship", label: "Lifetime allyship" },
    ],
  },
  {
    href: "/moment/nine-to-five",
    title: "Working women",
    line: "The anthem that walked out of a typewriter and into offices.",
    moments: [],
  },
  {
    href: "/moment/imagination-library",
    title: "Kids who need books",
    line: "One book a month, in honor of a daddy who never learned to read.",
    moments: [],
  },
] as const;

export function SheStoodWith() {
  return (
    <section className="px-4 py-14 sm:px-6 md:py-20" aria-labelledby="stood-with-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="stood-with-heading"
          className="font-serif text-3xl font-bold text-burgundy-deep md:text-4xl"
        >
          Who she stood with
        </h2>
        <p className="mt-3 max-w-2xl text-burgundy/75">
          A famous name, used on purpose — for working women, kids who needed
          books, her home state, and people who were told they didn&apos;t belong.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CAUSES.map((cause) => (
            <article
              key={cause.href}
              className="border border-burgundy/10 bg-cream p-5 transition hover:border-gold hover:bg-gold/10"
            >
              <Link href={cause.href} className="block">
                <h3 className="font-serif text-xl font-bold text-burgundy-deep">
                  {cause.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-burgundy/75">
                  {cause.line}
                </p>
              </Link>
              {cause.moments.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cause.moments.map((moment) => (
                    <li key={moment.href}>
                      <Link
                        href={moment.href}
                        className="inline-flex min-h-9 items-center rounded-sm border border-burgundy/10 bg-white/70 px-2.5 py-1 text-xs font-semibold text-burgundy transition hover:border-gold hover:text-burgundy-deep"
                      >
                        {moment.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
