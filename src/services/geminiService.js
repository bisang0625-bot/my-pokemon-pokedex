import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * [보안 업데이트] 
 * 실제 키 대신 시스템 이름표(환경 변수)를 사용합니다.
 * Vercel Settings -> Environment Variables에 VITE_GEMINI_API_KEY가 등록되어 있어야 합니다.
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeCard(imageBlob) {
  try {
    /**
     * [모델 변경] 
     * gemini-2.5-flash는 무료 할당량이 하루 20회로 매우 적습니다.
     * gemini-1.5-flash는 하루 1,500회까지 무료로 사용 가능하여 아이와 놀기에 최적입니다.
     */
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
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
    
    // 데이터 검증 및 정규화
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
    
    // 할당량 초과(429) 에러 시 사용자 친화적인 메시지 출력
    if (error.message.includes('429')) {
        throw new Error("오늘 사용할 수 있는 분석 횟수가 끝났습니다. 내일 다시 시도해주세요!");
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