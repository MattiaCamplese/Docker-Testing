import { BookmarkIcon, CheckIcon, ExternalLinkIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Pin } from "@/components/gallery/pins"

type PinCardProps = {
  pin: Pin
  saved: boolean
  onToggleSave: () => void
}

type RuleGroupProps = {
  label: string
  rules: string[]
  tone: "do" | "dont"
}

export function RuleGroup({ label, rules, tone }: RuleGroupProps) {
  const Icon = tone === "do" ? CheckIcon : XIcon
  const color = tone === "do" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"

  return (
    <section className="flex flex-col gap-2">
      <h4 className={`text-xs font-medium tracking-wide uppercase ${color}`}>{label}</h4>
      <ul className="flex flex-col gap-2 text-xs">
        {rules.map((rule) => (
          <li key={rule} className="flex gap-2">
            <Icon className={`size-4 shrink-0 ${color}`} aria-hidden="true" />
            {rule}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function PinCard({ pin, saved, onToggleSave }: PinCardProps) {
  const Demo = pin.demo

  return (
    // Ogni pin è una card chiusa: demo e regole stanno nello stesso contorno.
    // Spaziature: 8px dentro un gruppo, 16px tra gruppi, 24px tra un pin e l'altro
    <article className="group mb-6 break-inside-avoid overflow-hidden rounded-3xl border bg-card transition-shadow hover:shadow-lg">
      <div className="category-demo relative m-2 rounded-2xl p-6">
        <Button
          size="sm"
          variant={saved ? "secondary" : "default"}
          onClick={onToggleSave}
          aria-pressed={saved}
          className={`absolute top-4 right-4 z-10 rounded-full px-4 transition-opacity ${
            saved ? "" : "group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0"
          }`}
        >
          <BookmarkIcon className={saved ? "fill-current" : ""} />
          {saved ? "Salvato" : "Salva"}
        </Button>
        <div className="pt-8">
          <Demo />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-2 pb-6">
        {/* Gruppo: intestazione */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium">{pin.title}</h3>
          <p className="text-sm text-muted-foreground">{pin.description}</p>
        </div>

        {/* Gruppi tematici: ognuno con la sua etichetta */}
        <RuleGroup label="Fai" rules={pin.dos} tone="do" />
        <RuleGroup label="Evita" rules={pin.donts} tone="dont" />

        <a
          href={`https://m3.material.io/${pin.guideline}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Linee guida Material 3
          <ExternalLinkIcon className="size-3" />
        </a>
      </div>
    </article>
  )
}
