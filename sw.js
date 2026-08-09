const CACHE="ceyreste-v4";
const FILES=["./","./index.html","./style.css","./app.js","./manifest.webmanifest","./icon.svg"];

// L'application garde ses fichiers en cache,
// MAIS config.js est toujours recherché en ligne en priorité.
// Ainsi, les modifications faites sur GitHub apparaissent sans
// devoir vider manuellement le cache.
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // config.js = réseau en priorité
  if (url.pathname.endsWith("/config.js")) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Pour le reste : cache puis réseau
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
