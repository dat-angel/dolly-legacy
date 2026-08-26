import { ImageResponse } from "next/og";
import { OG_COLORS } from "@/lib/og-brand";
import { SITE } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: `linear-gradient(160deg, ${OG_COLORS.forest}, ${OG_COLORS.burgundyDeep})`,
          color: OG_COLORS.cream,
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1 }}>D</div>
        <div style={{ fontSize: 22, letterSpacing: "0.08em", color: OG_COLORS.gold }}>
          {SITE.name}
        </div>
      </div>
    ),
    { ...size },
  );
}
