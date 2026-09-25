import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api, type Info } from "@/lib/api"

export function BackendInfo() {
  const [info, setInfo] = useState<Info | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api<Info>("/info")
      .then(setInfo)
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend</CardTitle>
        <CardDescription>
          Dati da <code>/api/info</code>, serviti dal container <code>app</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {error && <p className="text-destructive">Errore: {error}</p>}
        {!error && !info && <p className="text-muted-foreground">Caricamento…</p>}
        {info && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-muted-foreground">Messaggio</dt>
            <dd>{info.message}</dd>
            <dt className="text-muted-foreground">Container</dt>
            <dd className="font-mono">{info.hostname}</dd>
            <dt className="text-muted-foreground">Node</dt>
            <dd className="font-mono">{info.node}</dd>
            <dt className="text-muted-foreground">Uptime</dt>
            <dd>{info.uptime}s</dd>
          </dl>
        )}
      </CardContent>
    </Card>
  )
}
