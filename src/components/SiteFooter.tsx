import Link from "next/link";
import { AUTHOR } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-burgundy/10 bg-cream py-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:py-14">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="font-serif text-2xl font-bold text-burgundy-deep">
          A fan celebration of Dolly Parton
        </p>
        <p className="font-script mt-3 text-xl text-burgundy sm:text-2xl">
          find out who you are and do it on purpose
        </p>
        <div className="mx-auto my-6 h-px max-w-sm bg-gold/50" />
        <p className="text-sm text-burgundy/70">
          Not affiliated with Dolly Parton, Dollywood, or the Imagination
          Library. Quotes from public sources. The database is yours to remix.
        </p>
        <p className="mt-2 text-xs text-burgundy/50">
          Code: MIT · Data:{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-burgundy-deep"
          >
            CC BY 4.0
          </a>
        </p>
        <p className="mt-3 text-xs text-burgundy/50">
          Written by{" "}
          <a
            href={AUTHOR.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-burgundy-deep"
          >
            {AUTHOR.name}
          </a>{" "}
          at{" "}
          <a
            href={AUTHOR.site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-burgundy-deep"
          >
            {AUTHOR.siteLabel}
          </a>
          {" · "}
          <a
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-burgundy-deep"
          >
            {AUTHOR.githubHandle}
          </a>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
          <Link href="/moments" className="text-burgundy hover:text-burgundy-deep">
            Moments
          </Link>
          <Link href="/letters" className="text-burgundy hover:text-burgundy-deep">
            Letters
          </Link>
          <Link href="/data" className="text-burgundy hover:text-burgundy-deep">
            Open data
          </Link>
          <Link href="/#what-would-dolly-say" className="text-burgundy hover:text-burgundy-deep">
            Ask Dolly
          </Link>
          <Link href="/images" className="text-burgundy hover:text-burgundy-deep">
            Photo credits
          </Link>
          <a
            href="https://imaginationlibrary.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-burgundy-deep"
          >
            Imagination Library
          </a>
        </div>
      </div>
    </footer>
  );
}
