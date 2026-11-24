import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

type Props = {
  title?: string;
  text?: string;
};

export function QuoteCta({
  title = "Planning your packaging or ice supply?",
  text = "Tell us what you use today, your estimated quantities and where you are based. We will get back to you with what we can offer and when.",
}: Props) {
  return (
    <section aria-labelledby="quote-cta-title" className="bg-charcoal text-white">
      <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-7">
          <span aria-hidden="true" className="block h-0.5 w-8 bg-orange" />
          <h2 id="quote-cta-title" className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/80">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink href="/quote" variant="inverse" arrow>
            Request a quote
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" className="border-white/40 text-white hover:border-white">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
