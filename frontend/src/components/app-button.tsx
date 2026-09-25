import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Link, type LinkProps } from "react-router"

import { cn } from "@/lib/utils"

// Sistema pulsanti del progetto:
// - 4 tipologie: primary (max 1 per pagina), secondary (solo se c'è il primary),
//   tertiary (tutti gli altri), destructive (max 1)
// - 3 dimensioni: sm 36px, md 48px, lg 56px; icone proporzionate al testo (16, 18, 20px)
// - Tre parti: margine | etichetta | margine, margini sempre uguali, larghezza minima = 2 × altezza
// - Stati Material 3: livello di stato del colore del testo, 8% hover, 10% focus e pressione;
//   disattivato con contenitore al 12% e testo al 38%
const appButton = cva(
  [
    "relative isolate inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap select-none",
    "transition-[background-color,box-shadow,color] duration-150 outline-none",
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-0 after:transition-opacity",
    "not-disabled:hover:after:opacity-[0.08] focus-visible:after:opacity-10 not-disabled:active:after:opacity-10",
    "focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:shadow-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm not-disabled:hover:shadow-md disabled:bg-foreground/12 disabled:text-foreground/38",
        secondary: "bg-secondary text-secondary-foreground disabled:bg-foreground/12 disabled:text-foreground/38",
        tertiary: "text-primary disabled:text-foreground/38",
        destructive: "bg-destructive/10 text-destructive disabled:bg-foreground/12 disabled:text-foreground/38",
      },
      size: {
        // 36px visivi, ma area di tocco estesa a 48px (6px sopra e sotto) come chiede Material 3
        sm: "h-9 min-w-18 rounded-[8px] px-4 text-sm before:absolute before:inset-x-0 before:-inset-y-[6px] [&_svg]:size-4",
        md: "h-12 min-w-24 rounded-[12px] px-6 text-sm [&_svg]:size-4.5",
        lg: "h-14 min-w-28 rounded-[16px] px-8 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "tertiary",
      size: "md",
    },
  }
)

export type AppButtonProps = ComponentProps<"button"> & VariantProps<typeof appButton>

export function AppButton({ className, variant, size, type = "button", ...props }: AppButtonProps) {
  return <button type={type} className={cn(appButton({ variant, size }), className)} {...props} />
}

// Stesso aspetto, ma naviga verso un'altra pagina (link del router)
export type AppButtonLinkProps = LinkProps & VariantProps<typeof appButton>

export function AppButtonLink({ className, variant, size, ...props }: AppButtonLinkProps) {
  return <Link className={cn(appButton({ variant, size }), className)} {...props} />
}
