import { ShieldCheck } from "lucide-react";

export function PrivacyBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-md border-2 border-leaf bg-green-50 px-4 py-3 text-lg font-black text-leaf">
      <ShieldCheck aria-hidden="true" size={28} />
      <span>Seus arquivos não saem do seu dispositivo</span>
    </div>
  );
}
