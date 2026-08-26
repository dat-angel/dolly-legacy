import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getMomentCount } from "@/lib/moments";
import { getSiteDescription, SITE } from "@/lib/site";
import { STORY_SIZE, StoryCardMarkup, bufferToDataUrl } from "@/lib/og-story";

export async function GET() {
  const photo = await readFile(
    join(process.cwd(), "public/images/chapters/music.jpg"),
  );
  const momentCount = getMomentCount();

  return new ImageResponse(
    (
      <StoryCardMarkup
        title="Dolly Legacy"
        quote={SITE.tagline}
        year={`${momentCount} moments`}
        photoSrc={bufferToDataUrl(photo)}
      />
    ),
    { ...STORY_SIZE },
  );
}
