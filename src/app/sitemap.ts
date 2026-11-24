import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/capabilities", "/facility", "/about", "/contact", "/quote"];
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
