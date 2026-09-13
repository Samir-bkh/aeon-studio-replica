import { useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Inbox,
  Mail,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

const HERO_PHOTO =
  "https://images.pexels.com/photos/38984789/pexels-photo-38984789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const PROCESS_PHOTO =
  "https://images.pexels.com/photos/38888656/pexels-photo-38888656.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2";
const INTEGRATION_PHOTO =
  "https://images.pexels.com/photos/5744249/pexels-photo-5744249.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2";

const TRUST = [
  { icon: Shield, label: "Validation humaine conservée" },
  { icon: Clock, label: "Gain de temps estimé" },
  { icon: FileText, label: "Traçabilité complète" },
];

export function DemoHero({ onDevis }: { onDevis: () => void }) {
  return (
    <section id="accueil" className="bg-[#0d1117] py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-[#58a6ff]">
            Automatisation des demandes entrantes pour PME
          </p>
          <h1 className="mt-4 font-heading text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
            Centralisez vos demandes, ne perdez plus aucune opportunité
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Un processus automatisé qui réceptionne, classe et prépare les
            réponses à vos demandes entrantes, avec une validation humaine à
            chaque étape.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onDevis}
              className="rounded-full bg-[#1f6feb] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#1f6feb]/90"
            >
              Demander une démo
            </button>
            <a
              href="#processus"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Découvrir le processus
            </a>
          </div>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white/80"
              >
                <Icon className="size-4 text-[#58a6ff]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] shadow-xl">
            <div className="h-64 sm:h-80 lg:h-[26rem]">
              <img
                src={HERO_PHOTO}
                alt="Tablette affichant une application de gestion des tâches"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Visuels utilisés uniquement à titre d&apos;illustration.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Processus interactif                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    icon: Inbox,
    title: "Réception",
    text: "Une demande arrive par e-mail, formulaire ou message. Le système la détecte et l'enregistre automatiquement.",
  },
  {
    icon: Filter,
    title: "Extraction",
    text: "Les informations clés sont identifiées et extraites : nom, coordonnées, type de demande, urgence.",
  },
  {
    icon: FileText,
    title: "Préparation",
    text: "Une réponse préliminaire est rédigée et un dossier est créé pour le suivi de la demande.",
  },
  {
    icon: Bell,
    title: "Notification",
    text: "Le responsable reçoit une alerte et valide la réponse avant l'envoi. Rien ne part sans validation humaine.",
  },
];

export function DemoProcessus() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="processus" className="bg-[#161b22] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Le processus en quatre étapes
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          Chaque demande suit un parcours structuré, de sa réception à sa
          résolution, avec une validation humaine à chaque étape.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <ol className="space-y-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const active = activeStep === i;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? "border-[#1f6feb] bg-[#1f6feb]/10"
                        : "border-white/[0.08] bg-[#0d1117] hover:border-white/15"
                    }`}
                    aria-pressed={active}
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-[#1f6feb]" : "bg-white/[0.06]"
                      }`}
                    >
                      <Icon
                        className="size-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-semibold text-[#58a6ff]">
                        Étape {i + 1}
                      </p>
                      <h3 className="mt-1 font-heading text-base font-semibold">
                        {step.title}
                      </h3>
                      {active && (
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          {step.text}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
            <div className="h-64 sm:h-80">
              <img
                src={PROCESS_PHOTO}
                alt="Tableau Kanban affichant un flux de travail"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-[#0d1117] p-6">
              <h3 className="font-heading text-base font-semibold">
                {STEPS[activeStep].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {STEPS[activeStep].text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bénéfices                                                           */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  {
    icon: Clock,
    title: "Gain de temps",
    text: "Les demandes répétitives sont traitées automatiquement, libérant du temps pour les tâches à forte valeur.",
  },
  {
    icon: CheckCircle2,
    title: "Aucune demande oubliée",
    text: "Chaque demande est enregistrée, suivie et tracée du premier contact à la réponse finale.",
  },
  {
    icon: Shield,
    title: "Validation humaine",
    text: "Le responsable valide chaque réponse avant l'envoi. L'automatisation assiste, elle ne remplace pas.",
  },
  {
    icon: Zap,
    title: "Réactivité accrue",
    text: "Les demandes sont prises en charge rapidement, ce qui améliore l'expérience de vos interlocuteurs.",
  },
];

export function DemoBenefits() {
  return (
    <section id="benefices" className="bg-[#0d1117] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Ce que cette automatisation apporte
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#161b22] p-6 transition-all hover:-translate-y-1 hover:border-[#1f6feb]/30 hover:shadow-lg hover:shadow-[#1f6feb]/10"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[#1f6feb]">
                  <Icon className="size-5 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
                  {benefit.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Intégrations                                                        */
/* ------------------------------------------------------------------ */

const INTEGRATIONS = [
  { icon: Mail, name: "E-mail", text: "Réception automatique des e-mails entrants" },
  { icon: MessageSquare, name: "Messagerie", text: "Détection des messages depuis vos canaux" },
  { icon: FileText, name: "Documents", text: "Création de dossiers de suivi" },
  { icon: Bell, name: "Notifications", text: "Alertes au responsable à chaque étape" },
];

export function DemoIntegrations() {
  return (
    <section id="integrations" className="bg-[#161b22] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Les éléments connectés au processus
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          Cette démonstration présente les types de points de contact qu'un
          système d'automatisation peut réunir. Aucune intégration réelle
          n'est active dans cette démonstration.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTEGRATIONS.map((integration) => {
            const Icon = integration.icon;
            return (
              <article
                key={integration.name}
                className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0d1117] p-6 transition-all hover:-translate-y-1 hover:border-[#1f6feb]/30"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/[0.06]">
                  <Icon className="size-5 text-[#58a6ff]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold">
                  {integration.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
                  {integration.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/[0.08]">
          <div className="h-56 sm:h-72">
            <img
              src={INTEGRATION_PHOTO}
              alt="Smartphone affichant une application de messagerie"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Avis                                                                */
/* ------------------------------------------------------------------ */

export function DemoAvis() {
  return (
    <section className="bg-[#0d1117] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          L&apos;espace réservé aux retours clients
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
          Sur un véritable site, cette section permettrait d&apos;intégrer des
          témoignages authentiques et vérifiés d&apos;entreprises utilisatrices.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-white/15 bg-[#161b22] p-6"
            >
              <MessageSquare className="size-5 text-white/30" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-[#58a6ff]">
                Emplacement pour un témoignage authentique
              </p>
              <div className="mt-4 space-y-2" aria-hidden="true">
                <div className="h-2 w-full rounded bg-white/[0.06]" />
                <div className="h-2 w-4/5 rounded bg-white/[0.06]" />
                <div className="h-2 w-2/3 rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-white/50">
          <MessageSquare className="size-4" aria-hidden="true" />
          Aucun témoignage, nom ou note n&apos;est inventé dans cette démonstration.
        </p>
      </div>
    </section>
  );
}
