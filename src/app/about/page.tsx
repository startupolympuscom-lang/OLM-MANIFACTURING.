import type { Metadata } from "next";
import { site, territories, audiences } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageIntro } from "@/components/sections/PageIntro";
import { QuoteCta } from "@/components/sections/QuoteCta";
import { TextLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "OLM Manufacturing Solutions is preparing an industrial packaging and foodservice supply facility in the Azrou area to serve the Middle Atlas region of Morocco.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Practical products",
    text: "We focus on the packaging and ice that foodservice businesses use every day, not on an endless catalogue.",
  },
  {
    title: "Industrial discipline",
    text: "Planned processes for material selection, production, quality control and storage, applied consistently.",
  },
  {
    title: "Local reliability",
    text: "Being based in the region should mean shorter lead times and a supplier you can reach.",
  },
  {
    title: "Honest communication",
    text: "We say what is available, what is planned and what still needs to be confirmed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About OLM"
        title="An industrial supplier for the region's foodservice businesses"
        intro={`${site.legalName} is preparing a manufacturing and supply facility in the ${site.location.area} of Morocco. Our aim is to give cafés, restaurants, bakeries, hotels, caterers and distributors a dependable regional source of packaging and ice.`}
      />

      <section aria-labelledby="mission-title">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Mission" title={<span id="mission-title">Why OLM exists</span>} />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted lg:col-span-7">
            <p>
              OLM is being set up to bring packaging manufacturing, storage and delivery closer to
              the foodservice businesses of the Middle Atlas — so that cafés, bakeries, hotels and
              restaurants can work with a regional supplier they can easily reach.
            </p>
            <p>
              The project centres on a proposed {site.facility.sizeLabel} industrial-use warehouse,
              with a current target opening of {site.facility.targetOpening}. Until then, we are
              selecting suppliers and equipment, and talking with businesses about their needs.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="territories-title" className="bg-ivory">
        <Container className="grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <SectionHeading
              eyebrow="Where we work"
              title={<span id="territories-title">Target territories</span>}
              intro="Our planned delivery area covers the following cities and nearby locations."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {territories.map((t) => (
                <li key={t} className="border border-charcoal/15 bg-white px-4 py-2 text-sm font-semibold">{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Who we serve"
              title="Customer types"
              intro="Businesses that use packaging and ice every day."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {audiences.map((a) => (
                <li key={a} className="border border-charcoal/15 bg-white px-4 py-2 text-sm font-semibold">{a}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="approach-title">
        <Container className="py-16 lg:py-24">
          <SectionHeading eyebrow="Approach" title={<span id="approach-title">How we intend to operate</span>} className="mb-12" />
          <ul className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="bg-white p-7 sm:p-8">
                <span aria-hidden="true" className="block h-0.5 w-6 bg-orange" />
                <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-8">
            <TextLink href="/capabilities">See our planned capabilities</TextLink>
            <TextLink href="/facility">View the facility concept</TextLink>
          </div>
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}
