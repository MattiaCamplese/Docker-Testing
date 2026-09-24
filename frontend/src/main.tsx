import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { BackendInfo } from "@/components/backend-info.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TodoList } from "@/components/todo-list.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <main className="flex min-h-svh justify-center p-6">
        <div className="flex w-full max-w-md flex-col gap-4">
          <BackendInfo />
          <TodoList />
          <p className="text-center font-mono text-xs text-muted-foreground">
            (Premi <kbd>d</kbd> per il tema scuro)
          </p>
        </div>
      </main>
    </ThemeProvider>
  </StrictMode>
)
