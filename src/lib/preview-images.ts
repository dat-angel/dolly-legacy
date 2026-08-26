/** LinkedIn/Facebook recommended landscape OG size (1.91:1). */
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** Social preview photos — swap variants in opengraph-image routes. */
export const PREVIEW_IMAGES = {
  literacy: {
    file: "public/images/preview/imagination-library-reading.jpg",
    alt: "Dolly Parton reading to children at a Library of Congress Imagination Library event",
    caption: "Imagination Library — books in kids' hands",
    sharePath: "/images/og-share-moments.jpg",
  },
  allyship: {
    file: "public/images/moments/lgbtq-allyship.jpg",
    alt: "Dolly Parton performing in a rhinestone orange jacket on the Blue Smoke World Tour",
    caption: "A lifetime of standing with LGBTQ+ people",
    sharePath: "/images/og-share.jpg",
  },
} as const;

/** Bump when replacing share JPGs so link unfurlers (especially LinkedIn) fetch fresh previews. */
export const SHARE_IMAGE_VERSION = "4";

export function shareImageUrl(path: string): string {
  return `${path}?v=${SHARE_IMAGE_VERSION}`;
}

export type PreviewImageKey = keyof typeof PREVIEW_IMAGES;
