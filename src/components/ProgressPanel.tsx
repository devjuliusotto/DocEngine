"use client";

export function ProgressPanel({ value, message }: { value: number; message: string }) {
  return (
    <section aria-live="polite" className="rounded-sm border-4 border-black bg-white p-5">
      <h2 className="headline text-3xl font-black">Convertendo</h2>
      <p className="mt-2 text-xl">{message}</p>
      <div className="mt-4 h-8 overflow-hidden rounded-sm border-4 border-black bg-soft-gray">
        <div
          className="h-full bg-lime transition-all"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <p className="mt-2 text-xl font-black">{Math.round(value)}%</p>
    </section>
  );
}
