import { Eye } from "lucide-react";

export function ElderModeNotice() {
  return (
    <aside className="inline-flex items-center gap-2 rounded-full border border-mid-gray bg-soft-gray px-4 py-2 text-black">
      <div className="flex items-center gap-2">
        <Eye aria-hidden="true" size={22} />
        <div>
          <h2 className="text-base font-extrabold">Modo simples</h2>
        </div>
      </div>
    </aside>
  );
}
