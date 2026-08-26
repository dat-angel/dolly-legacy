import lettersData from "@/content/letters.json";

export type LetterForm = "typed letter" | "fax" | "song-letter" | "note";

export interface Letter {
  id: string;
  to: string;
  toRole: string;
  year: number;
  form: LetterForm;
  featured?: boolean;
  summary: string;
  excerpt: string;
  source: string;
  sourceLabel: string;
  relatedMomentId?: string;
}

export interface LettersDatabaseMeta {
  name: string;
  version: string;
  description?: string;
  license: "CC-BY-4.0";
  licenseUrl?: string;
  attribution: string;
  repository?: string;
  schema?: string;
  thirdPartyNotice?: string;
}

interface LettersDatabase {
  meta: LettersDatabaseMeta;
  letters: Letter[];
}

const database = lettersData as LettersDatabase;

export const lettersMeta = database.meta;
export const letters = database.letters;
