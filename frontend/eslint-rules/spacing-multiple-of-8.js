// Regola di progetto: ogni spaziatura (padding, margin, gap, space, inset, posizioni)
// deve essere un multiplo di 8px. In Tailwind 1 unità = 4px, quindi sono ammesse
// solo le classi con valore pari: p-2 (8px), gap-4 (16px), mt-6 (24px)…
const SPACING_CLASS =
  /(?<![\w-])(-?)(p[xytblrse]?|m[xytblrse]?|gap(?:-[xy])?|space-[xy]|inset(?:-[xy])?|top|bottom|left|right)-(\d+(?:\.\d+)?)(?![\w./])/g

function suggest(value) {
  const lower = Math.floor(value / 2) * 2
  const upper = lower + 2
  return lower === 0 ? `${upper}` : `${lower} o ${upper}`
}

export default {
  meta: {
    type: "suggestion",
    docs: { description: "Spaziature solo in multipli di 8px" },
    messages: {
      notMultipleOf8: "'{{cls}}' vale {{px}}px: usa multipli di 8px (valore {{suggestion}}).",
    },
    schema: [],
  },
  create(context) {
    function check(node, text) {
      for (const match of text.matchAll(SPACING_CLASS)) {
        const value = Number(match[3])
        const px = value * 4
        if (px % 8 !== 0) {
          context.report({
            node,
            messageId: "notMultipleOf8",
            data: { cls: match[0], px, suggestion: suggest(value) },
          })
        }
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value)
      },
      TemplateElement(node) {
        check(node, node.value.raw)
      },
    }
  },
}
