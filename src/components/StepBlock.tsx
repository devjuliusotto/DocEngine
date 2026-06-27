import type { ReactNode } from "react";

type StepState = "active" | "future" | "done";

export function StepBlock({
  number,
  title,
  children,
  state = "future",
  className = ""
}: {
  number: string;
  title: string;
  children: ReactNode;
  state?: StepState;
  className?: string;
}) {
  const stateClass =
    state === "active"
      ? "border-black bg-lime"
      : state === "done"
        ? "border-black bg-white"
        : "border-mid-gray bg-soft-gray";

  return (
    <section className={`rounded-sm border-4 p-5 sm:p-6 ${stateClass} ${className}`}>
      <div className="flex items-start gap-4">
        <span className="headline text-5xl font-black leading-none sm:text-6xl">{number}</span>
        <div className="min-w-0 flex-1">
          <h2 className="headline text-2xl font-black leading-tight sm:text-3xl">{title}</h2>
          <div className="mt-3 text-xl leading-relaxed">{children}</div>
        </div>
      </div>
    </section>
  );
}
