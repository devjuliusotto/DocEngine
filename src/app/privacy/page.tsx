import { InfoPage } from "@/components/InfoPage";
import { AccentBadge } from "@/components/AccentBadge";
import { EditorialCard } from "@/components/EditorialCard";

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacidade"
      lead="Seus arquivos não saem do seu dispositivo."
    >
      <EditorialCard tone="lime" className="lg:col-span-2">
        <AccentBadge tone="black">Regra principal</AccentBadge>
        <p className="mt-4 text-3xl font-black leading-tight">
          O DocEngine foi feito para converter arquivos no navegador sempre que isso for possível.
        </p>
      </EditorialCard>
      {[
        "Sem login.",
        "Sem cookies.",
        "Sem analytics.",
        "Sem histórico.",
        "Sem armazenamento de arquivos.",
        "Sem upload de arquivos por padrão."
      ].map((item) => (
        <EditorialCard key={item}>
          <p className="text-3xl font-black">{item}</p>
        </EditorialCard>
      ))}
      <EditorialCard className="lg:col-span-2">
        <p>
          O arquivo escolhido fica somente na memória do navegador durante a conversão. Ao fechar a
          página ou escolher outro arquivo, o app não mantém histórico.
        </p>
        <p className="mt-4">
          Algumas conversões podem ser limitadas pelo navegador ou pelo tamanho do arquivo. Quando
          isso acontecer, o app mostra um aviso claro antes de continuar.
        </p>
      </EditorialCard>
    </InfoPage>
  );
}
