"use client";

export function ProgressPanel({ value, message }: { value: number; message: string }) {
  return (
    <section aria-live="polite" className="rounded-md border-2 border-ink/15 bg-white p-5">
      <h2 className="text-3xl font-black tracking-normal">Convertendo</h2>
      <p className="mt-2 text-xl">{message}</p>
      <div className="mt-4 h-7 overflow-hidden rounded-md border-2 border-ink/20 bg-gray-100">
        <div
          className="h-full bg-leaf transition-all"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <p className="mt-2 text-lg font-bold">{Math.round(value)}%</p>
    </section>
  );
}
