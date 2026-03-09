self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request).catch(function() {
    return new Response('오프라인 상태입니다.', {
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    });
  }));
});