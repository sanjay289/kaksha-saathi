// Kaksha Saathi offline support: caches the homepage and every lesson file on first visit,
// so the site and online lessons keep working without internet afterwards.
const VERSION = 'kaksha-v2';
const FILES = [
  './', './index.html', './manifest.json', './icon.svg',
  './learn/', './learn/index.html', './learn/primary.js', './learn/class8-core.js', './learn/class8-english.js',
  './learn/grades3-5.js', './learn/grades6-8.js', './learn/more-lessons-primary.js', './learn/more-lessons-upper.js',
  './learn910/', './learn910/index.html', './learn910/config.js', './learn910/content.js', './learn910/board10.js', './learn910/board.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (so updates arrive when online), cache as fallback when offline.
// Query strings like ?grade=8 share one cached page.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.url.endsWith('.apk')) return; // APK downloads always go to the network
  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
