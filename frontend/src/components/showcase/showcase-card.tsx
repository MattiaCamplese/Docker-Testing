import type { CSSProperties } from "react"

import { paints, type ShowcaseItem } from "@/components/showcase/showcase"

// Leggere rotazioni "a mano" per tavole e nastri, scelte in base alla posizione
const rotations = [-2, 1.5, -1, 2, -1.5, 1, -0.5]
const tapeRotations = [-4, 3, -2, 5, -3, 2]

type ShowcaseCardProps = {
  item: ShowcaseItem
  index: number
}

// Una tavola del moodboard: foglio fissato con il nastro, demo dal vivo,
// titolo scritto a mano, "timbri" dei riferimenti e un post-it con il perché funziona
export function ShowcaseCard({ item, index }: ShowcaseCardProps) {
  const Demo = item.demo
  const paint = paints[item.category]
  const style = {
    "--paint-hue": paint.hue,
    "--rot": `${rotations[index % rotations.length]}deg`,
    "--tape-rot": `${tapeRotations[index % tapeRotations.length]}deg`,
  } as CSSProperties

  return (
    <article
      style={style}
      className="paint group relative mb-12 rotate-(--rot) break-inside-avoid rounded-[4px] bg-card p-4 pt-8 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_16px_32px_-16px_rgb(0_0_0/0.25)] hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl motion-safe:transition-[rotate,translate,box-shadow] motion-safe:duration-300"
    >
      <span className="washi-tape" aria-hidden="true" />

      <div className="paint-wash rounded-[2px] p-4">
        <Demo />
      </div>

      <div className="flex flex-col gap-4 px-2 pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-hand text-4xl leading-none">{item.title}</h2>
            <span className="shrink-0 font-hand text-xl text-(--paint)">{paint.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>

        {/* Timbri: dove trovi questo pattern */}
        <ul className="flex flex-wrap gap-2" aria-label="Ispirato a">
          {item.inspiredBy.map((name, i) => (
            <li
              key={name}
              className={`rounded-[4px] border-2 border-dashed border-(--paint) px-2 text-xs leading-6 font-medium tracking-wide text-(--paint) uppercase ${
                i % 2 ? "rotate-1" : "-rotate-1"
              }`}
            >
              {name}
            </li>
          ))}
        </ul>

        {/* Post-it: perché funziona */}
        <div className="paint-note relative rotate-1 rounded-[2px] p-4 shadow-sm">
          <h3 className="font-hand text-2xl leading-none">Perché funziona</h3>
          <ul className="flex flex-col gap-2 pt-2 text-sm">
            {item.why.map((reason) => (
              <li key={reason} className="flex gap-2">
                <span className="font-hand text-xl leading-5 text-(--paint)" aria-hidden="true">
                  ✓
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
