"use client";

import Image from "next/image";
import Link from "next/link";
import { getEraImage } from "@/lib/images";
import { getEraShareText, getEraShareUrl } from "@/lib/share";
import { ERAS, type Era } from "@/lib/types";
import { ShareMenu } from "./ShareMenu";
import { cn } from "@/lib/utils";

interface EraGalleryProps {
  activeEra?: Era | "all";
  onSelectEra?: (era: Era | "all") => void;
}

export function EraGallery({ activeEra = "all", onSelectEra }: EraGalleryProps) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-bold text-burgundy-deep">
            Dolly through the years
          </h2>
        </div>
        <Link href="/images" className="shrink-0 text-xs font-semibold text-gold hover:text-burgundy sm:text-sm">
          All photo credits →
        </Link>
      </div>

      {activeEra !== "all" && (
        <ShareMenu
          title={`Dolly in the ${activeEra}`}
          text={getEraShareText(activeEra)}
          url={getEraShareUrl(activeEra)}
          imageSrc={getEraImage(activeEra)?.src}
          className="mb-4"
          compact
          label={`Share ${activeEra}`}
        />
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {ERAS.map((era) => {
          const image = getEraImage(era);
          const isActive = activeEra === era;

          return (
            <button
              key={era}
              type="button"
              onClick={() => onSelectEra?.(isActive ? "all" : era)}
              className={cn(
                "photo-frame relative min-h-11 aspect-[3/4] overflow-hidden text-left transition",
                isActive && "ring-2 ring-gold ring-offset-2 ring-offset-cream",
                !image && "bg-gradient-to-br from-burgundy/80 to-gold/20",
              )}
              aria-pressed={isActive}
            >
              {image ? (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, 120px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/80 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                  <span className="text-sm text-cream/70">No photo yet</span>
                </div>
              )}
              <span className="absolute inset-x-0 bottom-0 p-2 font-mono text-xs font-bold text-cream">
                {era}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
