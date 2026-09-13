// Fichier de configuration centralisé.
// Modifiez ces valeurs pour personnaliser le site (identité, contact, tarifs, liens).

export const siteConfig = {
  studioName: "Aeon Studio",
  firstName: "Aeon",
  initials: "AE",
  city: "Strasbourg",
  country: "France",
  zone: "Strasbourg et toute la France à distance",

  email: "",
  phone: "",
  linkedin: "",

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