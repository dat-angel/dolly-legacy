import type { Metadata } from "next";
import { Suspense } from "react";
import { MomentsArchive } from "@/components/MomentsArchive";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "All moments archive",
  description:
    "Browse 28 Dolly Parton moments with quotes, hidden facts, era filters, and shareable links — from Appalachian roots and Jolene to the Imagination Library and modern advocacy.",
  path: "/moments",
  keywords: [
    "Dolly Parton archive",
    "Dolly Parton quotes",
    "Dolly Parton facts",
    "Dolly Parton timeline",
    "country music archive",
  ],
});

export default function MomentsPage() {
  return (
    <div className="relative overflow-hidden px-4 py-10 sm:px-6 md:py-16">
      <div className="relative mx-auto max-w-6xl">
        <Suspense
          fallback={
            <p className="font-script text-2xl text-gold">
              Loading moments…
            </p>
          }
        >
          <MomentsArchive />
        </Suspense>
      </div>
    </div>
  );
}
