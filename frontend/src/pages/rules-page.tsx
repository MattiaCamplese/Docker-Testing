import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { SearchIcon } from "lucide-react"
import { useSearchParams } from "react-router"

import { PinCard } from "@/components/gallery/pin-card"
import { categories, categoryInfo, pins, type Category } from "@/components/gallery/pins"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Filter = "Tutti" | "Salvati" | Category

const SAVED_KEY = "gallery-saved-pins"

function loadSaved(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]")
  } catch {
    return []
  }
}

// Il filtro vive nell'URL (?categoria=azioni) così è condivisibile e linkabile dalla home
function parseFilter(param: string | null): Filter {
  if (param === "salvati") return "Salvati"
  return categories.find((c) => c.toLowerCase() === param) ?? "Tutti"
}

export function RulesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = parseFilter(searchParams.get("categoria"))
  const [query, setQuery] = useState("")
  const [saved, setSaved] = useState<string[]>(loadSaved)

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
    } catch {
      // Storage non disponibile (es. navigazione privata): i pin salvati restano solo in memoria
    }
  }, [saved])

  const visiblePins = useMemo(() => {
    const q = query.trim().toLowerCase()
    return pins.filter((pin) => {
      if (filter === "Salvati" && !saved.includes(pin.id)) return false
      if (filter !== "Tutti" && filter !== "Salvati" && pin.category !== filter) return false
      if (!q) return true
      return [pin.title, pin.description, ...pin.dos, ...pin.donts].some((text) => text.toLowerCase().includes(q))
    })
  }, [query, filter, saved])

  // Raggruppa i pin visibili per categoria, nell'ordine delle categorie
  const sections = categories
    .map((category) => ({ category, items: visiblePins.filter((pin) => pin.category === category) }))
    .filter((section) => section.items.length > 0)

  function selectFilter(f: Filter) {
    setSearchParams(f === "Tutti" ? {} : { categoria: f.toLowerCase() }, { replace: true })
  }

  function toggleSave(id: string) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const filters: Filter[] = ["Tutti", "Salvati", ...categories]

  return (
    <>
      <title>Regole UI/UX · Canone UI</title>

      {/* Barra di ricerca e filtri, fissata sotto la top app bar (h-16) */}
      <div className="sticky top-16 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-[96rem] px-4 pt-4">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca componenti e regole…"
              aria-label="Cerca componenti e regole"
              className="h-11 rounded-full border-0 bg-muted pl-12 dark:bg-muted"
            />
          </div>
        </div>
        {/* Chip di filtro (forma a pillola di Material 3): non sono pulsanti d'azione, quindi niente primario */}
        <nav className="mx-auto flex max-w-[96rem] gap-2 overflow-x-auto px-4 py-4" aria-label="Categorie">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "secondary" : "ghost"}
              onClick={() => selectFilter(f)}
              aria-pressed={filter === f}
              className="shrink-0 rounded-full px-4"
            >
              {f === "Salvati" ? `Salvati (${saved.length})` : f}
            </Button>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-[96rem] flex-col gap-12 px-4 py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-normal tracking-tight">Componenti UI/UX</h1>
          <p className="text-muted-foreground">
            Ogni pin mostra il componente dal vivo e le regole principali di Material Design 3 di Google.
          </p>
        </div>

        {/* Una sezione per categoria: pannello tinto + etichetta separano i gruppi (48px tra sezioni) */}
        {sections.length > 0 ? (
          <div className="flex flex-col gap-12">
            {sections.map(({ category, items }) => {
              const { icon: Icon, hue, description } = categoryInfo[category]
              return (
                <section
                  key={category}
                  aria-labelledby={`cat-${category}`}
                  style={{ "--cat-hue": hue } as CSSProperties}
                  className="category-panel flex flex-col gap-6 rounded-[2rem] p-4 backdrop-blur sm:p-8"
                >
                  <header className="flex items-center gap-4">
                    <span className="category-icon flex size-12 shrink-0 items-center justify-center rounded-2xl">
                      <Icon className="size-6" />
                    </span>
                    <div className="flex flex-col">
                      <h2 id={`cat-${category}`} className="flex items-baseline gap-2 text-2xl">
                        {category}
                        <span className="text-base text-muted-foreground">{items.length}</span>
                      </h2>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </header>
                  {/* -mb-6 compensa il margine dell'ultimo pin di ogni colonna */}
                  <div className="-mb-6 columns-1 gap-6 sm:columns-2 lg:columns-3 2xl:columns-4">
                    {items.map((pin) => (
                      <PinCard
                        key={pin.id}
                        pin={pin}
                        saved={saved.includes(pin.id)}
                        onToggleSave={() => toggleSave(pin.id)}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          <p className="py-20 text-center text-muted-foreground">
            {filter === "Salvati" ? 'Nessun pin salvato: premi "Salva" su un componente.' : "Nessun risultato."}
          </p>
        )}
      </div>
    </>
  )
}
