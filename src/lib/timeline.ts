import { moments } from "./moments";
import { CHAPTERS, ERAS, type Chapter, type Era, type Moment } from "./types";

export const TIMELINE_STOPS: Moment[] = [...moments].sort((a, b) => {
  const yearA = a.year ?? 0;
  const yearB = b.year ?? 0;
  if (yearA !== yearB) return yearA - yearB;
  return a.title.localeCompare(b.title);
});

export function getStopIndex(momentId: string): number {
  const index = TIMELINE_STOPS.findIndex((moment) => moment.id === momentId);
  return index < 0 ? 0 : index;
}

export function getFirstStopForEra(era: Era): number {
  const index = TIMELINE_STOPS.findIndex((moment) => moment.era === era);
  return index < 0 ? 0 : index;
}

export function getFirstStopForChapter(chapter: Chapter): number {
  const index = TIMELINE_STOPS.findIndex((moment) => moment.chapter === chapter);
  return index < 0 ? 0 : index;
}

export function getEraStartStops(): { era: Era; index: number }[] {
  return ERAS.map((era) => ({ era, index: getFirstStopForEra(era) }));
}

export function getChapterMeta(chapter?: Chapter) {
  if (!chapter) return undefined;
  return CHAPTERS.find((item) => item.id === chapter);
}
