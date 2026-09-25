import {
  ClapperboardIcon,
  HouseIcon,
  LayoutGridIcon,
  RectangleHorizontalIcon,
  ServerIcon,
  SparklesIcon,
} from "lucide-react"
import { Link, NavLink, Outlet, ScrollRestoration, useNavigation } from "react-router"

import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Destinazioni, sempre con icona + etichetta (short = etichetta breve per la barra mobile).
// La barra mobile di M3 ne ammette al massimo 5: quelle con mobile: false restano solo su desktop
const destinations = [
  { to: "/", label: "Home", short: "Home", icon: HouseIcon },
  { to: "/regole", label: "Regole", short: "Regole", icon: LayoutGridIcon },
  { to: "/pulsanti", label: "Pulsanti", short: "Pulsanti", icon: RectangleHorizontalIcon },
  { to: "/animazioni", label: "Animazioni", short: "Animaz.", icon: ClapperboardIcon },
  { to: "/ispirazione", label: "Ispirazione", short: "Ispira", icon: SparklesIcon },
  { to: "/demo-backend", label: "Demo backend", short: "Demo", icon: ServerIcon, mobile: false },
]

export function AppLayout() {
  // Pagina successiva in download (le pagine sono caricate su richiesta)
  const loading = useNavigation().state === "loading"

  return (
    <div className="flex min-h-svh flex-col">
      <div className="app-background" aria-hidden="true" />

      {/* Top app bar: titolo + poche azioni */}
      <header className="sticky top-0 z-30 h-16 border-b bg-background/70 backdrop-blur-lg">
        {loading && (
          <div
            role="progressbar"
            aria-label="Caricamento pagina"
            className="absolute inset-x-0 -bottom-px h-0.5 origin-left animate-pulse bg-primary"
          />
        )}
        {/* Tre colonne: logo | destinazioni | azioni. Le laterali sono uguali (1fr), così le
            destinazioni restano centrate sulla pagina qualunque sia la larghezza di logo e azioni */}
        <div className="mx-auto grid h-full max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 justify-self-start rounded-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Logo />
          </Link>

          {/* Schermi ampi: destinazioni nella top app bar */}
          <nav className="hidden items-center gap-2 lg:flex" aria-label="Principale">
            {destinations.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Azioni, sempre nella terza colonna (anche quando le destinazioni sono nascoste) */}
          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            {/* Schermi compatti: la barra in basso ha posto per 5 destinazioni, la demo backend diventa un'azione della top app bar */}
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="size-10 rounded-full lg:hidden"
                    nativeButton={false}
                    render={<Link to="/demo-backend" />}
                    aria-label="Demo backend"
                  />
                }
              >
                <ServerIcon />
              </TooltipTrigger>
              <TooltipContent>Demo backend</TooltipContent>
            </Tooltip>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24 lg:pb-0">
        <Outlet />
      </main>

      {/* Schermi compatti e medi: navigation bar in basso */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-background/95 pt-2 pb-4 backdrop-blur lg:hidden"
        aria-label="Principale"
      >
        {destinations
          .filter((d) => d.mobile !== false)
          .map(({ to, short, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className="group flex flex-col items-center gap-2 text-xs">
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className={isActive ? "font-medium" : "text-muted-foreground"}>{short}</span>
                </>
              )}
            </NavLink>
          ))}
      </nav>

      <ScrollRestoration />
    </div>
  )
}
