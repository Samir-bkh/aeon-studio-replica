// Fichier de configuration centralisé.
// Modifiez ces valeurs pour personnaliser le site (identité, contact, tarifs, liens).

export const siteConfig = {
  studioName: "Aeon Studio",
  firstName: "Aeon",
  initials: "AE",
  city: "Strasbourg",
  country: "France",
  zone: "Strasbourg et toute la France à distance",

  // Laissez vide tant que l'adresse n'est pas définie : le site affichera
  // un message adapté plutôt qu'une fausse information.
  email: "",
  phone: "",
  linkedin: "",

  // Endpoint Formspree à renseigner pour activer réellement l'envoi du formulaire.
  // Tant que ce champ est vide, le formulaire affiche un message de configuration.
  formspreeEndpoint: "https://formspree.io/f/mppzgdvd",

  pricing: {
    optimization: {
      label: "Optimisation ciblée",
      price: "À partir de 290 €",
    },
    creation: {
      label: "Création ou refonte",
      price: "À partir de 790 €",
    },
    automation: {
      label: "Automatisation",
      price: "Sur devis",
    },
  },
} as const

export type SiteConfig = typeof siteConfig
