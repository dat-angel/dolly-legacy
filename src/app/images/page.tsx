import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllImageCredits, getUniqueMomentImageCredits } from "@/lib/images";
import { getMomentCount } from "@/lib/moments";
import { createPageMetadata } from "@/lib/metadata";
import { StitchDivider } from "@/components/decorative";

export const metadata: Metadata = createPageMetadata({
  title: "Photo credits",
  description:
    "Attribution and licensing for Dolly Parton photographs used on Dolly Legacy, sourced from Wikimedia Commons and Creative Commons contributors.",
  path: "/images",
  keywords: ["photo credits", "Wikimedia Commons", "Creative Commons"],
});

export default function ImagesPage() {
  const phaseCredits = getAllImageCredits();
  const momentCredits = getUniqueMomentImageCredits();
  const momentCount = getMomentCount();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        Images &amp; licensing
      </h1>
      <StitchDivider className="max-w-md" />
      <p className="mt-4 max-w-2xl leading-relaxed text-burgundy/80">
        This fan celebration uses photographs from{" "}
        <a
          href="https://commons.wikimedia.org/wiki/Category:Dolly_Parton"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gold hover:text-burgundy"
        >
          Wikimedia Commons
        </a>{" "}
        under public domain or Creative Commons licenses. We are not affiliated
        with Dolly Parton, Dollywood, or their official press teams.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-bold text-burgundy-deep">
        Chapters &amp; decades
      </h2>
      <CreditList credits={phaseCredits} />

      <h2 className="mt-14 font-serif text-2xl font-bold text-burgundy-deep">
        Moments
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-burgundy/70">
        Each of the {momentCount} stories has its own photograph. A few reuse a chapter or
        era portrait when that image is the best licensed match.
      </p>
      <CreditList credits={momentCredits} showThumb />

      <p className="mt-12 text-sm text-burgundy/60">
        Want to contribute a properly licensed photo? See{" "}
        <a
          href="https://github.com/dat-angel/dolly-legacy/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-burgundy"
        >
          CONTRIBUTING.md
        </a>
        .
      </p>

      <Link
        href="/moments"
        className="mt-8 inline-block font-semibold text-gold hover:text-burgundy"
      >
        ← Back to moments
      </Link>
    </div>
  );
}

function CreditList({
  credits,
  showThumb = false,
}: {
  credits: ReturnType<typeof getAllImageCredits>;
  showThumb?: boolean;
}) {
  return (
    <ul className="mt-6 space-y-8">
      {credits.map(({ key, label, credit }) => (
        <li
          key={key}
          className="rounded-sm border border-gold/30 bg-white/70 p-6"
        >
          <div className={showThumb ? "flex gap-5" : undefined}>
            {showThumb && (
              <div className="relative hidden h-24 w-20 shrink-0 overflow-hidden rounded-sm sm:block">
                <Image
                  src={credit.localPath}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-xl font-bold text-burgundy-deep">
                {label}
              </h3>
              <p className="mt-2 text-sm text-burgundy/75">{credit.description}</p>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-burgundy">File</dt>
                  <dd>
                    <a
                      href={credit.commonsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-burgundy"
                    >
                      {credit.commonsTitle}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-burgundy">Author</dt>
                  <dd className="text-burgundy/80">{credit.author}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-burgundy">License</dt>
                  <dd className="text-burgundy/80">{credit.license}</dd>
                </div>
              </dl>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
