import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import spacingMultipleOf8 from "./eslint-rules/spacing-multiple-of-8.js"

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Regola di design: spaziature solo in multipli di 8px (vedi eslint-rules/)
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/components/ui/**"],
    plugins: { spacing: { rules: { "multiple-of-8": spacingMultipleOf8 } } },
    rules: {
      "spacing/multiple-of-8": "error",
    },
  },
  {
    // I componenti generati da shadcn esportano anche le varianti (es. buttonVariants)
    files: ["src/components/ui/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
])
