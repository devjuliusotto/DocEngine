export const MB = 1024 * 1024;

export function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

export function replaceExtension(fileName: string, extension: string) {
  const cleanExtension = extension.replace(/^\./, "");
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  return `${baseName || "arquivo-convertido"}.${cleanExtension}`;
}

export function formatFromFile(file: File) {
  const extension = getExtension(file.name);
  if (extension) {
    return extension;
  }
  const subtype = file.type.split("/")[1];
  return subtype?.toLowerCase() ?? "";
}

export function humanFileSize(bytes: number) {
  if (bytes < MB) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${Math.round(bytes / MB)} MB`;
}

export function ensureBrowserFileSize(file: File, maxSize: number) {
  if (file.size > maxSize) {
    throw new Error(
      `Esse arquivo é grande demais para converter no navegador. Tente um arquivo menor que ${humanFileSize(maxSize)}.`
    );
  }
}
