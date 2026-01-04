# 포켓몬 카드 스캐너

아이들을 위한 포켓몬 카드 스캔 웹 애플리케이션입니다.

## 기능

- 📷 **카메라 스캔**: 포켓몬 카드를 촬영하고 분석
- 📚 **도감 리스트**: 수집한 카드들을 모아서 보기
- 👨‍👩‍👧 **부모 모드**: API 키 설정 및 통계 확인

## 기술 스택

- **Vite**: 빠른 개발 서버 및 빌드 도구
- **React**: UI 라이브러리
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **React Router**: 클라이언트 사이드 라우팅
- **Gemini API**: Google의 AI 모델을 사용한 카드 분석

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. Gemini API 키 설정

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키를 발급받으세요
2. 프로젝트 최상위 폴더에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
   ```
   VITE_GEMINI_API_KEY=여기에_발급받은_API_키를_입력하세요
   ```
3. 개발 서버를 재시작하세요 (환경 변수 변경 시 필요)

### 4. 카드 스캔하기

1. "스캔" 메뉴로 이동
2. "스캔하기" 버튼 클릭 (카메라 권한 허용)
3. 포켓몬 카드를 카메라에 비추고 "촬영" 버튼 클릭
4. "카드 분석하기" 버튼으로 분석 시작
5. 분석 중에는 "피카츄가 열심히 찾는 중..." 메시지가 표시됩니다
6. 분석 결과가 표시되면 자동으로 도감에 저장됩니다

## 프로젝트 구조

```
PKM/
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   └── Layout.jsx   # 네비게이션 레이아웃
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── CameraScan.jsx    # 카메라 스캔 페이지
│   │   ├── Pokedex.jsx       # 도감 리스트 페이지
│   │   └── ParentMode.jsx    # 부모 모드 페이지
│   ├── services/        # 외부 API 서비스
│   │   └── geminiService.js  # Gemini API 연동
│   ├── utils/           # 유틸리티 함수
│   │   └── pokedexUtils.js   # 도감 관련 유틸리티
│   ├── App.jsx          # 메인 앱 컴포넌트
│   ├── main.jsx         # 진입점
│   └── index.css        # 전역 스타일
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 주의사항

- 카메라 접근 권한이 필요합니다
- Gemini API 키는 `.env` 파일에 저장됩니다 (`.env` 파일은 Git에 커밋하지 마세요)
- 모든 카드 데이터는 브라우저의 localStorage에 저장됩니다
- 분석 결과는 다음 정보를 포함합니다:
  - 이름 (name)
  - HP (hp: 숫자, 하트 아이콘으로 표시)
  - 타입 (type: fire, water, grass, electric)
  - 희귀도 (rarity: 1~5, 별 아이콘으로 표시)
  - 아이용 설명 (description: 7세 아이 말투로 20자 이내)

