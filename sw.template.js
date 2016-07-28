var items = [
  /*items-placeholder*/
  './',
  './index.html',
  './index.html?homescreen=1',
  './?homescreen=1',
  './lib/flag-icon-css/css/flag-icon.min.css',
  './lib/howler/howler.min.js',
  './lib/jquery/jquery-2.2.4.min.js',
  './lib/jquery_mobile/jquery.mobile-1.4.5.min.css',
  './scripts/main.min.js',
  './scripts/settings.js',
  './scripts/play.js',
  './scripts/sounds.js',
  './mediamap.json',
  './sounds/alphabet.json',
  './styles/main.css',
  './styles/landscape.css',
  './styles/portrait.css'
];
//console.log(items);
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('alphabet').then(cache => {
      return cache.addAll(items)
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      //console.log(response || fetch(event.request));
      return response || fetch(event.request);
    })
  );
});
