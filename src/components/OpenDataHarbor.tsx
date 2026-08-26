import Link from "next/link";
import { moments, momentsMeta } from "@/lib/moments";
import { dollyButtonClass } from "./ui/DollyButton";

const FILES = [
  {
    href: "/moments",
    title: "Moments & quotes",
    detail: `${moments.length} stories with quotes, sources, and tags`,
  },
  {
    href: "/moments?category=music",
    title: "Songs",
    detail: "Jolene, Coat of Many Colors, I Will Always Love You, 9 to 5",
  },
  {
    href: "/moment/nine-to-five-film",
    title: "Film & production",
    detail: "Nine to Five and the workplace anthem behind it",
  },
  {
    href: "/letters",
    title: "Letters",
    detail: "Who she wrote to — typed notes, faxes, song-letters",
  },
  {
    href: "/images",
    title: "Photo credits",
    detail: "Wikimedia Commons licenses for every portrait",
  },
] as const;

export function OpenDataHarbor() {
  return (
    <section
      id="data"
      className="border-y border-burgundy/10 bg-cream px-4 py-14 sm:px-6 md:py-20"
      aria-labelledby="data-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="data-heading"
          className="font-serif text-3xl font-bold text-burgundy-deep md:text-4xl"
        >
          The data is open. Take it.
        </h2>
        <p className="mt-3 max-w-2xl text-burgundy/75">
          Quotes, tags, philanthropy, advocacy, song and film stories — a{" "}
          {momentsMeta.license} harbor. Use it in class, an app, or a playlist
          essay. The files are the party favors.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FILES.map((file) => (
            <Link
              key={file.href}
              href={file.href}
              className="border border-burgundy/10 bg-background p-4 transition hover:border-gold"
            >
              <h3 className="font-semibold text-burgundy-deep">{file.title}</h3>
              <p className="mt-2 text-sm text-burgundy/70">{file.detail}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/data" className={dollyButtonClass("primary", "w-full sm:w-auto")}>
            Browse the files
          </Link>
          <a
            href="https://github.com/dat-angel/dolly-legacy/blob/main/src/content/moments.json"
            target="_blank"
            rel="noopener noreferrer"
            className={dollyButtonClass("secondary", "w-full sm:w-auto")}
          >
            moments.json on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
