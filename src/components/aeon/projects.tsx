

import { useState } from "react"
import {
  Leaf,
  Hammer,
  Workflow,
  Star,
  Quote,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/aeon-ui/badge"
import { Button } from "@/components/aeon-ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/aeon-ui/dialog"
import { Reveal } from "@/components/aeon/reveal"

interface Project {
  id: string
  title: string
  category: string
  description: string
  goals: string[]
  disclaimer: string
  tech: string[]
  icon: typeof Leaf
  accent: string
  demoHref?: string
}

const PROJECTS: Project[] = [
  {
    id: "atelier-vert-alsace",
    title: "Atelier Vert Alsace",
    category: "Concept de site vitrine pour paysagiste",
    description:
      "Un concept pensé pour valoriser les prestations, les réalisations et les avis d'une entreprise de paysage, tout en facilitant les demandes de devis sur mobile.",
    goals: [
      "Structurer les prestations",
      "Mettre les réalisations en valeur",
      "Rassurer grâce aux avis",
      "Simplifier la prise de contact",
    ],
    disclaimer:
      "Projet fictif réalisé à titre de démonstration. Atelier Vert Alsace n'est pas une entreprise réelle.",
    tech: ["Design responsive", "Galerie de réalisations", "Formulaire de devis"],
    icon: Leaf,
    accent: "#39D9C6",
    demoHref: "/demonstrations/atelier-vert",
  },
  {
    id: "nova-renovation",
    title: "Nova Rénovation",
    category: "Concept de refonte pour une entreprise de rénovation",
    description:
      "Transformation d'une présentation vieillissante et difficile à parcourir en une interface claire, moderne et orientée vers les réalisations et la prise de contact.",
    goals: [
      "Clarifier le positionnement",
      "Moderniser l'image",
      "Améliorer la navigation mobile",
      "Rendre le devis plus accessible",
    ],
    disclaimer: "Démonstration fictive. Nova Rénovation n'est pas une entreprise réelle.",
    tech: ["Refonte UI/UX", "Hiérarchie visuelle", "Comparateur avant/après"],
    icon: Hammer,
    accent: "#5B8CFF",
    demoHref: "/demonstrations/nova-renovation",
  },
  {
    id: "flux-pme",
    title: "Flux PME",
    category: "Concept d'automatisation des demandes entrantes",
    description:
      "Un exemple de processus permettant de centraliser une demande, d'en extraire les informations utiles, de préparer une réponse et d'alerter le responsable.",
    goals: [
      "Éviter les demandes oubliées",
      "Centraliser les informations",
      "Préparer le suivi",
      "Conserver une validation humaine",
    ],
    disclaimer: "Simulation conceptuelle sans traitement de données réelles.",
    tech: ["Automatisation de flux", "Notifications", "Validation humaine"],
    icon: Workflow,
    accent: "#8B5CF6",
    demoHref: "/demonstrations/flux-pme",
  },
]

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="demonstrations" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Des démonstrations concrètes, pas seulement des promesses
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Ces concepts fictifs ont été créés pour présenter mon approche en
            matière de design, de structure, de responsive et d&apos;expérience
            utilisateur.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1} className="h-full">
              <ProjectCard project={project} onOpen={() => setActive(project)} />
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-lg sm:max-w-lg">
          {active && <ProjectDetails project={active} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const Icon = project.icon

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121824]">
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="outline"
            className="border-white/15 bg-white/[0.03] text-[11px] font-medium text-muted-foreground"
          >
            Concept fictif
          </Badge>
          <Icon className="size-4 shrink-0" style={{ color: project.accent }} aria-hidden="true" />
        </div>

        <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-muted-foreground">
          {project.category}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          {project.demoHref ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={project.demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="w-full rounded-full"
            >
              Voir la démonstration
              <ExternalLink className="size-4" aria-hidden="true" />
            </Button>
          ) : null}
          <Button
            variant="outline"
            onClick={onOpen}
            className="w-full rounded-full border-white/15 bg-transparent hover:bg-white/5"
          >
            Voir les détails du projet
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative h-44 border-b border-white/[0.07] bg-[#0D111A] p-4">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}, transparent 60%)`,
        }}
      />
      <div className="relative flex h-full gap-3">
        <div className="flex-1 rounded-lg border border-white/10 bg-[#121824] p-3">
          <div className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-red-400/60" />
            <span className="size-1.5 rounded-full bg-yellow-400/60" />
            <span className="size-1.5 rounded-full bg-green-400/60" />
          </div>
          <div
            className="mt-3 h-2 w-1/2 rounded"
            style={{ backgroundColor: project.accent, opacity: 0.6 }}
          />
          <div className="mt-2 h-2 w-full rounded bg-white/10" />
          <div className="mt-1.5 h-2 w-4/5 rounded bg-white/10" />
          <div className="mt-3 flex gap-1.5">
            <div className="h-5 w-12 rounded-full" style={{ backgroundColor: project.accent, opacity: 0.5 }} />
            <div className="h-5 w-8 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="w-14 rounded-lg border border-white/10 bg-[#121824] p-2">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="mt-2 space-y-1.5">
            <div className="h-6 w-full rounded bg-white/[0.06]" />
            <div className="h-6 w-full rounded bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div>
      <DialogHeader>
        <Badge
          variant="outline"
          className="w-fit border-white/15 bg-white/[0.03] text-[11px] font-medium text-muted-foreground"
        >
          Concept fictif
        </Badge>
        <DialogTitle className="font-heading text-xl">{project.title}</DialogTitle>
        <DialogDescription>{project.category}</DialogDescription>
      </DialogHeader>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Objectifs
        </h4>
        <ul className="mt-2 space-y-1.5">
          {project.goals.map((goal) => (
            <li key={goal} className="flex items-start gap-2 text-sm text-foreground/90">
              <Star className="mt-0.5 size-3.5 shrink-0 text-[#5B8CFF]" aria-hidden="true" />
              {goal}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Compétences démontrées
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/10 bg-[#0D111A] p-3">
        <Quote className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          {project.disclaimer}
        </p>
      </div>
    </div>
  )
}
