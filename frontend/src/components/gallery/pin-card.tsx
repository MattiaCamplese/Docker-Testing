import { BookmarkIcon, CheckIcon, ExternalLinkIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Pin } from "@/components/gallery/pins"

type PinCardProps = {
  pin: Pin
  saved: boolean
  onToggleSave: () => void
}

export function PinCard({ pin, saved, onToggleSave }: PinCardProps) {
  const Demo = pin.demo

  return (
    <article className="group mb-4 break-inside-avoid">
      <div className="relative rounded-3xl bg-muted p-5 transition-shadow group-hover:shadow-lg">
        <Button
          size="sm"
          variant={saved ? "secondary" : "default"}
          onClick={onToggleSave}
          aria-pressed={saved}
          className={`absolute top-3 right-3 z-10 rounded-full px-3 transition-opacity ${
            saved ? "" : "group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0"
          }`}
        >
          <BookmarkIcon className={saved ? "fill-current" : ""} />
          {saved ? "Salvato" : "Salva"}
        </Button>
        <div className="pt-6">
          <Demo />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-medium">{pin.title}</h2>
          <Badge variant="outline" className="shrink-0">
            {pin.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{pin.description}</p>

        <ul className="flex flex-col gap-1 text-xs">
          {pin.dos.map((rule) => (
            <li key={rule} className="flex gap-2">
              <CheckIcon className="mt-px size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-label="Fai" />
              {rule}
            </li>
          ))}
          {pin.donts.map((rule) => (
            <li key={rule} className="flex gap-2">
              <XIcon className="mt-px size-3.5 shrink-0 text-destructive" aria-label="Evita" />
              {rule}
            </li>
          ))}
        </ul>

        <a
          href={`https://m3.material.io/${pin.guideline}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Linee guida Material 3
          <ExternalLinkIcon className="size-3" />
        </a>
      </div>
    </article>
  )
}
