import { useCallback, useEffect, useRef, useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClapperboardIcon,
  ClockIcon,
  EllipsisIcon,
  PlayIcon,
  PlusIcon,
  Share2Icon,
  StarIcon,
} from "lucide-react"
import { toast } from "sonner"

import { films, type Film } from "@/components/cinema/films"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Stelle da 1 a 5: lette come "4 stelle su 5", disegnate come icone piene/vuote
function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2" role="img" aria-label={`${value} stelle su 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon
            key={i}
            className={`size-4 ${i < value ? "fill-current text-white" : "text-white/40"}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-xs text-white/70" aria-hidden="true">
        {value}/5
      </span>
    </div>
  )
}

// Scheda consigliata: sfondo nelle tinte del film (le stesse del fallback delle locandine),
// locandina in alto che sfuma nel colore della scheda e ne prende la tinta (mix-blend-luminosity), poi titolo, regista e durata, stelle, trama e generi in fondo.
// Angoli: scheda 24px; il pulsante "altro" è un cerchio a 16px dal bordo (concentrico)
function RecommendedCard({ film, index, total }: { film: Film; index: number; total: number }) {
  const [a, b] = film.hues

  return (
    <article
      aria-roledescription="slide"
      aria-label={`${index + 1} di ${total}: ${film.title}`}
      className="relative flex h-full flex-col overflow-hidden rounded-[24px] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.9)] ring-1 ring-white/10"
      style={{ background: `linear-gradient(to bottom, oklch(0.46 0.13 ${a}), oklch(0.24 0.07 ${b}))` }}
    >
      <div className="relative h-48 shrink-0">
        <img
          src={film.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full [mask-image:linear-gradient(to_bottom,black_45%,transparent)] object-cover opacity-90 mix-blend-luminosity"
          style={{ objectPosition: film.focus }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Altre azioni per ${film.title}`}
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition-colors outline-none before:absolute before:-inset-2 hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-white"
          >
            <EllipsisIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark w-48">
            <DropdownMenuItem onClick={() => toast(`Riproduzione simulata: ${film.title}`)}>
              <PlayIcon />
              Riproduci
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast(`${film.title} aggiunto alla lista`)}>
              <PlusIcon />
              Aggiungi alla lista
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast("Link copiato (simulato)")}>
              <Share2Icon />
              Condividi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="-mt-8 flex flex-1 flex-col gap-4 px-6 pb-6">
        {/* Gruppo: titolo e dati del film */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl leading-tight font-bold tracking-tight">{film.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/75">
            <span className="flex items-center gap-2">
              <ClapperboardIcon className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Regia:</span>
              {film.director}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="size-3.5" aria-hidden="true" />
              <span className="sr-only">Durata:</span>
              {film.duration}
            </span>
          </div>
        </div>

        <Stars value={film.stars} />

        <p className="line-clamp-4 text-sm leading-relaxed text-white/85">
          «{film.title}» ({film.year}). {film.plot}
        </p>

        {/* Gruppo in fondo alla scheda: sempre alla stessa altezza grazie a mt-auto */}
        <div className="mt-auto flex flex-col items-center gap-2 pt-2 text-center">
          <span className="text-xs text-white/60">Genere</span>
          <span className="text-lg font-semibold">{film.genres.join(" · ")}</span>
        </div>
      </div>
    </article>
  )
}

// Carosello "Consigliati": i film in sequenza, uno dopo l'altro.
// - Su telefono si trascina col dito: scroll nativo con aggancio (scroll-snap), la scheda
//   successiva sporge a destra per far capire che si può scorrere
// - Col mouse: frecce sui bordi sopra una sfumatura, come nelle righe di film (nascoste agli estremi)
// - Al passaggio del mouse (o col focus) la scheda si ingrandisce del 5% e l'ombra si allunga:
//   poco, perché la scheda è già grande; 32px di spazio sopra e sotto evitano che venga tagliata
// - Da tastiera: frecce ← → quando il carosello ha il focus
// - Il contatore "3 di 9" è annunciato ai lettori di schermo
export function RecommendedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function slides() {
    return Array.from(trackRef.current?.children ?? []) as HTMLElement[]
  }

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const items = Array.from(track.children) as HTMLElement[]
    const start = track.scrollLeft + items[0].offsetLeft
    // Scheda attiva = quella più vicina al bordo sinistro dell'area visibile
    let index = 0
    items.forEach((item, i) => {
      if (Math.abs(item.offsetLeft - start) < Math.abs(items[index].offsetLeft - start)) index = i
    })
    setCurrent(index)
    setAtStart(track.scrollLeft <= 4)
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [update])

  function goTo(index: number) {
    const track = trackRef.current
    const items = slides()
    const target = items[Math.max(0, Math.min(index, items.length - 1))]
    if (track && target) track.scrollTo({ left: target.offsetLeft - items[0].offsetLeft, behavior: "smooth" })
  }

  return (
    <section className="flex flex-col gap-4" aria-roledescription="carosello" aria-label="Consigliati">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-12">
        <h2 className="text-xl font-medium">Consigliati</h2>
        <span className="text-sm text-white/60 tabular-nums" aria-live="polite">
          {current + 1} di {films.length}
        </span>{" "}
      </div>

      <div className="group/row relative">
        <button
          type="button"
          aria-label="Film precedente"
          onClick={() => goTo(current - 1)}
          disabled={atStart}
          className="absolute inset-y-8 left-0 z-20 flex w-12 items-center justify-center bg-linear-to-r from-black/80 via-black/50 to-transparent disabled:hidden"
        >
          <ChevronLeftIcon className="size-8 transition-transform group-hover/row:scale-125" />
        </button>

        <div
          ref={trackRef}

          onScroll={update}
          tabIndex={0}
          aria-label="Film consigliati, usa le frecce per scorrere"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault()
              goTo(current + 1)
            } else if (e.key === "ArrowLeft") {
              e.preventDefault()
              goTo(current - 1)
            }
          }}
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 py-8 outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset sm:scroll-px-12 sm:px-12"
        >
          {films.map((film, i) => (
            <div
              key={film.id}
              className="w-[80%] max-w-[320px] shrink-0 snap-start transition duration-300 ease-out focus-within:z-10 hover:z-10 motion-safe:focus-within:scale-105 motion-safe:hover:scale-105 sm:w-[320px] [&>article]:transition-shadow [&>article]:duration-300 hover:[&>article]:shadow-[0_32px_64px_-16px_rgb(0_0_0/0.95)]"
            >
              <RecommendedCard film={film} index={i} total={films.length} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Film successivo"
          onClick={() => goTo(current + 1)}
          disabled={atEnd}
          className="absolute inset-y-8 right-0 z-20 flex w-12 items-center justify-center bg-linear-to-l from-black/80 via-black/50 to-transparent disabled:hidden"
        >
          <ChevronRightIcon className="size-8 transition-transform group-hover/row:scale-125" />
        </button>
      </div>
    </section>
  )
}
