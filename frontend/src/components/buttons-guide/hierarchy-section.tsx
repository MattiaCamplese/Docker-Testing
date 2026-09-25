import { CopyIcon, DownloadIcon, Share2Icon, Trash2Icon } from "lucide-react"

import { AppButton } from "@/components/app-button"
import { Example, GuideSection } from "@/components/buttons-guide/guide-section"

export function HierarchySection() {
  return (
    <GuideSection
      index="03"
      title="La gerarchia in una pagina"
      description="Il primario si riconosce a colpo d'occhio perché è l'unico. Il secondario ha senso solo in confronto al primario; tutto il resto è terziario."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Example
          ok
          caption="Un primario, un secondario accanto e il terziario per annullare. Il primario sta a destra."
        >
          <AppButton>Annulla</AppButton>
          <AppButton variant="secondary">Salva bozza</AppButton>
          <AppButton variant="primary">Pubblica</AppButton>
        </Example>
        <Example
          ok={false}
          caption="Due primari: l'utente non capisce quale sia l'azione principale. Uno dei due deve diventare secondario."
        >
          <AppButton variant="primary">Salva</AppButton>
          <AppButton variant="primary">Pubblica</AppButton>
        </Example>

        <Example ok caption="Una barra di azioni equivalenti: nessuna è principale, quindi sono tutte terziarie.">
          <AppButton size="sm">
            <Share2Icon />
            Condividi
          </AppButton>
          <AppButton size="sm">
            <CopyIcon />
            Duplica
          </AppButton>
          <AppButton size="sm">
            <DownloadIcon />
            Esporta
          </AppButton>
        </Example>
        <Example
          ok={false}
          caption="Secondario senza primario: manca il riferimento. Se non c'è un'azione principale, usa il terziario."
        >
          <AppButton>Annulla</AppButton>
          <AppButton variant="secondary">Salva bozza</AppButton>
        </Example>

        <Example ok caption="Dialog di conferma: il distruttivo prende il posto del primario, l'uscita è terziaria.">
          <AppButton>Annulla</AppButton>
          <AppButton variant="destructive">
            <Trash2Icon />
            Elimina
          </AppButton>
        </Example>
        <Example ok={false} caption="Due azioni distruttive nella stessa pagina: aumenta il rischio di errori gravi.">
          <AppButton variant="destructive">Elimina file</AppButton>
          <AppButton variant="destructive">Svuota cestino</AppButton>
        </Example>
      </div>
    </GuideSection>
  )
}
