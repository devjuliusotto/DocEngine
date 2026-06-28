"use client";

import { Settings } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AccentBadge } from "@/components/AccentBadge";
import { DownloadResult } from "@/components/DownloadResult";
import { FileDropzone } from "@/components/FileDropzone";
import { FormatSelector } from "@/components/FormatSelector";
import { ProgressPanel } from "@/components/ProgressPanel";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage";
import { StepBlock } from "@/components/StepBlock";
import { getConvertersForFile } from "@/lib/converters/registry";
import { humanFileSize } from "@/lib/converters/shared";
import type {
  ConversionProgress,
  ConversionResult,
  ConverterOptions
} from "@/lib/converters/types";

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
  const activeOutputFormat = selectedConverter?.outputFormats.includes(options.outputFormat ?? "")
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
      <div className="rounded-lg border border-white/20 bg-[#050505] p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="headline text-3xl font-extrabold text-white">Converter arquivo</h2>
            <p className="mt-1 text-lg text-white/65">Local no navegador.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <AccentBadge>Modo simples</AccentBadge>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-white/20 bg-[#111111] px-3 py-2 text-base font-bold text-white/85 hover:border-pink hover:text-white">
              <input
                type="checkbox"
                checked={advancedMode}
                onChange={(event) => setAdvancedMode(event.target.checked)}
                className="size-5 accent-black"
              />
              <Settings aria-hidden="true" size={20} />
              Avançado
            </label>
          </div>
        </div>
        {advancedMode ? (
          <p className="mb-4 rounded-md border border-white/20 bg-[#111111] px-4 py-3 text-lg text-white/85">
            Avançado libera qualidade, tamanho, páginas e OCR.
          </p>
        ) : null}

        <FileDropzone
          onFile={chooseFile}
          state={file ? "done" : "active"}
          fileName={file?.name}
          fileSize={file ? humanFileSize(file.size) : undefined}
          compact={Boolean(file)}
        />

        {file ? (
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="min-h-12 cursor-pointer rounded-md border border-white/20 bg-black px-4 py-2 text-lg font-bold text-white hover:border-pink focus-visible:shadow-focus"
            >
              Voltar
            </button>
          </div>
        ) : null}

        {file && converters.length === 0 ? (
          <div className="mt-5">
            <SimpleErrorMessage message="Ainda não temos uma conversão disponível para esse tipo de arquivo no modo atual." />
          </div>
        ) : null}

        {file && converters.length > 0 ? (
          <div className="mt-5 space-y-5">
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
              className="min-h-16 w-full cursor-pointer rounded-md border-2 border-pink bg-pink px-8 py-4 text-2xl font-extrabold text-white transition-colors hover:bg-dark-pink focus-visible:shadow-focus"
            >
              Converter agora
            </button>
          </div>
        ) : null}

        {progress ? (
          <div className="mt-5">
            <ProgressPanel value={progress.value} message={progress.message} />
          </div>
        ) : null}
        {error ? (
          <div className="mt-5">
            <SimpleErrorMessage message={error} />
          </div>
        ) : null}
        {result ? (
          <div className="mt-5">
            <DownloadResult
              url={result.url}
              fileName={result.fileName}
              warning={result.warning}
              onReset={reset}
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <StepBlock number="1" title="Arquivo" state={file ? "done" : "active"}>
          {file ? "Selecionado." : "Escolha no topo."}
        </StepBlock>
        <StepBlock
          number="2"
          title="Formato"
          state={file && converters.length > 0 && !result ? "active" : "future"}
        >
          {file ? "Disponível acima." : "Depois do arquivo."}
        </StepBlock>
        <StepBlock number="3" title="Download" state={result ? "active" : "future"}>
          {result ? "Pronto." : "Último passo."}
        </StepBlock>
      </div>
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
    <div className="space-y-5 rounded-md border border-white/20 bg-[#111111] p-4 text-white">
      <div className="grid gap-3 border-b border-white/20 pb-4 text-lg md:grid-cols-3">
        <div>
          <p className="font-extrabold">Conversor usado</p>
          <p>{converterName ?? "Conversor local"}</p>
        </div>
        <div>
          <p className="font-extrabold">Engine local</p>
          <p>{converterDependencies.join(", ")}</p>
        </div>
        <div>
          <p className="font-extrabold">Limite recomendado</p>
          <p>{maxRecommendedSize ? humanFileSize(maxRecommendedSize) : "Depende do navegador"}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 font-bold">
          <span>Formato de saída</span>
          <select
            value={activeOutputFormat}
            onChange={(event) => onChange({ ...options, outputFormat: event.target.value })}
            className="min-h-12 w-full rounded-md border-2 border-white/20 bg-black px-3 text-white"
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
              onChange({
                ...options,
                width: event.target.value ? Number(event.target.value) : undefined
              })
            }
            className="min-h-12 w-full rounded-md border-2 border-white/20 bg-black px-3 text-white"
          />
        </label>
        <label className="space-y-2 font-bold">
          <span>Altura da imagem</span>
          <input
            type="number"
            min="1"
            value={options.height ?? ""}
            onChange={(event) =>
              onChange({
                ...options,
                height: event.target.value ? Number(event.target.value) : undefined
              })
            }
            className="min-h-12 w-full rounded-md border-2 border-white/20 bg-black px-3 text-white"
          />
        </label>
        <label className="space-y-2 font-bold">
          <span>Páginas do PDF</span>
          <input
            type="text"
            placeholder="Exemplo: 1,3,5-7"
            value={options.pages ?? ""}
            onChange={(event) => onChange({ ...options, pages: event.target.value })}
            className="min-h-12 w-full rounded-md border-2 border-white/20 bg-black px-3 text-white"
          />
        </label>
        <label className="space-y-2 font-bold">
          <span>Idioma do OCR</span>
          <select
            value={options.ocrLanguage}
            onChange={(event) =>
              onChange({
                ...options,
                ocrLanguage: event.target.value as ConverterOptions["ocrLanguage"]
              })
            }
            className="min-h-12 w-full rounded-md border-2 border-white/20 bg-black px-3 text-white"
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
