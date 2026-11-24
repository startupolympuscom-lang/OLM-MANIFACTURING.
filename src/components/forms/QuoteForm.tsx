"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { quoteForm } from "@/content/quote";
import { emptyQuote, quoteToText, validateQuote, categoryLabel, type QuoteErrors, type QuoteInput } from "@/lib/quote";
import { buttonClasses } from "@/components/ui/Button";

type Props = {
  /** True when a server-side transport (email/webhook) is configured. */
  deliveryConfigured: boolean;
  /** Public contact email for the mailto fallback (may be empty). */
  contactEmail: string;
  initialCategory?: string;
};

type Phase =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "fallback"; reason: "not_configured" | "failed"; message?: string };

const FIELD_ORDER: (keyof QuoteInput)[] = [
  "name", "company", "email", "phone", "businessType", "category", "quantity", "city", "message", "consent",
];

export function QuoteForm({ deliveryConfigured, contactEmail, initialCategory }: Props) {
  const [values, setValues] = useState<QuoteInput>(() => ({
    ...emptyQuote,
    category: quoteForm.categories.some((c) => c.value === initialCategory) ? initialCategory! : "",
  }));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [startedAt, setStartedAt] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);
  useEffect(() => {
    if (phase.kind === "sent" || phase.kind === "fallback") statusRef.current?.focus();
  }, [phase.kind]);

  const set = (key: keyof QuoteInput) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const trimmed = (): QuoteInput => ({
    ...values,
    ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = trimmed();
    const errs = validateQuote(q);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = FIELD_ORDER.find((k) => errs[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (honeypot) return; // silently ignore bots

    if (!deliveryConfigured) {
      setPhase({ kind: "fallback", reason: "not_configured" });
      return;
    }

    setPhase({ kind: "submitting" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...q, website: honeypot, startedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; message?: string; errors?: QuoteErrors };
      if (res.ok && data.ok) {
        setPhase({ kind: "sent" });
        return;
      }
      if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setPhase({ kind: "idle" });
        return;
      }
      setPhase({
        kind: "fallback",
        reason: data.code === "not_configured" ? "not_configured" : "failed",
        message: data.message,
      });
    } catch {
      setPhase({ kind: "fallback", reason: "failed", message: "The connection failed before your request was sent." });
    }
  }

  if (phase.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-charcoal/15 bg-ivory p-8 sm:p-10">
        <span aria-hidden="true" className="block h-0.5 w-8 bg-orange" />
        <h2 className="mt-6 text-2xl font-bold">Request sent</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Thank you, {values.name.split(" ")[0]}. Your request has been delivered to the OLM team. We will reply to{" "}
          <strong className="text-charcoal">{values.email}</strong>.
        </p>
        <button
          type="button"
          className={buttonClasses("outline", "mt-8")}
          onClick={() => {
            setValues(emptyQuote);
            setPhase({ kind: "idle" });
            setStartedAt(Date.now());
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  const q = trimmed();
  const text = quoteToText(q);
  const subject = `Quote request: ${categoryLabel(q.category)} — ${q.company}`;
  const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  const download = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;

  return (
    <div>
      {!deliveryConfigured && phase.kind !== "fallback" && (
        <div className="mb-8 border-l-2 border-orange bg-ivory p-5 text-sm leading-relaxed">
          <p className="font-semibold">Online sending is not connected yet.</p>
          <p className="mt-1 text-ink-muted">
            Your details will be checked here, then turned into an email draft you can send from your own email
            app, or a text file you can download. Nothing is sent automatically.
          </p>
        </div>
      )}

      {phase.kind === "fallback" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 border border-charcoal/15 bg-ivory p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            {phase.reason === "failed" ? "Your request was not sent" : "Your request is ready to send"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {phase.reason === "failed"
              ? `${phase.message ?? "Something went wrong."} Your details are kept below — you can try again, or send them by email instead.`
              : "Online sending is not connected yet, so your request has not been sent. Use one of the options below to send it yourself."}
            {!contactEmail && " Our public email address has not been published yet — please add the recipient in your email app."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={mailto} className={buttonClasses("primary")}>Open email draft</a>
            <a href={download} download="olm-quote-request.txt" className={buttonClasses("outline")}>
              Download request (.txt)
            </a>
          </div>
        </div>
      )}

      <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-required-note" className="space-y-6">
        <p id="form-required-note" className="text-sm text-ink-muted">All fields are required.</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" name="name" error={errors.name}>
            {(p) => <input {...p} type="text" autoComplete="name" value={values.name} onChange={set("name")} />}
          </Field>
          <Field label="Company" name="company" error={errors.company}>
            {(p) => <input {...p} type="text" autoComplete="organization" value={values.company} onChange={set("company")} />}
          </Field>
          <Field label="Email" name="email" error={errors.email}>
            {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set("email")} />}
          </Field>
          <Field label="Phone" name="phone" error={errors.phone}>
            {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" placeholder="+212" value={values.phone} onChange={set("phone")} />}
          </Field>
          <Field label="Business type" name="businessType" error={errors.businessType}>
            {(p) => (
              <select {...p} value={values.businessType} onChange={set("businessType")}>
                <option value="">Select…</option>
                {quoteForm.businessTypes.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            )}
          </Field>
          <Field label="Packaging category" name="category" error={errors.category}>
            {(p) => (
              <select {...p} value={values.category} onChange={set("category")}>
                <option value="">Select…</option>
                {quoteForm.categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            )}
          </Field>
          <Field label="Estimated monthly quantity" name="quantity" error={errors.quantity}>
            {(p) => (
              <select {...p} value={values.quantity} onChange={set("quantity")}>
                <option value="">Select…</option>
                {quoteForm.quantities.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            )}
          </Field>
          <Field label="Delivery city" name="city" error={errors.city}>
            {(p) => (
              <>
                <input {...p} type="text" list="city-options" autoComplete="address-level2" value={values.city} onChange={set("city")} />
                <datalist id="city-options">
                  {quoteForm.cities.filter((c) => c !== "Other").map((c) => <option key={c} value={c} />)}
                </datalist>
              </>
            )}
          </Field>
        </div>

        <Field label="Message" name="message" error={errors.message} hint="Products you use today, sizes, branding needs, timing.">
          {(p) => <textarea {...p} rows={5} value={values.message} onChange={set("message")} />}
        </Field>

        {/* Honeypot — hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <div>
          <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent}
              onChange={set("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 accent-charcoal"
            />
            <span>I agree that OLM Manufacturing may use these details to respond to my request.</span>
          </label>
          {errors.consent && <p id="consent-error" className="mt-2 text-sm font-medium text-[#b42318]">{errors.consent}</p>}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <button type="submit" disabled={phase.kind === "submitting"} className={buttonClasses("primary", "disabled:opacity-60")}>
            {phase.kind === "submitting"
              ? "Sending…"
              : deliveryConfigured
                ? phase.kind === "fallback" ? "Try sending again" : "Send request"
                : "Prepare email draft"}
          </button>
          <p aria-live="polite" className="text-sm text-ink-muted">
            {phase.kind === "submitting" ? "Sending your request…" : ""}
          </p>
        </div>
      </form>
    </div>
  );
}

type FieldRenderProps = {
  id: string;
  name: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  className: string;
};

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: (p: FieldRenderProps) => ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">{label}</label>
      {hint && <p id={hintId} className="mt-1 text-xs text-ink-muted">{hint}</p>}
      <div className="mt-2">
        {children({
          id,
          name,
          "aria-invalid": !!error,
          "aria-describedby": [hintId, errId].filter(Boolean).join(" ") || undefined,
          className: `block min-h-12 w-full border bg-white px-4 py-3 text-base text-charcoal outline-none transition-colors focus:border-charcoal ${
            error ? "border-[#b42318]" : "border-charcoal/20"
          }`,
        })}
      </div>
      {error && <p id={errId} className="mt-2 text-sm font-medium text-[#b42318]">{error}</p>}
    </div>
  );
}
