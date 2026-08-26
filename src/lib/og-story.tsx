import { STORY_SIZE, OG_BRAND, OG_COLORS, truncateOg } from "./og-brand";

type StoryCardProps = {
  eyebrow?: string;
  title: string;
  quote?: string;
  year?: string;
  photoSrc?: string;
};

export function StoryCardMarkup({
  eyebrow = OG_BRAND.eyebrow,
  title,
  quote,
  year,
  photoSrc,
}: StoryCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(180deg, ${OG_COLORS.burgundyDeep} 0%, ${OG_COLORS.burgundy} 55%, ${OG_COLORS.hotPink} 100%)`,
        color: OG_COLORS.cream,
        fontFamily: "Georgia, serif",
      }}
    >
      {photoSrc ? (
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: 980,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={1080}
            height={980}
            style={{ objectFit: "cover", objectPosition: "center top", width: "100%", height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(61,15,32,0.05) 40%, rgba(61,15,32,0.88) 100%)",
            }}
          />
        </div>
      ) : (
        <div style={{ height: 120 }} />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          padding: "56px 64px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: OG_COLORS.gold,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {truncateOg(title, 48)}
          </div>
          {quote ? (
            <div style={{ fontSize: 40, lineHeight: 1.3, opacity: 0.95 }}>
              {truncateOg(quote, 140)}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: OG_COLORS.blush,
          }}
        >
          <span>{year || "Dolly Parton"}</span>
          <span>{OG_BRAND.footer}</span>
        </div>
      </div>
    </div>
  );
}

export function bufferToDataUrl(file: Buffer, mime = "image/jpeg"): string {
  return `data:${mime};base64,${Buffer.from(file).toString("base64")}`;
}

export { STORY_SIZE };
