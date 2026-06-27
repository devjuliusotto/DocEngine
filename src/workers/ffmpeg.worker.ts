/// <reference lib="webworker" />

type MediaPayload = {
  kind: "media";
  file: File;
  outputFormat: string;
  trimStart?: number;
  trimEnd?: number;
};

self.onmessage = async (event: MessageEvent<MediaPayload>) => {
  const { file, outputFormat, trimStart, trimEnd } = event.data;
  try {
    postProgress(5, "Carregando conversor de áudio e vídeo.");
    const [{ FFmpeg }, { fetchFile }] = await Promise.all([
      import("@ffmpeg/ffmpeg"),
      import("@ffmpeg/util")
    ]);
    const ffmpeg = new FFmpeg();
    ffmpeg.on("progress", ({ progress }) => {
      postProgress(Math.min(95, Math.round(progress * 100)), "Convertendo mídia no navegador.");
    });
    await ffmpeg.load();

    const inputName = `entrada.${extensionFromName(file.name)}`;
    const outputName = `saida.${outputFormat}`;
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    const args = buildArgs(inputName, outputName, outputFormat, trimStart, trimEnd);
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile(outputName);
    await ffmpeg.deleteFile(inputName);
    await ffmpeg.deleteFile(outputName);
    await ffmpeg.terminate();
    postProgress(100, "Arquivo pronto.");

    const bytes = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
    const copy = new Uint8Array(bytes);
    self.postMessage({ type: "done", result: new Blob([copy.buffer]) });
  } catch (error) {
    self.postMessage({
      type: "error",
      error:
        error instanceof Error
          ? error.message
          : "Esse arquivo é grande demais ou não é compatível com este navegador."
    });
  }
};

function buildArgs(
  inputName: string,
  outputName: string,
  outputFormat: string,
  trimStart?: number,
  trimEnd?: number
) {
  const args: string[] = [];
  if (trimStart && trimStart > 0) {
    args.push("-ss", String(trimStart));
  }
  args.push("-i", inputName);
  if (trimEnd && trimEnd > 0) {
    args.push("-to", String(trimEnd));
  }
  if (outputFormat === "mp3") {
    args.push("-vn", "-b:a", "192k");
  }
  if (outputFormat === "gif") {
    args.push("-vf", "fps=12,scale=480:-1:flags=lanczos");
  }
  if (outputFormat === "mp4") {
    args.push("-c:v", "libx264", "-c:a", "aac", "-movflags", "faststart");
  }
  args.push(outputName);
  return args;
}

function extensionFromName(name: string) {
  return name.split(".").pop()?.toLowerCase() || "bin";
}

function postProgress(progress: number, message: string) {
  self.postMessage({ type: "progress", progress, message });
}

export {};
