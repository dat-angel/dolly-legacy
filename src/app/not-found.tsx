import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { dollyButtonClass } from "@/components/ui/DollyButton";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found",
  description:
    "This page is not part of the Dolly Legacy tribute exhibit. Return to the homepage or browse all 28 moments.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="font-script text-4xl text-hot-pink">lost in the holler</p>
      <h1 className="mt-4 font-serif text-4xl font-bold text-burgundy-deep md:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-burgundy/80">
        That URL is not part of this tribute exhibit. Try the homepage or the
        moments archive instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className={dollyButtonClass("primary")}>
          Back to exhibit
        </Link>
        <Link href="/moments" className={dollyButtonClass("secondary")}>
          Browse moments
        </Link>
      </div>
    </div>
  );
}
