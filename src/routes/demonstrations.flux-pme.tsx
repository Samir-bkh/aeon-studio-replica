import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

import { DemoBanner, DemoFooter, DemoNav } from "@/components/flux-pme/chrome";
import {
  DemoAvis,
  DemoBenefits,
  DemoHero,
  DemoIntegrations,
  DemoProcessus,
} from "@/components/flux-pme/sections";
import { FluxDevisForm } from "@/components/flux-pme/devis-form";

const title =
  "Flux PME — Démonstration d'automatisation pour PME | Aeon Studio";
const description =
  "Démonstration fictive d'un concept d'automatisation des demandes entrantes pour PME, créée par Aeon Studio : processus, bénéfices, intégrations et demande de démonstration.";

export const Route = createFileRoute("/demonstrations/flux-pme")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FluxPmeDemo,
});

function FluxPmeDemo() {
  const goToDevis = useCallback(() => {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.querySelector<HTMLElement>("input, select, textarea")?.focus({
      preventScroll: true,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0d1117] text-white">
      <DemoBanner />
      <DemoNav onDevis={goToDevis} />
      <main>
        <DemoHero onDevis={goToDevis} />
        <DemoProcessus />
        <DemoBenefits />
        <DemoIntegrations />
        <DemoAvis />
        <FluxDevisForm />
      </main>
      <DemoFooter />
    </div>
  );
}
