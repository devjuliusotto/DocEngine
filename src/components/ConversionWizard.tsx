"use client";

import { Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { FormatSelector } from "@/components/FormatSelector";
import { ProgressPanel } from "@/components/ProgressPanel";
import { DownloadResult } from "@/components/DownloadResult";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage";
import { getConvertersForFile } from "@/lib/converters/registry";
import { formatFromFile, humanFileSize } from "@/lib/converters/shared";
import type { ConversionProgress, ConversionResult, ConverterOptions } from "@/lib/converters/types";

type ResultState = {
  url: string;
  fileName: string;
  warning?: string;
};

export function ConversionWizard() {
  const [file, setFile] = useState<File | null>(null);
  const [advancedMode, setAdvancedMode] = useState(false);
  const converters = useMemo(
    () => (file ? getConvertersForFile(file, advancedMode) : []),
    [advancedMode, file]
  );
  const [selectedConverterId, setSelectedConverterId] = useState("");
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<ConverterOptions>({
    outputFormat: "png",
    quality: 0.86,
    ocrLanguage: "por"
  });

  const selectedConverter =
    converters.find((converter) => converter.id === selectedConverterId) ?? converters[0];
  const activeSelectedId = selectedConverter?.id ?? "";
  const activeOutputFormat =
    selectedConverter?.outputFormats.includes(options.outputFormat ?? "")
      ? options.outputFormat
      : selectedConverter?.outputFormats[0];

  useEffect(() => {
    return () => {
      if (result?.url) {
        URL.revokeObjectURL(result.url);
      }
    };
  }, [result?.url]);

  function chooseFile(nextFile: File) {
    cleanupResult();
    setFile(nextFile);
    setError("");
    setProgress(null);
  }

  function cleanupResult() {
    if (result?.url) {
      URL.revokeObjectURL(result.url);
    }
    setResult(null);
  }

  function reset() {
    cleanupResult();
    setFile(null);
    setError("");
    setProgress(null);
    setSelectedConverterId("");
  }

  async function convert() {
    if (!file || !selectedConverter) {
      setError("Escolha um arquivo e um formato antes de converter.");
      return;
    }

    cleanupResult();
    setError("");
    setProgress({ value: 1, message: "Iniciando conversão." });

    try {
      if (file.size > selectedConverter.maxRecommendedSize) {
        throw new Error(
          `Esse arquivo é grande demais para converter no navegador. Tente um arquivo menor que ${humanFileSize(
            selectedConverter.maxRecommendedSize
          )}.`
        );
      }
      const conversionResult: ConversionResult = await selectedConverter.convert(
        file,
        { ...options, outputFormat: activeOutputFormat },
        setProgress
      );
      const url = URL.createObjectURL(conversionResult.blob);
      setResult({
        url,
        fileName: conversionResult.fileName,
        warning: conversionResult.warning
      });
      setProgress(null);
    } catch (conversionError) {
      setProgress(null);
      setError(
        conversionError instanceof Error
          ? conversionError.message
          : "Não foi possível converter esse arquivo. Tente outro formato."
      );
    }
  }

  return (
    <section className="space-y-6 rounded-md border-2 border-ink/15 bg-white p-5 shadow-sm sm:p-7">
      <FileDropzone onFile={chooseFile} />

      <div className="flex flex-col gap-3 rounded-md border-2 border-ink/10 bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-bold">
          {file
            ? `Arquivo escolhido: ${file.name} (${humanFileSize(file.size)}, ${formatFromFile(file).toUpperCase()})`
            : "Nenhum arquivo escolhido ainda."}
        </p>
        <label className="inline-flex min-h-12 items-center gap-3 text-lg font-black">
          <input
            type="checkbox"
            checked={advancedMode}
            onChange={(event) => setAdvancedMode(event.target.checked)}
            className="size-6 accent-ocean"
          />
          <Settings aria-hidden="true" size={24} />
          Modo avançado
        </label>
      </div>

      {file && converters.length === 0 ? (
        <SimpleErrorMessage message="Ainda não temos uma conversão disponível para esse tipo de arquivo no modo atual." />
      ) : null}

      {file && converters.length > 0 ? (
        <>
          <FormatSelector
            converters={converters}
            selectedId={activeSelectedId}
            onSelect={(id) => {
              setSelectedConverterId(id);
              const converter = converters.find((item) => item.id === id);
              setOptions((current) => ({
                ...current,
                outputFormat: converter?.outputFormats[0] ?? current.outputFormat
              }));
            }}
          />
          <AdvancedOptions
            converterOutputs={selectedConverter?.outputFormats ?? []}
            options={options}
            activeOutputFormat={activeOutputFormat}
            onChange={setOptions}
            showAdvanced={advancedMode}
          />
          {selectedConverter && file.size > selectedConverter.maxRecommendedSize ? (
            <SimpleErrorMessage
              message={`Esse arquivo passa do tamanho recomendado para o navegador: ${humanFileSize(
                selectedConverter.maxRecommendedSize
              )}.`}
            />
          ) : null}
          <button
            type="button"
            onClick={convert}
            className="min-h-16 w-full rounded-md bg-ocean px-8 py-4 text-2xl font-black text-white hover:bg-sky-800 sm:w-auto"
          >
            Converter agora
          </button>
        </>
      ) : null}

      {progress ? <ProgressPanel value={progress.value} message={progress.message} /> : null}
      {error ? <SimpleErrorMessage message={error} /> : null}
      {result ? (
        <DownloadResult
          url={result.url}
          fileName={result.fileName}
          warning={result.warning}
          onReset={reset}
        />
      ) : null}
    </section>
  );
}

function AdvancedOptions({
  converterOutputs,
  options,
  activeOutputFormat,
  onChange,
  showAdvanced
}: {
  converterOutputs: string[];
  options: ConverterOptions;
  activeOutputFormat?: string;
  onChange: (options: ConverterOptions) => void;
  showAdvanced: boolean;
}) {
  if (!showAdvanced) {
    return null;
  }

  return (
    <div className="grid gap-4 rounded-md border-2 border-ink/10 bg-sky-50 p-4 md:grid-cols-2">
      <label className="space-y-2 font-bold">
        <span>Formato de saída</span>
        <select
          value={activeOutputFormat}
          onChange={(event) => onChange({ ...options, outputFormat: event.target.value })}
          className="min-h-12 w-full rounded-md border-2 border-ink/30 bg-white px-3"
        >
          {converterOutputs.map((format) => (
            <option key={format} value={format}>
              {format.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2 font-bold">
        <span>Qualidade de imagem ou áudio</span>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.05"
          value={options.quality ?? 0.86}
          onChange={(event) => onChange({ ...options, quality: Number(event.target.value) })}
          className="w-full accent-ocean"
        />
      </label>
      <label className="space-y-2 font-bold">
        <span>Largura da imagem</span>
        <input
          type="number"
          min="1"
          value={options.width ?? ""}
          onChange={(event) =>
            onChange({ ...options, width: event.target.value ? Number(event.target.value) : undefined })
          }
          className="min-h-12 w-full rounded-md border-2 border-ink/30 px-3"
        />
      </label>
      <label className="space-y-2 font-bold">
        <span>Altura da imagem</span>
        <input
          type="number"
          min="1"
          value={options.height ?? ""}
          onChange={(event) =>
            onChange({ ...options, height: event.target.value ? Number(event.target.value) : undefined })
          }
          className="min-h-12 w-full rounded-md border-2 border-ink/30 px-3"
        />
      </label>
      <label className="space-y-2 font-bold">
        <span>Páginas do PDF</span>
        <input
          type="text"
          placeholder="Exemplo: 1,3,5-7"
          value={options.pages ?? ""}
          onChange={(event) => onChange({ ...options, pages: event.target.value })}
          className="min-h-12 w-full rounded-md border-2 border-ink/30 px-3"
        />
      </label>
      <label className="space-y-2 font-bold">
        <span>Idioma do OCR</span>
        <select
          value={options.ocrLanguage}
          onChange={(event) =>
            onChange({ ...options, ocrLanguage: event.target.value as ConverterOptions["ocrLanguage"] })
          }
          className="min-h-12 w-full rounded-md border-2 border-ink/30 bg-white px-3"
        >
          <option value="por">Português</option>
          <option value="deu">Alemão</option>
          <option value="eng">Inglês</option>
        </select>
      </label>
    </div>
  );
}
