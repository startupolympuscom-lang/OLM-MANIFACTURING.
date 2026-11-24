import type { Metadata } from "next";
import { capabilities, type CapabilityStatus } from "@/content/capabilities";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { QuoteCta } from "@/components/sections/QuoteCta";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "OLM Manufacturing's planned workflow: sourcing, material selection, production and contract manufacturing, packaging, quality assurance, storage and distribution.",
  alternates: { canonical: "/capabilities" },
};

const legend: { status: CapabilityStatus; text: string }[] = [
  { status: "Available now", text: "Something we can do for you today." },
  { status: "In preparation", text: "Work under way, not yet offered as a service." },
  { status: "Planned", text: "Part of the facility project; depends on the facility opening." },
];

const statusStyle: Record<CapabilityStatus, string> = {
  "Available now": "bg-charcoal text-white border-charcoal",
  "In preparation": "bg-white text-charcoal border-charcoal",
  Planned: "bg-white text-ink-muted border-charcoal/20",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Capabilities"
        title="A planned workflow from sourcing to delivery"
        intro="OLM is building an integrated workflow for foodservice packaging and ice. Each stage below is marked as available now, in preparation or planned, so you know exactly where things stand."
      >
        <dl className="mt-12 grid gap-6 sm:grid-cols-3">
          {legend.map((l) => (
            <div key={l.status} className="border-t border-charcoal/10 pt-5">
              <dt><Status status={l.status} /></dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-muted">{l.text}</dd>
            </div>
          ))}
        </dl>
      </PageIntro>

      <section aria-label="Workflow stages">
        <Container className="py-16 lg:py-24">
          <ol className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {capabilities.map((c, i) => (
              <li key={c.title} className="grid gap-5 py-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <span className="text-sm font-bold text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight">{c.title}</h2>
                  <div className="mt-4"><Status status={c.status} /></div>
                </div>
                <p className="leading-relaxed text-ink-muted lg:col-span-5">{c.text}</p>
                <ul className="space-y-2 text-sm lg:col-span-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.65em] h-px w-3 shrink-0 bg-orange" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="bg-ivory">
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="Working with OLM"
            title={<span id="process-title">How we work with customers</span>}
            className="mb-12"
          />
          <ProcessSteps />
        </Container>
      </section>

      <QuoteCta />
    </>
  );
}

function Status({ status }: { status: CapabilityStatus }) {
  return (
    <span className={`inline-flex border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${statusStyle[status]}`}>
      {status}
    </span>
  );
}
