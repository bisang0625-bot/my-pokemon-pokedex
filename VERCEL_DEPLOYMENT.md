# Vercel 배포 가이드

포켓 카드 헌터: 몬스터 키우기를 Vercel을 통해 배포하는 방법입니다.

## 🚀 빠른 배포 방법

### 방법 1: Vercel CLI 사용 (추천)

1. **Vercel CLI 설치** (처음 한 번만)
```bash
npm install -g vercel
```

2. **로그인**
```bash
vercel login
```

3. **배포**
```bash
vercel
```
또는 프로덕션 배포:
```bash
vercel --prod
```

### 방법 2: Vercel 웹 대시보드 사용

1. [Vercel](https://vercel.com)에 가입/로그인
2. "Add New Project" 클릭
3. GitHub 저장소 연결 (또는 직접 업로드)
4. 프로젝트 설정:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. "Deploy" 클릭

### 방법 3: GitHub 연동 (자동 배포)

1. GitHub에 코드 푸시
2. Vercel에서 GitHub 저장소 연결
3. 자동으로 배포 설정 완료
4. 이후 push할 때마다 자동 배포

## ⚙️ 배포 설정

### 환경 변수 설정

Vercel 대시보드에서 환경 변수 추가:
- **Key**: `VITE_GEMINI_API_KEY`
- **Value**: Gemini API 키 (부모 모드에서 사용자가 직접 입력하므로 선택사항)

⚠️ **참고**: 현재 앱은 부모 모드에서 사용자가 직접 API 키를 입력하도록 설계되어 있어, 환경 변수는 선택사항입니다.

### 빌드 설정

Vercel은 자동으로 Vite 프로젝트를 감지하지만, 명시적으로 설정하려면:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 📱 PWA 설치

Vercel에 배포하면 HTTPS가 자동으로 적용되므로 PWA 설치가 가능합니다:

### 모바일 (iOS/Android)
1. 브라우저에서 앱 열기
2. 메뉴 > "홈 화면에 추가" 또는 "앱 설치"
3. 홈 화면에서 앱처럼 실행 가능

### 데스크톱 (Chrome/Edge)
1. 주소창 오른쪽의 설치 아이콘 클릭
2. 또는 메뉴 > "앱 설치"

## 🔍 배포 후 확인사항

### 필수 확인
- [ ] 앱이 정상적으로 로드됨
- [ ] 카메라 권한 요청이 작동함
- [ ] 카드 스캔 기능 정상 작동
- [ ] 도감 기능 정상 작동
- [ ] 부모 모드 접근 가능
- [ ] 개인정보 처리방침 페이지 접근 가능
- [ ] 이용약관 페이지 접근 가능

### PWA 확인
- [ ] manifest.json 로드 확인
- [ ] Service Worker 등록 확인
- [ ] 오프라인 지원 확인 (선택사항)

## 🌐 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드 > 프로젝트 설정
2. "Domains" 섹션
3. 도메인 추가
4. DNS 설정 안내 따라하기

## 📊 배포 상태 확인

### Vercel 대시보드
- 배포 로그 확인
- 빌드 상태 확인
- 배포 URL 확인

### 로그 확인
```bash
vercel logs
```

## 🔄 업데이트 배포

### 자동 배포 (GitHub 연동 시)
- `git push`만 하면 자동 배포

### 수동 배포
```bash
vercel --prod
```

## ⚠️ 주의사항

1. **개인정보 처리방침 URL**
   - 배포된 URL을 개인정보 처리방침에 반영
   - 예: `https://your-app.vercel.app/privacy`

2. **API 키 보안**
   - 환경 변수에 민감한 정보 저장 시 주의
   - 현재는 사용자가 직접 입력하므로 안전

3. **빌드 크기**
   - 현재 빌드 크기: 약 2.3MB
   - Vercel 무료 플랜으로 충분

4. **카메라 권한**
   - HTTPS 필수 (Vercel은 자동 제공)
   - 모바일 브라우저에서 정상 작동

## 🆘 문제 해결

### 빌드 실패 시
```bash
# 로컬에서 빌드 테스트
npm run build

# 문제 확인 후 재배포
vercel --prod
```

### 라우팅 문제
- `vercel.json`에 rewrites 설정 확인
- React Router의 모든 경로가 `/index.html`로 리다이렉트되는지 확인

### 환경 변수 문제
- Vercel 대시보드에서 환경 변수 확인
- 재배포 필요할 수 있음

## 📚 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html#vercel)

---

**배포 준비 완료!** 위의 방법 중 하나를 선택하여 배포하세요.

