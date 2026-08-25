import Link from "next/link";
import { Rhinestone, Butterfly } from "./decorative";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-dashed border-blush-deep/40 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="group flex items-center gap-2.5">
          <Rhinestone size={20} className="text-gold transition group-hover:text-hot-pink" />
          <span className="font-serif text-2xl font-bold logo-shimmer">
            Dolly Legacy
          </span>
          <Butterfly size={28} className="hidden text-hot-pink sm:block" />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-2">
          <Link
            href="/moments"
            className="rounded-full px-4 py-2 text-burgundy transition hover:bg-blush/40 hover:text-hot-pink"
          >
            All Moments
          </Link>
          <Link
            href="/#what-would-dolly-say"
            className="hidden rounded-full bg-gradient-to-r from-hot-pink/10 to-gold/10 px-4 py-2 text-burgundy transition hover:from-hot-pink/20 hover:to-gold/20 sm:inline"
          >
            ✦ Ask Dolly
          </Link>
        </nav>
      </div>
    </header>
  );
}
