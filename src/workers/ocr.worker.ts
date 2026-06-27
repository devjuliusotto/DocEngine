/// <reference lib="webworker" />

type OcrPayload = {
  kind: "ocr";
  file: File;
  language: "por" | "deu" | "eng";
};

self.onmessage = async (event: MessageEvent<OcrPayload>) => {
  const { file, language } = event.data;
  try {
    postProgress(5, "Carregando OCR local.");
    if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
      throw new Error(
        "OCR de PDF escaneado ainda é limitado nesta versão. Converta a página em imagem e tente novamente."
      );
    }

    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker(language, 1, {
      logger: (message) => {
        if (message.status) {
          postProgress(Math.round((message.progress ?? 0) * 90) + 5, `OCR: ${message.status}`);
        }
      }
    });
    const result = await worker.recognize(file);
    await worker.terminate();
    postProgress(100, "Texto pronto.");
    self.postMessage({ type: "done", result: result.data.text });
  } catch (error) {
    self.postMessage({
      type: "error",
      error: error instanceof Error ? error.message : "Não foi possível fazer OCR desse arquivo."
    });
  }
};

function postProgress(progress: number, message: string) {
  self.postMessage({ type: "progress", progress, message });
}

export {};
