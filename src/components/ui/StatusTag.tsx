export function StatusTag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-charcoal/15 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
      {children}
    </span>
  );
}
