import type { Metadata } from "next";
import { Suspense } from "react";
import { MomentsArchive } from "@/components/MomentsArchive";
import { createPageMetadata } from "@/lib/metadata";
import { getMomentCount } from "@/lib/moments";
import { PREVIEW_IMAGES, shareImageUrl } from "@/lib/preview-images";

const momentCount = getMomentCount();

export const metadata: Metadata = createPageMetadata({
  title: "All moments archive",
  description:
    `${momentCount} Dolly Parton moments with quotes, hidden facts, era filters, and shareable links — from Appalachian roots and Jolene to the Imagination Library, Tennessee home-state giving, Black community allyship, and LGBTQ+ advocacy.`,
  path: "/moments",
  ogImage: {
    url: shareImageUrl(PREVIEW_IMAGES.literacy.sharePath),
    alt: PREVIEW_IMAGES.literacy.alt,
  },
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
            <p className="text-burgundy/70">
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
