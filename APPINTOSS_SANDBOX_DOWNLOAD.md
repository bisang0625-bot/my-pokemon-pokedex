# 앱인토스 샌드박스 앱 다운로드 가이드

## 📱 어떤 파일을 다운로드해야 하나요?

사용 중인 기기 유형에 따라 다운로드할 파일이 다릅니다.

### Android 기기 (스마트폰/태블릿)

**다운로드**: Android 샌드박스 앱 (APK)

- **빌드번호**: 2025-12-16
- **파일 형식**: ZIP (압축 해제 후 APK 파일)
- **다운로드 링크**: [샌드박스 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html)의 Android 섹션에서 다운로드

**설치 방법**:
1. ZIP 파일 다운로드
2. 압축 해제
3. APK 파일 클릭하여 설치
4. "알 수 없는 소스" 허용 (필요시)

---

### iOS 기기 - Mac 시뮬레이터 (Mac에서 테스트)

**다운로드**: iOS 샌드박스 앱 (시뮬레이터용)

- **빌드번호**: 2025-12-07
- **파일 형식**: ZIP
- **다운로드 링크**: [샌드박스 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html)의 iOS 섹션에서 다운로드

**설치 방법**:
1. ZIP 파일 다운로드
2. Xcode 시뮬레이터에서 설치

---

### iOS 기기 - 실기기 (실제 iPhone/iPad)

**다운로드**: iOS 샌드박스 앱 (실기기용)

- **빌드번호**: 2025-11-11
- **파일 형식**: ZIP
- **다운로드 링크**: [샌드박스 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html)의 "iOS(실기기)" 섹션에서 다운로드

**설치 방법**:
1. ZIP 파일 다운로드
2. 개발자 인증서로 설치 필요

---

## 🔗 다운로드 페이지

**[앱인토스 샌드박스 앱 다운로드](https://developers-apps-in-toss.toss.im/development/test/sandbox.html)**

페이지에서 다음 테이블을 확인하세요:

| 구분 | 빌드번호 | 다운로드 링크 |
|------|---------|-------------|
| Android | 2025-12-16 | 페이지에서 다운로드 버튼 클릭 |
| iOS | 2025-12-07 | 페이지에서 다운로드 버튼 클릭 |
| iOS(실기기) | 2025-11-11 | 페이지에서 다운로드 버튼 클릭 |

---

## ✅ OS 버전 요구사항

다운로드 전에 기기 OS 버전을 확인하세요:

| 구분 | 최소 버전 |
|------|---------|
| Android | Android 7 이상 |
| iOS | iOS 16 이상 |

⚠️ **최신 버전 사용 권장**: 샌드박스 앱은 수시로 업데이트되므로 최신 버전을 사용하세요.

---

## 📝 다운로드 및 설치 단계

### 1. 다운로드 페이지 접속

1. [샌드박스 앱 다운로드 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html) 접속
2. 사용 중인 기기 유형 확인

### 2. 파일 다운로드

- **Android**: Android 섹션의 다운로드 링크 클릭
- **iOS 시뮬레이터**: iOS 섹션의 다운로드 링크 클릭
- **iOS 실기기**: iOS(실기기) 섹션의 다운로드 링크 클릭

### 3. 설치

#### Android
1. ZIP 파일 다운로드 완료
2. 압축 해제 (파일 관리자 또는 압축 앱 사용)
3. APK 파일 찾기
4. APK 파일 클릭하여 설치 시작
5. "알 수 없는 소스" 허용 필요 시:
   - 설정 > 보안 > 알 수 없는 소스 허용 활성화
6. 설치 완료 확인

#### iOS (시뮬레이터)
1. ZIP 파일 다운로드 완료
2. 압축 해제
3. Xcode에서 시뮬레이터 실행
4. 앱 파일을 시뮬레이터로 드래그 앤 드롭
5. 설치 완료

#### iOS (실기기)
1. ZIP 파일 다운로드 완료
2. 압축 해제
3. 개발자 인증서 준비
4. Xcode를 통해 기기에 설치
5. 또는 개발자 인증서로 직접 설치

### 4. 설치 확인

- [ ] 샌드박스 앱이 홈 화면에 표시됨
- [ ] 앱 아이콘 확인
- [ ] 앱 실행 시 정상적으로 열림

---

## 🚀 설치 후 다음 단계

1. **샌드박스 앱 실행**
2. **개발자 로그인** (앱인토스 콘솔 계정)
3. **앱 선택** (등록한 앱 선택)
4. **토스 인증** (토스 계정으로 본인 인증)
5. **앱 스킴으로 접속**: `intoss://pocket-card-hunter`

---

## ⚠️ 주의사항

1. **최신 버전 사용**: 샌드박스 앱은 수시로 업데이트됩니다. 오류 발생 시 최신 버전으로 업데이트하세요.

2. **개발자 로그인 필수**: 샌드박스에서 테스트하려면 반드시 개발자 로그인을 먼저 진행해야 합니다.

3. **ATS 정책**: 
   - 샌드박스에서는 HTTP 통신이 허용됩니다
   - 하지만 라이브 환경에서는 HTTPS만 지원되므로, HTTP 기반 기능은 샌드박스에서만 작동합니다

4. **테스트 가능한 기능**:
   - ✅ 토스 로그인
   - ✅ 토스 페이
   - ✅ 인앱 결제
   - ❌ 분석 (불가능)
   - ❌ 공유 리워드 (불가능)
   - ❌ 인앱 광고 (불가능)

---

## 🔗 참고 링크

- [샌드박스 앱 다운로드 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html)
- [앱인토스 개발자센터](https://developers-apps-in-toss.toss.im)
- [샌드박스 사용 가이드](../APPINTOSS_STEP_BY_STEP.md)

---

## 💡 빠른 참조

**Android 사용자**: 
→ [다운로드 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html) → Android 섹션 → 다운로드 → APK 설치

**iOS 사용자 (Mac 시뮬레이터)**: 
→ [다운로드 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html) → iOS 섹션 → 다운로드 → Xcode로 설치

**iOS 사용자 (실기기)**: 
→ [다운로드 페이지](https://developers-apps-in-toss.toss.im/development/test/sandbox.html) → iOS(실기기) 섹션 → 다운로드 → 개발자 인증서로 설치

