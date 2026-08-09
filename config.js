/*
  ============================================================
  OUTIL DE MISE EN FORME
  ============================================================
  IMPORTANT : cette fonction est définie ici AVANT CAMPING,
  car config.js est chargé avant app.js.
*/
function textStyle(text, options = {}) {
  return {
    __styledText: true,
    text: String(text ?? ""),
    color: options.color || "",
    bold: !!options.bold,
    italic: !!options.italic,
    size: options.size || "normal",
    background: options.background || "",
    align: options.align || ""
  };
}

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
  // ==================== PHOTOS ====================
  // Les photos des sections se règlent dans chaque section avec image: "".
  // Exemple : image: "images/piscine.jpg"
  // Mets les images dans le dossier "images" du dépôt GitHub.
  // Puis indique ici leur nom.
  images: {
    logo: "images/logo.png",       // ex: "images/logo.png"
    accueil: "images/fond-camping.jpg",   // ex: "images/accueil.jpg"
    region: "",    // ex: "images/calanques.jpg"
    gallery: [
      // "images/photo1.jpg",
      // "images/photo2.jpg"
    ]
  },

  name: "Camping de Ceyreste",
  location: textStyle("Ceyreste • La Ciotat • Provence", { color: "white" }),
  welcome: textStyle("Que les vacances commençent !", { color: "white", italic: true, bold: true }),
  headline: textStyle("Profitez pleinement de votre séjour", { color: "green-dark", bold: true }),
  subheadline: textStyle("Toutes les infos du camping directement à portée de main.", { color: "gray" }),

  contact: {
    phone: "+33.4.42.83.07.68",
    email: "campingceyreste@gmail.com",
    address: textStyle("Avenue Eugène Julien, 13600 Ceyreste, FRANCE", { color: "orange" }),
    mapsUrl: "https://www.google.com/maps"
  },

  // ============================================================
  // AUJOURD'HUI AU CAMPING
  // Ces informations restent affichées tous les jours.
  // Le PROGRAMME D'ANIMATION du jour est récupéré automatiquement
  // dans "planning" plus bas selon le jour actuel.
  // ============================================================
  today: {
    title: textStyle("AUJOURD'HUI AU CAMPING", {
      color: "green-dark",
      bold: true
    }),

    items: [
      {
        icon: "🛎️",
        title: textStyle("Réception", { color: "green", bold: true }),
        time: "Horaires selon la période",
        openingSchedule: {
          basseSaison: [{ start: "08:30", end: "12:00" }, { start: "14:00", end: "19:00" }],
          juilletAout: [{ start: "08:00", end: "20:00" }],
          octobre: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }],
          novJan: [{ start: "09:00", end: "12:00" }, { start: "15:00", end: "18:00" }]
        },
        note: textStyle("Ouverte ✔️", { color: "green", bold: true })
      },

      {
        icon: "🏊",
        title: textStyle("Espace Aquatique", {
          color: "blue",
          bold: true
        }),
        time: "10H-20H",
        note: textStyle("Ouvert ✔️", {
          color: "green",
          bold: true
        })
      },

      {
        icon: "🍽️",
        title: textStyle("Restaurant", {
          color: "orange",
          bold: true
        }),
        time: "8h30-00h",
        note: textStyle("Ouvert ✔️", {
          color: "green",
          bold: true
        })
      },

      {
        icon: "🛒",
        title: textStyle("Épicerie", {
          color: "green",
          bold: true
        }),
        time: "08H-20H (dans la réception)",
        note: textStyle("Ouverte ✔️", {
          color: "green",
          bold: true
        })
      }
    ],
  

    // ============================================================
    // 🎉 PROGRAMME D'ANIMATION
    // ============================================================
    // TOUTES les animations de la semaine sont ici.
    // L'application prend automatiquement le bon jour et
    // l'affiche dans cette même partie "AUJOURD'HUI AU CAMPING".
    // ============================================================
    animation: {
      title: textStyle("PROGRAMME D'ANIMATION DU JOUR", {
        color: "green-dark",
        bold: true
      }),

      days: [
    {
      day: "Lundi",
      events: [
        { text: "10h00 • Atelier créatif", color: "pink", bold: true, icon: "🎨" },
        { text: "12h00 • Aquabike (sur inscription)", color: "blue", bold: true, icon: "🏊" },
        { text: "12h30 • Summer Dance (à la piscine)", color: "orange", bold: true, icon: "👯" },
        { text: "16h00 • Aqua-Volley", color: "green", icon: "🏐" },
        { text: "21h00 • Soirée CABAREVE", color: "red", bold: true, size: "large", icon: "💃" }
      ]
    },
    {
      day: "Mardi",
      events: [
        { text: "10h00 • Jeux Géant en bois", color: "brown", icon: "🍄" },
        { text: "12h00 • Aqua-fun", color: "blue", icon: "🏊" },
        { text: "12h30 • Summer Dance (à la piscine)", color: "orange", bold: true, icon: "👯" },
        { text: "14h00 • Tournoi de Pétanque (inscription)", color: "green", icon: "🏆" },
        { text: "17h00 • Trampoline + Accrobranche", color: "green", icon: "🌲" },
        { text: "21h00 • Election MISS et MISTER Camping", color: "pink", bold: true, size: "large", icon: "👑" }
      ]
    },
    {
      day: "Mercredi",
      events: [
        { text: "10h00 • Bien être", color: "marron", bold: true, icon: "🧘🏻" },
        { text: "11h00 • Jeux de société", color: "grey", icon: "🎲" },
        { text: "12h00 • Aquabike (sur inscription)", color: "blue", icon: "🏊" },
        { text: "12h30 • Summer Dance (à la piscine)", color: "orange", bold: true, icon: "👯" },
        { text: "16h00 • Jeux Aquatiques", color: "yellow", icon: "🧒" },
        { text: "21h30 • POOL PARTY", color: "purple", bold: true, size: "large", icon: "🎉" }
      ]
    },
    {
      day: "Jeudi",
      events: [
        { text: "10h00 • Tournoi PingPong", color: "green", icon: "🏓" },
        { text: "12h00 • Aqua-fun", color: "blue", icon: "🏊" },
        { text: "12h30 • Summer Dance (à la piscine)", color: "orange", bold: true, icon: "👯" },
        { text: "16h00 • Aqua-Boom", color: "pink", icon: "🧒" },
        { text: "17h00 • Trampoline + Accrobranche", color: "green", icon: "🌲" },
        { text: "21h00 • Loto", color: "purple", bold: true, size: "large", icon: "🎉" }
      ]
    },
    {
      day: "Vendredi",
      events: [
        { text: "10h00 • Atelier créatif", color: "pink", bold: true, icon: "🎨" },
        { text: "12h00 • Aquabike (sur inscription)", color: "blue", icon: "🏊" },
        { text: "12h30 • Summer Dance (à la piscine)", color: "orange", bold: true, icon: "👯" },
        { text: "16h00 • Aqua-Volley", color: "green", icon: "🏐" },
        { text: "21h00 • Karaoké", color: "red", bold: true, size: "large", icon: "🎶" }
      ]
    },
    {
      day: "Samedi",
      events: [
        { text: "Aucune animation prévue aujourd'hui", color: "black", icon: "😴" },
      ]
    },
    {
      day: "Dimanche",
      events: [
        { text: "20h00 • Pot d'accueil (restaurant)", color: "green", bold: true, icon: "🥂" }
      ]
    }
  ]
    }},

  region: {
    title: textStyle("La Ciotat, Cassis & les Calanques", { color: "white", bold: true, size: "large" }),
      image: "",
    text: textStyle("Plages, ports, calanques, balades et activités : découvrez notre région.", { color: "white" })
  },

  menu: [
    { id: "planning", icon: "📅", title: textStyle("ANIMATIONS", { color: "green-dark", bold: true }), desc: textStyle("Animations & planning", { color: "gray" }) },
    { id: "pool", icon: "🏊", title: textStyle("ESPACE AQUATIQUE", { color: "blue", bold: true }), desc: textStyle("Piscines, toboggans & horaires", { color: "gray" }) },
    { id: "restaurant", icon: "🍽️", title: textStyle("RESTAURANT", { color: "orange", bold: true }), desc: textStyle("Carte, horaires", { color: "gray" }) },
    { id: "shop", icon: "📝", title: textStyle("RECEPTION", { color: "green", bold: true }), desc: textStyle("Toutes vos informations concernant votre séjour", { color: "gray" }) },
    { id: "rules", icon: "📖", title: textStyle("REGLEMENT", { color: "purple", bold: true }), desc: textStyle("Les règles du camping", { color: "gray" }) },
    { id: "map", icon: "🗺️", title: textStyle("PLAN DU CAMPING", { color: "teal", bold: true }), desc: textStyle("Découvrir le camping", { color: "gray" }) },
    { id: "region", icon: "📍", title: textStyle("A DECOUVRIR", { color: "teal", bold: true }), desc: textStyle("Activités & lieux incontournables", { color: "gray" }) },
    { id: "partners", icon: "🚲", title: textStyle("NOS PARTENAIRES", { color: "orange", bold: true }), desc: textStyle("Activités locales", { color: "gray" }) },
    { id: "emergency", icon: "🚨", title: textStyle("URGENCES", { color: "red", bold: true }), desc: textStyle("Numéros importants", { color: "gray" }) }
  ],

  // ============================================================
  // 📅 PROGRAMME D'ANIMATION DE LA SEMAINE
  // ============================================================
  // C'est CETTE partie que tu modifies pour les animations.
  // L'application prend automatiquement le jour actuel.
  // Tu peux ajouter autant d'animations que nécessaire.
  //
  // Exemple :
  // { text: "10H00 — Aquagym", color: "blue", icon: "🏊" }
  // ============================================================


  sections: {
    pool: {
      title: textStyle("🏊 ESPACE AQUATIQUE", { color: "blue", bold: true, size: "large" }),
      image: "images/piscine.jpg",
      intro: textStyle("Découvrez nos piscines et nos toboggans, pour le bonheur des petits et des plus grands.", { color: "gray" }),
      blocks: [
        [textStyle("Horaires", { color: "blue", bold: true }), textStyle("10h-20h Tous les jours ! ", { color: "gray" })],
        [textStyle("Règles essentielles", { color: "red", bold: true }), textStyle("Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.", { color: "dark" })]
      ]
    },
    restaurant: {
      title: textStyle("🍽️ RESTAURANT", { color: "orange", bold: true, size: "large" }),
      image: "images/resto.jpg",
      menuPdf: "images/carte.pdf",
      intro: textStyle("Nathalie et toute son équipe vous accueillent pendant la saison.", { color: "gray" }),
      blocks: [
        [textStyle("Horaires", { color: "orange", bold: true }), textStyle("Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année", { color: "gray" })],
        [textStyle("Réservation", { color: "green", bold: true }), textStyle("Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.", { color: "dark" })]
      ]
    },
    shop: {
      title: textStyle("📝 RECEPTION", { color: "green", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Les services pratiques du camping.", { color: "gray" }),
      blocks: [
        [textStyle("Horaires", { color: "green", bold: true }), textStyle("Basse Saison (8h30-12h/14h-19h), Juillet-Aôut (8h-20h),Octobre (9-12/14-18), Novembre-Décembre-Janvier (9-12/15-18)", { color: "gray" })],
        [textStyle("🥖 Pain", { color: "orange", bold: true }), textStyle("Dépôt de Pain, TOUS LES JOURS, sur Réservation Obligatoirement à la réception ", { color: "dark" })],
        [textStyle("Services", { color: "blue", bold: true }), textStyle("Ajoutez les services proposés : laverie, location de draps et KitBébé, barbecue, etc.", { color: "dark" })]
      ]
    },
    rules: {
      title: textStyle("📖 REGLEMENT DU CAMPING", { color: "purple", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Merci de respecter ces règles afin que chacun profite de vacances agréables.", { color: "gray" }),
      blocks: [
        [textStyle("🌙 Calme", { color: "purple", bold: true }), textStyle("Camping familial et calme. Merci de respecter le calme APRES 23h.", { color: "dark" })],
        [textStyle("🚗 Véhicules", { color: "blue", bold: true }), textStyle("1 véhicule par mobil-home. Les véhicules supplémentaires doivent etre stationnés sur le parking situé à l'extérieur.", { color: "dark" })],
        [textStyle("👨‍👩‍👧‍👦 Capacité", { color: "orange", bold: true }), textStyle("Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)", { color: "dark" })],
        [textStyle("🧒 Mineurs", { color: "red", bold: true }), textStyle("Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.", { color: "dark" })],
        [textStyle("🏠 Départ", { color: "green", bold: true }), textStyle("Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !", { color: "dark" })],
        [textStyle("🐶 Animaux", { color: "teal", bold: true }), textStyle("Les animaux doivent être tenus sous contrôle et respecter les règles du camping.", { color: "dark" })],
        [textStyle("♻️ Propreté", { color: "green", bold: true }), textStyle("Merci de respecter les espaces communs, sanitaires et zones de tri.", { color: "dark" })]
      ]
    },
    map: {
      title: textStyle("🗺️ PLAN DU CAMPING", { color: "teal", bold: true, size: "large" }),
      image: "images/plan.jpg",
      intro: textStyle("Repérez facilement les principaux services et équipements.", { color: "gray" }),
      blocks: [
        [textStyle("📍 Points importants", { color: "teal", bold: true }), textStyle("Réception • Piscine • Restaurant • Épicerie • Sanitaires • Aires de jeux • Parking", { color: "dark" })]
      ]
    },
    region: {
      title: textStyle("📍 A DECOUVRIR", { color: "teal", bold: true, size: "large" }),
      image: "images/calanques.jpg",
      intro: textStyle("Découvrez les incontournables autour de Ceyreste et de La Ciotat.", { color: "gray" }),
      blocks: [
        [textStyle("🌊 La Ciotat", { color: "blue", bold: true }), textStyle("Vieux-Port, plages, calanques et Parc du Mugel.", { color: "dark" })],
        [textStyle("🏞️ Calanques", { color: "teal", bold: true }), textStyle("Figuerolles, Mugel et paysages de la côte méditerranéenne.", { color: "dark" })],
        [textStyle("⛰️ Cassis", { color: "green", bold: true }), textStyle("Port, calanques et Route des Crêtes.", { color: "dark" })],
        [textStyle("☀️ Bandol & Sanary", { color: "orange", bold: true }), textStyle("Ports, marchés, plages et balades en bord de mer.", { color: "dark" })]
      ]
    },
    partners: {
      title: textStyle("🚲 NOS PARTENAIRES", { color: "orange", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Retrouvez ici les activités partenaires recommandées par le camping.", { color: "gray" }),
      blocks: [
        [textStyle("🛵 Scooter", { color: "green", bold: true }), textStyle("TOP LOC SERVICES, Location de scooters 50 et 125m3, 06.24.09.72.25", { color: "dark" })],
        [textStyle("🚲 Velo", { color: "blue", bold: true }), textStyle("TROLIB, Location de vélo électrique, 06.72.50.47.26", { color: "dark" })],
        [textStyle("🚗 Voiture", { color: "black", bold: true }), textStyle("OLYMPIC LOCATIONS", { color: "dark" })],
        [textStyle("🛸 Quad", { color: "grey", bold: true }), textStyle("RENT A QUAD 13, Location de quad au départ de La Ciotat, 07.83.05.99.33", { color: "dark" })],
        [textStyle("🛶 Kayak", { color: "teal", bold: true }), textStyle("KAYAK AVENTURE, 06.34.69.83.49", { color: "dark" })],
        [textStyle("🧗‍♂️ Escalade", { color: "teal", bold: true }), textStyle("Salle d'Escalade 06.07.61.60.05", { color: "dark" })],
        [textStyle("⛵ Catamaran", { color: "orange", bold: true }), textStyle("CAT EXPLORER, Sortie en Catamaran au départ du Brusc, 07.87.23.24.71", { color: "dark" })],
        [textStyle("🚤 Parapente", { color: "yellow", bold: true }), textStyle("MARSEILLE PARAPENTE, Baptemes et Formations en Parapente, 06.51.84.46.71", { color: "dark" })],
        [textStyle("🌊 Visite des Calanques", { color: "purple", bold: true }), textStyle("VISITES DES CALANQUES, Randonnée, Escalade et Via Cordata, 06.61.50.38.48", { color: "dark" })],
        [textStyle("🌅 Plongée", { color: "blue", bold: true }), textStyle("ANAYA PLONGEE, 07.45.12.31.65", { color: "dark" })],
        [textStyle("⛵ Calanques en Bateau", { color: "teal", bold: true }), textStyle("LES AMIS DES CALANQUES, Visitez les calanques en bateau ! 06.09.35.25.68", { color: "dark" })],
        [textStyle("🏎️ Karting", { color: "red", bold: true }), textStyle("KARTING INDOOR PROVENCE, Karting Indoor, Karaoké, LaserGame, QuizRoom", { color: "dark" })],
        [textStyle("💆🏽 Shiatsu", { color: "green", bold: true }), textStyle("SABINE PUGLIESI, Séance de Shiatsu et de Do-in 06.15.75.06.72", { color: "dark" })],
        [textStyle("🧘‍♀️ Reflexologie", { color: "brown", bold: true }), textStyle("PIERRE GALAND, Reflexologie 06.59.22.84.73", { color: "dark" })]
      ]
    },
    emergency: {
      title: textStyle("🚨 URGENCES", { color: "red", bold: true, size: "large" }),
      image: "",
      intro: textStyle("En cas d'urgence, contactez immédiatement le service compétent.", { color: "red", bold: true }),
      blocks: [
        [textStyle("📞 Camping", { color: "green", bold: true }), textStyle("Réception : +33 4 42 83 07 68", { color: "dark" })],
        [textStyle("🚑 112", { color: "red", bold: true }), textStyle("Numéro d'urgence européen.", { color: "dark" })],
        [textStyle("🚑 15", { color: "red", bold: true }), textStyle("SAMU.", { color: "dark" })],
        [textStyle("🚒 18", { color: "red", bold: true }), textStyle("Pompiers.", { color: "dark" })],
        [textStyle("👮 17", { color: "red", bold: true }), textStyle("Police / Gendarmerie.", { color: "dark" })]
      ]
    },
    notifications: {
      title: textStyle("🔔 Infos du camping", { color: "blue", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Cette rubrique pourra servir à afficher les informations importantes du jour.", { color: "gray" }),
      blocks: [
        [textStyle("📢 Information", { color: "orange", bold: true }), textStyle("Ajoutez ici une annonce importante : fermeture exceptionnelle, changement d'horaire, météo, animation, etc.", { color: "dark" })]
      ]
    },
    stay: {
      title: textStyle("🏕️ MON SEJOUR", { color: "green-dark", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Des problèmes durant votre séjour ?", { color: "gray" }),
      blocks: [
        [textStyle("FORMALITES DE DEPART", { color: "orange", bold: true }), textStyle("Les départs se font entre 8h et 10h chaque jour. Une fois le ménage fait, appelez-nous ! ", { color: "dark" })],
        [textStyle("SUPPLEMENTS", { color: "blue", bold: true }), textStyle("A la réception, location de Draps, Serviettes, KitBébé, Barbecue, Forfait ménage,...", { color: "dark" })],
        [textStyle("PROBLEMES", { color: "red", bold: true }), textStyle("En cas d'incident durant votre séjour, n'hesitez pas !! Composez le 04.42.83.07.68, MEME DE NUIT !", { color: "dark" })]
      ]
    }
  }
};
