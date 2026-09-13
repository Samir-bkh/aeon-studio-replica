import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Compass,
  Home,
  Layers,
  PaintRoller,
  Ruler,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";

import { NovaModal } from "./modal";

const PHOTOS = {
  hero: "https://images.pexels.com/photos/4756489/pexels-photo-4756489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  kitchenBefore:
    "https://images.pexels.com/photos/36035072/pexels-photo-36035072.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  kitchenAfter:
    "https://images.pexels.com/photos/29412579/pexels-photo-29412579.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  bathroomBefore:
    "https://images.pexels.com/photos/5691495/pexels-photo-5691495.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  bathroomAfter:
    "https://images.pexels.com/photos/35493890/pexels-photo-35493890.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  livingBefore:
    "https://images.pexels.com/photos/5691550/pexels-photo-5691550.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  livingAfter:
    "https://images.pexels.com/photos/6474133/pexels-photo-6474133.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
};

const PILLARS = [
  {
    icon: Compass,
    title: "Étude personnalisée",
    text: "Chaque projet commence par une analyse du logement, des usages et du budget réellement disponible.",
  },
  {
    icon: ClipboardList,
    title: "Étapes définies",
    text: "Le déroulé du chantier est écrit à l'avance : ce qui est inclus, ce qui ne l'est pas, et dans quel ordre.",
  },
  {
    icon: UserRound,
    title: "Interlocuteur dédié",
    text: "Une seule personne suit le dossier du premier échange jusqu'à la réception des travaux.",
  },
];

export function DemoHero({ onDevis }: { onDevis: () => void }) {
  return (
    <section id="accueil" className="bg-[#F8FAFC] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#2563EB]">
            Entreprise de rénovation à Strasbourg
          </p>
          <h1 className="mt-4 font-heading text-3xl leading-tight font-bold text-[#132238] sm:text-4xl lg:text-5xl">
            Une rénovation expliquée avant d&apos;être commencée
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#132238]/75">
            Rénovation complète, cuisine, salle de bain, peinture et
            aménagement. Vous savez qui intervient, dans quel ordre et sur
            quelle base le prix a été calculé.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onDevis}
              className="rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              Demander une estimation
            </button>
            <a
              href="#realisations"
              className="rounded-full border border-[#132238]/20 px-6 py-3 text-center text-sm font-semibold text-[#132238] transition-colors hover:bg-white"
            >
              Voir les concepts de réalisations
            </a>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="rounded-2xl border border-[#132238]/10 bg-white p-4"
              >
                <Icon className="size-5 text-[#F59E0B]" aria-hidden="true" />
                <p className="mt-3 font-heading text-sm font-semibold text-[#132238]">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#132238]/70">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl shadow-xl shadow-[#132238]/10">
            <div className="h-64 sm:h-80 lg:h-[26rem]">
              <img
                src={PHOTOS.hero}
                alt="Pièce en cours de rénovation avec poutres apparentes"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#132238]/60">
            Visuels utilisés uniquement à titre d&apos;illustration.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Prestations                                                         */
/* ------------------------------------------------------------------ */

export const PROJECT_TYPES = [
  "Rénovation complète",
  "Cuisine",
  "Salle de bain",
  "Peinture et finitions",
  "Aménagement",
  "Autre",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

const SERVICES: {
  icon: typeof Home;
  title: string;
  text: string;
  type: ProjectType;
  details: string[];
}[] = [
  {
    icon: Home,
    title: "Rénovation complète",
    text: "Transformation d'un logement ou d'un local, de la dépose aux finitions.",
    type: "Rénovation complète",
    details: [
      "Évaluation de l'état initial et repérage des contraintes",
      "Coordination de l'ensemble des corps d'état",
      "Suivi de chantier et réception détaillée",
    ],
  },
  {
    icon: Wrench,
    title: "Cuisine",
    text: "Création ou modernisation d'une cuisine pensée pour les usages quotidiens.",
    type: "Cuisine",
    details: [
      "Plan d'implantation adapté à la pièce",
      "Électricité, plomberie et raccordements",
      "Plan de travail et rangements sur mesure",
    ],
  },
  {
    icon: Layers,
    title: "Salle de bain",
    text: "Rénovation de pièces d'eau, de la douche à l'étanchéité et à la ventilation.",
    type: "Salle de bain",
    details: [
      "Étanchéité et évacuation traitées en priorité",
      "Douche accessible ou baignoire selon l'usage",
      "Ventilation et éclairage adaptés à l'humidité",
    ],
  },
  {
    icon: PaintRoller,
    title: "Peinture et finitions",
    text: "Préparation des supports et finitions soignées, murs, plafonds et boiseries.",
    type: "Peinture et finitions",
    details: [
      "Traitement des fissures et des imperfections",
      "Peinture, enduit et revêtements muraux",
      "Pose de sols, plinthes et seuils",
    ],
  },
  {
    icon: Ruler,
    title: "Aménagement",
    text: "Optimisation des volumes pour mieux vivre ou mieux travailler dans l'existant.",
    type: "Aménagement",
    details: [
      "Création de cloisons et d'ouvertures",
      "Circulation et luminosité repensées",
      "Rangements intégrés sur mesure",
    ],
  },
];

export function DemoServices({
  onDevis,
}: {
  onDevis: (type: ProjectType) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="prestations" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-[#132238] sm:text-3xl">
          Cinq prestations, décrites sans zone d&apos;ombre
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#132238]/70">
          Cliquez sur une prestation pour afficher son détail, puis lancez une
          demande d&apos;estimation déjà pré-remplie.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const open = openIndex === i;
            return (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-2xl border border-[#132238]/10 bg-[#F8FAFC] p-6 transition-all hover:-translate-y-1 hover:border-[#2563EB]/35 hover:shadow-lg"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#2563EB]">
                  <Icon className="size-5 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-[#132238]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#132238]/75">
                  {service.text}
                </p>

                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`service-detail-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="mt-5 rounded-full border border-[#2563EB]/30 px-4 py-2 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white"
                >
                  {open ? "Masquer le détail" : "Voir le détail"}
                </button>

                {open && (
                  <div id={`service-detail-${i}`} className="mt-4">
                    <ul className="space-y-2 text-sm text-[#132238]/80">
                      {service.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-[#F59E0B]"
                            aria-hidden="true"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => onDevis(service.type)}
                      className="mt-4 w-full rounded-full bg-[#132238] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#18212F]"
                    >
                      Demander une estimation pour cette prestation
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Réalisations                                                        */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: "cuisine",
    title: "Concept de cuisine ouverte",
    beforePhoto: PHOTOS.kitchenBefore,
    afterPhoto: PHOTOS.kitchenAfter,
    description:
      "Une cuisine fermée et vieillissante repensée en espace ouvert sur le séjour.",
    items: ["Plan de travail", "Rangements", "Éclairage"],
    besoin:
      "Un couple imagine cuisiner sans être isolé du reste du logement, avec des rangements suffisants pour une famille de quatre personnes.",
    contraintes: [
      "Un mur porteur qui ne peut pas être supprimé entièrement",
      "Une arrivée d'eau existante difficile à déplacer",
      "Un budget à tenir sans changer l'électroménager",
    ],
    proposition: [
      "Créer une ouverture partielle plutôt qu'une démolition complète",
      "Conserver l'implantation de l'évier pour limiter les travaux",
      "Ajouter des rangements hauts et un éclairage sous meubles",
    ],
  },
  {
    id: "salle-de-bain",
    title: "Concept de salle de bain accessible",
    beforePhoto: PHOTOS.bathroomBefore,
    afterPhoto: PHOTOS.bathroomAfter,
    description:
      "Une pièce d'eau ancienne transformée en salle de bain simple à utiliser et à entretenir.",
    items: ["Douche de plain-pied", "Meuble vasque", "Ventilation"],
    besoin:
      "Des propriétaires souhaitent anticiper le vieillissement du logement et remplacer une baignoire peu pratique.",
    contraintes: [
      "Une hauteur sous plafond limitée pour l'évacuation",
      "Une ventilation insuffisante à l'origine de traces d'humidité",
      "Une surface réduite de moins de cinq mètres carrés",
    ],
    proposition: [
      "Installer une douche de plain-pied avec receveur extra-plat",
      "Reprendre l'étanchéité avant la pose du carrelage",
      "Remplacer la ventilation par un modèle hygroréglable",
    ],
  },
  {
    id: "sejour",
    title: "Concept de séjour lumineux",
    beforePhoto: PHOTOS.livingBefore,
    afterPhoto: PHOTOS.livingAfter,
    description:
      "Un séjour cloisonné et sombre réorganisé pour gagner en clarté et en circulation.",
    items: ["Ouverture", "Peinture claire", "Sol neuf"],
    besoin:
      "Une famille veut un espace de vie unique, plus clair, sans changer la surface du logement.",
    contraintes: [
      "Un sol abîmé mais posé sur une chape à conserver",
      "Une seule source de lumière naturelle orientée nord",
      "Un chantier à réaliser en site occupé",
    ],
    proposition: [
      "Élargir l'ouverture existante vers l'entrée",
      "Choisir des teintes claires et un éclairage indirect",
      "Poser un sol stratifié compatible avec la chape existante",
    ],
  },
];

export function DemoRealisations() {
  const [active, setActive] = useState<(typeof PROJECTS)[number] | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="realisations" className="bg-[#F8FAFC] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-[#132238] sm:text-3xl">
          Trois concepts de réalisations
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#132238]/70">
          Ces projets sont imaginés pour montrer une manière de raisonner : le
          besoin, les contraintes rencontrées, puis la proposition.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#132238]/10 bg-white transition-shadow hover:shadow-lg hover:shadow-[#132238]/10"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={p.afterPhoto}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold text-[#132238]">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#132238]/75">
                  {p.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="mt-6 rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
                >
                  Découvrir le concept
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#132238]/60">
          Exemple fictif créé à titre d&apos;illustration. Il ne s&apos;agit pas
          d&apos;une réalisation client.
        </p>
      </div>

      <NovaModal
        open={active !== null}
        title={active?.title ?? "Concept"}
        onClose={close}
      >
        {active && (
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#2563EB] uppercase">
              Concept fictif
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-[#132238]">
              {active.title}
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-xs font-semibold text-[#132238]/60">
                  Avant
                </p>
                <div className="h-32 overflow-hidden rounded-xl sm:h-44">
                  <img
                    src={active.beforePhoto}
                    alt={`${active.title} — avant`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-[#2563EB]">
                  Après
                </p>
                <div className="h-32 overflow-hidden rounded-xl sm:h-44">
                  <img
                    src={active.afterPhoto}
                    alt={`${active.title} — après`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-[#2563EB]">
                Le besoin imaginé
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#132238]/80">
                {active.besoin}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#2563EB]">
                Les contraintes rencontrées
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-[#132238]/80">
                {active.contraintes.map((c) => (
                  <li key={c} className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#F59E0B]"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#2563EB]">
                La proposition
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-[#132238]/80">
                {active.proposition.map((c) => (
                  <li key={c} className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#2563EB]"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 rounded-xl bg-[#F8FAFC] p-3 text-xs leading-relaxed text-[#132238]/70">
              Exemple fictif créé à titre d&apos;illustration. Il ne s&apos;agit
              pas d&apos;une réalisation client.
            </p>
          </div>
        )}
      </NovaModal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Comparateur avant / après                                           */
/* ------------------------------------------------------------------ */

export function DemoComparateur() {
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [setFromClientX]);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-[#132238] sm:text-3xl">
          Comprendre la refonte en un regard
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#132238]/70">
          Faites glisser le curseur, à la souris ou au doigt, pour comparer
          l&apos;état initial et la proposition.
        </p>

        <div
          ref={containerRef}
          onPointerDown={(e) => {
            draggingRef.current = true;
            setFromClientX(e.clientX);
          }}
          className="relative mt-8 h-64 touch-none overflow-hidden rounded-3xl border border-[#132238]/10 select-none sm:h-96"
        >
          <img
            src={PHOTOS.kitchenAfter}
            alt="Cuisine rénovée et moderne"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
            aria-hidden="true"
          >
            <img
              src={PHOTOS.kitchenBefore}
              alt="Cuisine avant rénovation"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute top-3 left-3 rounded-full bg-[#18212F]/85 px-3 py-1 text-xs font-semibold text-white">
            Avant
          </span>
          <span className="absolute top-3 right-3 rounded-full bg-[#2563EB]/90 px-3 py-1 text-xs font-semibold text-white">
            Après
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
            style={{ left: `${value}%` }}
          />

          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(value)}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Curseur de comparaison avant après"
            className="absolute inset-x-0 bottom-4 mx-auto w-[85%] cursor-pointer accent-[#F59E0B]"
          />
        </div>

        <p className="mt-4 text-xs text-[#132238]/60">
          Transformation conceptuelle fictive, créée uniquement pour illustrer
          une proposition de rénovation.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Méthode                                                             */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Premier échange",
    text: "Nous cadrons le besoin, le calendrier souhaité et l'ordre de budget envisagé.",
  },
  {
    title: "Visite technique",
    text: "État des lieux sur place : supports, réseaux, accès et contraintes du bâtiment.",
  },
  {
    title: "Estimation détaillée",
    text: "Un document ligne par ligne, avec ce qui est inclus et ce qui reste optionnel.",
  },
  {
    title: "Chantier suivi",
    text: "Un planning partagé, un interlocuteur unique et un point d'avancement régulier.",
  },
  {
    title: "Réception et garanties",
    text: "Vérification pièce par pièce, levée des réserves puis remise des documents.",
  },
];

export function DemoMethode() {
  return (
    <section id="methode" className="bg-[#132238] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Notre méthode de travail en cinq étapes
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl bg-white/[0.06] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#F59E0B] font-heading text-sm font-bold text-[#18212F]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Confiance                                                           */
/* ------------------------------------------------------------------ */

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Une estimation écrite",
    text: "Le prix est détaillé poste par poste, avec les quantités retenues et les hypothèses prises.",
  },
  {
    icon: ClipboardList,
    title: "Un périmètre clair",
    text: "Ce qui est exclu est écrit noir sur blanc : évacuation, reprises, fournitures non incluses.",
  },
  {
    icon: UserRound,
    title: "Un seul interlocuteur",
    text: "La même personne suit le dossier, ce qui évite les informations contradictoires.",
  },
  {
    icon: CheckCircle2,
    title: "Une réception formalisée",
    text: "Un document de réception liste les points vérifiés et les éventuelles réserves.",
  },
];

export function DemoConfiance() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl font-heading text-2xl font-bold text-[#132238] sm:text-3xl">
          Les éléments qui rassurent avant de demander un devis
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-[#132238]/10 bg-[#F8FAFC] p-6"
            >
              <Icon className="size-5 text-[#2563EB]" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-base font-semibold text-[#132238]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#132238]/75">
                {text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-[#F59E0B]/60 bg-[#F59E0B]/5 p-5">
          <p className="font-heading text-sm font-semibold text-[#132238]">
            Pourquoi aucun avis client n&apos;est affiché ici
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#132238]/75">
            Nova Rénovation étant une entreprise fictive, afficher des
            témoignages reviendrait à inventer des personnes et des notes. Sur
            un site réel, cette zone accueillerait des avis vérifiables, datés
            et rattachés à des chantiers identifiables.
          </p>
        </div>
      </div>
    </section>
  );
}
