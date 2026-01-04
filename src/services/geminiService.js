import { GoogleGenAI } from "@google/genai";

// Vercel에 등록하신 VITE_GEMINI_API_KEY를 불러옵니다.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    /**
     * [중요] 404 에러 방지를 위해 
     * 'models/' 접두사를 붙인 정식 명칭을 사용합니다.
     */
    const modelName = "models/gemini-1.5-flash"; 
    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드 이미지를 분석해서 아래 JSON 형식으로만 답해줘. { "name": "이름", "hp": 숫자, "type": "fire/water/grass/electric", "rarity": 1~5, "description": "7세용 설명", "powerLevel": 1~100, "strongAgainst": "강점", "weakAgainst": "약점", "nickname": "별명" }`;

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
    
    if (!jsonMatch) throw new Error("분석 데이터를 읽을 수 없습니다.");
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("실제 에러 내용:", error);
    // 에러 발생 시 사용자에게 팝업으로 상세 내용을 보여줍니다.
    alert("분석 중 오류 발생: " + error.message);
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