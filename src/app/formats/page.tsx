import { converterRegistry } from "@/lib/converters/registry";

export default function FormatsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-black tracking-normal text-ink sm:text-5xl">
          Formatos suportados
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed">
          A lista abaixo mostra as conversões disponíveis nesta versão. Todas são desenhadas para
          rodar no navegador quando tecnicamente possível.
        </p>
      </div>
      <div className="overflow-x-auto rounded-md border-2 border-ink/15 bg-white">
        <table className="w-full min-w-[48rem] border-collapse text-left">
          <thead className="bg-sky-50">
            <tr>
              <th className="border-b-2 border-ink/15 p-4 text-lg">Conversão</th>
              <th className="border-b-2 border-ink/15 p-4 text-lg">Entrada</th>
              <th className="border-b-2 border-ink/15 p-4 text-lg">Saída</th>
              <th className="border-b-2 border-ink/15 p-4 text-lg">Tamanho recomendado</th>
              <th className="border-b-2 border-ink/15 p-4 text-lg">Privacidade</th>
            </tr>
          </thead>
          <tbody>
            {converterRegistry.map((converter) => (
              <tr key={converter.id} className="border-b border-ink/10 last:border-b-0">
                <td className="p-4 font-bold">{converter.name}</td>
                <td className="p-4">{converter.inputFormats.join(", ")}</td>
                <td className="p-4">{converter.outputFormats.join(", ")}</td>
                <td className="p-4">{Math.round(converter.maxRecommendedSize / 1024 / 1024)} MB</td>
                <td className="p-4">
                  {converter.runsInBrowser ? "Roda no navegador" : "Não disponível nesta versão"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
