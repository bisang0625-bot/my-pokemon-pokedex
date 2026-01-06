# 설치 및 설정 가이드

앱스토어 등록을 위한 필수 패키지 설치 및 설정 방법입니다.

## 1. Capacitor 설치

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios @capacitor/app @capacitor/camera @capacitor/splash-screen @capacitor/status-bar
```

## 2. Capacitor 초기화

이미 `capacitor.config.ts` 파일이 생성되어 있습니다. 필요시 수정하세요.

## 3. 플랫폼 추가

### Android
```bash
npx cap add android
npx cap sync android
```

### iOS (macOS만 가능)
```bash
npx cap add ios
npx cap sync ios
```

## 4. 웹 빌드 및 동기화

```bash
npm run build
npx cap sync
```

## 5. 네이티브 프로젝트 열기

### Android
```bash
npx cap open android
```
또는
```bash
npm run cap:open:android
```

### iOS
```bash
npx cap open ios
```
또는
```bash
npm run cap:open:ios
```

## 6. 아이콘 및 스플래시 스크린 준비

### 필요한 이미지:
- **앱 아이콘**: 
  - 1024x1024px (iOS/Android 공통)
  - 192x192px (PWA용)
  - 512x512px (PWA용)
  
- **스플래시 스크린**:
  - iOS: 1284x2778px (iPhone Pro Max)
  - Android: 1080x1920px

### 위치:
- Android: `android/app/src/main/res/mipmap-*/ic_launcher.png`
- iOS: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- PWA: `public/icon-192.png`, `public/icon-512.png`

## 7. 권한 설정 확인

### Android
`android/app/src/main/AndroidManifest.xml` 파일에 다음 권한이 포함되어 있는지 확인:
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### iOS
`ios/App/App/Info.plist` 파일에 다음이 포함되어 있는지 확인:
```xml
<key>NSCameraUsageDescription</key>
<string>포켓몬 카드를 스캔하기 위해 카메라 권한이 필요합니다.</string>
```

## 8. 빌드 및 테스트

### Android APK 빌드 (테스트용)
```bash
cd android
./gradlew assembleDebug
```

### Android AAB 빌드 (스토어 제출용)
```bash
cd android
./gradlew bundleRelease
```

### iOS 빌드
Xcode에서 직접 빌드하거나:
```bash
cd ios
xcodebuild -workspace App.xcworkspace -scheme App -configuration Release
```

## 9. 환경 변수 설정

`.env` 파일이 있는지 확인하고, 프로덕션 환경에서는 환경 변수를 안전하게 관리하세요.

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

## 다음 단계

이제 [APP_STORE_SUBMISSION_GUIDE.md](./APP_STORE_SUBMISSION_GUIDE.md)를 참고하여 각 스토어에 등록하세요!

