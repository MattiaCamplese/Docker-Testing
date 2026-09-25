import { InfoIcon } from "lucide-react"

import { BackgroundLesson } from "@/components/cinema/background-lesson"
import { Billboard } from "@/components/cinema/billboard"
import { films } from "@/components/cinema/films"
import { ImageCredits } from "@/components/cinema/image-credits"
import { MotionLesson } from "@/components/cinema/motion-lesson"
import { MovieRow } from "@/components/cinema/movie-row"
import { RadiusLesson } from "@/components/cinema/radius-lesson"
import { Top10Row } from "@/components/cinema/top10-row"

// Pagina didattica in stile piattaforma di streaming: tema scuro con accento rosso (.cinema),
// righe di film da sfogliare e lezioni su sfondi, stondature e animazioni
export function AnimationsPage() {
  return (
    <div className="cinema min-h-full">
      <title>Animazioni · Canon UI</title>

      <p className="flex items-center gap-2 border-b bg-primary/10 px-4 py-2 text-sm sm:px-12">
        <InfoIcon className="size-4 shrink-0 text-primary" />
        Pagina didattica ispirata alle piattaforme di streaming. Film classici con locandine di pubblico dominio;
        compatibilità ed età sono simulate.
      </p>

      <Billboard />

      <div className="relative z-10 -mt-16 flex flex-col gap-4">
        <MovieRow title="Di tendenza ora" films={films} />
        <MovieRow title="Perché hai guardato Il monello" films={[...films].reverse()} />
        <Top10Row />
      </div>

      <div className="mx-auto flex max-w-[96rem] flex-col gap-12 px-4 py-16">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Dietro le quinte</span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Come è fatta questa pagina</h1>
          <p className="text-lg text-muted-foreground">
            Passa il mouse sulle schede, usa le frecce delle righe, aggiungi un film alla lista: qui sotto trovi le
            regole di sfondo, stondatura e movimento che rendono l'esperienza fluida.
          </p>
        </div>
        <BackgroundLesson />
        <RadiusLesson />
        <MotionLesson />
        <ImageCredits />
      </div>
    </div>
  )
}
