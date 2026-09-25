import { AppButtonLink } from "@/components/app-button"

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
      <title>Pagina non trovata · Canon UI</title>
      <p className="text-6xl font-normal">404</p>
      <h1 className="text-xl">Pagina non trovata</h1>
      <p className="text-muted-foreground">L'indirizzo non esiste o è stato spostato.</p>
      <AppButtonLink to="/" variant="primary">
        Torna alla home
      </AppButtonLink>
    </div>
  )
}
