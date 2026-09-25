import { AppButton } from "@/components/app-button"
import { GuideSection } from "@/components/buttons-guide/guide-section"
import { RuleGroup } from "@/components/gallery/pin-card"

// Zona di margine tratteggiata nel disegno anatomico
const stripes = {
  backgroundImage: "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 8px)",
}

export function AnatomySection() {
  return (
    <GuideSection
      index="04"
      title="Anatomia: il pulsante perfetto"
      description="Tre parti: margine, etichetta, margine. I due margini sono sempre identici, così l'etichetta è centrata e il pulsante risulta un po' più largo che alto."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
        {/* Disegno quotato del pulsante grande (56px) */}
        <div className="flex justify-center rounded-[24px] bg-muted p-8 sm:p-12">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex h-14 overflow-hidden rounded-[16px] bg-primary text-primary-foreground shadow-md">
                <span className="w-8 opacity-40" style={stripes} />
                <span className="flex items-center text-base font-medium">Pubblica</span>
                <span className="w-8 opacity-40" style={stripes} />
              </div>
              <div className="flex font-mono text-[10px] text-muted-foreground">
                <span className="w-8 border-t border-current pt-2 text-center">32</span>
                <span className="flex-1 border-t border-dashed border-current px-2 pt-2 text-center">etichetta</span>
                <span className="w-8 border-t border-current pt-2 text-center">32</span>
              </div>
            </div>
            <span className="flex h-14 items-center self-start border-l border-current pl-2 font-mono text-[10px] text-muted-foreground">
              56
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <RuleGroup
            label="Regole"
            tone="do"
            rules={[
              "Tre parti: margine sinistro = margine destro, etichetta al centro",
              "Sempre più largo che alto: larghezza minima = 2 × altezza",
              "Etichetta su una riga, mai troncata: se è lunga, riformulala",
              "Icona opzionale a sinistra, a 8px dall'etichetta",
            ]}
          />
          <div className="flex flex-wrap items-center gap-4">
            <AppButton variant="secondary">OK</AppButton>
            <AppButton variant="secondary">Salva</AppButton>
            <AppButton variant="secondary">Salva modifiche</AppButton>
          </div>
          <p className="text-sm text-muted-foreground">
            Anche con etichette corte come "OK" il pulsante non diventa quadrato: interviene la larghezza minima (96px
            per la dimensione 48).
          </p>
        </div>
      </div>
    </GuideSection>
  )
}
