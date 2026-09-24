import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-24 text-center">
      <title>Pagina non trovata · Docker Testing</title>
      <p className="text-6xl font-normal">404</p>
      <h1 className="text-xl">Pagina non trovata</h1>
      <p className="text-muted-foreground">L'indirizzo non esiste o è stato spostato.</p>
      <Button nativeButton={false} render={<Link to="/" />} className="h-10 rounded-full px-6">
        Torna alla home
      </Button>
    </div>
  )
}
