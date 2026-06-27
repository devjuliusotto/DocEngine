import type { ReactNode } from "react";

export function InfoPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="max-w-4xl space-y-6 rounded-md border-2 border-ink/15 bg-white p-6 text-xl leading-relaxed shadow-sm sm:p-8">
      <h1 className="text-4xl font-black tracking-normal text-ink sm:text-5xl">{title}</h1>
      <div className="space-y-5">{children}</div>
    </article>
  );
}
