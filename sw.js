const CACHE_NAME = 'streifenhelfer-v3';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './Zuglogo.png',
  './tatbestand.pdf',
  './tuning.png',
  './laser.png',
  './siproa.png',
  './siprob.png',
  './bild1.png',
  './bild2.png',
  './bild3.png',
  './bild4.png',
  './bild5.png',
  './bild6.png',
  './bild7.png',
  './bild8.png',
  './bild9.png',
  './bild10.png',
  './bild11.png'
];

// Installation & Pre-Caching
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Sofort aktivieren
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Aktivierung & alten Cache aufräumen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Netzwerk- oder Cache-Abruf
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
