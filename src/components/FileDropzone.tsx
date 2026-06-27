"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { BigActionButton } from "@/components/BigActionButton";

export function FileDropzone({
  onFile,
  state = "active"
}: {
  onFile: (file: File) => void;
  state?: "active" | "done" | "future";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file?: File) {
    if (file) {
      onFile(file);
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`rounded-sm border-4 border-dashed p-7 text-center transition sm:p-10 ${
        isDragging
          ? "border-black bg-lime"
          : state === "done"
            ? "border-black bg-white"
            : "border-black bg-soft-gray"
      }`}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Upload aria-hidden="true" className="text-black" size={64} />
        <div className="mt-5 flex items-start gap-4 text-left">
          <span className="headline text-5xl font-black leading-none sm:text-6xl">01</span>
          <div>
            <h2 className="headline text-3xl font-black leading-tight sm:text-4xl">
              Escolher arquivo
            </h2>
            <p className="mt-3 text-2xl font-bold leading-relaxed">
              Arraste o arquivo aqui ou clique para escolher.
            </p>
            <p className="mt-2 text-xl">Nada será enviado para servidor.</p>
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        aria-label="Escolher arquivo para converter"
        onChange={onInputChange}
      />
      <div className="mt-7">
        <BigActionButton onClick={() => inputRef.current?.click()} variant="dark">
          Escolher arquivo
        </BigActionButton>
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-lg font-bold">
        Use teclado, mouse ou toque na tela. O arquivo fica somente neste navegador.
      </p>
    </div>
  );
}
