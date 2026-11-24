import "server-only";

/**
 * Server-side quote delivery. Configure ONE transport via environment
 * variables (see .env.example). Secrets never reach the browser.
 *
 *  1. Resend (email):   RESEND_API_KEY + QUOTE_TO_EMAIL (+ QUOTE_FROM_EMAIL)
 *  2. Webhook (any):    QUOTE_WEBHOOK_URL (+ optional QUOTE_WEBHOOK_SECRET)
 *                       e.g. Make, Zapier, n8n, Formspree, a CRM endpoint.
 */

export type Transport = "resend" | "webhook" | null;

export function activeTransport(): Transport {
  if (process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL) return "resend";
  if (process.env.QUOTE_WEBHOOK_URL) return "webhook";
  return null;
}

export async function deliverQuote(payload: { text: string; data: Record<string, unknown>; replyTo: string; subject: string }) {
  const transport = activeTransport();
  if (transport === "resend") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || "OLM Website <onboarding@resend.dev>",
        to: process.env.QUOTE_TO_EMAIL!.split(",").map((s) => s.trim()),
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
    return;
  }
  if (transport === "webhook") {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.QUOTE_WEBHOOK_SECRET) headers["X-Webhook-Secret"] = process.env.QUOTE_WEBHOOK_SECRET;
    const res = await fetch(process.env.QUOTE_WEBHOOK_URL!, {
      method: "POST",
      headers,
      body: JSON.stringify({ subject: payload.subject, text: payload.text, ...payload.data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }
  throw new Error("No delivery transport configured");
}
