import type { Converter } from "./types";
import { ensureBrowserFileSize, MB, replaceExtension } from "./shared";

const imageInputs = ["jpg", "jpeg", "png", "webp"];
const imageOutputs = ["jpg", "png", "webp"];

function outputMime(format: string) {
  if (format === "jpg" || format === "jpeg") {
    return "image/jpeg";
  }
  if (format === "webp") {
    return "image/webp";
  }
  return "image/png";
}

function normalizeOutput(format?: string) {
  const value = (format ?? "png").toLowerCase();
  return value === "jpeg" ? "jpg" : value;
}

async function convertImage(
  file: File,
  options: Parameters<Converter["convert"]>[1],
  onProgress?: Parameters<Converter["convert"]>[2]
) {
  ensureBrowserFileSize(file, 25 * MB);
  onProgress?.({ value: 10, message: "Abrindo a imagem no navegador." });

  const bitmap = await createImageBitmap(file);
  const targetWidth = options.width && options.width > 0 ? options.width : bitmap.width;
  const targetHeight = options.height && options.height > 0 ? options.height : bitmap.height;
  const canvas = new OffscreenCanvas(targetWidth, targetHeight);
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("Não foi possível preparar a imagem neste navegador.");
  }

  context.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  bitmap.close();
  onProgress?.({ value: 65, message: "Criando o novo arquivo." });

  const outputFormat = normalizeOutput(options.outputFormat);
  const mimeType = outputMime(outputFormat);
  const quality =
    outputFormat === "png" ? undefined : Math.min(1, Math.max(0.2, options.quality ?? 0.86));
  const blob = await canvas.convertToBlob({ type: mimeType, quality });

  onProgress?.({ value: 100, message: "Conversão concluída." });
  return {
    blob,
    mimeType,
    fileName: replaceExtension(file.name, outputFormat),
    warning: "Metadados da imagem são removidos quando o navegador recria o arquivo em Canvas."
  };
}

export const imageConverter: Converter = {
  id: "image-basic",
  name: "Converter imagem",
  description: "Converte JPG, PNG e WEBP, com opção de redimensionar e comprimir.",
  category: "image",
  inputFormats: imageInputs,
  outputFormats: imageOutputs,
  runsInBrowser: true,
  maxRecommendedSize: 25 * MB,
  dependencies: ["Canvas", "Web APIs"],
  convert: convertImage
};
