import type { Audience } from "./site";
import type { ProductMediaKey } from "./media";

/**
 * Product categories. Copy describes intended applications and general format
 * families only. Do NOT add exact capacities, tolerances, prices,
 * certifications, minimum order quantities or machine makes here until OLM
 * has confirmed them in writing.
 */

export type ProductGroup = "Packaging" | "Ice" | "Services";

export type ProductStatus = {
  label: string;
  /** Plain-language explanation shown on the category page. */
  detail: string;
};

export type ProductCategory = {
  slug: ProductMediaKey & string;
  name: string;
  shortName: string;
  group: ProductGroup;
  summary: string;
  intro: string;
  audiences: Audience[];
  applications: string[];
  formats: string[];
  considerations: string[];
  status: ProductStatus;
  featured: boolean;
};

const STATUS = {
  planned: {
    label: "Planned production",
    detail:
      "This category is part of the planned production scope for the Azrou facility. You can already share your requirements so we can plan formats and volumes with you.",
  },
  sourcing: {
    label: "Subject to sourcing confirmation",
    detail:
      "Availability depends on material sourcing and production capability, which are still being confirmed. We will tell you clearly what we can and cannot supply.",
  },
  service: {
    label: "Planned service",
    detail:
      "This service is being organised alongside the facility project. Delivery areas and schedules will be confirmed as operations are set up.",
  },
} satisfies Record<string, ProductStatus>;

export const COMPLIANCE_NOTE =
  "Products are designed for foodservice applications. Food-contact suitability and any applicable regulatory requirements will be verified for each product before supply.";

export const products: ProductCategory[] = [
  {
    slug: "paper-cups",
    name: "Paper Cups",
    shortName: "Paper Cups",
    group: "Packaging",
    summary: "Paper cups for hot and cold drinks, for cafés and takeaway service.",
    intro:
      "Paper cups are a daily essential for cafés, hotels and caterers. OLM plans to supply cup formats suited to hot and cold beverages, with options for businesses that want their own branding.",
    audiences: ["Cafés", "Restaurants", "Hotels", "Caterers", "Distributors"],
    applications: [
      "Coffee, tea and hot beverages",
      "Cold drinks and juices",
      "Takeaway and counter service",
      "Events and catering",
    ],
    formats: [
      "Hot-drink and cold-drink cups",
      "Common serving sizes, confirmed on request",
      "Plain or printed designs, subject to confirmation",
      "Compatible lids and sleeves, subject to sourcing",
    ],
    considerations: [
      "Your typical serving sizes",
      "Estimated monthly quantities",
      "Branding requirements",
    ],
    status: STATUS.planned,
    featured: true,
  },
  {
    slug: "restaurant-takeaway-packaging",
    name: "Restaurant & Takeaway Packaging",
    shortName: "Takeaway Packaging",
    group: "Packaging",
    summary: "Practical boxes and containers for restaurant, takeaway and delivery meals.",
    intro:
      "Takeaway and delivery are now part of everyday restaurant service. OLM intends to provide practical packaging that keeps meals presentable and easy to carry.",
    audiences: ["Restaurants", "Cafés", "Hotels", "Caterers", "Distributors"],
    applications: [
      "Takeaway and delivery meals",
      "Fast-casual and quick-service restaurants",
      "Hotel room service and catering",
      "Prepared food counters",
    ],
    formats: [
      "Folding meal boxes",
      "Food containers in a range of sizes",
      "Paper bags and carriers, subject to sourcing",
      "Plain or branded options, subject to confirmation",
    ],
    considerations: [
      "Types of dishes you serve",
      "Hot, cold or greasy food use",
      "Estimated monthly quantities",
    ],
    status: STATUS.planned,
    featured: true,
  },
  {
    slug: "bakery-pastry-packaging",
    name: "Bakery & Pastry Packaging",
    shortName: "Bakery Packaging",
    group: "Packaging",
    summary: "Boxes and bags that protect and present bakery and pastry products.",
    intro:
      "Bakeries and pastry shops need packaging that protects delicate products and presents them well. OLM plans a bakery range designed around the needs of local bakeries and patisseries.",
    audiences: ["Bakeries", "Cafés", "Hotels", "Caterers", "Distributors"],
    applications: [
      "Cakes and pastries",
      "Bread and viennoiserie",
      "Gift and celebration orders",
      "Café counter sales",
    ],
    formats: [
      "Folding pastry and cake boxes",
      "Bakery bags",
      "Window and plain options, subject to sourcing",
      "Branded designs, subject to confirmation",
    ],
    considerations: [
      "Product sizes and shapes",
      "Presentation and branding needs",
      "Seasonal peaks in demand",
    ],
    status: STATUS.planned,
    featured: true,
  },
  {
    slug: "food-safe-ice",
    name: "Food-Safe Ice",
    shortName: "Ice Production",
    group: "Ice",
    summary: "Ice for beverage service and food handling in cafés, hotels and restaurants.",
    intro:
      "Reliable ice supply matters for cafés, hotels, restaurants and caterers, especially in warmer months. OLM plans an ice production line for foodservice use, with hygiene requirements verified before launch.",
    audiences: ["Cafés", "Restaurants", "Hotels", "Caterers", "Distributors"],
    applications: [
      "Beverage service",
      "Display and chilling of food",
      "Events and catering",
      "Seasonal demand peaks",
    ],
    formats: [
      "Ice cubes for beverages",
      "Bagged ice, sizes to be confirmed",
      "Other formats, subject to equipment selection",
    ],
    considerations: [
      "Typical daily or weekly needs",
      "Seasonal variation",
      "Delivery location and frequency",
    ],
    status: STATUS.planned,
    featured: true,
  },
  {
    slug: "custom-packaging",
    name: "Custom Packaging",
    shortName: "Custom Packaging",
    group: "Packaging",
    summary: "Packaging adapted to your brand and products, subject to sourcing and capability confirmation.",
    intro:
      "Some businesses need packaging that reflects their brand or fits a specific product. OLM will review custom requests case by case and confirm what can be produced or sourced.",
    audiences: ["Cafés", "Restaurants", "Bakeries", "Hotels", "Caterers", "Distributors"],
    applications: [
      "Branded cups and boxes",
      "Packaging for specific products",
      "Hotel and event presentation",
      "Private-label supply for distributors",
    ],
    formats: [
      "Printed versions of standard formats",
      "Adapted sizes, where feasible",
      "Other requests reviewed individually",
    ],
    considerations: [
      "Artwork and brand guidelines",
      "Product dimensions",
      "Expected volumes and timing",
    ],
    status: STATUS.sourcing,
    featured: false,
  },
  {
    slug: "distribution",
    name: "Storage & Distribution",
    shortName: "Distribution",
    group: "Services",
    summary: "Planned storage and regular delivery to foodservice businesses across the region.",
    intro:
      "Packaging is only useful when it arrives on time. Alongside production, OLM plans storage and delivery for customers in Azrou, Ifrane, Meknès, Fès, Sefrou, El Hajeb and nearby locations.",
    audiences: ["Cafés", "Restaurants", "Bakeries", "Hotels", "Caterers", "Distributors"],
    applications: [
      "Regular scheduled deliveries",
      "Stock held for repeat orders",
      "Supply to distributors and wholesalers",
    ],
    formats: [
      "Delivery areas confirmed as operations start",
      "Order frequency agreed with each customer",
    ],
    considerations: [
      "Delivery city and access",
      "Preferred delivery frequency",
      "Storage space at your site",
    ],
    status: STATUS.service,
    featured: false,
  },
];

export const productGroups: ProductGroup[] = ["Packaging", "Ice", "Services"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
