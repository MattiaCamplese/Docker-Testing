import { useId, type ReactNode } from "react"
import { CheckIcon, XIcon } from "lucide-react"

type GuideSectionProps = {
  index: string
  title: string
  description: ReactNode
  children: ReactNode
}

// Pannello di una sezione della guida: numero, titolo, descrizione e contenuto
export function GuideSection({ index, title, description, children }: GuideSectionProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col gap-8 rounded-[2rem] border bg-card/75 p-6 backdrop-blur sm:p-8"
    >
      <header className="flex flex-col gap-2">
        <span className="font-mono text-xs font-medium tracking-wide text-primary">{index}</span>
        <h2 id={titleId} className="text-2xl tracking-tight">
          {title}
        </h2>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </header>
      {children}
    </section>
  )
}

type ExampleProps = {
  ok: boolean
  caption: string
  children: ReactNode
}

// Esempio "Corretto" / "Sbagliato". Card con raggio 28px = raggio pulsante md (12px) + margine (16px)
export function Example({ ok, caption, children }: ExampleProps) {
  return (
    <figure className="flex flex-col gap-4 rounded-[28px] border bg-background p-4">
      <div className="flex min-h-24 flex-wrap items-center justify-end gap-2 rounded-[12px] bg-muted p-4">
        {children}
      </div>
      <figcaption className="flex flex-col gap-2 px-2 pb-2">
        <span
          className={`flex items-center gap-2 text-xs font-medium tracking-wide uppercase ${
            ok ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
          }`}
        >
          {ok ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />}
          {ok ? "Corretto" : "Sbagliato"}
        </span>
        <span className="text-sm text-muted-foreground">{caption}</span>
      </figcaption>
    </figure>
  )
}
