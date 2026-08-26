import Link from "next/link";
import { AskDollyButton } from "./AskDollyButton";
import { Rhinestone, Butterfly } from "./decorative";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-dashed border-blush-deep/40 bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 sm:py-3">
        <Link href="/" className="group flex min-h-11 min-w-0 items-center gap-2">
          <Rhinestone size={18} className="shrink-0 text-gold transition group-hover:text-hot-pink" />
          <span className="truncate font-serif text-xl font-bold logo-shimmer sm:text-2xl">
            Dolly Legacy
          </span>
          <Butterfly size={28} className="hidden text-hot-pink sm:block" />
        </Link>
        <nav className="flex shrink-0 items-center gap-1 text-sm font-semibold">
          <Link
            href="/#life"
            className="inline-flex min-h-11 items-center rounded-full px-2.5 text-burgundy transition hover:bg-blush/40 hover:text-hot-pink sm:px-4"
          >
            Life
          </Link>
          <Link
            href="/moments"
            className="inline-flex min-h-11 items-center rounded-full px-2.5 text-burgundy transition hover:bg-blush/40 hover:text-hot-pink sm:px-4"
          >
            Moments
          </Link>
          <AskDollyButton />
        </nav>
      </div>
    </header>
  );
}
