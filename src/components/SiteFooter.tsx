import Link from "next/link";
import { Rhinestone, StitchDivider, Butterfly } from "./decorative";

export function SiteFooter() {
  return (
    <footer className="relative border-t-2 border-dashed border-blush-deep/40 bg-gradient-to-t from-blush/20 to-cream py-14">
      <Butterfly
        size={36}
        className="absolute bottom-8 left-[10%] text-hot-pink/30"
      />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <Rhinestone size={18} className="text-gold" />
          <p className="font-serif text-2xl font-bold text-burgundy-deep">
            A fan tribute to Dolly Parton
          </p>
          <Rhinestone size={18} className="text-gold" />
        </div>
        <p className="font-script mt-2 text-2xl text-hot-pink/80">
          find out who you are and do it on purpose
        </p>
        <StitchDivider className="mx-auto max-w-sm" />
        <p className="text-sm text-burgundy/60">
          Not affiliated with Dolly Parton, Dollywood, or the Imagination
          Library. Quotes attributed to public sources.
        </p>
        <p className="mt-2 text-xs text-burgundy/50">
          Code: MIT · Data:{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-hot-pink"
          >
            CC BY 4.0
          </a>
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sm font-semibold">
          <Link
            href="/moments"
            className="text-burgundy hover:text-hot-pink"
          >
            Explore moments
          </Link>
          <a
            href="https://imaginationlibrary.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-hot-pink"
          >
            Imagination Library
          </a>
        </div>
      </div>
    </footer>
  );
}
