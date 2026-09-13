import { Check } from "lucide-react"
import { Button } from "@/components/aeon-ui/button"
import { Reveal } from "@/components/aeon/reveal"
import { siteConfig } from "@/lib/site-config"

const PLANS = [
  {
    key: "optimization",
    items: [
      "Amélioration d'une page ou d'un parcours",
      "Version mobile",
      "Ajout de sections",
      "Corrections techniques définies à l'avance",
    ],
    featured: false,
  },
  {
    key: "creation",
    items: [
      "Site vitrine",
      "Design responsive",
      "Prestations et réalisations",
      "Formulaire",
      "Accompagnement à la mise en ligne",
    ],
    featured: true,
  },
  {
    key: "automation",
    items: [
      "Analyse du processus",
      "Configuration",
      "Tests",
      "Documentation",
      "Accompagnement",
    ],
    featured: false,
  },
] as const

export function Pricing() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Des prestations adaptées au périmètre du projet
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Chaque projet fait l&apos;objet d&apos;une proposition précise
            après un premier échange. Les montants ci-dessous sont des
            indications de lancement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map(({ key, items, featured }, i) => {
            const plan = siteConfig.pricing[key]

            return (
              <Reveal key={key} delay={i * 0.1} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border p-7 ${
                    featured
                      ? "border-[#5B8CFF]/40 bg-gradient-to-b from-[#5B8CFF]/[0.08] to-[#121824] shadow-xl shadow-[#5B8CFF]/5"
                      : "border-white/[0.07] bg-[#121824]"
                  }`}
                >
                  {featured && (
                    <span className="mb-4 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6] px-3 py-1 text-[11px] font-medium text-white">
                      Le plus choisi
                    </span>
                  )}

                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {plan.label}
                  </h3>
                  <p className="mt-2 font-heading text-2xl font-bold text-foreground">
                    {plan.price}
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
                    className={`mt-7 w-full rounded-full ${
                      featured
                        ? ""
                        : "border border-white/15 bg-transparent hover:bg-white/5"
                    }`}
                    variant={featured ? "default" : "outline"}
                    nativeButton={false}
                    render={<a href="#contact" />}
                  >
                    Décrire mon besoin
                  </Button>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
            Le tarif final dépend notamment du nombre de pages, du contenu,
            des outils existants et des fonctionnalités nécessaires. Les
            éventuels frais de domaine, d&apos;hébergement ou de services
            tiers sont présentés séparément.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
