import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og-brand";
import { loadPreviewPhotoSrc } from "@/lib/load-preview-photo";
import { OgPhotoCard } from "@/lib/og-photo-card";
import { getMomentCount } from "@/lib/moments";
import { PREVIEW_IMAGES } from "@/lib/preview-images";

export const alt = "Dolly Legacy — moments archive";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function MomentsOpenGraphImage() {
  const photoSrc = await loadPreviewPhotoSrc("allyship");

  return new ImageResponse(
    (
      <OgPhotoCard
        title="Dolly Legacy"
        subtitle={`${getMomentCount()} moments — quotes, advocacy, and the people she stood with. Open CC BY 4.0 data.`}
        footer={PREVIEW_IMAGES.allyship.caption}
        photoSrc={photoSrc}
      />
    ),
    { ...OG_SIZE },
  );
}
