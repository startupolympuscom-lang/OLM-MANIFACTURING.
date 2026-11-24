/**
 * Image manifest. Every image on the site is referenced here by key.
 *
 * - `src` is a path under /public. If the file is not present at build time,
 *   the site renders a neutral, clearly labelled placeholder instead of a
 *   broken image (see src/lib/media.ts).
 * - `provisional: true` marks illustrative crops that must be replaced with
 *   final product photography (a small "Provisional image" tag is shown).
 * - `concept: true` marks facility visualizations (captioned on the site).
 *
 * To swap an image: drop the new file into /public/assets/... and update `src`
 * (and `width`/`height`) here. No component changes are needed.
 */

export type MediaItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  provisional?: boolean;
  concept?: boolean;
};

const product = (file: string, alt: string): MediaItem => ({
  src: `/assets/products/${file}`,
  alt,
  width: 1200,
  height: 900,
  provisional: true,
});

export const productMedia = {
  hero: product(
    "hero-product-composition.webp",
    "Arrangement of paper cups, takeaway boxes and bakery packaging for foodservice",
  ),
  "paper-cups": product("paper-cups.webp", "White paper cups for hot and cold drinks"),
  "restaurant-takeaway-packaging": product(
    "restaurant-takeaway-packaging.webp",
    "Kraft takeaway boxes for restaurant meals",
  ),
  "bakery-pastry-packaging": product(
    "bakery-pastry-packaging.webp",
    "White folding bakery box with pastries",
  ),
  "food-safe-ice": product("food-safe-ice.webp", "Clear ice cubes for beverage service"),
  "custom-packaging": product(
    "custom-packaging.webp",
    "Food containers prepared for branded packaging",
  ),
  distribution: product(
    "distribution.webp",
    "Palletised packaging stock ready for distribution",
  ),
} satisfies Record<string, MediaItem>;

export type ProductMediaKey = keyof typeof productMedia;

const FACILITY_CAPTIONS = [
  "Exterior view of the proposed facility",
  "Proposed loading and dispatch area",
  "Proposed raw material reception zone",
  "Proposed production hall",
  "Proposed packaging area",
  "Proposed quality control station",
  "Proposed storage racking",
  "Proposed finished goods storage",
  "Proposed staff and hygiene areas",
  "Aerial view of the proposed site layout",
];

/**
 * Ten approved concept renders from 04_Facility_Concept_Renders/WebP.
 * File names are placeholders — rename here to match the delivered files.
 */
export const facilityMedia: MediaItem[] = FACILITY_CAPTIONS.map((alt, i) => ({
  src: `/assets/facility/facility-concept-${String(i + 1).padStart(2, "0")}.webp`,
  alt: `${alt} (concept visualization)`,
  width: 1600,
  height: 1000,
  concept: true,
}));

export const CONCEPT_CAPTION = "Project visualization — proposed facility";
