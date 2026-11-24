import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "accent" | "inverse";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap px-6 text-sm font-semibold tracking-wide transition-colors duration-150";

const variants: Record<Variant, string> = {
  // Charcoal fill: highest-contrast primary action.
  primary: "bg-charcoal text-white hover:bg-black",
  // Neutral outline.
  outline: "border border-charcoal/25 text-charcoal hover:border-charcoal",
  // Orange outline (brand CTA). Text stays charcoal for contrast.
  accent: "border-2 border-orange text-charcoal hover:bg-orange hover:text-charcoal",
  // For dark backgrounds.
  inverse: "bg-white text-charcoal hover:bg-ivory",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

type LinkProps = ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode; arrow?: boolean };

export function ButtonLink({ variant = "primary", className = "", children, arrow, ...rest }: LinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

/** Understated text link with an orange underline accent. */
export function TextLink({ className = "", children, ...rest }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`group inline-flex items-center gap-2 text-sm font-semibold text-charcoal underline decoration-orange decoration-2 underline-offset-[6px] hover:decoration-charcoal ${className}`}
      {...rest}
    >
      {children}
      <Arrow className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
