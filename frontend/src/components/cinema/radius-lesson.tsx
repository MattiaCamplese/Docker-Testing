import { PlayIcon } from "lucide-react"

import { Example, GuideSection } from "@/components/buttons-guide/guide-section"
import { films } from "@/components/cinema/films"
import { PosterArt } from "@/components/cinema/poster"

const film = films[2]

export function RadiusLesson() {
  return (
    <GuideSection
      index="02"
      title="Regole di stondatura"
      description="Con i contenuti multimediali l'immagine è la protagonista: angoli piccoli per non tagliare l'artwork, curve concentriche quando la scheda si apre, cerchi solo per i controlli a icona."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <figure className="flex flex-col gap-4">
          <div className="flex h-48 items-center justify-center rounded-[16px] bg-muted">
            <PosterArt film={film} className="aspect-video w-48 rounded-[4px] shadow-xl" />
          </div>
          <figcaption className="flex flex-col gap-2">
            <span className="font-medium">Locandine: 4px</span>
            <span className="text-sm text-muted-foreground">
              Nelle griglie dense di immagini un angolo appena accennato: non ruba spazio all'artwork.
            </span>
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-4">
          <div className="flex h-48 items-center justify-center rounded-[16px] bg-muted">
            <div className="w-52 rounded-[12px] bg-card p-2 shadow-xl ring-1 ring-white/10">
              <PosterArt film={film} className="aspect-video w-full rounded-[4px]" />
              <div className="flex items-center gap-2 px-2 pt-2 pb-2 text-xs">
                <span className="font-medium text-emerald-400">{film.match}%</span>
                <span>{film.duration}</span>
              </div>
            </div>
          </div>
          <figcaption className="flex flex-col gap-2">
            <span className="font-medium">
              Scheda aperta: <span className="font-mono text-primary">4 + 8 = 12px</span>
            </span>
            <span className="text-sm text-muted-foreground">
              Quando l'anteprima si espande, il contenitore segue la curva dell'immagine: raggio esterno = raggio
              interno + margine.
            </span>
          </figcaption>
        </figure>

        <figure className="flex flex-col gap-4">
          <div className="flex h-48 items-center justify-center gap-4 rounded-[16px] bg-muted">
            <span className="flex size-12 items-center justify-center rounded-full bg-white text-black">
              <PlayIcon className="size-5 fill-current" />
            </span>
            <span className="flex h-12 items-center gap-2 rounded-[8px] bg-white px-6 font-medium text-black">
              <PlayIcon className="size-5 fill-current" />
              Riproduci
            </span>
          </div>
          <figcaption className="flex flex-col gap-2">
            <span className="font-medium">Cerchi solo per le icone</span>
            <span className="text-sm text-muted-foreground">
              I controlli a sola icona sono cerchi perfetti; i pulsanti con testo tornano all'angolo leggero.
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Example
          ok={false}
          caption="Locandine molto arrotondate (24px): sembrano icone di app e tagliano gli angoli dell'immagine."
        >
          <PosterArt film={films[5]} className="aspect-video w-32 rounded-[24px]" />
          <PosterArt film={films[6]} className="aspect-video w-32 rounded-[24px]" />
        </Example>
        <Example
          ok={false}
          caption='Contenitore e immagine con lo stesso raggio: l&apos;angolo interno sembra più largo e "stacca".'
        >
          <div className="w-44 rounded-[12px] bg-card p-2 ring-1 ring-white/10">
            <PosterArt film={films[8]} className="aspect-video w-full rounded-[12px]" />
          </div>
        </Example>
      </div>
    </GuideSection>
  )
}
