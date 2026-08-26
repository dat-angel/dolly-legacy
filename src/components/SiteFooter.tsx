import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-walnut/40 bg-forest py-12 pb-[max(3rem,env(safe-area-inset-bottom))] text-cream sm:py-14">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-serif text-2xl font-bold text-cream">
          A fan tribute to Dolly Parton
        </p>
        <p className="font-script mt-3 text-xl text-gold-light sm:text-2xl">
          find out who you are and do it on purpose
        </p>
        <div className="mx-auto my-6 h-px max-w-sm bg-cream/20" />
        <p className="text-sm text-cream/70">
          Not affiliated with Dolly Parton, Dollywood, or the Imagination
          Library. Quotes attributed to public sources.
        </p>
        <p className="mt-2 text-xs text-cream/50">
          Code: MIT · Data:{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light hover:text-cream"
          >
            CC BY 4.0
          </a>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
          <Link href="/moments" className="text-cream/85 hover:text-cream">
            Explore moments
          </Link>
          <Link href="/#what-would-dolly-say" className="text-cream/85 hover:text-cream">
            Ask Dolly
          </Link>
          <Link href="/images" className="text-cream/85 hover:text-cream">
            Photo credits
          </Link>
          <a
            href="https://imaginationlibrary.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/85 hover:text-cream"
          >
            Imagination Library
          </a>
        </div>
      </div>
    </footer>
  );
}
