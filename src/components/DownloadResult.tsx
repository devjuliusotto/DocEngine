"use client";

import { Download, RotateCcw } from "lucide-react";

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
    <section className="rounded-md border-2 border-leaf bg-green-50 p-5">
      <h2 className="text-3xl font-black tracking-normal">3. Baixar</h2>
      <p className="mt-2 text-xl">Seu arquivo convertido está pronto.</p>
      {warning ? <p className="mt-3 text-lg font-bold text-berry">{warning}</p> : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={url}
          download={fileName}
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-md bg-leaf px-7 py-4 text-2xl font-black text-white hover:bg-green-800"
        >
          <Download aria-hidden="true" size={30} />
          Baixar arquivo convertido
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-16 items-center justify-center gap-3 rounded-md border-2 border-ink px-7 py-4 text-xl font-black text-ink hover:bg-white"
        >
          <RotateCcw aria-hidden="true" size={28} />
          Converter outro arquivo
        </button>
      </div>
    </section>
  );
}
