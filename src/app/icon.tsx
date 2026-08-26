import { ImageResponse } from "next/og";
import { OG_COLORS } from "@/lib/og-brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: OG_COLORS.gold,
          color: OG_COLORS.burgundyDeep,
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
