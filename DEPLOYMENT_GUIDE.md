# GitHub 및 Vercel 배포 가이드

## GitHub에 코드 푸시하기

로컬에서 코드를 수정한 후, GitHub에 변경사항을 올려야 Vercel이 자동으로 재배포합니다.

```bash
# 변경사항 확인
git status

# 모든 변경사항 추가 (.env는 자동으로 제외됨)
git add .

# 커밋 메시지 작성
git commit -m "Switch to official Gemini SDK and update model to gemini-1.5-pro"

# GitHub에 푸시
git push origin main
```

> **중요**: `.env` 파일은 `.gitignore`에 포함되어 있으므로 GitHub에 업로드되지 않습니다. 이는 보안상 올바른 설정입니다.

## Vercel 환경 변수 설정

GitHub에 코드를 푸시한 후, Vercel 대시보드에서 환경 변수를 설정해야 합니다.

### 1. Vercel 대시보드 접속
1. [Vercel 대시보드](https://vercel.com/dashboard)로 이동
2. 해당 프로젝트 클릭

### 2. 환경 변수 추가/수정
1. **Settings** (설정) 탭 클릭
2. 왼쪽 메뉴에서 **Environment Variables** 선택
3. 기존에 `VITE_GEMINI_API_KEY`가 있다면:
   - 오른쪽 점 3개 메뉴 (⋮) → **Edit** 클릭
   - 새로 발급받은 API 키로 교체
   - **Save** 클릭
4. 없다면:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: 발급받은 API 키 붙여넣기
   - **Environments**: Production, Preview, Development 모두 선택
   - **Add** 클릭

### 3. 재배포
환경 변수를 변경한 후에는 반드시 재배포해야 적용됩니다.

1. **Deployments** 탭으로 이동
2. 가장 최근 배포 항목 찾기
3. 오른쪽 점 3개 메뉴 (⋮) 클릭
4. **Redeploy** 선택
5. 확인 팝업에서 **Redeploy** 클릭

### 4. 배포 완료 확인
- 배포가 진행되면 "Building..." → "Deploying..." → "Ready" 순서로 진행됩니다.
- "Ready" 상태가 되면 배포 URL을 클릭하여 사이트를 확인하세요.
- 카드 스캔 기능을 테스트해보세요!

## 자동 배포
GitHub에 `git push`를 하면 Vercel이 자동으로 새 배포를 시작합니다. 단, 환경 변수는 **Vercel 대시보드에서만** 수정할 수 있으며, GitHub 푸시만으로는 환경 변수가 업데이트되지 않습니다.
