import type { Film } from "@/components/cinema/films"

type PosterArtProps = {
  film: Film
  // Titolo sovrapposto in basso (utile quando la locandina è ritagliata in orizzontale)
  showTitle?: boolean
  className?: string
}

// Locandina del film: immagine di pubblico dominio ritagliata sul suo punto d'interesse.
// Il gradiente nelle tinte del film fa da sfondo mentre l'immagine carica (o se manca).
export function PosterArt({ film, showTitle = true, className = "" }: PosterArtProps) {
  const [a, b] = film.hues
  const fallback = `linear-gradient(135deg, oklch(0.45 0.12 ${a}), oklch(0.22 0.08 ${b}))`

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: fallback }}>
      <img
        src={film.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: film.focus }}
      />
      {showTitle && (
        <>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-2 text-sm leading-tight font-black tracking-tight text-white uppercase drop-shadow">
            {film.title}
          </span>
        </>
      )}
    </div>
  )
}
