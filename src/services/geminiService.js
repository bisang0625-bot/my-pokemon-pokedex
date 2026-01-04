import { GoogleGenAI } from "@google/genai";

// Vercel 환경변수에서 키를 가져옵니다.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 새 SDK 방식으로 초기화
const client = new GoogleGenAI({ apiKey: API_KEY });

export async function analyzeCard(imageBlob) {
  try {
    // [최신 정보 반영] 1.5 대신 현재 가장 안정적인 2.0 Flash 모델을 사용합니다.
    const modelName = "gemini-2.0-flash"; 

    // 이미지를 Base64로 변환
    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드 이미지를 분석해서 JSON으로만 답해줘. { "name": "이름", "hp": 숫자, "type": "fire/water/grass/electric 중 하나", "rarity": 1~5, "description": "아이용 설명", "powerLevel": 1~100, "strongAgainst": "상성강점", "weakAgainst": "상성약점", "nickname": "별명" }`;

    // 새 SDK의 콘텐츠 생성 문법
    const response = await client.models.generateContent({
      model: modelName,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { inlineData: { data: base64Data, mimeType: imageBlob.type } }
          ]
        }
      ]
    });

    const text = response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("분석 실패");
    
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("분석 중 오류 발생:", error);
    throw new Error("카드 분석 중 오류가 발생했습니다.");
  }
}

// 이미지 변환 도우미 함수
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(blob);
  });
}