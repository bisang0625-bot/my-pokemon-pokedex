import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * [보안 업데이트] 
 * 실제 키(AIza...) 대신 시스템 이름표(환경 변수)를 사용합니다.
 * 실제 키값은 프로젝트 최상위 폴더의 .env 파일에 보관하세요.
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

// API 키가 없을 경우를 대비한 안전 장치
if (!API_KEY) {
  console.warn("경고: .env 파일에 VITE_GEMINI_API_KEY가 설정되지 않았습니다.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeCard(imageBlob) {
  try {
    // 2026년 표준인 2.5 Flash 모델 사용
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });

    const imagePart = await fileToGenerativePart(imageBlob);

    const prompt = `
      이 포켓몬 카드 이미지를 분석해서 아래 JSON 형식으로만 답해줘.
      다른 말은 하지 말고 반드시 JSON만 출력해.
      {
        "name": "포켓몬 이름",
        "hp": 숫자,
        "type": "fire, water, grass, electric 중 하나",
        "rarity": 1~5 숫자,
        "description": "7세 아이용 짧고 친절한 설명",
        "powerLevel": 1~100 사이의 숫자 (능력치),
        "strongAgainst": "이 카드가 이기기 쉬운 타입 (fire, water, grass, electric 중 하나)",
        "weakAgainst": "이 카드가 조심해야 할 타입 (fire, water, grass, electric 중 하나)",
        "nickname": "아이들이 좋아할만한 5자 이내의 멋진 별명"
      }
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // 마크다운 등을 제거하고 순수 JSON 추출
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("분석 결과를 읽을 수 없습니다.");
    
    const resultData = JSON.parse(jsonMatch[0]);
    
    // 데이터 검증 및 정규화 (아이들이 보기 편하도록 데이터 정리)
    const normalizedResult = {
      name: resultData.name || '알 수 없는 포켓몬',
      hp: typeof resultData.hp === 'number' ? resultData.hp : parseInt(resultData.hp) || 0,
      type: ['fire', 'water', 'grass', 'electric'].includes(resultData.type) 
        ? resultData.type 
        : 'fire',
      rarity: Math.max(1, Math.min(5, parseInt(resultData.rarity) || 1)),
      description: resultData.description || '멋진 포켓몬이야!',
      powerLevel: Math.max(1, Math.min(100, parseInt(resultData.powerLevel) || 50)),
      strongAgainst: resultData.strongAgainst || 'grass',
      weakAgainst: resultData.weakAgainst || 'water',
      nickname: resultData.nickname || '멋쟁이'
    };
    
    return normalizedResult;

  } catch (error) {
    console.error("Gemini 에러 상세:", error);
    
    if (error.message.includes('404')) {
        throw new Error("라이브러리 업데이트가 필요합니다. 터미널에 'npm install @google/generative-ai@latest'를 입력해주세요.");
    }
    
    throw new Error("카드 분석 중 오류: " + error.message);
  }
}

async function fileToGenerativePart(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: blob.type,
        },
      });
    };
    reader.readAsDataURL(blob);
  });
}