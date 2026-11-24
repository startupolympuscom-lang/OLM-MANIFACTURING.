import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Standard interior page header: generous whitespace, one H1, one intro. */
export function PageIntro({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-charcoal/10">
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        {children}
      </Container>
    </section>
  );
}
