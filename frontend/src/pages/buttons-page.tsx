import { AnatomySection } from "@/components/buttons-guide/anatomy-section"
import { GoogleRulesSection } from "@/components/buttons-guide/google-rules-section"
import { GuideSection } from "@/components/buttons-guide/guide-section"
import { HierarchySection } from "@/components/buttons-guide/hierarchy-section"
import { ShapeSection } from "@/components/buttons-guide/shape-section"
import { SizesSection } from "@/components/buttons-guide/sizes-section"
import { StatesSection } from "@/components/buttons-guide/states-section"
import { TypesSection } from "@/components/buttons-guide/types-section"

const summary = [
  { value: "1", label: "primario al massimo per pagina" },
  { value: "3", label: "livelli: primario, secondario, terziario" },
  { value: "1", label: "distruttivo al massimo" },
  { value: "3", label: "altezze: 36, 48 e 56px" },
]

const rules = [
  "Mai due primari nella stessa pagina",
  "Il secondario esiste solo se c'è il primario",
  "Tutti gli altri pulsanti sono terziari",
  "Disattiva il pulsante quando l'azione non è disponibile",
  "Tre parti uguali ai lati: margine, etichetta, margine",
  "Angoli leggermente arrotondati, concentrici alla card",
]

export function ButtonsPage() {
  return (
    <div className="demo-vivid mx-auto flex max-w-[96rem] flex-col gap-12 px-4 py-12">
      <title>Pulsanti · Docker Testing</title>

      <div className="flex max-w-3xl flex-col gap-4">
        <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">Pulsanti</h1>
        <p className="text-lg text-muted-foreground">
          Le regole del progetto per usare i pulsanti in modo coerente, costruite sulle linee guida Material Design 3 di
          Google. Tutti gli esempi della pagina usano il componente <code>AppButton</code>.
        </p>
      </div>

      <GuideSection
        index="01"
        title="Le regole in breve"
        description="Se ricordi solo questo, i pulsanti della tua interfaccia saranno già chiari e prevedibili."
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 rounded-[24px] bg-muted p-6">
              <span className="text-5xl font-normal text-primary">{item.value}</span>
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rules.map((rule, i) => (
            <li key={rule} className="flex items-center gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {i + 1}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </GuideSection>

      <TypesSection />
      <HierarchySection />
      <AnatomySection />
      <SizesSection />
      <StatesSection />
      <ShapeSection />
      <GoogleRulesSection />
    </div>
  )
}
