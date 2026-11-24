import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-ink-muted">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/products" variant="outline">View products</ButtonLink>
      </div>
    </Container>
  );
}
