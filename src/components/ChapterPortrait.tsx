import Image from "next/image";
import Link from "next/link";
import type { PhaseImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface ChapterPortraitProps {
  image: PhaseImage;
  className?: string;
  priority?: boolean;
}

export function ChapterPortrait({
  image,
  className,
  priority = false,
}: ChapterPortraitProps) {
  return (
    <figure
      className={cn(
        "photo-frame group relative aspect-[4/5] w-full max-w-sm overflow-hidden md:max-w-md",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-burgundy-deep/75 via-burgundy-deep/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-left">
        {image.year && (
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-light">
            {image.year}
          </p>
        )}
        <p className="mt-1 font-serif text-base leading-snug text-cream md:text-lg">
          {image.caption}
        </p>
        <Link
          href="/images"
          className="pointer-events-auto mt-3 inline-block text-xs text-cream/70 underline-offset-2 hover:text-gold-light hover:underline"
        >
          Photo credit
        </Link>
      </figcaption>
    </figure>
  );
}
