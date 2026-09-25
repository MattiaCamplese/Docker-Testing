import { InfoIcon } from "lucide-react"
import { useSearchParams } from "react-router"

import { BackgroundLesson } from "@/components/cinema/background-lesson"
import { Billboard } from "@/components/cinema/billboard"
import { FilmSearch, SearchResults } from "@/components/cinema/film-search"
import { filterFilms, films, genres } from "@/components/cinema/films"
import { ImageCredits } from "@/components/cinema/image-credits"
import { MotionLesson } from "@/components/cinema/motion-lesson"
import { MovieRow } from "@/components/cinema/movie-row"
import { RadiusLesson } from "@/components/cinema/radius-lesson"
import { RecommendedCarousel } from "@/components/cinema/recommended-carousel"
import { Top10Row } from "@/components/cinema/top10-row"

// Pagina didattica in stile piattaforma di streaming: tema scuro con accento rosso (.cinema),
// righe di film da sfogliare e lezioni su sfondi, stondature e animazioni.
// Ricerca e genere vivono nell'URL (?cerca=…&genere=…): mentre sono attivi, i risultati
// prendono il posto di copertina e righe
export function AnimationsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("cerca") ?? ""
  const genreParam = searchParams.get("genere")
  const genre = genres.find((g) => g.toLowerCase() === genreParam) ?? null
  const searching = query.trim() !== "" || genre !== null

  function update(next: { cerca?: string; genere?: string | null }) {
    const params = new URLSearchParams(searchParams)
    if (next.cerca !== undefined) {
      if (next.cerca) params.set("cerca", next.cerca)
      else params.delete("cerca")
    }
    if (next.genere !== undefined) {
      if (next.genere) params.set("genere", next.genere.toLowerCase())
      else params.delete("genere")
    }
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }

  return (
    <div className="cinema min-h-full">
      <title>Animazioni · Canon UI</title>

      <p className="flex items-center gap-2 border-b bg-primary/10 px-4 py-2 text-sm sm:px-12">
        <InfoIcon className="size-4 shrink-0 text-primary" />
        Pagina didattica ispirata alle piattaforme di streaming. Film classici con locandine di pubblico dominio;
        compatibilità ed età sono simulate.
      </p>

      {/* Ricerca fissata sotto la top app bar (h-16), come nella pagina Regole */}
      <div className="sticky top-16 z-30 border-b border-white/10 bg-background/85 px-4 py-2 backdrop-blur-lg sm:px-12">
        <FilmSearch
          query={query}
          genre={genre}
          onQueryChange={(cerca) => update({ cerca })}
          onGenreChange={(genere) => update({ genere })}
        />
      </div>

      {searching ? (
        <SearchResults
          query={query}
          genre={genre}
          results={filterFilms(query, genre)}
          onReset={() => update({ cerca: "", genere: null })}
        />
      ) : (
        <>
          <Billboard />

          <div className="relative z-10 -mt-16 flex flex-col gap-4">
            <MovieRow title="Di tendenza ora" films={films} />
            <MovieRow title="Perché hai guardato Il monello" films={[...films].reverse()} />
            <Top10Row />
            <RecommendedCarousel />
          </div>
        </>
      )}

      <div className="mx-auto flex max-w-[96rem] flex-col gap-12 px-4 py-16">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Dietro le quinte</span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Come è fatta questa pagina</h1>
          <p className="text-lg text-muted-foreground">
            Cerca un film, passa il mouse sulle schede, usa le frecce delle righe, aggiungi un film alla lista: qui
            sotto trovi le regole di sfondo, stondatura e movimento che rendono l'esperienza fluida.
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
