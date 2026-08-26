import Image from "next/image";
import Link from "next/link";
import type { PhaseImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface MomentPortraitProps {
  image: PhaseImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  framed?: boolean;
}

export function MomentPortrait({
  image,
  className,
  sizes = "(max-width: 768px) 100vw, 480px",
  priority = false,
  showCaption = false,
  framed = true,
}: MomentPortraitProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden",
        framed && "photo-frame",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center"
      />
      {showCaption && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-burgundy-deep/80 via-burgundy-deep/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-left md:p-5">
            {image.year && (
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-light">
                {image.year}
              </p>
            )}
            <p className="mt-1 font-serif text-sm leading-snug text-cream md:text-base">
              {image.caption}
            </p>
            <Link
              href="/images"
              className="pointer-events-auto mt-2 inline-block text-xs text-cream/70 underline-offset-2 hover:text-gold-light hover:underline"
            >
              Photo credit
            </Link>
          </figcaption>
        </>
      )}
    </figure>
  );
}
