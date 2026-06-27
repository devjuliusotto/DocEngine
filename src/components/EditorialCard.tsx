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
    white: "bg-white text-black",
    gray: "bg-soft-gray text-black",
    lime: "bg-lime text-black",
    black: "bg-black text-white"
  };

  return (
    <section className={`rounded-sm border-4 border-black p-5 sm:p-7 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
