import { quoteForm } from "@/content/quote";

/** Shared client + server validation for the quote request form. */

export type QuoteInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  businessType: string;
  category: string;
  quantity: string;
  city: string;
  message: string;
  consent: boolean;
};

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

export const emptyQuote: QuoteInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  businessType: "",
  category: "",
  quantity: "",
  city: "",
  message: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{8,20}$/;

const LIMITS: Partial<Record<keyof QuoteInput, number>> = {
  name: 100,
  company: 120,
  email: 160,
  phone: 30,
  city: 80,
  message: 2000,
};

export function normaliseQuote(raw: unknown): QuoteInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: keyof QuoteInput) => (typeof r[k] === "string" ? (r[k] as string).trim() : "");
  return {
    name: str("name"),
    company: str("company"),
    email: str("email"),
    phone: str("phone"),
    businessType: str("businessType"),
    category: str("category"),
    quantity: str("quantity"),
    city: str("city"),
    message: str("message"),
    consent: r.consent === true || r.consent === "on" || r.consent === "true",
  };
}

export function validateQuote(q: QuoteInput): QuoteErrors {
  const e: QuoteErrors = {};
  if (q.name.length < 2) e.name = "Please enter your full name.";
  if (q.company.length < 2) e.company = "Please enter your company or business name.";
  if (!EMAIL_RE.test(q.email)) e.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(q.phone)) e.phone = "Please enter a valid phone number, e.g. +212 6XX XX XX XX.";
  if (!(quoteForm.businessTypes as readonly string[]).includes(q.businessType)) e.businessType = "Please select your business type.";
  if (!quoteForm.categories.some((c) => c.value === q.category)) e.category = "Please select a packaging category.";
  if (!(quoteForm.quantities as readonly string[]).includes(q.quantity)) e.quantity = "Please select an estimated monthly quantity.";
  if (q.city.length < 2) e.city = "Please enter your delivery city.";
  if (q.message.length < 10) e.message = "Please describe your needs in a few words (at least 10 characters).";
  if (!q.consent) e.consent = "Please confirm we may use these details to reply to you.";
  for (const [k, max] of Object.entries(LIMITS) as [keyof QuoteInput, number][]) {
    const v = q[k];
    if (typeof v === "string" && v.length > max) e[k] = `Please keep this under ${max} characters.`;
  }
  return e;
}

export function categoryLabel(value: string) {
  return quoteForm.categories.find((c) => c.value === value)?.label ?? value;
}

/** Plain-text version of a request, used for email bodies and the mailto/download fallback. */
export function quoteToText(q: QuoteInput) {
  return [
    "Quote request — OLM Manufacturing",
    "",
    `Name: ${q.name}`,
    `Company: ${q.company}`,
    `Email: ${q.email}`,
    `Phone: ${q.phone}`,
    `Business type: ${q.businessType}`,
    `Packaging category: ${categoryLabel(q.category)}`,
    `Estimated monthly quantity: ${q.quantity}`,
    `Delivery city: ${q.city}`,
    "",
    "Message:",
    q.message,
  ].join("\n");
}
