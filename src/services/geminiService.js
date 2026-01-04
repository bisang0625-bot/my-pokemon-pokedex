import { GoogleGenAI } from "@google/genai";

// Vercel 환경 변수에서 API 키를 가져옵니다.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    /**
     * [최종 결정] 
     * gemini-2.0-flash는 현재 무료 한도가 0회(limit: 0)로 막혀 있습니다.
     * gemini-1.5-flash는 일일 1,500회까지 무료 사용이 가능하므로 이 모델을 사용합니다.
     */
    const modelName = "gemini-1.5-flash"; 
    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드 이미지를 분석해서 아래 JSON 형식으로만 답해줘.
    { 
      "name": "이름", 
      "hp": 숫자, 
      "type": "fire/water/grass/electric 중 하나", 
      "rarity": 1~5 숫자, 
      "description": "7세 아이용 짧고 친절한 설명", 
      "powerLevel": 1~100 사이의 숫자, 
      "strongAgainst": "강점 타입", 
      "weakAgainst": "약점 타입", 
      "nickname": "멋진 별명" 
    }`;

    // 새 SDK(@google/genai)의 호출 방식입니다.
    const response = await client.models.generateContent({
      model: modelName,
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { data: base64Data, mimeType: imageBlob.type } }
        ]
      }]
    });

    // 응답 객체 구조에 맞춰 텍스트 추출
    const text = response.text ? response.text() : response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error("분석 결과를 읽을 수 없습니다.");
    
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("실제 에러 내용:", error);
    
    // 할당량 부족(429) 시 더 친절한 안내를 띄웁니다.
    if (error.message.includes("429") || error.message.includes("quota")) {
      alert("구글 서비스 사용량이 초과되었습니다. 잠시 후 다시 시도하거나 내일 이용해 주세요.");
    } else {
      alert("분석 중 오류가 발생했습니다: " + error.message);
    }
    throw error;
  }
}

/**
 * 이미지를 API가 이해할 수 있는 Base64 문자열로 변환합니다.
 */
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(blob);
  });
}