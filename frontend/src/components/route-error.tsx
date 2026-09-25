import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react"
import { isRouteErrorResponse, useRouteError } from "react-router"

import { AppButton, AppButtonLink } from "@/components/app-button"

// Messaggi dei browser quando un pezzo dell'app (chunk) non esiste più, di solito dopo un nuovo deploy
const STALE_CHUNK =
  /dynamically imported module|Importing a module script failed|error loading dynamically imported module/i

// Errore dentro una pagina: la navigazione resta visibile e c'è sempre una via d'uscita
export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : String(error)
  const staleVersion = STALE_CHUNK.test(message)

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-24 text-center">
      <title>Errore · Canon UI</title>
      <span className="flex size-16 items-center justify-center rounded-[16px] bg-destructive/10 text-destructive">
        {staleVersion ? <RefreshCwIcon className="size-8" /> : <TriangleAlertIcon className="size-8" />}
      </span>
      <div className="flex max-w-lg flex-col gap-2">
        <h1 className="text-2xl font-normal tracking-tight">
          {staleVersion ? "È uscita una nuova versione" : "Qualcosa è andato storto"}
        </h1>
        <p className="text-muted-foreground">
          {staleVersion
            ? "Questa pagina è stata aggiornata mentre l'app era aperta. Ricarica per usare la versione nuova."
            : "La pagina non è riuscita a caricarsi. Riprova, oppure torna alla home."}
        </p>
        {!staleVersion && <code className="mt-2 text-xs break-all text-muted-foreground">{message}</code>}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <AppButton variant="primary" onClick={() => window.location.reload()}>
          <RefreshCwIcon />
          Ricarica la pagina
        </AppButton>
        <AppButtonLink to="/" variant="secondary" reloadDocument>
          Torna alla home
        </AppButtonLink>
      </div>
    </div>
  )
}
