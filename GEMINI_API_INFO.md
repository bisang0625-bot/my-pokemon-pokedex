# Gemini API 할당량 및 요금 정보

## 현재 상황

현재 앱에서 `gemini-flash-latest` 모델을 사용하고 있으며, 무료 티어 제한으로 인해 일일 20회 요청 제한이 있습니다.

## 무료 티어 할당량

### Gemini API 무료 티어 (Google AI Studio)
- **일일 요청 제한**: 약 20-60회 (모델에 따라 다름)
- **분당 요청 제한**: 약 15회
- **모델**: 
  - `gemini-1.5-flash` (무료, 빠름)
  - `gemini-1.5-pro` (무료, 더 강력하지만 느림)
  - `gemini-flash-latest` (최신 버전 별칭, 무료 티어에서 사용 가능)

### 할당량 증가 방법 (무료)
1. **Google AI Studio**에서 여러 프로젝트 생성 (각 프로젝트마다 할당량)
2. **다른 Google 계정** 사용 (각 계정마다 할당량)
3. **API 키 여러 개** 생성 및 로테이션

## 유료 플랜 요금 (2024년 기준)

### Gemini API 유료 플랜
Google Cloud Console에서 결제 계정을 설정하면 자동으로 유료 플랜으로 전환됩니다.

**예상 비용:**
- `gemini-1.5-flash`: 
  - 입력: $0.075 / 1M 토큰
  - 출력: $0.30 / 1M 토큰
- `gemini-1.5-pro`:
  - 입력: $1.25 / 1M 토큰
  - 출력: $5.00 / 1M 토큰

**카드 분석 예시:**
- 이미지 1장 + 프롬프트 약 500 토큰
- 예상 비용: 약 $0.0001 ~ $0.0005 / 요청 (flash 모델 기준)
- **1000회 요청 시**: 약 $0.10 ~ $0.50

### 무료 크레딧
Google Cloud 신규 가입 시 **$300 크레딧** 제공 (90일 사용 가능)
- 충분히 많은 요청 가능
- 카드 분석 앱에는 충분한 양

## 추천 방안

### 옵션 1: 무료로 계속 사용 (권장)
1. **여러 API 키 생성**
   - Google AI Studio에서 여러 프로젝트 생성
   - 각 프로젝트마다 별도 API 키
   - 코드에서 API 키 로테이션 구현

2. **할당량 관리**
   - 사용자에게 일일 제한 안내
   - 할당량 초과 시 친절한 메시지 표시 (이미 구현됨)

### 옵션 2: Google Cloud 무료 크레딧 활용
1. Google Cloud 계정 생성 ($300 크레딧)
2. 90일간 무료로 충분히 사용 가능
3. 기간 내 유료 전환 시 월 $1~5 정도 예상

### 옵션 3: 유료 플랜 전환
- 매우 저렴한 비용 (요청당 $0.0001 수준)
- 월 수만 건 요청해도 $1~10 수준
- 제한 없는 사용 가능

## 코드 개선 제안

### API 키 로테이션 구현
여러 API 키를 순환 사용하여 할당량 확보:

```javascript
const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY_1,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3,
].filter(Boolean);

let currentKeyIndex = 0;
const genAI = new GoogleGenerativeAI(API_KEYS[0]);
```

### 할당량 모니터링
사용자에게 남은 할당량 표시 및 안내

## 참고 링크
- [Gemini API 가격](https://ai.google.dev/pricing)
- [Google AI Studio](https://aistudio.google.com/)
- [Google Cloud Console](https://console.cloud.google.com/)

