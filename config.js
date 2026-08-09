/*
  ============================================================
  CONFIGURATION — CAMPING DE CEYRESTE
  ============================================================
  Ici tu peux modifier les textes de l'application.

  NOUVEAU : presque tous les textes peuvent être personnalisés
  avec la fonction textStyle().

  Exemple simple :
  textStyle("Bienvenue au camping", { color: "green", bold: true })

  Options :
  color: "green" / "blue" / "orange" / "red" / "purple" / "pink" / "teal" / "yellow"
  ou une couleur HTML : "#ff69b4"

  bold: true
  italic: true
  size: "small" / "normal" / "large" / "xl"
  background: "#..."
  align: "left" / "center" / "right"

  Pour les textes déjà affichés comme des champs simples,
  tu peux simplement utiliser textStyle() à la place du texte.
*/

const CAMPING = {
  name: "Camping de Ceyreste",
  location: textStyle("Ceyreste • La Ciotat • Provence", { color: "white" }),
  welcome: textStyle("Bienvenue !", { color: "white", italic: true, bold: true }),
  headline: textStyle("Profitez pleinement de votre séjour", { color: "green-dark", bold: true }),
  subheadline: textStyle("Toutes les infos du camping dans votre poche.", { color: "gray" }),

  contact: {
    phone: "+33442018344",
    email: "campingceyreste@gmail.com",
    address: textStyle("À compléter", { color: "orange" }),
    mapsUrl: "https://www.google.com/maps"
  },

  today: {
    title: textStyle("Les infos du jour", { color: "green-dark", bold: true }),
    items: [
      {
        icon: "🏊",
        title: textStyle("Espace Aquatique", { color: "blue", bold: true }),
        time: textStyle("10H-20H", { color: "green-dark", bold: true }),
        note: textStyle("Ouverte ✔️", { color: "green", bold: true })
      },
      {
        icon: "🎉",
        title: textStyle("Animation", { color: "orange", bold: true }),
        time: textStyle("À compléter", { color: "gray" }),
        note: textStyle("Programme", { color: "orange" })
      },
      {
        icon: "🍽️",
        title: textStyle("Restaurant", { color: "orange", bold: true }),
        time: textStyle("À compléter", { color: "gray" }),
        note: textStyle("Sur place", { color: "green" })
      },
      {
        icon: "🛒",
        title: textStyle("Épicerie", { color: "green", bold: true }),
        time: textStyle("À compléter", { color: "gray" }),
        note: textStyle("Services", { color: "blue" })
      }
    ]
  },

  region: {
    title: textStyle("La Ciotat, Cassis & les Calanques", { color: "white", bold: true, size: "large" }),
    text: textStyle("Plages, ports, calanques, balades et activités : découvrez notre région.", { color: "white" }),
    image: ""
  },

  menu: [
    { id: "planning", icon: "📅", title: textStyle("Programme", { color: "green-dark", bold: true }), desc: textStyle("Animations & planning", { color: "gray" }) },
    { id: "pool", icon: "🏊", title: textStyle("Espace aquatique", { color: "blue", bold: true }), desc: textStyle("Piscines, toboggans & horaires", { color: "gray" }) },
    { id: "restaurant", icon: "🍽️", title: textStyle("Restaurant", { color: "orange", bold: true }), desc: textStyle("Carte, horaires & réservation", { color: "gray" }) },
    { id: "shop", icon: "🛒", title: textStyle("Épicerie", { color: "green", bold: true }), desc: textStyle("Pain, produits & horaires", { color: "gray" }) },
    { id: "rules", icon: "📖", title: textStyle("Règlement", { color: "purple", bold: true }), desc: textStyle("Les règles du camping", { color: "gray" }) },
    { id: "map", icon: "🗺️", title: textStyle("Plan du camping", { color: "teal", bold: true }), desc: textStyle("Découvrir le camping", { color: "gray" }) },
    { id: "region", icon: "📍", title: textStyle("À découvrir", { color: "teal", bold: true }), desc: textStyle("Activités & lieux incontournables", { color: "gray" }) },
    { id: "partners", icon: "🚲", title: textStyle("Nos partenaires", { color: "orange", bold: true }), desc: textStyle("Activités locales", { color: "gray" }) },
    { id: "emergency", icon: "🚨", title: textStyle("Urgences", { color: "red", bold: true }), desc: textStyle("Numéros importants", { color: "gray" }) }
  ],

  planning: [
    { day: textStyle("Lundi", { color: "green-dark", bold: true }), events: [
      { text: "10h00 • Aquagym", color: "blue", bold: true },
      { text: "21h00 • Soirée", color: "pink", bold: true, size: "large" }
    ]},
    { day: textStyle("Mardi", { color: "green-dark", bold: true }), events: [
      { text: "À compléter", color: "gray" }
    ]},
    { day: textStyle("Mercredi", { color: "green-dark", bold: true }), events: [
      { text: "À compléter", color: "orange" }
    ]},
    { day: textStyle("Jeudi", { color: "green-dark", bold: true }), events: [
      { text: "À compléter", color: "purple" }
    ]},
    { day: textStyle("Vendredi", { color: "green-dark", bold: true }), events: [
      { text: "À compléter", color: "pink" }
    ]},
    { day: textStyle("Samedi", { color: "green-dark", bold: true }), events: [
      { text: "À compléter", color: "teal" }
    ]},
    { day: textStyle("Dimanche", { color: "green-dark", bold: true }), events: [
      { text: "20h00 • Pot d'accueil (juillet & août)", color: "green", bold: true }
    ]}
  ],

  sections: {
    pool: {
      title: textStyle("🏊 Espace aquatique", { color: "blue", bold: true, size: "large" }),
      intro: textStyle("Retrouvez les horaires, les consignes et les informations utiles.", { color: "gray" }),
      blocks: [
        [textStyle("Horaires", { color: "blue", bold: true }), textStyle("À compléter selon la période.", { color: "gray" })],
        [textStyle("Règles essentielles", { color: "red", bold: true }), textStyle("Les shorts de bain ne sont pas autorisés. Respectez les consignes affichées et surveillez les enfants.", { color: "dark" })],
        [textStyle("Toboggans", { color: "orange", bold: true }), textStyle("Profitez des toboggans en respectant les consignes de sécurité.", { color: "dark" })]
      ]
    },
    restaurant: {
      title: textStyle("🍽️ Restaurant", { color: "orange", bold: true, size: "large" }),
      intro: textStyle("Le restaurant du camping vous accueille pendant la saison.", { color: "gray" }),
      blocks: [
        [textStyle("Horaires", { color: "orange", bold: true }), textStyle("À compléter.", { color: "gray" })],
        [textStyle("Carte", { color: "orange", bold: true }), textStyle("Ajoutez ici votre carte, votre menu ou un lien vers votre carte en ligne.", { color: "dark" })],
        [textStyle("Réservation", { color: "green", bold: true }), textStyle("Ajoutez ici les modalités de réservation.", { color: "dark" })]
      ]
    },
    shop: {
      title: textStyle("🛒 Épicerie", { color: "green", bold: true, size: "large" }),
      intro: textStyle("Les services pratiques du camping.", { color: "gray" }),
      blocks: [
        [textStyle("Horaires", { color: "green", bold: true }), textStyle("À compléter.", { color: "gray" })],
        [textStyle("🥖 Pain", { color: "orange", bold: true }), textStyle("Ajoutez ici les horaires et modalités de commande.", { color: "dark" })],
        [textStyle("Services", { color: "blue", bold: true }), textStyle("Ajoutez les services proposés : laverie, location de matériel, barbecue, etc.", { color: "dark" })]
      ]
    },
    rules: {
      title: textStyle("📖 Règlement du camping", { color: "purple", bold: true, size: "large" }),
      intro: textStyle("Merci de respecter ces règles afin que chacun profite de vacances agréables.", { color: "gray" }),
      blocks: [
        [textStyle("🌙 Calme", { color: "purple", bold: true }), textStyle("Camping familial et calme. Merci de respecter le calme après 23h.", { color: "dark" })],
        [textStyle("🚗 Véhicules", { color: "blue", bold: true }), textStyle("1 véhicule par mobil-home. Les véhicules supplémentaires doivent respecter les consignes de stationnement.", { color: "dark" })],
        [textStyle("👨‍👩‍👧‍👦 Capacité", { color: "orange", bold: true }), textStyle("Maximum 6 personnes par emplacement.", { color: "dark" })],
        [textStyle("🧒 Mineurs", { color: "red", bold: true }), textStyle("Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.", { color: "dark" })],
        [textStyle("🏠 Départ", { color: "green", bold: true }), textStyle("Les mobil-homes doivent être rendus propres avant l'heure de départ indiquée sur votre réservation.", { color: "dark" })],
        [textStyle("🐶 Animaux", { color: "teal", bold: true }), textStyle("Les animaux doivent être tenus sous contrôle et respecter les règles du camping.", { color: "dark" })],
        [textStyle("♻️ Propreté", { color: "green", bold: true }), textStyle("Merci de respecter les espaces communs, sanitaires et zones de tri.", { color: "dark" })]
      ]
    },
    map: {
      title: textStyle("🗺️ Plan du camping", { color: "teal", bold: true, size: "large" }),
      intro: textStyle("Repérez facilement les principaux services et équipements.", { color: "gray" }),
      blocks: [
        [textStyle("Plan", { color: "teal", bold: true }), textStyle("Ajoutez ici le plan du camping en image ou en PDF.", { color: "gray" })],
        [textStyle("📍 Points importants", { color: "teal", bold: true }), textStyle("Réception • Piscine • Restaurant • Épicerie • Sanitaires • Aires de jeux • Parking", { color: "dark" })]
      ]
    },
    region: {
      title: textStyle("📍 À découvrir", { color: "teal", bold: true, size: "large" }),
      intro: textStyle("Découvrez les incontournables autour de Ceyreste et de La Ciotat.", { color: "gray" }),
      blocks: [
        [textStyle("🌊 La Ciotat", { color: "blue", bold: true }), textStyle("Vieux-Port, plages, calanques et Parc du Mugel.", { color: "dark" })],
        [textStyle("🏞️ Calanques", { color: "teal", bold: true }), textStyle("Figuerolles, Mugel et paysages de la côte méditerranéenne.", { color: "dark" })],
        [textStyle("⛰️ Cassis", { color: "green", bold: true }), textStyle("Port, calanques et Route des Crêtes.", { color: "dark" })],
        [textStyle("☀️ Bandol & Sanary", { color: "orange", bold: true }), textStyle("Ports, marchés, plages et balades en bord de mer.", { color: "dark" })]
      ]
    },
    partners: {
      title: textStyle("🚲 Nos partenaires", { color: "orange", bold: true, size: "large" }),
      intro: textStyle("Retrouvez ici les activités partenaires recommandées par le camping.", { color: "gray" }),
      blocks: [
        [textStyle("🚲 Location de vélos", { color: "green", bold: true }), textStyle("Ajoutez ici votre partenaire vélo et son lien.", { color: "dark" })],
        [textStyle("🤿 Plongée", { color: "blue", bold: true }), textStyle("Ajoutez ici votre partenaire plongée et son lien.", { color: "dark" })],
        [textStyle("⛵ Catamaran", { color: "teal", bold: true }), textStyle("Ajoutez ici votre partenaire nautique et son lien.", { color: "dark" })]
      ]
    },
    emergency: {
      title: textStyle("🚨 Urgences", { color: "red", bold: true, size: "large" }),
      intro: textStyle("En cas d'urgence, contactez immédiatement le service compétent.", { color: "red", bold: true }),
      blocks: [
        [textStyle("📞 Camping", { color: "green", bold: true }), textStyle("Réception : +33 4 42 01 83 44", { color: "dark" })],
        [textStyle("🚑 112", { color: "red", bold: true }), textStyle("Numéro d'urgence européen.", { color: "dark" })],
        [textStyle("🚑 15", { color: "red", bold: true }), textStyle("SAMU.", { color: "dark" })],
        [textStyle("🚒 18", { color: "red", bold: true }), textStyle("Pompiers.", { color: "dark" })],
        [textStyle("👮 17", { color: "red", bold: true }), textStyle("Police / Gendarmerie.", { color: "dark" })]
      ]
    },
    notifications: {
      title: textStyle("🔔 Infos du camping", { color: "blue", bold: true, size: "large" }),
      intro: textStyle("Cette rubrique pourra servir à afficher les informations importantes du jour.", { color: "gray" }),
      blocks: [
        [textStyle("📢 Information", { color: "orange", bold: true }), textStyle("Ajoutez ici une annonce importante : fermeture exceptionnelle, changement d'horaire, météo, animation, etc.", { color: "dark" })]
      ]
    },
    stay: {
      title: textStyle("🏕️ Mon séjour", { color: "green-dark", bold: true, size: "large" }),
      intro: textStyle("Une future rubrique pour aider chaque vacancier pendant son séjour.", { color: "gray" }),
      blocks: [
        [textStyle("Arrivée", { color: "green", bold: true }), textStyle("Ajoutez ici les informations d'arrivée et les horaires de réception.", { color: "dark" })],
        [textStyle("Départ", { color: "orange", bold: true }), textStyle("Ajoutez ici les informations de départ.", { color: "dark" })],
        [textStyle("Services", { color: "blue", bold: true }), textStyle("Retrouvez les informations utiles pendant votre séjour.", { color: "dark" })]
      ]
    }
  }
};
