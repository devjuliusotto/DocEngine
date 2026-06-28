"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { BigActionButton } from "@/components/BigActionButton";

export function FileDropzone({
  onFile,
  state = "active",
  fileName,
  fileSize,
  compact = false
}: {
  onFile: (file: File) => void;
  state?: "active" | "done" | "future";
  fileName?: string;
  fileSize?: string;
  compact?: boolean;
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
      className={`rounded-lg border-2 border-dashed text-center transition-colors ${
        compact ? "p-4 sm:p-5" : "p-6 sm:p-9"
      } ${
        isDragging
          ? "border-pink bg-pink text-white"
          : state === "done"
            ? "border-pink bg-[#111111] text-white"
            : "border-white/25 bg-[#111111] text-white"
      }`}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        {!compact ? (
          <Upload
            aria-hidden="true"
            className={isDragging ? "text-white" : "text-pink"}
            size={56}
          />
        ) : null}
        <div className={compact ? "text-center" : "mt-5 text-center"}>
          <h2 className="headline text-3xl font-extrabold leading-tight sm:text-4xl">
            {fileName ? "Arquivo selecionado" : "Escolha seu arquivo"}
          </h2>
          {!compact ? (
            <>
              <p className="mt-3 text-2xl font-bold leading-relaxed">Arraste aqui</p>
              <p className={isDragging ? "text-xl text-white" : "text-xl text-white/75"}>
                ou clique no botão abaixo
              </p>
            </>
          ) : null}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        aria-label="Escolher arquivo para converter"
        onChange={onInputChange}
      />
      <div className={compact ? "mt-4" : "mt-7"}>
        <BigActionButton onClick={() => inputRef.current?.click()} variant="primary">
          {fileName ? "Trocar arquivo" : "Escolher arquivo"}
        </BigActionButton>
      </div>
      {fileName ? (
        <div className="mx-auto mt-4 max-w-2xl rounded-md border border-white/20 bg-black p-4 text-left">
          <p className="text-lg font-extrabold">Arquivo escolhido</p>
          <p className="mt-1 break-words text-xl">{fileName}</p>
          {fileSize ? <p className="mt-1 text-lg text-white/70">{fileSize}</p> : null}
        </div>
      ) : null}
      {!compact ? (
        <p className="mx-auto mt-5 max-w-2xl text-lg font-bold text-white/85">
          PDF, imagens, áudio, vídeo e documentos. Seu arquivo fica no seu dispositivo.
        </p>
      ) : null}
    </div>
  );
}
