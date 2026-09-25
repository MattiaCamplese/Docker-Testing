import { ExternalLinkIcon } from "lucide-react"

import { films } from "@/components/cinema/films"

// Crediti: ogni locandina con il link alla sua pagina su Wikimedia Commons (licenza: pubblico dominio)
export function ImageCredits() {
  return (
    <footer className="flex flex-col gap-4 border-t pt-8 text-sm text-muted-foreground">
      <h2 className="font-medium text-foreground">Crediti delle immagini</h2>
      <p>
        Locandine d'epoca da Wikimedia Commons, indicate come pubblico dominio nella pagina di ciascun file. I dati di
        compatibilità ed età consigliata sono inventati per la demo.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((film) => (
          <li key={film.id}>
            <a
              href={film.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
            >
              {film.title} ({film.year})
              <ExternalLinkIcon className="size-3" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
