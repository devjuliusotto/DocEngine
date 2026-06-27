import { AccentBadge } from "@/components/AccentBadge";
import { EditorialCard } from "@/components/EditorialCard";
import { SectionTitle } from "@/components/SectionTitle";
import { converterRegistry } from "@/lib/converters/registry";
import type { ConverterCategory } from "@/lib/converters/types";

const categories: Array<{
  id: ConverterCategory;
  title: string;
  tone: "lime" | "mint" | "purple" | "rose" | "orange";
}> = [
  { id: "image", title: "Imagens", tone: "lime" },
  { id: "pdf", title: "PDF", tone: "mint" },
  { id: "ocr", title: "OCR", tone: "purple" },
  { id: "media", title: "Áudio/Vídeo", tone: "orange" },
  { id: "document", title: "Documentos", tone: "rose" }
];

export default function FormatsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:py-14">
      <SectionTitle title="Formatos suportados">
        <p>
          Conversões disponíveis nesta versão. A interface mostra automaticamente o que é possível
          depois que você escolhe um arquivo.
        </p>
      </SectionTitle>

      <div className="grid gap-5 lg:grid-cols-2">
        {categories.map((category) => {
          const converters = converterRegistry.filter((converter) => converter.category === category.id);
          return (
            <EditorialCard key={category.id} className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-black pb-4">
                <h2 className="headline text-3xl font-black">{category.title}</h2>
                <AccentBadge tone={category.tone}>{converters.length} opções</AccentBadge>
              </div>
              <div className="space-y-4">
                {converters.map((converter) => (
                  <article key={converter.id} className="border-b-4 border-black pb-4 last:border-b-0 last:pb-0">
                    <h3 className="text-2xl font-black">{converter.name}</h3>
                    <p className="mt-2 text-xl">{converter.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[...converter.inputFormats, ...converter.outputFormats].map((format) => (
                        <span
                          key={`${converter.id}-${format}`}
                          className="rounded-sm border-2 border-black bg-soft-gray px-2 py-1 text-base font-black uppercase tracking-[0.08em]"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-lg font-bold">
                      Limite recomendado:{" "}
                      {Math.round(converter.maxRecommendedSize / 1024 / 1024)} MB.{" "}
                      {converter.runsInBrowser
                        ? "Roda no navegador."
                        : "Não disponível na versão privada da Vercel."}
                    </p>
                  </article>
                ))}
              </div>
            </EditorialCard>
          );
        })}
      </div>
    </div>
  );
}
