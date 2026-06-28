import type { ReactNode } from "react";

type BadgeTone = "lime" | "mint" | "purple" | "rose" | "orange" | "black";

const tones: Record<BadgeTone, string> = {
  lime: "border-pink bg-pink text-white",
  mint: "border-white/20 bg-black text-white",
  purple: "border-white/20 bg-black text-white",
  rose: "border-white/20 bg-black text-white",
  orange: "border-white/20 bg-black text-white",
  black: "border-white/30 bg-black text-white"
};

export function AccentBadge({
  children,
  tone = "lime",
  className = ""
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-extrabold uppercase tracking-[0.04em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
