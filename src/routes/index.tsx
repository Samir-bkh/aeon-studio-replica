import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/aeon/navbar";
import { Hero } from "@/components/aeon/hero";
import { TrustBar } from "@/components/aeon/trust-bar";
import { Problems } from "@/components/aeon/problems";
import { Services } from "@/components/aeon/services";
import { Projects } from "@/components/aeon/projects";
import { BeforeAfter } from "@/components/aeon/before-after";
import { AutomationDemo } from "@/components/aeon/automation-demo";
import { Process } from "@/components/aeon/process";
import { About } from "@/components/aeon/about";
import { Pricing } from "@/components/aeon/pricing";
import { Faq } from "@/components/aeon/faq";
import { Contact } from "@/components/aeon/contact";
import { Footer } from "@/components/aeon/footer";

const title = "Aeon Studio — Sites web et automatisations pour PME";
const description =
  "Création, refonte et optimisation de sites web ainsi qu'automatisations pour artisans, TPE et PME à Strasbourg et partout en France.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Problems />
        <Services />
        <Projects />
        <BeforeAfter />
        <AutomationDemo />
        <Process />
        <About />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
