import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, as = "h2", className = "" }: Props) {
  const Tag = as;
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <Tag
        className={
          as === "h1"
            ? "text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
            : "text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        }
      >
        {title}
      </Tag>
      {intro && <div className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</div>}
    </div>
  );
}
