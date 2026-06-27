import type { Converter } from "./types";
import { ensureBrowserFileSize, MB, replaceExtension } from "./shared";

export const ocrConverter: Converter = {
  id: "ocr-image",
  name: "OCR para TXT",
  description: "Lê texto em imagem ou PDF escaneado usando OCR local.",
  category: "ocr",
  inputFormats: ["jpg", "jpeg", "png", "webp", "pdf"],
  outputFormats: ["txt"],
  runsInBrowser: true,
  maxRecommendedSize: 20 * MB,
  dependencies: ["tesseract.js", "Web Worker"],
  advanced: true,
  warning: "OCR pode demorar bastante. O progresso aparece por etapa.",
  async convert(file, options, onProgress) {
    ensureBrowserFileSize(file, 20 * MB);
    const worker = new Worker(new URL("../../workers/ocr.worker.ts", import.meta.url), {
      type: "module"
    });
    return runWorker<string>(
      worker,
      {
        kind: "ocr",
        file,
        language: options.ocrLanguage ?? "por"
      },
      onProgress
    ).then((text) => ({
      blob: new Blob([text], { type: "text/plain;charset=utf-8" }),
      fileName: replaceExtension(file.name, "txt"),
      mimeType: "text/plain"
    }));
  }
};

export const mediaConverter: Converter = {
  id: "media-ffmpeg",
  name: "Áudio e vídeo",
  description: "Converte MP4, MOV e WAV quando o navegador e o aparelho suportam.",
  category: "media",
  inputFormats: ["mp4", "mov", "wav"],
  outputFormats: ["mp3", "gif", "mp4"],
  runsInBrowser: true,
  maxRecommendedSize: 80 * MB,
  dependencies: ["ffmpeg.wasm", "Web Worker"],
  advanced: true,
  warning: "Arquivos grandes de vídeo podem travar ou demorar no navegador.",
  async convert(file, options, onProgress) {
    ensureBrowserFileSize(file, 80 * MB);
    const outputFormat = options.outputFormat ?? "mp3";
    const worker = new Worker(new URL("../../workers/ffmpeg.worker.ts", import.meta.url), {
      type: "module"
    });
    const blob = await runWorker<Blob>(
      worker,
      {
        kind: "media",
        file,
        outputFormat,
        trimStart: options.trimStart,
        trimEnd: options.trimEnd
      },
      onProgress
    );
    const mimeType =
      outputFormat === "gif" ? "image/gif" : outputFormat === "mp4" ? "video/mp4" : "audio/mpeg";
    return {
      blob,
      fileName: replaceExtension(file.name, outputFormat),
      mimeType,
      warning: "Conversões de mídia dependem muito da memória disponível no aparelho."
    };
  }
};

function runWorker<T>(
  worker: Worker,
  payload: unknown,
  onProgress?: (progress: { value: number; message: string }) => void
) {
  return new Promise<T>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent) => {
      const data = event.data as { type: string; progress?: number; message?: string; result?: T; error?: string };
      if (data.type === "progress") {
        onProgress?.({ value: data.progress ?? 0, message: data.message ?? "Convertendo." });
      }
      if (data.type === "done") {
        worker.terminate();
        resolve(data.result as T);
      }
      if (data.type === "error") {
        worker.terminate();
        reject(new Error(data.error ?? "Não foi possível converter esse arquivo."));
      }
    };
    worker.onerror = (error) => {
      worker.terminate();
      reject(error);
    };
    worker.postMessage(payload);
  });
}
