import Link from "next/link";
import type { ProductCategory } from "@/content/products";
import { productMedia } from "@/content/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Arrow } from "@/components/ui/Button";

type Props = {
  product: ProductCategory;
  /** "tall" for large homepage cards, "wide" for horizontal layout. */
  layout?: "tall" | "wide";
  headingLevel?: "h2" | "h3";
};

export function ProductCard({ product, layout = "tall", headingLevel = "h3" }: Props) {
  const H = headingLevel;
  const media = productMedia[product.slug];
  const href = `/products/${product.slug}`;

  if (layout === "wide") {
    return (
      <article className="group relative grid border border-charcoal/10 bg-white md:grid-cols-2">
        <MediaFrame media={media} aspect="aspect-[16/10] md:aspect-auto md:h-full md:min-h-72" sizes="(min-width: 768px) 50vw, 100vw" />
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{product.group}</p>
          <H className="mt-3 text-2xl font-bold tracking-tight">
            <Link href={href} className="after:absolute after:inset-0">{product.name}</Link>
          </H>
          <p className="mt-3 max-w-md leading-relaxed text-ink-muted">{product.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            View category <Arrow className="text-orange transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col border border-charcoal/10 bg-white transition-shadow hover:shadow-[0_12px_40px_-24px_rgba(31,41,55,0.45)]">
      <MediaFrame media={media} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{product.group}</p>
        <H className="mt-3 text-xl font-bold tracking-tight">
          <Link href={href} className="after:absolute after:inset-0">{product.name}</Link>
        </H>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{product.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
          View category <Arrow className="text-orange transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
