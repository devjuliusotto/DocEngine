import { ShieldCheck } from "lucide-react";

export function PrivacyBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-pink bg-pink px-4 py-2 text-base font-extrabold text-white">
      <ShieldCheck aria-hidden="true" size={22} />
      <span>Arquivo local</span>
    </div>
  );
}
