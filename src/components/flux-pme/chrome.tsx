import {
  ArrowLeft,
  BarChart3,
  Inbox,
  PlusCircle,
  RotateCcw,
  Settings,
  Workflow,
} from "lucide-react";

export type Onglet =
  | "apercu"
  | "nouvelle"
  | "demandes"
  | "automatisations"
  | "parametres";

export const ONGLETS: { id: Onglet; label: string; icon: typeof Inbox }[] = [
  { id: "apercu", label: "Vue d'ensemble", icon: BarChart3 },
  { id: "nouvelle", label: "Nouvelle demande", icon: PlusCircle },
  { id: "demandes", label: "Demandes", icon: Inbox },
  { id: "automatisations", label: "Automatisations", icon: Workflow },
  { id: "parametres", label: "Paramètres", icon: Settings },
];

export function DemoBanner({ onReset }: { onReset: () => void }) {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#111827] text-white">
      <div className="mx-auto flex max-w-[110rem] flex-col gap-2 px-4 py-2.5 text-xs sm:text-[13px] lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#38BDF8] px-2.5 py-0.5 text-[11px] font-bold text-[#111827]">
            Démonstration fictive
          </span>
          <p className="leading-snug">
            Simulation interactive créée par Aeon Studio — aucune donnée réelle
            n&apos;est traitée ou envoyée.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium transition-colors hover:bg-white/20"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Réinitialiser la simulation
          </button>
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

export function DemoSidebar({
  onglet,
  onChange,
}: {
  onglet: Onglet;
  onChange: (onglet: Onglet) => void;
}) {
  return (
    <nav
      aria-label="Navigation de la simulation Flux PME"
      className="bg-[#111827] text-white lg:min-h-full lg:w-64 lg:shrink-0"
    >
      <div className="hidden items-center gap-2 px-5 py-6 lg:flex">
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#2563EB]">
          <Workflow className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-sm font-bold">Flux PME</p>
          <p className="text-[11px] text-white/60">Espace de simulation</p>
        </div>
      </div>

      <ul className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-8">
        {ONGLETS.map(({ id, label, icon: Icon }) => {
          const actif = onglet === id;
          return (
            <li key={id} className="shrink-0 lg:w-full">
              <button
                type="button"
                aria-current={actif ? "page" : undefined}
                onClick={() => onChange(id)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  actif
                    ? "bg-[#2563EB] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DemoFooter() {
  return (
    <footer className="border-t border-[#111827]/10 bg-white">
      <div className="mx-auto flex max-w-[110rem] flex-col gap-3 px-4 py-8 text-sm text-[#111827]/70 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl leading-relaxed">
          Flux PME est une interface fictive conçue par Aeon Studio. Toutes les
          données affichées sont inventées, restent dans votre navigateur et ne
          sont transmises à aucun service.
        </p>
        <a
          href="/#demonstrations"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retourner sur Aeon Studio
        </a>
      </div>
    </footer>
  );
}
