#!/usr/bin/env node
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "src/content/moments.json");
const targets = [
  join(root, "data/moments.json"),
  join(root, "public/data/moments.json"),
];

for (const target of targets) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

console.log("Synced moments.json → data/ and public/data/");
