# 유료 플랜 전환 문제 해결 가이드

## ⚠️ 현재 상황
에러 메시지에서 `generate_content_free_tier_requests`가 보이면 **아직 무료 티어**를 사용하고 있는 것입니다.

## 🔍 확인해야 할 사항

### 1. Google Cloud Console 확인

#### ✅ 결제 계정 연결 확인
1. [Google Cloud Console](https://console.cloud.google.com/billing) 접속
2. 결제 계정이 연결되어 있는지 확인
3. **연결되어 있지 않다면**:
   - "결제 계정 연결" 클릭
   - 신용카드 정보 입력
   - 확인 및 활성화

#### ✅ Generative Language API 활성화 확인
1. [API 라이브러리](https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com) 접속
2. "사용 설정" 버튼이 보이면 → 클릭하여 활성화
3. "관리" 버튼이 보이면 → 이미 활성화됨 ✅

#### ✅ 프로젝트 확인
1. 상단 프로젝트 드롭다운 확인
2. **결제 계정이 연결된 프로젝트**를 선택했는지 확인
3. API 키가 **해당 프로젝트**에서 생성되었는지 확인

### 2. API 키 확인

#### ✅ API 키 생성 위치 확인
1. [사용자 인증 정보](https://console.cloud.google.com/apis/credentials) 접속
2. 생성한 API 키가 **결제 계정이 연결된 프로젝트**에서 만들어진 것인지 확인

#### ✅ API 키 제한 확인
- API 키에 제한이 설정되어 있지 않은지 확인
- 필요시 "편집"에서 제한 해제

### 3. Vercel 환경 변수 확인

#### ✅ 환경 변수 업데이트 확인
1. Vercel > 프로젝트 > Settings > Environment Variables
2. `VITE_GEMINI_API_KEY` 값이 **새 API 키**로 업데이트되었는지 확인
3. **모든 환경** (Production, Preview, Development)에 적용되었는지 확인

#### ✅ 재배포 확인
1. Vercel > Deployments
2. 가장 최근 배포 시간 확인
3. 환경 변수 변경 후 **재배포**되었는지 확인
4. 재배포 안 됐다면 수동으로 **Redeploy** 실행

### 4. 브라우저 캐시 클리어

1. **하드 리프레시**: 
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
2. 또는 **시크릿 모드**에서 테스트

## 🔧 단계별 해결 방법

### 방법 1: 새로운 API 키로 재설정

1. **Google Cloud Console에서 새 API 키 생성**
   - 결제 계정이 연결된 프로젝트에서 생성
   - Generative Language API가 활성화된 프로젝트

2. **Vercel 환경 변수 업데이트**
   - 새 API 키로 교체

3. **재배포**
   - 자동 또는 수동 Redeploy

4. **테스트**
   - 브라우저 캐시 클리어 후 테스트

### 방법 2: Google Cloud Console 재확인

**확인 체크리스트:**
- [ ] 결제 계정 연결됨 (Billing 메뉴에서 확인)
- [ ] 올바른 프로젝트 선택됨 (상단 프로젝트 드롭다운)
- [ ] Generative Language API 활성화됨
- [ ] API 키가 해당 프로젝트에서 생성됨

### 방법 3: API 사용량 확인

1. [API 대시보드](https://console.cloud.google.com/apis/dashboard) 접속
2. Generative Language API 선택
3. "할당량" 탭에서 확인
   - 무료 티어 할당량이 보이면 → 아직 무료 티어
   - 유료 할당량이 보이면 → 유료 플랜 적용됨

## ⏱️ 시간 소요

유료 플랜 전환은 보통 **즉시 적용**되지만, 경우에 따라:
- 최대 **5-10분** 소요될 수 있음
- 환경 변수 업데이트 후 재배포: **1-2분**

## ✅ 성공 확인 방법

유료 플랜이 적용되면:
- 할당량 초과 에러가 사라짐
- 더 많은 요청 가능
- 에러 메시지에 "free_tier"가 보이지 않음

## 🆘 여전히 문제가 있을 때

1. **Google Cloud 지원팀 문의**
   - [Google Cloud 지원](https://cloud.google.com/support)

2. **API 키 재생성**
   - 기존 키 삭제 후 새로 생성

3. **프로젝트 재생성**
   - 새 프로젝트 생성 → 결제 연결 → API 활성화 → 새 키 생성

---

## 📞 확인 요청

다음을 확인해주세요:
1. Google Cloud Console에서 결제 계정이 연결되어 있나요?
2. Generative Language API가 활성화되어 있나요?
3. Vercel 환경 변수가 업데이트되었나요?
4. 재배포가 완료되었나요?

각 단계를 확인하면서 알려주시면 더 구체적으로 도와드릴 수 있습니다!

