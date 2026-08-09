# Photos sur les cases du menu

Chaque case du menu principal accepte maintenant une photo facultative via `config.js`.

Exemple :

```js
{ id: "pool", icon: "🏊", title: textStyle("Espace aquatique", { color: "blue", bold: true }), desc: textStyle("Piscines, toboggans & horaires", { color: "gray" }), image: "images/piscine.jpg" }
```

Pour désactiver la photo, laisser simplement :

```js
image: ""
```

Les 9 cases disposent déjà du champ `image` : Programme, Espace aquatique, Restaurant, Épicerie, Règlement, Plan du camping, À découvrir, Nos partenaires et Urgences.

Mettre les fichiers dans `images/` et utiliser le chemin `images/nom-du-fichier.jpg` (ou `.png`, `.webp`, etc.).
