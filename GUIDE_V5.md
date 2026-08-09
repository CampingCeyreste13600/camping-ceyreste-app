# V5 — Version corrigée

Cette version corrige le problème de page blanche.

## Ce qui a été corrigé

- `textStyle()` est maintenant défini dans `config.js` AVANT son utilisation.
- `app.js` reste compatible même si la fonction n'existe pas encore.
- Le Service Worker passe en V5.
- `config.js` est récupéré depuis le réseau en priorité.

## Ce que tu modifies

Tu peux modifier principalement `config.js`.

Exemple :

```js
headline: textStyle("BIENVENUE !", {
  color: "red",
  bold: true
}),
```

Puis :

1. GitHub → modifier `config.js`
2. Valider les modifications
3. Attendre 1 à 2 minutes
4. Actualiser l'application

## Si tu vois encore une ancienne version une seule fois

Sur ordinateur : `Ctrl + F5`.

Après l'installation de V5, les prochaines modifications de `config.js` doivent se mettre à jour sans vider manuellement le cache.
