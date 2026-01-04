import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    // 404 에러를 피하기 위해 아까 작동했던 2.0 모델로 이름을 완전히 바꿉니다.
    const modelName = "gemini-2.0-flash"; 
    
    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드를 분석해서 아래 JSON으로만 답해줘. { "name": "이름", "hp": 숫자, "type": "fire/water/grass/electric", "rarity": 1~5, "description": "설명", "powerLevel": 1~100, "strongAgainst": "강점", "weakAgainst": "약점", "nickname": "별명" }`;

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

    const text = response.text ? response.text() : response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error("분석 데이터를 찾을 수 없습니다.");
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("분석 에러 발생:", error);
    // 에러 메시지에 모델 이름을 포함시켜서 실제로 어떤 모델이 호출되는지 확인합니다.
    alert(`[모델: gemini-2.0-flash] 오류 발생: ${error.message}`);
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