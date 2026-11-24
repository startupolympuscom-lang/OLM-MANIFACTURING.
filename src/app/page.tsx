import { site, territories, projectStatus } from "@/content/site";
import { products } from "@/content/products";
import { productMedia, facilityMedia, CONCEPT_CAPTION } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ProductCard } from "@/components/products/ProductCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteCta } from "@/components/sections/QuoteCta";

const proofPoints = [
  {
    title: "Regional focus",
    text: `Built to serve ${territories.slice(0, 4).join(", ")} and the surrounding Middle Atlas region.`,
  },
  {
    title: "Focused range",
    text: "Paper cups, takeaway and bakery packaging, ice and distribution — for foodservice.",
  },
  {
    title: "Industrial approach",
    text: `A proposed ${site.facility.sizeLabel} facility bringing production, storage and dispatch together.`,
  },
  {
    title: "Clear about progress",
    text: "We state plainly what is available today and what is still planned.",
  },
];

const featuredSlugs = ["paper-cups", "restaurant-takeaway-packaging", "bakery-pastry-packaging"];

export default function HomePage() {
  const featured = featuredSlugs.map((s) => products.find((p) => p.slug === s)!);
  const ice = products.find((p) => p.slug === "food-safe-ice")!;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <Eyebrow>Food packaging · Ice · Foodservice supply</Eyebrow>
            <h1 className="mt-7 text-[2.35rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-[3.05rem]">
              Manufacturing packaging <br className="hidden lg:inline" />
              solutions for the <br className="hidden lg:inline" />
              food industry
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              OLM Manufacturing is preparing an industrial facility in the {site.location.area} to
              supply cafés, restaurants, bakeries, hotels and caterers with paper cups, takeaway and
              bakery packaging, and ice.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/products" arrow>
                Explore Products
              </ButtonLink>
              <ButtonLink href="/quote" variant="outline">
                Discuss Your Needs
              </ButtonLink>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-ink-muted">{projectStatus}</p>
          </div>
          <div className="lg:col-span-5">
            <MediaFrame
              media={productMedia.hero}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
            />
          </div>
        </Container>
      </section>

      {/* Proof points */}
      <section aria-label="Why OLM" className="border-y border-charcoal/10 bg-white">
        <Container>
          <ul className="grid divide-charcoal/10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
            {proofPoints.map((p) => (
              <li key={p.title} className="py-8 sm:pr-8 lg:px-8 lg:py-10 lg:first:pl-0 lg:last:pr-0">
                <h2 className="text-base font-bold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Products */}
      <section aria-labelledby="products-title" className="bg-ivory">
        <Container className="py-20 lg:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What we plan to supply"
              title={<span id="products-title">Packaging and ice for foodservice</span>}
            />
            <TextLink href="/products">View all products</TextLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ProductCard product={ice} layout="wide" />
          </div>
        </Container>
      </section>

      {/* Facility */}
      <section aria-labelledby="facility-title">
        <Container className="py-20 lg:py-28">
          <figure>
            <MediaFrame media={facilityMedia[0]} aspect="aspect-[16/9] lg:aspect-[21/9]" sizes="(min-width: 1280px) 1200px, 100vw" />
            <figcaption className="mt-3 text-xs text-ink-muted">{CONCEPT_CAPTION}</figcaption>
          </figure>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Our facility"
                title={<span id="facility-title">A proposed {site.facility.sizeLabel} facility in the {site.location.area}</span>}
                intro="An industrial-use warehouse planned to bring production, packaging, storage and dispatch under one roof. The final equipment layout is under development."
              />
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <ButtonLink href="/facility" variant="outline" arrow>
                Explore our facility concept
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section aria-labelledby="process-title" className="border-t border-charcoal/10">
        <Container className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="How we work"
            title={<span id="process-title">From your requirements to your door</span>}
            className="mb-12"
          />
          <ProcessSteps />
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
