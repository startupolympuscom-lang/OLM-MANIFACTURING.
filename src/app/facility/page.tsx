import type { Metadata } from "next";
import { site } from "@/content/site";
import { facilityMedia, CONCEPT_CAPTION } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusTag } from "@/components/ui/StatusTag";
import { PageIntro } from "@/components/sections/PageIntro";
import { QuoteCta } from "@/components/sections/QuoteCta";

export const metadata: Metadata = {
  title: "Our Facility",
  description: `Concept visualizations of OLM Manufacturing's proposed ${site.facility.sizeLabel} industrial-use warehouse in the ${site.location.area}, Morocco.`,
  alternates: { canonical: "/facility" },
};

const facts = [
  { label: "Floor area", value: site.facility.sizeLabel },
  { label: "Building type", value: "Industrial-use warehouse" },
  { label: "Location", value: `${site.location.area}, ${site.location.country}` },
  { label: "Target opening", value: `${site.facility.targetOpening} (planning target)` },
];

const zones = [
  { title: "Reception", text: "Incoming raw materials and supplies." },
  { title: "Production", text: "Planned production lines for packaging and ice." },
  { title: "Packing & quality control", text: "Packing, labelling and inspection of finished goods." },
  { title: "Storage & dispatch", text: "Finished goods storage and loading for delivery." },
];

export default function FacilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our facility"
        title={<>A proposed {site.facility.sizeLabel} facility in the {site.location.area}</>}
        intro="OLM is preparing an industrial-use warehouse to bring production, packing, storage and dispatch together in one place. The images on this page are concept visualizations of the proposed facility, not photographs of an operating plant."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <StatusTag>Proposed facility</StatusTag>
          <StatusTag>Equipment layout under development</StatusTag>
        </div>
      </PageIntro>

      <section aria-label="Facility summary">
        <Container className="py-14 lg:py-20">
          <dl className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-white p-7">
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{f.label}</dt>
                <dd className="mt-3 text-lg font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="gallery-title" className="bg-ivory">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="Concept gallery"
            title={<span id="gallery-title">Project visualizations</span>}
            intro="Illustrative renders prepared during planning. Layout, finishes and equipment will change as the project develops."
            className="mb-12"
          />
          <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2">
            {facilityMedia.map((m, i) => (
              <li key={m.src} className={i === 0 ? "md:col-span-2" : undefined}>
                <figure>
                  <MediaFrame
                    media={m}
                    aspect={i === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}
                    sizes={i === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                    priority={i === 0}
                  />
                  <figcaption className="mt-3 text-sm">
                    <span className="font-semibold">{CONCEPT_CAPTION}</span>
                    <span className="text-ink-muted"> — {m.alt.replace(" (concept visualization)", "")}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="zones-title">
        <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Indicative zoning"
              title={<span id="zones-title">How the space is intended to work</span>}
              intro="A simple flow from incoming materials to outgoing deliveries. The final equipment layout is under development and will be confirmed once production lines are selected."
            />
          </div>
          <ol className="grid gap-px self-start overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:col-span-7">
            {zones.map((z, i) => (
              <li key={z.title} className="bg-white p-7">
                <span className="text-sm font-bold text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-bold">{z.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{z.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="equipment-title" className="border-t border-charcoal/10">
        <Container className="max-w-4xl py-14 lg:py-16">
          <h2 id="equipment-title" className="text-lg font-bold">About equipment</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            Machinery for cup forming, box and bag production and ice making is being researched.
            Equipment references used in planning are indicative only; no specific machines have been
            ordered or installed, and capacities will be published only once confirmed.
          </p>
        </Container>
      </section>

      <QuoteCta title="Want to plan supply ahead of opening?" />
    </>
  );
}
