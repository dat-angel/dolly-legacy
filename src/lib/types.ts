export type Mood = "laugh" | "courage" | "facts" | "surprise";
export type Category =
  | "music"
  | "lyrics"
  | "philanthropy"
  | "advocacy"
  | "career"
  | "personal";
export type Era =
  | "1950s"
  | "1960s"
  | "1970s"
  | "1980s"
  | "1990s"
  | "2000s"
  | "2010s"
  | "2020s";
export type Chapter =
  | "origins"
  | "music"
  | "building"
  | "giving"
  | "standing";

export interface Moment {
  id: string;
  title: string;
  year?: number;
  era: Era;
  category: Category;
  tags: string[];
  summary: string;
  body?: string;
  hiddenFact?: string;
  quote?: string;
  source?: string;
  featured?: boolean;
  chapter?: Chapter;
  relatedIds?: string[];
  moodTags?: Mood[];
  dollySayKeywords?: string[];
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "music", label: "Music" },
  { id: "lyrics", label: "Lyrics" },
  { id: "philanthropy", label: "Philanthropy" },
  { id: "advocacy", label: "Advocacy" },
  { id: "career", label: "Career" },
  { id: "personal", label: "Personal" },
];

export const ERAS: Era[] = [
  "1950s",
  "1960s",
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s",
];

export const CHAPTERS: { id: Chapter; title: string; subtitle: string }[] = [
  {
    id: "origins",
    title: "Where She Came From",
    subtitle: "Appalachian roots, poverty, and a coat sewn with love",
  },
  {
    id: "music",
    title: "The Songs That Moved the World",
    subtitle: "Storytelling that crossed genres and generations",
  },
  {
    id: "building",
    title: "Building Something That Lasts",
    subtitle: "Dollywood, business ownership, and creative control",
  },
  {
    id: "giving",
    title: "Giving Back",
    subtitle: "Books, disaster relief, and a vaccine research fund",
  },
  {
    id: "standing",
    title: "Standing With Everyone",
    subtitle: "Allyship for Black communities, LGBTQ+ people, Tennessee, and working women",
  },
];
