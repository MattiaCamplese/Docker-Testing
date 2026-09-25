import { useState } from "react"
import { RotateCcwIcon } from "lucide-react"

import { AppButton } from "@/components/app-button"
import { GuideSection } from "@/components/buttons-guide/guide-section"
import { films } from "@/components/cinema/films"
import { ListToggle } from "@/components/cinema/movie-row"
import { PosterArt } from "@/components/cinema/poster"

// Curve di accelerazione a confronto (valori Material 3 per standard ed emphasized decelerate)
const easings = [
  { name: "Lineare", value: "linear", note: "Meccanica, innaturale: usala solo per progressi e rotazioni continue." },
  { name: "Standard", value: "cubic-bezier(0.2, 0, 0, 1)", note: "Per la maggior parte delle transizioni." },
  {
    name: "Enfatizzata in uscita",
    value: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    note: "Parte veloce e frena dolcemente: ideale per elementi che entrano.",
  },
]

const specs = [
  {
    what: "Zoom della scheda",
    duration: "300ms",
    delay: "400ms",
    easing: "ease-out",
    property: "transform: scale(1.25)",
  },
  { what: "Anteprima sulla scheda", duration: "300ms", delay: "500ms", easing: "ease", property: "opacity" },
  {
    what: "Scorrimento della riga",
    duration: "~500ms",
    delay: "—",
    easing: "smooth (browser)",
    property: "scrollLeft",
  },
  { what: "Copertina in dissolvenza", duration: "700ms", delay: "ogni 7s", easing: "ease-in-out", property: "opacity" },
  {
    what: "Zoom lento copertina",
    duration: "24s",
    delay: "—",
    easing: "ease-in-out, alternato",
    property: "transform",
  },
  { what: "Aggiungi alla lista", duration: "300ms", delay: "—", easing: "ease", property: "transform: rotate + scale" },
]

function EasingDemo() {
  const [moved, setMoved] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      {easings.map((e) => (
        <div key={e.name} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-medium">{e.name}</span>
            <code className="text-xs text-muted-foreground">{e.value}</code>
          </div>
          {/* Il contenitore mobile è largo quanto la pista meno la pallina: translateX(100%) la porta a fine corsa */}
          <div className="relative h-8 rounded-full bg-muted">
            <div
              className="absolute inset-y-0 right-8 left-0 transition-transform duration-1000"
              style={{ transform: moved ? "translateX(100%)" : "none", transitionTimingFunction: e.value }}
            >
              <span className="block size-8 rounded-full bg-primary shadow-lg" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{e.note}</span>
        </div>
      ))}
      <div>
        <AppButton variant="primary" onClick={() => setMoved(!moved)}>
          <RotateCcwIcon className={`transition-transform duration-500 ${moved ? "-rotate-180" : ""}`} />
          {moved ? "Torna indietro" : "Riproduci"}
        </AppButton>
      </div>
    </div>
  )
}

function LoadingDemo() {
  const [loading, setLoading] = useState(false)
  const [round, setRound] = useState(0)

  function reload() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setRound((r) => r + 1)
    }, 1600)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {films.slice(4, 8).map((film, i) =>
          loading ? (
            <div
              key={film.id}
              className="aspect-video rounded-[4px] bg-[linear-gradient(90deg,var(--muted)_25%,oklch(0.32_0.006_20)_50%,var(--muted)_75%)] bg-[length:200%_100%] motion-safe:animate-shimmer"
            />
          ) : (
            // Entrata a cascata: ogni scheda parte 80ms dopo la precedente
            <div
              key={`${film.id}-${round}`}
              className="motion-safe:animate-in motion-safe:duration-500 motion-safe:fill-mode-both motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <PosterArt film={film} className="aspect-video rounded-[4px]" />
            </div>
          )
        )}
      </div>
      <div>
        <AppButton onClick={reload} disabled={loading}>
          {loading ? "Caricamento…" : "Simula caricamento"}
        </AppButton>
      </div>
    </div>
  )
}

export function MotionLesson() {
  const [listed, setListed] = useState(false)

  return (
    <GuideSection
      index="03"
      title="Animazioni: come e perché"
      description="Ogni movimento ha uno scopo: far capire cosa è cambiato. Si animano solo transform e opacity (fluidi anche su telefoni lenti) e tutto si ferma se il sistema chiede di ridurre il movimento."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">Curve di accelerazione</h3>
          <EasingDemo />
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Caricamento: scheletro e entrata a cascata</h3>
            <p className="text-sm text-muted-foreground">
              Mentre i dati arrivano, sagome che luccicano tengono il posto; poi le locandine entrano una dopo l'altra.
            </p>
            <LoadingDemo />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Micro-interazione: aggiungi alla lista</h3>
            <div className="flex items-center gap-4">
              <ListToggle listed={listed} onToggle={() => setListed(!listed)} />
              <span className="text-sm text-muted-foreground">
                Il + ruota e si trasforma in spunta: la conferma arriva nello stesso punto in cui hai toccato.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="pb-4 text-left font-medium">Le animazioni di questa pagina</caption>
          <thead className="text-muted-foreground">
            <tr className="border-b">
              {["Animazione", "Durata", "Ritardo", "Curva", "Proprietà"].map((h) => (
                <th key={h} className="py-2 pr-4 font-normal">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((s) => (
              <tr key={s.what} className="border-b last:border-0">
                <td className="py-2 pr-4">{s.what}</td>
                <td className="py-2 pr-4 font-mono">{s.duration}</td>
                <td className="py-2 pr-4 font-mono">{s.delay}</td>
                <td className="py-2 pr-4 font-mono">{s.easing}</td>
                <td className="py-2 pr-4 font-mono text-muted-foreground">{s.property}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GuideSection>
  )
}
