import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Returns true when the referenced file exists in /public.
 * Evaluated at build/render time on the server, so dropping a new image into
 * /public/assets and rebuilding is enough to replace a placeholder.
 */
export function mediaExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  try {
    return fs.statSync(path.join(process.cwd(), "public", src)).isFile();
  } catch {
    return false;
  }
}
