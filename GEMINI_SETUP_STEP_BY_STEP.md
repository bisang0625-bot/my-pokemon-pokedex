# Gemini API 설정 - 단계별 상세 가이드

## 🔍 "API 및 서비스" 찾는 방법

### 방법 1: 햄버거 메뉴 사용 (가장 쉬움)

1. **Google Cloud Console** 접속: https://console.cloud.google.com/
2. 화면 **왼쪽 상단**에 있는 **☰ (햄버거 메뉴 아이콘)** 클릭
3. 메뉴가 열리면 아래 항목들 중에서 찾기:
   ```
   ☰ 메뉴
   ├─ API 및 서비스  ← 여기!
   │  ├─ 라이브러리
   │  ├─ 대시보드
   │  └─ 사용자 인증 정보
   ```

### 방법 2: 직접 URL로 이동 (가장 빠름)

**API 라이브러리:**
https://console.cloud.google.com/apis/library

**사용자 인증 정보:**
https://console.cloud.google.com/apis/credentials

### 방법 3: 검색 기능 사용

1. Cloud Console **상단 검색창** 클릭
2. **"API 및 서비스"** 입력
3. 검색 결과에서 선택

---

## 📝 전체 설정 과정 (상세)

### 1단계: 프로젝트 생성/선택

1. https://console.cloud.google.com/ 접속
2. 상단 프로젝트 선택 드롭다운 클릭
3. **"새 프로젝트"** 클릭 (또는 기존 프로젝트 선택)
4. 프로젝트 이름 입력 (예: "pokemon-card-scanner")
5. **"만들기"** 클릭

### 2단계: 결제 계정 연결

1. 왼쪽 메뉴에서 **"결제"** 찾기
   - 또는 URL: https://console.cloud.google.com/billing
2. **"결제 계정 연결"** 클릭
3. 신용카드 정보 입력
4. 확인 및 활성화

⚠️ **중요**: 결제 계정 연결 후 $300 무료 크레딧 자동 제공!

### 3단계: Generative Language API 활성화

**옵션 A: 직접 링크 사용 (추천)**
1. https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com 접속
2. **"사용 설정"** 버튼 클릭

**옵션 B: 메뉴에서 찾기**
1. 왼쪽 ☰ 메뉴 클릭
2. **"API 및 서비스"** > **"라이브러리"** 클릭
3. 검색창에 **"Generative Language API"** 입력
4. **"Generative Language API"** 선택
5. **"사용 설정"** 클릭

### 4단계: API 키 생성

1. **사용자 인증 정보 페이지로 이동:**
   - 직접 링크: https://console.cloud.google.com/apis/credentials
   - 또는: ☰ 메뉴 > "API 및 서비스" > "사용자 인증 정보"

2. **API 키 만들기:**
   - 상단 **"+ 사용자 인증 정보 만들기"** 클릭
   - 드롭다운에서 **"API 키"** 선택

3. **API 키 복사:**
   - 생성된 API 키가 팝업으로 표시됨
   - **지금 바로 복사!** (나중에 다시 볼 수 없음)

4. **(선택) API 키 제한 설정:**
   - 보안을 위해 웹사이트 도메인 제한 가능
   - Vercel 도메인 입력 (예: `your-app.vercel.app`)

---

## 🎯 빠른 시작 체크리스트

### Cloud Console에서:
- [ ] 프로젝트 생성/선택
- [ ] 결제 계정 연결 ($300 크레딧 받음)
- [ ] Generative Language API 사용 설정
- [ ] API 키 생성 및 복사

### Vercel에서:
- [ ] 프로젝트 > Settings > Environment Variables
- [ ] `VITE_GEMINI_API_KEY` 값 업데이트
- [ ] 새 API 키 붙여넣기
- [ ] Save 후 재배포

---

## 🆘 문제 해결

### "API 및 서비스" 메뉴가 보이지 않을 때:

1. **프로젝트 선택 확인:**
   - 상단 프로젝트 드롭다운에서 올바른 프로젝트 선택했는지 확인

2. **권한 확인:**
   - 프로젝트 소유자 또는 편집자 권한이 있어야 함

3. **다른 방법 시도:**
   - 직접 URL 사용 (위의 방법 2)
   - 또는 검색 기능 사용

### API 사용 설정 버튼이 비활성화되어 있을 때:

1. **결제 계정 확인:**
   - 결제 계정이 연결되어 있는지 확인
   - "결제" 메뉴에서 확인 가능

2. **프로젝트 권한 확인:**
   - 프로젝트에 대한 권한이 있는지 확인

---

## 📞 추가 도움말

- [Google Cloud Console 도움말](https://cloud.google.com/docs)
- [Gemini API 문서](https://ai.google.dev/docs)
- [API 키 관리 가이드](https://cloud.google.com/docs/authentication/api-keys)

---

## ✅ 완료 확인

설정이 완료되면:
1. API 키가 생성되었는지 확인
2. Vercel 환경 변수에 적용
3. 앱에서 카드 분석 테스트
4. 할당량 초과 에러가 사라졌는지 확인

문제가 계속되면 알려주세요!

