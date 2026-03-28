import type { Flower } from "../data/flowers"

type FlowerPickerProps = {
  flowers: Flower[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function FlowerPicker({ flowers, selectedId, onSelect }: FlowerPickerProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 block text-sm font-medium text-dream-700">꽃을 골라주세요</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {flowers.map((f) => {
          const selected = selectedId === f.id
          return (
            <label
              key={f.id}
              className={`group relative flex cursor-pointer flex-col rounded-2xl border-2 bg-white/80 p-4 shadow-soft transition focus-within:ring-2 focus-within:ring-dream-400 ${
                selected
                  ? "border-dream-500 ring-2 ring-dream-300/60"
                  : "border-transparent hover:border-dream-200"
              }`}
            >
              <input
                type="radio"
                name="flower"
                value={f.id}
                checked={selected}
                onChange={() => onSelect(f.id)}
                className="sr-only"
              />
              <span className="text-base font-semibold text-dream-900">{f.name}</span>
              <span className="mt-1 text-xs text-dream-600">{f.label}</span>
              <span
                className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${f.gradientFrom} ${f.gradientTo} opacity-0 transition group-hover:opacity-40 ${selected ? "opacity-50" : ""}`}
                aria-hidden
              />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
