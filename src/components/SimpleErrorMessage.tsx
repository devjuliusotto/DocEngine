import { AlertTriangle } from "lucide-react";

export function SimpleErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-md border-2 border-berry bg-rose-50 p-4 text-lg font-bold text-berry"
    >
      <AlertTriangle aria-hidden="true" className="mt-1 shrink-0" size={28} />
      <p>{message}</p>
    </div>
  );
}
