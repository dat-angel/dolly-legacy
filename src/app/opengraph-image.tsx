import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og-brand";
import { loadPreviewPhotoSrc } from "@/lib/load-preview-photo";
import { OgPhotoHero } from "@/lib/og-photo-card";
import { getMomentCount } from "@/lib/moments";
import { PREVIEW_IMAGES } from "@/lib/preview-images";
import { getSiteDescription, SITE } from "@/lib/site";

export const alt = PREVIEW_IMAGES.allyship.alt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photoSrc = await loadPreviewPhotoSrc("allyship");

  return new ImageResponse(
    (
      <OgPhotoHero
        title="Dolly Legacy"
        subtitle={getSiteDescription()}
        footer={`${getMomentCount()} moments · Open CC BY 4.0 data`}
        photoSrc={photoSrc}
        photoPosition="top"
      />
    ),
    { ...OG_SIZE },
  );
}
