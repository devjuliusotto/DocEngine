import type { ReactNode } from "react";
import { SectionTitle } from "@/components/SectionTitle";

export function InfoPage({
  title,
  lead,
  children
}: {
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:py-14">
      <SectionTitle title={title}>{lead ? <p>{lead}</p> : null}</SectionTitle>
      <div className="grid gap-5 text-xl leading-relaxed lg:grid-cols-2">{children}</div>
    </article>
  );
}
