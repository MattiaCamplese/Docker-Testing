import { AppButton } from "@/components/app-button"
import { GuideSection } from "@/components/buttons-guide/guide-section"

const sizes = [
  {
    size: "sm",
    name: "Piccolo",
    height: 36,
    margin: 16,
    specs: [
      ["Margini", "16px"],
      ["Testo", "14px"],
      ["Raggio", "8px"],
      ["Icona", "16px"],
      ["Larghezza minima", "72px"],
      ["Area di tocco", "48px (estesa)"],
    ],
    use: "Interfacce dense: toolbar, tabelle, card piccole.",
  },
  {
    size: "md",
    name: "Medio",
    height: 48,
    margin: 24,
    specs: [
      ["Margini", "24px"],
      ["Testo", "14px"],
      ["Raggio", "12px"],
      ["Icona", "18px"],
      ["Larghezza minima", "96px"],
      ["Area di tocco", "48px"],
    ],
    use: "La dimensione standard: form, dialog, card.",
  },
  {
    size: "lg",
    name: "Grande",
    height: 56,
    margin: 32,
    specs: [
      ["Margini", "32px"],
      ["Testo", "16px"],
      ["Raggio", "16px"],
      ["Icona", "20px"],
      ["Larghezza minima", "112px"],
      ["Area di tocco", "56px"],
    ],
    use: "Azione principale in evidenza: hero, mobile, onboarding.",
  },
] as const

export function SizesSection() {
  return (
    <GuideSection
      index="05"
      title="Dimensioni"
      description="Solo tre altezze: 36, 48 e 56px. Nella stessa area usa una sola dimensione, così i pulsanti restano allineati."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {sizes.map((s) => (
          <article key={s.size} className="flex flex-col gap-4 rounded-[28px] border bg-background p-4">
            <div className="flex h-40 items-center justify-center rounded-[12px] bg-muted">
              {/* Pulsante + quota delle tre parti: margine | etichetta | margine */}
              <div className="inline-grid gap-2">
                <AppButton variant="primary" size={s.size}>
                  Continua
                </AppButton>
                <div
                  className="grid font-mono text-[10px] text-muted-foreground"
                  style={{ gridTemplateColumns: `${s.margin}px 1fr ${s.margin}px` }}
                >
                  <span className="border-t border-current pt-2 text-center">{s.margin}</span>
                  <span className="border-t border-dashed border-current pt-2 text-center">testo</span>
                  <span className="border-t border-current pt-2 text-center">{s.margin}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-2 pb-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium">{s.name}</h3>
                  <span className="font-mono text-2xl">{s.height}px</span>
                </div>
                <p className="text-sm text-muted-foreground">{s.use}</p>
              </div>
              <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-sm">
                {s.specs.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="text-right font-mono">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </GuideSection>
  )
}
