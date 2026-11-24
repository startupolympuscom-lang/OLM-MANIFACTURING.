#!/usr/bin/env node
/**
 * Copies client-supplied media into /public/assets, preserving file names,
 * then reports which images referenced in src/content/media.ts are missing.
 *
 * Usage:  npm run assets:sync -- [path/to/client-files]   (default: repo root)
 *
 * Expected source folders (as named in the project brief):
 *   01_Brand/Official_Logo/            -> public/assets/brand/
 *   03_Product_Images/                 -> public/assets/products/
 *   04_Facility_Concept_Renders/WebP/  -> public/assets/facility/
 *   05_Machinery_References/           -> public/assets/machinery/
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? ".");
const pub = path.resolve("public/assets");
const IMG = /\.(png|jpe?g|webp|avif|svg)$/i;

const map = [
  ["01_Brand/Official_Logo", "brand"],
  ["03_Product_Images", "products"],
  ["04_Facility_Concept_Renders/WebP", "facility"],
  ["05_Machinery_References", "machinery"],
];

for (const [from, to] of map) {
  const src = path.join(root, from);
  if (!fs.existsSync(src)) {
    console.log(`skip  ${from} (not found)`);
    continue;
  }
  const dest = path.join(pub, to);
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(src).filter((f) => IMG.test(f))) {
    fs.copyFileSync(path.join(src, f), path.join(dest, f));
    console.log(`copy  ${from}/${f} -> public/assets/${to}/${f}`);
  }
}

// Report references in media.ts that do not exist yet.
const manifest = fs.readFileSync("src/content/media.ts", "utf8");
const refs = new Set();
for (const m of manifest.matchAll(/["'`](\/assets\/[^"'`$]+)["'`]/g)) refs.add(m[1]);
for (const m of manifest.matchAll(/product\(\s*["']([^"']+)["']/g)) refs.add(`/assets/products/${m[1]}`);
for (let i = 1; i <= 10; i++) refs.add(`/assets/facility/facility-concept-${String(i).padStart(2, "0")}.webp`);

const missing = [...refs].filter((r) => !fs.existsSync(path.join("public", r)));
console.log(
  missing.length
    ? `\n${missing.length} image(s) referenced in src/content/media.ts are not in /public yet (placeholders will show):\n  ${missing.join("\n  ")}\n\nRename the files or update the paths in src/content/media.ts.`
    : "\nAll images referenced in src/content/media.ts are present.",
);
