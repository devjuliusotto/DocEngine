import { describe, expect, it } from "vitest";
import { converterRegistry, getConverterById, getConvertersForFile } from "./registry";

function makeFile(name: string, type: string) {
  return new File(["conteudo"], name, { type });
}

describe("converterRegistry", () => {
  it("declares browser-safe metadata for every converter", () => {
    expect(converterRegistry.length).toBeGreaterThan(0);
    for (const converter of converterRegistry) {
      expect(converter.id).toBeTruthy();
      expect(converter.inputFormats.length).toBeGreaterThan(0);
      expect(converter.outputFormats.length).toBeGreaterThan(0);
      expect(converter.maxRecommendedSize).toBeGreaterThan(0);
      expect(converter.dependencies.length).toBeGreaterThan(0);
    }
  });

  it("finds simple image conversions by uploaded file", () => {
    const converters = getConvertersForFile(makeFile("foto.png", "image/png"));
    expect(converters.some((converter) => converter.id === "image-basic")).toBe(true);
  });

  it("hides advanced converters by default", () => {
    const converters = getConvertersForFile(makeFile("arquivo.pdf", "application/pdf"));
    expect(converters.every((converter) => !converter.advanced)).toBe(true);
  });

  it("returns a converter by id", () => {
    expect(getConverterById("image-basic")?.name).toBe("Converter imagem");
  });
});
