self.addEventListener('install', (e)=>{
  e.waitUntil(
   caches.open('sommelier-v2').then(cache => cache.addAll([
'/Sommelier/',
'/Sommelier/index.html',
'/Sommelier/manifest.json',
'/Sommelier/sw.js',
'/Sommelier/icons/icon-192.png',
'/Sommelier/icons/icon-512.png',
'/Sommelier/icons/maskable-512.png'
]))
  );
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request))
  );
});
