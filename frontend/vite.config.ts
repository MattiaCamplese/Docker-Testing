import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    // Su Windows i bind mount di Docker non propagano gli eventi dei file:
    // serve il polling per l'hot reload dentro il container
    watch: { usePolling: process.env.VITE_USE_POLLING === "true" },
    // Le chiamate a /api vanno al backend (in Docker: il servizio "app")
    proxy: {
      "/api": process.env.API_URL ?? "http://localhost:3001",
    },
  },
})
