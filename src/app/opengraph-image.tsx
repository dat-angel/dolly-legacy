import { ImageResponse } from "next/og";
import { OG_BRAND, OG_COLORS, OG_SIZE, truncateOg } from "@/lib/og-brand";
import { getMomentCount } from "@/lib/moments";
import { getSiteDescription, SITE } from "@/lib/site";

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
          background: OG_COLORS.cream,
          color: OG_COLORS.burgundyDeep,
          padding: "72px",
          fontFamily: "Georgia, serif",
          border: `24px solid ${OG_COLORS.gold}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: OG_COLORS.forest,
            }}
          >
            {OG_BRAND.eyebrow}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02 }}>
            Dolly Legacy
          </div>
          <div style={{ fontSize: 40, lineHeight: 1.25, maxWidth: 920 }}>
            {truncateOg(getSiteDescription(), 110)}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: OG_COLORS.burgundy }}>
          <span>{getMomentCount()} moments · Open CC BY 4.0 data</span>
          <span>{OG_BRAND.footer}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
