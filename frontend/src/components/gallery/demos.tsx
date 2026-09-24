import { useState } from "react"
import {
  ArchiveIcon,
  BellIcon,
  CompassIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  HouseIcon,
  LibraryIcon,
  Loader2Icon,
  MailIcon,
  MenuIcon,
  PencilIcon,
  SearchIcon,
  Share2Icon,
  SlidersHorizontalIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/* ---------- Fondamenti ---------- */

const colorRoles = [
  { name: "Primary", className: "bg-primary text-primary-foreground" },
  { name: "Secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "Surface", className: "bg-background text-foreground border" },
  { name: "Muted", className: "bg-muted text-muted-foreground" },
  { name: "Error", className: "bg-destructive text-white" },
  { name: "Accent", className: "bg-accent text-accent-foreground border" },
]

export function ColorDemo() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {colorRoles.map((role) => (
        <div key={role.name} className={`flex h-16 items-end rounded-xl p-2 text-xs font-medium ${role.className}`}>
          {role.name}
        </div>
      ))}
    </div>
  )
}

export function TypographyDemo() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-4xl font-normal tracking-tight">Display</p>
      <p className="text-2xl">Headline</p>
      <p className="text-lg font-medium">Title</p>
      <p className="text-sm">Body: il testo di lettura principale.</p>
      <p className="text-xs font-medium tracking-wide text-muted-foreground">LABEL</p>
    </div>
  )
}

const shapes = [
  // Scala delle forme M3: 0, 4, 8, 12, 16, 28dp e full
  { name: "None 0", className: "rounded-none" },
  { name: "XS 4", className: "rounded-[4px]" },
  { name: "S 8", className: "rounded-[8px]" },
  { name: "M 12", className: "rounded-[12px]" },
  { name: "L 16", className: "rounded-[16px]" },
  { name: "XL 28", className: "rounded-[28px]" },
]

export function ShapeDemo() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {shapes.map((shape) => (
        <div key={shape.name} className="flex flex-col items-center gap-1">
          <div className={`size-14 bg-primary/80 ${shape.className}`} />
          <span className="text-xs text-muted-foreground">{shape.name}</span>
        </div>
      ))}
    </div>
  )
}

export function ElevationDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {["shadow-none", "shadow-sm", "shadow-md", "shadow-xl"].map((shadow, level) => (
        <div
          key={shadow}
          className={`flex h-16 items-center justify-center rounded-xl bg-background text-xs font-medium ${shadow}`}
        >
          Livello {level}
        </div>
      ))}
    </div>
  )
}

export function SpacingDemo() {
  return (
    <div className="flex flex-col gap-2">
      {[4, 8, 16, 24, 32].map((px) => (
        <div key={px} className="flex items-center gap-3 text-xs">
          <span className="w-10 text-right font-mono text-muted-foreground">{px}dp</span>
          <div className="h-3 rounded-sm bg-primary/70" style={{ width: px * 4 }} />
        </div>
      ))}
    </div>
  )
}

export function AccessibilityDemo() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="relative flex size-12 items-center justify-center rounded-lg border-2 border-dashed border-primary/60">
        <HeartIcon className="size-6" />
        <span className="absolute -bottom-5 text-[10px] text-muted-foreground">48×48dp</span>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <span className="rounded bg-foreground px-2 py-1 text-background">Contrasto 4.5:1 ✓</span>
        <span className="rounded bg-muted px-2 py-1 text-muted-foreground/40">Contrasto basso ✗</span>
      </div>
    </div>
  )
}

/* ---------- Azioni ---------- */

export function ButtonsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button className="rounded-full px-4">Filled</Button>
      <Button variant="secondary" className="rounded-full px-4">
        Tonal
      </Button>
      <Button variant="outline" className="rounded-full px-4">
        Outlined
      </Button>
      <Button variant="ghost" className="rounded-full px-4">
        Text
      </Button>
    </div>
  )
}

export function IconButtonsDemo() {
  const actions = [
    { label: "Aggiungi ai preferiti", icon: HeartIcon },
    { label: "Condividi", icon: Share2Icon },
    { label: "Altre opzioni", icon: EllipsisVerticalIcon },
  ]
  return (
    <div className="flex justify-center gap-2">
      {actions.map(({ label, icon: Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger
            render={<Button variant="ghost" size="icon-lg" className="rounded-full" aria-label={label} />}
          >
            <Icon />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function FabDemo() {
  return (
    <div className="relative h-32 rounded-xl border border-dashed bg-background">
      <span className="absolute top-3 left-3 text-xs text-muted-foreground">Schermata</span>
      <Button
        className="absolute right-3 bottom-3 h-14 gap-2 rounded-2xl px-4 shadow-lg"
        onClick={() => toast("Nuova nota creata")}
      >
        <PencilIcon className="size-5" />
        Scrivi
      </Button>
    </div>
  )
}

export function SegmentedDemo() {
  return (
    <ToggleGroup variant="outline" defaultValue={["week"]} className="w-full">
      <ToggleGroupItem value="day" className="flex-1">
        Giorno
      </ToggleGroupItem>
      <ToggleGroupItem value="week" className="flex-1">
        Settimana
      </ToggleGroupItem>
      <ToggleGroupItem value="month" className="flex-1">
        Mese
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

/* ---------- Selezione ---------- */

export function CheckboxDemo() {
  const items = ["Email", "Notifiche push", "SMS"]
  return (
    <div className="flex flex-col gap-3 text-sm">
      {items.map((item, i) => (
        <label key={item} className="flex items-center gap-3">
          <Checkbox defaultChecked={i === 0} />
          {item}
        </label>
      ))}
    </div>
  )
}

export function RadioDemo() {
  return (
    <RadioGroup defaultValue="standard" className="text-sm">
      {[
        { value: "standard", label: "Standard (3-5 giorni)" },
        { value: "express", label: "Express (24h)" },
        { value: "pickup", label: "Ritiro in negozio" },
      ].map((option) => (
        <label key={option.value} className="flex items-center gap-3">
          <RadioGroupItem value={option.value} />
          {option.label}
        </label>
      ))}
    </RadioGroup>
  )
}

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <label className="flex items-center justify-between">
        Wi-Fi
        <Switch defaultChecked />
      </label>
      <label className="flex items-center justify-between">
        Modalità aereo
        <Switch />
      </label>
    </div>
  )
}

export function SliderDemo() {
  const [volume, setVolume] = useState(40)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-sm">
        <span>Volume</span>
        <span className="font-mono text-muted-foreground">{volume}</span>
      </div>
      <Slider
        defaultValue={[volume]}
        onValueChange={(value) => setVolume(typeof value === "number" ? value : value[0])}
      />
    </div>
  )
}

export function ChipsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {["Vegetariano", "Senza glutine", "Veloce", "Economico"].map((chip, i) => (
        <Toggle key={chip} variant="outline" size="sm" defaultPressed={i < 2} className="rounded-lg">
          {chip}
        </Toggle>
      ))}
    </div>
  )
}

/* ---------- Input ---------- */

export function TextFieldDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="demo-name">Nome *</Label>
        <Input id="demo-name" placeholder="Mario Rossi" />
        <p className="text-xs text-muted-foreground">Come compare sul tuo profilo</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="demo-email" className="text-destructive">
          Email *
        </Label>
        <Input id="demo-email" defaultValue="mario@" aria-invalid />
        <p className="text-xs text-destructive">Inserisci un indirizzo email valido</p>
      </div>
    </div>
  )
}

export function MenuDemo() {
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          <EllipsisVerticalIcon />
          Azioni
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <PencilIcon />
            Modifica
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2Icon />
            Condividi
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ArchiveIcon />
            Archivia
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Elimina
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const countries = [
  { value: "it", label: "Italia" },
  { value: "fr", label: "Francia" },
  { value: "de", label: "Germania" },
  { value: "es", label: "Spagna" },
  { value: "pt", label: "Portogallo" },
  { value: "ch", label: "Svizzera" },
]

export function SelectDemo() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Paese</Label>
      <Select items={countries} defaultValue="it">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.value} value={country.value}>
              {country.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function SearchDemo() {
  return (
    <div className="relative">
      <SearchIcon className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="h-12 rounded-full pr-4 pl-11" placeholder="Cerca nelle note" aria-label="Cerca nelle note" />
    </div>
  )
}

/* ---------- Comunicazione ---------- */

export function BadgeDemo() {
  return (
    <div className="flex justify-center gap-8">
      <div className="relative">
        <MailIcon className="size-6" />
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive" />
      </div>
      <div className="relative">
        <BellIcon className="size-6" />
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-3 h-4 bg-destructive px-1 text-[10px] text-white"
        >
          3
        </Badge>
      </div>
      <div className="relative">
        <BellIcon className="size-6" />
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-5 h-4 bg-destructive px-1 text-[10px] text-white"
        >
          999+
        </Badge>
      </div>
    </div>
  )
}

export function ProgressDemo() {
  return (
    <div className="flex flex-col gap-5">
      <Progress value={64}>
        <ProgressLabel>Caricamento file</ProgressLabel>
        <ProgressValue />
      </Progress>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2Icon className="size-5 animate-spin text-primary" />
        Sincronizzazione…
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  )
}

export function SnackbarDemo() {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onClick={() =>
          toast("Conversazione archiviata", {
            action: { label: "Annulla", onClick: () => toast("Ripristinata") },
          })
        }
      >
        <ArchiveIcon />
        Archivia
      </Button>
    </div>
  )
}

export function TooltipDemo() {
  return (
    <div className="flex justify-center">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon-lg" aria-label="Filtri" />}>
          <SlidersHorizontalIcon />
        </TooltipTrigger>
        <TooltipContent>Filtri</TooltipContent>
      </Tooltip>
    </div>
  )
}

/* ---------- Contenimento ---------- */

export function CardDemo() {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="h-24 bg-gradient-to-br from-primary/60 via-primary/30 to-muted" />
      <div className="flex flex-col gap-2 p-4">
        <p className="font-medium">Weekend a Firenze</p>
        <p className="text-sm text-muted-foreground">3 giorni tra musei, trattorie e colline.</p>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" size="sm">
            Salva
          </Button>
          <Button size="sm">Prenota</Button>
        </div>
      </div>
    </div>
  )
}

export function DialogDemo() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          <Trash2Icon />
          Elimina bozza
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminare la bozza?</DialogTitle>
            <DialogDescription>
              La bozza verrà eliminata definitivamente e non potrà essere recuperata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Annulla</DialogClose>
            <DialogClose render={<Button variant="destructive" />} onClick={() => toast("Bozza eliminata")}>
              Elimina
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function SheetDemo() {
  return (
    <div className="flex justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          <SlidersHorizontalIcon />
          Apri filtri
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filtri</SheetTitle>
            <SheetDescription>Contenuto supplementare accanto a quello principale.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4">
            <CheckboxDemo />
            <Separator />
            <SliderDemo />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const people = [
  { initials: "GB", name: "Giulia Bianchi", text: "Ci vediamo alle 18?" },
  { initials: "LV", name: "Luca Verdi", text: "Ho caricato i file" },
  { initials: "SR", name: "Sara Russo", text: "Grazie mille!" },
]

export function ListDemo() {
  return (
    <ul className="flex flex-col">
      {people.map((person) => (
        <li key={person.name} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-background">
          <Avatar size="lg">
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-medium">{person.name}</span>
            <span className="truncate text-xs text-muted-foreground">{person.text}</span>
          </div>
          <span className="text-xs text-muted-foreground">10:42</span>
        </li>
      ))}
    </ul>
  )
}

export function DividerDemo() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <span>Sezione A</span>
      <Separator />
      <span>Sezione B</span>
      <div className="flex flex-col gap-3 pl-6">
        <span className="text-muted-foreground">Elemento correlato 1</span>
        <Separator />
        <span className="text-muted-foreground">Elemento correlato 2</span>
      </div>
    </div>
  )
}

/* ---------- Navigazione ---------- */

export function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="w-full">
        <TabsTrigger value="overview">Panoramica</TabsTrigger>
        <TabsTrigger value="specs">Specifiche</TabsTrigger>
        <TabsTrigger value="reviews">Recensioni</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-2 text-muted-foreground">
        Descrizione generale del prodotto.
      </TabsContent>
      <TabsContent value="specs" className="p-2 text-muted-foreground">
        Dimensioni, peso e materiali.
      </TabsContent>
      <TabsContent value="reviews" className="p-2 text-muted-foreground">
        4,6 ★ su 128 recensioni.
      </TabsContent>
    </Tabs>
  )
}

const destinations = [
  { label: "Home", icon: HouseIcon },
  { label: "Esplora", icon: CompassIcon },
  { label: "Libreria", icon: LibraryIcon },
  { label: "Profilo", icon: UserIcon },
]

export function NavigationBarDemo() {
  const [active, setActive] = useState("Home")
  return (
    <nav className="grid grid-cols-4 rounded-xl bg-background py-3">
      {destinations.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => setActive(label)}
          aria-current={active === label ? "page" : undefined}
          className="flex flex-col items-center gap-1 text-xs"
        >
          <span
            className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
              active === label ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
            }`}
          >
            <Icon className="size-5" />
          </span>
          <span className={active === label ? "font-medium" : "text-muted-foreground"}>{label}</span>
        </button>
      ))}
    </nav>
  )
}

export function TopAppBarDemo() {
  return (
    <div className="flex items-center gap-1 rounded-xl bg-background px-2 py-2">
      <Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Menu">
        <MenuIcon />
      </Button>
      <span className="flex-1 px-2 text-lg">Messaggi</span>
      <Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Cerca">
        <SearchIcon />
      </Button>
      <Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Altre opzioni">
        <EllipsisVerticalIcon />
      </Button>
    </div>
  )
}
