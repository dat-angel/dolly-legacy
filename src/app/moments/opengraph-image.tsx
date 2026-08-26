import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og-brand";
import { loadPreviewPhotoSrc } from "@/lib/load-preview-photo";
import { OgPhotoHero } from "@/lib/og-photo-card";
import { getMomentCount } from "@/lib/moments";
import { PREVIEW_IMAGES } from "@/lib/preview-images";

export const alt = PREVIEW_IMAGES.literacy.alt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function MomentsOpenGraphImage() {
  const photoSrc = await loadPreviewPhotoSrc("literacy");

  return new ImageResponse(
    (
      <OgPhotoHero
        title="Dolly Legacy"
        subtitle={`${getMomentCount()} moments — quotes, advocacy, and the people she stood with.`}
        footer={PREVIEW_IMAGES.literacy.caption}
        photoSrc={photoSrc}
        photoPosition="center 35%"
      />
    ),
    { ...OG_SIZE },
  );
}
