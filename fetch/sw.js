self.addEventListener('install', (event) => {
  return event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', () => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  return event.respondWith(fetch(event.request));
});