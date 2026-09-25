import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import "./index.css"
import { AppLayout } from "@/components/app-layout.tsx"
import { RouteError } from "@/components/route-error.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Toaster } from "@/components/ui/sonner.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { HomePage } from "@/pages/home-page.tsx"

// Dopo un nuovo deploy i vecchi file delle pagine non esistono più: se una scheda aperta da prima
// prova a scaricarne uno, ricarichiamo una volta sola per prendere la versione nuova.
// Al massimo una ricarica ogni 10 secondi: se il problema è un altro (es. rete assente) niente ciclo
// di ricariche, e compare la pagina d'errore con il pulsante "Ricarica"
const RELOAD_KEY = "last-stale-chunk-reload"
window.addEventListener("vite:preloadError", (event) => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0)
    if (Date.now() - last < 10_000) return
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

// La home è nel bundle principale; le altre pagine vengono scaricate solo quando si aprono
// (code splitting): il primo caricamento resta leggero
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    HydrateFallback: () => null,
    children: [
      {
        // Gli errori di una pagina restano dentro il layout: la navigazione resta visibile
        errorElement: <RouteError />,
        children: [
          { path: "/", element: <HomePage /> },
          {
            path: "/regole",
            lazy: async () => ({ Component: (await import("@/pages/rules-page.tsx")).RulesPage }),
          },
          {
            path: "/animazioni",
            lazy: async () => ({ Component: (await import("@/pages/animations-page.tsx")).AnimationsPage }),
          },
          {
            path: "/pulsanti",
            lazy: async () => ({ Component: (await import("@/pages/buttons-page.tsx")).ButtonsPage }),
          },
          {
            path: "/ispirazione",
            lazy: async () => ({ Component: (await import("@/pages/showcase-page.tsx")).ShowcasePage }),
          },
          {
            path: "/demo-backend",
            lazy: async () => ({ Component: (await import("@/pages/backend-demo-page.tsx")).BackendDemoPage }),
          },
          {
            path: "*",
            lazy: async () => ({ Component: (await import("@/pages/not-found-page.tsx")).NotFoundPage }),
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
