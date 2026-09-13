import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import {
  DemoBanner,
  DemoFooter,
  DemoNav,
  type DemoMode,
} from "@/components/nova-renovation/chrome";
import { LegacySite } from "@/components/nova-renovation/legacy";
import {
  DemoComparateur,
  DemoConfiance,
  DemoHero,
  DemoMethode,
  DemoServices,
  DemoRealisations,
  type ProjectType,
} from "@/components/nova-renovation/sections";
import { NovaDevisForm } from "@/components/nova-renovation/devis-form";

const title =
  "Nova Rénovation — Démonstration de refonte de site | Aeon Studio";
const description =
  "Démonstration fictive d'une entreprise de rénovation : comparez la version avant refonte et la version moderne, avec prestations, concepts de réalisations, comparateur et demande d'estimation.";

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
  const [mode, setMode] = useState<DemoMode>("apres");
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
    <div className="min-h-screen overflow-x-hidden bg-white text-[#132238]">
      <DemoBanner mode={mode} onModeChange={setMode} />

      {mode === "avant" ? (
        <LegacySite />
      ) : (
        <>
          <DemoNav onDevis={() => goToDevis()} />
          <main>
            <DemoHero onDevis={() => goToDevis()} />
            <DemoServices onDevis={(type) => goToDevis(type)} />
            <DemoRealisations />
            <DemoComparateur />
            <DemoMethode />
            <DemoConfiance />
            <NovaDevisForm
              projectType={projectType}
              onProjectTypeChange={setProjectType}
            />
          </main>
          <DemoFooter />
        </>
      )}
    </div>
  );
}
