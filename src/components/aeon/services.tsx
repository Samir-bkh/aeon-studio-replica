import { Check, Globe, Sparkles, Workflow } from "lucide-react"
import { Button } from "@/components/aeon-ui/button"
import { Reveal } from "@/components/aeon/reveal"

const SERVICES = [
  {
    icon: Globe,
    title: "Création & refonte de site",
    description:
      "Création d'un nouveau site vitrine ou remplacement d'un site ancien par une expérience moderne, rapide et adaptée à votre entreprise.",
    items: [
      "Design personnalisé",
      "Version mobile et ordinateur",
      "Présentation des prestations",
      "Galerie de réalisations",
      "Avis et éléments de confiance",
      "Formulaire de prise de contact",
      "Référencement local basique",
      "Mise en ligne et accompagnement",
    ],
    cta: "Découvrir une démonstration",
    href: "#demonstrations",
  },
  {
    icon: Sparkles,
    title: "Améliorations ciblées",
    description:
      "Amélioration d'un site existant sans nécessairement reconstruire l'intégralité du projet.",
    items: [
      "Refonte de la page d'accueil",
      "Amélioration de la version mobile",
      "Ajout de nouvelles sections",
      "Amélioration du formulaire",
      "Optimisation des performances",
      "Correction de problèmes visuels",
      "Mise en valeur des avis et réalisations",
    ],
    cta: "Parler de mon site actuel",
    href: "#contact",
  },
  {
    icon: Workflow,
    title: "Automatisations",
    description:
      "Création de processus simples pour centraliser les demandes, préparer certaines réponses et faciliter le suivi commercial.",
    items: [
      "Centralisation des demandes",
      "Notifications automatiques",
      "Résumé des messages entrants",
      "Préparation de brouillons",
      "Création automatique de tâches",
      "Rappels et confirmations",
      "Validation humaine avant les actions importantes",
    ],
    cta: "Voir le fonctionnement",
    href: "#automatisation",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Des solutions numériques simples, modernes et utiles
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, items, cta, href }, i) => (
            <Reveal key={title} delay={i * 0.1} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121824] p-7 transition-all hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-black/40">
                <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[#5B8CFF]/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

                <div className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#5B8CFF]/20 to-[#8B5CF6]/20">
                  <Icon className="size-5 text-[#5B8CFF]" aria-hidden="true" />
                </div>

                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-[#39D9C6]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="mt-7 w-full rounded-full border-white/15 bg-transparent hover:bg-white/5"
                  nativeButton={false}
                  render={<a href={href} />}
                >
                  {cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
