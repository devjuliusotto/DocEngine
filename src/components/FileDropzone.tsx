"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

export function FileDropzone({ onFile }: { onFile: (file: File) => void }) {
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
      className={`rounded-md border-4 border-dashed p-8 text-center transition ${
        isDragging ? "border-ocean bg-sky-100" : "border-ink/25 bg-white"
      }`}
    >
      <Upload aria-hidden="true" className="mx-auto text-ocean" size={58} />
      <h2 className="mt-4 text-3xl font-black tracking-normal">1. Escolher arquivo</h2>
      <p className="mx-auto mt-3 max-w-2xl text-xl leading-relaxed">
        Arraste o arquivo para esta área ou use o botão abaixo.
      </p>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        aria-label="Escolher arquivo para converter"
        onChange={onInputChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-6 min-h-16 rounded-md bg-ocean px-8 py-4 text-2xl font-black text-white hover:bg-sky-800"
      >
        Escolher arquivo
      </button>
    </div>
  );
}
