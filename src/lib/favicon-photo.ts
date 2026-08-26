import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDataUrl } from "./og-story";

const FAVICON_PHOTO_PATH = join(
  process.cwd(),
  "public/images/favicon-portrait.jpg",
);

export async function getFaviconPhotoSrc(): Promise<string> {
  const photo = await readFile(FAVICON_PHOTO_PATH);
  return bufferToDataUrl(photo);
}
