import type { Converter } from "./types";
import { ensureBrowserFileSize, MB, replaceExtension } from "./shared";

export const docxToTextConverter: Converter = {
  id: "docx-text",
  name: "DOCX para texto",
  description: "Extrai texto simples de um arquivo DOCX.",
  category: "document",
  inputFormats: ["docx"],
  outputFormats: ["txt"],
  runsInBrowser: true,
  maxRecommendedSize: 15 * MB,
  dependencies: ["mammoth"],
  async convert(file, _options, onProgress) {
    ensureBrowserFileSize(file, 15 * MB);
    onProgress?.({ value: 20, message: "Lendo o documento." });
    const mammoth = await import("mammoth/mammoth.browser");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    onProgress?.({ value: 100, message: "Texto pronto." });
    return {
      blob: new Blob([result.value], { type: "text/plain;charset=utf-8" }),
      fileName: replaceExtension(file.name, "txt"),
      mimeType: "text/plain"
    };
  }
};

export const docxToHtmlConverter: Converter = {
  id: "docx-html",
  name: "DOCX para HTML simples",
  description: "Cria HTML simples a partir de um DOCX. Não promete layout perfeito.",
  category: "document",
  inputFormats: ["docx"],
  outputFormats: ["html"],
  runsInBrowser: true,
  maxRecommendedSize: 15 * MB,
  dependencies: ["mammoth", "DOMPurify"],
  advanced: true,
  warning: "DOCX para PDF perfeito não é garantido no navegador sem LibreOffice.",
  async convert(file, _options, onProgress) {
    ensureBrowserFileSize(file, 15 * MB);
    onProgress?.({ value: 20, message: "Convertendo o documento." });
    const [mammoth, DOMPurify] = await Promise.all([
      import("mammoth/mammoth.browser"),
      import("dompurify")
    ]);
    const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
    const cleanHtml = DOMPurify.default.sanitize(result.value);
    onProgress?.({ value: 100, message: "HTML pronto." });
    return {
      blob: new Blob([cleanHtml], { type: "text/html;charset=utf-8" }),
      fileName: replaceExtension(file.name, "html"),
      mimeType: "text/html",
      warning: "O HTML gerado é simples e pode não manter todo o visual original do Word."
    };
  }
};

export const markdownToHtmlConverter: Converter = {
  id: "markdown-html",
  name: "Markdown para HTML",
  description: "Converte Markdown em HTML simples e sanitizado.",
  category: "document",
  inputFormats: ["md", "markdown"],
  outputFormats: ["html"],
  runsInBrowser: true,
  maxRecommendedSize: 5 * MB,
  dependencies: ["marked", "DOMPurify"],
  async convert(file, _options, onProgress) {
    ensureBrowserFileSize(file, 5 * MB);
    onProgress?.({ value: 25, message: "Lendo o Markdown." });
    const [{ marked }, DOMPurify] = await Promise.all([import("marked"), import("dompurify")]);
    const html = await marked.parse(await file.text(), { async: true });
    const cleanHtml = DOMPurify.default.sanitize(html);
    onProgress?.({ value: 100, message: "HTML pronto." });
    return {
      blob: new Blob([cleanHtml], { type: "text/html;charset=utf-8" }),
      fileName: replaceExtension(file.name, "html"),
      mimeType: "text/html"
    };
  }
};

export const textToPdfConverter: Converter = {
  id: "text-pdf",
  name: "TXT ou Markdown para PDF",
  description: "Cria um PDF simples com texto.",
  category: "document",
  inputFormats: ["txt", "md", "markdown"],
  outputFormats: ["pdf"],
  runsInBrowser: true,
  maxRecommendedSize: 5 * MB,
  dependencies: ["jsPDF"],
  async convert(file, _options, onProgress) {
    ensureBrowserFileSize(file, 5 * MB);
    onProgress?.({ value: 20, message: "Preparando o texto." });
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const text = await file.text();
    const lines = pdf.splitTextToSize(text, 500);
    let y = 48;
    for (const line of lines) {
      if (y > 780) {
        pdf.addPage();
        y = 48;
      }
      pdf.text(line, 48, y);
      y += 18;
    }
    onProgress?.({ value: 100, message: "PDF pronto." });
    return {
      blob: pdf.output("blob"),
      fileName: replaceExtension(file.name, "pdf"),
      mimeType: "application/pdf"
    };
  }
};
