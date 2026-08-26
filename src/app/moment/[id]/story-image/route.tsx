import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getMomentImage } from "@/lib/images";
import { getMomentById } from "@/lib/moments";
import { STORY_SIZE, StoryCardMarkup, bufferToDataUrl } from "@/lib/og-story";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const moment = getMomentById(id);
  const image = getMomentImage(id);
  let photoSrc: string | undefined;

  if (image?.src) {
    try {
      const file = await readFile(join(process.cwd(), "public", image.src));
      const mime = image.src.endsWith(".png") ? "image/png" : "image/jpeg";
      photoSrc = bufferToDataUrl(file, mime);
    } catch {
      photoSrc = undefined;
    }
  }

  return new ImageResponse(
    (
      <StoryCardMarkup
        title={moment?.title ?? "Dolly Legacy"}
        quote={moment?.quote ? `“${moment.quote}”` : moment?.summary}
        year={moment?.year ? String(moment.year) : moment?.era}
        photoSrc={photoSrc}
      />
    ),
    { ...STORY_SIZE },
  );
}
