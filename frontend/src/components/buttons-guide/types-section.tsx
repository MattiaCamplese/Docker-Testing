import type { ReactNode } from "react"
import { SendIcon, Trash2Icon } from "lucide-react"

import { AppButton, type AppButtonProps } from "@/components/app-button"
import { GuideSection } from "@/components/buttons-guide/guide-section"
import { RuleGroup } from "@/components/gallery/pin-card"

type ButtonType = {
  variant: NonNullable<AppButtonProps["variant"]>
  name: string
  limit: string
  role: string
  label: ReactNode
  rules: string[]
}

const types: ButtonType[] = [
  {
    variant: "primary",
    name: "Primario",
    limit: "Massimo 1 per pagina",
    role: "L'azione principale: quella che porta l'utente avanti.",
    label: (
      <>
        <SendIcon />
        Pubblica
      </>
    ),
    rules: ["Uno solo per pagina, mai due", "Colore pieno del marchio", "Etichetta con un verbo chiaro"],
  },
  {
    variant: "secondary",
    name: "Secondario",
    limit: "Solo se c'è il primario",
    role: "Un'alternativa importante, ma meno del primario.",
    label: "Salva bozza",
    rules: ["Esiste solo accanto a un primario", "Mai più evidente del primario", "Sfondo tonale, non pieno"],
  },
  {
    variant: "tertiary",
    name: "Terziario",
    limit: "Tutti gli altri",
    role: "Ogni altra azione dell'interfaccia.",
    label: "Annulla",
    rules: ["Solo testo, nessuno sfondo", "Si può ripetere quanto serve", "Azioni frequenti o di contorno"],
  },
  {
    variant: "destructive",
    name: "Distruttivo",
    limit: "Massimo 1",
    role: "Azioni irreversibili, come eliminare.",
    label: (
      <>
        <Trash2Icon />
        Elimina
      </>
    ),
    rules: ["Uno solo per pagina", "Chiedi sempre una conferma", "Nel dialog di conferma prende il posto del primario"],
  },
]

export function TypesSection() {
  return (
    <GuideSection
      index="02"
      title="Le tipologie"
      description="Tre livelli di enfasi più uno distruttivo. Non esistono altri tipi: ogni pulsante dell'interfaccia rientra in una di queste quattro categorie."
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {types.map((type) => (
          // Card 28px = pulsante md (12px) + margine 16px: curve concentriche
          <article key={type.variant} className="flex flex-col gap-4 rounded-[28px] border bg-background p-4">
            <div className="flex h-32 items-center justify-center rounded-[12px] bg-muted">
              <AppButton variant={type.variant}>{type.label}</AppButton>
            </div>
            <div className="flex flex-col gap-4 px-2 pb-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium">{type.name}</h3>
                  <span className="text-xs font-medium text-primary">{type.limit}</span>
                </div>
                <p className="text-sm text-muted-foreground">{type.role}</p>
              </div>
              <RuleGroup label="Regole" rules={type.rules} tone="do" />
            </div>
          </article>
        ))}
      </div>
    </GuideSection>
  )
}
