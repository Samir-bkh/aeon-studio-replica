/**
 * Mode « Avant la refonte » : reconstitution volontairement datée d'un ancien
 * site d'entreprise de rénovation. Tout est fictif.
 */

const OLD_PHOTO =
  "https://images.pexels.com/photos/5317154/pexels-photo-5317154.jpeg?auto=compress&cs=tinysrgb&w=940&h=650&dpr=2";

const OLD_SERVICES = [
  {
    title: "RENOVATION COMPLETE",
    text: "Nous réalisons tous types de travaux de rénovation complète d'appartements et de maisons anciennes : dépose des anciens revêtements, reprise des cloisons, remise en état des sols et des murs, mise en peinture, remplacement des menuiseries, travaux d'électricité et de plomberie selon les besoins du chantier et les demandes formulées par le client lors de la visite technique préalable.",
  },
  {
    title: "CUISINES ET SALLES DE BAINS",
    text: "Installation et remplacement de cuisines équipées, de meubles vasques, de douches, de baignoires, de faïences murales, de carrelages au sol, de robinetteries, d'évacuations et d'alimentations en eau, avec raccordements et finitions réalisés par nos équipes selon les règles de l'art et les normes en vigueur au moment des travaux.",
  },
  {
    title: "PEINTURE, ENDUITS, PAPIERS PEINTS",
    text: "Préparation des supports, rebouchage, ponçage, sous-couche, application de peintures acryliques ou glycéro, pose de papiers peints et de toiles de verre, réalisation d'enduits décoratifs, peinture de plafonds, de boiseries, de radiateurs et de portes intérieures pour les particuliers et les professionnels.",
  },
  {
    title: "DIVERS TRAVAUX",
    text: "Petits travaux de maçonnerie, pose de parquets flottants, pose de plinthes, création de placards, isolation de combles perdus, remplacement de volets, dépannage divers, évacuation des gravats en déchetterie et remise en propreté du chantier en fin d'intervention.",
  },
];

export function LegacySite() {
  return (
    <div
      className="min-h-screen bg-[#e9e5da] py-6 font-serif text-[#2d2a24]"
      lang="fr"
    >
      <div className="mx-auto max-w-4xl border-4 border-double border-[#8a7b5c] bg-[#fdfbf4] px-4 py-6 sm:px-8">
        <p className="mb-4 border border-[#8a7b5c] bg-[#fff8dc] p-2 text-center text-[11px] leading-snug">
          Version fictive créée pour illustrer les limites possibles d&apos;un
          ancien site.
        </p>

        <header className="border-b-4 border-[#8a7b5c] pb-4 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-[#7a1f1f] uppercase sm:text-3xl">
            Entreprise Nova Renovation
          </h1>
          <p className="mt-1 text-xs italic sm:text-sm">
            Travaux de rénovation tous corps d&apos;état — Strasbourg et
            environs — Depuis de nombreuses années à votre service
          </p>
          <p className="mt-2 text-[11px]">
            Bienvenue sur notre site internet. Ce site est en cours de mise à
            jour. Merci de votre compréhension.
          </p>
        </header>

        <nav
          aria-label="Menu de l'ancien site"
          className="border-b border-[#8a7b5c] bg-[#f3ecd8] py-2 text-center text-xs"
        >
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {[
              "Accueil",
              "Qui sommes-nous",
              "Nos prestations",
              "Photos",
              "Liens utiles",
              "Livre d'or",
              "Nous contacter",
            ].map((item) => (
              <li key={item}>
                <span className="text-[#1a3a8f] underline">{item}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-lg font-bold text-[#7a1f1f] uppercase">
              Présentation de la société
            </h2>
            <p className="mt-2 text-justify text-[13px] leading-6">
              La société Nova Renovation est une entreprise générale du bâtiment
              qui intervient auprès des particuliers, des syndics de
              copropriété, des agences immobilières et des entreprises pour la
              réalisation de travaux de rénovation intérieure et extérieure. Nos
              équipes se déplacent sur l&apos;ensemble du secteur afin
              d&apos;établir un premier contact, d&apos;évaluer la nature des
              travaux à réaliser, de mesurer les surfaces concernées, de
              vérifier l&apos;état des supports existants et de remettre ensuite
              une proposition chiffrée détaillée qui sera transmise par courrier
              postal ou par courrier électronique dans un délai variable selon
              la charge de travail en cours.
            </p>
            <p className="mt-3 text-justify text-[13px] leading-6">
              Nous attachons une grande importance à la qualité de nos
              prestations ainsi qu&apos;au respect des délais annoncés. Chaque
              chantier fait l&apos;objet d&apos;un suivi et les finitions sont
              contrôlées avant la remise des clés. N&apos;hésitez pas à nous
              consulter pour tout renseignement complémentaire concernant nos
              interventions, nos disponibilités ou les modalités de règlement
              acceptées par notre société.
            </p>

            <h2 className="mt-6 text-lg font-bold text-[#7a1f1f] uppercase">
              Nos prestations
            </h2>
            <div className="mt-3 space-y-4">
              {OLD_SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="border border-[#8a7b5c] bg-[#f9f5e7] p-3"
                >
                  <h3 className="text-sm font-bold text-[#1a3a8f] underline">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-justify text-[12px] leading-6">
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="text-[12px]">
            <div className="border border-[#8a7b5c] bg-[#f3ecd8] p-3">
              <h2 className="text-sm font-bold text-[#7a1f1f] uppercase">
                Informations
              </h2>
              <p className="mt-2 leading-5">
                Horaires : du lundi au vendredi, de 8h00 à 12h00 et de 14h00 à
                18h00. Fermé le samedi et le dimanche ainsi que les jours
                fériés.
              </p>
              <p className="mt-2 leading-5">
                Devis gratuit sur demande après visite sur place.
              </p>
            </div>

            <div className="mt-4 border border-[#8a7b5c] p-2">
              <img
                src={OLD_PHOTO}
                alt="Chantier de rénovation en cours"
                loading="lazy"
                className="h-40 w-full object-cover grayscale-[35%]"
              />
              <p className="mt-1 text-center text-[11px] italic">
                Photo d&apos;illustration fictive
              </p>
            </div>

            <div className="mt-4 border border-[#8a7b5c] bg-[#fff8dc] p-3">
              <p className="text-[11px] leading-5">
                Pour nous contacter, merci de consulter la rubrique « Nous
                contacter » située dans le menu ci-dessus, en bas de la page
                d&apos;accueil, ou d&apos;adresser un courrier à notre siège
                social. Les demandes sont traitées par ordre d&apos;arrivée.
              </p>
            </div>
          </aside>
        </div>

        <footer className="mt-8 border-t-4 border-[#8a7b5c] pt-3 text-center text-[11px]">
          <p>
            Nous contacter : formulaire disponible en bas de page — réponse sous
            plusieurs jours ouvrés.
          </p>
          <p className="mt-1">
            Site fictif reconstitué par Aeon Studio à des fins de démonstration.
            Dernière mise à jour indiquée : il y a plusieurs années.
          </p>
          <p className="mt-2 text-[#1a3a8f] underline">
            Accueil | Plan du site | Mentions légales
          </p>
        </footer>
      </div>
    </div>
  );
}
