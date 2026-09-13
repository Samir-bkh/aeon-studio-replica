

import { useEffect, useRef, useState } from "react"
import {
  BellRing,
  Check,
  FileSearch,
  Inbox,
  Loader2,
  NotebookPen,
  RotateCcw,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/aeon-ui/button"
import { Reveal } from "@/components/aeon/reveal"

type StepStatus = "idle" | "active" | "done"

const STEPS = [
  {
    icon: Inbox,
    title: "Demande reçue",
    text: "Un prospect complète le formulaire du site.",
  },
  {
    icon: FileSearch,
    title: "Informations analysées",
    text: "Le type de besoin, les coordonnées et le message sont identifiés.",
  },
  {
    icon: UserPlus,
    title: "Prospect enregistré",
    text: "Les informations sont ajoutées dans un tableau ou un outil de suivi.",
  },
  {
    icon: NotebookPen,
    title: "Brouillon préparé",
    text: "Une proposition de réponse est générée pour faire gagner du temps.",
  },
  {
    icon: BellRing,
    title: "Responsable notifié",
    text: "Le responsable vérifie les informations et valide l'action suivante.",
  },
] as const

const STEP_DELAY_MS = 1100

export function AutomationDemo() {
  const [statuses, setStatuses] = useState<StepStatus[]>(
    Array(STEPS.length).fill("idle")
  )
  const [running, setRunning] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const play = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setRunning(true)
    setStatuses(Array(STEPS.length).fill("idle"))

    STEPS.forEach((_, index) => {
      const activeAt = index * STEP_DELAY_MS
      const doneAt = activeAt + STEP_DELAY_MS * 0.7

      timeoutsRef.current.push(
        setTimeout(() => {
          setStatuses((prev) =>
            prev.map((s, i) => (i === index ? "active" : s))
          )
        }, activeAt)
      )
      timeoutsRef.current.push(
        setTimeout(() => {
          setStatuses((prev) =>
            prev.map((s, i) => (i === index ? "done" : s))
          )
          if (index === STEPS.length - 1) setRunning(false)
        }, doneAt)
      )
    })
  }

  const hasStarted = statuses.some((s) => s !== "idle")

  return (
    <section id="automatisation" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Visualisez une automatisation en quelques secondes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Cette simulation montre comment une demande entrante peut être
            organisée et préparée avant intervention du responsable.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Button
            size="lg"
            onClick={play}
            disabled={running}
            className="h-12 rounded-full px-6 text-base"
          >
            {running ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Démonstration en cours
              </>
            ) : hasStarted ? (
              <>
                <RotateCcw className="size-4" aria-hidden="true" />
                Rejouer
              </>
            ) : (
              "Lancer la démonstration"
            )}
          </Button>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <ol className="grid gap-4 sm:grid-cols-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative flex sm:flex-col">
                {i < STEPS.length - 1 && (
                  <div
                    className={`absolute left-6 top-12 h-full w-px sm:left-0 sm:right-0 sm:top-6 sm:h-px sm:w-full ${
                      statuses[i] === "done"
                        ? "bg-[#5B8CFF]"
                        : "bg-white/10"
                    } transition-colors duration-500`}
                    aria-hidden="true"
                  />
                )}

                <StepCard step={step} status={statuses[i] ?? "idle"} />
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-[#121824] p-5 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              Exemple conceptuel :
            </span>{" "}
            chaque automatisation est adaptée aux outils de l&apos;entreprise.
            Les réponses et actions importantes peuvent conserver une
            validation humaine.
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function StepCard({
  step,
  status,
}: {
  step: (typeof STEPS)[number]
  status: StepStatus
}) {
  const Icon = step.icon

  return (
    <div
      className={`relative z-10 flex flex-1 gap-3 rounded-2xl border p-4 transition-all duration-300 sm:flex-col sm:gap-2 ${
        status === "active"
          ? "border-[#5B8CFF]/50 bg-[#121824] shadow-lg shadow-[#5B8CFF]/10"
          : status === "done"
            ? "border-white/10 bg-[#121824]"
            : "border-white/[0.06] bg-[#0D111A]"
      }`}
    >
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
          status === "done"
            ? "border-[#39D9C6]/40 bg-[#39D9C6]/10 text-[#39D9C6]"
            : status === "active"
              ? "border-[#5B8CFF]/40 bg-[#5B8CFF]/10 text-[#5B8CFF]"
              : "border-white/10 bg-white/[0.03] text-muted-foreground"
        }`}
      >
        {status === "active" ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : status === "done" ? (
          <Check className="size-5" aria-hidden="true" />
        ) : (
          <Icon className="size-5" aria-hidden="true" />
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{step.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {step.text}
        </p>
        <span
          className={`mt-2 inline-block text-[10px] font-medium uppercase tracking-wide ${
            status === "done"
              ? "text-[#39D9C6]"
              : status === "active"
                ? "text-[#5B8CFF]"
                : "text-muted-foreground/60"
          }`}
        >
          {status === "done"
            ? "Terminé"
            : status === "active"
              ? "En cours"
              : "En attente"}
        </span>
      </div>
    </div>
  )
}
