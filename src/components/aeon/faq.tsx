import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/aeon-ui/accordion"
import { Reveal } from "@/components/aeon/reveal"

const FAQ_ITEMS = [
  {
    question: "Combien coûte un site web ?",
    answer:
      "Une optimisation ciblée commence autour de 290 € et une création ou refonte complète autour de 790 €. Un devis précis est établi après analyse du besoin.",
  },
  {
    question: "Combien de temps faut-il pour réaliser un projet ?",
    answer:
      "Une amélioration ciblée peut prendre quelques jours. Une création ou une refonte complète nécessite généralement plusieurs semaines selon le nombre de pages, le contenu et les fonctionnalités.",
  },
  {
    question: "Puis-je conserver mon domaine actuel ?",
    answer:
      "Oui. Dans la plupart des cas, le domaine existant peut être conservé et relié au nouveau site.",
  },
  {
    question: "Travaillez-vous uniquement à Strasbourg ?",
    answer:
      "Je suis basé à Strasbourg, mais je peux travailler à distance avec des entreprises partout en France.",
  },
  {
    question: "Pouvez-vous améliorer seulement une partie de mon site ?",
    answer:
      "Oui. Il est possible d'améliorer une page, le responsive, les performances, le formulaire ou certaines sections sans refaire l'intégralité du site.",
  },
  {
    question: "Utilisez-vous l'intelligence artificielle ?",
    answer:
      "J'utilise certains outils d'intelligence artificielle lorsqu'ils apportent une utilité réelle, notamment pour accélérer la conception ou automatiser des tâches précises. Le travail reste personnalisé, vérifié et contrôlé humainement.",
  },
  {
    question: "Proposez-vous la maintenance ?",
    answer:
      "Une solution de maintenance peut être proposée selon les technologies utilisées et les besoins de l'entreprise.",
  },
]

export function Faq() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Accordion className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`item-${i}`}
                className="rounded-2xl border border-white/[0.07] bg-[#121824] px-5"
              >
                <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
