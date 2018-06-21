<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.core.min.js"></script>

<script>
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js').then(() => {
            console.log('SW registered');
        });
    }
</script>

[home]({{ "/" }})

# simple fetch

This page illustrates the performance hit from using a service worker to fetch.

## code

The service worker on this page intercepts fetches, then responds with a fetch of the same request. A few popular libraries are loaded on this page (underscore, lodash, bootstrap) to illustrate what happens when intercepting and re-fetching JavaScript and CSS.

```js
self.addEventListener('install', (event) => {
  return event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', () => {
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  return event.respondWith(fetch(event.request));
});
```

## how to use

1. Open developer tools.
2. Go to network tab.
3. Refresh. (Repeat)


