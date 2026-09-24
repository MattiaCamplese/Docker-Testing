import { useEffect, useMemo, useState } from "react"
import { SearchIcon } from "lucide-react"
import { useSearchParams } from "react-router"

import { PinCard } from "@/components/gallery/pin-card"
import { categories, pins, type Category } from "@/components/gallery/pins"
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

  function selectFilter(f: Filter) {
    setSearchParams(f === "Tutti" ? {} : { categoria: f.toLowerCase() }, { replace: true })
  }

  function toggleSave(id: string) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const filters: Filter[] = ["Tutti", "Salvati", ...categories]

  return (
    <>
      <title>Regole UI/UX · Docker Testing</title>

      {/* Barra di ricerca e filtri, fissata sotto la top app bar (h-16) */}
      <div className="sticky top-16 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-[96rem] px-4 pt-3">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca componenti e regole…"
              aria-label="Cerca componenti e regole"
              className="h-11 rounded-full border-0 bg-muted pl-11 dark:bg-muted"
            />
          </div>
        </div>
        <nav className="mx-auto flex max-w-[96rem] gap-2 overflow-x-auto px-4 py-3" aria-label="Categorie">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "ghost"}
              onClick={() => selectFilter(f)}
              aria-pressed={filter === f}
              className="shrink-0 rounded-full px-3"
            >
              {f === "Salvati" ? `Salvati (${saved.length})` : f}
            </Button>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-[96rem] px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-medium">Componenti UI/UX</h1>
          <p className="text-sm text-muted-foreground">
            Ogni pin mostra il componente dal vivo e le regole principali di Material Design 3 di Google.
          </p>
        </div>

        {visiblePins.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 2xl:columns-4">
            {visiblePins.map((pin) => (
              <PinCard key={pin.id} pin={pin} saved={saved.includes(pin.id)} onToggleSave={() => toggleSave(pin.id)} />
            ))}
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
