import { OG_BRAND, OG_COLORS, truncateOg } from "./og-brand";

type OgPhotoCardProps = {
  title: string;
  subtitle: string;
  footer?: string;
  photoSrc: string;
  eyebrow?: string;
};

export function OgPhotoCard({
  title,
  subtitle,
  footer,
  photoSrc,
  eyebrow = OG_BRAND.eyebrow,
}: OgPhotoCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: OG_COLORS.burgundyDeep,
        color: OG_COLORS.cream,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "52%",
          padding: "56px 48px",
          borderRight: `4px solid ${OG_COLORS.gold}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: OG_COLORS.gold,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.02 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, opacity: 0.94 }}>
            {truncateOg(subtitle, 120)}
          </div>
        </div>
        {footer ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              color: OG_COLORS.blush,
            }}
          >
            <span>{footer}</span>
            <span>{OG_BRAND.footer}</span>
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "48%",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={576}
          height={630}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(42,34,27,0.35) 0%, transparent 45%)",
          }}
        />
      </div>
    </div>
  );
}
