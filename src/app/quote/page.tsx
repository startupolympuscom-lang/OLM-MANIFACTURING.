import type { Metadata } from "next";
import { site, projectStatus } from "@/content/site";
import { activeTransport } from "@/lib/quote-delivery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Request a quote from OLM Manufacturing for paper cups, takeaway and bakery packaging, ice, custom packaging or distribution.",
  alternates: { canonical: "/quote" },
};

// Reads server env (delivery transport) and ?category= at request time.
export const dynamic = "force-dynamic";

const steps = [
  "Tell us what you need and roughly how much.",
  "We review your request and confirm what we can supply.",
  "We reply with next steps, formats and timing.",
];

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;

  return (
    <section>
      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeading
            as="h1"
            eyebrow="Get a quote"
            title="Tell us about your needs"
            intro="Share your products, quantities and delivery city. The more detail you give, the more useful our reply."
          />
          <ol className="mt-10 space-y-5 border-t border-charcoal/10 pt-8">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4 text-sm leading-relaxed">
                <span className="font-bold text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-xs leading-relaxed text-ink-muted">{projectStatus}</p>
        </div>
        <div className="lg:col-span-8">
          <QuoteForm deliveryConfigured={activeTransport() !== null} contactEmail={site.contactEmail} initialCategory={category} />
        </div>
      </Container>
    </section>
  );
}
