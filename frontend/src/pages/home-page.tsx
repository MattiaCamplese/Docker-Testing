import { useEffect, useState } from "react"
import {
  AccessibilityIcon,
  ArrowRightIcon,
  LayoutGridIcon,
  MousePointerClickIcon,
  RulerIcon,
  ServerIcon,
} from "lucide-react"
import { Link } from "react-router"

import { categories, pins } from "@/components/gallery/pins"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

const principles = [
  {
    icon: AccessibilityIcon,
    title: "Accessibile",
    text: "Aree di tocco da 48dp, contrasto ≥ 4.5:1 e focus sempre visibile.",
  },
  {
    icon: RulerIcon,
    title: "Coerente",
    text: "Ruoli colore, scala tipografica e spaziature su griglia di 4dp.",
  },
  {
    icon: MousePointerClickIcon,
    title: "Chiara",
    text: "Una sola azione principale per area, etichette brevi con un verbo.",
  },
]

type ApiState = "checking" | "online" | "offline"

function ApiStatus() {
  const [state, setState] = useState<ApiState>("checking")

  useEffect(() => {
    api("/health")
      .then(() => setState("online"))
      .catch(() => setState("offline"))
  }, [])

  const label = { checking: "Verifica API…", online: "API online", offline: "API offline" }[state]
  const dot = { checking: "bg-muted-foreground", online: "bg-emerald-500", offline: "bg-destructive" }[state]

  return (
    <Badge variant="outline" className="gap-1.5">
      <span className={`size-2 rounded-full ${dot}`} />
      {label}
    </Badge>
  )
}

export function HomePage() {
  return (
    <div className="mx-auto flex max-w-[96rem] flex-col gap-16 px-4 py-12 sm:py-20">
      <title>Home · Docker Testing</title>

      {/* Hero: una sola azione principale (filled) + una secondaria (outlined) */}
      <section className="flex max-w-3xl flex-col gap-6">
        <Badge variant="secondary" className="h-6 px-3">
          Material Design 3 · React · Docker
        </Badge>
        <h1 className="text-4xl font-normal tracking-tight sm:text-6xl">Interfacce coerenti, dalle regole al codice</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Una raccolta di componenti UI con le regole di Google Material Design 3, costruita con shadcn/ui e servita da
          due container Docker: frontend e backend.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button nativeButton={false} render={<Link to="/regole" />} className="h-10 rounded-full px-6">
            Esplora le regole
            <ArrowRightIcon />
          </Button>
          <Button
            nativeButton={false}
            render={<Link to="/demo-backend" />}
            variant="outline"
            className="h-10 rounded-full px-6"
          >
            Apri la demo backend
          </Button>
        </div>
      </section>

      {/* Card: un argomento per card, azione in fondo */}
      <section className="grid gap-4 md:grid-cols-2" aria-label="Sezioni">
        <Card className="rounded-3xl">
          <CardHeader>
            <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <LayoutGridIcon />
            </span>
            <CardTitle className="text-xl">Regole UI/UX</CardTitle>
            <CardDescription>
              Una galleria in stile Pinterest: ogni componente dal vivo, con cosa fare e cosa evitare.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6">
            <div>
              <p className="text-3xl font-medium">{pins.length}</p>
              <p className="text-muted-foreground">componenti</p>
            </div>
            <div>
              <p className="text-3xl font-medium">{categories.length}</p>
              <p className="text-muted-foreground">categorie</p>
            </div>
          </CardContent>
          <CardFooter className="justify-end bg-transparent pb-4">
            <Button
              nativeButton={false}
              render={<Link to="/regole" />}
              variant="secondary"
              className="rounded-full px-4"
            >
              Vai alle regole
            </Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <span className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
              <ServerIcon />
            </span>
            <CardTitle className="text-xl">Demo backend</CardTitle>
            <CardDescription>
              Info del container Node e una todo list che legge e scrive tramite le API del backend.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-2">
            <ApiStatus />
            <p className="text-muted-foreground">
              Il frontend chiama <code>/api</code>, il proxy di Vite inoltra al container <code>app</code>.
            </p>
          </CardContent>
          <CardFooter className="justify-end bg-transparent pb-4">
            <Button
              nativeButton={false}
              render={<Link to="/demo-backend" />}
              variant="secondary"
              className="rounded-full px-4"
            >
              Apri la demo
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Chip: scorciatoie per filtrare la galleria */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Esplora per categoria</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/regole?categoria=${category.toLowerCase()}`}
              className="flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {category}
              <span className="text-muted-foreground">{pins.filter((pin) => pin.category === category).length}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Principi</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-2 rounded-3xl bg-muted p-6">
              <Icon className="size-6" />
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
