import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedLetterLine } from "@/components/FeaturedLetterLine";
import { dollyButtonClass } from "@/components/ui/DollyButton";
import { getFeaturedLetter, letters, lettersMeta } from "@/lib/letters";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Letters she sent",
  description:
    "Who Dolly Parton wrote to — typed letters, signed faxes, and songs that were letters. Short public excerpts, open to remix.",
  path: "/letters",
  keywords: [
    "Dolly Parton letters",
    "Dolly Parton fax",
    "Dolly Parton Kenny Rogers letter",
    "Dolly Parton Miley Cyrus",
  ],
});

const FORM_LABEL: Record<(typeof letters)[number]["form"], string> = {
  "typed letter": "Typed letter",
  fax: "Fax",
  "song-letter": "Song as a letter",
  note: "Note with the song",
};

export default function LettersPage() {
  const featured = getFeaturedLetter();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-walnut">
        Desk memos · {lettersMeta.license}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        Letters she sent
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-burgundy/80">
        Reba McEntire has said she only has a fax number for Dolly. Miley
        still collects signed faxes through a lawyer&apos;s office. Kenny got
        a typed letter. Porter got a song. The specialness is the time she
        takes.
      </p>

      {featured && (
        <div className="typewriter-frame mt-10 p-5 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut">
            Featured · {featured.form} · {featured.year}
          </p>
          <p className="mt-4">
            <FeaturedLetterLine text={featured.excerpt} />
          </p>
          <p className="mt-4 text-sm text-burgundy/70">
            TO: {featured.to} · FROM: Dolly
          </p>
        </div>
      )}

      <ul className="mt-12 space-y-6">
        {letters.map((letter) => (
          <li key={letter.id}>
            <article className="typewriter-frame p-5 sm:p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-walnut">
                {FORM_LABEL[letter.form]} · {letter.year}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-bold text-burgundy-deep">
                TO: {letter.to}
              </h2>
              <p className="mt-1 text-sm text-burgundy/65">{letter.toRole}</p>
              <p className="font-script mt-5 text-lg leading-relaxed text-burgundy-deep">
                &ldquo;{letter.excerpt}&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-burgundy/75">
                {letter.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <a
                  href={letter.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy-deep underline-offset-2 hover:underline"
                >
                  {letter.sourceLabel}
                </a>
                {letter.relatedMomentId && (
                  <Link
                    href={`/moment/${letter.relatedMomentId}`}
                    className="text-walnut underline-offset-2 hover:underline"
                  >
                    Related moment →
                  </Link>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm leading-relaxed text-burgundy/70">
        Short excerpts from interviews and auction coverage — not full
        letters. The index is {lettersMeta.license} in{" "}
        <a
          href="https://github.com/dat-angel/dolly-legacy/blob/main/src/content/letters.json"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-burgundy-deep underline-offset-2 hover:underline"
        >
          letters.json
        </a>
        .
      </p>

      <Link
        href="/data"
        className={dollyButtonClass("secondary", "mt-8 w-full sm:w-auto")}
      >
        Open data harbor
      </Link>
    </div>
  );
}
