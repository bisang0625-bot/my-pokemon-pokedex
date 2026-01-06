import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeCard(imageBlob) {
  try {
    // gemini-flash-latest 모델을 사용합니다. (가장 안정적인 최신 버전 별칭 사용)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const base64Data = await blobToBase64(imageBlob);

    // 1단계: 포켓몬 카드인지 먼저 확인
    const validationPrompt = `이미지를 확인하고 이것이 포켓몬 트레이딩 카드 게임(Pokemon TCG)의 공식 포켓몬 카드인지 판단해주세요.

포켓몬 카드의 특징:
- Pokemon Company 또는 Pokemon International의 로고나 브랜딩
- 포켓몬 캐릭터 (피카추, 파이리, 꼬부기 등)
- HP(체력) 숫자 표시
- 타입 아이콘 (불꽃, 물, 풀, 전기 등)
- 카드 게임의 특징적인 레이아웃과 디자인

포켓몬 카드가 아닌 경우:
- 일반 사진, 그림, 만화책 페이지
- 다른 TCG 카드 (유희왕, 매직 더 게더링 등)
- 포켓몬 관련 상품이나 장난감의 사진
- 포켓몬이 그려진 일러스트나 팬아트

아래 JSON 형식으로만 답해주세요 (반드시 유효한 JSON만 반환):
{
  "isPokemonCard": true 또는 false,
  "reason": "포켓몬 카드인 이유 또는 아닌 이유 (한국어로 간단히 설명)"
}`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: imageBlob.type,
      },
    };

    // 1단계: 카드 검증
    const validationResult = await model.generateContent([validationPrompt, imagePart]);
    const validationResponse = validationResult.response;
    const validationText = validationResponse.text();
    const validationJsonMatch = validationText.match(/\{[\s\S]*\}/);

    if (!validationJsonMatch) {
      throw new Error("카드 검증 데이터를 찾을 수 없습니다.");
    }

    const validation = JSON.parse(validationJsonMatch[0]);

    // 포켓몬 카드가 아니면 에러 발생
    if (!validation.isPokemonCard) {
      const reason = validation.reason || "포켓몬 카드가 아닙니다.";
      throw new Error(`포켓몬 카드를 스캔해주세요. ${reason}`);
    }

    // 비공식/위조 카드 여부 저장 (내부적으로만 사용, UI에는 표시 안 함)
    const isOfficial = validation.isOfficial !== false; // 기본값은 true

    // 2단계: 포켓몬 카드 상세 분석
    const analysisPrompt = `이 포켓몬 카드를 자세히 분석해서 아래 JSON 형식으로만 답해줘.

중요 규칙:
1. 모든 값(value)을 반드시 한국어로 작성하고, 영어를 절대 사용하지 마세요.
2. 타입은 "불꽃", "물", "풀", "전기", "에스퍼", "얼음", "드래곤", "악", "페어리", "노말", "격투" 중 하나로 한국어로 답하세요.
3. 강점/약점도 한국어 타입 이름으로 작성하세요 (예: "불꽃", "물" 등).
4. 희귀도(rarity)는 카드의 희귀도를 1~5 사이 숫자로 판단하세요 (1=일반, 5=전설).
5. HP는 카드에 표시된 체력 숫자를 정확히 읽어주세요.
6. powerLevel은 카드의 강력함을 1~100 사이 숫자로 평가하세요 (HP, 희귀도, 기술 등을 종합적으로 고려).

반드시 유효한 JSON만 반환하세요 (설명이나 추가 텍스트 없이):
{ 
  "name": "포켓몬 이름 (한국어)", 
  "hp": 숫자, 
  "type": "불꽃 또는 물 또는 풀 또는 전기 등 (한국어)", 
  "rarity": 1~5 사이 숫자, 
  "description": "카드에 대한 간단한 설명 (한국어, 50자 이내)", 
  "powerLevel": 1~100 사이 숫자, 
  "strongAgainst": "강점 타입 (한국어 타입 이름)", 
  "weakAgainst": "약점 타입 (한국어 타입 이름)", 
  "nickname": "카드에 적합한 귀여운 별명 (한국어, 선택사항)" 
}`;

    const analysisResult = await model.generateContent([analysisPrompt, imagePart]);
    const analysisResponse = analysisResult.response;
    const analysisText = analysisResponse.text();
    const analysisJsonMatch = analysisText.match(/\{[\s\S]*\}/);

    if (!analysisJsonMatch) {
      throw new Error("분석 데이터를 찾을 수 없습니다.");
    }

    const result = JSON.parse(analysisJsonMatch[0]);

    // 결과 검증
    if (!result.name || !result.hp || !result.type) {
      throw new Error("카드 분석 정보가 불완전합니다. 포켓몬 카드를 명확하게 스캔해주세요.");
    }

    // 비공식/위조 카드 여부를 결과에 추가 (내부적으로만 사용, UI에는 표시 안 함)
    result._isOfficial = isOfficial; // _ 접두사로 내부 전용임을 표시

    return result;

  } catch (error) {
    console.error("분석 에러 발생:", error);
    // 사용자 친화적인 에러 메시지
    if (error.message.includes("포켓몬 카드")) {
      throw error; // 포켓몬 카드가 아니라는 에러는 그대로 전달
    }
    throw new Error(`카드 분석 오류: ${error.message}`);
  }
}

function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(blob);
  });
}