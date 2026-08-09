# 🔄 Mise à jour automatique

Cette version corrige le problème où les changements de `config.js` pouvaient rester bloqués dans le cache.

## Après une modification

1. Modifie `config.js` sur GitHub.
2. Clique sur **Valider les modifications**.
3. Attends environ 1 à 2 minutes.
4. Recharge l'application.

`config.js` est maintenant récupéré depuis le réseau en priorité.

## Si une ancienne version apparaît encore une fois

Fais `Ctrl + F5` sur ordinateur. Une fois la nouvelle version du Service Worker installée, les prochaines modifications de `config.js` seront beaucoup plus rapides à voir.
