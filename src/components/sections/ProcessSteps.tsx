import { processSteps } from "@/content/process";

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => (
        <li key={step.title} className="bg-white p-7 sm:p-8">
          <span className="text-sm font-bold text-charcoal">
            <span className="text-orange" aria-hidden="true">— </span>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
