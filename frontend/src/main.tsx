import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import "./index.css"
import { AppLayout } from "@/components/app-layout.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Toaster } from "@/components/ui/sonner.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { HomePage } from "@/pages/home-page.tsx"

// La home è nel bundle principale; le altre pagine vengono scaricate solo quando si aprono
// (code splitting): il primo caricamento resta leggero
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    HydrateFallback: () => null,
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
