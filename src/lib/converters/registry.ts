import { docxToHtmlConverter, docxToTextConverter, markdownToHtmlConverter, textToPdfConverter } from "./document";
import { mediaConverter, ocrConverter } from "./heavy";
import { imageConverter } from "./image";
import { imagesToPdfConverter, pdfExtractConverter } from "./pdf";
import { formatFromFile } from "./shared";
import type { Converter } from "./types";

export const converterRegistry: Converter[] = [
  imageConverter,
  imagesToPdfConverter,
  pdfExtractConverter,
  docxToTextConverter,
  docxToHtmlConverter,
  markdownToHtmlConverter,
  textToPdfConverter,
  ocrConverter,
  mediaConverter
];

export function getConvertersForFile(file: File, includeAdvanced = false) {
  const format = formatFromFile(file);
  return converterRegistry.filter(
    (converter) =>
      converter.inputFormats.includes(format) && (includeAdvanced || !converter.advanced)
  );
}

export function getConverterById(id: string) {
  return converterRegistry.find((converter) => converter.id === id);
}
