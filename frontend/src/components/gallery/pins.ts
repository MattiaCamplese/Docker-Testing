import {
  BellIcon,
  CompassIcon,
  LayersIcon,
  ListChecksIcon,
  MousePointerClickIcon,
  PaletteIcon,
  TextCursorInputIcon,
  type LucideIcon,
} from "lucide-react"

import type * as demos from "@/components/gallery/demos"

export const categories = [
  "Fondamenti",
  "Azioni",
  "Selezione",
  "Input",
  "Comunicazione",
  "Contenimento",
  "Navigazione",
] as const

export type Category = (typeof categories)[number]

// Intestazione di ogni sezione nella pagina Regole.
// hue = tinta OKLCH usata per lo sfondo della sezione (vedi .category-panel in index.css)
export const categoryInfo: Record<Category, { icon: LucideIcon; hue: number; description: string }> = {
  Fondamenti: {
    icon: PaletteIcon,
    hue: 277,
    description: "Colore, tipografia, forma e spazio: le basi di ogni schermata.",
  },
  Azioni: {
    icon: MousePointerClickIcon,
    hue: 322,
    description: "Pulsanti che avviano un'azione, dal più al meno importante.",
  },
  Selezione: { icon: ListChecksIcon, hue: 160, description: "Controlli per scegliere opzioni, stati e valori." },
  Input: {
    icon: TextCursorInputIcon,
    hue: 210,
    description: "Campi e menu per inserire testo e scegliere da una lista.",
  },
  Comunicazione: { icon: BellIcon, hue: 70, description: "Feedback, stato e notifiche per l'utente." },
  Contenimento: { icon: LayersIcon, hue: 25, description: "Superfici che raggruppano e organizzano i contenuti." },
  Navigazione: { icon: CompassIcon, hue: 245, description: "Componenti per spostarsi tra schermate e sezioni." },
}

export type Pin = {
  id: string
  title: string
  category: Category
  description: string
  // Percorso della pagina ufficiale su m3.material.io
  guideline: string
  // Nome della demo, risolto nella card: cosÃ¬ i dati restano leggeri e la home non importa le demo
  demo: keyof typeof demos
  dos: string[]
  donts: string[]
}

export const pins: Pin[] = [
  /* ---------- Fondamenti ---------- */
  {
    id: "color",
    title: "Colore",
    category: "Fondamenti",
    description: "Ruoli colore che danno significato e gerarchia all'interfaccia.",
    guideline: "styles/color",
    demo: "ColorDemo",
    dos: [
      "Usa i ruoli colore (primary, secondary, surface, error) invece di valori fissi",
      "Contrasto minimo 4.5:1 per il testo, 3:1 per testo grande e icone",
    ],
    donts: [
      "Non usare il colore come unico modo per comunicare uno stato",
      "Non usare il colore primary per elementi puramente decorativi",
    ],
  },
  {
    id: "typography",
    title: "Tipografia",
    category: "Fondamenti",
    description: "Scala tipografica in 5 ruoli: Display, Headline, Title, Body, Label.",
    guideline: "styles/typography",
    demo: "TypographyDemo",
    dos: [
      "Usa i ruoli della scala tipografica in modo coerente",
      "Crea gerarchia con dimensione e peso, non con troppi font",
    ],
    donts: [
      "Non mescolare troppi stili diversi nella stessa schermata",
      "Non scrivere paragrafi lunghi tutti in maiuscolo",
    ],
  },
  {
    id: "shape",
    title: "Forma",
    category: "Fondamenti",
    description: "Scala di arrotondamento degli angoli, da none a full.",
    guideline: "styles/shape",
    demo: "ShapeDemo",
    dos: [
      "Applica la scala delle forme in modo coerente per tipo di componente",
      "Usa la forma per attirare l'attenzione o esprimere lo stato",
    ],
    donts: ["Non assegnare arrotondamenti casuali a componenti dello stesso tipo"],
  },
  {
    id: "elevation",
    title: "Elevazione",
    category: "Fondamenti",
    description: "La distanza tra superfici, resa con ombre e colore tonale.",
    guideline: "styles/elevation",
    demo: "ElevationDemo",
    dos: [
      "Usa l'elevazione per separare superfici e indicare gerarchia",
      "Aumenta l'elevazione per elementi temporanei come menu e dialog",
    ],
    donts: ["Non applicare ombre pesanti a molti elementi insieme"],
  },
  {
    id: "layout",
    title: "Layout e spaziatura",
    category: "Fondamenti",
    description: "Regola di progetto: griglia di 8dp. È lo spazio a creare gruppi e gerarchia.",
    guideline: "foundations/layout/understanding-layout/overview",
    demo: "SpacingDemo",
    dos: [
      "Ogni spaziatura è un multiplo di 8dp: 8, 16, 24, 32, 48…",
      "8dp dentro un gruppo, 16dp tra gruppi, 24dp tra componenti, 48dp+ tra sezioni",
      "Dai un'etichetta a ogni gruppo tematico",
      "Distanze uguali per elementi dello stesso livello",
      "Adatta il layout alle window size class: compact < 600dp, medium 600–839dp, expanded ≥ 840dp",
    ],
    donts: [
      "Non usare spaziature fuori griglia (es. 4, 12, 20px)",
      "Non separare con bordi e linee ciò che lo spazio raggruppa già",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibilità",
    category: "Fondamenti",
    description: "Interfacce utilizzabili da tutti, con qualsiasi input e capacità.",
    guideline: "foundations",
    demo: "AccessibilityDemo",
    dos: [
      "Area di tocco minima 48×48dp per ogni elemento interattivo",
      "Etichette accessibili per i pulsanti con sola icona",
      "Focus sempre visibile nella navigazione da tastiera",
    ],
    donts: ["Non affidare informazioni solo al colore o solo al suono"],
  },

  /* ---------- Azioni ---------- */
  {
    id: "buttons",
    title: "Pulsanti",
    category: "Azioni",
    description: "Cinque livelli di enfasi: Filled, Tonal, Elevated, Outlined, Text.",
    guideline: "components/buttons/overview",
    demo: "ButtonsDemo",
    dos: [
      "Una sola azione principale (Filled) per area",
      "Etichette brevi con un verbo: 'Salva', 'Invia'",
      "Scegli l'enfasi in base all'importanza dell'azione",
    ],
    donts: ["Non affiancare più pulsanti Filled in competizione", "Non usare etichette vaghe come 'Clicca qui'"],
  },
  {
    id: "icon-buttons",
    title: "Pulsanti icona",
    category: "Azioni",
    description: "Azioni compatte rappresentate solo da un'icona.",
    guideline: "components/icon-buttons/overview",
    demo: "IconButtonsDemo",
    dos: [
      "Usa icone universalmente riconoscibili",
      "Aggiungi un tooltip e un'etichetta accessibile",
      "Mantieni l'area di tocco a 48dp anche se l'icona è 24dp",
    ],
    donts: ["Non usare icone ambigue senza etichetta"],
  },
  {
    id: "fab",
    title: "Floating action button",
    category: "Azioni",
    description: "L'azione più importante della schermata, sempre in evidenza.",
    guideline: "components/floating-action-button/overview",
    demo: "FabDemo",
    dos: [
      "Un solo FAB per schermata, per l'azione principale",
      "Usa l'Extended FAB quando serve un'etichetta testuale",
    ],
    donts: ["Non usarlo per azioni secondarie o distruttive come 'Elimina'"],
  },
  {
    id: "segmented",
    title: "Segmented button",
    category: "Azioni",
    description: "Per scegliere opzioni, cambiare vista o ordinare elementi.",
    guideline: "components/segmented-buttons/overview",
    demo: "SegmentedDemo",
    dos: ["Da 2 a 5 segmenti", "Etichette brevi, oppure solo icone in modo coerente"],
    donts: ["Non usarlo per la navigazione principale tra sezioni: usa le tabs"],
  },

  /* ---------- Selezione ---------- */
  {
    id: "checkbox",
    title: "Checkbox",
    category: "Selezione",
    description: "Selezione di uno o più elementi da un elenco.",
    guideline: "components/checkbox/overview",
    demo: "CheckboxDemo",
    dos: [
      "Usala quando si possono scegliere più opzioni",
      "Rendi cliccabile anche l'etichetta, non solo il quadratino",
      "Stato indeterminato per un genitore parzialmente selezionato",
    ],
    donts: ["Non usarla per un'impostazione on/off immediata: usa lo switch"],
  },
  {
    id: "radio",
    title: "Radio button",
    category: "Selezione",
    description: "Una sola scelta tra opzioni che si escludono a vicenda.",
    guideline: "components/radio-button/overview",
    demo: "RadioDemo",
    dos: ["Mostra tutte le opzioni contemporaneamente", "Preseleziona l'opzione consigliata quando ha senso"],
    donts: ["Non usarli con molte opzioni: usa un menu", "Non lasciare un singolo radio button isolato"],
  },
  {
    id: "switch",
    title: "Switch",
    category: "Selezione",
    description: "Attiva o disattiva una singola impostazione.",
    guideline: "components/switch/overview",
    demo: "SwitchDemo",
    dos: ["L'effetto è immediato, senza pulsante 'Salva'", "Etichetta chiara che descrive cosa si attiva"],
    donts: ["Non usarlo in un form che richiede una conferma finale: usa la checkbox"],
  },
  {
    id: "slider",
    title: "Slider",
    category: "Selezione",
    description: "Scelta di un valore all'interno di un intervallo.",
    guideline: "components/sliders/overview",
    demo: "SliderDemo",
    dos: ["Mostra il valore selezionato quando la precisione conta", "Usa slider discreti per valori a step"],
    donts: ["Non usarlo quando serve un valore esatto: usa un campo di testo"],
  },
  {
    id: "chips",
    title: "Chips",
    category: "Selezione",
    description: "Assist, filter, input e suggestion: piccoli elementi compatti.",
    guideline: "components/chips/overview",
    demo: "ChipsDemo",
    dos: ["Filter chip per affinare i contenuti", "Scegli il tipo di chip in base al suo ruolo"],
    donts: ["Non usarli al posto dei pulsanti per l'azione principale"],
  },

  /* ---------- Input ---------- */
  {
    id: "text-fields",
    title: "Campi di testo",
    category: "Input",
    description: "Inserimento di testo, in variante filled o outlined.",
    guideline: "components/text-fields/overview",
    demo: "TextFieldDemo",
    dos: [
      "Etichetta sempre visibile sopra o dentro il campo",
      "Testo di supporto sotto il campo per aiuto ed errori",
      "Indica chiaramente i campi obbligatori",
    ],
    donts: ["Non usare il placeholder come unica etichetta", "Non segnalare errori prima che l'utente interagisca"],
  },
  {
    id: "menus",
    title: "Menu",
    category: "Input",
    description: "Una lista di scelte su una superficie temporanea.",
    guideline: "components/menus/overview",
    demo: "MenuDemo",
    dos: ["Raggruppa le voci correlate con divisori", "Etichette brevi, con icone solo se aiutano"],
    donts: ["Non inserire troppe voci: riorganizza o usa sottomenu"],
  },
  {
    id: "select",
    title: "Menu a tendina",
    category: "Input",
    description: "Scelta di un'opzione da una lista lunga in un form.",
    guideline: "components/menus/overview",
    demo: "SelectDemo",
    dos: ["Mostra il valore selezionato nel campo", "Preseleziona un valore sensato quando possibile"],
    donts: ["Non usarlo per 2–3 opzioni: meglio radio o segmented button"],
  },
  {
    id: "search",
    title: "Ricerca",
    category: "Input",
    description: "Search bar e search view per trovare contenuti.",
    guideline: "components/search/overview",
    demo: "SearchDemo",
    dos: ["Posizionala in alto e ben visibile", "Mostra suggerimenti e ricerche recenti"],
    donts: ["Non nasconderla dietro un'icona se la ricerca è l'azione principale"],
  },

  /* ---------- Comunicazione ---------- */
  {
    id: "badges",
    title: "Badge",
    category: "Comunicazione",
    description: "Notifiche e conteggi su icone di navigazione.",
    guideline: "components/badges/overview",
    demo: "BadgeDemo",
    dos: ["Small badge (punto) per segnalare una novità", "Large badge con numero, al massimo 4 caratteri (es. 999+)"],
    donts: ["Non usarli per informazioni critiche", "Non mettere un badge su ogni icona"],
  },
  {
    id: "progress",
    title: "Indicatori di progresso",
    category: "Comunicazione",
    description: "Lineari o circolari, determinati o indeterminati.",
    guideline: "components/progress-indicators/overview",
    demo: "ProgressDemo",
    dos: [
      "Determinato quando conosci la percentuale di avanzamento",
      "Indeterminato quando la durata non è nota",
      "Placeholder (skeleton) per il caricamento dei contenuti",
    ],
    donts: ["Non mostrare più indicatori per la stessa operazione"],
  },
  {
    id: "snackbar",
    title: "Snackbar",
    category: "Comunicazione",
    description: "Brevi messaggi sull'esito di un'azione, in basso nello schermo.",
    guideline: "components/snackbar/overview",
    demo: "SnackbarDemo",
    dos: ["Una sola azione, ad esempio 'Annulla'", "Scompare da sola dopo pochi secondi"],
    donts: [
      "Non usarla per errori critici che richiedono una decisione: usa un dialog",
      "Non mostrare più snackbar contemporaneamente",
    ],
  },
  {
    id: "tooltips",
    title: "Tooltip",
    category: "Comunicazione",
    description: "Plain tooltip per etichette brevi, rich tooltip per più contesto.",
    guideline: "components/tooltips/overview",
    demo: "TooltipDemo",
    dos: ["Usali per dare un nome ai pulsanti con sola icona", "Testo breve e descrittivo"],
    donts: ["Non nascondere informazioni essenziali solo nel tooltip", "Non ripetere un'etichetta già visibile"],
  },

  /* ---------- Contenimento ---------- */
  {
    id: "cards",
    title: "Card",
    category: "Contenimento",
    description: "Contenuti e azioni su un singolo argomento: elevated, filled, outlined.",
    guideline: "components/cards/overview",
    demo: "CardDemo",
    dos: ["Un argomento per card", "Azioni principali in fondo e ben riconoscibili"],
    donts: ["Non sovraccaricarle di contenuti e azioni diverse"],
  },
  {
    id: "dialogs",
    title: "Dialog",
    category: "Contenimento",
    description: "Interrompono il flusso per informazioni critiche o decisioni.",
    guideline: "components/dialogs/overview",
    demo: "DialogDemo",
    dos: [
      "Titolo chiaro, spesso sotto forma di domanda",
      "Azioni esplicite come 'Elimina' / 'Annulla' invece di 'Sì' / 'No'",
    ],
    donts: ["Non usarli per conferme banali: usa una snackbar", "Non aprire un dialog sopra un altro dialog"],
  },
  {
    id: "sheets",
    title: "Side e bottom sheet",
    category: "Contenimento",
    description: "Contenuti supplementari ancorati al bordo dello schermo.",
    guideline: "components/side-sheets/overview",
    demo: "SheetDemo",
    dos: ["Side sheet su schermi ampi, bottom sheet su mobile", "Chiudibili con pulsante, tap sullo scrim o swipe"],
    donts: ["Non usarli per il contenuto principale della pagina"],
  },
  {
    id: "lists",
    title: "Liste",
    category: "Contenimento",
    description: "Elenchi verticali continui di testo e immagini.",
    guideline: "components/lists/overview",
    demo: "ListDemo",
    dos: ["Elementi omogenei e facili da scorrere", "Avatar o icone all'inizio, metadati o azioni alla fine"],
    donts: ["Non mescolare layout diversi nella stessa lista"],
  },
  {
    id: "divider",
    title: "Divider",
    category: "Contenimento",
    description: "Linee sottili che raggruppano contenuti in liste e layout.",
    guideline: "components/divider/overview",
    demo: "DividerDemo",
    dos: ["Full-width tra sezioni, inset tra elementi correlati"],
    donts: ["Non abusarne: spesso bastano spaziatura e raggruppamento"],
  },

  /* ---------- Navigazione ---------- */
  {
    id: "tabs",
    title: "Tabs",
    category: "Navigazione",
    description: "Organizzano contenuti correlati allo stesso livello.",
    guideline: "components/tabs/overview",
    demo: "TabsDemo",
    dos: ["Etichette brevi e chiare", "Primary tabs sotto la top app bar, secondary dentro il contenuto"],
    donts: ["Non annidare tabs dello stesso tipo", "Non usarle per sequenze di passaggi"],
  },
  {
    id: "navigation-bar",
    title: "Navigation bar",
    category: "Navigazione",
    description: "Destinazioni principali su schermi compatti.",
    guideline: "components/navigation-bar/overview",
    demo: "NavigationBarDemo",
    dos: [
      "Da 3 a 5 destinazioni",
      "Icona ed etichetta per ogni destinazione",
      "Su schermi ampi passa a navigation rail o drawer",
    ],
    donts: ["Non usarla per azioni come 'Condividi'"],
  },
  {
    id: "top-app-bar",
    title: "Top app bar",
    category: "Navigazione",
    description: "Titolo e azioni della schermata corrente.",
    guideline: "components/top-app-bar/overview",
    demo: "TopAppBarDemo",
    dos: ["Varianti small, center-aligned, medium e large", "Poche azioni visibili, le altre in un menu overflow"],
    donts: ["Non riempirla di icone"],
  },
]
