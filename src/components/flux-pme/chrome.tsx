import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Menu, Workflow, X } from "lucide-react";

export const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Processus", href: "#processus" },
  { label: "Bénéfices", href: "#benefices" },
  { label: "Intégrations", href: "#integrations" },
  { label: "Contact", href: "#contact" },
];

export function DemoBanner() {
  return (
    <div className="sticky top-0 z-60 w-full bg-[#0d1117] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-1 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[13px]">
        <p className="leading-snug">
          <span className="font-semibold">Démonstration fictive</span> créée par
          Aeon Studio — Flux PME n&apos;est pas un produit réel.
        </p>
        <a
          href="/#demonstrations"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium underline-offset-4 transition-colors hover:bg-white/20 hover:underline"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Retour au portfolio
        </a>
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
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0d1117]/95 backdrop-blur">
      <nav
        aria-label="Navigation du site Flux PME"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#accueil"
          className="flex items-center gap-2 text-[#58a6ff]"
          onClick={() => setOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#1f6feb]">
            <Workflow className="size-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-bold tracking-tight text-white">
            Flux PME
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
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
            className="hidden rounded-full bg-[#1f6feb] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1f6feb]/90 sm:inline-flex"
          >
            Demander une démo
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile-flux"
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
          id="menu-mobile-flux"
          ref={panelRef}
          className="border-t border-white/[0.08] bg-[#0d1117] lg:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/5"
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
                className="w-full rounded-full bg-[#1f6feb] px-5 py-3 text-sm font-semibold text-white"
              >
                Demander une démo
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
    <footer className="bg-[#0d1117] text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold text-white">Flux PME</p>
            <p className="mt-2 text-sm text-[#58a6ff]">Démonstration fictive</p>
            <p className="mt-1 text-sm text-white/60">
              Automatisation pour PME
            </p>
          </div>
          <nav aria-label="Liens du pied de page">
            <p className="text-sm font-semibold text-white">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <a href="#processus" className="hover:text-white hover:underline">
                  Processus
                </a>
              </li>
              <li>
                <a href="#benefices" className="hover:text-white hover:underline">
                  Bénéfices
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <p className="text-sm leading-relaxed text-white/60 lg:col-span-2">
            Flux PME est un concept fictif créé uniquement pour présenter une
            démonstration de site web. Aucune donnée n&apos;est collectée et
            aucun service n&apos;est réellement proposé.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            Démonstration conçue par Aeon Studio.
          </p>
          <a
            href="/#demonstrations"
            className="inline-flex items-center gap-2 rounded-full bg-[#1f6feb] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#0d1117]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Retourner sur Aeon Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
