"use client";

import { useMemo, useState, type ReactNode } from "react";

export type FilterableItem = {
  slug: string;
  group: string;
  audiences: string[];
  node: ReactNode;
};

type Props = {
  items: FilterableItem[];
  groups: string[];
  audiences: string[];
};

const ALL = "All";

export function ProductFilter({ items, groups, audiences }: Props) {
  const [group, setGroup] = useState(ALL);
  const [audience, setAudience] = useState(ALL);

  const visible = useMemo(
    () =>
      items.filter(
        (i) => (group === ALL || i.group === group) && (audience === ALL || i.audiences.includes(audience)),
      ),
    [items, group, audience],
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-charcoal/10 py-6 lg:flex-row lg:items-center lg:gap-12">
        <FilterGroup label="Category" options={[ALL, ...groups]} value={group} onChange={setGroup} />
        <FilterGroup label="Business type" options={[ALL, ...audiences]} value={audience} onChange={setAudience} />
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "category" : "categories"} shown
      </p>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((i) => (
            <li key={i.slug}>{i.node}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-charcoal/10 bg-ivory p-10 text-center">
          <p className="font-semibold">No category matches this combination.</p>
          <button
            type="button"
            className="mt-4 min-h-11 text-sm font-semibold underline decoration-orange decoration-2 underline-offset-4"
            onClick={() => {
              setGroup(ALL);
              setAudience(ALL);
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted sm:w-28 lg:w-auto">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o)}
              className={`min-h-10 border px-4 text-sm font-medium transition-colors ${
                active
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-charcoal/15 bg-white text-charcoal hover:border-charcoal"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
