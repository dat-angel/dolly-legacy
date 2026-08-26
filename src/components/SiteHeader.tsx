import Link from "next/link";
import { AskDollyButton } from "./AskDollyButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-burgundy-deep/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 sm:py-3">
        <Link href="/" className="group flex min-h-11 min-w-0 items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]"
          />
          <span className="truncate font-script text-xl tracking-wide text-cream sm:text-2xl">
            Dolly Legacy
          </span>
        </Link>
        <nav className="flex shrink-0 items-center gap-1 text-sm font-semibold">
          <Link
            href="/#life"
            className="inline-flex min-h-11 items-center rounded-sm px-2.5 font-mono text-xs uppercase tracking-[0.16em] text-cream/80 transition hover:bg-white/10 hover:text-gold sm:px-4"
          >
            Life
          </Link>
          <Link
            href="/moments"
            className="inline-flex min-h-11 items-center rounded-sm px-2.5 font-mono text-xs uppercase tracking-[0.16em] text-cream/80 transition hover:bg-white/10 hover:text-gold sm:px-4"
          >
            Moments
          </Link>
          <AskDollyButton />
        </nav>
      </div>
    </header>
  );
}
