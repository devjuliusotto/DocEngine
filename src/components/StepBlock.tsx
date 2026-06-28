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
      ? "border-pink bg-pink text-white"
      : state === "done"
        ? "border-white/20 bg-[#111111] text-white"
        : "border-white/15 bg-black text-white/70";

  return (
    <section className={`rounded-lg border-2 p-5 sm:p-6 ${stateClass} ${className}`}>
      <div className="flex items-start gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-xl font-extrabold ${
            state === "active"
              ? "border-white bg-white text-pink"
              : "border-white/25 bg-black text-white"
          }`}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="headline text-2xl font-extrabold leading-tight">{title}</h2>
          <div className="mt-3 text-xl leading-relaxed">{children}</div>
        </div>
      </div>
    </section>
  );
}
