import { NextResponse } from "next/server";
import { normaliseQuote, validateQuote, quoteToText, categoryLabel } from "@/lib/quote";
import { activeTransport, deliverQuote } from "@/lib/quote-delivery";

export const runtime = "nodejs";

/** Minimum time (ms) between form render and submit — bots submit instantly. */
const MIN_FILL_MS = 3000;
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 24;

/** Best-effort in-memory rate limit (per server instance). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

export async function POST(req: Request) {
  if (!activeTransport()) {
    return NextResponse.json(
      { ok: false, code: "not_configured", message: "Online delivery is not configured yet." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request", message: "Invalid request." }, { status: 400 });
  }

  // Spam protection: honeypot + timing.
  const startedAt = Number(body.startedAt);
  const elapsed = Date.now() - startedAt;
  if ((typeof body.website === "string" && body.website !== "") || !Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return NextResponse.json({ ok: false, code: "rejected", message: "Your request could not be accepted. Please try again." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited", message: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  const quote = normaliseQuote(body);
  const errors = validateQuote(quote);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  try {
    await deliverQuote({
      subject: `Quote request: ${categoryLabel(quote.category)} — ${quote.company}`,
      text: quoteToText(quote),
      data: { ...quote, categoryLabel: categoryLabel(quote.category), submittedAt: new Date().toISOString() },
      replyTo: quote.email,
    });
  } catch (err) {
    console.error("[quote] delivery failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, code: "delivery_failed", message: "We could not send your request right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
