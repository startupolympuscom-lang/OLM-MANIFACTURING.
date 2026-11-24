import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, COMPLIANCE_NOTE } from "@/content/products";
import { productMedia } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusTag } from "@/components/ui/StatusTag";
import { ProductCard } from "@/components/products/ProductCard";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const quoteHref = `/quote?category=${encodeURIComponent(product.slug)}`;

  return (
    <>
      <section className="border-b border-charcoal/10">
        <Container className="py-12 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="hover:underline">Products</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-charcoal">{product.name}</li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Eyebrow>{product.group}</Eyebrow>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{product.intro}</p>
              <div className="mt-7">
                <StatusTag>{product.status.label}</StatusTag>
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={quoteHref} arrow>Request a quote</ButtonLink>
                <ButtonLink href="/contact" variant="outline">Ask a question</ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-6">
              <MediaFrame media={productMedia[product.slug]} sizes="(min-width: 1024px) 50vw, 100vw" priority />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Category details">
        <Container className="grid gap-12 py-16 md:grid-cols-3 lg:py-24">
          <DetailList title="Applications" items={product.applications} />
          <DetailList title="Formats" items={product.formats} />
          <DetailList title="What to share in your inquiry" items={product.considerations} />
        </Container>
      </section>

      <section aria-label="Availability" className="bg-ivory">
        <Container className="grid gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <div>
            <h2 className="text-lg font-bold">Availability</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{product.status.detail}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Food-contact & compliance</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{COMPLIANCE_NOTE}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="inquiry-title" className="border-b border-charcoal/10">
        <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between lg:py-16">
          <div>
            <h2 id="inquiry-title" className="text-2xl font-bold tracking-tight">Interested in {product.shortName.toLowerCase()}?</h2>
            <p className="mt-2 text-ink-muted">Share your formats, quantities and delivery city. We will reply with what we can offer.</p>
          </div>
          <ButtonLink href={quoteHref} variant="accent" arrow>Request a quote</ButtonLink>
        </Container>
      </section>

      <section aria-labelledby="related-title">
        <Container className="py-16 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="related-title" className="text-2xl font-bold tracking-tight">Other categories</h2>
            <TextLink href="/products">All products</TextLink>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}><ProductCard product={p} /></li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="border-b border-charcoal/10 pb-4 text-xs font-semibold uppercase tracking-[0.18em]">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3 leading-relaxed">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-orange" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
