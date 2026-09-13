import { Clock, Inbox, MonitorX } from "lucide-react"
import { Reveal } from "@/components/aeon/reveal"

const PROBLEMS = [
  {
    icon: MonitorX,
    title: "Un site devenu vieillissant",
    text: "Votre site ne reflète plus la qualité de votre travail, manque de clarté ou devient difficile à consulter depuis un téléphone.",
  },
  {
    icon: Inbox,
    title: "Des demandes mal organisées",
    text: "Les informations arrivent par téléphone, e-mail et messages, sans processus clair pour les centraliser et les suivre.",
  },
  {
    icon: Clock,
    title: "Des tâches répétitives",
    text: "Confirmations, classements, rappels et préparation des réponses prennent du temps chaque semaine.",
  },
]

export function Problems() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Votre présence numérique doit soutenir votre activité
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Un site ne doit pas seulement être esthétique. Il doit présenter
            clairement votre entreprise, rassurer vos prospects et rendre la
            prise de contact aussi simple que possible.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-white/[0.07] bg-[#121824] p-6 transition-colors hover:border-white/[0.14]">
                <div className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <Icon className="size-5 text-[#5B8CFF]" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
