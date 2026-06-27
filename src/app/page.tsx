import { ConversionWizard } from "@/components/ConversionWizard";
import { ElderModeNotice } from "@/components/ElderModeNotice";
import { PrivacyBadge } from "@/components/PrivacyBadge";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
        <div className="space-y-5">
          <PrivacyBadge />
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal text-ink sm:text-6xl">
            Converter arquivos com privacidade
          </h1>
          <p className="max-w-3xl text-2xl leading-relaxed text-ink">
            Simples, gratuito e sem enviar seus arquivos para servidor.
          </p>
        </div>
        <ElderModeNotice />
      </section>
      <ConversionWizard />
    </div>
  );
}
