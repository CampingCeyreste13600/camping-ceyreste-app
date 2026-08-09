# V8 — AUJOURD'HUI + programme automatique

La carte **AUJOURD'HUI AU CAMPING** affiche deux choses :

1. Les informations fixes du camping (`today.items`) :
   piscine, restaurant, épicerie, etc.
2. Le **programme d'animation du jour**, choisi automatiquement dans `planning`.

## Ce que tu modifies

Tu modifies uniquement `config.js`.

### Informations fixes

Dans `today.items` :

```js
{
  icon: "🏊",
  title: textStyle("Espace Aquatique", { color: "blue", bold: true }),
  time: "10H-20H",
  note: textStyle("Ouverte ✔️", { color: "green", bold: true })
}
```

### Programme de la semaine

Dans `planning`, renseigne Lundi à Dimanche.

L'application regarde automatiquement le jour actuel du téléphone et affiche les événements correspondants dans **PROGRAMME D'ANIMATION DU JOUR**.

La rubrique **Programme** de l'application continue d'afficher la semaine entière.
