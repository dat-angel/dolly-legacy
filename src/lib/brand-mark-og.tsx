import { OG_COLORS } from "./og-brand";

type BrandMarkOgProps = {
  size: number;
  /** Extra padding + gold ring for apple-touch icon */
  framed?: boolean;
};

/** Div-based wig + rhinestones for @vercel/og ImageResponse (Satori). */
export function BrandMarkOg({ size, framed = false }: BrandMarkOgProps) {
  const pad = framed ? size * 0.07 : 0;
  const inner = size - pad * 2;
  const compact = size <= 48;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OG_COLORS.burgundyDeep,
        padding: pad,
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: framed ? inner * 0.22 : inner * 0.14,
          border: framed ? `4px solid ${OG_COLORS.gold}` : "none",
          background: OG_COLORS.burgundyDeep,
          overflow: "hidden",
        }}
      >
        {/* Left poof */}
        <div
          style={{
            position: "absolute",
            width: inner * (compact ? 0.42 : 0.36),
            height: inner * (compact ? 0.52 : 0.46),
            left: inner * (compact ? -0.02 : 0.02),
            top: inner * (compact ? 0.18 : 0.22),
            borderRadius: "50%",
            background: "linear-gradient(145deg, #fff8dc 0%, #e2b422 55%, #a67c00 100%)",
          }}
        />

        {/* Right poof */}
        <div
          style={{
            position: "absolute",
            width: inner * (compact ? 0.42 : 0.36),
            height: inner * (compact ? 0.52 : 0.46),
            right: inner * (compact ? -0.02 : 0.02),
            top: inner * (compact ? 0.18 : 0.22),
            borderRadius: "50%",
            background: "linear-gradient(215deg, #fff8dc 0%, #e2b422 55%, #a67c00 100%)",
          }}
        />

        {/* Center crown */}
        <div
          style={{
            position: "absolute",
            width: inner * 0.72,
            height: inner * (compact ? 0.56 : 0.5),
            top: inner * (compact ? 0.06 : 0.1),
            borderRadius: "50% 50% 46% 46%",
            background: "linear-gradient(180deg, #fffef0 0%, #f0c94a 40%, #e2b422 100%)",
            zIndex: 1,
          }}
        />

        {/* Bangs sweep */}
        <div
          style={{
            position: "absolute",
            width: inner * 0.44,
            height: inner * 0.16,
            top: inner * (compact ? 0.36 : 0.38),
            borderRadius: "50%",
            background: "linear-gradient(180deg, #fffef5 0%, #f5d76e 100%)",
            zIndex: 2,
          }}
        />

        {compact ? (
          <>
            <RhinestoneOg size={inner} top={0.12} left={0.22} scale={1.2} z={3} />
            <RhinestoneOg size={inner} top={0.04} left={0.44} scale={1.35} z={3} />
            <RhinestoneOg size={inner} top={0.12} left={0.66} scale={1.2} z={3} />
          </>
        ) : (
          <>
            <RhinestoneOg size={inner} top={0.16} left={0.26} scale={1} z={3} />
            <RhinestoneOg size={inner} top={0.08} left={0.44} scale={1.15} z={3} />
            <RhinestoneOg size={inner} top={0.18} left={0.62} scale={0.95} z={3} />
            <RhinestoneOg size={inner} top={0.3} left={0.34} scale={0.75} z={3} />
            <RhinestoneOg size={inner} top={0.32} left={0.54} scale={0.75} z={3} />
          </>
        )}
      </div>
    </div>
  );
}

function RhinestoneOg({
  size,
  top,
  left,
  scale,
  z,
}: {
  size: number;
  top: number;
  left: number;
  scale: number;
  z: number;
}) {
  const gem = size * 0.1 * scale;

  return (
    <div
      style={{
        position: "absolute",
        top: size * top,
        left: size * left,
        width: gem,
        height: gem,
        zIndex: z,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: gem,
          height: gem,
          background: "linear-gradient(135deg, #ffffff 0%, #fbf6ea 50%, #e2b422 100%)",
          border: `${Math.max(1, gem * 0.14)}px solid #fffef5`,
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}
