import { InfoPage } from "@/components/InfoPage";
import { AccentBadge } from "@/components/AccentBadge";
import { EditorialCard } from "@/components/EditorialCard";

export default function AccessibilityPage() {
  return (
    <InfoPage title="Acessibilidade" lead="O app foi feito para ser fácil de usar.">
      <EditorialCard tone="lime" className="lg:col-span-2">
        <AccentBadge tone="black">Modo simples por padrão</AccentBadge>
        <p className="mt-4 text-3xl font-black leading-tight">
          Texto grande, botões grandes, alto contraste e um fluxo em três passos.
        </p>
      </EditorialCard>
      {[
        "Botões grandes.",
        "Fonte grande.",
        "Alto contraste.",
        "Navegação por teclado.",
        "Mensagens simples.",
        "Área grande para escolher arquivo."
      ].map((item) => (
        <EditorialCard key={item}>
          <p className="text-3xl font-black">{item}</p>
        </EditorialCard>
      ))}
      <EditorialCard className="lg:col-span-2">
        <p>
          A área de arquivo aceita arrastar e soltar, mas sempre existe o botão Escolher arquivo
          para quem prefere clicar. Todos os controles importantes têm nome claro e foco visível.
        </p>
      </EditorialCard>
    </InfoPage>
  );
}
