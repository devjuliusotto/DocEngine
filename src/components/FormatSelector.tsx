"use client";

import type { Converter } from "@/lib/converters/types";

export function FormatSelector({
  converters,
  selectedId,
  onSelect
}: {
  converters: Converter[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="headline text-3xl font-extrabold leading-tight text-white">
        Escolha o formato
      </legend>
      <div className="grid gap-3 md:grid-cols-2">
        {converters.map((converter) => (
          <label
            key={converter.id}
            className={`cursor-pointer rounded-md border-2 p-4 transition-colors ${
              selectedId === converter.id
                ? "border-pink bg-pink text-white"
                : "border-white/20 bg-[#111111] text-white hover:border-pink"
            }`}
          >
            <input
              type="radio"
              name="converter"
              value={converter.id}
              checked={selectedId === converter.id}
              onChange={() => onSelect(converter.id)}
              className="mr-3 size-6 accent-black"
            />
            <span className="text-2xl font-extrabold">{converter.name}</span>
            <span
              className={`mt-2 block text-lg leading-relaxed ${
                selectedId === converter.id ? "text-white/90" : "text-white/75"
              }`}
            >
              {converter.description}
            </span>
            <span className="mt-3 inline-flex rounded-full border border-white/20 bg-black px-3 py-1.5 text-base font-extrabold uppercase tracking-[0.04em] text-white">
              Saída: {converter.outputFormats.join(", ")}
            </span>
            {converter.warning ? (
              <span className="mt-3 block rounded-md border-2 border-black bg-rose p-2 text-lg font-bold">
                {converter.warning}
              </span>
            ) : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
