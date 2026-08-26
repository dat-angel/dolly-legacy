import credits from "@/content/image-credits.json";
import momentImages from "@/content/moment-images.json";
import phaseImages from "@/content/phase-images.json";
import { getMomentById } from "./moments";
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
type MomentImageId = keyof typeof momentImages.moments;

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

export function getMomentImage(id: string): PhaseImage | null {
  if (!(id in momentImages.moments)) return null;
  const meta = momentImages.moments[id as MomentImageId];
  const credit = getCredit(meta.creditKey as CreditKey);

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

export function getUniqueMomentImageCredits(): {
  key: string;
  credit: ImageCredit;
  label: string;
}[] {
  const seen = new Set<string>();
  const rows: { key: string; credit: ImageCredit; label: string }[] = [];

  for (const [id, meta] of Object.entries(momentImages.moments)) {
    if (!meta.creditKey.startsWith("moments/") || seen.has(meta.creditKey)) continue;
    seen.add(meta.creditKey);
    const moment = getMomentById(id);
    rows.push({
      key: meta.creditKey,
      label: moment?.title ?? id,
      credit: getCredit(meta.creditKey as CreditKey),
    });
  }

  return rows;
}
