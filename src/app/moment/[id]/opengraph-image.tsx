import { ImageResponse } from "next/og";
import { getMomentById } from "@/lib/moments";
import { OG_BRAND, OG_COLORS, OG_SIZE, truncateOg } from "@/lib/og-brand";

export const alt = "Dolly Legacy moment";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const moment = getMomentById(id);
  const title = moment?.title ?? "Dolly Legacy moment";
  const quote = moment?.quote ? truncateOg(`“${moment.quote}”`, 120) : truncateOg(moment?.summary ?? "", 120);
  const year = moment?.year ? String(moment.year) : moment?.era ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(145deg, ${OG_COLORS.forest}, ${OG_COLORS.burgundyDeep} 55%, ${OG_COLORS.burgundy})`,
          color: OG_COLORS.cream,
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 24, color: OG_COLORS.gold, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {OG_BRAND.eyebrow}
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            {truncateOg(title, 70)}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.35, maxWidth: 980, opacity: 0.92 }}>
            {quote}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>{year}</span>
          <span style={{ color: OG_COLORS.blush }}>Share this moment · Dolly Legacy</span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
