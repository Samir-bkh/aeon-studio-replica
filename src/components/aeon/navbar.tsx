

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/aeon-ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/aeon-ui/sheet"
import { siteConfig } from "@/lib/site-config"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Démonstrations", href: "#demonstrations" },
  { label: "Automatisations", href: "#automatisation" },
  { label: "Méthode", href: "#methode" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a
          href="#top"
          className="font-heading text-base font-bold tracking-tight text-foreground"
        >
          {siteConfig.studioName}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            size="lg"
            className="rounded-full px-5"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            Discuter d&apos;un projet
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="border-white/[0.06] bg-background">
          <SheetHeader className="flex-row items-center justify-between space-y-0">
            <SheetTitle className="font-heading text-base">
              {siteConfig.studioName}
            </SheetTitle>
            <SheetClose
              aria-label="Fermer le menu"
              className="rounded-lg p-2 text-muted-foreground hover:text-foreground"
              render={<button type="button" />}
            >
              <X className="size-5" aria-hidden="true" />
            </SheetClose>
          </SheetHeader>
          <ul className="mt-6 flex flex-col gap-1 px-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-foreground/90 hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 px-4">
            <Button
              size="lg"
              className="w-full rounded-full"
              nativeButton={false}
              render={<a href="#contact" onClick={() => setOpen(false)} />}
            >
              Discuter d&apos;un projet
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
