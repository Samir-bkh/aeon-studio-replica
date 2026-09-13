

import { motion, useReducedMotion } from "framer-motion"
import { Gem, ShieldCheck, Sparkles } from "lucide-react"
import { Reveal } from "@/components/aeon/reveal"
import { siteConfig } from "@/lib/site-config"

const PRINCIPLES = [
  { icon: Sparkles, label: "Clarté" },
  { icon: ShieldCheck, label: "Fiabilité" },
  { icon: Gem, label: "Personnalisation" },
]

export function About() {
  return (
    <section id="a-propos" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <AboutVisual />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Un interlocuteur unique pour votre projet
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Je suis étudiant en école d&apos;ingénieurs à Strasbourg et je
              développe des solutions numériques pour les artisans, TPE et
              PME. Mon approche combine conception, développement web et
              automatisation, avec un objectif simple : proposer des outils
              modernes, compréhensibles et réellement utiles.
            </p>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              J&apos;utilise notamment des outils d&apos;intelligence
              artificielle lorsqu&apos;ils permettent d&apos;accélérer
              certaines étapes. Chaque solution reste personnalisée, testée
              et contrôlée humainement.
            </p>

            <ul className="mt-8 flex flex-wrap gap-4">
              {PRINCIPLES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-[#121824] px-4 py-2 text-sm text-foreground/90"
                >
                  <Icon className="size-4 text-[#5B8CFF]" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function AboutVisual() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto max-w-sm">
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5B8CFF]/15 blur-[80px]" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121824] shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0D111A] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-400/60" />
          <span className="size-2.5 rounded-full bg-yellow-400/60" />
          <span className="size-2.5 rounded-full bg-green-400/60" />
        </div>

        <div className="flex flex-col items-center gap-6 p-8">
          <motion.div
            className="relative flex size-28 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#5B8CFF]/25 to-[#8B5CF6]/25"
            animate={shouldReduceMotion ? {} : { rotate: [0, 2, 0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-heading text-3xl font-bold text-foreground">
              {siteConfig.initials}
            </span>
          </motion.div>

          <div className="w-full space-y-2">
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="h-2 w-full rounded bg-white/[0.06]" />
            <div className="h-2 w-5/6 rounded bg-white/[0.06]" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 rounded-full bg-[#5B8CFF]/20" />
              <div className="h-6 w-16 rounded-full bg-[#8B5CF6]/20" />
              <div className="h-6 w-16 rounded-full bg-[#39D9C6]/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
