import { useState, type KeyboardEvent } from "react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BellIcon,
  BluetoothIcon,
  CarFrontIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleDashedIcon,
  CircleDotIcon,
  CreditCardIcon,
  FilePlusIcon,
  FileTextIcon,
  FolderOpenIcon,
  HeartIcon,
  LeafIcon,
  LockIcon,
  MoonIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShuffleIcon,
  SignalHighIcon,
  SignalLowIcon,
  SignalMediumIcon,
  SkipBackIcon,
  SkipForwardIcon,
  UploadIcon,
  UserIcon,
  UsersIcon,
  WifiIcon,
} from "lucide-react"
import { toast } from "sonner"

import { AppButton } from "@/components/app-button"

/* ---------- Ricerca segmentata (Airbnb) ---------- */

const searchSegments = [
  { label: "Dove", value: "Cerca destinazioni" },
  { label: "Date", value: "Aggiungi date" },
  { label: "Ospiti", value: "Aggiungi ospiti" },
]

export function SegmentedSearchDemo() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className={`flex items-center rounded-full border p-2 shadow-md transition-colors ${
        active === null ? "bg-background" : "bg-muted"
      }`}
    >
      {searchSegments.map((segment, i) => (
        <div key={segment.label} className="flex min-w-0 flex-1 items-center">
          {i > 0 && (
            <span className={`h-8 w-px shrink-0 bg-border ${active === i || active === i - 1 ? "opacity-0" : ""}`} />
          )}
          <button
            type="button"
            onClick={() => setActive(active === i ? null : i)}
            className={`flex min-w-0 flex-1 flex-col rounded-full px-4 py-2 text-left transition-colors ${
              active === i ? "bg-background shadow-md" : "hover:bg-foreground/5"
            }`}
          >
            <span className="text-xs font-medium">{segment.label}</span>
            <span className="truncate text-xs text-muted-foreground">{segment.value}</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        aria-label="Cerca"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <SearchIcon className="size-5" />
      </button>
    </div>
  )
}

/* ---------- Piani e prezzi (Stripe, Notion) ---------- */

const plans = [
  { id: "base", name: "Base", monthly: 0, note: "Per iniziare" },
  { id: "pro", name: "Pro", monthly: 12, note: "Per professionisti", popular: true },
  { id: "team", name: "Team", monthly: 24, note: "Per gruppi di lavoro" },
]

export function PricingDemo() {
  const [yearly, setYearly] = useState(true)
  const [selected, setSelected] = useState("pro")
  const plan = plans.find((p) => p.id === selected)!

  const price = (monthly: number) => (monthly === 0 ? "Gratis" : `${yearly ? Math.round(monthly * 0.8) : monthly} €`)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 rounded-[12px] bg-background p-2 text-sm">
        {[false, true].map((isYearly) => (
          <button
            key={String(isYearly)}
            type="button"
            onClick={() => setYearly(isYearly)}
            className={`flex h-8 items-center justify-center gap-2 rounded-[8px] font-medium transition-colors ${
              yearly === isYearly ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
            }`}
          >
            {isYearly ? "Annuale" : "Mensile"}
            {isYearly && <span className="text-xs text-emerald-600 dark:text-emerald-400">−20%</span>}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Piano">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={selected === p.id}
            onClick={() => setSelected(p.id)}
            className={`flex items-center gap-4 rounded-[16px] border-2 bg-background p-4 text-left transition-colors ${
              selected === p.id ? "border-primary" : "border-transparent"
            }`}
          >
            <span className="flex flex-1 flex-col">
              <span className="flex items-center gap-2 font-medium">
                {p.name}
                {p.popular && (
                  <span className="rounded-full bg-primary px-2 text-[10px] leading-4 text-primary-foreground">
                    Più scelto
                  </span>
                )}
              </span>
              <span className="text-xs text-muted-foreground">{p.note}</span>
            </span>
            <span className="text-right">
              <span className="block text-lg font-medium">{price(p.monthly)}</span>
              {p.monthly > 0 && <span className="block text-xs text-muted-foreground">al mese</span>}
            </span>
          </button>
        ))}
      </div>

      <AppButton variant="primary" className="w-full">
        Continua con {plan.name}
      </AppButton>
    </div>
  )
}

/* ---------- Command palette (Linear, Vercel, Raycast) ---------- */

const commands = [
  { group: "Suggeriti", label: "Nuovo documento", icon: FilePlusIcon, keys: ["N"] },
  { group: "Suggeriti", label: "Apri progetto", icon: FolderOpenIcon, keys: ["O"] },
  { group: "Suggeriti", label: "Cerca nei file", icon: FileTextIcon, keys: ["⇧", "F"] },
  { group: "Azioni", label: "Invita un collega", icon: UsersIcon, keys: ["I"] },
  { group: "Azioni", label: "Cambia tema", icon: MoonIcon, keys: ["T"] },
  { group: "Azioni", label: "Impostazioni", icon: SettingsIcon, keys: [","] },
]

export function CommandPaletteDemo() {
  const [query, setQuery] = useState("")
  const [index, setIndex] = useState(0)
  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
  const current = Math.min(index, Math.max(results.length - 1, 0))

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setIndex((current + 1) % Math.max(results.length, 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setIndex((current - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === "Enter" && results[current]) {
      toast(results[current].label)
    }
  }

  return (
    <div className="overflow-hidden rounded-[16px] border bg-background shadow-xl">
      <div className="flex items-center gap-2 border-b px-4">
        <SearchIcon className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIndex(0)
          }}
          onKeyDown={onKeyDown}
          placeholder="Scrivi un comando…"
          aria-label="Comando"
          className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="rounded-[4px] border px-2 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
      </div>
      <ul className="flex flex-col p-2 text-sm" role="listbox">
        {results.length === 0 && <li className="px-2 py-4 text-center text-muted-foreground">Nessun comando</li>}
        {results.map((c, i) => (
          <li key={c.label} className="flex flex-col">
            {(i === 0 || results[i - 1].group !== c.group) && (
              <span className="px-2 pt-2 pb-2 text-xs text-muted-foreground">{c.group}</span>
            )}
            <div
              role="option"
              aria-selected={i === current}
              onMouseEnter={() => setIndex(i)}
              className={`flex h-10 items-center gap-2 rounded-[8px] px-2 ${i === current ? "bg-muted" : ""}`}
            >
              <c.icon className="size-4 text-muted-foreground" />
              <span className="flex-1">{c.label}</span>
              <span className="flex gap-2">
                {c.keys.map((k) => (
                  <kbd
                    key={k}
                    className="min-w-6 rounded-[4px] border text-center font-mono text-[10px] text-muted-foreground"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Lettore musicale (Spotify, Apple Music) ---------- */

export function MusicPlayerDemo() {
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(true)
  const [shuffle, setShuffle] = useState(false)

  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-background p-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="size-16 shrink-0 rounded-[12px] bg-linear-to-br from-brand-2 via-brand-1 to-brand-3" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium">Luci di città</span>
          <span className="truncate text-sm text-muted-foreground">Aurora Boreale</span>
        </div>
        <button
          type="button"
          aria-label="Mi piace"
          aria-pressed={liked}
          onClick={() => setLiked(!liked)}
          className={liked ? "text-emerald-500" : "text-muted-foreground"}
        >
          <HeartIcon className={`size-5 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-2/5 rounded-full bg-foreground" />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>1:24</span>
          <span>3:32</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Casuale"
          aria-pressed={shuffle}
          onClick={() => setShuffle(!shuffle)}
          className={shuffle ? "text-emerald-500" : "text-muted-foreground"}
        >
          <ShuffleIcon className="size-4" />
        </button>
        <button type="button" aria-label="Precedente">
          <SkipBackIcon className="size-6 fill-current" />
        </button>
        <button
          type="button"
          aria-label={playing ? "Pausa" : "Riproduci"}
          onClick={() => setPlaying(!playing)}
          className="flex size-14 items-center justify-center rounded-full bg-foreground text-background transition-transform active:scale-95"
        >
          {playing ? <PauseIcon className="size-6 fill-current" /> : <PlayIcon className="size-6 fill-current" />}
        </button>
        <button type="button" aria-label="Successivo">
          <SkipForwardIcon className="size-6 fill-current" />
        </button>
        <button type="button" aria-label="Ripeti" className="text-muted-foreground">
          <RepeatIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}

/* ---------- Pagamento con carta (Stripe Checkout) ---------- */

export function CheckoutDemo() {
  const [card, setCard] = useState("")

  function formatCard(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const field = "h-10 w-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"

  return (
    <form
      className="flex flex-col gap-4 rounded-[24px] bg-background p-4 shadow-md"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Email</span>
        <input className={`${field} rounded-[8px] border`} placeholder="mario@esempio.it" type="email" />
      </label>

      <fieldset className="flex flex-col gap-2 text-sm">
        <legend className="pb-2 font-medium">Dati della carta</legend>
        {/* Campi uniti in un unico blocco, come su una carta reale */}
        <div className="overflow-hidden rounded-[8px] border">
          <div className="flex items-center border-b pr-4">
            <input
              className={field}
              inputMode="numeric"
              placeholder="1234 1234 1234 1234"
              aria-label="Numero della carta"
              value={card}
              onChange={(e) => setCard(formatCard(e.target.value))}
            />
            <CreditCardIcon className="size-4 shrink-0 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2">
            <input className={`${field} border-r`} placeholder="MM / AA" aria-label="Scadenza" />
            <input className={field} placeholder="CVC" aria-label="Codice di sicurezza" />
          </div>
        </div>
      </fieldset>

      <AppButton type="submit" variant="primary" className="w-full">
        <LockIcon />
        Paga 24,00 €
      </AppButton>
    </form>
  )
}

/* ---------- Scelta del mezzo (Uber, Bolt) ---------- */

const rides = [
  { id: "comfort", name: "Comfort", eta: "3 min", seats: 4, price: "18,40 €", icon: CarFrontIcon },
  { id: "green", name: "Green", eta: "5 min", seats: 4, price: "16,90 €", icon: LeafIcon },
  { id: "xl", name: "XL", eta: "8 min", seats: 6, price: "27,10 €", icon: UsersIcon },
]

export function RideOptionsDemo() {
  const [selected, setSelected] = useState("comfort")
  const ride = rides.find((r) => r.id === selected)!

  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-background p-4 shadow-md">
      <div className="mx-auto h-1 w-10 rounded-full bg-muted-foreground/30" />
      <span className="px-2 font-medium">Scegli un passaggio</span>
      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Tipo di auto">
        {rides.map((r) => (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={selected === r.id}
            onClick={() => setSelected(r.id)}
            className={`flex items-center gap-4 rounded-[12px] border-2 px-4 py-2 text-left transition-colors ${
              selected === r.id ? "border-foreground" : "border-transparent hover:bg-muted"
            }`}
          >
            <r.icon className="size-8 shrink-0" />
            <span className="flex flex-1 flex-col">
              <span className="flex items-center gap-2 font-medium">
                {r.name}
                <span className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
                  <UserIcon className="size-3" />
                  {r.seats}
                </span>
              </span>
              <span className="text-xs text-muted-foreground">Arriva tra {r.eta}</span>
            </span>
            <span className="font-medium">{r.price}</span>
          </button>
        ))}
      </div>
      <AppButton variant="primary" className="w-full" onClick={() => toast(`${ride.name} confermato`)}>
        Conferma {ride.name}
      </AppButton>
    </div>
  )
}

/* ---------- Stato vuoto (Dropbox, Notion, Slack) ---------- */

export function EmptyStateDemo() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[24px] border-2 border-dashed bg-background px-6 py-8 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-secondary">
        <div className="flex size-16 items-center justify-center rounded-full bg-background shadow-sm">
          <UploadIcon className="size-6 text-primary" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">Nessun file, per ora</span>
        <span className="text-sm text-muted-foreground">
          Trascina qui i tuoi documenti o caricali dal computer. Li troverai sempre in questa cartella.
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <AppButton>Scopri come</AppButton>
        <AppButton variant="primary">
          <UploadIcon />
          Carica file
        </AppButton>
      </div>
    </div>
  )
}

/* ---------- Storie (Instagram) ---------- */

const stories = ["Tu", "giulia", "luca.v", "sara_r", "marco", "elena"]

export function StoriesDemo() {
  const [seen, setSeen] = useState<string[]>(["marco"])

  return (
    <div className="flex gap-4 overflow-x-auto rounded-[24px] bg-background p-4 shadow-md">
      {stories.map((name, i) => {
        const isSeen = seen.includes(name)
        return (
          <button
            key={name}
            type="button"
            onClick={() => setSeen((prev) => (prev.includes(name) ? prev : [...prev, name]))}
            className="flex shrink-0 flex-col items-center gap-2"
          >
            {/* Anello: cerchio esterno colorato da 64px + cerchio interno da 56px con bordo dello sfondo */}
            <span
              className={`flex size-16 items-center justify-center rounded-full ${
                i === 0
                  ? "bg-muted"
                  : isSeen
                    ? "bg-muted-foreground/30"
                    : "bg-linear-to-tr from-amber-400 via-brand-2 to-brand-1"
              }`}
            >
              <span className="flex size-14 items-center justify-center rounded-full border-2 border-background bg-secondary text-sm font-medium text-secondary-foreground">
                {name.slice(0, 2).toUpperCase()}
              </span>
            </span>
            <span className={`w-16 truncate text-center text-xs ${isSeen ? "text-muted-foreground" : ""}`}>{name}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Lista impostazioni (iOS, Android) ---------- */

export function SettingsListDemo() {
  const [dnd, setDnd] = useState(true)

  const rows = [
    { icon: WifiIcon, color: "bg-sky-500", label: "Wi-Fi", value: "Casa" },
    { icon: BluetoothIcon, color: "bg-blue-600", label: "Bluetooth", value: "Attivo" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="px-4 text-xs text-muted-foreground uppercase">Connessioni</span>
        <ul className="overflow-hidden rounded-[16px] bg-background">
          {rows.map((row, i) => (
            <li key={row.label} className="flex h-12 items-center gap-4 pl-4">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-[8px] text-white ${row.color}`}
              >
                <row.icon className="size-4" />
              </span>
              <span className={`flex h-full flex-1 items-center gap-2 pr-4 ${i > 0 ? "border-t" : ""}`}>
                <span className="flex-1 text-sm">{row.label}</span>
                <span className="text-sm text-muted-foreground">{row.value}</span>
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <span className="px-4 text-xs text-muted-foreground uppercase">Avvisi</span>
        <ul className="overflow-hidden rounded-[16px] bg-background">
          <li className="flex h-12 items-center gap-4 pl-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-red-500 text-white">
              <BellIcon className="size-4" />
            </span>
            <span className="flex h-full flex-1 items-center gap-2 pr-4">
              <span className="flex-1 text-sm">Notifiche</span>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </span>
          </li>
          <li className="flex h-12 items-center gap-4 pl-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-violet-500 text-white">
              <MoonIcon className="size-4" />
            </span>
            <label className="flex h-full flex-1 items-center gap-2 border-t pr-4">
              <span className="flex-1 text-sm">Non disturbare</span>
              <button
                type="button"
                role="switch"
                aria-checked={dnd}
                onClick={() => setDnd(!dnd)}
                className={`flex h-8 w-12 items-center rounded-full border-2 border-transparent transition-colors ${
                  dnd ? "justify-end bg-emerald-500" : "justify-start bg-muted-foreground/30"
                }`}
              >
                <span className="size-6 rounded-full bg-white shadow" />
              </button>
            </label>
          </li>
        </ul>
      </div>
    </div>
  )
}

/* ---------- Lista attività (Linear, Jira, GitHub) ---------- */

const statuses = [
  { icon: CircleDashedIcon, label: "Da fare", className: "text-muted-foreground" },
  { icon: CircleDotIcon, label: "In corso", className: "text-amber-500" },
  { icon: CheckIcon, label: "Completata", className: "text-primary" },
]
const priorities = [SignalLowIcon, SignalMediumIcon, SignalHighIcon]

const initialIssues = [
  { id: "ENG-142", title: "Ottimizzare il caricamento delle immagini", status: 1, priority: 2, owner: "GB" },
  { id: "ENG-139", title: "Tema scuro nelle impostazioni", status: 0, priority: 1, owner: "LV" },
  { id: "ENG-131", title: "Correggere il focus nel dialog", status: 2, priority: 2, owner: "SR" },
  { id: "ENG-127", title: "Aggiornare le dipendenze", status: 0, priority: 0, owner: "GB" },
]

export function IssueListDemo() {
  const [issues, setIssues] = useState(initialIssues)

  function cycle(id: string) {
    setIssues((prev) => prev.map((it) => (it.id === id ? { ...it, status: (it.status + 1) % statuses.length } : it)))
  }

  return (
    <ul className="overflow-hidden rounded-[16px] border bg-background text-sm">
      {issues.map((issue, i) => {
        const status = statuses[issue.status]
        const Priority = priorities[issue.priority]
        return (
          <li key={issue.id} className={`flex h-12 items-center gap-2 px-4 hover:bg-muted ${i > 0 ? "border-t" : ""}`}>
            <Priority className="size-4 shrink-0 text-muted-foreground" aria-label="Priorità" />
            <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">{issue.id}</span>
            <button
              type="button"
              onClick={() => cycle(issue.id)}
              aria-label={`Stato: ${status.label}`}
              className={`shrink-0 ${status.className}`}
            >
              <status.icon className="size-4" />
            </button>
            <span className={`flex-1 truncate ${issue.status === 2 ? "text-muted-foreground line-through" : ""}`}>
              {issue.title}
            </span>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-secondary-foreground">
              {issue.owner}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- KPI con andamento (Stripe Dashboard, Vercel) ---------- */

const series = {
  "7g": [32, 36, 34, 41, 39, 45, 48],
  "30g": [20, 24, 22, 28, 26, 31, 30, 35, 33, 38, 41, 40, 44, 48],
  "12m": [48, 44, 41, 38, 36, 35, 33, 31, 30, 29, 27, 26],
}
type Period = keyof typeof series

export function KpiDemo() {
  const [period, setPeriod] = useState<Period>("30g")
  const data = series[period]
  const delta = ((data[data.length - 1] - data[0]) / data[0]) * 100
  const up = delta >= 0

  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${40 - ((v - min) / (max - min || 1)) * 36}`)

  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-background p-6 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">Ricavi netti</span>
          <span className="text-3xl font-medium tracking-tight">
            {(data[data.length - 1] * 1006).toLocaleString("it-IT")} €
          </span>
        </div>
        <span
          className={`flex items-center gap-2 rounded-full px-2 text-xs leading-6 font-medium ${
            up ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-destructive/10 text-destructive"
          }`}
        >
          {up ? <ArrowUpRightIcon className="size-3" /> : <ArrowDownRightIcon className="size-3" />}
          {up ? "+" : ""}
          {delta.toFixed(1).replace(".", ",")}%
        </span>
      </div>

      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-24 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="kpi-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,40 ${points.join(" ")} 100,40`} fill="url(#kpi-fill)" />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="flex gap-2">
        {(Object.keys(series) as Period[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`h-8 rounded-[8px] px-2 text-xs font-medium transition-colors ${
              period === p ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- Chat (iMessage, WhatsApp) ---------- */

export function ChatDemo() {
  const [messages, setMessages] = useState([
    { mine: false, text: "Ci vediamo alle 18 al solito posto?" },
    { mine: true, text: "Perfetto! Porto io i biglietti 🎟️" },
    { mine: false, text: "Grande, a dopo" },
  ])
  const [draft, setDraft] = useState("")

  function send() {
    if (!draft.trim()) return
    setMessages((prev) => [...prev, { mine: true, text: draft.trim() }])
    setDraft("")
  }

  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-background p-4 shadow-md">
      <div className="flex flex-col gap-2">
        {messages.map((m, i) => (
          <span
            key={i}
            className={`max-w-[80%] rounded-[16px] px-4 py-2 text-sm ${
              m.mine
                ? "self-end rounded-br-[4px] bg-primary text-primary-foreground"
                : "self-start rounded-bl-[4px] bg-muted"
            }`}
          >
            {m.text}
          </span>
        ))}
        <span
          className="flex gap-2 self-start rounded-[16px] rounded-bl-[4px] bg-muted px-4 py-4"
          aria-label="Sta scrivendo"
        >
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-2 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </span>
      </div>
      <form
        className="flex items-center gap-2 rounded-full border pl-4"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Messaggio"
          aria-label="Messaggio"
          className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Invia"
          disabled={!draft.trim()}
          className="m-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
        >
          <SendIcon className="size-4" />
        </button>
      </form>
    </div>
  )
}

/* ---------- Scheda prodotto (Apple Store) ---------- */

const finishes = [
  { name: "Mezzanotte", swatch: "bg-slate-800", preview: "from-slate-700 to-slate-900" },
  { name: "Galassia", swatch: "bg-indigo-500", preview: "from-indigo-400 to-violet-600" },
  { name: "Argento", swatch: "bg-zinc-300", preview: "from-zinc-200 to-zinc-400" },
]

export function ProductCardDemo() {
  const [finish, setFinish] = useState(finishes[1])

  return (
    <div className="flex flex-col gap-4 rounded-[24px] bg-background p-4 shadow-md">
      <div className="flex h-40 items-center justify-center rounded-[16px] bg-muted">
        <div className={`h-32 w-16 rounded-[16px] bg-linear-to-br shadow-xl ${finish.preview}`} />
      </div>
      <div className="flex flex-col gap-2 px-2">
        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Novità</span>
        <span className="text-lg font-medium">Telefono Aurora</span>
        <span className="text-sm text-muted-foreground">Finitura {finish.name.toLowerCase()} · da 999 €</span>
        <div className="flex gap-2 pt-2" role="radiogroup" aria-label="Finitura">
          {finishes.map((f) => (
            <button
              key={f.name}
              type="button"
              role="radio"
              aria-checked={finish.name === f.name}
              aria-label={f.name}
              onClick={() => setFinish(f)}
              className={`size-6 rounded-full ring-offset-2 ring-offset-background ${f.swatch} ${
                finish.name === f.name ? "ring-2 ring-primary" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <AppButton size="sm">Scopri di più</AppButton>
        <AppButton size="sm" variant="primary">
          Acquista
        </AppButton>
      </div>
    </div>
  )
}
