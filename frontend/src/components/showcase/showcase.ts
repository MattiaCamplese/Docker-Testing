import type * as demos from "@/components/showcase/demos"

export const showcaseCategories = ["Ricerca", "Commercio", "Media e social", "Produttività", "Dati"] as const

export type ShowcaseCategory = (typeof showcaseCategories)[number]

// Ogni categoria è un colore della tavolozza (tinta OKLCH + nome da pittore)
export const paints: Record<ShowcaseCategory, { hue: number; name: string }> = {
  Ricerca: { hue: 258, name: "Blu cobalto" },
  Commercio: { hue: 32, name: "Vermiglione" },
  "Media e social": { hue: 345, name: "Magenta" },
  Produttività: { hue: 78, name: "Ocra gialla" },
  Dati: { hue: 165, name: "Verde smeraldo" },
}

export type ShowcaseItem = {
  id: string
  title: string
  category: ShowcaseCategory
  // Prodotti in cui il pattern è diventato riconoscibile (solo come riferimento)
  inspiredBy: string[]
  description: string
  why: string[]
  // Nome della demo, risolto nella card: cosÃ¬ i dati restano leggeri e la home non importa le demo
  demo: keyof typeof demos
}

export const showcase: ShowcaseItem[] = [
  {
    id: "segmented-search",
    title: "Ricerca segmentata",
    category: "Ricerca",
    inspiredBy: ["Airbnb", "Booking"],
    description: "Una barra unica che divide la ricerca in domande semplici.",
    demo: "SegmentedSearchDemo",
    why: [
      "Una domanda complessa diventa tre domande semplici",
      "Il segmento attivo si solleva: lo stato è chiaro senza testo",
      "Un solo pulsante d'azione, sempre nello stesso punto",
    ],
  },
  {
    id: "command-palette",
    title: "Command palette",
    category: "Ricerca",
    inspiredBy: ["Linear", "Vercel", "Raycast", "GitHub"],
    description: "Tutte le azioni dell'app a portata di tastiera. Prova le frecce e Invio.",
    demo: "CommandPaletteDemo",
    why: [
      "Ogni azione è raggiungibile senza mouse",
      "Le scorciatoie accanto alle voci si imparano usandole",
      "I risultati si filtrano mentre scrivi, raggruppati per tipo",
    ],
  },
  {
    id: "pricing",
    title: "Piani e prezzi",
    category: "Commercio",
    inspiredBy: ["Stripe", "Notion", "Figma"],
    description: "Scelta del piano con quello consigliato già evidenziato.",
    demo: "PricingDemo",
    why: [
      "Il piano consigliato è preselezionato: meno fatica di scelta",
      "Il risparmio annuale è esplicito, non va calcolato",
      "Il pulsante ripete il nome del piano scelto",
    ],
  },
  {
    id: "checkout",
    title: "Pagamento con carta",
    category: "Commercio",
    inspiredBy: ["Stripe Checkout", "Shopify"],
    description: "Un modulo di pagamento corto, chiaro e rassicurante.",
    demo: "CheckoutDemo",
    why: [
      "I campi della carta sono uniti come su una carta vera",
      "Il numero si formatta a gruppi di 4 mentre digiti",
      "Il pulsante mostra l'importo esatto e un lucchetto: nessuna sorpresa",
    ],
  },
  {
    id: "product-card",
    title: "Scheda prodotto",
    category: "Commercio",
    inspiredBy: ["Apple Store"],
    description: "Il prodotto al centro, con varianti che cambiano l'anteprima.",
    demo: "ProductCardDemo",
    why: [
      "L'anteprima cambia subito con la finitura scelta",
      "Molto spazio attorno al prodotto: è lui il protagonista",
      'Due azioni con gerarchia chiara: "Acquista" e "Scopri di più"',
    ],
  },
  {
    id: "ride-options",
    title: "Scelta tra opzioni",
    category: "Commercio",
    inspiredBy: ["Uber", "Bolt"],
    description: "Opzioni confrontabili in un pannello dal basso.",
    demo: "RideOptionsDemo",
    why: [
      "Ogni opzione ha lo stesso layout: si confronta a colpo d'occhio",
      "La selezione si vede dal bordo, non solo dal colore",
      "Il pulsante conferma esattamente la scelta fatta",
    ],
  },
  {
    id: "music-player",
    title: "Lettore musicale",
    category: "Media e social",
    inspiredBy: ["Spotify", "Apple Music"],
    description: "Controlli di riproduzione con una gerarchia visiva evidente.",
    demo: "MusicPlayerDemo",
    why: [
      "Play è il controllo più grande e sta al centro",
      "I controlli secondari sono più piccoli e simmetrici",
      "Gli stati attivi (preferito, casuale) si riconoscono dal colore",
    ],
  },
  {
    id: "stories",
    title: "Storie",
    category: "Media e social",
    inspiredBy: ["Instagram", "WhatsApp"],
    description: 'Contenuti nuovi segnalati da un anello colorato. Tocca per "vederli".',
    demo: "StoriesDemo",
    why: [
      "Anello colorato = contenuto nuovo, anello grigio = già visto",
      "Lo stato si legge senza bisogno di testo o numeri",
      "Scorrimento orizzontale: non ruba spazio al contenuto principale",
    ],
  },
  {
    id: "chat",
    title: "Chat",
    category: "Media e social",
    inspiredBy: ["iMessage", "WhatsApp", "Messenger"],
    description: "Bolle di messaggi con indicatore di scrittura. Prova a scrivere.",
    demo: "ChatDemo",
    why: [
      "Posizione e colore distinguono subito chi parla",
      "L'angolo meno arrotondato indica da che parte arriva il messaggio",
      "Invio disattivato finché il messaggio è vuoto",
    ],
  },
  {
    id: "issue-list",
    title: "Lista attività",
    category: "Produttività",
    inspiredBy: ["Linear", "Jira", "GitHub Issues"],
    description: "Tante informazioni in poco spazio, ancora leggibili. Tocca lo stato.",
    demo: "IssueListDemo",
    why: [
      "Ogni informazione ha una colonna fissa: l'occhio sa dove guardare",
      "Lo stato usa icona e colore insieme",
      "Codici in monospace, facili da leggere e citare",
    ],
  },
  {
    id: "settings-list",
    title: "Impostazioni a gruppi",
    category: "Produttività",
    inspiredBy: ["iOS", "Android"],
    description: "Voci raggruppate per tema, con il comportamento indicato a destra.",
    demo: "SettingsListDemo",
    why: [
      "Gruppi separati dallo spazio e con un'etichetta",
      "Icone colorate per ritrovare le voci a colpo d'occhio",
      "A destra valore, interruttore o freccia dicono cosa succede al tocco",
    ],
  },
  {
    id: "empty-state",
    title: "Stato vuoto",
    category: "Produttività",
    inspiredBy: ["Dropbox", "Notion", "Slack"],
    description: "Una schermata vuota che invita all'azione invece di sembrare rotta.",
    demo: "EmptyStateDemo",
    why: [
      "Spiega cosa apparirà qui, non solo che non c'è niente",
      "Un'illustrazione leggera rende lo schermo accogliente",
      "Una sola azione principale per uscire dal vuoto",
    ],
  },
  {
    id: "kpi",
    title: "KPI con andamento",
    category: "Dati",
    inspiredBy: ["Stripe Dashboard", "Vercel Analytics"],
    description: "Un numero chiave con variazione e trend. Cambia il periodo.",
    demo: "KpiDemo",
    why: [
      "Il numero è il protagonista: grande e in alto",
      "La variazione ha segno, colore e freccia: non si fraintende",
      "La sparkline mostra il trend senza assi né griglie superflue",
    ],
  },
]
