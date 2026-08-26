import { OG_BRAND, OG_COLORS, truncateOg } from "./og-brand";

type OgPhotoHeroProps = {
  title: string;
  subtitle: string;
  footer?: string;
  photoSrc: string;
  eyebrow?: string;
  /** Bias crop when the source photo is portrait or square. */
  photoPosition?: string;
};

export function OgPhotoHero({
  title,
  subtitle,
  footer,
  photoSrc,
  eyebrow = OG_BRAND.eyebrow,
  photoPosition = "center 20%",
}: OgPhotoHeroProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: OG_COLORS.burgundyDeep,
        color: OG_COLORS.cream,
        fontFamily: "Georgia, serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: photoPosition,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(42,34,27,0.08) 0%, rgba(42,34,27,0.35) 45%, rgba(42,34,27,0.94) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: OG_COLORS.gold,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          padding: "44px 56px 52px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: OG_COLORS.gold,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 0.98 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.3,
            maxWidth: 920,
            opacity: 0.96,
          }}
        >
          {truncateOg(subtitle, 100)}
        </div>
        {footer ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              color: OG_COLORS.blush,
              marginTop: 4,
            }}
          >
            <span>{footer}</span>
            <span>{OG_BRAND.footer}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** @deprecated Use OgPhotoHero — kept for any split-layout callers. */
export const OgPhotoCard = OgPhotoHero;
