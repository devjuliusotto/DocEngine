import Link from "next/link";
import { Coffee } from "lucide-react";
import { InfoPage } from "@/components/InfoPage";
import { EditorialCard } from "@/components/EditorialCard";

export default function AboutPage() {
  return (
    <InfoPage title="Sobre o DocEngine" lead="Um conversor open source, privado e gratuito.">
      <EditorialCard className="border-pink">
        <p className="text-3xl font-extrabold leading-tight">
          O DocEngine existe para converter arquivos com foco em privacidade, simplicidade e
          acessibilidade.
        </p>
      </EditorialCard>
      <div className="grid gap-5 md:grid-cols-2">
        <EditorialCard>
          <h2 className="headline text-2xl font-extrabold">Sem cadastro</h2>
          <p className="mt-3">
            A ideia é oferecer uma alternativa gratuita, sem login e sem propaganda.
          </p>
        </EditorialCard>
        <EditorialCard>
          <h2 className="headline text-2xl font-extrabold">Tecnologia local</h2>
          <p className="mt-3">
            O projeto usa APIs do navegador, Web Workers e WASM carregado apenas quando necessário.
          </p>
        </EditorialCard>
      </div>
      <EditorialCard className="border-pink">
        <h2 className="headline text-3xl font-extrabold">Doar um café</h2>
        <p className="mt-3 text-white/75">
          Se o DocEngine te ajudou, você pode apoiar o projeto pelo GitHub Sponsors.
        </p>
        <Link
          href="https://github.com/sponsors/devjuliusotto"
          className="mt-5 inline-flex min-h-14 items-center justify-center gap-2 rounded-md border-2 border-pink bg-pink px-5 py-3 text-xl font-extrabold text-white hover:bg-dark-pink focus-visible:shadow-focus"
        >
          <Coffee aria-hidden="true" size={24} />
          Doar um café
        </Link>
      </EditorialCard>
    </InfoPage>
  );
}
