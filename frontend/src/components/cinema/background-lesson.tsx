import type { ReactNode } from "react"
import { CheckIcon, TriangleAlertIcon } from "lucide-react"

import { GuideSection } from "@/components/buttons-guide/guide-section"
import { films } from "@/components/cinema/films"
import { PosterArt } from "@/components/cinema/poster"

const film = films[4]

type Surface = {
  name: string
  good: boolean
  note: string
  // Sfondo del riquadro e aspetto della scheda sopra
  frame: ReactNode
  cardClass: string
}

const surfaces: Surface[] = [
  {
    name: "Nero puro",
    good: false,
    note: "Sul nero assoluto l'ombra sparisce e il contrasto col bianco affatica la vista al buio.",
    frame: <div className="absolute inset-0 bg-black" />,
    cardClass: "shadow-2xl",
  },
  {
    name: "Grigio profondo",
    good: true,
    note: "Un nero leggermente schiarito (circa 8% di luce): più morbido e lascia spazio ai livelli.",
    frame: <div className="absolute inset-0 bg-[oklch(0.15_0.004_20)]" />,
    cardClass: "shadow-2xl",
  },
  {
    name: "Superficie più chiara",
    good: true,
    note: "Al buio l'elevazione si esprime schiarendo la superficie, non con l'ombra.",
    frame: <div className="absolute inset-0 bg-[oklch(0.15_0.004_20)]" />,
    cardClass: "bg-[oklch(0.26_0.006_20)] p-2 ring-1 ring-white/10",
  },
  {
    name: "Immagine sfocata",
    good: true,
    note: "L'atmosfera del film diventa lo sfondo: coinvolgente, ma serve un velo scuro per il testo.",
    frame: (
      <>
        <PosterArt film={film} showTitle={false} className="absolute inset-0 scale-125 blur-2xl" />
        <div className="absolute inset-0 bg-black/40" />
      </>
    ),
    cardClass: "shadow-2xl",
  },
]

export function BackgroundLesson() {
  return (
    <GuideSection
      index="01"
      title="Differenze di sfondo"
      description="La stessa scheda su quattro sfondi scuri. Al buio le ombre si vedono poco: gerarchia e profondità si costruiscono con la luminosità delle superfici."
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {surfaces.map((s) => (
          <figure key={s.name} className="flex flex-col gap-4">
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-[16px]">
              {s.frame}
              {/* Scheda: raggio 12px = immagine 4px + margine 8px quando c'è la superficie */}
              <div className={`relative w-40 rounded-[12px] ${s.cardClass}`}>
                <PosterArt film={film} className="aspect-video w-full rounded-[4px]" />
              </div>
            </div>
            <figcaption className="flex flex-col gap-2">
              <span
                className={`flex items-center gap-2 text-sm font-medium ${s.good ? "text-emerald-400" : "text-amber-400"}`}
              >
                {s.good ? <CheckIcon className="size-4" /> : <TriangleAlertIcon className="size-4" />}
                {s.name}
              </span>
              <span className="text-sm text-muted-foreground">{s.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </GuideSection>
  )
}
