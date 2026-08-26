import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { moments, momentsMeta } from "@/lib/moments";
import { absoluteUrl, SITE } from "@/lib/site";
import { dollyButtonClass } from "@/components/ui/DollyButton";

export const metadata: Metadata = createPageMetadata({
  title: "Open data harbor",
  description:
    `${moments.length} Dolly Parton moments as free CC BY 4.0 JSON — quotes, song and film stories, philanthropy, advocacy, and photo credits for remixing.`,
  path: "/data",
  keywords: [
    "Dolly Parton open data",
    "Dolly Parton quotes database",
    "CC BY 4.0",
    "Dolly Parton song credits",
  ],
});

const FILES = [
  {
    name: "moments.json",
    href: absoluteUrl("/data/moments.json"),
    github: "https://github.com/dat-angel/dolly-legacy/blob/main/data/moments.json",
    use: "The harbor — quotes, years, tags, sources, who she stood with",
    primary: true,
  },
  {
    name: "moments.schema.json",
    href: "https://github.com/dat-angel/dolly-legacy/blob/main/src/content/moments.schema.json",
    use: "How to add a moment without breaking the shape",
  },
  {
    name: "image-credits.json",
    href: "https://github.com/dat-angel/dolly-legacy/blob/main/src/content/image-credits.json",
    use: "Photo credits and licenses for portraits",
  },
  {
    name: "moment-images.json",
    href: "https://github.com/dat-angel/dolly-legacy/blob/main/src/content/moment-images.json",
    use: "Which picture goes with which story",
  },
  {
    name: "letters.json",
    href: "https://github.com/dat-angel/dolly-legacy/blob/main/src/content/letters.json",
    use: "Who she wrote to — typed letters, faxes, song-letters, short excerpts",
  },
] as const;

export default function DataPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        Open data harbor
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-burgundy/80">
        {moments.length} moments, licensed {momentsMeta.license}, made to be
        copied. Quotes, production notes, song and film stories, advocacy —
        a celebration you can build on.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={absoluteUrl("/data/moments.json")}
          download
          className={dollyButtonClass("primary", "w-full sm:w-auto")}
        >
          Download moments.json
        </a>
        <a
          href="https://github.com/dat-angel/dolly-legacy"
          target="_blank"
          rel="noopener noreferrer"
          className={dollyButtonClass("secondary", "w-full sm:w-auto")}
        >
          GitHub repo
        </a>
      </div>

      <p className="mt-4 font-mono text-sm text-burgundy/70">
        {absoluteUrl("/data/moments.json")}
      </p>

      <h2 className="mt-14 font-serif text-2xl font-bold text-burgundy-deep">
        Files
      </h2>
      <ul className="mt-4 divide-y divide-burgundy/10 border-y border-burgundy/10">
        {FILES.map((file) => (
          <li key={file.name} className="py-4">
            <a
              href={file.href}
              target={"primary" in file ? undefined : "_blank"}
              rel={"primary" in file ? undefined : "noopener noreferrer"}
              download={"primary" in file ? "moments.json" : undefined}
              className="font-mono text-sm font-semibold text-burgundy-deep hover:text-burgundy"
            >
              {file.name}
            </a>
            <p className="mt-1 text-sm text-burgundy/70">{file.use}</p>
            {"github" in file && file.github ? (
              <a
                href={file.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-burgundy/60 hover:text-burgundy-deep"
              >
                Also on GitHub → data/moments.json
              </a>
            ) : null}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-serif text-2xl font-bold text-burgundy-deep">
        Song &amp; film stories
      </h2>
      <p className="mt-3 text-burgundy/75">
        We don&apos;t republish full lyrics or studio sheets. We do keep the
        public story: who wrote it, when, and why it still works. Start with{" "}
        <Link href="/moments?category=music" className="font-semibold text-burgundy-deep underline-offset-2 hover:underline">
          music
        </Link>
        ,{" "}
        <Link href="/moments?category=lyrics" className="font-semibold text-burgundy-deep underline-offset-2 hover:underline">
          lyrics
        </Link>
        ,{" "}
        <Link href="/moment/nine-to-five" className="font-semibold text-burgundy-deep underline-offset-2 hover:underline">
          9 to 5
        </Link>
        , and{" "}
        <Link href="/moment/nine-to-five-film" className="font-semibold text-burgundy-deep underline-offset-2 hover:underline">
          the film
        </Link>
        .
      </p>

      <h2 className="mt-14 font-serif text-2xl font-bold text-burgundy-deep">
        Use it
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-burgundy/75">
        Data from the Dolly Legacy Moments Database by {momentsMeta.attribution}{" "}
        — CC BY 4.0
        <br />
        {SITE.repository}
      </p>
      <p className="mt-4 text-sm text-burgundy/70">
        Want to add a moment? See{" "}
        <a
          href="https://github.com/dat-angel/dolly-legacy/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-burgundy-deep underline-offset-2 hover:underline"
        >
          CONTRIBUTING.md
        </a>
        .
      </p>
    </div>
  );
}
