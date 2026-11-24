import type { Metadata } from "next";
import { site, territories } from "@/content/site";
import { activeTransport } from "@/lib/quote-delivery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact OLM Manufacturing about packaging and ice supply for foodservice businesses in Azrou, Ifrane, Meknès, Fès, Sefrou and El Hajeb.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <section>
      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-4">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Talk to OLM"
            intro="Questions about products, timing or supply for your business? Send us a message using the form."
          />
          <dl className="mt-10 space-y-7 border-t border-charcoal/10 pt-8 text-sm leading-relaxed">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Location</dt>
              <dd className="mt-2">
                {site.location.area}, {site.location.region}, {site.location.country}
                <br />
                <span className="text-ink-muted">Facility in preparation — no visitor address yet.</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Service area</dt>
              <dd className="mt-2">{territories.join(", ")} and nearby locations.</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Email</dt>
              <dd className="mt-2">
                {site.contactEmail ? (
                  <a href={`mailto:${site.contactEmail}`} className="font-semibold underline decoration-orange decoration-2 underline-offset-4">
                    {site.contactEmail}
                  </a>
                ) : (
                  <span className="text-ink-muted">Please use the form — a public email address will be published soon.</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-8">
          <QuoteForm deliveryConfigured={activeTransport() !== null} contactEmail={site.contactEmail} />
        </div>
      </Container>
    </section>
  );
}
