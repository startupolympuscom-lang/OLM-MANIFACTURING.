import Link from "next/link";
import { mainNav, quoteCta, site, territories } from "@/content/site";
import { products } from "@/content/products";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ivory text-charcoal">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={34} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
              Industrial packaging and foodservice supply for cafés, restaurants, bakeries, hotels,
              caterers and distributors — facility in preparation in the {site.location.area},{" "}
              {site.location.country}.
            </p>
          </div>

          <FooterCol title="Company" className="lg:col-span-2">
            {[...mainNav, quoteCta].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">{l.label}</Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Products" className="lg:col-span-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:underline">{p.name}</Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Contact" className="lg:col-span-3">
            <li>
              {site.location.area}, {site.location.region}, {site.location.country}
            </li>
            <li className="text-ink-muted">Serving {territories.join(", ")} and nearby.</li>
            {site.contactEmail ? (
              <li>
                <a href={`mailto:${site.contactEmail}`} className="font-semibold hover:underline">
                  {site.contactEmail}
                </a>
              </li>
            ) : (
              <li>
                <Link href="/quote" className="font-semibold hover:underline">Send an inquiry</Link>
              </li>
            )}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-charcoal/10 pt-6 text-xs leading-relaxed text-ink-muted md:flex-row md:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            Facility images are concept visualizations of a proposed facility. Product images are
            provisional and will be replaced with final photography.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
