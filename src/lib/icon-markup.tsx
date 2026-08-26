import { BrandMarkOg } from "./brand-mark-og";

type IconVariant = "favicon" | "apple";

export function IconMarkup({ variant }: { variant: IconVariant }) {
  const isApple = variant === "apple";
  const size = isApple ? 180 : 32;

  return <BrandMarkOg size={size} framed={isApple} />;
}
