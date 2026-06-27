import { InfoPage } from "@/components/InfoPage";

export default function AccessibilityPage() {
  return (
    <InfoPage title="Acessibilidade">
      <p>
        O modo simples vem ativado por padrão, com texto grande, botões grandes, alto contraste e um
        fluxo em três passos: escolher arquivo, escolher formato e baixar.
      </p>
      <p>
        A interface pode ser usada com teclado. Os campos têm nomes claros, foco visível e mensagens
        de erro em linguagem simples.
      </p>
      <p>
        A área de arquivo aceita arrastar e soltar, mas sempre existe o botão Escolher arquivo para
        quem prefere clicar.
      </p>
    </InfoPage>
  );
}
