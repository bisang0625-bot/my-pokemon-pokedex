# API 키 Vercel 설정 가이드

## ✅ API 키 발급 완료 후 다음 단계

### 1단계: Vercel에 API 키 설정

1. **Vercel 대시보드 접속**
   - https://vercel.com/dashboard
   - 로그인

2. **프로젝트 선택**
   - "포켓 카드 헌터" 프로젝트 클릭

3. **환경 변수 설정**
   - 상단 메뉴에서 **"Settings"** 클릭
   - 왼쪽 사이드바에서 **"Environment Variables"** 클릭

4. **기존 키 수정 또는 새로 추가**
   - `VITE_GEMINI_API_KEY` 찾기
   - 기존 키가 있으면: **"Edit"** 클릭 → 새 API 키로 변경
   - 기존 키가 없으면: **"Add New"** 클릭
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: 발급받은 새 API 키 붙여넣기
   - **Environment**: 모든 환경 선택 (Production, Preview, Development)
   - **"Save"** 클릭

5. **재배포**
   - 상단 메뉴에서 **"Deployments"** 클릭
   - 가장 최근 배포 옆 **"⋯"** (점 3개) 클릭
   - **"Redeploy"** 선택
   - 또는 자동 배포 대기 (환경 변수 변경 후 자동 재배포)

---

## 🧪 로컬 개발 환경 설정 (선택사항)

로컬에서 테스트하려면:

1. **프로젝트 폴더에 `.env` 파일 생성**
   ```bash
   cd /Users/seungholee/Desktop/Cursor/PKM
   touch .env
   ```

2. **`.env` 파일에 API 키 추가**
   ```
   VITE_GEMINI_API_KEY=여기에_발급받은_API_키_붙여넣기
   ```

3. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

⚠️ **주의**: `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다 (이미 설정되어 있음)

---

## ✅ 설정 완료 확인

### 확인 방법:

1. **Vercel 재배포 완료 대기** (1-2분)

2. **앱 테스트**
   - 배포된 앱 접속
   - "스캔" 메뉴로 이동
   - 카드 스캔 및 분석 테스트

3. **할당량 확인**
   - 정상 작동하면 성공!
   - 할당량 초과 에러가 사라졌는지 확인

---

## 🎯 체크리스트

### Vercel 설정:
- [ ] Vercel 대시보드 접속
- [ ] 프로젝트 선택
- [ ] Settings > Environment Variables
- [ ] `VITE_GEMINI_API_KEY` 값 업데이트
- [ ] 새 API 키 붙여넣기
- [ ] Save 클릭
- [ ] 재배포 또는 자동 배포 대기

### 테스트:
- [ ] 배포 완료 확인
- [ ] 앱에서 카드 스캔 테스트
- [ ] 할당량 초과 에러 해결 확인

---

## 🆘 문제 해결

### 환경 변수가 적용되지 않을 때:
1. **재배포 확인**: 환경 변수 저장 후 자동 재배포가 시작되는지 확인
2. **수동 재배포**: Deployments > Redeploy 클릭
3. **캐시 클리어**: 브라우저 캐시 클리어 후 다시 테스트

### 여전히 할당량 에러가 나올 때:
1. **API 키 확인**: 올바른 키가 설정되었는지 확인
2. **결제 계정 확인**: Cloud Console에서 결제 계정이 연결되었는지 확인
3. **API 활성화 확인**: Generative Language API가 활성화되었는지 확인

---

## 📞 추가 도움

문제가 계속되면:
1. Vercel 로그 확인 (Deployments > 로그 보기)
2. 브라우저 콘솔 확인 (F12 > Console)
3. Cloud Console에서 API 사용량 확인

설정 완료 후 알려주세요!

