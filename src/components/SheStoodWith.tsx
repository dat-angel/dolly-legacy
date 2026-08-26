import Link from "next/link";

const CAUSES = [
  {
    href: "/moment/nine-to-five",
    title: "Working women",
    line: "The anthem that walked out of a typewriter and into offices.",
  },
  {
    href: "/moment/imagination-library",
    title: "Kids who need books",
    line: "One book a month, in honor of a daddy who never learned to read.",
  },
  {
    href: "/moment/lgbtq-allyship",
    title: "LGBTQ+ people",
    line: "Love is love is love — and she said it in public, on purpose.",
  },
  {
    href: "/moment/blm-support",
    title: "Black communities",
    line: "She showed up with money, royalties, and a simple rule: everybody matters.",
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
          books, and people who were told they didn&apos;t belong.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CAUSES.map((cause) => (
            <Link
              key={cause.href}
              href={cause.href}
              className="border border-burgundy/10 bg-cream p-5 transition hover:border-gold hover:bg-gold/10"
            >
              <h3 className="font-serif text-xl font-bold text-burgundy-deep">
                {cause.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-burgundy/75">
                {cause.line}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
