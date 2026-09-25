import { useEffect, useState } from "react"
import { InfoIcon, PlayIcon } from "lucide-react"
import { toast } from "sonner"

import { AppButton } from "@/components/app-button"
import { filmById } from "@/components/cinema/films"

const featured = [filmById("il-mondo-perduto"), filmById("il-fantasma-dell-opera"), filmById("la-febbre-dell-oro")]

// Copertina: i film in evidenza si alternano in dissolvenza incrociata (700ms).
// Lo sfondo è la locandina sfocata del film in evidenza, che in basso svanisce nel rosso neutro
// della pagina; sui desktop la locandina intera è esposta a destra e si avvicina lentamente (Ken Burns).
// Rotazione automatica ferma se il sistema chiede di ridurre il movimento.
export function Billboard() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % featured.length), 7000)
    return () => clearInterval(id)
  }, [current])

  const film = featured[current]

  return (
    <section
      className="relative isolate h-[70svh] max-h-[720px] min-h-[520px] overflow-hidden"
      aria-label="In evidenza"
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

      <div className="flex h-full max-w-2xl flex-col justify-end gap-4 px-4 pb-32 sm:px-12">
        <span className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Classico · pubblico dominio</span>
        <h2
          key={film.id}
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
          <AppButton
            variant="primary"
            className="bg-white text-black"
            onClick={() => toast(`Riproduzione simulata: ${film.title}`)}
          >
            <PlayIcon className="fill-current" />
            Riproduci
          </AppButton>
          <AppButton variant="secondary" className="bg-white/20 text-white backdrop-blur">
            <InfoIcon />
            Altre info
          </AppButton>
        </div>
        <div className="flex gap-2 pt-4" role="tablist" aria-label="Film in evidenza">
          {featured.map((f, i) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={f.title}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-4 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
