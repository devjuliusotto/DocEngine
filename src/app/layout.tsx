import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <header className="border-b-2 border-ink/10 bg-paper/95">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="text-3xl font-black tracking-normal text-ink">
              DocEngine
            </Link>
            <nav aria-label="Navegação principal">
              <ul className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-12 items-center rounded-md border-2 border-transparent px-4 py-2 text-lg font-bold text-ink hover:border-ocean hover:bg-sky-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <main id="conteudo" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
          {children}
        </main>
        <footer className="border-t-2 border-ink/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-lg text-ink sm:px-6">
            <p>
              DocEngine não usa login, cookies, histórico, analytics ou armazenamento de arquivos.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
