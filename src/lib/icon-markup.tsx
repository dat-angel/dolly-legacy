import { OG_COLORS } from "./og-brand";

type IconVariant = "favicon" | "apple";

export function IconMarkup({
  variant,
  photoSrc,
}: {
  variant: IconVariant;
  photoSrc: string;
}) {
  const isApple = variant === "apple";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OG_COLORS.burgundyDeep,
        padding: isApple ? 8 : 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: isApple ? 36 : 9999,
          overflow: "hidden",
          border: isApple ? `3px solid ${OG_COLORS.gold}` : "none",
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={isApple ? 164 : 32}
          height={isApple ? 164 : 32}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>
    </div>
  );
}
