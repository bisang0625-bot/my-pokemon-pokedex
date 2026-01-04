import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    /**
     * [404 에러 최종 해결]
     * 2026년 기준, SDK 버전업으로 인해 'gemini-1.5-flash'가 가장 표준입니다.
     * 뒤에 숫자가 붙은 모델은 특정 리전이나 v1beta에서만 작동할 수 있으므로
     * 가장 기본형 이름을 사용하여 SDK가 자동으로 최적의 경로를 찾게 합니다.
     */
    const modelName = "models/gemini-1.5-flash"; 
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

    // SDK 버전에 따라 결과 추출 방식이 다를 수 있어 안전하게 처리합니다.
    const responseText = response.text ? response.text() : 
                         (response.response ? response.response.text() : "");
                         
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("분석 결과를 읽을 수 없습니다.");
    
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("상세 에러 내역:", error);
    // 404 에러 시 사용자에게 더 명확한 가이드를 줍니다.
    if (error.message.includes("404")) {
      alert("서버가 모델을 찾지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } else {
      alert("분석 오류: " + error.message);
    }
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