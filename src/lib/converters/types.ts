export type ConverterCategory = "image" | "pdf" | "ocr" | "media" | "document";

export type ConverterOptions = {
  outputFormat?: string;
  width?: number;
  height?: number;
  quality?: number;
  pages?: string;
  ocrLanguage?: "por" | "deu" | "eng";
  trimStart?: number;
  trimEnd?: number;
};

export type ConversionProgress = {
  value: number;
  message: string;
};

export type ConversionResult = {
  blob: Blob;
  fileName: string;
  mimeType: string;
  warning?: string;
};

export type Converter = {
  id: string;
  name: string;
  description: string;
  category: ConverterCategory;
  inputFormats: string[];
  outputFormats: string[];
  runsInBrowser: boolean;
  maxRecommendedSize: number;
  dependencies: string[];
  advanced?: boolean;
  warning?: string;
  convert: (
    file: File,
    options: ConverterOptions,
    onProgress?: (progress: ConversionProgress) => void
  ) => Promise<ConversionResult>;
};

export type ConverterSummary = Omit<Converter, "convert">;
