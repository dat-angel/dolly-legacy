/** Social preview photos — swap variants in opengraph-image routes. */
export const PREVIEW_IMAGES = {
  literacy: {
    file: "public/images/preview/imagination-library-reading.jpg",
    alt: "Dolly Parton reading to children at a Library of Congress Imagination Library event",
    caption: "Imagination Library — books in kids' hands",
  },
  allyship: {
    file: "public/images/preview/dumplin-drag-queen.jpg",
    alt: "Dolly Parton with a drag queen impersonator at the Dumplin' premiere",
    caption: "Standing with her drag-queen following",
  },
} as const;

export type PreviewImageKey = keyof typeof PREVIEW_IMAGES;
