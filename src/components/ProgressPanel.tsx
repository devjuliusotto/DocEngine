"use client";

export function ProgressPanel({ value, message }: { value: number; message: string }) {
  return (
    <section
      aria-live="polite"
      className="rounded-lg border border-white/20 bg-[#111111] p-5 text-white"
    >
      <h2 className="headline text-3xl font-extrabold">Convertendo</h2>
      <p className="mt-2 text-xl">{message}</p>
      <div className="mt-4 h-6 overflow-hidden rounded-full border border-white/20 bg-black">
        <div
          className="h-full bg-pink transition-all"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <p className="mt-2 text-xl font-extrabold">{Math.round(value)}%</p>
    </section>
  );
}
