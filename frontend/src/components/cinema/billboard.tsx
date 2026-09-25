import { useEffect, useState } from "react"
import { InfoIcon, PauseIcon, PlayIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { AppButton } from "@/components/app-button"
import { filmById, type Film } from "@/components/cinema/films"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

const featured = [filmById("il-mondo-perduto"), filmById("il-fantasma-dell-opera"), filmById("la-febbre-dell-oro")]

function play(film: Film) {
  toast(`Riproduzione simulata: ${film.title}`)
}

// Scheda "Altre info": locandina, dati e trama del film, con il tema della sala cinema
function FilmDetails({
  film,
  open,
  onOpenChange,
}: {
  film: Film
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="cinema gap-0 overflow-hidden rounded-[16px] p-0 sm:max-w-lg">
        <div className="relative h-56">
          <img src={film.image} alt="" className="size-full object-cover" style={{ objectPosition: film.focus }} />
          <div className="absolute inset-0 bg-linear-to-t from-popover to-transparent" />
          <DialogClose
            render={
              <AppButton
                size="sm"
                className="absolute top-2 right-2 w-9 min-w-0 bg-black/50 px-0 text-white"
                aria-label="Chiudi"
              />
            }
          >
            <XIcon />
          </DialogClose>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <DialogTitle className="text-2xl font-black tracking-tight uppercase">{film.title}</DialogTitle>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-emerald-400">{film.match}% compatibile</span>
            <span className="rounded-[4px] border border-white/40 px-2 text-xs leading-5">{film.rating}</span>
            <span>{film.year}</span>
            <span>{film.duration}</span>
          </div>
          <DialogDescription className="text-white/80">{film.plot}</DialogDescription>
          <p className="text-sm text-white/60">Generi: {film.genres.join(", ")}</p>
          <AppButton variant="primary" className="w-fit" onClick={() => play(film)}>
            <PlayIcon className="fill-current" />
            Riproduci
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Copertina: i film in evidenza si alternano in dissolvenza incrociata (700ms).
// Lo sfondo è la locandina sfocata del film in evidenza, che in basso svanisce nel rosso neutro
// della pagina; sui desktop la locandina intera è esposta a destra e si avvicina lentamente (Ken Burns).
// La rotazione automatica si ferma con il pulsante pausa, al passaggio del mouse, col focus da tastiera,
// a scheda aperta e se il sistema chiede di ridurre il movimento (WCAG 2.2.2)
export function Billboard() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)

  const rotating = !paused && !hovered && !focused && !detailsOpen && !reducedMotion

  useEffect(() => {
    if (!rotating) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % featured.length), 7000)
    return () => clearInterval(id)
  }, [rotating, current])

  const film = featured[current]

  return (
    <section
      className="relative isolate h-[70svh] max-h-[720px] min-h-[520px] overflow-hidden"
      aria-label="In evidenza"
      aria-roledescription="carosello"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
      }}
    >
      {featured.map((f, i) => (
        <div
          key={f.id}
          aria-hidden={i !== current}
          className={`absolute inset-0 -z-10 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Atmosfera del film: locandina sfocata che in basso svanisce nel rosso neutro della pagina */}
          <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_50%,transparent_95%)]">
            <img
              src={f.image}
              alt=""
              className="size-full scale-125 object-cover opacity-80 blur-2xl motion-safe:animate-ken-burns"
              style={{ objectPosition: f.focus }}
            />
            {/* Velo scuro a sinistra per la leggibilità del testo */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
          </div>
          <img
            src={f.image}
            alt={`Locandina di ${f.title} (${f.year})`}
            className="absolute top-1/2 right-24 hidden h-[72%] -translate-y-1/2 rotate-2 rounded-[4px] shadow-[0_32px_64px_-16px_rgb(0_0_0/0.8)] ring-1 ring-white/10 motion-safe:animate-ken-burns lg:block"
          />
        </div>
      ))}

      <div className="flex h-full max-w-2xl flex-col justify-end gap-4 px-4 pb-24 sm:px-12">
        <span className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Classico · pubblico dominio</span>
        <h2
          key={film.id}
          aria-live={rotating ? "off" : "polite"}
          className="text-5xl font-black tracking-tight uppercase motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4 sm:text-7xl"
        >
          {film.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-emerald-400">{film.match}% compatibile</span>
          <span className="rounded-[4px] border border-white/40 px-2 text-xs leading-5">{film.rating}</span>
          <span>{film.year}</span>
          <span>{film.duration}</span>
          <span className="text-white/60">{film.genres.join(" • ")}</span>
        </div>
        <p className="max-w-xl text-white/80">{film.plot}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <AppButton variant="primary" className="bg-white text-black" onClick={() => play(film)}>
            <PlayIcon className="fill-current" />
            Riproduci
          </AppButton>
          <AppButton
            variant="secondary"
            className="bg-white/20 text-white backdrop-blur"
            onClick={() => setDetailsOpen(true)}
          >
            <InfoIcon />
            Altre info
          </AppButton>
        </div>

        {/* Controlli del carosello: pausa + un indicatore per film, ognuno con area di tocco di 48px */}
        <div className="flex items-center" role="group" aria-label="Film in evidenza">
          <AppButton
            size="sm"
            className="-ml-4 w-12 min-w-0 px-0 text-white"
            aria-label={paused ? "Riprendi la rotazione" : "Metti in pausa la rotazione"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </AppButton>
          {featured.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-label={`Mostra ${f.title}`}
              aria-current={i === current}
              onClick={() => setCurrent(i)}
              className="group/dot flex h-12 min-w-12 items-center justify-center rounded-[4px] outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-4 bg-white/40 group-hover/dot:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <FilmDetails film={film} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </section>
  )
}
