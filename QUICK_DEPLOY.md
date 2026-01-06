# 빠른 재배포 가이드

## 🚀 한 번에 재배포하기

터미널에서 다음 명령어들을 순서대로 실행하세요:

```bash
# 1. 모든 변경사항 추가
git add .

# 2. 커밋 (앱 이름 변경 및 재배포 준비)
git commit -m "feat: 앱 이름 변경 및 앱스토어 등록 준비

- 앱 이름을 '포켓 카드 헌터: 몬스터 키우기'로 변경
- Capacitor 설정 추가 (네이티브 앱 빌드 준비)
- 개인정보 처리방침 및 이용약관 페이지 추가
- PWA 설정 완료
- 앱스토어 등록 가이드 문서 추가"

# 3. GitHub에 푸시 (자동 재배포)
git push origin main
```

## ✅ 완료!

푸시 후:
1. GitHub에 코드가 업로드됩니다
2. Vercel이 자동으로 배포를 시작합니다 (연결되어 있다면)
3. 몇 분 후 새 버전이 배포됩니다

## 🔍 배포 확인

1. GitHub 저장소 확인: https://github.com/bisang0625-bot/my-pokemon-pokedex
2. Vercel 대시보드 확인: https://vercel.com/dashboard

## ⚠️ 참고

- Android 폴더는 `.gitignore`에 추가되어 커밋되지 않습니다
- 로컬에서만 사용하고 GitHub에는 올리지 않습니다
- 필요시 나중에 별도로 관리할 수 있습니다

