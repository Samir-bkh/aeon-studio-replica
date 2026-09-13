import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Hammer, Menu, X } from "lucide-react";

export type DemoMode = "avant" | "apres";

export const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Prestations", href: "#prestations" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Méthode", href: "#methode" },
  { label: "Contact", href: "#contact" },
];

export function DemoBanner({
  mode,
  onModeChange,
}: {
  mode: DemoMode;
  onModeChange: (mode: DemoMode) => void;
}) {
  return (
    <div className="sticky top-0 z-60 w-full bg-[#18212F] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 text-xs sm:text-[13px] lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#F59E0B] px-2.5 py-0.5 text-[11px] font-bold text-[#18212F]">
            Concept fictif
          </span>
          <p className="leading-snug">
            Démonstration fictive créée par Aeon Studio — Nova Rénovation
            n&apos;est pas une entreprise réelle.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Choisir la version du site à afficher"
            className="inline-flex rounded-full bg-white/10 p-0.5"
          >
            {(
              [
                { value: "avant", label: "Avant" },
                { value: "apres", label: "Après" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={mode === option.value}
                onClick={() => onModeChange(option.value)}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors ${
                  mode === option.value
                    ? "bg-white text-[#18212F]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <a
            href="/#demonstrations"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium underline-offset-4 transition-colors hover:bg-white/20 hover:underline"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Retour au portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export function DemoNav({ onDevis }: { onDevis: () => void }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#132238]/10 bg-white/95 backdrop-blur">
      <nav
        aria-label="Navigation du site Nova Rénovation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#accueil"
          className="flex items-center gap-2 text-[#132238]"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#2563EB]">
            <Hammer className="size-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-bold tracking-tight">
            Nova Rénovation
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#132238]/70 underline-offset-4 transition-colors hover:text-[#2563EB] hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDevis}
            className="hidden rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8] sm:inline-flex"
          >
            Demander une estimation
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#132238]/15 text-[#132238] lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile-nova"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="menu-mobile-nova"
          ref={panelRef}
          className="border-t border-[#132238]/10 bg-white lg:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-[#132238] transition-colors hover:bg-[#F8FAFC]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="px-3 pt-2 pb-3">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onDevis();
                }}
                className="w-full rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white"
              >
                Demander une estimation
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function DemoFooter() {
  return (
    <footer className="bg-[#132238] text-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold">Nova Rénovation</p>
            <p className="mt-2 text-sm text-[#F59E0B]">Démonstration fictive</p>
            <p className="mt-1 text-sm text-[#F8FAFC]/75">
              Strasbourg et Bas-Rhin
            </p>
          </div>
          <nav aria-label="Liens du pied de page">
            <p className="text-sm font-semibold">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-[#F8FAFC]/75">
              <li>
                <a href="#prestations" className="hover:text-white hover:underline">
                  Prestations
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-white hover:underline">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="#methode" className="hover:text-white hover:underline">
                  Méthode
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-sm leading-relaxed text-[#F8FAFC]/75 lg:col-span-2">
            <p>
              Nova Rénovation est une marque fictive créée uniquement pour
              présenter une démonstration de site web. Aucune donnée n&apos;est
              collectée, aucun devis n&apos;est établi et aucun service
              n&apos;est réellement proposé.
            </p>
            <p className="mt-3">
              Mentions obligatoires : les textes, visuels, chiffres et exemples
              présentés sont fictifs et servent uniquement d&apos;illustration.
              Les photographies proviennent de banques d&apos;images libres de
              droits.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#F8FAFC]/70">
            Démonstration conçue par Aeon Studio.
          </p>
          <a
            href="/#demonstrations"
            className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#132238]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retourner sur Aeon Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
