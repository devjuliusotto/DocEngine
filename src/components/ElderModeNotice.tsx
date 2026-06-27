import { Eye } from "lucide-react";

export function ElderModeNotice() {
  return (
    <aside className="rounded-sm border-4 border-white bg-black p-5 text-white">
      <div className="flex items-start gap-3">
        <Eye aria-hidden="true" className="mt-1 text-lime" size={34} />
        <div>
          <h2 className="headline text-2xl font-black">Modo simples ligado</h2>
          <p className="mt-2 text-xl leading-relaxed text-white/90">
            Texto grande, botões grandes e apenas três passos.
          </p>
        </div>
      </div>
    </aside>
  );
}
