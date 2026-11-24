import { audiences } from "./site";
import { products } from "./products";

/** Quote form options and labels (kept here for translation). */
export const quoteForm = {
  businessTypes: [...audiences, "Other"],
  categories: [...products.map((p) => ({ value: p.slug, label: p.name })), { value: "other", label: "Other / not sure yet" }],
  quantities: [
    "Not sure yet",
    "Small — trial or occasional orders",
    "Medium — regular monthly orders",
    "Large — high-volume or multi-site supply",
  ],
  cities: ["Azrou", "Ifrane", "Meknès", "Fès", "Sefrou", "El Hajeb", "Other"],
} as const;
