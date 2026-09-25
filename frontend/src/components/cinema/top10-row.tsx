import { films } from "@/components/cinema/films"
import { PosterArt } from "@/components/cinema/poster"

// Classifica: numeri giganti solo contornati, con la locandina verticale che li sovrappone
export function Top10Row() {
  const top = [...films].sort((a, b) => b.match - a.match).slice(0, 5)

  return (
    <section className="flex flex-col gap-4" aria-label="I 5 più visti oggi">
      <h2 className="px-4 text-xl font-medium sm:px-12">I 5 più visti oggi</h2>
      <ol className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-4 sm:px-12">
        {top.map((film, i) => (
          // relative: tiene il testo sr-only (posizionato in assoluto) dentro la riga a scorrimento,
          // altrimenti sfugge al ritaglio e allarga tutta la pagina su telefono
          <li key={film.id} className="group relative flex shrink-0 items-end">
            <span
              className="text-[140px] leading-[0.8] font-black text-transparent select-none [-webkit-text-stroke:4px_oklch(0.55_0_0)]"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <PosterArt
              film={film}
              className="-ml-6 aspect-[2/3] w-28 rounded-[4px] shadow-xl transition-transform duration-300 group-hover:-translate-y-2"
            />
            <span className="sr-only">
              {i + 1}. {film.title}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
