import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { dollyButtonClass } from "@/components/ui/DollyButton";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description:
    "This page is not part of Dolly Legacy. Head home or browse the moments archive.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        Wrong turn, honey
      </h1>
      <p className="mt-4 text-lg text-burgundy/80">
        That URL isn&apos;t in this celebration. Try home, the moments, or the
        open data harbor.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className={dollyButtonClass("primary")}>
          Back home
        </Link>
        <Link href="/moments" className={dollyButtonClass("secondary")}>
          Browse moments
        </Link>
        <Link href="/data" className={dollyButtonClass("secondary")}>
          Open data
        </Link>
      </div>
    </div>
  );
}
