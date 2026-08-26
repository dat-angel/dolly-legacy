#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const width = 1200;
const height = 630;

const targets = [
  {
    source: join(root, "public/images/preview/dumplin-drag-queen.jpg"),
    output: join(root, "public/images/og-share.jpg"),
  },
  {
    source: join(root, "public/images/preview/imagination-library-reading.jpg"),
    output: join(root, "public/images/og-share-moments.jpg"),
  },
];

for (const { source, output } of targets) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      source,
      "-vf",
      `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`,
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
