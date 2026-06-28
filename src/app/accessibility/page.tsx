import { InfoPage } from "@/components/InfoPage";
import { EditorialCard } from "@/components/EditorialCard";

export default function AccessibilityPage() {
  return (
    <InfoPage title="Acessibilidade" lead="O app foi feito para ser fácil de usar.">
      <EditorialCard className="border-pink">
        <p className="text-3xl font-extrabold leading-tight">
          Texto grande, botões grandes, alto contraste e um fluxo em três passos.
        </p>
      </EditorialCard>
      <ul className="grid gap-3 sm:grid-cols-2">
        {[
          "Botões grandes.",
          "Fonte grande.",
          "Alto contraste.",
          "Navegação por teclado.",
          "Mensagens simples.",
          "Área grande para escolher arquivo."
        ].map((item) => (
          <li
            key={item}
            className="rounded-md border border-white/15 bg-white/5 px-4 py-4 font-bold text-white"
          >
            {item}
          </li>
        ))}
      </ul>
      <EditorialCard>
        <p>
          A área de arquivo aceita arrastar e soltar, mas sempre existe o botão Escolher arquivo
          para quem prefere clicar. Todos os controles importantes têm nome claro e foco visível.
        </p>
      </EditorialCard>
    </InfoPage>
  );
}
