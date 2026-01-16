# 구글 플레이 콘솔 내부 테스트 업데이트 가이드

이 문서는 카드 저장 공간 최적화 업데이트를 구글 플레이 콘솔의 **내부 테스트 트랙**에 업로드하는 방법을 설명합니다.

## 📋 사전 준비 사항

### 완료된 작업 ✅

1. ✅ 버전 업데이트 완료
   - `versionCode`: 4 → **5**
   - `versionName`: 1.0.3 → **1.0.4**
   - 변경사항: 카드 저장 공간 최적화 (200장 저장 가능)

2. ✅ 웹 빌드 완료
3. ✅ Capacitor 동기화 완료

### 다음 단계

1. **AAB 파일 빌드**
2. **구글 플레이 콘솔에 업로드**

---

## 🔨 AAB 파일 빌드

### 방법 1: Android Studio 사용 (권장)

1. **Android Studio 열기**
   ```bash
   cd android
   # Android Studio에서 android 폴더 열기
   ```

2. **Build > Generate Signed Bundle / APK** 선택
3. **Android App Bundle** 선택
4. **release** 키스토어 선택 및 비밀번호 입력
   - 키스토어 파일: `pkm-key.jks`, `pkm-key-new.jks`, 또는 `pkm-key-two.jks` 중 하나
5. **release** 빌드 타입 선택
6. **Finish** 클릭

출력 파일 위치: `android/app/release/app-release.aab`

### 방법 2: 명령줄 사용

**Java/JDK 확인**
```bash
# Java 버전 확인
java -version

# JAVA_HOME 설정 (필요시)
export JAVA_HOME=$(/usr/libexec/java_home)
```

**AAB 빌드 실행**
```bash
cd android
./gradlew bundleRelease
```

**빌드 성공 시 파일 위치:**
```
android/app/build/outputs/bundle/release/app-release.aab
```

⚠️ **참고**: 서명이 설정되어 있지 않으면 서명되지 않은 AAB가 생성됩니다. Google Play Console에서 자동 서명을 사용하거나, Android Studio에서 서명된 AAB를 생성해야 합니다.

---

## 🚀 구글 플레이 콘솔 업로드

### 1. Google Play Console 접속

1. [Google Play Console](https://play.google.com/console) 접속
2. 업데이트할 앱 선택
3. 왼쪽 메뉴에서 **테스트** 또는 **Testing** 클릭

### 2. 내부 테스트 트랙 선택

1. **내부 테스트** 또는 **Internal testing** 섹션 클릭
2. 기존 내부 테스트 트랙이 있다면 선택, 없다면 **내부 테스트 만들기** 클릭

### 3. 새 버전 업로드

1. **새 출시 만들기** 또는 **Create new release** 버튼 클릭

2. **릴리즈 이름** 입력 (선택사항)
   - 예: `1.0.4 - 카드 저장 공간 최적화`
   - 또는 버전 이름 자동 사용: `1.0.4`

3. **AAB 파일 업로드**
   - **app-release.aab** 파일을 드래그 앤 드롭하거나
   - **찾아보기** 버튼으로 파일 선택

4. **출시 노트 작성**
   ```
   카드 저장 공간 최적화
   - 이미지 압축 강화로 저장 공간 효율 개선
   - 약 50장에서 약 200장까지 저장 가능하도록 개선
   - 이미지 크기: 400x400px, 품질 40%로 최적화
   ```

5. **저장** 클릭

### 4. 출시 검토 및 출시

1. **출시 검토** 버튼 클릭
2. 경고나 오류 메시지 확인 및 수정
3. **출시 시작** 또는 **Start rollout** 버튼 클릭

---

## ✅ 업로드 후 확인 사항

### 내부 테스트 트랙 확인

1. **내부 테스트** 페이지에서 새 버전이 표시되는지 확인
2. **테스터 이메일 목록** 확인
   - 내부 테스트 트랙에 추가된 테스터들이 새 버전을 받을 수 있음

### 테스터에게 알림

내부 테스트 트랙에 등록된 테스터들에게는 자동으로 업데이트 알림이 전송됩니다.

테스터는 다음 방법으로 앱을 설치/업데이트할 수 있습니다:
1. Google Play Store에서 앱 검색
2. 또는 내부 테스트 링크 사용: `https://play.google.com/apps/internaltest/[앱ID]`

---

## 📱 테스트 확인

### 내부 테스터로 설치하는 방법

1. **내부 테스트 링크 받기**
   - Google Play Console > 내부 테스트 > 테스터 그룹 > 링크 복사

2. **테스터가 링크로 접근**
   - 테스터 이메일로 추가된 계정으로 로그인
   - 링크를 통해 Google Play Store에서 앱 설치/업데이트

3. **앱에서 확인**
   - 앱 실행 후 여러 카드를 스캔하여 저장 공간 테스트
   - 약 200장까지 저장되는지 확인

---

## 🔍 문제 해결

### 빌드 오류

**Java를 찾을 수 없는 경우:**
```bash
# Java 경로 확인
/usr/libexec/java_home

# JAVA_HOME 설정
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$JAVA_HOME/bin:$PATH
```

**키스토어 문제:**
- Android Studio에서 **Build > Generate Signed Bundle** 사용
- 또는 `gradle.properties`에 서명 정보 저장 (비추천, 보안상 위험)

### 업로드 오류

**버전 코드 중복:**
- Google Play Console에 이미 같은 `versionCode`가 있으면 오류 발생
- `versionCode`를 더 높은 숫자로 증가 (예: 5 → 6)

**서명 불일치:**
- 기존 앱과 다른 키로 서명된 경우 업로드 불가
- 동일한 키스토어 사용 필요

---

## 📝 체크리스트

### 빌드 전
- [x] 버전 코드 증가 (4 → 5)
- [x] 버전 이름 업데이트 (1.0.3 → 1.0.4)
- [x] 웹 빌드 완료 (`npm run build`)
- [x] Capacitor 동기화 완료 (`npx cap sync android`)

### 빌드
- [ ] AAB 파일 빌드 완료
- [ ] 빌드된 AAB 파일 위치 확인
- [ ] 파일 크기 확인 (예상: 10-30MB)

### 업로드
- [ ] Google Play Console 접속
- [ ] 내부 테스트 트랙 선택
- [ ] 새 출시 만들기
- [ ] AAB 파일 업로드
- [ ] 출시 노트 작성
- [ ] 출시 검토 및 출시

### 테스트
- [ ] 내부 테스터에게 알림
- [ ] 앱 설치/업데이트 확인
- [ ] 카드 저장 기능 테스트
- [ ] 저장 공간 확인 (200장 저장 가능 여부)

---

## 🎯 다음 단계

내부 테스트가 성공적으로 완료되면:

1. **폐쇄 테스트** 트랙으로 확장 (선택사항)
2. **오픈 테스트** 트랙으로 전환 (선택사항)
3. **프로덕션** 출시
   - 프로덕션 트랙으로 같은 AAB 업로드
   - 전체 사용자에게 출시

---

## 📚 관련 문서

- [Google Play Console 가이드](https://support.google.com/googleplay/android-developer)
- [내부 테스트 가이드](https://support.google.com/googleplay/android-developer/answer/9845334)
- [AAB 파일 업로드](https://support.google.com/googleplay/android-developer/answer/9859152)

---

**업데이트 완료! 🎉**

내부 테스트 트랙에 새 버전이 업로드되면 테스터들이 카드 저장 공간 최적화 기능을 테스트할 수 있습니다.
