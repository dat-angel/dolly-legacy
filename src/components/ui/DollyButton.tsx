import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-gold text-burgundy-deep shadow-[0_4px_0_#0c0b09] hover:bg-gold-light hover:shadow-[0_2px_0_#0c0b09] hover:translate-y-0.5 active:translate-y-1 active:shadow-none",
  secondary:
    "border border-gold/60 bg-transparent text-burgundy hover:border-gold hover:bg-gold/10",
  ghost: "text-burgundy hover:text-gold underline-offset-4 hover:underline",
};

export function dollyButtonClass(
  variant: keyof typeof variants = "primary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-semibold transition-all duration-200 sm:px-8",
    variants[variant],
    className,
  );
}
