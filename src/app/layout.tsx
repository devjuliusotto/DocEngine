import type { Metadata } from "next";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { ReactNode } from "react";
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
  { href: "/formats", label: "Formatos" },
  { href: "/privacy", label: "Privacidade" },
  { href: "/accessibility", label: "Acessibilidade" },
  { href: "/about", label: "Sobre mim" },
  { href: "https://github.com/devjuliusotto/DocEngine", label: "GitHub" }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={robotoCondensed.variable}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-pink focus:px-4 focus:py-3 focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <header className="border-b border-white/10 bg-black text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="inline-flex min-h-12 flex-col justify-center text-white">
              <span className="headline text-3xl font-extrabold uppercase leading-none">
                DocEngine
              </span>
              <span className="text-sm font-semibold text-white/70">Conversor privado</span>
            </Link>
            <nav aria-label="Navegação principal">
              <ul className="flex flex-wrap gap-1 sm:gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-base font-bold text-white/85 hover:bg-white/10 hover:text-white focus-visible:shadow-focus sm:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main id="conteudo">{children}</main>
        <footer className="bg-black text-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <span className="inline-flex rounded-full border border-white/30 px-3 py-1.5 text-sm font-extrabold uppercase tracking-[0.04em]">
                Open source
              </span>
              <p className="text-xl font-bold">DocEngine</p>
              <p className="text-lg text-white/80">
                Sem login, cookies, histórico, analytics ou armazenamento de arquivos.
              </p>
            </div>
            <nav aria-label="Links do rodapé">
              <ul className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="font-bold text-white underline decoration-pink decoration-2 underline-offset-4"
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
