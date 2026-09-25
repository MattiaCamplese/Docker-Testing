# Canone UI · Frontend

App React 19 + TypeScript + Vite, con componenti shadcn/ui (Base UI) e Tailwind CSS v4.
Si avvia con Docker dalla cartella principale: vedi il [README del progetto](../README.md).

## Pagine

| Percorso        | Pagina                                                             |
| --------------- | ------------------------------------------------------------------ |
| `/`             | Home                                                               |
| `/regole`       | Galleria delle regole Material Design 3, con demo dal vivo         |
| `/animazioni`   | Pagina didattica in stile streaming: sfondi, stondature, movimento |
| `/pulsanti`     | Guida ai pulsanti del progetto                                     |
| `/ispirazione`  | Componenti iconici delle grandi aziende, come moodboard            |
| `/demo-backend` | Chiamate all'API e todo list                                       |

Solo la home è nel bundle principale: le altre pagine sono caricate quando si aprono (`lazy` in `src/main.tsx`).

## Struttura

```
src/
  main.tsx              router e provider
  index.css             token di colore, temi (chiaro/scuro, .cinema, .demo-vivid) e classi dei componenti
  pages/                una pagina per percorso
  components/
    app-layout.tsx      top app bar, navigation bar mobile, sfondo
    app-button.tsx      pulsante del progetto (vedi sotto)
    ui/                 componenti shadcn generati: non modificarli a mano se non serve
    gallery/ buttons-guide/ showcase/ cinema/   componenti delle singole pagine
public/films/           locandine di pubblico dominio (WebP), crediti in CREDITS.md
eslint-rules/           regola ESLint locale per la spaziatura
```

## Regole del progetto

- **Pulsanti:** usa `AppButton` / `AppButtonLink`, non il `Button` di shadcn.
  - Al massimo un `primary` per pagina. Il `secondary` si usa solo se c'è il primario. Tutti gli altri pulsanti sono `tertiary`, più al massimo un `destructive`.
  - Le altezze sono tre: `sm` 36px, `md` 48px, `lg` 56px.
  - Quando l'azione non è disponibile, il pulsante va disattivato.
  - Eccezioni: le chip di filtro e le demo dei componenti Material 3 nella pagina Regole.
- **Spaziatura:** padding, margini, gap e posizioni sono multipli di 8px. La regola ESLint `spacing/multiple-of-8` segnala i valori dispari; i componenti in `components/ui` sono esclusi.
- **Colori:** i colori sono in OKLCH. Per le miscele usa `color-mix(in oklab, …)`: in oklch, mescolando col bianco o col nero, la tinta si sposta.
- **Accessibilità:**
  - le aree di tocco sono di almeno 48px;
  - ogni pulsante con sola icona ha un `aria-label`;
  - le animazioni rispettano `prefers-reduced-motion`.
