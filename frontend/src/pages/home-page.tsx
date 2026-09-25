import { useEffect, useState, type ReactNode } from "react"
import {
  AccessibilityIcon,
  ArrowRightIcon,
  ClapperboardIcon,
  LayoutGridIcon,
  MousePointerClickIcon,
  RectangleHorizontalIcon,
  SparklesIcon,
  RulerIcon,
  ServerIcon,
  ShuffleIcon,
  type LucideIcon,
} from "lucide-react"
import { Link, useNavigate } from "react-router"

import { AppButton, AppButtonLink } from "@/components/app-button"
import { films } from "@/components/cinema/films"
import { categories, pins } from "@/components/gallery/pins"
import { showcase } from "@/components/showcase/showcase"
import { LogoMark } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
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
    text: "Ruoli colore, scala tipografica e spaziature su griglia di 8dp.",
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
    <Badge variant="outline" className="gap-2">
      <span className={`size-2 rounded-full ${dot}`} />
      {label}
    </Badge>
  )
}

// Illustrazione decorativa dell'hero: logo grande con alone e "componenti" fluttuanti
function HeroArt() {
  return (
    // Margine destro ≥ quanto sporge la chip "Switch" (-right-10), altrimenti allarga la pagina
    <div className="relative hidden size-80 lg:mr-12 lg:block xl:mr-16" aria-hidden="true">
      <div className="absolute inset-6 rounded-full bg-linear-to-br from-brand-1 via-brand-2 to-brand-3 opacity-40 blur-3xl" />
      <LogoMark className="relative size-full drop-shadow-2xl" />

      <div className="absolute top-6 -left-14 flex -rotate-6 items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur">
        <span className="size-2.5 rounded-full bg-emerald-500" />
        Filled button
      </div>
      <div className="absolute -right-10 bottom-20 flex rotate-3 items-center gap-2 rounded-2xl border bg-background/80 px-4 py-2 text-sm shadow-lg backdrop-blur">
        Switch
        <span className="flex h-5 w-9 items-center justify-end rounded-full border-2 border-transparent bg-primary">
          <span className="size-4 rounded-full bg-primary-foreground" />
        </span>
      </div>
      <div className="absolute -bottom-4 left-4 flex -rotate-2 gap-2 rounded-2xl border bg-background/80 p-2 shadow-lg backdrop-blur">
        {["Chip", "Badge", "Tabs"].map((label) => (
          <span
            key={label}
            className="flex h-6 items-center rounded-lg bg-secondary px-2 text-xs font-medium text-secondary-foreground"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-3xl font-medium">{value}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

type SectionCardProps = {
  icon: LucideIcon
  title: string
  description: string
  to: string
  action: string
  children: ReactNode
}

// Card di una sezione: intestazione, contenuto e azione terziaria in fondo
function SectionCard({ icon: Icon, title, description, to, action, children }: SectionCardProps) {
  return (
    <Card className="rounded-[28px] bg-card/75 backdrop-blur">
      <CardHeader>
        <span className="mb-2 flex size-12 items-center justify-center rounded-[12px] bg-secondary text-secondary-foreground">
          <Icon />
        </span>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">{children}</CardContent>
      <CardFooter className="justify-end bg-transparent pb-4">
        <AppButtonLink to={to}>
          {action}
          <ArrowRightIcon />
        </AppButtonLink>
      </CardFooter>
    </Card>
  )
}

// Pagine tra cui sceglie il pulsante "Pagina a caso" (tutte tranne la home)
const randomPages = ["/regole", "/animazioni", "/pulsanti", "/ispirazione", "/demo-backend"]

export function HomePage() {
  const navigate = useNavigate()

  function openRandomPage() {
    navigate(randomPages[Math.floor(Math.random() * randomPages.length)])
  }

  return (
    <div className="mx-auto flex max-w-[96rem] flex-col gap-16 px-4 py-12 sm:py-20">
      <title>Home · Canon UI</title>

      {/* Hero: l'unico pulsante primario della pagina + un secondario */}
      <section className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="flex max-w-3xl flex-col gap-6">
          <Badge variant="secondary" className="h-6 px-2">
            Material Design 3 · React · Docker
          </Badge>
          <h1 className="text-4xl font-normal tracking-tight sm:text-6xl">
            Interfacce coerenti,{" "}
            <span className="bg-linear-to-r from-brand-1 via-brand-2 to-brand-3 bg-clip-text text-transparent">
              dalle regole al codice
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Componenti UI e una guida ai pulsanti con le regole di Google Material Design 3, costruiti con shadcn/ui e
            serviti da due container Docker: frontend e backend.
          </p>
          <div className="flex flex-wrap gap-4">
            <AppButtonLink to="/regole" variant="primary">
              Esplora le regole
              <ArrowRightIcon />
            </AppButtonLink>
            <AppButton variant="secondary" onClick={openRandomPage}>
              <ShuffleIcon />
              Pagina a caso
            </AppButton>
          </div>
        </div>
        <HeroArt />
      </section>

      {/* Una card per sezione dell'app. Azioni terziarie: il primario è già nell'hero.
          Card 28px = raggio pulsante md (12px) + margine 16px */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-label="Sezioni">
        <SectionCard
          icon={LayoutGridIcon}
          title="Regole UI/UX"
          description="Una galleria in stile Pinterest: ogni componente dal vivo, con cosa fare e cosa evitare."
          to="/regole"
          action="Vai alle regole"
        >
          <div className="flex gap-6">
            <Stat value={pins.length} label="componenti" />
            <Stat value={categories.length} label="categorie" />
          </div>
        </SectionCard>

        <SectionCard
          icon={RectangleHorizontalIcon}
          title="Pulsanti"
          description="Gerarchia, dimensioni, stati e forma: come usare i pulsanti in modo coerente."
          to="/pulsanti"
          action="Leggi la guida"
        >
          <div className="flex gap-6">
            <Stat value={4} label="tipologie" />
            <Stat value={3} label="dimensioni" />
          </div>
        </SectionCard>

        <SectionCard
          icon={ClapperboardIcon}
          title="Animazioni"
          description="Una sala cinema didattica: schede che si ingrandiscono, righe da sfogliare, sfondi e stondature al buio."
          to="/animazioni"
          action="Entra in sala"
        >
          <div className="flex gap-6">
            <Stat value={films.length} label="film classici" />
            <Stat value={6} label="animazioni" />
          </div>
        </SectionCard>

        <SectionCard
          icon={SparklesIcon}
          title="Ispirazione"
          description="I componenti più iconici delle grandi aziende, ricostruiti dal vivo, con il perché funzionano."
          to="/ispirazione"
          action="Lasciati ispirare"
        >
          <div className="flex gap-6">
            <Stat value={showcase.length} label="esempi" />
            <Stat value={new Set(showcase.flatMap((item) => item.inspiredBy)).size} label="prodotti citati" />
          </div>
        </SectionCard>
        <SectionCard
          icon={ServerIcon}
          title="Demo backend"
          description="Info del container Node e una todo list che legge e scrive tramite le API del backend."
          to="/demo-backend"
          action="Apri la demo"
        >
          <div className="flex flex-col items-start gap-2">
            <ApiStatus />
            <p className="text-muted-foreground">
              Il frontend chiama <code>/api</code>, il proxy di Vite inoltra al container <code>app</code>.
            </p>
          </div>
        </SectionCard>
      </section>

      {/* Chip: scorciatoie per filtrare la galleria */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Esplora per categoria</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/regole?categoria=${category.toLowerCase()}`}
              className="flex h-10 items-center gap-2 rounded-lg border bg-background/60 px-4 text-sm font-medium backdrop-blur transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
            <div key={title} className="flex flex-col gap-2 rounded-3xl bg-muted/70 p-6 backdrop-blur">
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
