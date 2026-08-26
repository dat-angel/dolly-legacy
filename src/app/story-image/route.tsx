import { ImageResponse } from "next/og";
import { loadPreviewPhotoSrc } from "@/lib/load-preview-photo";
import { getMomentCount } from "@/lib/moments";
import { SITE } from "@/lib/site";
import { STORY_SIZE, StoryCardMarkup } from "@/lib/og-story";

export async function GET() {
  const photoSrc = await loadPreviewPhotoSrc("literacy");
  const momentCount = getMomentCount();

  return new ImageResponse(
    (
      <StoryCardMarkup
        title="Dolly Legacy"
        quote={SITE.tagline}
        year={`${momentCount} moments`}
        photoSrc={photoSrc}
      />
    ),
    { ...STORY_SIZE },
  );
}
