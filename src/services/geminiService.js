import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    const modelName = "gemini-2.0-flash"; 
    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드를 분석해서 JSON으로 답해줘. { "name": "이름", "hp": 숫자, "type": "fire/water/grass/electric", "rarity": 1~5, "description": "설명", "powerLevel": 1~100, "strongAgainst": "강점", "weakAgainst": "약점", "nickname": "별명" }`;

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

    // 텍스트 추출 방식 확인
    const text = response.text ? response.text() : response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    // 🔍 로그에 안 찍힌다면 여기서 브라우저 알림으로 강제 확인
    console.error("실제 에러 내용:", error);
    alert("구글 API 에러 발생: " + error.message); // 화면에 에러 팝업을 띄웁니다.
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