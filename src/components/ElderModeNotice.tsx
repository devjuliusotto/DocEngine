import { Eye } from "lucide-react";

export function ElderModeNotice() {
  return (
    <aside className="rounded-md border-2 border-ocean bg-sky-50 p-5 text-ink">
      <div className="flex items-start gap-3">
        <Eye aria-hidden="true" className="mt-1 text-ocean" size={30} />
        <div>
          <h2 className="text-2xl font-black tracking-normal">Modo simples ligado</h2>
          <p className="mt-2 text-lg leading-relaxed">
            Texto grande, botões grandes e apenas três passos.
          </p>
        </div>
      </div>
    </aside>
  );
}
