import { InfoPage } from "@/components/InfoPage";

export default function AboutPage() {
  return (
    <InfoPage title="Sobre o DocEngine">
      <p>
        O DocEngine é um projeto open source para conversão de arquivos com foco em privacidade,
        simplicidade e acessibilidade.
      </p>
      <p>
        A ideia é oferecer uma alternativa gratuita, sem cadastro e sem propaganda, especialmente
        útil para pessoas que querem uma interface direta e fácil de entender.
      </p>
      <p>
        O projeto usa tecnologias abertas do navegador, Web Workers e WASM carregado apenas quando
        necessário para tarefas mais pesadas.
      </p>
    </InfoPage>
  );
}
