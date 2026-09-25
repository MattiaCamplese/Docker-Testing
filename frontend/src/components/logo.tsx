import { useId } from "react"

type LogoMarkProps = {
  className?: string
}

// Marchio: quattro "tessere" di forme diverse (quadrato, cerchio, pillola, foglia),
// come componenti UI impilati in un container
export function LogoMark({ className }: LogoMarkProps) {
  const gradientId = useId()

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--brand-1)" />
          <stop offset="0.55" stopColor="var(--brand-2)" />
          <stop offset="1" stopColor="var(--brand-3)" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill={`url(#${gradientId})`} />
      <rect x="14" y="14" width="16" height="16" rx="4" fill="white" />
      <circle cx="42" cy="22" r="8" fill="white" fillOpacity="0.85" />
      <rect x="14" y="34" width="16" height="16" rx="8" fill="white" fillOpacity="0.65" />
      <path d="M34 50V42a8 8 0 0 1 8-8h8v8a8 8 0 0 1-8 8z" fill="white" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="size-10 drop-shadow-sm" />
      <span className="text-lg tracking-tight whitespace-nowrap">
        <span className="font-semibold">Canon</span> <span className="text-muted-foreground">UI</span>
      </span>
    </span>
  )
}
