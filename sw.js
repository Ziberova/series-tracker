const CACHE='series-tracker-v10';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./icon-maskable.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok&&r.type==='basic'){const cp=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,cp))}return r}).catch(()=>caches.match('./index.html'))))}); в 
