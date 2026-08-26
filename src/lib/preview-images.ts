/** Social preview photos — swap variants in opengraph-image routes. */
export const PREVIEW_IMAGES = {
  literacy: {
    file: "public/images/preview/imagination-library-reading.jpg",
    alt: "Dolly Parton reading to children at a Library of Congress Imagination Library event",
    caption: "Imagination Library — books in kids' hands",
    sharePath: "/images/og-share-moments.jpg",
  },
  allyship: {
    file: "public/images/preview/dumplin-drag-queen.jpg",
    alt: "Dolly Parton with a drag queen impersonator at the Dumplin' premiere",
    caption: "Standing with her drag-queen following",
    sharePath: "/images/og-share.jpg",
  },
} as const;

/** Bump when replacing share JPGs so link unfurlers fetch fresh previews. */
export const SHARE_IMAGE_VERSION = "2";

export function shareImageUrl(path: string): string {
  return `${path}?v=${SHARE_IMAGE_VERSION}`;
}

export type PreviewImageKey = keyof typeof PREVIEW_IMAGES;
