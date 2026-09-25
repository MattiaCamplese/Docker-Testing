import { AppButton } from "@/components/app-button"
import { Example, GuideSection } from "@/components/buttons-guide/guide-section"

// Curve concentriche: raggio card = raggio pulsante + margine della card (16px)
const pairs = [
  { size: "sm", button: 8, card: 24, cardClass: "rounded-[24px]" },
  { size: "md", button: 12, card: 28, cardClass: "rounded-[28px]" },
  { size: "lg", button: 16, card: 32, cardClass: "rounded-[32px]" },
] as const

export function ShapeSection() {
  return (
    <GuideSection
      index="07"
      title="Forma allineata alla card"
      description="Angoli leggermente arrotondati, mai a pillola né squadrati. La curva del pulsante segue quella della card che lo contiene: raggio della card = raggio del pulsante + margine."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {pairs.map((p) => (
          <figure key={p.size} className="flex flex-col gap-4">
            <div
              className={`flex h-40 flex-col justify-between border-2 border-primary/30 bg-background p-4 ${p.cardClass}`}
            >
              <span className="px-2 pt-2 text-sm text-muted-foreground">Card {p.card}px</span>
              <div className="flex justify-end">
                <AppButton variant="primary" size={p.size}>
                  Continua
                </AppButton>
              </div>
            </div>
            <figcaption className="text-center font-mono text-sm">
              {p.button}px + 16px = <span className="text-primary">{p.card}px</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Example ok={false} caption="A pillola dentro una card poco arrotondata: le due curve non dialogano.">
          <AppButton variant="primary" className="rounded-full">
            Continua
          </AppButton>
        </Example>
        <Example ok={false} caption="Squadrato dentro una card arrotondata: sembra un elemento estraneo.">
          <AppButton variant="primary" className="rounded-none">
            Continua
          </AppButton>
        </Example>
      </div>
    </GuideSection>
  )
}
