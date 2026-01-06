# 배포 체크리스트

## ✅ 완료된 사항

### 1. 앱 설정
- [x] 앱 이름: "포켓 카드 헌터: 몬스터 키우기"
- [x] 앱 ID: `com.pokemonmaster.app`
- [x] 버전: 1.0 (versionCode: 1, versionName: "1.0")
- [x] 웹 빌드 완료
- [x] Android 프로젝트 동기화 완료

### 2. 기능 확인
- [x] Capacitor 설정 완료
- [x] 카메라 권한 설정 완료
- [x] PWA 설정 완료
- [x] 개인정보 처리방침 페이지
- [x] 이용약관 페이지

### 3. 플랫폼 준비
- [x] Android 플랫폼 추가 완료
- [x] AndroidManifest.xml 권한 설정 완료

## 📦 배포 전 확인사항

### 필수 작업

1. **앱 아이콘 준비**
   - [ ] 1024x1024px 원본 이미지
   - [ ] 각 밀도별 아이콘 생성 (mipmap-*)
   - 위치: `android/app/src/main/res/mipmap-*/`

2. **스크린샷 준비**
   - [ ] 최소 2개 이상의 스크린샷
   - [ ] 다양한 화면 크기 (스마트폰, 태블릿)

3. **개인정보 처리방침 호스팅**
   - [ ] 개인정보 처리방침 URL 준비 (예: `https://your-domain.com/privacy`)
   - [ ] 이용약관 URL 준비 (예: `https://your-domain.com/terms`)

### 빌드 옵션

#### 디버그 빌드 (테스트용)
```bash
cd android
./gradlew assembleDebug
```
출력: `android/app/build/outputs/apk/debug/app-debug.apk`

#### 릴리즈 빌드 (스토어 제출용)

**1. 서명 키 생성** (처음 한 번만)
```bash
keytool -genkey -v -keystore pokemon-master-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias pokemon-master
```

**2. 서명 설정** (`android/app/build.gradle`에 추가)
```gradle
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
```

**3. AAB 빌드**
```bash
cd android
./gradlew bundleRelease
```
출력: `android/app/build/outputs/bundle/release/app-release.aab`

## 🚀 배포 명령어 요약

### 빠른 테스트 빌드
```bash
# 1. 웹 빌드
npm run build

# 2. Android 동기화
npx cap sync android

# 3. 디버그 APK 빌드
cd android && ./gradlew assembleDebug
```

### 스토어 제출용 빌드
```bash
# 1. 웹 빌드
npm run build

# 2. Android 동기화
npx cap sync android

# 3. 릴리즈 AAB 빌드 (서명 설정 후)
cd android && ./gradlew bundleRelease
```

## 📱 배포 플랫폼별 체크리스트

### Google Play Store
- [ ] 개발자 계정 생성 ($25)
- [ ] 앱 등록 정보 작성
- [ ] AAB 파일 업로드
- [ ] 스크린샷 업로드
- [ ] 개인정보 처리방침 URL 입력
- [ ] 콘텐츠 등급 설정
- [ ] 심사 제출

### Apple App Store (iOS)
- [ ] Apple Developer Program 가입 ($99/년)
- [ ] iOS 플랫폼 추가: `npx cap add ios`
- [ ] Xcode에서 빌드 및 Archive
- [ ] App Store Connect에 업로드
- [ ] 심사 제출

### 원스토어
- [ ] 개발자 계정 등록 (무료)
- [ ] 앱 등록 정보 작성
- [ ] AAB 파일 업로드
- [ ] 심사 제출

## ⚠️ 주의사항

1. **서명 키 보안**
   - 키스토어 파일과 비밀번호를 안전하게 보관
   - 분실 시 앱 업데이트 불가능

2. **버전 관리**
   - 업데이트 시 `versionCode`는 반드시 증가
   - `versionName`은 사용자에게 표시되는 버전

3. **저작권 고지**
   - 이용약관에 저작권 고지 포함됨
   - 심사 노트에 "팬 메이드" 명시 필요

4. **개인정보**
   - 모든 데이터는 로컬 저장
   - 개인정보 처리방침 제공 완료

## 🔄 버전 업데이트 방법

새로운 버전 배포 시:

1. `package.json` 버전 업데이트
2. `android/app/build.gradle` 수정:
   ```gradle
   versionCode 2  // 이전보다 큰 숫자
   versionName "1.1"  // 사용자에게 표시
   ```
3. 웹 빌드 및 동기화
4. 새 버전으로 빌드 및 제출

## 현재 배포 상태

**버전**: 1.0.0  
**빌드 상태**: ✅ 완료  
**동기화 상태**: ✅ 완료  
**배포 준비**: ⏳ 아이콘 및 스크린샷 필요

---

마지막 업데이트: $(date)

