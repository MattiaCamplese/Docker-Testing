import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"

import "./index.css"
import { AppLayout } from "@/components/app-layout.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Toaster } from "@/components/ui/sonner.tsx"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { AnimationsPage } from "@/pages/animations-page.tsx"
import { BackendDemoPage } from "@/pages/backend-demo-page.tsx"
import { ButtonsPage } from "@/pages/buttons-page.tsx"
import { HomePage } from "@/pages/home-page.tsx"
import { NotFoundPage } from "@/pages/not-found-page.tsx"
import { RulesPage } from "@/pages/rules-page.tsx"
import { ShowcasePage } from "@/pages/showcase-page.tsx"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/regole", element: <RulesPage /> },
      { path: "/animazioni", element: <AnimationsPage /> },
      { path: "/pulsanti", element: <ButtonsPage /> },
      { path: "/ispirazione", element: <ShowcasePage /> },
      { path: "/demo-backend", element: <BackendDemoPage /> },
      { path: "*", element: <NotFoundPage /> },
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
