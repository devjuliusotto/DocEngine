import type { Converter } from "./types";
import { ensureBrowserFileSize, MB, replaceExtension } from "./shared";

function parsePageList(input: string | undefined, total: number) {
  if (!input?.trim()) {
    return Array.from({ length: total }, (_, index) => index);
  }

  const pages = new Set<number>();
  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [startRaw, endRaw] = trimmed.split("-");
    const start = Number(startRaw);
    const end = Number(endRaw ?? startRaw);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end > total) {
      throw new Error("Informe páginas válidas, por exemplo: 1,3,5-7.");
    }
    for (let page = start; page <= end; page += 1) {
      pages.add(page - 1);
    }
  }
  return [...pages].sort((a, b) => a - b);
}

export const pdfExtractConverter: Converter = {
  id: "pdf-extract",
  name: "Extrair páginas de PDF",
  description: "Cria um novo PDF com páginas escolhidas.",
  category: "pdf",
  inputFormats: ["pdf"],
  outputFormats: ["pdf"],
  runsInBrowser: true,
  maxRecommendedSize: 40 * MB,
  dependencies: ["pdf-lib"],
  advanced: true,
  async convert(file, options, onProgress) {
    ensureBrowserFileSize(file, 40 * MB);
    onProgress?.({ value: 15, message: "Lendo o PDF no navegador." });
    const { PDFDocument } = await import("pdf-lib");
    const original = await PDFDocument.load(await file.arrayBuffer());
    const output = await PDFDocument.create();
    const selectedPages = parsePageList(options.pages, original.getPageCount());
    const copiedPages = await output.copyPages(original, selectedPages);
    copiedPages.forEach((page) => output.addPage(page));
    onProgress?.({ value: 75, message: "Criando o PDF final." });
    const bytes = await output.save({ useObjectStreams: true });
    onProgress?.({ value: 100, message: "PDF pronto." });
    return {
      blob: pdfBytesToBlob(bytes),
      fileName: replaceExtension(file.name, "pdf"),
      mimeType: "application/pdf"
    };
  }
};

export const imagesToPdfConverter: Converter = {
  id: "images-to-pdf",
  name: "Imagem para PDF",
  description: "Coloca uma imagem em uma página PDF.",
  category: "pdf",
  inputFormats: ["jpg", "jpeg", "png", "webp"],
  outputFormats: ["pdf"],
  runsInBrowser: true,
  maxRecommendedSize: 25 * MB,
  dependencies: ["pdf-lib", "Canvas"],
  async convert(file, _options, onProgress) {
    ensureBrowserFileSize(file, 25 * MB);
    onProgress?.({ value: 15, message: "Lendo a imagem." });
    const { PDFDocument } = await import("pdf-lib");
    const pdf = await PDFDocument.create();
    const imageBytes = await file.arrayBuffer();
    const embedded =
      file.type === "image/png"
        ? await pdf.embedPng(imageBytes)
        : await pdf.embedJpg(await normalizeToJpeg(file));
    const page = pdf.addPage([embedded.width, embedded.height]);
    page.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
    onProgress?.({ value: 80, message: "Criando o PDF." });
    const bytes = await pdf.save();
    onProgress?.({ value: 100, message: "PDF pronto." });
    return {
      blob: pdfBytesToBlob(bytes),
      fileName: replaceExtension(file.name, "pdf"),
      mimeType: "application/pdf"
    };
  }
};

async function normalizeToJpeg(file: File) {
  if (file.type === "image/jpeg") {
    return file.arrayBuffer();
  }
  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Não foi possível preparar a imagem para PDF.");
  }
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, bitmap.width, bitmap.height);
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  return canvas.convertToBlob({ type: "image/jpeg", quality: 0.9 }).then((blob) => blob.arrayBuffer());
}

function pdfBytesToBlob(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes);
  return new Blob([copy.buffer], { type: "application/pdf" });
}
