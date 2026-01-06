# Safari 흰 화면 문제 해결 가이드

## 적용된 수정사항

### 1. Service Worker 개선
- Safari에서 Service Worker 등록 실패 시에도 앱이 정상 작동하도록 개선
- 에러 핸들링 강화
- `skipWaiting` 및 `clients.claim()` 추가로 Safari 호환성 향상

### 2. React 렌더링 안전성 개선
- Service Worker와 독립적으로 React 앱 렌더링
- 에러 발생 시 사용자에게 친화적인 메시지 표시
- `root` 요소 존재 여부 확인

### 3. 빌드 설정 개선
- `target: 'es2015'` 설정으로 Safari 11+ 지원
- ES Module 형식 유지

### 4. HTML 메타 태그 추가
- Safari 호환성을 위한 메타 태그 추가
- `X-UA-Compatible` 추가

## Safari에서 테스트 방법

1. **Safari 개발자 도구 열기**
   - Safari → 환경설정 → 고급 → "메뉴 막대에서 개발자용 메뉴 보기" 체크
   - 개발자용 → JavaScript 콘솔 보기

2. **콘솔에서 에러 확인**
   - F12 또는 Cmd+Option+I
   - 콘솔 탭에서 빨간색 에러 메시지 확인

3. **캐시 클리어**
   - Safari → 환경설정 → 고급 → "웹사이트 데이터 제거"
   - 또는 Cmd+Shift+Delete

4. **Service Worker 확인**
   - 개발자용 → Service Worker 보기
   - 등록된 Service Worker 확인

## 추가 문제 해결

### 여전히 흰 화면이 보이는 경우

1. **JavaScript 에러 확인**
   ```javascript
   // Safari 콘솔에서 실행
   console.log('Root element:', document.getElementById('root'));
   ```

2. **Service Worker 비활성화 테스트**
   - Safari → 환경설정 → 고급 → "Service Worker 비활성화"
   - 페이지 새로고침 후 확인

3. **네트워크 탭 확인**
   - 개발자 도구 → 네트워크 탭
   - 실패한 요청 확인 (빨간색)

4. **로컬 스토리지 확인**
   - 개발자 도구 → 스토리지 탭
   - localStorage 내용 확인

## 알려진 Safari 이슈

1. **Service Worker 제한**
   - Safari는 Service Worker를 더 엄격하게 처리
   - HTTPS 또는 localhost에서만 작동

2. **ES Module 지원**
   - Safari 11+ 에서 ES Module 지원
   - 구버전 Safari는 지원하지 않음

3. **캐시 정책**
   - Safari는 캐시를 더 엄격하게 관리
   - 개발 중에는 캐시 비활성화 권장

## 디버깅 팁

Safari에서 문제가 발생하면:

1. **콘솔 에러 확인**
2. **네트워크 요청 확인**
3. **Service Worker 상태 확인**
4. **캐시 클리어**
5. **시크릿 모드에서 테스트**

