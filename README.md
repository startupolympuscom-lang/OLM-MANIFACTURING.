# OLM Manufacturing — marketing website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Montserrat (self-hosted via `@fontsource-variable/montserrat`).

## Run

```bash
npm install
cp .env.example .env.local   # optional, see "Quote form" below
npm run dev                  # http://localhost:3000
```

Production build and checks:

```bash
npm run check   # typecheck + lint + build
npm start
```

Node 20+ recommended.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, proof points, product cards, facility, process, quote CTA |
| `/products` | Category index with Category / Business-type filters |
| `/products/[slug]` | Six static category pages (applications, formats, inquiry CTA) |
| `/capabilities` | Workflow with **Available now / In preparation / Planned** status per stage |
| `/facility` | Proposed 1,000 m² facility: summary, 10-render concept gallery, zoning |
| `/about` | Background, mission, territories, approach |
| `/contact`, `/quote` | Validated quote-request form (`/quote?category=<slug>` pre-selects a category) |
| `/api/quote` | Server route that delivers quote requests (if configured) |

## Project structure

```
src/
  app/                 routes, metadata, sitemap.ts, robots.ts, api/quote/route.ts
  components/
    layout/            SiteHeader (sticky, mobile menu), SiteFooter, Logo
    ui/                Button, Container, Eyebrow, SectionHeading, MediaFrame, StatusTag
    products/          ProductCard, ProductFilter
    sections/          PageIntro, ProcessSteps, QuoteCta
    forms/             QuoteForm
  content/             ALL copy and data (site, products, capabilities, process, quote, media)
  lib/                 media existence check, quote validation, quote delivery
public/assets/
  brand/               OLM_Official_Horizontal_Trimmed.png (official logo, unmodified)
  products/            provisional product images (to be supplied)
  facility/            concept renders (to be supplied)
  machinery/           reference images (not published on the site)
scripts/sync-assets.mjs
```

## Brand

- Logo: `public/assets/brand/OLM_Official_Horizontal_Trimmed.png` is the uploaded official file, byte-for-byte. `Logo.tsx` only crops its transparent padding with CSS; the artwork is never redrawn or recoloured. The logo is shown on light backgrounds only (the footer is ivory for this reason).
- Colours are defined once in `src/app/globals.css` (`@theme`) and mirrored in `src/content/design-tokens.json`: charcoal `#1F2937`, orange `#F97316`, ivory `#F4EFE9`, steel `#9CA3AF`, white. `ink-muted` (`#4B5563`) is a charcoal tint for secondary text, so it meets WCAG AA contrast.
- Orange is used only for accents (short rules, focus rings, the outlined *Get a Quote* button). It is never used for small text, because orange on white fails AA contrast.

## Swapping images

Every image is referenced in **`src/content/media.ts`**. When a file is missing, the site shows a labelled ivory placeholder instead of a broken image. When the file exists, it is served through `next/image` (AVIF/WebP, responsive `sizes`).

1. Put the client folders (`01_Brand`, `03_Product_Images`, `04_Facility_Concept_Renders/WebP`, `05_Machinery_References`) in the repo root, or anywhere else.
2. Run `npm run assets:sync -- <folder>`. This copies the images into `public/assets/...` with their names unchanged and lists every path in `media.ts` that is still missing.
3. Update the `src` paths in `media.ts` to the real filenames, or rename the files to match. For product images, set the real `width`/`height` too.
4. Product images have `provisional: true`, which adds a small "Provisional image" tag. Set it to `false` once final photography is in.
5. Rebuild.

Facility renders always carry the caption *"Project visualization — proposed facility"*. Do not use low-resolution crops for large slots (hero, wide cards). They need roughly 1200 px of width to stay sharp.

## Quote form

Validation is shared between the client and the server (`src/lib/quote.ts`). Spam protection uses a hidden honeypot field, a minimum fill time of 3 seconds and a per-IP rate limit (5 per 10 minutes, per instance).

Set **one** server-side transport in `.env.local` or in your host's environment:

- **Resend:** `RESEND_API_KEY`, `QUOTE_TO_EMAIL` (comma-separated is fine), `QUOTE_FROM_EMAIL` (sender on a domain verified in Resend).
- **Webhook:** `QUOTE_WEBHOOK_URL` (Make, Zapier, n8n, Formspree, a CRM…), plus an optional `QUOTE_WEBHOOK_SECRET` sent as `X-Webhook-Secret`. The JSON payload holds `subject`, `text` and every form field.

Behaviour:
- **Transport configured:** the form posts to `/api/quote`. It shows "Request sent" only when the provider accepts the request. On failure it says so and offers the email/download fallback.
- **No transport:** a notice says online sending is not connected. After validation the user gets **Open email draft** (`mailto:` to `NEXT_PUBLIC_CONTACT_EMAIL`, or no recipient if that is unset) and **Download request (.txt)**. The site never fakes a submission.

`/contact` and `/quote` are rendered per request, so a change of environment variables takes effect after a restart, without a rebuild. `NEXT_PUBLIC_*` values are inlined at build time, so changing them needs a rebuild.

## Content accuracy rules

All copy lives in `src/content/`. When editing it:
- Do not claim certifications (e.g. ONSSA), "certified food-safe", capacities, tolerances, prices, MOQs, machine makes, staff names, testimonials or customers unless they are documented. Use "designed for foodservice applications"; food-contact suitability is verified per product (`COMPLIANCE_NOTE`).
- April 2027 is a **target** opening (`site.facility.targetOpening`). The facility and production lines stay "proposed"/"planned" until verified.
- Capability status lives in `src/content/capabilities.ts`. Change a stage to "Available now" only once it is confirmed.
- Structured data (`app/layout.tsx`) includes only the organisation name, URL, logo and, if set, the email.

## French translation

Strings are grouped in typed content objects (`src/content/*.ts`), and component markup holds only short UI labels. To add French, duplicate the content files per locale (e.g. `src/content/fr/`), add an `app/[locale]` segment or a library such as `next-intl`, and select the content module by locale.
