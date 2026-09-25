import { useEffect, useId, useRef } from "react"
import { CheckIcon, SearchIcon, SearchXIcon, XIcon } from "lucide-react"

import { AppButton } from "@/components/app-button"
import { genres, type Film } from "@/components/cinema/films"
import { MovieCard } from "@/components/cinema/movie-row"

type FilmSearchProps = {
  query: string
  genre: string | null
  onQueryChange: (query: string) => void
  onGenreChange: (genre: string | null) => void
}

// Barra di ricerca secondo Material 3: campo alto 56dp a pillola, icona di ricerca in testa,
// azione "cancella" in coda solo quando c'è testo, etichetta accessibile, scorciatoia "/" ed Esc per svuotare.
// Sotto, chip di filtro (32dp, angoli 8dp, spunta quando selezionate) con area di tocco di 48dp
export function FilmSearch({ query, genre, onQueryChange, onGenreChange }: FilmSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  // "/" porta il focus sulla ricerca, a meno che non si stia già scrivendo in un campo
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (e.key !== "/" || target.closest("input, textarea, [contenteditable=true]")) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function clear() {
    onQueryChange("")
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6" role="search">
      <div className="relative w-full lg:max-w-md">
        <label htmlFor={inputId} className="sr-only">
          Cerca film per titolo, genere, anno o trama
        </label>
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/70"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query) {
              e.preventDefault()
              onQueryChange("")
            }
          }}
          placeholder="Titoli, generi, anni…"
          autoComplete="off"
          enterKeyHint="search"
          className="h-14 w-full rounded-full border border-white/15 bg-white/10 pr-16 pl-12 text-base text-white transition-colors outline-none placeholder:text-white/50 hover:bg-white/15 focus-visible:border-white/60 focus-visible:bg-white/15 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <AppButton
            className="absolute top-1/2 right-2 w-12 min-w-0 -translate-y-1/2 rounded-full px-0 text-white"
            aria-label="Cancella ricerca"
            onClick={clear}
          >
            <XIcon />
          </AppButton>
        ) : (
          <kbd
            className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-[4px] border border-white/20 px-2 text-xs leading-6 text-white/60 lg:block"
            aria-hidden="true"
          >
            /
          </kbd>
        )}
      </div>

      <div
        className="-mx-4 no-scrollbar flex gap-2 overflow-x-auto px-4 py-2 lg:mx-0 lg:px-0"
        role="group"
        aria-label="Genere"
      >
        {[null, ...genres].map((g) => {
          const selected = genre === g
          return (
            <button
              key={g ?? "tutti"}
              type="button"
              aria-pressed={selected}
              onClick={() => onGenreChange(g)}
              className={`relative flex h-8 shrink-0 items-center gap-2 rounded-[8px] border text-sm font-medium transition-colors outline-none before:absolute before:inset-x-0 before:-inset-y-2 focus-visible:ring-2 focus-visible:ring-white ${
                selected
                  ? "border-transparent bg-white pr-4 pl-2 text-black"
                  : "border-white/30 px-4 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {selected && <CheckIcon className="size-4" aria-hidden="true" />}
              {g ?? "Tutti"}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type SearchResultsProps = {
  query: string
  genre: string | null
  results: Film[]
  onReset: () => void
}

// Risultati: le schede entrano a cascata (40ms l'una, 300ms ciascuna, decelerazione),
// il conteggio viene annunciato ai lettori di schermo, e senza risultati c'è sempre una via d'uscita
export function SearchResults({ query, genre, results, onReset }: SearchResultsProps) {
  const what = [query.trim() && `«${query.trim()}»`, genre].filter(Boolean).join(" in ")

  return (
    <section className="flex min-h-[50svh] flex-col gap-6 px-4 py-8 sm:px-12" aria-labelledby="search-results-title">
      <div className="flex flex-col gap-2">
        <h2 id="search-results-title" className="text-xl font-medium">
          Risultati per {what}
        </h2>
        <p className="text-sm text-white/60" aria-live="polite">
          {results.length === 1 ? "1 film trovato" : `${results.length} film trovati`}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {results.map((film, i) => (
            <div
              key={film.id}
              className="motion-safe:animate-in motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.05,0.7,0.1,1)] motion-safe:fill-mode-both motion-safe:fade-in motion-safe:slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <MovieCard film={film} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-[16px] border border-white/10 bg-white/5 p-8">
          <SearchXIcon className="size-8 text-white/60" aria-hidden="true" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">Nessun film trovato</p>
            <p className="text-white/70">
              Controlla come hai scritto, oppure prova con un anno o un genere: ad esempio «1925» o «Horror».
            </p>
          </div>
          {/* Unica azione visibile durante la ricerca: Ã¨ il primario della schermata */}
          <AppButton variant="primary" onClick={onReset}>
            Cancella ricerca e filtri
          </AppButton>
        </div>
      )}
    </section>
  )
}
