import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-16 cursor-pointer items-center justify-center rounded-md border-2 px-7 py-4 text-xl font-extrabold transition-colors focus-visible:shadow-focus sm:text-2xl";

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
    primary: "border-pink bg-pink text-white hover:bg-dark-pink",
    secondary: "border-mid-gray bg-white text-black hover:border-black hover:bg-soft-gray",
    dark: "border-black bg-black text-white hover:bg-dark-gray",
    light: "border-mid-gray bg-white text-black hover:border-black hover:bg-soft-gray"
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
