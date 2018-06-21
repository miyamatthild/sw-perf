<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.core.min.js"></script>

<script>
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js').then(() => {
            console.log('SW registered');
        });
    }
</script>

[home]({{ "../" }})

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

## expectation

This service worker should add minimal overhead to requests. It's more or less passing things through, and therefore the only additional latency should arise from starting up the service worker.

## results

The act of adding a service worker causes a significant performance hit when compared with no service worker. The image below shows sample network requests when the assets are available in the browser's disk cache. The orange bars represent service worker time and the blue bars represent content download time (per [Dev Tools documentation](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing-explanation)).

![]({{ "../assets/images/disk-cache.png" }})

You can see that the assets take significantly longer -- **3 to 5 times longer** -- to load than they would were the browser to hit the cache directly. If the Dev Tools reporting is correct, the content is fully or almost fully retrieved from the cache before the service worker starts to return content to the page, and that second download takes significantly longer than the cache download.

Going to the server reveals similar behavior with respect to download times.

![]({{ "../assets/images/no-cache.png" }})

*Testing done on Chrome 66 and Chrome 67.*
