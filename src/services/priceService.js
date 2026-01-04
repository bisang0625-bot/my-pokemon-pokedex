/**
 * 카드 시세 서비스
 * 최신 @google/genai SDK를 사용하여 실제 시세를 조회합니다.
 */

import { GoogleGenAI } from "@google/genai";

// [보안] Vercel 환경변수에서 키를 가져오며, 없을 경우에만 임시 키를 사용합니다.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Gemini API를 사용하여 실제 카드 시세 조회
 */
export async function getRealCardPrice(card) {
  try {
    // [최신화] 할당량이 적은 2.5 대신 안정적인 2.0 Flash 모델을 사용합니다.
    const modelName = "gemini-2.0-flash";

    const prompt = `
포켓몬 카드 시세 정보를 제공해주세요.

카드 정보:
- 이름: ${card.name}
- HP: ${card.hp}
- 타입: ${card.type}
- 희귀도: ${card.rarity}성
- 종합 능력: ${card.powerLevel || 50}점

다음 JSON 형식으로만 답해주세요 (다른 설명 금지):
{
  "estimated": 숫자,
  "min": 숫자,
  "max": 숫자,
  "source": "시세 출처",
  "note": "설명"
}

주의: 한국 원화(KRW) 기준으로 작성하세요.
`;

    // [최신화] 신규 SDK 문법으로 변경
    const response = await client.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const text = response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("시세 정보를 읽을 수 없습니다.");
    }
    
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

/**
 * 카드 정보를 기반으로 추정 가격 계산 (API 장애 대비용)
 */
export function estimateCardPrice(card) {
  const basePrices = { 1: 500, 2: 2000, 3: 5000, 4: 15000, 5: 50000 };
  let basePrice = basePrices[card.rarity] || basePrices[1];
  const hpMultiplier = 1 + (card.hp || 0) / 500;
  const powerMultiplier = 1 + ((card.powerLevel || 50) / 200);
  const typeMultipliers = { fire: 1.2, water: 1.1, grass: 1.0, electric: 1.3 };
  const typeMultiplier = typeMultipliers[card.type] || 1.0;

  const estimatedPrice = Math.round(basePrice * hpMultiplier * powerMultiplier * typeMultiplier);

  return {
    estimated: estimatedPrice,
    min: Math.round(estimatedPrice * 0.7),
    max: Math.round(estimatedPrice * 1.5),
    currency: 'KRW',
    lastUpdated: new Date().toISOString()
  };
}

/**
 * 모든 카드의 총 가치 계산
 */
export function calculateTotalValue(cards) {
  const prices = cards.map(card => estimateCardPrice(card));
  const totalMin = prices.reduce((sum, price) => sum + price.min, 0);
  const totalMax = prices.reduce((sum, price) => sum + price.max, 0);
  const totalEstimated = prices.reduce((sum, price) => sum + price.estimated, 0);

  return {
    totalMin,
    totalMax,
    totalEstimated,
    cardCount: cards.length,
    averagePrice: Math.round(totalEstimated / cards.length) || 0
  };
}

/**
 * 가격 포맷팅
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(price);
}