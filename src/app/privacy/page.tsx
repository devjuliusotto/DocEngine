import { InfoPage } from "@/components/InfoPage";
import { EditorialCard } from "@/components/EditorialCard";

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacidade" lead="Seus arquivos não saem do seu dispositivo.">
      <EditorialCard className="border-pink">
        <p className="text-3xl font-extrabold leading-tight">
          O DocEngine foi feito para converter arquivos no navegador sempre que isso for possível.
        </p>
      </EditorialCard>
      <ul className="grid gap-3 sm:grid-cols-2">
        {[
          "Sem login.",
          "Sem cookies.",
          "Sem analytics.",
          "Sem histórico.",
          "Sem armazenamento de arquivos.",
          "Sem upload de arquivos por padrão."
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
