import { AlertTriangle } from "lucide-react";

export function SimpleErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-md border-2 border-black bg-rose p-4 text-xl font-bold text-black"
    >
      <AlertTriangle aria-hidden="true" className="mt-1 shrink-0" size={28} />
      <p>{message}</p>
    </div>
  );
}
