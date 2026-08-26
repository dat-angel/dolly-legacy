import { cn } from "@/lib/utils";

export function StitchDivider({ className }: { className?: string }) {
  return (
    <div className={cn("stitch-divider", className)} aria-hidden>
      <span className="stitch-line" />
      <span className="h-1 w-1 rounded-full bg-gold/70" />
      <span className="stitch-line" />
    </div>
  );
}
