import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gradient-to-r from-hot-pink to-burgundy text-cream shadow-[0_4px_0_#3d1f24,0_6px_20px_rgba(233,30,140,0.35)] hover:shadow-[0_2px_0_#3d1f24,0_4px_16px_rgba(233,30,140,0.4)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none",
  secondary:
    "border-2 border-dashed border-hot-pink/50 bg-cream/80 text-burgundy hover:border-gold hover:bg-gold/10 hover:text-burgundy-deep",
  ghost: "text-burgundy hover:text-hot-pink underline-offset-4 hover:underline",
};

export function dollyButtonClass(
  variant: keyof typeof variants = "primary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-all duration-200 sm:px-8",
    variants[variant],
    className,
  );
}
