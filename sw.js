const CACHE = "istqb-v3";
const ASSETS = [
  "/istqb-trainer/",
  "/istqb-trainer/index.html",
  "/istqb-trainer/app.js",
  "/istqb-trainer/practice.js",
  "/istqb-trainer/flashcards.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  // HTML (nawigacja) - network-first, by zawsze miec aktualna wersje aplikacji
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(c => c || caches.match("/istqb-trainer/index.html")))
    );
    return;
  }
  // pozostale zasoby - cache-first
  e.respondWith(caches.match(req).then(c => c || fetch(req)));
});
