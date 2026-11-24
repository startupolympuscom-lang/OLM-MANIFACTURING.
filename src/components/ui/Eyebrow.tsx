import type { ReactNode } from "react";

/** Small uppercase label with a short orange rule — the main accent device. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted ${className}`}>
      <span aria-hidden="true" className="h-0.5 w-6 bg-orange" />
      {children}
    </p>
  );
}
