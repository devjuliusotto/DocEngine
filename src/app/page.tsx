import { ConversionWizard } from "@/components/ConversionWizard";
import { ElderModeNotice } from "@/components/ElderModeNotice";
import { PrivacyBadge } from "@/components/PrivacyBadge";
import { BigActionButton } from "@/components/BigActionButton";

export default function HomePage() {
  return (
    <div>
      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_22rem] lg:items-end lg:py-20">
          <div className="space-y-7">
            <PrivacyBadge />
            <h1 className="headline max-w-5xl text-5xl font-black leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Converter arquivos
              <br />
              com privacidade
            </h1>
            <p className="max-w-3xl text-2xl leading-relaxed text-white sm:text-3xl">
              Simples, gratuito e sem enviar seus arquivos para servidor.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#converter"
                className="inline-flex min-h-16 items-center justify-center rounded-sm border-4 border-black bg-lime px-7 py-4 text-xl font-black uppercase tracking-[0.08em] text-black hover:bg-dark-lime focus-visible:shadow-focus sm:text-2xl"
              >
                Escolher arquivo
              </a>
              <BigActionButton href="/formats" variant="secondary">
                Ver formatos
              </BigActionButton>
            </div>
          </div>
          <ElderModeNotice />
        </div>
      </section>
      <section id="converter" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <ConversionWizard />
      </section>
    </div>
  );
}
