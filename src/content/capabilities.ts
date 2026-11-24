/**
 * Capability workflow. Each stage carries a status so the site never presents
 * planned production as an existing operation. Update `status` only when OLM
 * confirms a stage is operational.
 */
export type CapabilityStatus = "Available now" | "In preparation" | "Planned";

export type Capability = {
  title: string;
  status: CapabilityStatus;
  text: string;
  points: string[];
};

export const capabilities: Capability[] = [
  {
    title: "Requirements & quotations",
    status: "Available now",
    text: "We already discuss packaging and ice needs with foodservice businesses and prepare quotation requests.",
    points: ["Needs assessment by business type", "Volume and delivery planning", "Quote requests through this website"],
  },
  {
    title: "Sourcing",
    status: "In preparation",
    text: "Raw material and component suppliers are being evaluated for quality, continuity of supply and suitability for food-contact use.",
    points: ["Supplier evaluation", "Continuity of supply", "Documentation requested from suppliers"],
  },
  {
    title: "Material selection",
    status: "In preparation",
    text: "Materials are chosen per application — hot or cold drinks, greasy or dry foods, presentation needs — with food-contact suitability verified per product.",
    points: ["Application-led selection", "Food-contact verification per product", "Branding and print options reviewed"],
  },
  {
    title: "Production & contract manufacturing",
    status: "Planned",
    text: "In-house production lines are planned for the Azrou facility. Where a product falls outside our own lines, contract manufacturing with qualified partners may be considered.",
    points: ["Planned in-house lines", "Equipment selection under development", "Partner manufacturing where appropriate"],
  },
  {
    title: "Packaging",
    status: "Planned",
    text: "Finished products will be counted, packed and labelled for hygienic handling and easy storage at your site.",
    points: ["Hygienic packing", "Clear labelling", "Pack sizes agreed with customers"],
  },
  {
    title: "Quality assurance",
    status: "Planned",
    text: "A quality control process will be defined for each product line, including incoming material checks and finished goods inspection. Compliance requirements will be verified before supply.",
    points: ["Incoming material checks", "In-process and final inspection", "Regulatory requirements verified per product"],
  },
  {
    title: "Storage",
    status: "Planned",
    text: "The proposed 1,000 m² facility includes space for raw materials and finished goods, so stock can be held for repeat orders.",
    points: ["Raw material storage", "Finished goods storage", "Stock for repeat orders"],
  },
  {
    title: "Distribution",
    status: "Planned",
    text: "Scheduled deliveries are planned to Azrou, Ifrane, Meknès, Fès, Sefrou, El Hajeb and nearby locations.",
    points: ["Regional delivery", "Agreed delivery frequency", "Supply to distributors"],
  },
];
