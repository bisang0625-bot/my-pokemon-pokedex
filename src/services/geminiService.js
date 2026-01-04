import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    /**
     * [404 에러 해결] 
     * 일반적인 'gemini-1.5-flash' 대신 더 구체적인 모델명을 사용합니다.
     * 'gemini-1.5-flash-8b'는 가볍고 빠르며 무료 할당량이 넉넉하여 포켓몬 카드 분석에 최적입니다.
     */
    const modelName = "gemini-1.5-flash-8b"; 
    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드 이미지를 분석해서 아래 JSON 형식으로만 답해줘. { "name": "이름", "hp": 숫자, "type": "fire/water/grass/electric", "rarity": 1~5, "description": "아이용 설명", "powerLevel": 1~100, "strongAgainst": "강점", "weakAgainst": "약점", "nickname": "별명" }`;

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

    const responseText = response.text ? response.text() : response.response.text();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error("JSON 데이터를 찾을 수 없습니다.");
    
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("상세 에러:", error);
    alert("분석 오류(404 대처): " + error.message);
    throw error;
  }
}

function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(blob);
  });
}