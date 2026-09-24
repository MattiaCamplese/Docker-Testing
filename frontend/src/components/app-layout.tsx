import { HouseIcon, LayoutGridIcon, ServerIcon } from "lucide-react"
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router"

import { ThemeToggle } from "@/components/theme-toggle"

// M3 navigation: 3–5 destinazioni, sempre con icona + etichetta
const destinations = [
  { to: "/", label: "Home", icon: HouseIcon },
  { to: "/regole", label: "Regole", icon: LayoutGridIcon },
  { to: "/demo-backend", label: "Demo backend", icon: ServerIcon },
]

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Top app bar: titolo + poche azioni */}
      <header className="sticky top-0 z-30 h-16 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-full max-w-[96rem] items-center gap-2 px-4">
          <Link
            to="/"
            className="mr-auto flex items-center gap-3 rounded-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              M3
            </span>
            <span className="text-lg font-medium">Docker Testing</span>
          </Link>

          {/* Schermi medi e ampi: destinazioni nella top app bar */}
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Principale">
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

          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 pb-24 sm:pb-0">
        <Outlet />
      </main>

      {/* Schermi compatti: navigation bar in basso */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t bg-background/95 pt-3 pb-4 backdrop-blur sm:hidden"
        aria-label="Principale"
      >
        {destinations.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className="group flex flex-col items-center gap-1 text-xs">
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-16 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <span className={isActive ? "font-medium" : "text-muted-foreground"}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <ScrollRestoration />
    </div>
  )
}
