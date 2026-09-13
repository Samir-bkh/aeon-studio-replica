import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { DemoBanner, DemoFooter, DemoNav } from "@/components/atelier-vert/chrome";
import {
  DemoAvis,
  DemoComparateur,
  DemoHero,
  DemoMethode,
  DemoPrestations,
  DemoRealisations,
  type ProjectType,
} from "@/components/atelier-vert/sections";
import { DemoDevisForm } from "@/components/atelier-vert/devis-form";

const title =
  "Atelier Vert Alsace — Démonstration de site paysagiste | Aeon Studio";
const description =
  "Démonstration fictive d'un site de paysagiste à Strasbourg, créée par Aeon Studio : prestations, concepts de réalisations, comparateur avant/après et demande de devis.";

export const Route = createFileRoute("/demonstrations/atelier-vert")({
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
  component: AtelierVertDemo,
});

function AtelierVertDemo() {
  const [projectType, setProjectType] = useState<ProjectType>(
    "Création de jardin",
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
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1E2522]">
      <DemoBanner />
      <DemoNav onDevis={() => goToDevis()} />
      <main>
        <DemoHero onDevis={() => goToDevis()} />
        <DemoPrestations onDevis={(type) => goToDevis(type)} />
        <DemoRealisations />
        <DemoComparateur />
        <DemoMethode />
        <DemoAvis />
        <DemoDevisForm
          projectType={projectType}
          onProjectTypeChange={setProjectType}
        />
      </main>
      <DemoFooter />
    </div>
  );
}
