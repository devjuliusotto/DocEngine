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
    <section className="rounded-lg border-2 border-pink bg-pink p-5 text-white">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white text-xl font-extrabold text-pink">
          3
        </span>
        <div>
          <h2 className="headline text-3xl font-extrabold">Baixar resultado</h2>
          <p className="mt-2 text-2xl font-bold">Seu arquivo convertido está pronto.</p>
        </div>
      </div>
      {warning ? (
        <p className="mt-4 rounded-md border-2 border-black bg-white p-3 text-xl font-bold">
          {warning}
        </p>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={url}
          download={fileName}
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-md border-2 border-black bg-black px-7 py-4 text-xl font-extrabold text-white transition-colors hover:bg-dark-gray sm:text-2xl"
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
