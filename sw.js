const CACHE_NAME = 'puzzle-scanner-v1';
const urlsToCache = [
  '/puzzle71-scanner/',
  '/puzzle71-scanner/index.html',
  '/puzzle71-scanner/manifest.json',
  '/puzzle71-scanner/worker.js',
  '/puzzle71-scanner/icon-192x192.png',
  '/puzzle71-scanner/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});