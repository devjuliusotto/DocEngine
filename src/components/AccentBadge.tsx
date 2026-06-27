import type { ReactNode } from "react";

type BadgeTone = "lime" | "mint" | "purple" | "rose" | "orange" | "black";

const tones: Record<BadgeTone, string> = {
  lime: "border-black bg-lime text-black",
  mint: "border-black bg-mint text-black",
  purple: "border-black bg-purple text-black",
  rose: "border-black bg-rose text-black",
  orange: "border-black bg-orange text-black",
  black: "border-white bg-black text-white"
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
      className={`inline-flex items-center border-2 px-3 py-2 text-base font-black uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
