import { InfoPage } from "@/components/InfoPage";

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacidade">
      <p>
        Seus arquivos não saem do seu dispositivo por padrão. O DocEngine foi feito para converter
        arquivos no navegador sempre que isso for possível.
      </p>
      <p>
        Não usamos login, banco de dados, cookies, localStorage, sessionStorage, analytics,
        telemetria ou ferramentas de rastreamento.
      </p>
      <p>
        O arquivo escolhido fica somente na memória do navegador durante a conversão. Ao fechar a
        página ou escolher outro arquivo, o app não mantém histórico.
      </p>
      <p>
        Algumas conversões podem ser limitadas pelo navegador ou pelo tamanho do arquivo. Quando
        isso acontecer, o app mostra um aviso claro antes de continuar.
      </p>
    </InfoPage>
  );
}
