import Link from "next/link";
import { AskDollyButton } from "./AskDollyButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-burgundy/10 bg-cream/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        <Link href="/" className="min-w-0 truncate font-serif text-lg font-bold text-burgundy-deep sm:text-xl">
          Dolly Legacy
        </Link>
        <nav className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <Link
            href="/#life"
            className="hidden min-h-11 items-center px-2.5 text-sm font-medium text-burgundy/80 transition hover:text-burgundy-deep sm:inline-flex sm:px-3"
          >
            Life
          </Link>
          <Link
            href="/moments"
            className="inline-flex min-h-11 items-center px-2.5 text-sm font-medium text-burgundy/80 transition hover:text-burgundy-deep sm:px-3"
          >
            Moments
          </Link>
          <Link
            href="/data"
            className="inline-flex min-h-11 items-center px-2.5 text-sm font-medium text-burgundy/80 transition hover:text-burgundy-deep sm:px-3"
          >
            Data
          </Link>
          <AskDollyButton />
        </nav>
      </div>
    </header>
  );
}
