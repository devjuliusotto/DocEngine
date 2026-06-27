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
      <legend className="flex items-start gap-4">
        <span className="headline text-5xl font-black leading-none sm:text-6xl">02</span>
        <span className="headline text-3xl font-black leading-tight sm:text-4xl">
          Escolher formato
        </span>
      </legend>
      <div className="grid gap-3 md:grid-cols-2">
        {converters.map((converter) => (
          <label
            key={converter.id}
            className={`cursor-pointer rounded-sm border-4 p-4 ${
              selectedId === converter.id ? "border-black bg-lime" : "border-black bg-white"
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
            <span className="headline text-2xl font-black">{converter.name}</span>
            <span className="mt-2 block text-xl leading-relaxed">{converter.description}</span>
            <span className="mt-3 inline-flex border-2 border-black bg-white px-2 py-1 text-lg font-black uppercase tracking-[0.08em] text-black">
              Saída: {converter.outputFormats.join(", ")}
            </span>
            {converter.warning ? (
              <span className="mt-3 block border-2 border-black bg-rose p-2 text-lg font-black">
                {converter.warning}
              </span>
            ) : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
