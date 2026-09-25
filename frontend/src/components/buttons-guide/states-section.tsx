import { useState, type FormEvent } from "react"
import { Loader2Icon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { AppButton, type AppButtonProps } from "@/components/app-button"
import { GuideSection } from "@/components/buttons-guide/guide-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Riproduce staticamente gli stati che normalmente appaiono solo con mouse e tastiera
const states: { name: string; detail: string; className?: string; disabled?: boolean }[] = [
  { name: "Normale", detail: "Pronto all'uso" },
  { name: "Hover", detail: "Livello di stato 8%", className: "after:opacity-[0.08]" },
  {
    name: "Focus",
    detail: "10% + anello visibile",
    className: "after:opacity-10 ring-3 ring-ring/60 ring-offset-2 ring-offset-background",
  },
  { name: "Premuto", detail: "Livello di stato 10%", className: "after:opacity-10" },
  { name: "Disattivato", detail: "Sfondo 12%, testo 38%", disabled: true },
]

const variants: { variant: NonNullable<AppButtonProps["variant"]>; label: string }[] = [
  { variant: "primary", label: "Primario" },
  { variant: "secondary", label: "Secondario" },
  { variant: "tertiary", label: "Terziario" },
  { variant: "destructive", label: "Distruttivo" },
]

function PublishDemo() {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const canPublish = title.trim().length > 0 && !loading

  function publish(e: FormEvent) {
    e.preventDefault()
    if (!canPublish) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setTitle("")
      toast("Articolo pubblicato")
    }, 1500)
  }

  return (
    <form onSubmit={publish} className="flex flex-col gap-4 rounded-[28px] border bg-background p-4">
      <div className="flex flex-col gap-2 px-2 pt-2">
        <Label htmlFor="demo-title">Titolo *</Label>
        <Input
          id="demo-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Scrivi un titolo…"
          aria-describedby="demo-title-help"
        />
        <p id="demo-title-help" className="text-xs text-muted-foreground">
          {canPublish || loading ? "Pronto per la pubblicazione." : 'Scrivi un titolo per attivare "Pubblica".'}
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <AppButton onClick={() => setTitle("")} disabled={!title || loading}>
          Svuota
        </AppButton>
        <AppButton type="submit" variant="primary" disabled={!canPublish} aria-busy={loading}>
          {loading ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
          {loading ? "Pubblicazione…" : "Pubblica"}
        </AppButton>
      </div>
    </form>
  )
}

export function StatesSection() {
  return (
    <GuideSection
      index="06"
      title="Stati e interazione"
      description="Ogni pulsante risponde a hover, focus e pressione con un livello di colore, come in Material 3. Quando l'azione non è disponibile il pulsante si disattiva e non è cliccabile."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-4 text-sm">
          <thead>
            <tr>
              <th className="w-28" />
              {states.map((s) => (
                <th key={s.name} className="px-2 text-left font-normal">
                  <span className="block font-medium">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">{s.detail}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v.variant}>
                <th scope="row" className="pr-4 text-left font-normal text-muted-foreground">
                  {v.label}
                </th>
                {states.map((s) => (
                  <td key={s.name} className="px-2">
                    <AppButton
                      variant={v.variant}
                      size="sm"
                      className={s.className}
                      disabled={s.disabled}
                      tabIndex={-1}
                    >
                      Azione
                    </AppButton>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Prova: disattivato finché non serve</h3>
          <p className="text-sm text-muted-foreground">
            "Pubblica" resta disattivato finché il titolo è vuoto, e il testo sotto il campo spiega perché. Durante
            l'invio il pulsante mostra l'avanzamento e non si può premere due volte.
          </p>
        </div>
        <PublishDemo />
      </div>
    </GuideSection>
  )
}
