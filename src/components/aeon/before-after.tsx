

import { useCallback, useRef, useState } from "react"
import { GripVertical, Phone, Star } from "lucide-react"
import { Reveal } from "@/components/aeon/reveal"

export function BeforeAfter() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const ratio = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, ratio)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const stopDragging = () => {
    draggingRef.current = false
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - 5))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + 5))
    } else if (e.key === "Home") {
      e.preventDefault()
      setPosition(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setPosition(100)
    }
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une refonte que l&apos;on comprend immédiatement
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Faites glisser le curseur pour comparer une interface
            volontairement vieillissante avec une proposition plus moderne et
            structurée.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div
            ref={trackRef}
            onPointerMove={onPointerMove}
            onPointerUp={stopDragging}
            onPointerLeave={stopDragging}
            className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-white/10 bg-[#121824] sm:aspect-[16/9]"
          >
            <div className="absolute inset-0">
              <AfterView />
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <BeforeView />
            </div>

            <div
              className="absolute inset-y-0 z-10 flex w-0 items-center justify-center"
              style={{ left: `${position}%` }}
            >
              <div className="absolute inset-y-0 w-px bg-white/40" />
              <button
                type="button"
                role="slider"
                aria-label="Faire glisser pour comparer avant et après"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(position)}
                onPointerDown={onPointerDown}
                onKeyDown={onKeyDown}
                className="relative flex size-10 shrink-0 -translate-x-1/2 cursor-grab items-center justify-center rounded-full border border-white/20 bg-[#171E2C] text-foreground shadow-lg active:cursor-grabbing"
              >
                <GripVertical className="size-4" aria-hidden="true" />
              </button>
            </div>

            <span className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
              Avant
            </span>
            <span className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
              Après
            </span>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Exemple fictif créé uniquement pour démontrer une méthode de
            refonte.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function BeforeView() {
  return (
    <div className="flex h-full w-full min-w-[320px] flex-col bg-[#1c1c1c] p-5 text-[#c9c9c9] sm:min-w-[640px]">
      <div className="text-center text-lg font-bold uppercase tracking-wide text-[#d4d4d4]">
        Nova Renovation
      </div>
      <div className="mx-auto mt-1 h-px w-24 bg-[#555]" />
      <p className="mt-4 text-xs leading-relaxed text-[#9a9a9a]">
        Bienvenue sur le site de notre entreprise. Nous proposons de nombreux
        services de renovation depuis plusieurs annees dans la region. Nous
        intervenons pour tous types de travaux, contactez-nous pour plus
        d&apos;informations sur nos prestations et nos disponibilites.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[#9a9a9a]">
        Peinture, plomberie, electricite, menuiserie, carrelage et bien
        d&apos;autres services sont disponibles sur simple demande par
        telephone.
      </p>
      <button className="mt-4 w-fit rounded-none border border-[#555] bg-[#2a2a2a] px-3 py-1.5 text-[10px] text-[#c9c9c9]">
        Contact
      </button>
      <div className="mt-5 grid grid-cols-3 gap-2 opacity-70">
        <div className="h-10 border border-[#3a3a3a] bg-[#242424]" />
        <div className="h-10 border border-[#3a3a3a] bg-[#242424]" />
        <div className="h-10 border border-[#3a3a3a] bg-[#242424]" />
      </div>
    </div>
  )
}

function AfterView() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#0D111A] to-[#121824] p-6">
      <div>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-medium text-[#39D9C6]">
          Rénovation & travaux
        </span>
        <h3 className="mt-3 font-heading text-xl font-bold text-foreground sm:text-2xl">
          Nova Rénovation
        </h3>
        <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
          Des travaux de qualité, une équipe de confiance et un
          accompagnement clair à chaque étape de votre projet.
        </p>
        <button className="mt-4 rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#8B5CF6] px-4 py-2 text-xs font-medium text-white">
          Demander un devis
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Peinture", "Plomberie", "Électricité"].map((s) => (
          <div
            key={s}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5"
          >
            <div className="flex items-center gap-1 text-[9px] text-[#f8d76b]">
              <Star className="size-2.5 fill-current" aria-hidden="true" />
              <Star className="size-2.5 fill-current" aria-hidden="true" />
              <Star className="size-2.5 fill-current" aria-hidden="true" />
            </div>
            <p className="mt-1.5 text-[10px] font-medium text-foreground">{s}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 hidden items-center gap-1.5 rounded-full border border-white/10 bg-[#171E2C] px-2.5 py-1 text-[10px] text-muted-foreground sm:flex">
        <Phone className="size-3" aria-hidden="true" />
        Accessible
      </div>
    </div>
  )
}
