import type { Metadata } from "next";
import { products, productGroups, COMPLIANCE_NOTE } from "@/content/products";
import { audiences } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/sections/QuoteCta";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Paper cups, restaurant and takeaway packaging, bakery packaging, ice, custom packaging and distribution planned by OLM Manufacturing for foodservice businesses in Morocco.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const items = products.map((p) => ({
    slug: p.slug,
    group: p.group,
    audiences: p.audiences,
    node: <ProductCard product={p} headingLevel="h2" />,
  }));

  return (
    <>
      <PageIntro
        eyebrow="Products"
        title="Foodservice packaging and ice"
        intro="Six categories planned for cafés, restaurants, bakeries, hotels, caterers and distributors. Filter by category or business type to find what fits your operation."
      />
      <section aria-label="Product categories">
        <Container className="py-14 lg:py-20">
          <ProductFilter items={items} groups={productGroups} audiences={[...audiences]} />
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-ink-muted">{COMPLIANCE_NOTE}</p>
        </Container>
      </section>
      <QuoteCta />
    </>
  );
}
