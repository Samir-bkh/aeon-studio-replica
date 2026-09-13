

import { useState } from "react"
import { Link2, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/aeon-ui/dialog"
import { siteConfig } from "@/lib/site-config"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Démonstrations", href: "#demonstrations" },
  { label: "Automatisations", href: "#automatisation" },
  { label: "Méthode", href: "#methode" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const [legalOpen, setLegalOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-[#0D111A]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-heading text-base font-bold text-foreground">
              {siteConfig.studioName}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Sites web et automatisations pour artisans, TPE et PME.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.city}, {siteConfig.country}
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {siteConfig.email ? (
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                    {siteConfig.email}
                  </a>
                ) : (
                  <span>Adresse e-mail à venir</span>
                )}
              </li>
              {siteConfig.linkedin && (
                <li className="flex items-center gap-2">
                  <Link2 className="size-4 shrink-0" aria-hidden="true" />
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.studioName}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setLegalOpen(true)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Mentions légales
            </button>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>

      <Dialog open={legalOpen} onOpenChange={setLegalOpen}>
        <DialogContent className="max-w-lg sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Mentions légales
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/[0.06] p-3 text-amber-200/90">
              Contenu provisoire à titre d&apos;exemple. Informations légales
              à compléter avant le lancement commercial.
            </p>
            <p>
              Éditeur du site : {siteConfig.studioName}, {siteConfig.city},{" "}
              {siteConfig.country}.
            </p>
            <p>
              Hébergement : le site est hébergé par un prestataire
              d&apos;hébergement web à préciser.
            </p>
            <p>
              Contact : les coordonnées de contact seront ajoutées à cet
              emplacement.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-lg sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Politique de confidentialité
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/[0.06] p-3 text-amber-200/90">
              Contenu provisoire à titre d&apos;exemple. Politique à compléter
              avant le lancement commercial.
            </p>
            <p>
              Les informations transmises via le formulaire de contact sont
              utilisées uniquement pour répondre à votre demande.
            </p>
            <p>
              Aucune donnée n&apos;est cédée à des tiers. Vous pouvez demander
              la suppression de vos informations à tout moment.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
