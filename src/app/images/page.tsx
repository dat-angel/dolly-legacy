import type { Metadata } from "next";
import Link from "next/link";
import { getAllImageCredits } from "@/lib/images";
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
  const credits = getAllImageCredits();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-script text-3xl text-hot-pink">photo credits</p>
      <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        Images &amp; licensing
      </h1>
      <StitchDivider className="max-w-md" />
      <p className="mt-4 max-w-2xl leading-relaxed text-burgundy/80">
        This fan tribute uses photographs from{" "}
        <a
          href="https://commons.wikimedia.org/wiki/Category:Dolly_Parton"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-hot-pink hover:text-burgundy"
        >
          Wikimedia Commons
        </a>{" "}
        under public domain or Creative Commons licenses. We are not affiliated
        with Dolly Parton, Dollywood, or their official press teams.
      </p>

      <ul className="mt-10 space-y-8">
        {credits.map(({ key, label, credit }) => (
          <li
            key={key}
            className="rounded-sm border-2 border-dashed border-blush-deep/40 bg-white/70 p-6"
          >
            <h2 className="font-serif text-xl font-bold text-burgundy-deep">
              {label}
            </h2>
            <p className="mt-2 text-sm text-burgundy/75">{credit.description}</p>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-burgundy">File</dt>
                <dd>
                  <a
                    href={credit.commonsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hot-pink hover:text-burgundy"
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
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-burgundy/60">
        Per-moment thumbnails are tracked in{" "}
        <code className="rounded bg-blush/30 px-1">IMAGES.md</code> in the repository.
        Want to contribute a properly licensed photo? See{" "}
        <a
          href="https://github.com/dat-angel/dolly-legacy/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-hot-pink hover:text-burgundy"
        >
          CONTRIBUTING.md
        </a>
        .
      </p>

      <Link
        href="/moments"
        className="mt-8 inline-block font-semibold text-hot-pink hover:text-burgundy"
      >
        ← Back to moments
      </Link>
    </div>
  );
}
