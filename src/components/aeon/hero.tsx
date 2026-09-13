

import { motion, useReducedMotion } from "framer-motion"
import { Gauge, MonitorSmartphone, UserCheck } from "lucide-react"
import { Button } from "@/components/aeon-ui/button"
import { siteConfig } from "@/lib/site-config"

const COMMITMENTS = [
  { icon: MonitorSmartphone, label: "Design adapté à votre activité" },
  { icon: Gauge, label: "Responsive et performant" },
  { icon: UserCheck, label: "Un interlocuteur unique" },
]

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Arrière-plan */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/4 size-[36rem] rounded-full bg-[#5B8CFF]/20 blur-[120px]" />
        <div className="absolute -top-20 right-0 size-[30rem] rounded-full bg-[#8B5CF6]/20 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Sites web • Développement • Automatisation
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
            Un site qui <span className="text-gradient-brand">valorise</span>{" "}
            votre entreprise. Des automatisations qui vous font{" "}
            <span className="text-gradient-brand">gagner du temps</span>.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            J&apos;accompagne les artisans, TPE et PME dans la création ou la
            refonte de leur site web, ainsi que dans l&apos;automatisation de
            tâches commerciales et administratives répétitives.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            Basé à {siteConfig.city} — Disponible partout en {siteConfig.country}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full px-6 text-base"
              nativeButton={false}
              render={<a href="#demonstrations" />}
            >
              Découvrir les démonstrations
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-transparent px-6 text-base hover:bg-white/5"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              Parler de mon projet
            </Button>
          </div>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-6">
            {COMMITMENTS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Icon className="size-4 text-[#5B8CFF]" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          className="relative"
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <BrowserMockup />
        </motion.div>
      </div>
    </section>
  )
}

function BrowserMockup() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -top-4 -right-4 rounded-full border border-white/10 bg-[#121824] px-3 py-1 text-xs font-medium text-[#39D9C6] shadow-lg">
        Rapide
      </div>
      <div className="absolute -bottom-5 -left-5 rounded-full border border-white/10 bg-[#121824] px-3 py-1 text-xs font-medium text-[#5B8CFF] shadow-lg">
        Responsive
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D111A] shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#121824] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-yellow-400/70" />
          <span className="size-2.5 rounded-full bg-green-400/70" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white/5" />
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6]" />
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded bg-white/10" />
              <div className="h-2 w-8 rounded bg-white/10" />
              <div className="h-2 w-8 rounded bg-white/10" />
            </div>
          </div>

          <div className="space-y-2 rounded-xl border border-white/10 bg-[#121824] p-4">
            <div className="h-3 w-3/4 rounded bg-white/20" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-5/6 rounded bg-white/10" />
            <div className="mt-3 h-7 w-28 rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2 rounded-xl border border-white/10 bg-[#171E2C] p-3">
              <div className="size-6 rounded-full bg-[#39D9C6]/30" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
            </div>
            <div className="space-y-2 rounded-xl border border-white/10 bg-[#171E2C] p-3">
              <div className="size-6 rounded-full bg-[#8B5CF6]/30" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121824] p-3">
            <div className="h-14 w-10 rounded-lg border border-white/10 bg-[#0D111A]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-4/5 rounded bg-white/10" />
              <div className="h-2 w-3/5 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
