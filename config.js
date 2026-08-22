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
      "1 véhicule autorisé sur le parking réservé",
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
      "1 véhicule autorisé sur le parking réservé",
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


// ============================================================
// 🗺️ PLAN INTERACTIF DU CAMPING
// ============================================================
// X = gauche → droite (0 à 100)
// Y = haut → bas (0 à 100)
//
// Tu peux déplacer un point en modifiant simplement x et y.
// Les locations ne sont PAS affichées toutes ensemble :
// seule la location saisie par le client est affichée.
const PLAN_INTERACTIF = {
  image: "images/plan-camping-2026.jpg",
  points: [
  {
    "id": "reception",
    "name": "Réception",
    "category": "services",
    "icon": "🛎️",
    "x": 52.2,
    "y": 73.4,
    "description": "Accueil, renseignements et services du camping."
  },
  {
    "id": "pool",
    "name": "Espace aquatique",
    "category": "loisirs",
    "icon": "🏊",
    "x": 50.0,
    "y": 80.0,
    "description": "Piscines et espace aquatique du camping."
  },
  {
    "id": "restaurant",
    "name": "Snack / Restaurant",
    "category": "services",
    "icon": "🍽️",
    "x": 45.0,
    "y": 72.0,
    "description": "Restaurant et snack du camping."
  },
  {
    "id": "shop",
    "name": "Épicerie",
    "category": "services",
    "icon": "🛒",
    "x": 58.0,
    "y": 72.0,
    "description": "Épicerie située au niveau de la réception."
  },
  {
    "id": "parking-main",
    "name": "Parking",
    "category": "services",
    "icon": "🅿️",
    "x": 62.0,
    "y": 78.0,
    "description": "Parking du camping."
  },
  {
    "id": "playground",
    "name": "Aire de jeux",
    "category": "loisirs",
    "icon": "🛝",
    "x": 53.2,
    "y": 66.0,
    "description": "Aire de jeux."
  },
  {
    "id": "pingpong",
    "name": "Ping Pong",
    "category": "loisirs",
    "icon": "🏓",
    "x": 51.5,
    "y": 63.0,
    "description": "Tables de ping-pong."
  },
  {
    "id": "multisports",
    "name": "CityStade",
    "category": "loisirs",
    "icon": "🏀",
    "x": 42.0,
    "y": 93.0,
    "description": "Terrain multisports."
  },
  {
    "id": "petanque",
    "name": "Pétanque",
    "category": "loisirs",
    "icon": "🎯",
    "x": 48.0,
    "y": 60.0,
    "description": "Terrain de pétanque."
  },
  {
    "id": "trampoline",
    "name": "Trampoline + Accrobranche",
    "category": "loisirs",
    "icon": "🤸",
    "x": 41.0,
    "y": 96.0,
    "description": "Trampoline à élastique."
  },
  {
    "id": "accrobranche",
    "name": "Accrogames",
    "category": "loisirs",
    "icon": "🌲",
    "x": 23.0,
    "y": 18.0,
    "description": "Accrobranche / Acro Games."
  },
 {
    "id": "sanitary1",
    "name": "Sanitaires 1",
    "category": "services",
    "icon": "🚻",
    "x": 45.0,
    "y": 68.2,
    "description": "Sanitaires composés de WC, douches, lavabos,...."
  },
 {
    "id": "sanitary2",
    "name": "Sanitaires 2",
    "category": "services",
    "icon": "🚻",
    "x": 24.0,
    "y": 86.0,
    "description": "Sanitaires composés de WC, douches, lavabos,...."
  }
],
  locations: {
  "1": {
    "x": 41.38,
    "y": 58.95
  },
  "2": {
    "x": 38.9,
    "y": 57.23
  },
  "3": {
    "x": 36.49,
    "y": 55.21
  },
  "4": {
    "x": 41.88,
    "y": 99.08
  },
  "5": {
    "x": 32.13,
    "y": 51.37
  },
  "6": {
    "x": 30.18,
    "y": 49.49
  },
  "7": {
    "x": 28.05,
    "y": 47.92
  },
  "8": {
    "x": 25.85,
    "y": 46.27
  },
  "9": {
    "x": 23.99,
    "y": 44.39
  },
  "10": {
    "x": 21.81,
    "y": 42.61
  },
  "11": {
    "x": 19.87,
    "y": 41.16
  },
  "12": {
    "x": 15.76,
    "y": 38.81
  },
  "13": {
    "x": 11.38,
    "y": 35.08
  },
  "20": {
    "x": 36.95,
    "y": 62.58
  },
  "21": {
    "x": 34.46,
    "y": 60.85
  },
  "22": {
    "x": 31.96,
    "y": 58.66
  },
  "23": {
    "x": 29.77,
    "y": 56.79
  },
  "24": {
    "x": 27.29,
    "y": 54.85
  },
  "25": {
    "x": 24.73,
    "y": 52.75
  },
  "26": {
    "x": 22.4,
    "y": 50.76
  },
  "27": {
    "x": 19.86,
    "y": 48.64
  },
  "28": {
    "x": 17.23,
    "y": 46.51
  },
  "30": {
    "x": 35.09,
    "y": 65.11
  },
  "31": {
    "x": 32.81,
    "y": 63.24
  },
  "32": {
    "x": 30.43,
    "y": 61.29
  },
  "33": {
    "x": 28.19,
    "y": 59.36
  },
  "34": {
    "x": 25.86,
    "y": 57.36
  },
  "35": {
    "x": 23.52,
    "y": 55.15
  },
  "36": {
    "x": 20.86,
    "y": 53.4
  },
  "38": {
    "x": 16.04,
    "y": 49.27
  },
  "40": {
    "x": 31.74,
    "y": 67.74
  },
  "41": {
    "x": 29.46,
    "y": 65.93
  },
  "44": {
    "x": 23.2,
    "y": 60.77
  },
  "43": {
    "x": 25.52,
    "y": 62.65
  },
  "45": {
    "x": 21.11,
    "y": 58.88
  },
  "46": {
    "x": 18.84,
    "y": 56.83
  },
  "47": {
    "x": 16.34,
    "y": 55.2
  },
  "50": {
    "x": 29.45,
    "y": 69.6
  },
  "51": {
    "x": 27.39,
    "y": 67.77
  },
  "52": {
    "x": 25.08,
    "y": 65.94
  },
  "53": {
    "x": 22.81,
    "y": 64.17
  },
  "54": {
    "x": 20.7,
    "y": 62.38
  },
  "55": {
    "x": 18.33,
    "y": 60.45
  },
  "56": {
    "x": 16.09,
    "y": 58.4
  },
  "60": {
    "x": 26.16,
    "y": 74.08
  },
  "61": {
    "x": 24.08,
    "y": 71.73
  },
  "62": {
    "x": 22.18,
    "y": 69.91
  },
  "63": {
    "x": 20.18,
    "y": 68.21
  },
  "64": {
    "x": 17.26,
    "y": 64.76
  },
  "65": {
    "x": 16.37,
    "y": 67.98
  },
  "66": {
    "x": 16.08,
    "y": 71.42
  },
  "67": {
    "x": 16.3,
    "y": 74.47
  },
  "68": {
    "x": 18.98,
    "y": 73.65
  },
  "69": {
    "x": 20.78,
    "y": 75.31
  },
  "69B": {
    "x": 23.73,
    "y": 76.7
  },
  "70": {
    "x": 11.72,
    "y": 41.61
  },
  "71": {
    "x": 11.72,
    "y": 44.54
  },
  "72": {
    "x": 11.72,
    "y": 47.17
  },
  "73": {
    "x": 11.72,
    "y": 49.83
  },
  "74": {
    "x": 11.72,
    "y": 52.51
  },
  "75": {
    "x": 11.72,
    "y": 54.87
  },
  "76": {
    "x": 11.72,
    "y": 57.44
  },
  "77": {
    "x": 11.72,
    "y": 60.07
  },
  "78": {
    "x": 11.72,
    "y": 62.68
  },
  "79": {
    "x": 11.72,
    "y": 65.23
  },
  "80": {
    "x": 11.87,
    "y": 67.96
  },
  "81": {
    "x": 11.85,
    "y": 70.44
  },
  "82": {
    "x": 11.83,
    "y": 72.95
  },
  "83": {
    "x": 11.8,
    "y": 75.52
  },
  "84": {
    "x": 11.8,
    "y": 78.38
  },
  "85": {
    "x": 11.89,
    "y": 81.1
  },
  "86": {
    "x": 11.89,
    "y": 83.39
  },
  "90": {
    "x": 8.17,
    "y": 83.28
  },
  "91": {
    "x": 8.17,
    "y": 81.35
  },
  "92": {
    "x": 8.17,
    "y": 79.29
  },
  "93": {
    "x": 8.17,
    "y": 77.24
  },
  "94": {
    "x": 8.17,
    "y": 74.96
  },
  "95": {
    "x": 8.17,
    "y": 72.71
  },
  "96": {
    "x": 8.17,
    "y": 70.31
  },
  "97": {
    "x": 8.17,
    "y": 68.0
  },
  "98": {
    "x": 8.17,
    "y": 65.72
  },
  "101": {
    "x": 3.18,
    "y": 68.83
  },
  "102": {
    "x": 3.18,
    "y": 71.06
  },
  "103": {
    "x": 3.18,
    "y": 73.46
  },
  "104": {
    "x": 2.95,
    "y": 78.38
  },
  "105": {
    "x": 3.33,
    "y": 81.2
  },
  "106": {
    "x": 3.4,
    "y": 84.03
  },
  "107": {
    "x": 3.4,
    "y": 86.34
  },
  "108": {
    "x": 3.29,
    "y": 88.33
  },
  "109": {
    "x": 3.33,
    "y": 90.87
  },
  "110": {
    "x": 3.2,
    "y": 93.8
  },
  "111": {
    "x": 2.95,
    "y": 96.75
  },
  "112": {
    "x": 5.78,
    "y": 96.75
  },
  "113": {
    "x": 8.37,
    "y": 93.56
  },
  "114": {
    "x": 7.97,
    "y": 90.97
  },
  "115": {
    "x": 7.97,
    "y": 87.79
  },
  "116": {
    "x": 11.49,
    "y": 87.79
  },
  "117": {
    "x": 13.68,
    "y": 88.17
  },
  "118": {
    "x": 13.59,
    "y": 91.57
  },
  "119": {
    "x": 11.38,
    "y": 92.25
  },
  "120": {
    "x": 11.34,
    "y": 96.48
  },
  "121": {
    "x": 14.51,
    "y": 96.48
  },
  "122": {
    "x": 17.56,
    "y": 95.87
  },
  "123": {
    "x": 20.04,
    "y": 95.73
  },
  "124": {
    "x": 22.36,
    "y": 95.73
  },
  "127": {
    "x": 30.0,
    "y": 95.82
  },
  "128": {
    "x": 32.54,
    "y": 95.82
  },
  "129": {
    "x": 36.03,
    "y": 96.02
  },
  "130": {
    "x": 39.42,
    "y": 95.9
  },
  "133": {
    "x": 40.02,
    "y": 89.53
  },
  "134": {
    "x": 39.5,
    "y": 83.82
  },
  "135": {
    "x": 39.5,
    "y": 81.74
  },
  "136": {
    "x": 39.51,
    "y": 79.6
  },
  "137": {
    "x": 39.51,
    "y": 77.47
  },
  "138": {
    "x": 39.51,
    "y": 75.06
  },
  "139": {
    "x": 39.51,
    "y": 72.15
  },
  "140": {
    "x": 34.17,
    "y": 73.17
  },
  "141": {
    "x": 30.94,
    "y": 77.58
  },
  "142": {
    "x": 34.63,
    "y": 77.48
  },
  "143": {
    "x": 34.67,
    "y": 80.63
  },
  "144": {
    "x": 31.83,
    "y": 80.59
  },
  "145": {
    "x": 29.4,
    "y": 80.73
  },
  "146": {
    "x": 30.54,
    "y": 86.34
  },
  "147": {
    "x": 34.78,
    "y": 86.36
  },
  "148": {
    "x": 34.39,
    "y": 90.2
  },
  "149": {
    "x": 30.76,
    "y": 90.3
  },
  "150": {
    "x": 27.13,
    "y": 89.65
  },
  "151": {
    "x": 23.5,
    "y": 89.65
  },
  "152": {
    "x": 20.01,
    "y": 89.65
  },
  "153": {
    "x": 17.03,
    "y": 89.65
  },
  "154": {
    "x": 16.91,
    "y": 82.63
  },
  "155": {
    "x": 15.51,
    "y": 79.44
  },
  "156": {
    "x": 18.4,
    "y": 80.09
  },
  "157": {
    "x": 25.13,
    "y": 80.58
  },
  "158": {
    "x": 27.11,
    "y": 78.8
  },
  "B1": {
    "x": 53.59,
    "y": 61.85
  },
  "B2": {
    "x": 56.35,
    "y": 64.06
  },
  "B3": {
    "x": 60.55,
    "y": 56.69
  },
  "B4": {
    "x": 61.58,
    "y": 53.98
  },
  "B7": {
    "x": 50.32,
    "y": 58.12
  },
  "T1": {
    "x": 12.06,
    "y": 30.78
  },
  "T2": {
    "x": 14.95,
    "y": 33.24
  },
  "T3": {
    "x": 17.63,
    "y": 35.5
  },
  "T4": {
    "x": 22.64,
    "y": 38.23
  },
  "T5": {
    "x": 25.6,
    "y": 40.51
  },
  "T6": {
    "x": 28.59,
    "y": 42.83
  },
  "T7": {
    "x": 31.82,
    "y": 45.36
  },
  "T8": {
    "x": 34.74,
    "y": 47.9
  },
  "T9": {
    "x": 37.53,
    "y": 50.04
  },
  "T10": {
    "x": 40.13,
    "y": 52.2
  },
  "T11": {
    "x": 42.11,
    "y": 53.75
  },
  "T12": {
    "x": 45.71,
    "y": 56.3
  },
  "T13": {
    "x": 55.03,
    "y": 49.81
  },
  "T14": {
    "x": 60.97,
    "y": 49.96
  },
  "T15": {
    "x": 65.83,
    "y": 50.64
  },
  "T16": {
    "x": 38.98,
    "y": 40.42
  },
  "T17": {
    "x": 43.51,
    "y": 41.76
  },
  "T18": {
    "x": 47.38,
    "y": 42.26
  },
  "T19": {
    "x": 53.08,
    "y": 42.19
  },
  "T20": {
    "x": 57.42,
    "y": 53.01
  }
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
          basseSaison: [{ start: "17:00", end: "23:00" }],
          juilletAout: [{ start: "08:30", end: "23:30" }],
          octobre: [{ start: "17:00", end: "23:59" }],
          novJan: [{ start: "17:00", end: "23:59" }]
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
        { text: "10h00 • Rallye photo", color: "brown", icon: "🍄" },
        { text: "12h00 • Aqua-fun", color: "blue", icon: "🏊" },
        { text: "12h30 • Summer Dance (à la piscine)", color: "orange", bold: true, icon: "👯" },
        { text: "14h00 • Tournoi de Pétanque (inscription)", color: "green", icon: "🏆" },
        { text: "17h00 • Trampoline + Accrobranche", color: "green", icon: "🌲" },
        { text: "21h00 • Soirée Just Dance", color: "pink", bold: true, size: "large", icon: "🕺" }
      ]
    },
    {
      day: "Mercredi",
      events: [
        { text: "10h00 • Coloriage", color: "purple", bold: true, icon: "🎨" },
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
        { text: "10h00 • Football", color: "pink", bold: true, icon: "⚽" },
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
    { id: "emergency", icon: "📦", title: textStyle("NOS SERVICES", { color: "red", bold: true }), desc: textStyle("Toutes nos locations et suppléments à retrouver ici", { color: "gray" }) },
    { id: "departure", icon: "🧳", title: textStyle("MON DÉPART", { color: "orange", bold: true }), desc: textStyle("Les dernières étapes avant de partir", { color: "gray" }) }
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
        [textStyle("HORAIRES", { color: "blue", bold: true }), textStyle("Basse Saison: 10h-19h\n Juillet-Août: 10h-20h", { color: "gray" }), "🕐"],
        [textStyle("REGLES ESSENTIELLES", { color: "red", bold: true }), textStyle("Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.", { color: "dark" }), "📋"],
        [textStyle("BASSINS AQUATIQUES", { color: "blue", bold: true }), textStyle("Venez découvrir nos 2 bassins, dont 1 équipé d'une patogeoire", { color: "gray" }), "🌊"],
        [textStyle("TOBOGGANS", { color: "green", bold: true }), textStyle("Pour le plaisir des plus jeunes... comme des plus grands. VENEZ VOIR NOTRE NOUVEAUTE 2026", { color: "gray" }), "😉"],
      ]
    },
    restaurant: {
      title: textStyle("🍽️ RESTAURANT", { color: "orange", bold: true, size: "large" }),
      image: "images/resto.jpg",
      menuPdf: "images/carte.pdf",
      intro: textStyle("Nathalie et toute son équipe vous accueillent pendant la saison.", { color: "gray" }),
      blocks: [
        [textStyle("HORAIRES", { color: "orange", bold: true }), textStyle("Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année", { color: "gray" }), "🕐"],
        [textStyle("RESERVATION", { color: "green", bold: true }), textStyle("Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.", { color: "dark" }), "📞"]
      ]
    },
    shop: {
      title: textStyle("📝 RECEPTION", { color: "green", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Les services pratiques du camping.", { color: "gray" }),
      blocks: [
        [textStyle("HORAIRES", { color: "green", bold: true }), textStyle("Basse Saison (8h30-12h/14h-19h)\n Juillet-Aôut (8h-20h)\n,Octobre (9-12/14-18)\n, Novembre-Décembre-Janvier (9-12/15-18)", { color: "gray" }), "🕐"],
        [textStyle("NOTRE EQUIPE", { color: "orange", bold: true }), textStyle("Emmanuelle, Mathilde, Alexandre, Tess et Caroline sont à votre disposition pour tout renseignement ", { color: "dark" }), "🦸‍♀️"],
        [textStyle("EPICERIE", { color: "blue", bold: true }), textStyle("Il vous manque quelque chose ? Envie d'une petite gourmandise ? Notre épicerie est la pour vous.", { color: "dark" }), "🛍️"]
      ]
    },
    rules: {
      title: textStyle("📖 REGLEMENT DU CAMPING", { color: "purple", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Merci de respecter ces règles afin que chacun profite de vacances agréables.", { color: "gray" }),
      blocks: [
        [textStyle("CALME", { color: "purple", bold: true }), textStyle("Camping familial et calme. Merci de respecter le calme APRES 23h.", { color: "dark" }), "🌙"],
        [textStyle("VEHICULES", { color: "blue", bold: true }), textStyle("1 véhicule par mobil-home. Les véhicules supplémentaires doivent etre stationnés sur le parking situé à l'extérieur.", { color: "dark" }), "🚗"],
        [textStyle("CAPACITE", { color: "orange", bold: true }), textStyle("Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)", { color: "dark" }), "👨‍👩‍👧‍👦"],
        [textStyle("MINEURS", { color: "red", bold: true }), textStyle("Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.", { color: "dark" }), "🧒"],
        [textStyle("DEPART", { color: "green", bold: true }), textStyle("Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !", { color: "dark" }), "🏠"],
        [textStyle("ANIMAUX", { color: "teal", bold: true }), textStyle("Les animaux doivent être tenus sous contrôle et respecter les règles du camping.", { color: "dark" }), "🐶"],
        [textStyle("PROPRETE", { color: "green", bold: true }), textStyle("Merci de respecter les espaces communs, sanitaires et zones de tri.", { color: "dark" }), "♻️"],
        [textStyle("RISQUE INCENDIE", { color: "red", bold: true }), textStyle("Le camping est sous risque incendie important. Pour cela, merci de respecter IMPERATIVEMENT les règles suivantes: Aucune source de flamme n'est autorisée dans l'enceinte du camping; Seul les équipements à gaz sont acceptés; Merci de ne pas fumer dans les allées et lieux publics du camping; ", { color: "dark" }), "🔥"],
        [textStyle("CONSIGNES D'EVACTUATION", { color: "green", bold: true }), textStyle("En cas d'évacuation, merci de vous rassembler au point de rassemblement (citystade), tout en respectant les règles suivantes: En partant du mobilhome, veuillez couper toute source electrique (lumière, climatisation, etc..), ne pas courrir, NE PAS RETOURNER EN ARRIERE, Suivre uniquement le chemin indiqué par les panneaux de signalisation associés (flèche rouge sur fond blanc). Si vos enfants ou autre ne sont pas avec vous, pas d'inquiétude ! Les animateurs et autres membres du personnel les rappatrieront eux aussi au niveau du point de rassemblement", { color: "dark" }), "♻️"],
      ]
    },
    map: {
      interactive: true,
      title: textStyle("🗺️ PLAN DU CAMPING", { color: "teal", bold: true, size: "large" }),
      image: "images/plan.jpg",
      intro: textStyle("Repérez facilement les principaux services et équipements.", { color: "gray" }),
      blocks: [
        [textStyle("📍 Points importants", { color: "teal", bold: true }), textStyle("Réception • Piscine • Restaurant • Épicerie • Sanitaires • Aires de jeux • Parking", { color: "dark" }), "📍"]
      ]
    },
    region: {
      title: textStyle("📍 A DECOUVRIR", { color: "teal", bold: true, size: "large" }),
      intro: textStyle("Découvrez les incontournables autour de Ceyreste et de La Ciotat.", { color: "gray" }),
      blocks: [
        [textStyle("LA CIOTAT", { color: "blue", bold: true }), textStyle("Vieux-Port, plages, calanques et Parc du Mugel.", { color: "dark" }), "🌊"],
        [textStyle("CALANQUES", { color: "teal", bold: true }), textStyle("Figuerolles, Mugel et paysages de la côte méditerranéenne.", { color: "dark" }), "🏞️"],
        [textStyle("CASSIS", { color: "green", bold: true }), textStyle("Port, calanques et Route des Crêtes.", { color: "dark" }), "⛰️"],
        [textStyle("BANDOL & SANARY", { color: "orange", bold: true }), textStyle("Ports, marchés, plages et balades en bord de mer.", { color: "dark" }), "☀️"],
        [textStyle("MARCHES LOCAUX", { color: "purple", bold: true }), textStyle("La Ciotat, Bandol, Sanary, Le Castellet", { color: "dark" }), "🛍️"]
      ]
    },
    partners: {
      title: textStyle("🚲 NOS PARTENAIRES", { color: "orange", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Retrouvez ici les activités partenaires recommandées par le camping.", { color: "gray" }),
      blocks: [
        [textStyle("Location de vélos", { color: "pink", bold: true }), textStyle("TROLIB CASSIS, Location de vélos électriques et promenade, 06.72.50.47.26 ", { color: "dark" }), "🚲"],
        [textStyle("Location de scooters", { color: "orange", bold: true }), textStyle("TOP LOC SERVICES à Roquefort-la-Bédoule, 06.24.09.72.25", { color: "dark" }), "🛵"],
        [textStyle("Location de quad", { color: "grey", bold: true }), textStyle("RENT A QUAD 13, au départ de La Ciotat, 07.83.05.99.33 ", { color: "dark" }), "🛤️"],
        [textStyle("Location Kayak", { color: "yellow", bold: true }), textStyle("KAYAK RAIDS à La Ciotat, 06.34.69.83.49", { color: "dark" }), "🛶"],
        [textStyle("Catamaran", { color: "blue", bold: true }), textStyle("CAT EXPLORER, Sortie en Catamaran, 07.87.23.24.71", { color: "dark" }), "⛵"],
        [textStyle("Salles d'escalade", { color: "teal", bold: true }), textStyle("BLOC SESSION à La Ciotat, 04.42.72.05.18", { color: "dark" }), "🧗"],
        [textStyle("Location Voiture", { color: "red", bold: true }), textStyle("OLYMPIC LOCATION, voir avec la Réception", { color: "dark" }), "🚗"],
        [textStyle("Parapente", { color: "pink", bold: true }), textStyle("MARSEILLE PARAPENTE, Baptemes et Formations, 06.51.84.46.71", { color: "dark" }), "🎈"],
        [textStyle("Visites des Calanques", { color: "blue", bold: true }), textStyle("GUIDES CASSIS CALANQUES CANAILLES, Visites en bateau, Randonnée, Escalade, Via Cordata, 06.61.50.38.48", { color: "dark" }), "🏞️"],
        [textStyle("Plongée", { color: "green", bold: true }), textStyle("ANAYA PLONGEE, 07.45.12.31.65", { color: "dark" }), "🥽"],
        [textStyle("Visites des Calanques en Bateau", { color: "orange", bold: true }), textStyle("LES AMIS DES CALANQUES, 06.09.35.25.68", { color: "dark" }), "🏞️"],
        [textStyle("Shiatsu e Do In (Bien être)", { color: "brown", bold: true }), textStyle("ENTRE MAINS ET MAUX, Sabine PUGLIESI, 06.15.75.06.72", { color: "dark" }), "💆"],
        [textStyle("Reflexologie", { color: "grey", bold: true }), textStyle("PIERRE GALAND, 06.59.22.84.73", { color: "dark" }), "🦶"]
      ]
    },
    emergency: {
      title: textStyle("NOS SERVICES", { color: "red", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Vous avez oublié quelque chose ? Vous avez besoin de quelque chose ?", { color: "red", bold: true }),
      blocks: [
        [textStyle("LINGERIE", { color: "green", bold: true }), textStyle("Location de draps: Lit Simple 12€\n Lit Douple: 15€\n Location de Kit Serviette 10€", { color: "dark" }), "🧶"],
        [textStyle("KIT BEBE", { color: "pink", bold: true }), textStyle("Location d'un Kit Bébé (lit parapluie; Chaise haute et d'une baignoire) pour 5€/jour", { color: "dark" }), "🐤"],
        [textStyle("BARBECUE A GAZ", { color: "red", bold: true }), textStyle("Location d'un barbecue à gaz pour 8€/jour", { color: "dark" }), "♨️"],
        [textStyle("FRIGO", { color: "blue", bold: true }), textStyle("Location d'un frigo pour 7€/jour, ou d'une box réfrigérée pour 5€/jour", { color: "dark" }), "❄️"],
        [textStyle("LAVERIE", { color: "grey", bold: true }), textStyle("La laverie focntionne sous forme de jeton: LAVE-LINGE 5€\n SECHE-LINGE 2€\n DOSE DE LESSIVE 1€", { color: "dark" }), "🧼"],
        [textStyle("WIFI", { color: "yellow", bold: true }), textStyle("Wifi sous forme de tickets: 24h: 5€ et 20€ pour une semaine", { color: "dark" }), "📳"],
        [textStyle("DEPOT DE PAIN", { color: "orange", bold: true }), textStyle("Depot de pain et Viennoiseries tout les jours. SUR RESERVATION à la reception", { color: "dark" }), "🥖"]
      ]
    },
    notifications: {
      title: textStyle("🔔 Infos du camping", { color: "blue", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Cette rubrique pourra servir à afficher les informations importantes du jour.", { color: "gray" }),
      blocks: [
        [textStyle("📢 Information", { color: "orange", bold: true }), textStyle("Saison 2026: 04 Avril au 02 Janvier 2027", { color: "dark" }), "📢"]
      ]
    },
    departure: {
      title: textStyle("🧳 MON DÉPART", { color: "orange", bold: true, size: "large" }),
      intro: textStyle("Les dernières étapes avant de prendre la route 👋", { color: "gray" }),
      accordion: true,
      blocks: [
        [textStyle("HEURE DE DÉPART", { color: "orange", bold: true }), textStyle("Votre hébergement doit être libéré avant 10h00.", { color: "dark" }), "🏠"],
        [textStyle("HÉBERGEMENT", { color: "green", bold: true }), textStyle("Merci de laisser votre hébergement propre et rangé conformément aux consignes du camping: Poubelles vidées / Réfrigérateur vidé et nettoyé / Couverture et draps pliés / Sol nettoyé / Vaisselle propre et rangée / placards nettoyés et vidés", { color: "dark" }), "🧹"],
        [textStyle("DÉCHETS", { color: "teal", bold: true }), textStyle("Déposez vos déchets dans les espaces prévus à cet effet, situé derrière la laverie", { color: "dark" }), "🗑️"],
        [textStyle("FORFAIT MENAGE", { color: "orange", bold: true }), textStyle("Le ménage de fin de séjour est à votre charge. Si tel n'était pas le cas, nous serons dans l'obligation de vous facturer le forfait ménage qui est de 80 €.", { color: "dark" }), "🧼"],
        [textStyle("CLÉS", { color: "blue", bold: true }), textStyle("Pensez à faire l'état des lieux de sortie, en appelant la reception le jour de votre départ", { color: "dark" }), "🔑"],
        [textStyle("CAUTION", { color: "purple", bold: true }), textStyle("La caution vous sera restituée uniquement apres que nos équipes aient vérifié l'état du mobilhome par un état des lieux", { color: "dark" }), "💳"],
        [textStyle("DERNIÈRES VÉRIFICATIONS", { color: "teal", bold: true }), textStyle("Pensez à vérifier vos affaires personnelles et les abords de votre emplacement ou hébergement.", { color: "dark" }), "🔎"],
      ],
      conclusion: textStyle("👋 MERCI POUR VOTRE VISITE !\nBonne route et à bientôt au Camping de Ceyreste ❤️", { color: "green-dark", bold: true, align: "center" })
    },

    stay: {
      personalizedMobileHome: true,
      title: textStyle("🏕️ MA LOCATION", { color: "teal", bold: true, size: "large" }),
      image: "",
      intro: textStyle("Une future rubrique pour aider chaque vacancier pendant son séjour.", { color: "gray" }),
      blocks: []
    }
  }
};
