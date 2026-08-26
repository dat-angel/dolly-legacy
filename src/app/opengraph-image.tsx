import { ImageResponse } from "next/og";
import { OG_BRAND, OG_COLORS, OG_SIZE, truncateOg } from "@/lib/og-brand";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${OG_COLORS.forest} 0%, ${OG_COLORS.burgundyDeep} 55%, ${OG_COLORS.burgundy} 100%)`,
          color: OG_COLORS.cream,
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: OG_COLORS.gold,
            }}
          >
            {OG_BRAND.eyebrow}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>
            Dolly Legacy
          </div>
          <div style={{ fontSize: 40, lineHeight: 1.25, maxWidth: 920, opacity: 0.95 }}>
            {truncateOg(SITE.tagline, 90)}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <span>28 moments · 5 chapters · ask Dolly anything</span>
          <span style={{ color: OG_COLORS.blush }}>{OG_BRAND.footer}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
