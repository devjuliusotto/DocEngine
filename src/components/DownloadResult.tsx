"use client";

import { Download, RotateCcw } from "lucide-react";
import { BigActionButton } from "@/components/BigActionButton";

export function DownloadResult({
  url,
  fileName,
  warning,
  onReset
}: {
  url: string;
  fileName: string;
  warning?: string;
  onReset: () => void;
}) {
  return (
    <section className="rounded-sm border-4 border-black bg-lime p-5">
      <div className="flex items-start gap-4">
        <span className="headline text-5xl font-black leading-none sm:text-6xl">03</span>
        <div>
          <h2 className="headline text-3xl font-black">Baixar</h2>
          <p className="mt-2 text-2xl font-bold">Seu arquivo convertido está pronto.</p>
        </div>
      </div>
      {warning ? <p className="mt-4 border-4 border-black bg-white p-3 text-xl font-black">{warning}</p> : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={url}
          download={fileName}
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-sm border-4 border-black bg-black px-7 py-4 text-xl font-black uppercase tracking-[0.08em] text-white hover:bg-dark-gray sm:text-2xl"
        >
          <Download aria-hidden="true" size={30} />
          Baixar arquivo convertido
        </a>
        <BigActionButton onClick={onReset} variant="light">
          <RotateCcw aria-hidden="true" size={28} />
          Converter outro arquivo
        </BigActionButton>
      </div>
    </section>
  );
}
