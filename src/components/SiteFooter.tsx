import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gold/20 bg-burgundy-deep py-12 pb-[max(3rem,env(safe-area-inset-bottom))] text-cream sm:py-14">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-serif text-2xl font-bold text-cream">
          A fan tribute to Dolly Parton
        </p>
        <p className="font-script mt-3 text-xl text-gold sm:text-2xl">
          find out who you are and do it on purpose
        </p>
        <div className="mx-auto my-6 h-px max-w-sm bg-gold/30" />
        <p className="text-sm text-cream/60">
          Not affiliated with Dolly Parton, Dollywood, or the Imagination
          Library. Quotes attributed to public sources.
        </p>
        <p className="mt-2 text-xs text-cream/45">
          Code: MIT · Data:{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light"
          >
            CC BY 4.0
          </a>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-6 font-mono text-xs font-semibold uppercase tracking-[0.14em]">
          <Link href="/moments" className="text-cream/80 hover:text-gold">
            Explore moments
          </Link>
          <Link href="/#what-would-dolly-say" className="text-cream/80 hover:text-gold">
            Ask Dolly
          </Link>
          <Link href="/images" className="text-cream/80 hover:text-gold">
            Photo credits
          </Link>
          <a
            href="https://imaginationlibrary.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/80 hover:text-gold"
          >
            Imagination Library
          </a>
        </div>
      </div>
    </footer>
  );
}
