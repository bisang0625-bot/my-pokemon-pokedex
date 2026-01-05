import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeCard(imageBlob) {
  try {
    // gemini-1.5-flash는 무료 티어에서 더 높은 할당량을 제공합니다 (하루 1500개 요청).
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const base64Data = await blobToBase64(imageBlob);

    const prompt = `이 포켓몬 카드를 분석해서 아래 JSON 형식으로만 답해줘. 
중요: 모든 값(value)을 반드시 한국어로 작성하고, 영어를 절대 사용하지 마세요.
타입은 "불꽃", "물", "풀", "전기" 중 하나로 한국어로 답하세요.
강점/약점도 한국어 타입 이름으로 작성하세요 (예: "불꽃", "물" 등).

{ "name": "포켓몬 이름 (한국어)", "hp": 숫자, "type": "불꽃 또는 물 또는 풀 또는 전기", "rarity": 1~5 사이 숫자, "description": "한국어 설명", "powerLevel": 1~100 사이 숫자, "strongAgainst": "한국어 타입 이름", "weakAgainst": "한국어 타입 이름", "nickname": "한국어 별명" }`;

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