import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeCard(imageBlob) {
  try {
    // gemini-2.5-flash는 2026년 현재 가장 안정적인 모델입니다.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드를 분석해서 아래 JSON으로만 답해줘. { "name": "이름", "hp": 숫자, "type": "fire/water/grass/electric", "rarity": 1~5, "description": "설명", "powerLevel": 1~100, "strongAgainst": "강점", "weakAgainst": "약점", "nickname": "별명" }`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: imageBlob.type,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);

    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("분석 데이터를 찾을 수 없습니다.");
    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("분석 에러 발생:", error);
    alert(`카드 분석 오류: ${error.message}`);
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