import type { Metadata } from "next";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { ReactNode } from "react";
import { AccentBadge } from "@/components/AccentBadge";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
  fallback: ["Arial Narrow", "Arial", "sans-serif"]
});

export const metadata: Metadata = {
  title: "DocEngine",
  description: "Conversor de arquivos simples, gratuito e privado.",
  applicationName: "DocEngine"
};

const links = [
  { href: "/", label: "Converter" },
  { href: "/formats", label: "Formatos" },
  { href: "/privacy", label: "Privacidade" },
  { href: "/accessibility", label: "Acessibilidade" },
  { href: "/about", label: "Sobre" }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={robotoCondensed.variable}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-lime focus:px-4 focus:py-3 focus:text-black"
        >
          Ir para o conteúdo
        </a>
        <header className="border-b-4 border-black bg-black text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <Link
              href="/"
              className="headline inline-flex min-h-12 items-center text-3xl font-black text-white"
            >
              DOCENGINE
            </Link>
            <nav aria-label="Navegação principal">
              <ul className="flex flex-wrap gap-2 sm:gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-12 items-center rounded-sm border-2 border-white/30 px-4 py-2 text-lg font-black text-white hover:border-lime hover:bg-lime hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main id="conteudo">
          {children}
        </main>
        <footer className="border-t-4 border-black bg-black text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <AccentBadge>Open source</AccentBadge>
              <p className="text-xl">DocEngine é um conversor de arquivos privado e gratuito.</p>
              <p className="text-lg text-white/80">
                Sem login, cookies, histórico, analytics ou armazenamento de arquivos.
              </p>
            </div>
            <nav aria-label="Links do rodapé">
              <ul className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="font-black underline decoration-lime decoration-4 underline-offset-4"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
