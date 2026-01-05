import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getRealCardPrice(card) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `포켓몬 카드 시세 정보를 제공해주세요. 카드 정보: 이름 ${card.name}, HP ${card.hp}, 타입 ${card.type}, 희귀도 ${card.rarity}성. 다음 JSON으로만 답해줘: { "estimated": 숫자, "min": 숫자, "max": 숫자, "source": "출처", "note": "메모" } 반드시 한국 원화(KRW) 기준으로 작성하세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("시세 정보를 읽을 수 없습니다.");

    const priceData = JSON.parse(jsonMatch[0]);

    return {
      estimated: parseInt(priceData.estimated) || 0,
      min: parseInt(priceData.min) || 0,
      max: parseInt(priceData.max) || 0,
      source: priceData.source || 'AI 추정',
      note: priceData.note || '',
      currency: 'KRW',
      lastUpdated: new Date().toISOString(),
      isRealPrice: true
    };
  } catch (error) {
    console.error("시세 조회 오류:", error);
    return {
      ...estimateCardPrice(card),
      isRealPrice: false,
      error: error.message
    };
  }
}

// 기존 estimateCardPrice, calculateTotalValue, formatPrice 함수는 그대로 유지
export function estimateCardPrice(card) {
  const basePrices = { 1: 500, 2: 2000, 3: 5000, 4: 15000, 5: 50000 };
  let basePrice = basePrices[card.rarity] || basePrices[1];
  const hpMultiplier = 1 + (card.hp || 0) / 500;
  const powerMultiplier = 1 + ((card.powerLevel || 50) / 200);
  const estimatedPrice = Math.round(basePrice * hpMultiplier * powerMultiplier);
  return {
    estimated: estimatedPrice, min: Math.round(estimatedPrice * 0.7), max: Math.round(estimatedPrice * 1.5),
    currency: 'KRW', lastUpdated: new Date().toISOString()
  };
}

export function calculateTotalValue(cards) {
  if (!cards || cards.length === 0) return { totalMin: 0, totalMax: 0, totalEstimated: 0, cardCount: 0, averagePrice: 0 };
  const prices = cards.map(card => estimateCardPrice(card));
  const totalMin = prices.reduce((sum, price) => sum + price.min, 0);
  const totalMax = prices.reduce((sum, price) => sum + price.max, 0);
  const totalEstimated = prices.reduce((sum, price) => sum + price.estimated, 0);
  return { totalMin, totalMax, totalEstimated, cardCount: cards.length, averagePrice: Math.round(totalEstimated / cards.length) || 0 };
}

export function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(price);
}