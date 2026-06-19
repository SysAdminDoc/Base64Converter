const CACHE = 'b64pro-v0.3.4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (e.request.method === 'POST' && url.searchParams.has('share')) {
    e.respondWith((async () => {
      const formData = await e.request.formData();
      const file = formData.get('file');
      if (file) {
        const cache = await caches.open('b64pro-share');
        await cache.put('shared-file', new Response(file, {
          headers: { 'X-Filename': file.name, 'Content-Type': file.type || 'application/octet-stream' }
        }));
      }
      return Response.redirect('./index.html?share=file', 303);
    })());
    return;
  }

  if (e.request.method !== 'GET') return;
  const isCDN = url.hostname.includes('jsdelivr.net');
  if (url.origin !== location.origin && !isCDN) return;

  if (isCDN) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
