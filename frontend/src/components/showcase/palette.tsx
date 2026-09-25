import type { CSSProperties } from "react"

import { paints, showcase, showcaseCategories, type ShowcaseCategory } from "@/components/showcase/showcase"

export type PaletteFilter = "Tutti" | ShowcaseCategory

// Posizione delle macchie di colore sulla tavolozza (coordinate del viewBox 400×260)
const spots: Record<PaletteFilter, { x: number; y: number; shape: string }> = {
  Tutti: { x: 138, y: 72, shape: "58% 42% 50% 50% / 46% 58% 42% 54%" },
  Ricerca: { x: 214, y: 50, shape: "46% 54% 60% 40% / 55% 45% 55% 45%" },
  Commercio: { x: 292, y: 66, shape: "60% 40% 42% 58% / 50% 62% 38% 50%" },
  "Media e social": { x: 346, y: 128, shape: "42% 58% 55% 45% / 62% 40% 60% 38%" },
  Produttività: { x: 300, y: 196, shape: "55% 45% 40% 60% / 45% 55% 45% 55%" },
  Dati: { x: 222, y: 128, shape: "50% 50% 62% 38% / 40% 60% 40% 60%" },
}

type PaletteProps = {
  value: PaletteFilter
  onChange: (value: PaletteFilter) => void
}

// Tavolozza da pittore: ogni macchia di colore è un filtro
export function Palette({ value, onChange }: PaletteProps) {
  const options: PaletteFilter[] = ["Tutti", ...showcaseCategories]
  const count = value === "Tutti" ? showcase.length : showcase.filter((item) => item.category === value).length
  const legend = value === "Tutti" ? "Tutti i colori" : `${paints[value].name} · ${value}`

  return (
    <div className="flex w-full max-w-[400px] flex-col items-center gap-4 lg:w-[400px]">
      <div className="relative aspect-[400/260] w-full" role="group" aria-label="Filtra per colore">
        <svg viewBox="0 0 400 260" className="absolute inset-0 size-full drop-shadow-xl" aria-hidden="true">
          <path
            fillRule="evenodd"
            className="fill-[oklch(0.86_0.06_70)] stroke-[oklch(0.7_0.07_60)] dark:fill-[oklch(0.42_0.05_60)] dark:stroke-[oklch(0.32_0.04_60)]"
            strokeWidth="3"
            d="M200 12 C320 12 394 72 388 140 C383 202 328 250 250 244 C214 241 206 214 226 194 C246 174 236 150 206 152 C166 155 150 200 114 215 C60 238 12 200 14 140 C16 62 90 12 200 12 Z M95 128 a22 22 0 1 0 0.1 0 Z"
          />
        </svg>

        {options.map((option) => {
          const spot = spots[option]
          const active = value === option
          const style = {
            left: `${(spot.x / 400) * 100}%`,
            top: `${(spot.y / 260) * 100}%`,
            borderRadius: spot.shape,
            "--paint-hue": option === "Tutti" ? undefined : paints[option].hue,
          } as CSSProperties

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              aria-label={option === "Tutti" ? "Tutti i colori" : `${paints[option].name}: ${option}`}
              title={option === "Tutti" ? "Tutti i colori" : `${paints[option].name} · ${option}`}
              style={style}
              className={`paint absolute size-14 -translate-x-1/2 -translate-y-1/2 shadow-md ring-offset-4 ring-offset-[oklch(0.86_0.06_70)] transition-transform outline-none focus-visible:ring-4 focus-visible:ring-ring motion-safe:hover:scale-110 dark:ring-offset-[oklch(0.42_0.05_60)] ${
                active ? "scale-110 ring-4 ring-foreground/70" : ""
              } ${
                option === "Tutti"
                  ? "bg-[conic-gradient(from_0deg,oklch(0.62_0.19_258),oklch(0.62_0.19_345),oklch(0.62_0.19_32),oklch(0.62_0.19_78),oklch(0.62_0.19_165),oklch(0.62_0.19_258))]"
                  : "bg-(--paint)"
              }`}
            >
              {/* Riflesso lucido della pittura fresca */}
              <span className="absolute top-2 left-4 size-4 rounded-full bg-white/40 blur-[1px]" />
            </button>
          )
        })}
      </div>

      <p className="font-hand text-2xl" aria-live="polite">
        {legend} <span className="text-muted-foreground">({count})</span>
      </p>
    </div>
  )
}
