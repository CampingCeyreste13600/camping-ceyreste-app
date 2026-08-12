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

const MOBILE_HOMES = {
  "1": "PORT_PIN",
  "2": "PORT_PIN",
  "3": "PORT_PIN",
  "4": "PORT_PIN",
  "5": "FIGUEROLLES",
  "6": "LA_CIOTAT",
  "7": "FIGUEROLLES",
  "8": "PORT_MIOU",
  "9": "PORT_MIOU",
  "10": "FIGUEROLLES",
  "11": "LA_CIOTAT",
  "12": "LA_CIOTAT",
  "13": "PORT_MIOU",
  "20": "LA_CIOTAT",
  "21": "LA_CIOTAT",
  "22": "CASSIS",
  "23": "LA_CIOTAT",
  "24": "LA_CIOTAT",
  "25": "LA_CIOTAT",
  "26": "CASSIS",
  "27": "LA_CIOTAT",
  "28": "LA_CIOTAT",
  "30": "PORT_MIOU",
  "31": "LA_CIOTAT",
  "32": "LA_CIOTAT",
  "33": "LA_CIOTAT",
  "34": "LA_CIOTAT",
  "35": "PORT_MIOU",
  "36": "PORT_MIOU",
  "38": "LA_CIOTAT",
  "40": "FIGUEROLLES",
  "41": "EMPL",
  "44": "EMPL",
  "43": "LA_CIOTAT",
  "44": "LA_CIOTAT",
  "45": "LA_CIOTAT",
  "46": "LA_CIOTAT",
  "47": "EMPL",
  "50": "FIGUEROLLES",
  "51": "EMPL",
  "52": "CASSIS",
  "53": "LA_CIOTAT",
  "54": "LA_CIOTAT",
  "55": "LA_CIOTAT",
  "56": "LA_CIOTAT",
  "60": "FIGUEROLLES",
  "61": "EMPL",
  "62": "EMPL",
  "63": "LA_CIOTAT",
  "64": "EMPL",
  "65": "LA_CIOTAT",
  "66": "EMPL",
  "67": "LA_CIOTAT",
  "68": "CASSIS",
  "69": "PORT_MIOU",
  "69B": "LA_CIOTAT",
  "70": "FIGUEROLLES",
  "71": "FIGUEROLLES",
  "72": "FIGUEROLLES",
  "73": "CASSIS",
  "74": "PORT_MIOU",
  "75": "LA_CIOTAT",
  "76": "EMPL",
  "77": "FIGUEROLLES",
  "78": "FIGUEROLLES",
  "79": "EMPL",
  "80": "LA_CIOTAT",
  "81": "LA_CIOTAT",
  "82": "EMPL",
  "83": "EMPL",
  "84": "LA_CIOTAT",
  "85": "FIGUEROLLES",
  "86": "CASSIS",
  "90": "LA_CIOTAT",
  "91": "EMPL",
  "92": "LA_CIOTAT",
  "93": "EMPL",
  "94": "EMPL",
  "95": "EMPL",
  "96": "LA_CIOTAT",
  "97": "EMPL",
  "98": "EMPL",
  "101": "EMPL",
  "102": "EMPL",
  "103": "EMPL",
  "104": "EMPL",
  "104B": "EMPL",
  "105": "EMPL",
  "106": "EMPL",
  "107": "EMPL",
  "108": "EMPL",
  "109": "EMPL",
  "110": "EMPL",
  "111": "LA_CIOTAT",
  "112": "LA_CIOTAT",
  "113": "EMPL",
  "114": "EMPL",
  "115": "EMPL",
  "116": "LA_CIOTAT",
  "117": "EMPL",
  "118": "EMPL",
  "119": "EMPL",
  "120": "PORT_MIOU",
  "121": "FIGUEROLLES",
  "122": "LA_CIOTAT",
  "123": "FIGUEROLLES",
  "124": "PORT_MIOU",
  "125": "PORT_MIOU",
  "126": "PORT_MIOU",
  "127": "PORT_MIOU",
  "128": "PORT_MIOU",
  "129": "LA_CIOTAT",
  "130": "EMPL",
  "133": "PORT_MIOU",
  "134": "PORT_MIOU",
  "135": "LA_CIOTAT",
  "136": "EMPL",
  "137": "EMPL",
  "138": "EMPL",
  "139": "EMPL",
  "140": "EMPL",
  "141": "EMPL",
  "142": "EMPL",
  "143": "EMPL",
  "144": "EMPL",
  "145": "EMPL",
  "146": "LA_CIOTAT",
  "147": "PORT_MIOU",
  "148": "CASSIS",
  "149": "CASSIS",
  "150": "FIGUEROLLES",
  "151": "PORT_MIOU",
  "152": "TENTE_KENYA",
  "153": "TENTE_KENYA",
  "154": "TENTE_KENYA",
  "155": "TENTE_KENYA",
  "156": "EMPL",
  "157": "EMPL",
  "158": "EMPL",
  "B1": "LA_CIOTAT",
  "B2": "LA_CIOTAT",
  "B3": "CASSIS",
  "B4": "CASSIS",
  "B7": "LA_CIOTAT",
  "T1": "EN_VAU",
  "T2": "EN_VAU",
  "T3": "EN_VAU",
  "T4": "EN_VAU",
  "T5": "EN_VAU",
  "T6": "PORT_PIN",
  "T7": "PORT_PIN",
  "T8": "EN_VAU",
  "T9": "PORT_PIN",
  "T10": "PORT_PIN",
  "T11": "PORT_PIN",
  "T12": "PORT_PIN",
  "T13": "EN_VAU",
  "T14": "EN_VAU",
  "T15": "EN_VAU",
  "T16": "PREMIUM2",
  "T17": "PREMIUM3",
  "T18": "PREMIUM2",
  "T19": "PREMIUM3",
  "T20": "EN_VAU",
  
  // NUMÉROS DES LOCATIONS : "NUMERO": "CATEGORIE"
  // Exemple : "90": "CATEGORIE_1",
  // Exemple : "91": "CATEGORIE_1",
  // Exemple : "120": "CATEGORIE_2"

  // CATÉGORIE 1
  // "90": "CATEGORIE_1",

  // CATÉGORIE 2
  // "91": "CATEGORIE_2",

  // CATÉGORIE 3
  // "92": "CATEGORIE_3",

  // CATÉGORIE 4
  // "93": "CATEGORIE_4",

  // CATÉGORIE 5
  // "94": "CATEGORIE_5",

  // CATÉGORIE 6
  // "95": "CATEGORIE_6",

  // CATÉGORIE 7
  // "96": "CATEGORIE_7",

  // CATÉGORIE 8
  // "97": "CATEGORIE_8",

  // CATÉGORIE 9
  // "98": "CATEGORIE_9",

  // CATÉGORIE 10
  // "99": "CATEGORIE_10"
};

const MOBILE_HOME_CATEGORIES = {
  "LA_CIOTAT": {
    title: textStyle("Mobilhome LA CIOTAT", { color: "orange", bold: true }),
    category: "La Ciotat",
    capacity: "4 personnes",
    bedrooms: "2 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait"
    ]
  },

  "CASSIS": {
    title: textStyle("Mobilhome CASSIS", { color: "#C84388", bold: true }),
    category: "Cassis",
    capacity: "2 personnes",
    bedrooms: "1 chambre",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait"
    ]
  },

  "FIGUEROLLES": {
    title: textStyle("Mobilhome FIGUEROLLES", { color: "#048B9A", bold: true }),
    category: "Figuerolles",
    capacity: "4 personnes",
    bedrooms: "2 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait"
    ]
  },

  "PORT_MIOU": {
    title: textStyle("Mobilhome PORT MIOU", { color: "teal", bold: true }),
    category: "Port Miou",
    capacity: "6 personnes",
    bedrooms: "3 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait"
    ]
  },

  "PORT_PIN": {
    title: textStyle("Mobilhome PORT PIN", { color: "pink", bold: true }),
    category: "Port Pin",
    capacity: "4 personnes",
    bedrooms: "2 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait",
      "Draps Inclus",
      "Lave vaisselle intégré"
    ]
  },

  "EN_VAU": {
    title: textStyle("Mobilhome EN VAU", { color: "red", bold: true }),
    category: "En Vau",
    capacity: "6 personnes",
    bedrooms: "3 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait",
      "Draps Inclus",
      "Lave vaisselle intégré"
    ]
  },

  "PREMIUM2": {
    title: textStyle("Mobilhome PREMIUM", { color: "yellow", bold: true }),
    category: "Premium",
    capacity: "4 personnes",
    bedrooms: "2 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait",
      "Draps et serviettes Inclus",
      "Lave vaisselle intégré",
      "Plancha à gaz",
      "Forfait ménage inclus"
    ]
  },

  "PREMIUM3": {
    title: textStyle("Mobilhome PREMIUM", { color: "#b0f2c2", bold: true }),
    category: "Premium",
    capacity: "6 personnes",
    bedrooms: "3 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait",
      "Draps et serviettes Inclus",
      "Lave vaisselle intégré",
      "2 Salles de bain",
      "Plancha à gaz",
      "Forfait ménage inclus"
    ]
  },

  "TENTE_KENYA": {
    title: textStyle("Tente Jenya", { color: "#690c07", bold: true }),
    category: "Tente Kenya",
    capacity: "5 personnes",
    bedrooms: "2 chambres",
    image: "",
    arrival: "À partir de 15h30",
    departure: "Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait",
      "Accès aux sanitaires"
    ]
  },

  "EMPL": {
    title: textStyle("Emplacement", { color: "green", bold: true }),
    category: "Emplacement nature",
    capacity: "6 personnes",
    bedrooms: "",
    image: "",
    arrival: "À partir de 14h00",
    departure: "Avant 12h00",
    info: [
      "1 véhicule autorisé sur l'emplacement",
      "Calme après 23h s'il vous plait",
      "Electricité et Eau sur chaque emplacement"
    ]
  }
};

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
        icon: "🏕️",
        title: textStyle("Ma location", { color: "teal", bold: true }),
        time: "",
        mobileHomeSummary: true,
        note: textStyle("Indiquez votre numéro dans MA LOCATION", { color: "gray", bold: true })
      },
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
        openingHours: [{ start: "10:00", end: "20:00" }],
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
        time: "Toute la journée en juillet-août / à partir de 17H le reste de l'année",
        openingSchedule: {
          basseSaison: [{ start: "17:00", end: "23:30" }],
          juilletAout: [{ start: "09:00", end: "23:30" }],
          octobre: [{ start: "17:00", end: "23:30" }],
          novJan: [{ start: "17:00", end: "23:30" }]
        },
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
        openingHours: [{ start: "08:00", end: "20:00" }],
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
        [textStyle("Horaires", { color: "blue", bold: true }), textStyle("À compléter selon la période.", { color: "gray" })],
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
      intro: textStyle("Découvrez les incontournables autour de Ceyreste et de La Ciotat.", { color: "gray" }),
      blocks: [
        [textStyle("🌊 La Ciotat", { color: "blue", bold: true }), textStyle("Vieux-Port, plages, calanques et Parc du Mugel.", { color: "dark" })],
        [textStyle("🏞️ Calanques", { color: "teal", bold: true }), textStyle("Figuerolles, Mugel et paysages de la côte méditerranéenne.", { color: "dark" })],
        [textStyle("⛰️ Cassis", { color: "green", bold: true }), textStyle("Port, calanques et Route des Crêtes.", { color: "dark" })],
        [textStyle("☀️ Bandol & Sanary", { color: "orange", bold: true }), textStyle("Ports, marchés, plages et balades en bord de mer.", { color: "dark" })],
        [textStyle("🛍️ Marchés Locaux", { color: "purple", bold: true }), textStyle("Port, calanques et Route des Crêtes.", { color: "dark" })]
      ]
    },
    partners: {
      title: textStyle("🚲 NOS PARTENAIRES", { color: "orange", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Retrouvez ici les activités partenaires recommandées par le camping.", { color: "gray" }),
      blocks: [
        [textStyle("🚲 Location de vélos", { color: "pink", bold: true }), textStyle("TROLIB CASSIS, Location de vélos électriques et promenade, 06.72.50.47.26 ", { color: "dark" })],
        [textStyle("🛵 Location de scooters", { color: "orange", bold: true }), textStyle("TOP LOC SERVICES à Roquefort-la-Bédoule, 06.24.09.72.25", { color: "dark" })],
        [textStyle("🛤️ Location de quad", { color: "grey", bold: true }), textStyle("RENT A QUAD 13, au départ de La Ciotat, 07.83.05.99.33 ", { color: "dark" })],
        [textStyle("🛶 Location Kayak", { color: "yellow", bold: true }), textStyle("KAYAK RAIDS à La Ciotat, 06.34.69.83.49", { color: "dark" })],
        [textStyle("⛵ Catamaran", { color: "blue", bold: true }), textStyle("CAT EXPLORER, Sortie en Catamaran, 07.87.23.24.71", { color: "dark" })],
        [textStyle("🧗‍♂️ Salles d'escalade", { color: "teal", bold: true }), textStyle("BLOC SESSION à La Ciotat, 04.42.72.05.18", { color: "dark" })],
        [textStyle("🚗 Location Voiture", { color: "red", bold: true }), textStyle("OLYMPIC LOCATION, voir avec la Réception", { color: "dark" })],
        [textStyle("🎈 Parapente", { color: "pink", bold: true }), textStyle("MARSEILLE PARAPENTE, Baptemes et Formations, 06.51.84.46.71", { color: "dark" })],
        [textStyle("🌅 Visites des Calanques", { color: "blue", bold: true }), textStyle("GUIDES CASSIS CALANQUES CANAILLES, Visites en bateau, Randonnée, Escalade, Via Cordata, 06.61.50.38.48", { color: "dark" })],
        [textStyle("🥽 Plongée", { color: "green", bold: true }), textStyle("ANAYA PLONGEE, 07.45.12.31.65", { color: "dark" })],
        [textStyle("⛵ Visites des Calanques en Bateau", { color: "orange", bold: true }), textStyle("LES AMIS DES CALANQUES, 06.09.35.25.68", { color: "dark" })],
        [textStyle("💆🏻 Shiatsu e Do In (Bien être)", { color: "brown", bold: true }), textStyle("ENTRE MAINS ET MAUX, Sabine PUGLIESI, 06.15.75.06.72", { color: "dark" })],
        [textStyle("🧘‍♀️ Reflexologie", { color: "grey", bold: true }), textStyle("PIERRE GALAND, 06.59.22.84.73", { color: "dark" })]
      ]
    },
    emergency: {
      title: textStyle("🚨 URGENCES", { color: "red", bold: true, size: "large" }),
      image: "",
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
      image: "",
      intro: textStyle("Cette rubrique pourra servir à afficher les informations importantes du jour.", { color: "gray" }),
      blocks: [
        [textStyle("📢 Information", { color: "orange", bold: true }), textStyle("Ajoutez ici une annonce importante : fermeture exceptionnelle, changement d'horaire, météo, animation, etc.", { color: "dark" })]
      ]
    },
    stay: {
      personalizedMobileHome: true,
      title: textStyle("🏕️ MA LOCATION", { color: "teal", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Une future rubrique pour aider chaque vacancier pendant son séjour.", { color: "gray" }),
      blocks: [
        [textStyle("Arrivée", { color: "green", bold: true }), textStyle("Ajoutez ici les informations d'arrivée et les horaires de réception.", { color: "dark" })],
        [textStyle("Départ", { color: "orange", bold: true }), textStyle("Ajoutez ici les informations de départ.", { color: "dark" })],
        [textStyle("Services", { color: "blue", bold: true }), textStyle("Retrouvez les informations utiles pendant votre séjour.", { color: "dark" })]
      ]
    }
  }
};
