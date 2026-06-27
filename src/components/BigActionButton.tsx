import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-16 items-center justify-center rounded-sm border-4 px-7 py-4 text-xl font-black uppercase tracking-[0.08em] transition hover:-translate-y-0.5 focus-visible:shadow-focus sm:text-2xl";

export function BigActionButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  download
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "dark" | "light";
  className?: string;
  type?: "button" | "submit";
  download?: string;
}) {
  const variants = {
    primary: "border-black bg-lime text-black hover:bg-dark-lime",
    secondary: "border-white bg-black text-white hover:bg-dark-gray",
    dark: "border-black bg-black text-white hover:bg-dark-gray",
    light: "border-black bg-white text-black hover:bg-soft-gray"
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} download={download} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
