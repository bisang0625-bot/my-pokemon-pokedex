# 다음 단계 가이드

## ✅ 완료된 작업

1. ✅ Capacitor 패키지 설치
2. ✅ Android 플랫폼 추가
3. ✅ 웹 빌드 및 동기화
4. ✅ AndroidManifest.xml에 카메라 권한 추가
5. ✅ 개인정보 처리방침 및 이용약관 페이지 생성
6. ✅ PWA 설정 완료

## 📋 다음에 해야 할 작업

### 1. 앱 아이콘 및 스플래시 스크린 준비 (필수)

#### 앱 아이콘
- **위치**: `android/app/src/main/res/mipmap-*/ic_launcher.png`
- **필요한 크기**:
  - `mipmap-mdpi`: 48x48px
  - `mipmap-hdpi`: 72x72px
  - `mipmap-xhdpi`: 96x96px
  - `mipmap-xxhdpi`: 144x144px
  - `mipmap-xxxhdpi`: 192x192px
- **원본**: 1024x1024px PNG 파일 준비 후 각 크기로 리사이즈

#### 스플래시 스크린
- Android: `android/app/src/main/res/drawable/splash.xml` (이미 생성됨)
- 배경색: `#ef4444` (포켓몬 빨간색)

**도구 추천**: 
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) - 아이콘 자동 생성
- [App Icon Generator](https://www.appicon.co/) - 모든 플랫폼용 아이콘 생성

### 2. Android Studio에서 프로젝트 열기 및 테스트

```bash
# Android Studio 열기
npx cap open android
```

또는

```bash
# Android Studio 수동 실행 후
# File > Open > android 폴더 선택
```

**테스트 단계**:
1. Android Studio에서 프로젝트 열기
2. 에뮬레이터 또는 실제 기기 연결
3. Run 버튼 클릭하여 앱 실행
4. 카메라 권한 요청 확인
5. 카드 스캔 기능 테스트

### 3. 릴리즈 빌드 준비

#### 서명 키 생성 (처음 한 번만)

```bash
keytool -genkey -v -keystore pokemon-master-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias pokemon-master
```

**중요**: 
- 키스토어 파일과 비밀번호를 안전하게 보관하세요
- 분실 시 앱 업데이트 불가능

#### 서명 설정

`android/app/build.gradle` 파일에 서명 설정 추가:

```gradle
android {
    ...
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

#### AAB 파일 빌드 (스토어 제출용)

```bash
cd android
./gradlew bundleRelease
```

출력 위치: `android/app/build/outputs/bundle/release/app-release.aab`

### 4. Google Play Console 등록

1. **Google Play Console** 접속: https://play.google.com/console
2. **앱 만들기** 클릭
3. 앱 정보 입력:
   - 앱 이름: 포켓 카드 헌터: 몬스터 키우기
   - 기본 언어: 한국어
   - 앱 또는 게임: 게임
   - 무료 또는 유료: 무료
4. **AAB 파일 업로드**
5. **스토어 등록 정보** 입력:
   - 앱 설명
   - 스크린샷 (최소 2개)
   - 앱 아이콘 (512x512px)
6. **개인정보 처리방침 URL** 입력: `https://your-domain.com/privacy`
7. **콘텐츠 등급** 설정: PEGI 3 또는 해당 국가 기준
8. **심사 제출**

자세한 내용은 `APP_STORE_SUBMISSION_GUIDE.md` 참고

### 5. iOS 빌드 (선택사항 - macOS만 가능)

```bash
npx cap add ios
npm run build
npx cap sync ios
npx cap open ios
```

Xcode에서 빌드 및 테스트

## 🔍 확인 사항

### Android 프로젝트 구조 확인

다음 파일들이 존재하는지 확인:
- ✅ `android/build.gradle`
- ✅ `android/app/build.gradle`
- ✅ `android/app/src/main/AndroidManifest.xml`
- ✅ `android/app/src/main/assets/public/` (웹 빌드 파일)

### 권한 확인

`AndroidManifest.xml`에 다음 권한이 포함되어 있는지 확인:
- ✅ `INTERNET`
- ✅ `CAMERA`
- ✅ 카메라 하드웨어 feature 선언

### 버전 정보

`android/app/build.gradle`에서:
- `versionCode`: 1 (업데이트 시마다 증가)
- `versionName`: "1.0" (사용자에게 표시되는 버전)

## 🚀 빠른 테스트

### 로컬에서 빌드 테스트

```bash
cd android
./gradlew assembleDebug
```

APK 파일 위치: `android/app/build/outputs/apk/debug/app-debug.apk`

이 파일을 Android 기기에 직접 설치하여 테스트 가능

## ⚠️ 주의사항

1. **API 키 보안**: 
   - Gemini API 키는 사용자가 부모 모드에서 직접 입력
   - 코드에 하드코딩하지 않음 ✅

2. **저작권**:
   - 이용약관에 저작권 고지 포함됨 ✅
   - 심사 노트에 "팬 메이드" 명시 필요

3. **개인정보**:
   - 모든 데이터는 로컬 저장 (localStorage)
   - 개인정보 처리방침 제공됨 ✅

## 📚 참고 문서

- `APP_STORE_SUBMISSION_GUIDE.md` - 상세한 등록 가이드
- `REVENUE_GUIDE.md` - 수익화 전략
- `INSTALL_INSTRUCTIONS.md` - 설치 및 설정 방법

## 🆘 문제 해결

### 빌드 오류 발생 시

1. **Gradle 동기화**: Android Studio에서 File > Sync Project with Gradle Files
2. **캐시 정리**: `cd android && ./gradlew clean`
3. **의존성 재설치**: `npm install` 후 `npx cap sync android`

### 권한 오류

- AndroidManifest.xml에 권한이 추가되어 있는지 확인
- 앱 실행 후 설정에서 권한이 허용되었는지 확인

---

**다음 단계**: 앱 아이콘을 준비하고 Android Studio에서 테스트해보세요!

