// Service Worker for PWA - Safari 호환성 개선
const CACHE_NAME = 'pokemon-master-v3'; // v3: 네트워크 우선 전략 적용
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

  // CRITICAL FIX: Network-First for HTML navigation
  // 이렇게 하면 항상 최신 index.html을 가져와서 올바른 JS/CSS 파일을 참조함
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 네트워크 응답을 캐시에 저장 (오프라인 대비)
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // 오프라인일 때만 캐시 사용
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-First for other assets (CSS, JS, images) - 성능 최적화
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

