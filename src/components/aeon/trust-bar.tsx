import { Gauge, Layers, MonitorSmartphone, Workflow, Wrench } from "lucide-react"

const ITEMS = [
  { icon: Layers, label: "Sites vitrines modernes" },
  { icon: MonitorSmartphone, label: "Expérience mobile soignée" },
  { icon: Gauge, label: "Optimisation des performances" },
  { icon: Workflow, label: "Automatisations sur mesure" },
  { icon: Wrench, label: "Accompagnement de la conception à la mise en ligne" },
]

export function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0D111A]/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="size-4 text-[#39D9C6]" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-muted-foreground/80">
          Des solutions adaptées aux besoins réels des petites entreprises.
        </p>
      </div>
    </section>
  )
}
