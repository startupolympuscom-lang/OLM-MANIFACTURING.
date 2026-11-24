import Image from "next/image";
import type { MediaItem } from "@/content/media";
import { mediaExists } from "@/lib/media";

type Props = {
  media: MediaItem;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Hide the small "Provisional image" tag (e.g. inside very small cards). */
  hideTag?: boolean;
};

/**
 * Renders an optimised image when the file exists in /public, otherwise a
 * calm, clearly labelled placeholder. Never renders a broken image.
 */
export function MediaFrame({ media, aspect = "aspect-[4/3]", sizes, priority, className = "", hideTag }: Props) {
  const available = mediaExists(media.src);

  return (
    <div className={`relative overflow-hidden bg-ivory ${aspect} ${className}`}>
      {available ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${media.alt} — image to be supplied`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-steel/40 p-6 text-center"
        >
          <span aria-hidden="true" className="h-0.5 w-6 bg-orange" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {media.concept ? "Concept render to be added" : "Product image to be added"}
          </span>
          <span className="max-w-xs text-xs leading-relaxed text-ink-muted">{media.alt}</span>
        </div>
      )}
      {available && media.provisional && !hideTag && (
        <span className="absolute left-3 top-3 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal">
          Provisional image
        </span>
      )}
    </div>
  );
}
