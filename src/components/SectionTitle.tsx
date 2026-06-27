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
    <div className={`section-rule space-y-4 ${invert ? "text-white" : "text-black"}`}>
      {eyebrow ? (
        <p className="headline text-base font-black text-lime sm:text-lg">{eyebrow}</p>
      ) : null}
      <h1 className="headline max-w-5xl text-4xl font-black leading-[0.98] sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      {children ? <div className="max-w-3xl text-xl leading-relaxed sm:text-2xl">{children}</div> : null}
    </div>
  );
}
