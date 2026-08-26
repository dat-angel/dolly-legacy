import Link from "next/link";
import { getFeaturedLetter, letters } from "@/lib/letters";
import { dollyButtonClass } from "./ui/DollyButton";

export function LettersMemo() {
  const featured = getFeaturedLetter();
  const names = [...new Set(letters.map((letter) => letter.to))].join(", ");

  return (
    <section
      className="px-4 py-14 sm:px-6 md:py-20"
      aria-labelledby="letters-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="letters-heading"
          className="font-serif text-3xl font-bold text-burgundy-deep md:text-4xl"
        >
          She wrote to people
        </h2>
        <p className="mt-3 max-w-2xl text-burgundy/75">
          Typed letters. Signed faxes. Songs that were really goodbye notes.
          A famous name that still takes the time to put TO: on the page —{" "}
          {names}.
        </p>

        {featured && (
          <div className="typewriter-frame mt-8 max-w-xl p-5 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-walnut">
              Memo · {featured.year} · {featured.form}
            </p>
            <p className="mt-3 font-mono text-sm text-burgundy/70">
              TO: {featured.to}
              <br />
              FROM: Dolly
            </p>
            <p className="font-script mt-5 text-lg leading-snug text-burgundy-deep sm:text-xl">
              &ldquo;{featured.excerpt}&rdquo;
            </p>
          </div>
        )}

        <Link
          href="/letters"
          className={dollyButtonClass("primary", "mt-8 w-full sm:w-auto")}
        >
          Read who she wrote to
        </Link>
      </div>
    </section>
  );
}
