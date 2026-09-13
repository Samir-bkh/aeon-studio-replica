import { useCallback, useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Fence,
  Flower2,
  Handshake,
  MessageSquare,
  Quote,
  Scissors,
  Search,
  Shovel,
  Sprout,
} from "lucide-react";

import { DemoModal } from "./modal";

/* ------------------------------------------------------------------ */
/* Photos d'illustration (Pexels, libres de droits)                     */
/* ------------------------------------------------------------------ */

const PHOTOS = {
  hero: "https://images.pexels.com/photos/7587879/pexels-photo-7587879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  contemporain:
    "https://images.pexels.com/photos/7045706/pexels-photo-7045706.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  terrasse:
    "https://images.pexels.com/photos/8091888/pexels-photo-8091888.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  naturel:
    "https://images.pexels.com/photos/25972319/pexels-photo-25972319.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  avant:
    "https://images.pexels.com/photos/14952016/pexels-photo-14952016.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
  apres: "https://images.pexels.com/photos/7598368/pexels-photo-7598368.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2",
};

type Variant = "moderne" | "terrasse" | "naturel" | "avant";

const VARIANT_PHOTO: Record<Variant, string> = {
  moderne: PHOTOS.contemporain,
  terrasse: PHOTOS.terrasse,
  naturel: PHOTOS.naturel,
  avant: PHOTOS.avant,
};

export function GardenComposition({
  variant = "moderne",
  className = "",
  alt = "Composition visuelle d'illustration",
}: {
  variant?: Variant;
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={VARIANT_PHOTO[variant]}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const TRUST = [
  { icon: Search, label: "Étude personnalisée" },
  { icon: Handshake, label: "Accompagnement de proximité" },
  { icon: ClipboardList, label: "Devis détaillé" },
];

export function DemoHero({ onDevis }: { onDevis: () => void }) {
  return (
    <section id="accueil" className="bg-[#F5F1E8] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#173F35]">
            Paysagiste à Strasbourg et dans le Bas-Rhin
          </p>
          <h1 className="mt-4 font-heading text-3xl leading-tight font-bold text-[#1E2522] sm:text-4xl lg:text-5xl">
            Imaginons ensemble un extérieur qui vous ressemble
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#1E2522]/75">
            Création, aménagement et entretien de jardins pensés pour votre
            terrain, vos envies et votre quotidien.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onDevis}
              className="rounded-full bg-[#173F35] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#173F35]/90"
            >
              Demander un devis
            </button>
            <a
              href="#realisations"
              className="rounded-full border border-[#173F35]/25 px-6 py-3 text-center text-sm font-semibold text-[#173F35] transition-colors hover:bg-[#173F35]/5"
            >
              Découvrir les réalisations
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-[#1E2522]/80"
              >
                <Icon className="size-4 text-[#173F35]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl shadow-xl shadow-[#173F35]/10">
            <div className="h-64 sm:h-80 lg:h-[26rem]">
              <img
                src={PHOTOS.hero}
                alt="Jardin résidentiel moderne avec terrasse en bois et végétation"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#1E2522]/60">
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
  "Création de jardin",
  "Terrasse ou clôture",
  "Plantations",
  "Entretien",
  "Autre",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

const SERVICES: {
  icon: typeof Shovel;
  title: string;
  text: string;
  type: ProjectType;
  details: string[];
}[] = [
  {
    icon: Shovel,
    title: "Création de jardins",
    text: "Conception d'un extérieur cohérent, esthétique et adapté aux usages du quotidien.",
    type: "Création de jardin",
    details: [
      "Étude du terrain, de l'exposition et des contraintes existantes",
      "Plan d'aménagement présentant les zones de vie et de circulation",
      "Choix des matériaux et des végétaux en fonction de vos envies",
    ],
  },
  {
    icon: Fence,
    title: "Terrasses et clôtures",
    text: "Création d'espaces structurés pour profiter de votre jardin et préserver votre intimité.",
    type: "Terrasse ou clôture",
    details: [
      "Définition des surfaces et des niveaux",
      "Comparaison des matériaux selon l'entretien souhaité",
      "Traitement des limites de terrain et des vis-à-vis",
    ],
  },
  {
    icon: Flower2,
    title: "Plantations",
    text: "Sélection et organisation de végétaux adaptés au terrain et à l'ambiance recherchée.",
    type: "Plantations",
    details: [
      "Palette végétale adaptée au sol et à l'ensoleillement",
      "Organisation des massifs et des hauteurs",
      "Conseils d'arrosage et de reprise après plantation",
    ],
  },
  {
    icon: Scissors,
    title: "Entretien",
    text: "Prestations d'entretien pour préserver un espace extérieur propre et agréable.",
    type: "Entretien",
    details: [
      "Passages réguliers ou ponctuels selon vos besoins",
      "Taille, tonte et nettoyage des surfaces",
      "Suivi de l'évolution des plantations au fil des saisons",
    ],
  },
];

export function DemoPrestations({
  onDevis,
}: {
  onDevis: (type: ProjectType) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="prestations" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-[#1E2522] sm:text-3xl">
          Des solutions adaptées à votre extérieur
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const open = openIndex === i;
            return (
              <article
                key={service.title}
                className="flex h-full flex-col rounded-2xl border border-[#173F35]/10 bg-[#F5F1E8]/60 p-6 transition-all hover:-translate-y-1 hover:border-[#173F35]/25 hover:shadow-lg hover:shadow-[#173F35]/10"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#173F35]">
                  <Icon className="size-5 text-[#A8C69F]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-[#1E2522]">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#1E2522]/75">
                  {service.text}
                </p>

                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`prestation-detail-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="mt-5 rounded-full border border-[#173F35]/25 px-4 py-2 text-sm font-semibold text-[#173F35] transition-colors hover:bg-[#173F35] hover:text-white"
                >
                  {open ? "Masquer le détail" : "En savoir plus"}
                </button>

                {open && (
                  <div id={`prestation-detail-${i}`} className="mt-4">
                    <ul className="space-y-2 text-sm text-[#1E2522]/80">
                      {service.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <Sprout
                            className="mt-0.5 size-4 shrink-0 text-[#173F35]"
                            aria-hidden="true"
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => onDevis(service.type)}
                      className="mt-4 w-full rounded-full bg-[#173F35] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#173F35]/90"
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
    id: "contemporain",
    title: "Concept de jardin contemporain",
    variant: "moderne" as const,
    description:
      "Un extérieur aux lignes nettes, organisé autour d'une terrasse centrale et de massifs graphiques.",
    items: ["Terrasse centrale", "Massifs graphiques", "Éclairage doux"],
    besoin:
      "Un terrain rectangulaire sans organisation claire, avec une pelouse difficile à entretenir et aucune zone de repas abritée.",
    choix: [
      "Créer une terrasse centrale reliant la maison et le jardin",
      "Structurer l'espace avec des massifs aux formes simples",
      "Dessiner des circulations minérales pour limiter l'entretien",
    ],
    resultat:
      "Un jardin lisible où chaque zone a une fonction : recevoir, circuler, planter.",
  },
  {
    id: "terrasse",
    title: "Concept de terrasse végétalisée",
    variant: "terrasse" as const,
    description:
      "Une terrasse largement accompagnée de végétation pour créer de l'ombre et de l'intimité.",
    items: ["Bacs plantés", "Claustra bois", "Zone ombragée"],
    besoin:
      "Un espace exposé au vis-à-vis, très minéral et peu agréable aux heures chaudes.",
    choix: [
      "Installer des bacs plantés en périphérie de la terrasse",
      "Poser un claustra en bois pour filtrer les regards",
      "Prévoir une zone ombragée pour les repas",
    ],
    resultat:
      "Une terrasse protégée, plus fraîche visuellement, utilisable une grande partie de l'année.",
  },
  {
    id: "naturel",
    title: "Concept de jardin naturel",
    variant: "naturel" as const,
    description:
      "Une composition libre, inspirée des ambiances champêtres, avec des végétaux peu exigeants.",
    items: ["Prairie fleurie", "Chemin en pas japonais", "Haie libre"],
    besoin:
      "Un terrain souhaité peu exigeant en entretien, avec une ambiance moins formelle.",
    choix: [
      "Remplacer une partie de la pelouse par une prairie fleurie",
      "Tracer un cheminement en pas japonais",
      "Composer une haie libre mêlant plusieurs essences",
    ],
    resultat:
      "Un jardin vivant et souple, qui évolue au fil des saisons sans entretien intensif.",
  },
];

export function DemoRealisations() {
  const [active, setActive] = useState<(typeof PROJECTS)[number] | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="realisations" className="bg-[#F5F1E8] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-heading text-2xl font-bold text-[#1E2522] sm:text-3xl">
          Des projets pensés pour chaque extérieur
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#173F35]/10 bg-white transition-shadow hover:shadow-lg hover:shadow-[#173F35]/10"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={VARIANT_PHOTO[p.variant]}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1E2522]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1E2522]/75">
                  {p.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-[#A8C69F]/30 px-3 py-1 text-xs font-medium text-[#173F35]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="mt-6 rounded-full bg-[#173F35] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#173F35]/90"
                >
                  Découvrir le concept
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#1E2522]/60">
          Exemple fictif créé à titre de démonstration. Il ne s&apos;agit pas
          d&apos;une réalisation client.
        </p>
      </div>

      <DemoModal
        open={active !== null}
        title={active?.title ?? "Concept"}
        onClose={close}
      >
        {active && (
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#173F35] uppercase">
              Concept fictif
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-[#1E2522]">
              {active.title}
            </h3>

            <div className="mt-5 h-40 overflow-hidden rounded-2xl sm:h-52">
              <img
                src={VARIANT_PHOTO[active.variant]}
                alt={active.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-[#173F35]">
                Le besoin imaginé
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#1E2522]/80">
                {active.besoin}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#173F35]">
                Les choix de conception
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-[#1E2522]/80">
                {active.choix.map((c) => (
                  <li key={c} className="flex gap-2">
                    <Sprout
                      className="mt-0.5 size-4 shrink-0 text-[#173F35]"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[#173F35]">
                Le résultat visuel
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#1E2522]/80">
                {active.resultat}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {active.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-[#F5F1E8] p-3 text-center text-xs font-medium text-[#173F35]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 rounded-xl bg-[#F5F1E8] p-3 text-xs leading-relaxed text-[#1E2522]/70">
              Exemple fictif créé à titre de démonstration. Il ne s&apos;agit pas
              d&apos;une réalisation client.
            </p>
          </div>
        )}
      </DemoModal>
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
        <h2 className="font-heading text-2xl font-bold text-[#1E2522] sm:text-3xl">
          Visualisez la transformation d&apos;un espace
        </h2>

        <div
          ref={containerRef}
          onPointerDown={(e) => {
            draggingRef.current = true;
            setFromClientX(e.clientX);
          }}
          className="relative mt-8 h-64 touch-none overflow-hidden rounded-3xl border border-[#173F35]/10 select-none sm:h-96"
        >
          <img
            src={PHOTOS.apres}
            alt="Espace aménagé avec terrasse et plantations"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
            aria-hidden="true"
          >
            <img
              src={PHOTOS.avant}
              alt="Espace vide non aménagé"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute top-3 left-3 rounded-full bg-[#1E2522]/80 px-3 py-1 text-xs font-semibold text-white">
            Avant
          </span>
          <span className="absolute top-3 right-3 rounded-full bg-[#173F35]/90 px-3 py-1 text-xs font-semibold text-white">
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
            className="absolute inset-x-0 bottom-4 mx-auto w-[85%] cursor-pointer accent-[#173F35]"
          />
        </div>

        <p className="mt-4 text-xs text-[#1E2522]/60">
          Transformation conceptuelle fictive, créée uniquement pour illustrer
          une proposition d&apos;aménagement.
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
    text: "Nous discutons de votre terrain, de vos usages et de vos envies.",
  },
  {
    title: "Visite et étude du terrain",
    text: "Observation du sol, de l'exposition et des contraintes existantes.",
  },
  {
    title: "Proposition personnalisée",
    text: "Un plan d'aménagement et un devis détaillé, expliqués point par point.",
  },
  {
    title: "Réalisation et suivi",
    text: "Mise en œuvre du projet puis conseils pour l'entretien dans la durée.",
  },
];

export function DemoMethode() {
  return (
    <section id="methode" className="bg-[#173F35] py-16 text-[#F5F1E8] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Votre projet en quatre étapes
        </h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl bg-white/[0.06] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#A8C69F] font-heading text-sm font-bold text-[#173F35]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F1E8]/80">
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
/* Avis (emplacements, aucun faux témoignage)                          */
/* ------------------------------------------------------------------ */

export function DemoAvis() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-[#1E2522] sm:text-3xl">
          L&apos;espace réservé aux retours clients
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#1E2522]/75">
          Sur un véritable site, cette section permettrait d&apos;intégrer des
          avis authentiques et vérifiés afin de rassurer les futurs clients.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-[#173F35]/30 bg-[#F5F1E8]/50 p-6"
            >
              <Quote className="size-5 text-[#173F35]/50" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-[#173F35]">
                Emplacement pour un avis authentique
              </p>
              <div className="mt-4 space-y-2" aria-hidden="true">
                <div className="h-2 w-full rounded bg-[#173F35]/10" />
                <div className="h-2 w-4/5 rounded bg-[#173F35]/10" />
                <div className="h-2 w-2/3 rounded bg-[#173F35]/10" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-[#1E2522]/60">
          <MessageSquare className="size-4" aria-hidden="true" />
          Aucun avis, nom ou note n&apos;est inventé dans cette démonstration.
        </p>
      </div>
    </section>
  );
}
