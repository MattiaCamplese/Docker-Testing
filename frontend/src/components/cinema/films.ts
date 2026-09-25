// Film reali con locandine di pubblico dominio (Wikimedia Commons, vedi public/films/CREDITS.md).
// Compatibilità ed età consigliata sono valori simulati per la demo.
export type Film = {
  id: string
  title: string
  year: number
  duration: string
  director: string
  // Valutazione da 1 a 5 stelle (inventata per la demo)
  stars: 1 | 2 | 3 | 4 | 5
  rating: string
  match: number
  genres: string[]
  image: string
  // Punto dell'immagine da tenere inquadrato quando la locandina viene ritagliata (object-position)
  focus: string
  // Tinte OKLCH di riserva, usate se l'immagine non si carica
  hues: [number, number]
  plot: string
  source: string
}

export const films: Film[] = [
  {
    id: "il-mondo-perduto",
    title: "Il mondo perduto",
    year: 1925,
    duration: "1h 33m",
    director: "Harry O. Hoyt",
    stars: 4,
    rating: "7+",
    match: 97,
    genres: ["Avventura", "Fantascienza"],
    image: "/films/il-mondo-perduto.webp",
    focus: "center 30%",
    hues: [140, 60],
    plot: "Una spedizione in Sud America scopre un altopiano dove i dinosauri sono ancora vivi. Uno di loro finirà per le strade di Londra.",
    source: "https://commons.wikimedia.org/wiki/File:The_Lost_World_(1925)_-_film_poster.jpg",
  },
  {
    id: "il-fantasma-dell-opera",
    title: "Il fantasma dell'Opera",
    year: 1925,
    duration: "1h 33m",
    director: "Rupert Julian",
    stars: 4,
    rating: "12+",
    match: 95,
    genres: ["Horror", "Muto"],
    image: "/films/il-fantasma-dell-opera.webp",
    focus: "center 35%",
    hues: [30, 60],
    plot: "Nei sotterranei dell'Opéra di Parigi vive un uomo mascherato, ossessionato dalla voce di una giovane soprano.",
    source: "https://commons.wikimedia.org/wiki/File:Phantom_of_the_opera_1925_poster.jpg",
  },
  {
    id: "la-febbre-dell-oro",
    title: "La febbre dell'oro",
    year: 1925,
    duration: "1h 35m",
    director: "Charlie Chaplin",
    stars: 5,
    rating: "Per tutti",
    match: 94,
    genres: ["Commedia", "Avventura"],
    image: "/films/la-febbre-dell-oro.webp",
    focus: "center 40%",
    hues: [70, 40],
    plot: "Il Vagabondo sfida la neve dell'Alaska in cerca d'oro, tra fame, bufere e una capanna in bilico sul precipizio.",
    source: "https://commons.wikimedia.org/wiki/File:Gold_rush_poster.jpg",
  },
  {
    id: "il-monello",
    title: "Il monello",
    year: 1921,
    duration: "1h 8m",
    director: "Charlie Chaplin",
    stars: 5,
    rating: "Per tutti",
    match: 92,
    genres: ["Commedia", "Dramma"],
    image: "/films/il-monello.webp",
    focus: "center 25%",
    hues: [20, 80],
    plot: "Un vagabondo trova un neonato abbandonato e lo cresce come un figlio, tra piccoli espedienti e un grande affetto.",
    source: "https://commons.wikimedia.org/wiki/File:The_Kid_(1921)_poster.jpg",
  },
  {
    id: "corazzata-potemkin",
    title: "La corazzata Potëmkin",
    year: 1925,
    duration: "1h 15m",
    director: "Sergej Ejzenštejn",
    stars: 5,
    rating: "12+",
    match: 90,
    genres: ["Dramma", "Storico"],
    image: "/films/corazzata-potemkin.webp",
    focus: "center 30%",
    hues: [60, 250],
    plot: "Nel 1905 i marinai di una nave da guerra si ribellano ai loro ufficiali, e la rivolta arriva fino alla scalinata di Odessa.",
    source: "https://commons.wikimedia.org/wiki/File:Vintage_Potemkin.jpg",
  },
  {
    id: "il-gobbo-di-notre-dame",
    title: "Il gobbo di Notre-Dame",
    year: 1923,
    duration: "1h 40m",
    director: "Wallace Worsley",
    stars: 3,
    rating: "12+",
    match: 88,
    genres: ["Dramma", "Storico"],
    image: "/films/il-gobbo-di-notre-dame.webp",
    focus: "center 30%",
    hues: [200, 40],
    plot: "Quasimodo, il campanaro di Notre-Dame, protegge la giovane Esmeralda da una Parigi che l'ha già condannata.",
    source: "https://commons.wikimedia.org/wiki/File:The_Hunchback_of_Notre_Dame_(theatrical_poster,_1923).jpg",
  },
  {
    id: "intolerance",
    title: "Intolerance",
    year: 1916,
    duration: "2h 43m",
    director: "D. W. Griffith",
    stars: 4,
    rating: "12+",
    match: 86,
    genres: ["Dramma", "Storico"],
    image: "/films/intolerance.webp",
    focus: "center 40%",
    hues: [30, 10],
    plot: "Quattro storie di epoche diverse, da Babilonia al Novecento, raccontano come l'intolleranza attraversa la storia.",
    source: "https://commons.wikimedia.org/wiki/File:Intolerance_(film).jpg",
  },
  {
    id: "plan-9",
    title: "Plan 9 from Outer Space",
    year: 1957,
    duration: "1h 19m",
    director: "Ed Wood",
    stars: 2,
    rating: "12+",
    match: 83,
    genres: ["Fantascienza", "Cult"],
    image: "/films/plan-9.webp",
    focus: "center 45%",
    hues: [0, 220],
    plot: "Gli alieni risvegliano i morti per fermare l'umanità prima che costruisca un'arma capace di distruggere l'universo.",
    source: "https://commons.wikimedia.org/wiki/File:Plan_9_Alternative_poster.jpg",
  },
  {
    id: "viaggio-nella-luna",
    title: "Viaggio nella Luna",
    year: 1902,
    duration: "14m",
    director: "Georges Méliès",
    stars: 5,
    rating: "Per tutti",
    match: 91,
    genres: ["Fantascienza", "Muto"],
    image: "/films/viaggio-nella-luna.webp",
    focus: "center",
    hues: [260, 0],
    plot: "Un gruppo di astronomi viene sparato verso la Luna con un cannone e atterra dritto nell'occhio del suo volto.",
    source: "https://commons.wikimedia.org/wiki/File:Voyage_dans_la_lune_title_card.png",
  },
]

export function filmById(id: string) {
  return films.find((film) => film.id === id)!
}

// ---------- Ricerca ----------

// Generi presenti nel catalogo, dal più frequente
export const genres = Object.entries(
  films
    .flatMap((film) => film.genres)
    .reduce<Record<string, number>>((count, genre) => {
      count[genre] = (count[genre] ?? 0) + 1
      return count
    }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([genre]) => genre)

// Confronto senza maiuscole né accenti: "perche" trova "Perché"
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

// Ogni parola cercata deve comparire in titolo, generi, anno o trama
export function filterFilms(query: string, genre: string | null): Film[] {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  return films.filter((film) => {
    if (genre && !film.genres.includes(genre)) return false
    const haystack = normalize([film.title, film.year, ...film.genres, film.plot].join(" "))
    return words.every((word) => haystack.includes(word))
  })
}
