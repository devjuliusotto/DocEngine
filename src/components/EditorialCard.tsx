import type { ReactNode } from "react";

export function EditorialCard({
  children,
  className = "",
  tone = "white"
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "gray" | "lime" | "black";
}) {
  const tones = {
    white: "bg-black text-white",
    gray: "bg-black text-white",
    lime: "bg-pink text-white",
    black: "bg-black text-white"
  };

  return (
    <section className={`rounded-lg border border-white/15 p-5 sm:p-7 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
