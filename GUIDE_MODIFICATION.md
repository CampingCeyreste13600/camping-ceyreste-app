# 🏕️ Modifier l'application — guide très simple

Bonne nouvelle : **tu n'as pas besoin de modifier le code de l'application** pour changer les informations courantes.

Le fichier important est :

➡️ `config.js`

## Ce que tu peux modifier

### 1. Téléphone / e-mail
Cherche :
`contact:`

Puis change le numéro ou l'adresse e-mail.

### 2. Infos du jour
Cherche :
`today:`

Tu peux modifier Piscine, Animation, Restaurant et Épicerie.

### 3. Planning
Cherche :
`planning:`

Tu peux remplacer les activités de chaque jour.

Exemple :
`{ day: "Lundi", events: ["10h00 • Aquagym", "21h00 • Soirée"] }`

### 4. Règlement
Cherche :
`rules:`

Tu peux modifier ou ajouter des blocs.

### 5. Restaurant / épicerie / piscine
Cherche les rubriques :
`pool`, `restaurant`, `shop`

et remplace les textes "À compléter".

### 6. Plan du camping
Pour l'instant, l'application affiche un emplacement prévu pour le plan.
On pourra ensuite ajouter votre vraie image du plan.

### 7. Photos
La prochaine étape pourra remplacer les fonds génériques par vos propres photos du camping.

## ⚠️ Important
Ne change pas les noms des fichiers :
- index.html
- style.css
- config.js
- app.js
- manifest.webmanifest
- sw.js
- icon.svg

Pour commencer, tu peux uniquement modifier `config.js`.

## Mise à jour
Quand l'application sera en ligne sur GitHub Pages, tu modifieras `config.js`, tu l'enverras à nouveau sur GitHub, et l'application sera mise à jour.

## Prochaine étape recommandée
1. Ajouter le vrai logo.
2. Ajouter 3 à 6 photos du camping.
3. Ajouter le vrai plan.
4. Ajouter les vrais horaires.
5. Ajouter le planning.
6. Ajouter les liens des partenaires.
7. Ajouter un QR code.
