import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-burgundy text-cream hover:bg-burgundy-deep",
  secondary:
    "border border-burgundy/30 bg-transparent text-burgundy hover:border-burgundy hover:bg-burgundy/5",
  ghost: "text-burgundy hover:text-forest underline-offset-4 hover:underline",
};

export function dollyButtonClass(
  variant: keyof typeof variants = "primary",
  className?: string,
) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 py-3 font-semibold transition-colors sm:px-6",
    variants[variant],
    className,
  );
}
