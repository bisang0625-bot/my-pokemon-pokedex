# 수익화 가이드

포켓 카드 헌터: 몬스터 키우기 앱의 수익화 전략과 구현 방법을 안내합니다.

## 수익화 방법

### 1. 광고 (AdMob) - 추천 ✅

가장 간단하고 빠르게 수익화할 수 있는 방법입니다.

#### 장점
- 즉시 수익 발생 가능
- 사용자 비용 부담 없음
- COPPA 준수 가능 (아동 대상 광고 필터링)

#### 단점
- 사용자 경험에 영향 (광고 노출)
- 수익이 불안정할 수 있음

#### 구현 단계

1. **Google AdMob 계정 생성**
   ```
   https://admob.google.com
   ```

2. **AdMob SDK 설치**
   ```bash
   npm install @capacitor-community/admob
   npx cap sync
   ```

3. **광고 배치 위치**
   - 카드 분석 결과 페이지 하단 (배너)
   - 도감 리스트 페이지 하단 (배너)
   - 앱 시작 시 (선택적, 인터스티셜)

4. **COPPA 준수 설정**
   - AdMob 콘솔에서 "아동 대상 앱" 설정
   - Google Play에서 "아동용 앱" 카테고리 선택 시 자동 필터링

---

### 2. 인앱 구매 (In-App Purchase)

#### 프리미엄 기능 제안

1. **광고 제거 (₩4,900)**
   - 가장 인기 있는 옵션
   - "프리미엄으로 업그레이드" 버튼 제공

2. **추가 저장 공간 (₩2,900)**
   - 무료: 카드 50개 제한
   - 프리미엄: 무제한 저장

3. **프리미엄 테마/배경 (₩1,900)**
   - 특별한 도감 배경
   - 애니메이션 효과

4. **월간 구독 (₩4,900/월)**
   - 모든 프리미엄 기능
   - 새 테마 매월 추가

#### 구현 단계

**Google Play Billing:**
```bash
npm install @capacitor-community/in-app-purchase
```

**Apple StoreKit:**
- 동일 플러그인 사용 (자동으로 플랫폼 감지)

---

### 3. 하이브리드 모델 (추천) ⭐

무료 + 광고 + 프리미엄 업그레이드 조합

#### 구조:
```
무료 버전
├── 기본 기능 (카드 스캔, 도감)
├── 광고 표시 (배너)
└── 프리미엄 업그레이드 유도

프리미엄 버전 (인앱 구매)
├── 모든 기본 기능
├── 광고 제거
├── 무제한 저장
└── 프리미엄 테마
```

#### 수익 구조 예상:
- 광고 수익: 사용자당 월평균 $0.10-0.50
- 프리미엄 전환율: 2-5%
- 프리미엄 가격: ₩4,900 (일회성)

---

## 수익화 구현 예시 코드

### AdMob 설정

```javascript
// src/services/admobService.js
import { AdMob } from '@capacitor-community/admob';
import { Platform } from '@capacitor/core';

// AdMob 초기화
export async function initAdMob() {
  const isPremium = localStorage.getItem('isPremium') === 'true';
  if (isPremium) return; // 프리미엄 사용자는 광고 표시 안 함
  
  await AdMob.initialize({
    requestTrackingAuthorization: true,
    testingDevices: [],
    initializeForTesting: false,
  });
}

// 배너 광고 표시
export async function showBannerAd() {
  const isPremium = localStorage.getItem('isPremium') === 'true';
  if (isPremium) return;
  
  const adId = Platform.isIOS 
    ? 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY' // iOS Ad Unit ID
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY'; // Android Ad Unit ID
    
  await AdMob.showBanner({
    adId,
    adSize: 'BANNER',
    position: 'BOTTOM_CENTER',
    margin: 0,
    isTesting: false
  });
}

// 광고 제거
export async function hideBannerAd() {
  await AdMob.hideBanner();
}
```

### 인앱 구매 설정

```javascript
// src/services/purchaseService.js
import { Purchase } from '@capacitor-community/in-app-purchase';

// 제품 정보
export const PRODUCTS = {
  PREMIUM: 'premium_upgrade',
  STORAGE: 'extra_storage',
  THEME: 'premium_theme'
};

// 프리미엄 상태 확인
export function isPremium() {
  return localStorage.getItem('isPremium') === 'true';
}

// 구매 처리
export async function purchaseProduct(productId) {
  try {
    await Purchase.restorePurchases(); // 기존 구매 복원
    
    const product = await Purchase.purchase({ productId });
    
    if (productId === PRODUCTS.PREMIUM) {
      localStorage.setItem('isPremium', 'true');
      // 광고 제거 등 프리미엄 기능 활성화
    }
    
    return product;
  } catch (error) {
    console.error('구매 실패:', error);
    throw error;
  }
}
```

---

## 수익 예상

### 보수적 시나리오
- 월 활성 사용자: 1,000명
- 광고 수익: $0.20/사용자/월
- 프리미엄 전환: 2% (20명)
- 프리미엄 수익: 20명 × ₩4,900 = ₩98,000

**월 예상 수익**: $200 (광고) + ₩98,000 ≈ ₩350,000

### 낙관적 시나리오
- 월 활성 사용자: 10,000명
- 광고 수익: $0.30/사용자/월
- 프리미엄 전환: 5% (500명)

**월 예상 수익**: $3,000 (광고) + ₩2,450,000 ≈ ₩6,500,000

---

## 주의사항

### COPPA 준수 (미국 13세 미만)
- Google Play: 아동용 앱 카테고리 선택
- AdMob: 아동 대상 앱 설정 활성화
- 개인정보 수집 최소화

### 각 플랫폼 정책
- **Google Play**: 디지털 상품은 Google Play Billing 필수
- **Apple App Store**: 디지털 상품은 In-App Purchase 필수
- 외부 결제 시스템 사용 금지

### 사용자 경험
- 광고는 적절한 위치에만 배치
- 프리미엄 업그레이드 유도는 적절한 타이밍에
- 강제적인 광고는 사용자 이탈 원인

---

## 다음 단계

1. AdMob 계정 생성 및 앱 등록
2. AdMob SDK 구현
3. 인앱 구매 제품 설정 (Google Play Console / App Store Connect)
4. 구매 플로우 구현
5. A/B 테스트 (광고 위치, 프리미엄 가격)
6. 수익 모니터링 및 최적화

**추천**: 먼저 광고만 구현하여 사용자 반응을 확인한 후, 인앱 구매를 추가하는 것이 좋습니다.

