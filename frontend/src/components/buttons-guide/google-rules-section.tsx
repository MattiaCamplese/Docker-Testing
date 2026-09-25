import { ExternalLinkIcon } from "lucide-react"

import { GuideSection } from "@/components/buttons-guide/guide-section"
import { RuleGroup } from "@/components/gallery/pin-card"

export function GoogleRulesSection() {
  return (
    <GuideSection
      index="08"
      title="Regole di Google da ricordare"
      description="Dalle linee guida Material Design 3 sui pulsanti: accessibilità, scrittura delle etichette e posizionamento."
    >
      <div className="grid gap-8 md:grid-cols-2">
        <RuleGroup
          label="Fai"
          tone="do"
          rules={[
            'Etichette brevi che iniziano con un verbo: "Salva modifiche", "Invia"',
            "Maiuscola solo alla prima lettera (sentence case)",
            "Area di tocco di almeno 48×48dp, anche se il pulsante è più piccolo",
            "Focus sempre visibile per chi naviga con la tastiera",
            "Contrasto del testo di almeno 4.5:1",
            "Nei dialog: conferma a destra, annulla a sinistra",
          ]}
        />
        <RuleGroup
          label="Evita"
          tone="dont"
          rules={[
            "Pulsanti disattivati senza spiegare cosa manca per attivarli",
            'Etichette generiche come "Clicca qui" o "OK" quando c\'è un verbo più preciso',
            "Etichette troncate o su più righe",
            "Icone che non aggiungono significato all'etichetta",
            "Tutto in maiuscolo: si legge peggio",
          ]}
        />
      </div>
      <a
        href="https://m3.material.io/components/buttons/guidelines"
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Linee guida Material 3 sui pulsanti
        <ExternalLinkIcon className="size-4" />
      </a>
    </GuideSection>
  )
}
