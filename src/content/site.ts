/**
 * Site-wide facts and copy. Everything a translator or the client needs to
 * review lives in src/content/*. Keep claims here limited to what has been
 * confirmed by OLM (see README → "Content accuracy rules").
 */

export const site = {
  name: "OLM Manufacturing",
  legalName: "OLM Manufacturing Solutions",
  tagline: "Manufacturing packaging solutions for the food industry",
  description:
    "OLM Manufacturing Solutions is preparing an industrial packaging and foodservice supply facility in the Azrou area of Morocco to serve cafés, restaurants, bakeries, hotels, caterers and distributors.",
  /** Public site URL, used for metadata, sitemap and structured data. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Public contact email. Left empty until the client confirms an address. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  location: {
    area: "Azrou area",
    region: "Middle Atlas",
    country: "Morocco",
  },
  facility: {
    sizeLabel: "1,000 m²",
    type: "industrial-use warehouse",
    /** Planning target only — not a confirmed launch date. */
    targetOpening: "April 2027",
  },
  logo: {
    src: "/assets/brand/OLM_Official_Horizontal_Trimmed.png",
    width: 2172,
    height: 724,
    alt: "OLM Manufacturing",
  },
} as const;

export const territories = [
  "Azrou",
  "Ifrane",
  "Meknès",
  "Fès",
  "Sefrou",
  "El Hajeb",
] as const;

export const audiences = [
  "Cafés",
  "Restaurants",
  "Bakeries",
  "Hotels",
  "Caterers",
  "Distributors",
] as const;

export type Audience = (typeof audiences)[number];

export const mainNav = [
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Our Facility", href: "/facility" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const quoteCta = { label: "Get a Quote", href: "/quote" } as const;

/** Short, reusable status line. Used wherever the project stage is mentioned. */
export const projectStatus = `Facility in preparation · current target opening ${site.facility.targetOpening}, subject to project milestones.`;
