const cacheName = "salary-calculator-v1";
const assets = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install SW and cache assets
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activate SW
self.addEventListener("activate", evt => {
  evt.waitUntil(clients.claim());
});

// Fetch cached assets
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
