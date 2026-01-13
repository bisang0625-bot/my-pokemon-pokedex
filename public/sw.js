// Service Worker for PWA - Safari 호환성 개선
const CACHE_NAME = 'pokemon-master-v2';
const urlsToCache = [
  '/',
  '/index.html'
];

self.addEventListener('install', (event) => {
  // Safari 호환성을 위해 skipWaiting 사용
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Safari에서 addAll이 실패할 수 있으므로 개별적으로 추가
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(err => {
              console.log(`Failed to cache ${url}:`, err);
              return null;
            })
          )
        );
      })
      .catch((error) => {
        console.log('Cache open failed:', error);
        // 캐시 실패해도 Service Worker는 활성화
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Safari 호환성: GET 요청만 처리
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에 있으면 캐시 사용, 없으면 네트워크 요청
        return response || fetch(event.request).catch((error) => {
          console.log('Fetch failed:', error);
          // 네트워크 실패 시 기본 응답 반환
          return new Response('Network error', { status: 408 });
        });
      })
      .catch((error) => {
        console.log('Cache match failed:', error);
        // 캐시 매칭 실패 시 네트워크 요청
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // 모든 클라이언트 제어 즉시 획득 (Safari 호환)
      self.clients.claim(),
      // 오래된 캐시 정리
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ]).catch((error) => {
      console.log('Activate failed:', error);
      // 활성화 실패해도 계속 진행
    })
  );
});

