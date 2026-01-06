# GitHub를 통한 Vercel 재배포 가이드

## 현재 상태

✅ **GitHub 저장소 연결됨**: `https://github.com/bisang0625-bot/my-pokemon-pokedex.git`  
✅ **Git 저장소 초기화됨**  
⚠️ **변경사항 커밋 필요**

## 🚀 재배포 방법

### 1단계: 변경사항 확인
```bash
git status
```

### 2단계: 변경사항 추가
```bash
# 모든 변경사항 추가
git add .

# 또는 특정 파일만 추가
git add capacitor.config.json
git add src/
git add public/
```

### 3단계: 커밋
```bash
git commit -m "앱 이름 변경: 포켓 카드 헌터: 몬스터 키우기로 업데이트 및 재배포 준비"
```

### 4단계: GitHub에 푸시
```bash
git push origin main
```

## 🔄 Vercel 자동 배포

Vercel이 GitHub 저장소와 연결되어 있다면:
- `git push` 후 자동으로 재배포가 시작됩니다
- Vercel 대시보드에서 배포 상태를 확인할 수 있습니다

## 📋 주요 변경사항

다음 파일들이 변경/추가되었습니다:

### 변경된 파일
- 앱 이름 관련 파일들
- Capacitor 설정 파일
- 레이아웃 컴포넌트
- 문서 파일들

### 새로 추가된 파일
- `capacitor.config.json` / `capacitor.config.cjs`
- `APP_STORE_SUBMISSION_GUIDE.md`
- `REVENUE_GUIDE.md`
- `NEXT_STEPS.md`
- `DEPLOYMENT_CHECKLIST.md`
- `VERCEL_DEPLOYMENT.md`
- `src/pages/PrivacyPolicy.jsx`
- `src/pages/TermsOfService.jsx`
- `.vercelignore`

## ⚙️ Vercel 설정 확인

Vercel이 GitHub와 연결되어 있지 않다면:

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. "Add New Project" 클릭
3. GitHub 저장소 선택: `bisang0625-bot/my-pokemon-pokedex`
4. 프로젝트 설정 확인:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. "Deploy" 클릭

연결 후에는 `git push`만으로 자동 배포됩니다.

## 📝 커밋 메시지 예시

```bash
git commit -m "feat: 앱 이름 변경 및 앱스토어 등록 준비

- 앱 이름을 '포켓 카드 헌터: 몬스터 키우기'로 변경
- Capacitor 설정 추가 (네이티브 앱 빌드 준비)
- 개인정보 처리방침 및 이용약관 페이지 추가
- PWA 설정 완료
- 앱스토어 등록 가이드 문서 추가"
```

## 🔍 배포 확인

푸시 후:
1. Vercel 대시보드에서 배포 상태 확인
2. 배포 완료 후 새 URL 확인
3. 앱이 정상 작동하는지 테스트

## ⚠️ 주의사항

다음 파일/폴더는 커밋하지 않도록 `.gitignore`에 포함되어 있습니다:
- `node_modules/`
- `dist/`
- `.env`
- `android/` (Capacitor 빌드 파일)
- `ios/` (Capacitor 빌드 파일)

---

**준비 완료!** 위 명령어를 실행하면 GitHub에 푸시되고, Vercel이 자동으로 재배포합니다.

