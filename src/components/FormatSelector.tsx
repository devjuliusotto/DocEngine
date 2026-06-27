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
      <legend className="text-3xl font-black tracking-normal">2. Escolher formato</legend>
      <div className="grid gap-3 md:grid-cols-2">
        {converters.map((converter) => (
          <label
            key={converter.id}
            className={`cursor-pointer rounded-md border-2 p-4 ${
              selectedId === converter.id ? "border-ocean bg-sky-50" : "border-ink/15 bg-white"
            }`}
          >
            <input
              type="radio"
              name="converter"
              value={converter.id}
              checked={selectedId === converter.id}
              onChange={() => onSelect(converter.id)}
              className="mr-3 size-5 accent-ocean"
            />
            <span className="text-xl font-black">{converter.name}</span>
            <span className="mt-2 block text-lg leading-relaxed">{converter.description}</span>
            <span className="mt-2 block font-bold text-leaf">
              Saída: {converter.outputFormats.join(", ")}
            </span>
            {converter.warning ? (
              <span className="mt-2 block text-base font-bold text-berry">{converter.warning}</span>
            ) : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
