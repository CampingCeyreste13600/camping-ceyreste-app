/*
  CONFIGURATION DE L'APPLICATION
  Tu peux modifier les textes ici.
  Pour les animations, tu peux maintenant choisir la couleur, le gras et la taille.

  Couleurs acceptées : "green", "blue", "orange", "red", "purple", "pink", "teal", "yellow"
  ou une couleur HTML comme "#ff4b8b".
*/

const CAMPING = {
  name: "Camping de Ceyreste",
  location: "Ceyreste • La Ciotat • Provence",
  welcome: "Bienvenue chez nous !",
  headline: "Profitez pleinement de votre séjour",
  subheadline: "Toutes les infos du camping dans votre poche.",

  contact: {
    phone: "+33442018344",
    email: "campingceyreste@gmail.com",
    address: "À compléter",
    mapsUrl: "https://www.google.com/maps"
  },

  today: {
    title: "Les infos du jour",
    items: [
      { icon: "🏊", title: "Piscine", time: "Horaires à compléter", note: "Ouverte" },
      { icon: "🎉", title: "Animation", time: "À compléter", note: "Programme" },
      { icon: "🍽️", title: "Restaurant", time: "Horaires à compléter", note: "Sur place" },
      { icon: "🛒", title: "Épicerie", time: "Horaires à compléter", note: "Services" }
    ]
  },

  region: {
    title: "La Ciotat, Cassis & les Calanques",
    text: "Plages, ports, calanques, balades et activités : découvrez notre région.",
    image: ""
  },

  menu: [
    { id: "planning", icon: "📅", title: "Programme", desc: "Animations & planning" },
    { id: "pool", icon: "🏊", title: "Espace aquatique", desc: "Piscines, toboggans & horaires" },
    { id: "restaurant", icon: "🍽️", title: "Restaurant", desc: "Carte, horaires & réservation" },
    { id: "shop", icon: "🛒", title: "Épicerie", desc: "Pain, produits & horaires" },
    { id: "rules", icon: "📖", title: "Règlement", desc: "Les règles du camping" },
    { id: "map", icon: "🗺️", title: "Plan du camping", desc: "Découvrir le camping" },
    { id: "region", icon: "📍", title: "À découvrir", desc: "Activités & lieux incontournables" },
    { id: "partners", icon: "🚲", title: "Nos partenaires", desc: "Activités locales" },
    { id: "emergency", icon: "🚨", title: "Urgences", desc: "Numéros importants" }
  ],

  /*
    EXEMPLE DE COULEURS :
    { text: "10h00 • Aquagym", color: "blue" }
    { text: "21h00 • Soirée mousse", color: "pink", bold: true }
    { text: "⚠️ Réservation obligatoire", color: "red", bold: true, size: "small" }

    Tu peux utiliser une couleur nommée ou un code comme "#ff69b4".
  */
  planning: [
    { day: "Lundi", events: [
      { text: "À compléter", color: "green" }
    ]},
    { day: "Mardi", events: [
      { text: "À compléter", color: "blue" }
    ]},
    { day: "Mercredi", events: [
      { text: "À compléter", color: "orange" }
    ]},
    { day: "Jeudi", events: [
      { text: "À compléter", color: "purple" }
    ]},
    { day: "Vendredi", events: [
      { text: "À compléter", color: "pink" }
    ]},
    { day: "Samedi", events: [
      { text: "À compléter", color: "teal" }
    ]},
    { day: "Dimanche", events: [
      { text: "20h00 • Pot d'accueil (juillet & août)", color: "green", bold: true }
    ]}
  ],

  sections: {
    pool: {
      title: "🏊 Espace aquatique",
      intro: "Retrouvez les horaires, les consignes et les informations utiles.",
      blocks: [
        ["Horaires", "À compléter selon la période."],
        ["Règles essentielles", "Les shorts de bain ne sont pas autorisés. Respectez les consignes affichées et surveillez les enfants."],
        ["Toboggans", "Profitez des toboggans en respectant les consignes de sécurité."]
      ]
    },
    restaurant: {
      title: "🍽️ Restaurant",
      intro: "Le restaurant du camping vous accueille pendant la saison.",
      blocks: [
        ["Horaires", "À compléter."],
        ["Carte", "Ajoutez ici votre carte, votre menu ou un lien vers votre carte en ligne."],
        ["Réservation", "Ajoutez ici les modalités de réservation."]
      ]
    },
    shop: {
      title: "🛒 Épicerie",
      intro: "Les services pratiques du camping.",
      blocks: [
        ["Horaires", "À compléter."],
        ["🥖 Pain", "Ajoutez ici les horaires et modalités de commande."],
        ["Services", "Ajoutez les services proposés : laverie, location de matériel, barbecue, etc."]
      ]
    },
    rules: {
      title: "📖 Règlement du camping",
      intro: "Merci de respecter ces règles afin que chacun profite de vacances agréables.",
      blocks: [
        ["🌙 Calme", "Camping familial et calme. Merci de respecter le calme après 23h."],
        ["🚗 Véhicules", "1 véhicule par mobil-home. Les véhicules supplémentaires doivent respecter les consignes de stationnement."],
        ["👨‍👩‍👧‍👦 Capacité", "Maximum 6 personnes par emplacement."],
        ["🧒 Mineurs", "Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance."],
        ["🏠 Départ", "Les mobil-homes doivent être rendus propres avant l'heure de départ indiquée sur votre réservation."],
        ["🐶 Animaux", "Les animaux doivent être tenus sous contrôle et respecter les règles du camping."],
        ["♻️ Propreté", "Merci de respecter les espaces communs, sanitaires et zones de tri."]
      ]
    },
    map: {
      title: "🗺️ Plan du camping",
      intro: "Repérez facilement les principaux services et équipements.",
      blocks: [
        ["Plan", "Ajoutez ici le plan du camping en image ou en PDF."],
        ["📍 Points importants", "Réception • Piscine • Restaurant • Épicerie • Sanitaires • Aires de jeux • Parking"]
      ]
    },
    region: {
      title: "📍 À découvrir",
      intro: "Découvrez les incontournables autour de Ceyreste et de La Ciotat.",
      blocks: [
        ["🌊 La Ciotat", "Vieux-Port, plages, calanques et Parc du Mugel."],
        ["🏞️ Calanques", "Figuerolles, Mugel et paysages de la côte méditerranéenne."],
        ["⛰️ Cassis", "Port, calanques et Route des Crêtes."],
        ["☀️ Bandol & Sanary", "Ports, marchés, plages et balades en bord de mer."]
      ]
    },
    partners: {
      title: "🚲 Nos partenaires",
      intro: "Retrouvez ici les activités partenaires recommandées par le camping.",
      blocks: [
        ["🚲 Location de vélos", "Ajoutez ici votre partenaire vélo et son lien."],
        ["🤿 Plongée", "Ajoutez ici votre partenaire plongée et son lien."],
        ["⛵ Catamaran", "Ajoutez ici votre partenaire nautique et son lien."]
      ]
    },
    emergency: {
      title: "🚨 Urgences",
      intro: "En cas d'urgence, contactez immédiatement le service compétent.",
      blocks: [
        ["📞 Camping", "Réception : +33 4 42 01 83 44"],
        ["🚑 112", "Numéro d'urgence européen."],
        ["🚑 15", "SAMU."],
        ["🚒 18", "Pompiers."],
        ["👮 17", "Police / Gendarmerie."]
      ]
    },
    notifications: {
      title: "🔔 Infos du camping",
      intro: "Cette rubrique pourra servir à afficher les informations importantes du jour.",
      blocks: [
        ["📢 Information", "Ajoutez ici une annonce importante : fermeture exceptionnelle, changement d'horaire, météo, animation, etc."]
      ]
    },
    stay: {
      title: "🏕️ Mon séjour",
      intro: "Une future rubrique pour aider chaque vacancier pendant son séjour.",
      blocks: [
        ["Arrivée", "Ajoutez ici les informations d'arrivée et les horaires de réception."],
        ["Départ", "Ajoutez ici les informations de départ."],
        ["Services", "Retrouvez les informations utiles pendant votre séjour."]
      ]
    }
  }
};
