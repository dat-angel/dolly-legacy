import { OG_COLORS } from "./og-brand";

type IconVariant = "favicon" | "apple";

export function IconMarkup({ variant }: { variant: IconVariant }) {
  const isApple = variant === "apple";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(145deg, ${OG_COLORS.burgundyDeep} 0%, ${OG_COLORS.burgundy} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* stitch border */}
      <div
        style={{
          position: "absolute",
          inset: isApple ? 10 : 3,
          border: `${isApple ? 4 : 2}px dashed ${OG_COLORS.gold}`,
          borderRadius: isApple ? 28 : 6,
          opacity: 0.85,
        }}
      />

      {/* coat-of-many-colors patches */}
      {(
        [
          { top: isApple ? 14 : 4, left: isApple ? 14 : 4, color: "#c45c5c" },
          { top: isApple ? 14 : 4, right: isApple ? 14 : 4, color: "#5c7fc4" },
          { bottom: isApple ? 14 : 4, left: isApple ? 14 : 4, color: "#5c9e6b" },
          { bottom: isApple ? 14 : 4, right: isApple ? 14 : 4, color: "#c4a05c" },
        ] as const
      ).map((patch, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: isApple ? 18 : 6,
            height: isApple ? 18 : 6,
            borderRadius: 2,
            background: patch.color,
            opacity: 0.55,
            ...patch,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: isApple ? 6 : 0,
        }}
      >
        <ButterflyMark size={isApple ? 72 : 18} />
        <div
          style={{
            fontSize: isApple ? 56 : 16,
            fontWeight: 700,
            lineHeight: 1,
            color: OG_COLORS.gold,
            fontFamily: "Georgia, serif",
            letterSpacing: isApple ? "-0.02em" : 0,
            marginTop: isApple ? 4 : 1,
          }}
        >
          D
        </div>
        {isApple && (
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: OG_COLORS.cream,
              opacity: 0.9,
              marginTop: 2,
            }}
          >
            Legacy
          </div>
        )}
      </div>
    </div>
  );
}

function ButterflyMark({ size }: { size: number }) {
  const wingW = size * 0.42;
  const wingH = size * 0.55;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size * 0.72,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: size * 0.04,
          top: size * 0.08,
          width: wingW,
          height: wingH,
          borderRadius: "70% 30% 70% 30%",
          background: OG_COLORS.gold,
          transform: "rotate(-18deg)",
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: size * 0.04,
          top: size * 0.08,
          width: wingW,
          height: wingH,
          borderRadius: "30% 70% 30% 70%",
          background: OG_COLORS.gold,
          transform: "rotate(18deg)",
          opacity: 0.95,
        }}
      />
      <div
        style={{
          width: size * 0.12,
          height: size * 0.45,
          borderRadius: 999,
          background: OG_COLORS.cream,
        }}
      />
    </div>
  );
}
