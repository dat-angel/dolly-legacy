import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDataUrl } from "./og-story";
import type { PreviewImageKey } from "./preview-images";

export async function loadPreviewPhotoSrc(
  key: PreviewImageKey,
): Promise<string> {
  if (key === "literacy") {
    const photo = await readFile(
      join(process.cwd(), "public/images/preview/imagination-library-reading.jpg"),
    );
    return bufferToDataUrl(photo);
  }

  const photo = await readFile(
    join(process.cwd(), "public/images/moments/lgbtq-allyship.jpg"),
  );
  return bufferToDataUrl(photo);
}
