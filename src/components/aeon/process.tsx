import { ClipboardList, FileText, PenTool, Rocket, Code2 } from "lucide-react"
import { Reveal } from "@/components/aeon/reveal"

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Diagnostic",
    text: "Comprendre votre activité, vos objectifs et les problèmes actuels.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Proposition",
    text: "Définir le périmètre, les fonctionnalités, le calendrier et le prix.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Conception",
    text: "Créer une direction visuelle et une première version à valider.",
  },
  {
    number: "04",
    icon: Code2,
    title: "Développement",
    text: "Construire, optimiser et tester le site ou l'automatisation.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Mise en ligne",
    text: "Publier la solution et vous accompagner dans sa prise en main.",
  },
]

export function Process() {
  return (
    <section id="methode" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un processus clair, du besoin à la mise en ligne
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="relative flex gap-4 lg:flex-col lg:gap-5">
                {i < STEPS.length - 1 && (
                  <div className="absolute left-6 top-14 h-[calc(100%-2rem)] w-px bg-white/10 lg:left-0 lg:right-0 lg:top-6 lg:hidden lg:h-px lg:w-full" />
                )}

                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#121824]">
                  <step.icon className="size-5 text-[#5B8CFF]" aria-hidden="true" />
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground/70">
                    {step.number}
                  </span>
                  <h3 className="mt-1 font-heading text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
