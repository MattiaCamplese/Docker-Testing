import { useEffect, useRef, useState } from "react"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon, PlusIcon, ThumbsUpIcon } from "lucide-react"
import { toast } from "sonner"

import type { Film } from "@/components/cinema/films"
import { PosterArt } from "@/components/cinema/poster"

// Pulsante "La mia lista": il + ruota di 90° e lascia il posto alla spunta (300ms)
export function ListToggle({ listed, onToggle }: { listed: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={listed}
      aria-label={listed ? "Rimuovi dalla lista" : "Aggiungi alla lista"}
      onClick={onToggle}
      className="relative size-8 shrink-0 rounded-full border-2 border-white/60 bg-black/40 transition-colors hover:border-white"
    >
      <PlusIcon
        className={`absolute inset-0 m-auto size-4 transition duration-300 ${listed ? "scale-0 rotate-90 opacity-0" : ""}`}
      />
      <CheckIcon
        className={`absolute inset-0 m-auto size-4 transition duration-300 ${listed ? "" : "scale-0 -rotate-90 opacity-0"}`}
      />
    </button>
  )
}

// Scheda di un film: al passaggio del mouse (o al focus da tastiera) si ingrandisce del 25%
// dopo 400ms, così un semplice passaggio del cursore non fa "saltare" la riga
function MovieCard({ film }: { film: Film }) {
  const [listed, setListed] = useState(false)

  return (
    <div
      tabIndex={0}
      className="group/card relative aspect-video snap-start rounded-[4px] transition duration-300 ease-out outline-none hover:z-10 hover:scale-125 hover:shadow-2xl hover:delay-400 focus-visible:z-10 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-white"
    >
      <PosterArt film={film} className="size-full rounded-[4px]" />

      {/* Anteprima che appare dopo l'ingrandimento */}
      <div className="absolute inset-0 flex flex-col justify-end gap-2 rounded-[4px] bg-linear-to-t from-black via-black/70 to-transparent p-2 opacity-0 transition-opacity duration-300 group-focus-within/card:opacity-100 group-hover/card:opacity-100 group-hover/card:delay-500">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Riproduci ${film.title}`}
            onClick={() => toast(`Riproduzione simulata: ${film.title}`)}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black"
          >
            <PlayIcon className="size-4 fill-current" />
          </button>
          <ListToggle listed={listed} onToggle={() => setListed(!listed)} />
          <button
            type="button"
            aria-label="Mi piace"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-white/60 bg-black/40 hover:border-white"
          >
            <ThumbsUpIcon className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="font-medium text-emerald-400">{film.match}%</span>
          <span className="rounded-[2px] border border-white/40 px-2 leading-4">{film.rating}</span>
          <span>{film.duration}</span>
        </div>
        <span className="truncate text-[10px] text-white/80">{film.genres.join(" • ")}</span>
      </div>
    </div>
  )
}

type MovieRowProps = {
  title: string
  films: Film[]
}

// Riga di film: le frecce (sempre visibili finché c'è altro da vedere, sopra una sfumatura
// che trasforma la scheda tagliata in un'anteprima) scorrono di una "pagina" alla volta con scroll fluido,
// le schede si agganciano al bordo (scroll-snap) e i trattini indicano la pagina corrente
export function MovieRow({ title, films }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  function update() {
    const el = rowRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const total = Math.max(1, Math.ceil((el.scrollWidth - 8) / el.clientWidth))
    // Le frecce dipendono da quanto si può ancora scorrere, non dal numero di pagina:
    // l'ultima "pagina" può essere parziale (es. 9 film con 6 per pagina)
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
    setPages(total)
    setPage(max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (total - 1)))
  }

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  function scroll(direction: 1 | -1) {
    const el = rowRef.current
    if (el) el.scrollBy({ left: direction * (el.clientWidth - 96), behavior: "smooth" })
  }

  return (
    <section className="flex flex-col" aria-label={title}>
      <div className="flex items-end justify-between gap-4 px-4 sm:px-12">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex gap-2" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => (
            <span key={i} className={`h-1 w-4 rounded-full ${i === page ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
      </div>

      <div className="group/row relative">
        <button
          type="button"
          aria-label="Film precedenti"
          onClick={() => scroll(-1)}
          disabled={!canPrev}
          className="absolute inset-y-8 left-0 z-20 flex w-12 items-center justify-center bg-linear-to-r from-black/80 via-black/50 to-transparent disabled:hidden"
        >
          <ChevronLeftIcon className="size-8 transition-transform group-hover/row:scale-125" />
        </button>

        <div
          ref={rowRef}
          onScroll={update}
          className="no-scrollbar grid snap-x snap-mandatory scroll-px-4 auto-cols-[calc((100%-8px)/2)] grid-flow-col gap-2 overflow-x-auto scroll-smooth px-4 py-8 sm:scroll-px-12 sm:auto-cols-[calc((100%-16px)/3)] sm:px-12 lg:auto-cols-[calc((100%-24px)/4)] xl:auto-cols-[calc((100%-40px)/6)]"
        >
          {films.map((film) => (
            <MovieCard key={film.id} film={film} />
          ))}
        </div>

        <button
          type="button"
          aria-label="Film successivi"
          onClick={() => scroll(1)}
          disabled={!canNext}
          className="absolute inset-y-8 right-0 z-20 flex w-12 items-center justify-center bg-linear-to-l from-black/80 via-black/50 to-transparent disabled:hidden"
        >
          <ChevronRightIcon className="size-8 transition-transform group-hover/row:scale-125" />
        </button>
      </div>
    </section>
  )
}
