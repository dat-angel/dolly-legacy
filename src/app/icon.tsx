import { ImageResponse } from "next/og";
import { getFaviconPhotoSrc } from "@/lib/favicon-photo";
import { IconMarkup } from "@/lib/icon-markup";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const photoSrc = await getFaviconPhotoSrc();

  return new ImageResponse(
    <IconMarkup variant="favicon" photoSrc={photoSrc} />,
    { ...size },
  );
}
