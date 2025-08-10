const CACHE = 'sommelier-v3-1';
const ASSETS = [
  './',
  './index.html',
  './404.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
});

self.addEventListener('fetch', (event)=>{
  const req = event.request;
  // For navigations (opening the app directly), serve index.html to avoid 404 under subpaths
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(()=>caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(r=> r || fetch(req))
  );
});
