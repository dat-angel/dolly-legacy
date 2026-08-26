import { OG_COLORS } from "@/lib/og-brand";

type BrandMarkProps = {
  size?: number;
  className?: string;
  /** Favicon / apple-touch: full bleed. Header: inset with padding. */
  variant?: "icon" | "inline";
};

/** Stylized blonde wig + rhinestones — header logo (SVG, crisp at any size). */
export function BrandMark({
  size = 36,
  className,
  variant = "inline",
}: BrandMarkProps) {
  const pad = variant === "inline" ? 2 : 0;
  const inner = size - pad * 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id="brand-wig" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8dc" />
          <stop offset="50%" stopColor={OG_COLORS.gold} />
          <stop offset="100%" stopColor="#a67c00" />
        </linearGradient>
        <linearGradient id="brand-rhinestone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fbf6ea" />
          <stop offset="100%" stopColor="#e2b422" />
        </linearGradient>
      </defs>

      <rect
        x={pad}
        y={pad}
        width={inner}
        height={inner}
        rx={inner * 0.14}
        fill={OG_COLORS.burgundyDeep}
      />

      {/* Left poof */}
      <ellipse
        cx={inner * 0.2 + pad}
        cy={inner * 0.46 + pad}
        rx={inner * 0.2}
        ry={inner * 0.24}
        fill="url(#brand-wig)"
      />
      {/* Right poof */}
      <ellipse
        cx={inner * 0.8 + pad}
        cy={inner * 0.46 + pad}
        rx={inner * 0.2}
        ry={inner * 0.24}
        fill="url(#brand-wig)"
      />
      {/* Crown */}
      <ellipse
        cx={inner * 0.5 + pad}
        cy={inner * 0.34 + pad}
        rx={inner * 0.34}
        ry={inner * 0.28}
        fill="url(#brand-wig)"
      />
      {/* Bangs */}
      <ellipse
        cx={inner * 0.5 + pad}
        cy={inner * 0.44 + pad}
        rx={inner * 0.2}
        ry={inner * 0.07}
        fill="#fffef5"
        opacity={0.92}
      />

      <Rhinestone cx={inner * 0.3 + pad} cy={inner * 0.2 + pad} r={inner * 0.045} />
      <Rhinestone cx={inner * 0.5 + pad} cy={inner * 0.12 + pad} r={inner * 0.05} />
      <Rhinestone cx={inner * 0.7 + pad} cy={inner * 0.2 + pad} r={inner * 0.045} />
    </svg>
  );
}

function Rhinestone({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(45)`}>
      <rect
        x={-r}
        y={-r}
        width={r * 2}
        height={r * 2}
        rx={r * 0.15}
        fill="url(#brand-rhinestone)"
        stroke="#fffef5"
        strokeWidth={r * 0.14}
      />
    </g>
  );
}
