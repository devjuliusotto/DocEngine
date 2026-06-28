import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  children,
  invert = false
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  invert?: boolean;
}) {
  return (
    <div className={`section-rule space-y-4 ${invert ? "text-white" : "text-white"}`}>
      {eyebrow ? (
        <p className="text-base font-extrabold uppercase tracking-[0.04em] text-pink sm:text-lg">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="headline max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {children ? (
        <div className="max-w-3xl text-xl leading-relaxed text-white/70">{children}</div>
      ) : null}
    </div>
  );
}
