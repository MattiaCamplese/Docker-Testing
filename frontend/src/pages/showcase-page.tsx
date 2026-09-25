import "@fontsource-variable/caveat"
import { useSearchParams } from "react-router"

import { Palette, type PaletteFilter } from "@/components/showcase/palette"
import { ShowcaseCard } from "@/components/showcase/showcase-card"
import { showcase, showcaseCategories } from "@/components/showcase/showcase"

// Schizzi di colore decorativi sulla tela
const splatters = [
  { hue: 258, className: "top-24 -left-16 size-64 rotate-12" },
  { hue: 345, className: "top-96 -right-24 size-80 -rotate-6" },
  { hue: 78, className: "bottom-48 -left-24 size-72 rotate-45" },
  { hue: 165, className: "bottom-8 right-16 size-48 -rotate-12" },
]

function Splatter({ hue, className }: { hue: number; className: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute opacity-20 dark:opacity-25 ${className}`}
      aria-hidden="true"
    >
      <path
        fill={`oklch(0.65 0.19 ${hue})`}
        d="M100 20c22 0 30 22 48 26s36-6 38 16-18 30-16 48 22 34 6 48-34-2-50 8-24 32-46 28-18-30-34-40-38-8-40-30 22-26 24-44-10-36 8-46 36 4 50-6 16-8 12-8z"
      />
      <circle cx="176" cy="30" r="8" fill={`oklch(0.65 0.19 ${hue})`} />
      <circle cx="24" cy="176" r="6" fill={`oklch(0.65 0.19 ${hue})`} />
      <circle cx="186" cy="160" r="4" fill={`oklch(0.65 0.19 ${hue})`} />
    </svg>
  )
}

export function ShowcasePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get("tipo")
  const filter: PaletteFilter = showcaseCategories.find((c) => c.toLowerCase() === param) ?? "Tutti"
  const items = filter === "Tutti" ? showcase : showcase.filter((item) => item.category === filter)

  function selectFilter(value: PaletteFilter) {
    setSearchParams(value === "Tutti" ? {} : { tipo: value.toLowerCase() }, { replace: true })
  }

  return (
    <div className="canvas-paper min-h-full overflow-hidden">
      <title>Ispirazione · Docker Testing</title>
      {splatters.map((s) => (
        <Splatter key={s.hue} {...s} />
      ))}

      <div className="relative mx-auto flex max-w-[96rem] flex-col gap-16 px-4 py-12">
        <header className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="font-hand text-2xl text-muted-foreground">il moodboard delle interfacce</span>
            <h1 className="relative w-fit font-hand text-7xl leading-none sm:text-8xl">
              Ispirazione
              {/* Pennellata sotto il titolo */}
              <svg
                viewBox="0 0 320 24"
                preserveAspectRatio="none"
                className="absolute -bottom-4 left-0 h-6 w-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="brush" x1="0" x2="1">
                    <stop offset="0" stopColor="oklch(0.62 0.19 258)" />
                    <stop offset="0.5" stopColor="oklch(0.62 0.21 345)" />
                    <stop offset="1" stopColor="oklch(0.72 0.17 78)" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 16 C60 6 120 20 180 10 S290 14 316 8"
                  fill="none"
                  stroke="url(#brush)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <p className="pt-4 text-lg text-muted-foreground">
              I componenti più iconici delle grandi aziende, ricostruiti dal vivo e appesi alla tela. Per ognuno: dove
              lo trovi e perché funziona.
            </p>
            <p className="font-hand text-xl text-muted-foreground">
              Scegli un colore sulla tavolozza per filtrare → ogni esempio è una schermata a sé.
            </p>
          </div>

          <Palette value={filter} onChange={selectFilter} />
        </header>

        <div className="columns-1 gap-8 pt-8 md:columns-2 xl:columns-3">
          {items.map((item, i) => (
            <ShowcaseCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
