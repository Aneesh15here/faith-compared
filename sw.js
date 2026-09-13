/* Faith, Compared — root service worker (all locales)
 * Cache version: bump CACHE when shell assets change; also bump styles.css?v= in HTML.
 * On activate, only removes other faith-compared-* caches — never unrelated origin caches.
 */
const CACHE = 'faith-compared-v19';
const SHELL = [
  '/index.html',
  '/philosophy.html',
  '/happiness.html',
  '/stats.html',
  '/styles.css?v=19',
  '/religions.js',
  '/js/app.js',
  '/js/site.js',
  '/js/i18n/en.js',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/vendor/d3.min.js',
  '/vendor/topojson-client.min.js',
  '/vendor/countries-110m.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith('faith-compared-') && k !== CACHE)
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: serve from cache instantly, refresh in the background.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const fresh = fetch(e.request).then(res => {
          if (res.ok && (e.request.url.startsWith(self.location.origin) || res.type === 'cors')) {
            cache.put(e.request, res.clone());
          }
          return res;
        }).catch(() => cached);
        return cached || fresh;
      })
    )
  );
});
