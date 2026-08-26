#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const width = 1200;
const height = 630;

/** crop: ffmpeg crop x:y after scale — "0:0" keeps faces when source is portrait/tall */
const targets = [
  {
    source: join(root, "public/images/moments/lgbtq-allyship.jpg"),
    output: join(root, "public/images/og-share.jpg"),
    crop: "0:0",
  },
  {
    source: join(root, "public/images/preview/imagination-library-reading.jpg"),
    output: join(root, "public/images/og-share-moments.jpg"),
    crop: "0:0",
  },
];

for (const { source, output, crop = "" } of targets) {
  const cropFilter = crop
    ? `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}:${crop}`
    : `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`;

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      source,
      "-vf",
      cropFilter,
      "-frames:v",
      "1",
      "-update",
      "1",
      "-q:v",
      "88",
      output,
    ],
    { stdio: "inherit" },
  );
}

console.log(`LinkedIn OG share images → ${width}x${height}`);
