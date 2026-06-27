import { ShieldCheck } from "lucide-react";

export function PrivacyBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-sm border-4 border-black bg-lime px-4 py-3 text-base font-black uppercase tracking-[0.1em] text-black sm:text-lg">
      <ShieldCheck aria-hidden="true" size={28} />
      <span>Seus arquivos não saem do seu dispositivo</span>
    </div>
  );
}
