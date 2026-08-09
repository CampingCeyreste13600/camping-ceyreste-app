# 🎨 V3 — Couleur de presque tous les textes

Tu peux maintenant personnaliser beaucoup de textes directement dans `config.js`.

## La fonction à utiliser

```js
textStyle("Mon texte", {
  color: "green",
  bold: true,
  italic: true,
  size: "large",
  background: "#fff2cc",
  align: "center"
})
```

### Couleurs
- green
- green-dark
- blue
- orange
- red
- purple
- pink
- teal
- yellow
- gray
- dark
- white

Tu peux aussi utiliser un code HTML, par exemple :
`color: "#ff69b4"`

### Taille
- `small`
- `normal`
- `large`
- `xl`

### Exemple

```js
headline: textStyle("Bienvenue au camping !", {
  color: "green",
  bold: true,
  size: "large"
}),
```

### Exemple avec fond

```js
note: textStyle("OUVERTE ✔️", {
  color: "green",
  bold: true,
  background: "#e8f5d0"
}),
```

### Planning

Le planning accepte aussi :

```js
{ text: "21h00 • SOIRÉE MOUSSE", color: "pink", bold: true, size: "large" }
```

Tu peux utiliser des codes couleur personnalisés :
```js
{ text: "Animation spéciale", color: "#ff1493" }
```

## Important
- Tu modifies principalement `config.js`.
- Ne modifie pas `app.js` ou `style.css` sauf si tu sais ce que tu fais.
- Après modification : GitHub → Valider les modifications → attendre un peu → actualiser l'application.
