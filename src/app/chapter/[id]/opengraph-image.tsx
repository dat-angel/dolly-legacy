import { ImageResponse } from "next/og";
import { OG_BRAND, OG_COLORS, OG_SIZE, truncateOg } from "@/lib/og-brand";
import { CHAPTERS } from "@/lib/types";

export const alt = "Dolly Legacy chapter";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = CHAPTERS.find((entry) => entry.id === id);
  const title = chapter?.title ?? "Dolly Legacy chapter";
  const subtitle = chapter?.subtitle ?? "Explore a chapter of Dolly Parton's life";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(160deg, ${OG_COLORS.burgundyDeep}, ${OG_COLORS.burgundy} 50%, #6b7280)`,
          color: OG_COLORS.cream,
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 24, color: OG_COLORS.gold, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {OG_BRAND.eyebrow}
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            {truncateOg(title, 60)}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, maxWidth: 920, opacity: 0.92 }}>
            {truncateOg(subtitle, 110)}
          </div>
        </div>
        <div style={{ fontSize: 24, color: OG_COLORS.blush }}>
          Chapter exhibit · shareable moments · dolly-legacy
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
