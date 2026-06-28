import { ConversionWizard } from "@/components/ConversionWizard";
import { PrivacyBadge } from "@/components/PrivacyBadge";

const popularFormats = ["PDF", "JPG", "PNG", "WEBP", "MP4", "MP3", "DOCX", "TXT"];
const privacyItems = ["Local", "Sem login", "Sem cookies", "Sem histórico"];

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <section className="mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl gap-8 px-4 py-7 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:py-10">
        <div className="space-y-6 lg:sticky lg:top-8">
          <PrivacyBadge />
          <div className="space-y-3">
            <h1 className="headline text-5xl font-extrabold uppercase leading-none text-white sm:text-6xl lg:text-7xl">
              Converta arquivos.
            </h1>
            <p className="max-w-xl border-l-4 border-pink pl-4 text-xl leading-relaxed text-white/80">
              Sem upload por padrão. Sem login. Sem rastrear você.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {privacyItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-extrabold uppercase tracking-[0.04em] text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <section id="converter">
          <ConversionWizard />
        </section>
      </section>
      <section className="border-t border-white/10 bg-dark-gray">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="headline text-3xl font-extrabold">Formatos populares</h2>
            <div className="flex flex-wrap gap-2">
              {popularFormats.map((format) => (
                <span
                  key={format}
                  className="rounded-full border border-white/15 bg-black px-4 py-2 text-base font-extrabold text-white"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
