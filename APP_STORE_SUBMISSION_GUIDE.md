# 앱스토어 등록 및 수익화 가이드

이 문서는 포켓 카드 헌터: 몬스터 키우기 앱을 Google Play, Apple App Store, 원스토어에 등록하고 수익화하기 위한 가이드입니다.

## 📋 목차

1. [사전 준비 사항](#사전-준비-사항)
2. [Capacitor 설정 및 빌드](#capacitor-설정-및-빌드)
3. [Google Play 스토어 등록](#google-play-스토어-등록)
4. [Apple App Store 등록](#apple-app-store-등록)
5. [원스토어 등록](#원스토어-등록)
6. [수익화 전략](#수익화-전략)
7. [심사 통과 팁](#심사-통과-팁)

---

## 사전 준비 사항

### 필수 요구사항

1. **개발자 계정**
   - Google Play Console: $25 (1회성, 평생 유지)
   - Apple Developer Program: $99/년
   - 원스토어 개발자: 무료

2. **앱 정보 준비**
   - 앱 이름: 포켓 카드 헌터: 몬스터 키우기
   - 앱 설명 (한글/영문)
   - 스크린샷 (최소 2개 이상, 최대 8개)
   - 앱 아이콘 (1024x1024px)
   - 카테고리: 게임 / 교육

3. **법적 문서**
   - ✅ 개인정보 처리방침 (`/privacy` 페이지 제공됨)
   - ✅ 이용약관 (`/terms` 페이지 제공됨)
   - ✅ 저작권 고지 (약관에 포함됨)

---

## Capacitor 설정 및 빌드

### 1. Capacitor 설치

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios @capacitor/app @capacitor/camera @capacitor/splash-screen @capacitor/status-bar
```

### 2. Capacitor 초기화

```bash
npx cap init
```

이미 `capacitor.config.ts` 파일이 생성되어 있으므로, 필요시 수정하세요.

### 3. 웹 빌드

```bash
npm run build
```

### 4. 플랫폼 추가

**Android:**
```bash
npx cap add android
npx cap sync android
```

**iOS:**
```bash
npx cap add ios
npx cap sync ios
```

### 5. 네이티브 프로젝트 열기

**Android:**
```bash
npx cap open android
```

**iOS:**
```bash
npx cap open ios
```

---

## Google Play 스토어 등록

### 1. 앱 서명 키 생성

```bash
keytool -genkey -v -keystore pokemon-master-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pokemon-master
```

### 2. Android 빌드 설정

`android/app/build.gradle` 파일을 열고 다음을 확인:

```gradle
android {
    defaultConfig {
        applicationId "com.pokemonmaster.app"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
    
    signingConfigs {
        release {
            storeFile file('../../pokemon-master-release-key.jks')
            storePassword 'YOUR_STORE_PASSWORD'
            keyAlias 'pokemon-master'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

### 3. 권한 설정

`android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

### 4. 앱 빌드

```bash
cd android
./gradlew assembleRelease
```

AAB 파일 생성:
```bash
./gradlew bundleRelease
```

출력 파일: `android/app/build/outputs/bundle/release/app-release.aab`

### 5. Google Play Console 등록 절차

1. **Google Play Console** 접속 (https://play.google.com/console)
2. **앱 만들기** 클릭
3. 앱 정보 입력:
   - 앱 이름: 포켓 카드 헌터: 몬스터 키우기
   - 기본 언어: 한국어
   - 앱 또는 게임: 게임
   - 무료 또는 유료: 무료
   - 정책 준수 확인 체크

4. **앱 액세스 권한 설정**
   - 카메라 권한: 필수
   - 개인정보 처리방침 URL: `https://your-domain.com/privacy`

5. **스토어 등록 정보**
   - 앱 설명 작성
   - 스크린샷 업로드 (최소 2개)
   - 기능 그래픽 (선택)
   - 앱 아이콘 (512x512px)

6. **콘텐츠 등급**
   - PEGI: 3세 이상 (또는 해당 국가 기준)
   - ESRB: Everyone

7. **가격 및 배포**
   - 무료
   - 대상 국가 선택

8. **AAB 파일 업로드**
   - 프로덕션 트랙 선택
   - `app-release.aab` 업로드

9. **심사 제출**

### 6. Google Play 정책 준수 사항

✅ **필수 확인 항목:**
- [ ] 저작권 고지 포함 (이용약관에 포함됨)
- [ ] 개인정보 처리방침 제공
- [ ] 카메라 권한 설명 명확
- [ ] 사용자 대상 연령 (7-10세) 명시
- [ ] 부모 모드로 데이터 삭제 가능

⚠️ **주의사항:**
- 포켓몬 관련 콘텐츠는 "팬 메이드"임을 명확히 표시
- Nintendo/The Pokémon Company와 무관함을 명시

---

## Apple App Store 등록

### 1. iOS 빌드 설정

`ios/App/App.xcodeproj` 파일을 Xcode에서 열고:

- **Bundle Identifier**: `com.pokemonmaster.app`
- **Version**: `1.0.0`
- **Build**: `1`
- **Signing & Capabilities**: 개발자 계정 연결

### 2. 권한 설정

`ios/App/App/Info.plist`에 추가:

```xml
<key>NSCameraUsageDescription</key>
<string>포켓몬 카드를 스캔하기 위해 카메라 권한이 필요합니다.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>스캔한 카드 이미지를 저장하기 위해 사진 라이브러리 권한이 필요합니다.</string>
```

### 3. 앱 빌드

1. Xcode에서 **Product > Archive** 선택
2. Archive 완료 후 **Distribute App** 클릭
3. **App Store Connect** 선택
4. IPA 파일 업로드

### 4. App Store Connect 등록 절차

1. **App Store Connect** 접속 (https://appstoreconnect.apple.com)
2. **내 앱 > +** 클릭하여 새 앱 생성
3. 앱 정보 입력:
   - 이름: 포켓 카드 헌터: 몬스터 키우기
   - 기본 언어: 한국어
   - 번들 ID: `com.pokemonmaster.app`
   - SKU: 고유 식별자 (예: `pokemon-master-001`)

4. **앱 정보** 섹션:
   - 카테고리: 게임 / 교육
   - 연령 등급: 4+

5. **가격 및 이용 가능 여부**:
   - 무료
   - 대상 국가 선택

6. **앱 개인정보 보호**:
   - 데이터 수집 여부: 카메라 데이터 (임시 처리용)
   - 개인정보 처리방침 URL 입력

7. **스토어 제품 페이지**:
   - 앱 설명 작성
   - 키워드 입력
   - 스크린샷 업로드 (6.5", 6.7" iPhone 필수)
   - 앱 미리보기 (선택)

8. **심사 정보**:
   - 연락처 정보
   - 심사 노트 작성 (필요시)

9. **빌드 제출 및 심사 요청**

### 5. Apple App Store 정책 준수 사항

✅ **필수 확인 항목:**
- [ ] 4.2.1: 최소 기능 요구사항 (웹뷰만으로는 거부될 수 있음 - Capacitor 사용으로 해결)
- [ ] 5.2.3: 지적재산권 (저작권 고지 필수)
- [ ] 1.1.7: 잘못된 기능 (포켓몬 관련 명확한 표시)
- [ ] 2.5.2: 소프트웨어 요구사항 (네이티브 기능 활용)

⚠️ **주의사항:**
- Apple은 웹뷰 앱을 엄격하게 심사
- Capacitor로 네이티브 기능(Camera API) 활용을 명확히 해야 함
- 심사 노트에 Capacitor 사용 및 네이티브 기능 활용을 명시

---

## 원스토어 등록

### 1. 원스토어 개발자 등록

1. **원스토어 개발자 센터** 접속 (https://onestore.dev)
2. 개발자 계정 생성 (무료)

### 2. 앱 등록

1. **앱 등록 > 새 앱 등록**
2. 앱 정보 입력:
   - 앱 이름: 포켓 카드 헌터: 몬스터 키우기
   - 패키지명: `com.pokemonmaster.app`
   - 버전: `1.0.0`

### 3. AAB 파일 업로드

Google Play와 동일한 AAB 파일 사용 가능

### 4. 스토어 정보 입력

- 앱 설명
- 스크린샷
- 앱 아이콘
- 개인정보 처리방침 URL

### 5. 심사 제출

---

## 수익화 전략

### 1. 광고 (AdMob)

#### 설정 방법:

1. **Google AdMob 계정 생성**
   - https://admob.google.com 접속
   - 계정 생성 및 앱 등록

2. **AdMob SDK 설치**

```bash
npm install @capacitor-community/admob
```

3. **광고 배치 위치 추천:**
   - 카드 분석 결과 페이지 하단 (배너 광고)
   - 도감 리스트 페이지 하단 (배너 광고)
   - 부모 모드 (선택적)

⚠️ **주의사항:**
- 7-10세 타겟이므로 광고 콘텐츠 필터링 필수
- COPPA (Children's Online Privacy Protection Act) 준수
- Google Play Kids 카테고리 등록 시 광고 제한

### 2. 인앱 구매

#### 구현 예시:

- 프리미엄 기능 언락 (광고 제거)
- 추가 도감 슬롯
- 특별 테마/배경

#### Google Play Billing:
```bash
npm install @capacitor-community/in-app-purchase
```

#### Apple StoreKit:
- Capacitor In-App Purchase 플러그인 사용

### 3. 프리미엄 버전

- 무료 버전: 기본 기능 + 광고
- 유료 버전: 광고 제거 + 프리미엄 기능

---

## 심사 통과 팁

### 공통 사항

✅ **필수 체크리스트:**
- [ ] 앱이 크래시 없이 정상 작동
- [ ] 모든 권한에 대한 명확한 설명 제공
- [ ] 개인정보 처리방침 및 이용약관 제공
- [ ] 저작권 고지 포함
- [ ] 연령대에 적합한 콘텐츠
- [ ] 부모 모드/데이터 삭제 기능 제공

### Google Play 특화

- [ ] 테스트 계정 제공 (필요시)
- [ ] 권한 사용 목적 명확히 기술
- [ ] 카메라 권한이 실제로 사용됨을 확인

### Apple App Store 특화

- [ ] 심사 노트에 앱의 목적과 기능 명확히 기술
- [ ] Capacitor 사용 및 네이티브 기능 활용 설명
- [ ] 테스트 계정 및 데모 비디오 제공 (선택)
- [ ] Guideline 4.2.1 (최소 기능) 준수 - 웹뷰가 아닌 네이티브 기능 활용 증명

### 저작권 관련 특화

포켓몬 관련 앱이므로:

1. **이용약관에 명확한 고지:**
   - ✅ "본 앱은 공식 포켓몬 앱이 아님"
   - ✅ "The Pokémon Company와 무관"
   - ✅ "팬 메이드 프로젝트"

2. **심사 노트에 추가 설명:**
   ```
   이 앱은 포켓몬 카드 수집을 도와주는 팬 메이드 도구입니다.
   사용자가 직접 보유한 카드를 스캔하여 개인 도감을 만드는 것이 목적입니다.
   공식 포켓몬 앱이 아니며, Nintendo, The Pokémon Company와 무관합니다.
   ```

---

## 추가 리소스

### 아이콘 및 그래픽 준비

- **앱 아이콘**: 1024x1024px (투명 배경 없이)
- **스플래시 스크린**: 1284x2778px (iOS), 1080x1920px (Android)
- **스크린샷**: 
  - iPhone: 6.7", 6.5" 필수
  - Android: 16:9 또는 9:16 비율

### 도메인 및 호스팅

개인정보 처리방침 및 이용약관을 위한 웹사이트 필요:
- Vercel, Netlify 등 무료 호스팅 활용 가능
- HTTPS 필수

---

## 문제 해결

### 일반적인 거부 사유

1. **4.2.1 (Apple): 최소 기능 요구사항**
   - 해결: Capacitor로 네이티브 기능 활용 증명

2. **저작권 문제**
   - 해결: 명확한 고지 및 팬 메이드 표시

3. **개인정보 보호**
   - 해결: 개인정보 처리방침 제공 및 명확한 설명

4. **권한 사용 설명 부족**
   - 해결: 각 권한에 대한 상세한 설명 제공

---

## 다음 단계

1. ✅ Capacitor 설정 완료
2. ✅ PWA 설정 완료
3. ✅ 개인정보 처리방침 페이지 생성
4. ✅ 이용약관 페이지 생성
5. ⏳ 앱 아이콘 및 스플래시 스크린 제작
6. ⏳ 실제 빌드 및 테스트
7. ⏳ 각 스토어에 제출

**질문이나 문제가 있으면 이슈를 등록해주세요!**

