export type Statut = "À vérifier" | "Brouillon prêt" | "Validée";
export type Urgence = "Faible" | "Moyenne" | "Haute";

export type Canal = "E-mail" | "Formulaire du site" | "Téléphone" | "Réseaux sociaux";

export interface Demande {
  id: string;
  recu: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  canal: Canal;
  sujet: string;
  message: string;
  budget: string;
  statut: Statut;
  urgence: Urgence;
  categorie: string;
  resume: string;
  brouillon: string;
  verifie: boolean;
  checklist: boolean[];
}

export const CANAUX: Canal[] = [
  "E-mail",
  "Formulaire du site",
  "Téléphone",
  "Réseaux sociaux",
];

export const CATEGORIES = [
  "Demande de devis",
  "Question technique",
  "Suivi de commande",
  "Réclamation",
  "Partenariat",
];

export const CHECKLIST_LABELS = [
  "Les coordonnées du contact ont été relues.",
  "La catégorie attribuée correspond bien à la demande.",
  "Le niveau d'urgence est cohérent avec le message reçu.",
  "Le brouillon de réponse ne contient aucune information inventée.",
  "Une personne responsable assume l'envoi de cette réponse.",
];

export function buildBrouillon(d: {
  nom: string;
  entreprise: string;
  categorie: string;
  sujet: string;
  urgence: Urgence;
}): string {
  const delai =
    d.urgence === "Haute"
      ? "dans la journée"
      : d.urgence === "Moyenne"
        ? "sous 48 heures"
        : "sous cinq jours ouvrés";

  return `Bonjour ${d.nom},

Merci pour votre message concernant « ${d.sujet} »${
    d.entreprise ? ` pour ${d.entreprise}` : ""
  }.

Votre demande a été enregistrée dans la catégorie « ${d.categorie} ». Un membre de l'équipe revient vers vous ${delai} avec les éléments demandés et, si nécessaire, une proposition de créneau d'échange.

Si un détail a changé entre-temps, vous pouvez répondre directement à ce message.

Bien cordialement,
L'équipe Flux PME (réponse fictive générée localement)`;
}

const EXEMPLE = {
  nom: "Camille Martin",
  entreprise: "Menuiserie Horizon",
  categorie: "Demande de devis",
  sujet: "Devis pour 12 fenêtres bois-aluminium",
  urgence: "Haute" as Urgence,
};

export const DEMANDES_INITIALES: Demande[] = [
  {
    id: "DEM-2041",
    recu: "Aujourd'hui, 09:12",
    nom: "Camille Martin",
    entreprise: "Menuiserie Horizon",
    email: "camille.martin@exemple-fictif.fr",
    telephone: "03 00 00 00 01",
    canal: "E-mail",
    sujet: "Devis pour 12 fenêtres bois-aluminium",
    message:
      "Bonjour, nous devons remplacer douze fenêtres sur un bâtiment d'atelier avant la fin du trimestre. Pouvez-vous nous transmettre un chiffrage et vos délais de pose ?",
    budget: "15 000 € à 25 000 €",
    statut: "À vérifier",
    urgence: "Haute",
    categorie: "Demande de devis",
    resume:
      "Remplacement de 12 fenêtres bois-aluminium sur un atelier, échéance fin de trimestre, chiffrage et délais attendus.",
    brouillon: buildBrouillon(EXEMPLE),
    verifie: false,
    checklist: [false, false, false, false, false],
  },
  {
    id: "DEM-2040",
    recu: "Hier, 16:47",
    nom: "Sofia Lenoir",
    entreprise: "Cabinet Lenoir",
    email: "sofia.lenoir@exemple-fictif.fr",
    telephone: "03 00 00 00 02",
    canal: "Formulaire du site",
    sujet: "Question sur la maintenance annuelle",
    message:
      "Nous aimerions savoir ce que couvre exactement le contrat de maintenance annuelle et s'il inclut les interventions sur site.",
    budget: "Non précisé",
    statut: "Brouillon prêt",
    urgence: "Moyenne",
    categorie: "Question technique",
    resume:
      "Demande de précisions sur le périmètre du contrat de maintenance annuelle et les interventions sur site.",
    brouillon: buildBrouillon({
      nom: "Sofia Lenoir",
      entreprise: "Cabinet Lenoir",
      categorie: "Question technique",
      sujet: "Question sur la maintenance annuelle",
      urgence: "Moyenne",
    }),
    verifie: true,
    checklist: [true, true, false, false, false],
  },
  {
    id: "DEM-2039",
    recu: "Lundi, 11:05",
    nom: "Yanis Roux",
    entreprise: "Roux Logistique",
    email: "yanis.roux@exemple-fictif.fr",
    telephone: "03 00 00 00 03",
    canal: "Téléphone",
    sujet: "Suivi de la commande 8842",
    message:
      "Je souhaite connaître la date de livraison prévue pour la commande 8842 passée la semaine dernière.",
    budget: "Non applicable",
    statut: "Validée",
    urgence: "Faible",
    categorie: "Suivi de commande",
    resume:
      "Demande de date de livraison pour la commande 8842, sans urgence particulière.",
    brouillon: buildBrouillon({
      nom: "Yanis Roux",
      entreprise: "Roux Logistique",
      categorie: "Suivi de commande",
      sujet: "Suivi de la commande 8842",
      urgence: "Faible",
    }),
    verifie: true,
    checklist: [true, true, true, true, true],
  },
];

export interface Automatisation {
  id: string;
  titre: string;
  texte: string;
  actif: boolean;
}

export const AUTOMATISATIONS_INITIALES: Automatisation[] = [
  {
    id: "accuse",
    titre: "Accusé de réception automatique",
    texte: "Envoie une confirmation immédiate à la personne qui écrit.",
    actif: true,
  },
  {
    id: "categorie",
    titre: "Classement par catégorie",
    texte: "Attribue une catégorie à partir des mots présents dans le message.",
    actif: true,
  },
  {
    id: "urgence",
    titre: "Détection d'urgence",
    texte: "Signale les messages contenant une échéance proche ou explicite.",
    actif: true,
  },
  {
    id: "brouillon",
    titre: "Préparation d'un brouillon",
    texte: "Rédige une réponse type, toujours relue avant envoi.",
    actif: false,
  },
  {
    id: "rappel",
    titre: "Rappel après 48 heures",
    texte: "Alerte le responsable si une demande reste sans réponse.",
    actif: true,
  },
  {
    id: "resume",
    titre: "Résumé hebdomadaire",
    texte: "Rassemble les demandes de la semaine dans un récapitulatif unique.",
    actif: false,
  },
];

export const PRINCIPES = [
  {
    titre: "Rien ne part sans relecture",
    texte:
      "Une réponse préparée automatiquement reste un brouillon tant qu'une personne ne l'a pas validée.",
  },
  {
    titre: "Le minimum de données",
    texte:
      "On ne conserve que les informations nécessaires au traitement de la demande.",
  },
  {
    titre: "Une durée de conservation définie",
    texte:
      "Chaque donnée a une date de suppression prévue, connue à l'avance.",
  },
  {
    titre: "Des accès limités",
    texte:
      "Seules les personnes concernées par le suivi peuvent consulter les demandes.",
  },
  {
    titre: "Une trace des actions",
    texte:
      "Chaque validation est attribuée à une personne identifiable et horodatée.",
  },
];
