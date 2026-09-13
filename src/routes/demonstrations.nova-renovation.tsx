import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { DemoBanner, DemoFooter, DemoNav } from "@/components/nova-renovation/chrome";
import {
  DemoAvis,
  DemoComparateur,
  DemoHero,
  DemoMethode,
  DemoServices,
  DemoRealisations,
  type ProjectType,
} from "@/components/nova-renovation/sections";
import { NovaDevisForm } from "@/components/nova-renovation/devis-form";

const title =
  "Nova Rénovation — Démonstration de site de rénovation | Aeon Studio";
const description =
  "Démonstration fictive d'un site d'entreprise de rénovation à Strasbourg, créée par Aeon Studio : services, concepts de réalisations avec avant/après, comparateur et demande de devis.";

export const Route = createFileRoute("/demonstrations/nova-renovation")({
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
  component: NovaRenovationDemo,
});

function NovaRenovationDemo() {
  const [projectType, setProjectType] = useState<ProjectType>(
    "Rénovation complète",
  );

  const goToDevis = useCallback((type?: ProjectType) => {
    if (type) setProjectType(type);
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    el?.querySelector<HTMLElement>("input, select, textarea")?.focus({
      preventScroll: true,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#3a3a36]">
      <DemoBanner />
      <DemoNav onDevis={() => goToDevis()} />
      <main>
        <DemoHero onDevis={() => goToDevis()} />
        <DemoServices onDevis={(type) => goToDevis(type)} />
        <DemoRealisations />
        <DemoComparateur />
        <DemoMethode />
        <DemoAvis />
        <NovaDevisForm
          projectType={projectType}
          onProjectTypeChange={setProjectType}
        />
      </main>
      <DemoFooter />
    </div>
  );
}
