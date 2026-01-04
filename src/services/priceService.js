/**
 * 카드 시세 서비스
 * Gemini API를 사용하여 실제 시세를 조회합니다
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyApZ7YcaEIwIaFudBzdZ1g22e4JmunohqY";
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Gemini API를 사용하여 실제 카드 시세 조회
 * @param {Object} card - 카드 정보 객체
 * @returns {Promise<Object>} 가격 정보
 */
export async function getRealCardPrice(card) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });

    const prompt = `
포켓몬 카드 시세 정보를 제공해주세요.

카드 정보:
- 이름: ${card.name}
- HP: ${card.hp}
- 타입: ${card.type}
- 희귀도: ${card.rarity}성 (${Array(card.rarity || 0).fill('⭐').join('')})
- 종합 능력: ${card.powerLevel || 50}점

다음 JSON 형식으로만 답해주세요:
{
  "estimated": 숫자 (한국 원화 기준 추정 가격),
  "min": 숫자 (최소 가격),
  "max": 숫자 (최대 가격),
  "source": "시세 출처 (예: 온라인 마켓플레이스, 중고 거래 사이트 등)",
  "note": "가격에 대한 간단한 설명 (선택사항)"
}

주의사항:
- 실제 시장 가격을 기반으로 추정해주세요
- 한국 원화(KRW) 기준으로 답해주세요
- 카드 상태가 양호하다고 가정하고 가격을 책정해주세요
- 희귀도, HP, 타입 등을 종합적으로 고려해주세요
- JSON 형식만 반환하고 다른 설명은 포함하지 마세요
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON 추출
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
    // 오류 발생 시 추정 가격 반환
    return {
      ...estimateCardPrice(card),
      isRealPrice: false,
      error: error.message
    };
  }
}

/**
 * 카드 정보를 기반으로 추정 가격 계산
 * @param {Object} card - 카드 정보 객체
 * @returns {Object} 가격 정보
 */
export function estimateCardPrice(card) {
  // 기본 가격 (희귀도별)
  const basePrices = {
    1: 500,   // 일반 카드
    2: 2000,  // 희귀 카드
    3: 5000,  // 매우 희귀
    4: 15000, // 초희귀
    5: 50000  // 전설
  }

  let basePrice = basePrices[card.rarity] || basePrices[1]

  // HP 보정 (HP가 높을수록 가격 상승)
  const hpMultiplier = 1 + (card.hp || 0) / 500

  // 종합 능력 보정
  const powerMultiplier = 1 + ((card.powerLevel || 50) / 200)

  // 타입 보정 (일부 타입은 인기)
  const typeMultipliers = {
    fire: 1.2,
    water: 1.1,
    grass: 1.0,
    electric: 1.3
  }
  const typeMultiplier = typeMultipliers[card.type] || 1.0

  // 최종 가격 계산
  const estimatedPrice = Math.round(
    basePrice * hpMultiplier * powerMultiplier * typeMultiplier
  )

  // 가격 범위 설정 (시장 변동성 고려)
  const minPrice = Math.round(estimatedPrice * 0.7)
  const maxPrice = Math.round(estimatedPrice * 1.5)

  return {
    estimated: estimatedPrice,
    min: minPrice,
    max: maxPrice,
    currency: 'KRW',
    lastUpdated: new Date().toISOString()
  }
}

/**
 * 모든 카드의 총 가치 계산
 * @param {Array} cards - 카드 배열
 * @returns {Object} 총 가치 정보
 */
export function calculateTotalValue(cards) {
  const prices = cards.map(card => estimateCardPrice(card))
  
  const totalMin = prices.reduce((sum, price) => sum + price.min, 0)
  const totalMax = prices.reduce((sum, price) => sum + price.max, 0)
  const totalEstimated = prices.reduce((sum, price) => sum + price.estimated, 0)

  return {
    totalMin,
    totalMax,
    totalEstimated,
    cardCount: cards.length,
    averagePrice: Math.round(totalEstimated / cards.length) || 0
  }
}

/**
 * 가격을 포맷팅하여 표시
 * @param {number} price - 가격
 * @returns {string} 포맷팅된 가격 문자열
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0
  }).format(price)
}

