import Image from "next/image";
import { site } from "@/content/site";

/**
 * Official OLM logo, rendered from the unmodified PNG asset.
 * The source file has transparent padding around the mark; the wrapper crops
 * that padding visually (CSS only) so the logo aligns with the layout grid.
 * The artwork itself is never redrawn, recoloured or altered.
 */
// Visible artwork bounds inside the 2172×724 file (measured from alpha channel).
const ART = { x: 130, y: 186, w: 1923, h: 409 };

export function Logo({ height = 36, priority = false }: { height?: number; priority?: boolean }) {
  const { width: W, height: H } = site.logo;
  const scale = height / ART.h;
  return (
    <span
      className="relative block overflow-hidden"
      style={{ width: Math.round(ART.w * scale), height }}
    >
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={W}
        height={H}
        priority={priority}
        sizes={`${Math.round(W * scale)}px`}
        className="absolute max-w-none"
        style={{
          width: W * scale,
          height: H * scale,
          left: -ART.x * scale,
          top: -ART.y * scale,
        }}
      />
    </span>
  );
}
