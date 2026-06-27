"use client";

import { Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { FormatSelector } from "@/components/FormatSelector";
import { ProgressPanel } from "@/components/ProgressPanel";
import { DownloadResult } from "@/components/DownloadResult";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage";
import { AccentBadge } from "@/components/AccentBadge";
import { EditorialCard } from "@/components/EditorialCard";
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
    <section className="space-y-6">
      <FileDropzone onFile={chooseFile} state={file ? "done" : "active"} />

      <EditorialCard className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-2">
          <AccentBadge>Modo simples ligado</AccentBadge>
          <p className="text-2xl font-black">
            {file ? `Arquivo escolhido: ${file.name}` : "Nenhum arquivo escolhido ainda."}
          </p>
          <p className="text-xl">O modo padrão mostra só o necessário para converter.</p>
          {advancedMode && file ? (
            <dl className="grid gap-2 border-t-4 border-black pt-3 text-lg sm:grid-cols-3">
              <div>
                <dt className="font-black uppercase tracking-[0.08em]">Tamanho</dt>
                <dd>{humanFileSize(file.size)}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.08em]">Formato</dt>
                <dd>{formatFromFile(file).toUpperCase()}</dd>
              </div>
              <div>
                <dt className="font-black uppercase tracking-[0.08em]">Tipo MIME</dt>
                <dd>{file.type || "Não informado"}</dd>
              </div>
            </dl>
          ) : null}
        </div>
        <label className="inline-flex min-h-12 items-center gap-3 rounded-sm border-4 border-black bg-white px-4 py-3 text-lg font-black uppercase tracking-[0.08em]">
          <input
            type="checkbox"
            checked={advancedMode}
            onChange={(event) => setAdvancedMode(event.target.checked)}
            className="size-6 accent-black"
          />
          <Settings aria-hidden="true" size={24} />
          Modo avançado
        </label>
      </EditorialCard>

      {file && converters.length === 0 ? (
        <SimpleErrorMessage message="Ainda não temos uma conversão disponível para esse tipo de arquivo no modo atual." />
      ) : null}

      {file && converters.length > 0 ? (
        <EditorialCard tone="gray" className="space-y-6">
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
            converterName={selectedConverter?.name}
            converterDependencies={selectedConverter?.dependencies ?? []}
            maxRecommendedSize={selectedConverter?.maxRecommendedSize}
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
            className="min-h-16 w-full rounded-sm border-4 border-black bg-lime px-8 py-4 text-2xl font-black uppercase tracking-[0.08em] text-black hover:bg-dark-lime sm:w-auto"
          >
            Converter agora
          </button>
        </EditorialCard>
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
  converterName,
  converterDependencies,
  maxRecommendedSize,
  options,
  activeOutputFormat,
  onChange,
  showAdvanced
}: {
  converterOutputs: string[];
  converterName?: string;
  converterDependencies: string[];
  maxRecommendedSize?: number;
  options: ConverterOptions;
  activeOutputFormat?: string;
  onChange: (options: ConverterOptions) => void;
  showAdvanced: boolean;
}) {
  if (!showAdvanced) {
    return null;
  }

  return (
    <div className="space-y-5 rounded-sm border-4 border-black bg-white p-4">
      <div className="grid gap-3 border-b-4 border-black pb-4 text-lg md:grid-cols-3">
        <div>
          <p className="font-black uppercase tracking-[0.08em]">Conversor usado</p>
          <p>{converterName ?? "Conversor local"}</p>
        </div>
        <div>
          <p className="font-black uppercase tracking-[0.08em]">Engine local</p>
          <p>{converterDependencies.join(", ")}</p>
        </div>
        <div>
          <p className="font-black uppercase tracking-[0.08em]">Limite recomendado</p>
          <p>{maxRecommendedSize ? humanFileSize(maxRecommendedSize) : "Depende do navegador"}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
      <label className="space-y-2 font-bold">
        <span>Formato de saída</span>
        <select
          value={activeOutputFormat}
          onChange={(event) => onChange({ ...options, outputFormat: event.target.value })}
          className="min-h-12 w-full rounded-sm border-4 border-black bg-white px-3"
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
          className="w-full accent-black"
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
          className="min-h-12 w-full rounded-sm border-4 border-black px-3"
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
          className="min-h-12 w-full rounded-sm border-4 border-black px-3"
        />
      </label>
      <label className="space-y-2 font-bold">
        <span>Páginas do PDF</span>
        <input
          type="text"
          placeholder="Exemplo: 1,3,5-7"
          value={options.pages ?? ""}
          onChange={(event) => onChange({ ...options, pages: event.target.value })}
          className="min-h-12 w-full rounded-sm border-4 border-black px-3"
        />
      </label>
      <label className="space-y-2 font-bold">
        <span>Idioma do OCR</span>
        <select
          value={options.ocrLanguage}
          onChange={(event) =>
            onChange({ ...options, ocrLanguage: event.target.value as ConverterOptions["ocrLanguage"] })
          }
          className="min-h-12 w-full rounded-sm border-4 border-black bg-white px-3"
        >
          <option value="por">Português</option>
          <option value="deu">Alemão</option>
          <option value="eng">Inglês</option>
        </select>
      </label>
      </div>
    </div>
  );
}
