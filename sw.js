self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', function(e) {
  // Apps Script(GS_URL) 같은 외부 API 호출은 가로채지 않음
  try{
    const url = new URL(e.request.url);
    const isGoogleScript = url.hostname.includes('script.google.com');
    if(isGoogleScript) return; // 브라우저 기본 fetch로 처리
  }catch(err){}
  // 문서(페이지) 로드만 오프라인 메시지로 대체
  const isNav = e.request.mode === 'navigate';
  if(!isNav) return;
  e.respondWith(
    fetch(e.request).catch(function() {
      return new Response('오프라인 상태입니다.', {
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      });
    })
  );
});
