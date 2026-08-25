import { cn } from "@/lib/utils";

export function Rhinestone({
  className,
  size = 16,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("sparkle-gem shrink-0", className)}
      style={style}
      aria-hidden
    >
      <path
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.8 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z"
        fill="currentColor"
      />
      <path
        d="M12 6l1 3h3.2l-2.6 1.9 1 3.1L12 13l-2.6 1.9 1-3.1L7.8 9H11l1-3z"
        fill="white"
        opacity="0.55"
      />
    </svg>
  );
}

export function Butterfly({
  className,
  size = 48,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 48"
      className={cn("butterfly-float", className)}
      style={style}
      aria-hidden
    >
      <path
        d="M32 24c0-8 4-14 10-16-6 4-8 10-8 16 0 6 2 12 8 16-6-2-10-8-10-16z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M32 24c0-8-4-14-10-16 6 4 8 10 8 16 0 6-2 12-8 16 6-2 10-8 10-16z"
        fill="currentColor"
        opacity="0.7"
      />
      <ellipse cx="32" cy="26" rx="2.5" ry="10" fill="currentColor" />
      <circle cx="32" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}

export function StarBurst({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("sparkle-twinkle", className)}
      aria-hidden
    >
      <path
        d="M12 0l1.5 5.5L19 7l-5.5 1.5L12 14l-1.5-5.5L5 7l5.5-1.5L12 0z"
        fill="currentColor"
      />
      <path
        d="M12 18l.8 3 3 .8-3 .8-.8 3-.8-3-3-.8 3-.8.8-3z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export function StitchDivider({ className }: { className?: string }) {
  return (
    <div className={cn("stitch-divider", className)} aria-hidden>
      <Rhinestone size={14} className="text-gold" />
      <span className="stitch-line" />
      <StarBurst size={16} className="text-hot-pink" />
      <span className="stitch-line" />
      <Rhinestone size={14} className="text-gold" />
    </div>
  );
}

const PATCH_COLORS = [
  "#f4a6b8",
  "#e8d48b",
  "#a8d4e6",
  "#c9e4a5",
  "#d4a5d4",
  "#f5c6a0",
  "#ffb6c8",
];

export function QuiltPatchCollage({ className }: { className?: string }) {
  return (
    <div className={cn("quilt-collage pointer-events-none", className)} aria-hidden>
      {PATCH_COLORS.map((color, i) => (
        <div
          key={color}
          className="quilt-patch"
          style={{
            backgroundColor: color,
            transform: `rotate(${(i % 3) * 8 - 8}deg)`,
            left: `${8 + (i % 4) * 22}%`,
            top: `${10 + Math.floor(i / 4) * 35}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SparkleField() {
  const sparkles = [
    { top: "8%", left: "12%", delay: "0s", size: 14 },
    { top: "15%", left: "78%", delay: "0.4s", size: 18 },
    { top: "42%", left: "5%", delay: "0.8s", size: 12 },
    { top: "55%", left: "88%", delay: "1.2s", size: 16 },
    { top: "72%", left: "18%", delay: "0.6s", size: 10 },
    { top: "80%", left: "72%", delay: "1s", size: 14 },
    { top: "28%", left: "92%", delay: "1.4s", size: 12 },
    { top: "65%", left: "48%", delay: "0.2s", size: 8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparkles.map((s, i) => (
        <Rhinestone
          key={i}
          size={s.size}
          className="sparkle-field absolute text-gold/70"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
