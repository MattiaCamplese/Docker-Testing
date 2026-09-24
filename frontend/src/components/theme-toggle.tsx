import { MoonIcon, SunIcon } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  function toggleTheme() {
    setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark")
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="size-10 rounded-full"
            onClick={toggleTheme}
            aria-label="Cambia tema"
          />
        }
      >
        <SunIcon className="hidden dark:block" />
        <MoonIcon className="dark:hidden" />
      </TooltipTrigger>
      <TooltipContent>Cambia tema (d)</TooltipContent>
    </Tooltip>
  )
}
