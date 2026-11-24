"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { mainNav, quoteCta } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";

export function SiteHeader({ logo }: { logo: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" aria-label="OLM Manufacturing — home" className="shrink-0">
          {logo}
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors hover:text-charcoal ${
                    isActive(item.href) ? "text-charcoal" : "text-ink-muted"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-orange" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link href={quoteCta.href} className={buttonClasses("accent", "min-h-11 px-3.5 text-xs sm:px-5 sm:text-sm")}>
            {quoteCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-charcoal/10 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-12 items-center border-b border-charcoal/5 text-base font-medium"
                >
                  {isActive(item.href) && <span aria-hidden="true" className="mr-3 h-0.5 w-4 bg-orange" />}
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link href={quoteCta.href} className={buttonClasses("accent", "w-full")}>
                {quoteCta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
