import { useCallback, useEffect, useRef, useState } from "react";
import {
  Brush,
  CheckCircle2,
  ClipboardList,
  HardHat,
  Home,
  MessageSquare,
  PaintRoller,
  Ruler,
  Search,
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
  renovation1:
    "https://images.pexels.com/photos/5317154/pexels-photo-5317154.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  renovation2:
    "https://images.pexels.com/photos/23358344/pexels-photo-23358344.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  renovation3:
    "https://images.pexels.com/photos/6474133/pexels-photo-6474133.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
};

const TRUST = [
  { icon: Search, label: "Visite et devis gratuits" },
  { icon: HardHat, label: "Artisans qualifiés" },
  { icon: ClipboardList, label: "Devis détaillé" },
];

export function DemoHero({ onDevis }: { onDevis: () => void }) {
  return (
    <section id="accueil" className="bg-[#f5f1e8] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#c8531c]">
            Entreprise de rénovation à Strasbourg
          </p>
          <h1 className="mt-4 font-heading text-3xl leading-tight font-bold text-[#3a3a36] sm:text-4xl lg:text-5xl">
            Donnez une seconde vie à votre intérieur
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3a3a36]/75">
            Rénovation complète, aménagement et finitions pour les particuliers
            et professionnels. Un accompagnement de A à Z, du premier coup de
            pinceau à la livraison.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onDevis}
              className="rounded-full bg-[#c8531c] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#c8531c]/90"
            >
              Demander un devis
            </button>
            <a
              href="#realisations"
              className="rounded-full border border-[#c8531c]/30 px-6 py-3 text-center text-sm font-semibold text-[#c8531c] transition-colors hover:bg-[#c8531c]/5"
            >
              Découvrir les réalisations
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-[#3a3a36]/80"
              >
                <Icon className="size-4 text-[#c8531c]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl shadow-xl shadow-[#c8531c]/10">
            <div className="h-64 sm:h-80 lg:h-[26rem]">
              <img
                src={PHOTOS.hero}
                alt="Pièce en cours de rénovation avec poutres apparentes"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#3a3a36]/60">
            Visuels utilisés uniquement à titre d&apos;illustration.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
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
  icon: typeof Brush;
  title: string;
  text: string;
  type: ProjectType;
  details: string[];
}[] = [
  {
    icon: Home,
    title: "Rénovation complète",
    text: "Transformation d'un logement ou d'un local, de la démolition aux finitions.",
    type: "Rénovation complète",
    details: [
      "Évaluation de l'état initial et repérage des contraintes",
      "Coordination de l'ensemble des corps d'état",
      "Suivi de chantier et livraison dans les délais",
    ],
  },
  {
    icon: Wrench,
    title: "Cuisine et salle de bain",
    text: "Création ou modernisation de pièces d'eau et de cuisines fonctionnelles.",
    type: "Cuisine",
    details: [
      "Conception adaptée à vos usages et à votre budget",
      "Plomberie, électricité et carrelage inclus",
      "Choix de matériaux durables et faciles d'entretien",
    ],
  },
  {
    icon: PaintRoller,
    title: "Peinture et finitions",
    text: "Remise aux normes et finitions soignées pour des murs et des sols impeccables.",
    type: "Peinture et finitions",
    details: [
      "Préparation des supports et traitement des imperfections",
      "Peinture, enduit et papier peint",
      "Pose de sols et plinthes",
    ],
  },
  {
    icon: Ruler,
    title: "Aménagement",
    text: "Optimisation des espaces pour mieux vivre ou mieux travailler.",
    type: "Aménagement",
    details: [
      "Création de cloisons et d'ouvertures",
      "Optimisation de la circulation et de la luminosité",
      "Solutions de rangement sur mesure",
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
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-[#3a3a36] sm:text-3xl">
          Des prestations adaptées à votre projet
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const open = openIndex === i;
            return (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-2xl border border-[#c8531c]/10 bg-[#f5f1e8]/60 p-6 transition-all hover:-translate-y-1 hover:border-[#c8531c]/25 hover:shadow-lg"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#c8531c]">
                  <Icon className="size-5 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-[#3a3a36]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#3a3a36]/75">
                  {service.text}
                </p>

                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`service-detail-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="mt-5 rounded-full border border-[#c8531c]/25 px-4 py-2 text-sm font-semibold text-[#c8531c] transition-colors hover:bg-[#c8531c] hover:text-white"
                >
                  {open ? "Masquer le détail" : "En savoir plus"}
                </button>

                {open && (
                  <div id={`service-detail-${i}`} className="mt-4">
                    <ul className="space-y-2 text-sm text-[#3a3a36]/80">
                      {service.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-[#c8531c]"
                            aria-hidden="true"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => onDevis(service.type)}
                      className="mt-4 w-full rounded-full bg-[#c8531c] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c8531c]/90"
                    >
                      Demander un devis pour cette prestation
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
    title: "Concept de cuisine moderne",
    beforePhoto: PHOTOS.kitchenBefore,
    afterPhoto: PHOTOS.kitchenAfter,
    description:
      "Transformation d'une cuisine vieillissante en un espace moderne et fonctionnel.",
    items: ["Plan de travail", "Rangements", "Éclairage"],
    besoin:
      "Une cuisine ancienne avec des rangements insuffisants et un plan de travail détérioré.",
    choix: [
      "Optimiser l'espace avec des rangements jusqu'au plafond",
      "Choisir un plan de travail résistant et facile d'entretien",
      "Installer un éclairage sous meubles pour la fonctionnalité",
    ],
    resultat:
      "Une cuisine ergonomique, lumineuse et adaptée aux usages quotidiens.",
  },
  {
    id: "salle-de-bain",
    title: "Concept de salle de bain contemporaine",
    beforePhoto: PHOTOS.bathroomBefore,
    afterPhoto: PHOTOS.bathroomAfter,
    description:
      "Rénovation complète d'une salle de bain pour un confort moderne.",
    items: ["Douche italienne", "Meuble vasque", "Carrelage"],
    besoin:
      "Une salle de bain vieillissante avec une douche non fonctionnelle et des finitions abîmées.",
    choix: [
      "Remplacer la baignoire par une douche italienne accessible",
      "Installer un meuble vasque avec rangement intégré",
      "Poser un carrelage grand format pour agrandir visuellement",
    ],
    resultat:
      "Une salle de bain moderne, facile d'entretien et confortable au quotidien.",
  },
  {
    id: "sejour",
    title: "Concept de séjour lumineux",
    beforePhoto: PHOTOS.livingBefore,
    afterPhoto: PHOTOS.livingAfter,
    description:
      "Ouverture et rénovation d'un séjour pour gagner en luminosité.",
    items: ["Ouverture de cloison", "Peinture", "Sol neuf"],
    besoin:
      "Un séjour cloisonné et sombre, avec un sol abîmé et des murs fatigués.",
    choix: [
      "Ouvrir la cloison pour créer un espace de vie convivial",
      "Appliquer une peinture claire pour maximiser la lumière",
      "Poser un sol moderne et résistant",
    ],
    resultat:
      "Un séjour ouvert, lumineux et accueillant, idéal pour recevoir.",
  },
];

export function DemoRealisations() {
  const [active, setActive] = useState<(typeof PROJECTS)[number] | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="realisations" className="bg-[#f5f1e8] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-[#3a3a36] sm:text-3xl">
          Des projets pensés pour chaque intérieur
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#c8531c]/10 bg-white transition-shadow hover:shadow-lg hover:shadow-[#c8531c]/10"
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
                <h3 className="font-heading text-lg font-semibold text-[#3a3a36]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3a3a36]/75">
                  {p.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-[#c8531c]/10 px-3 py-1 text-xs font-medium text-[#c8531c]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="mt-6 rounded-full bg-[#c8531c] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c8531c]/90"
                >
                  Découvrir le concept
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#3a3a36]/60">
          Exemple fictif créé à titre de démonstration. Il ne s&apos;agit pas
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
            <p className="text-xs font-semibold tracking-wide text-[#c8531c] uppercase">
              Concept fictif
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-[#3a3a36]">
              {active.title}
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-xs font-semibold text-[#3a3a36]/60">
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
                <p className="mb-1 text-xs font-semibold text-[#c8531c]">
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
              <h4 className="text-sm font-semibold text-[#c8531c]">
                Le besoin imaginé
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#3a3a36]/80">
                {active.besoin}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#c8531c]">
                Les choix de conception
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-[#3a3a36]/80">
                {active.choix.map((c) => (
                  <li key={c} className="flex gap-2">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-[#c8531c]"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#c8531c]">
                Le résultat
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#3a3a36]/80">
                {active.resultat}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {active.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-[#f5f1e8] p-3 text-center text-xs font-medium text-[#c8531c]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 rounded-xl bg-[#f5f1e8] p-3 text-xs leading-relaxed text-[#3a3a36]/70">
              Exemple fictif créé à titre de démonstration. Il ne s&apos;agit pas
              d&apos;une réalisation client.
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
        <h2 className="font-heading text-2xl font-bold text-[#3a3a36] sm:text-3xl">
          Visualisez la transformation d&apos;une pièce
        </h2>

        <div
          ref={containerRef}
          onPointerDown={(e) => {
            draggingRef.current = true;
            setFromClientX(e.clientX);
          }}
          className="relative mt-8 h-64 touch-none overflow-hidden rounded-3xl border border-[#c8531c]/10 select-none sm:h-96"
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

          <span className="absolute top-3 left-3 rounded-full bg-[#2a2a26]/80 px-3 py-1 text-xs font-semibold text-white">
            Avant
          </span>
          <span className="absolute top-3 right-3 rounded-full bg-[#c8531c]/90 px-3 py-1 text-xs font-semibold text-white">
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
            className="absolute inset-x-0 bottom-4 mx-auto w-[85%] cursor-pointer accent-[#c8531c]"
          />
        </div>

        <p className="mt-4 text-xs text-[#3a3a36]/60">
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
    text: "Nous discutons de votre projet, de vos besoins et de votre budget.",
  },
  {
    title: "Visite et diagnostic",
    text: "Évaluation de l'état des lieux et repérage des contraintes techniques.",
  },
  {
    title: "Devis détaillé",
    text: "Un devis clair et détaillé, expliqué point par point avant validation.",
  },
  {
    title: "Chantier et livraison",
    text: "Réalisation des travaux avec un suivi régulier et une livraison dans les délais.",
  },
];

export function DemoMethode() {
  return (
    <section id="methode" className="bg-[#c8531c] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Votre projet en quatre étapes
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl bg-white/[0.1] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-white font-heading text-sm font-bold text-[#c8531c]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
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
/* Avis                                                                */
/* ------------------------------------------------------------------ */

export function DemoAvis() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-[#3a3a36] sm:text-3xl">
          L&apos;espace réservé aux retours clients
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3a3a36]/75">
          Sur un véritable site, cette section permettrait d&apos;intégrer des
          avis authentiques et vérifiés afin de rassurer les futurs clients.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-[#c8531c]/30 bg-[#f5f1e8]/50 p-6"
            >
              <MessageSquare className="size-5 text-[#c8531c]/50" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-[#c8531c]">
                Emplacement pour un avis authentique
              </p>
              <div className="mt-4 space-y-2" aria-hidden="true">
                <div className="h-2 w-full rounded bg-[#c8531c]/10" />
                <div className="h-2 w-4/5 rounded bg-[#c8531c]/10" />
                <div className="h-2 w-2/3 rounded bg-[#c8531c]/10" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-[#3a3a36]/60">
          <MessageSquare className="size-4" aria-hidden="true" />
          Aucun avis, nom ou note n&apos;est inventé dans cette démonstration.
        </p>
      </div>
    </section>
  );
}
