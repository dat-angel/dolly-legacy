import { ImageResponse } from "next/og";
import { IconMarkup } from "@/lib/icon-markup";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconMarkup variant="favicon" />, { ...size });
}
