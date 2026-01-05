# Gemini API 키 무료 발급 및 설정 가이드

포켓몬 카드 스캔 및 시세 조회 기능을 사용하기 위해서는 **Google Gemini API 키**가 필요합니다.
Google AI Studio에서 무료로 키를 발급받을 수 있습니다.

## 1. API 키 발급 받기

1.  **Google AI Studio 방문**:
    아래 링크를 클릭하여 Google AI Studio의 API 키 페이지로 이동합니다.
    👉 [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2.  **로그인**:
    Google 계정으로 로그인합니다.

3.  **API 키 생성**:
    -   **"Create API key"** 버튼을 클릭합니다.
    -   **"Create API key in new project"** (새 프로젝트에서 API 키 생성)를 선택합니다.
    -   잠시 기다리면 `AIza`로 시작하는 긴 문자열의 API 키가 생성됩니다.

4.  **키 복사**:
    -   생성된 키 옆의 **"Copy"** 버튼을 눌러 복사해둡니다.
    -   ⚠️ **주의**: 이 키는 타인에게 노출되지 않도록 조심하세요.

## 2. 프로젝트에 설정하기

1.  프로젝트 최상위 폴더에 있는 `.env` 파일을 엽니다. (없다면 새로 만드세요)

2.  아래와 같이 `VITE_GEMINI_API_KEY` 항목에 복사한 키를 붙여넣습니다.

    ```env
    VITE_GEMINI_API_KEY=AIzaSy... (여기에 복사한 키 붙여넣기)
    ```

3.  파일을 저장합니다.

## 3. 적용 확인

환경 변수 변경 사항을 적용하기 위해 **반드시 개발 서버를 재시작**해야 합니다.

1.  터미널에서 `Ctrl + C`를 눌러 서버를 끕니다.
2.  다시 시작합니다:
    ```bash
    npm run dev
    ```

이제 "카드 스캔" 메뉴에서 카메라 촬영이나 이미지 업로드를 해보세요. AI가 카드를 분석해준다면 성공입니다! 🎉
