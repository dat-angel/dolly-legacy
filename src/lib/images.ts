import credits from "@/content/image-credits.json";
import phaseImages from "@/content/phase-images.json";
import type { Chapter, Era } from "./types";

export interface ImageCredit {
  commonsTitle: string;
  commonsUrl: string;
  license: string;
  author: string;
  description: string;
  localPath: string;
}

export interface PhaseImage {
  src: string;
  alt: string;
  caption: string;
  year?: number;
  credit: ImageCredit;
}

type CreditKey = keyof typeof credits;

function getCredit(key: CreditKey): ImageCredit {
  return credits[key];
}

export function getChapterImage(chapter: Chapter): PhaseImage {
  const meta = phaseImages.chapters[chapter];
  const key = `chapters/${chapter}` as CreditKey;
  const credit = getCredit(key);

  return {
    src: credit.localPath,
    alt: meta.alt,
    caption: meta.caption,
    year: meta.year,
    credit,
  };
}

export function getEraImage(era: Era): PhaseImage | null {
  const meta = phaseImages.eras[era];
  if (!meta) return null;

  const key = `eras/${era}` as CreditKey;
  const credit = getCredit(key);

  return {
    src: credit.localPath,
    alt: meta.alt,
    caption: meta.caption,
    year: meta.year,
    credit,
  };
}

export function getAllImageCredits(): { key: string; credit: ImageCredit; label: string }[] {
  return Object.entries(phaseImages.labels).map(([key, label]) => ({
    key,
    label,
    credit: getCredit(key as CreditKey),
  }));
}
