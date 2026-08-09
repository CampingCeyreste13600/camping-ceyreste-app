# 📅 Programme automatique — AUJOURD'HUI

La case **AUJOURD'HUI** lit automatiquement le jour actuel du téléphone et récupère les animations correspondantes dans `planning`.

## Ce que tu modifies

Tu modifies uniquement la partie `planning` dans `config.js`.

Exemple :

```js
{
  day: "Lundi",
  events: [
    { text: "10h00 • Aquagym", color: "blue", bold: true, icon: "🏊" },
    { text: "21h00 • Soirée mousse", color: "pink", bold: true, icon: "🎉" }
  ]
},
```

Si aujourd'hui est lundi, ces événements apparaissent automatiquement dans **AUJOURD'HUI**.

Demain, l'application passe automatiquement au mardi.

Si aucun événement n'est prévu pour le jour actuel, elle affiche un message indiquant qu'il n'y a pas d'animation prévue.

Tu n'as donc pas besoin de modifier la rubrique `today`.
