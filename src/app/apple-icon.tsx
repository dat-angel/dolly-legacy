import { ImageResponse } from "next/og";
import { getFaviconPhotoSrc } from "@/lib/favicon-photo";
import { IconMarkup } from "@/lib/icon-markup";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const photoSrc = await getFaviconPhotoSrc();

  return new ImageResponse(
    <IconMarkup variant="apple" photoSrc={photoSrc} />,
    { ...size },
  );
}
