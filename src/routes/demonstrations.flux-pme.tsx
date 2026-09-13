import { createFileRoute } from "@tanstack/react-router";

import { FluxApp } from "@/components/flux-pme/app";

const title =
  "Flux PME — Simulation interactive de gestion des demandes | Aeon Studio";
const description =
  "Simulation fictive d'une interface de gestion et d'automatisation des demandes entrantes d'une PME, créée par Aeon Studio : analyse, brouillon de réponse et validation humaine, sans aucune donnée réelle.";

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
  return <FluxApp />;
}
