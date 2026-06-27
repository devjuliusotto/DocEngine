import { InfoPage } from "@/components/InfoPage";
import { AccentBadge } from "@/components/AccentBadge";
import { EditorialCard } from "@/components/EditorialCard";

export default function AboutPage() {
  return (
    <InfoPage title="Sobre o DocEngine" lead="Um conversor open source, privado e gratuito.">
      <EditorialCard tone="lime" className="lg:col-span-2">
        <AccentBadge tone="black">Open source</AccentBadge>
        <p className="mt-4 text-3xl font-black leading-tight">
          O DocEngine existe para converter arquivos com foco em privacidade, simplicidade e
          acessibilidade.
        </p>
      </EditorialCard>
      <EditorialCard>
        <h2 className="headline text-2xl font-black">Sem cadastro</h2>
        <p className="mt-3">
          A ideia é oferecer uma alternativa gratuita, sem login e sem propaganda.
        </p>
      </EditorialCard>
      <EditorialCard>
        <h2 className="headline text-2xl font-black">Tecnologia local</h2>
        <p className="mt-3">
          O projeto usa APIs do navegador, Web Workers e WASM carregado apenas quando necessário.
        </p>
      </EditorialCard>
    </InfoPage>
  );
}
