import ignis1 from '../assets/ignis_1.png'
import ignis2 from '../assets/ignis_2.png'
import ignis3 from '../assets/ignis_3.png'
import waterImg from '../assets/partner_water.png'
import grassImg from '../assets/partner_grass.png'

export const PARTNERS = {
    fire: {
        id: 'fire',
        name: '이그니스',
        stages: [
            { name: '이그니스', image: ignis1, minLevel: 1, maxLevel: 9 },
            { name: '이그니스 워리어', image: ignis2, minLevel: 10, maxLevel: 19 },
            { name: '이그니스 드래곤', image: ignis3, minLevel: 20, maxLevel: 999 }
        ],
        color: 'bg-red-500',
        borderColor: 'border-red-500',
        textColor: 'text-red-500'
    },
    water: {
        id: 'water',
        name: '아쿠아',
        stages: [
            { name: '아쿠아', image: waterImg, minLevel: 1, maxLevel: 9 },
            { name: '아쿠아 가디언', image: waterImg, minLevel: 10, maxLevel: 19 },
            { name: '아쿠아 로드', image: waterImg, minLevel: 20, maxLevel: 999 }
        ],
        color: 'bg-blue-500',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-500'
    },
    grass: {
        id: 'grass',
        name: '테라',
        stages: [
            { name: '테라', image: grassImg, minLevel: 1, maxLevel: 9 },
            { name: '테라 스피릿', image: grassImg, minLevel: 10, maxLevel: 19 },
            { name: '테라 마스터', image: grassImg, minLevel: 20, maxLevel: 999 }
        ],
        color: 'bg-green-500',
        borderColor: 'border-green-500',
        textColor: 'text-green-500'
    }
};

import { estimateCardPrice } from '../services/priceService';

export function calculateXP(cards) {
    if (!cards || cards.length === 0) return 0;

    const totalXp = cards.reduce((total, card) => {
        // 기본 XP: 희귀도에 따른 기본값 (희귀할수록 높음)
        // 1성: 20, 2성: 50, 3성: 100, 4성: 250, 5성: 500
        const baseRarityXP = {
            1: 20,
            2: 50,
            3: 100,
            4: 250,
            5: 500
        };
        const rarityXp = baseRarityXP[card.rarity] || baseRarityXP[1];
        
        // 카드 가치 기반 추가 XP (가치가 높을수록 더 많은 XP)
        const cardPrice = estimateCardPrice(card);
        const valueXp = Math.floor(cardPrice.estimated / 100); // 가치의 1%를 XP로
        
        // 전투력 기반 XP (HP + 파워레벨)
        const hpXp = Math.floor((card.hp || 0) / 5); // HP 5당 1 XP
        const powerXp = Math.floor((card.powerLevel || 0) / 5); // 파워레벨 5당 1 XP
        
        // 희귀도 보너스: 4성 이상은 추가 보너스
        let rarityBonus = 0;
        if (card.rarity >= 4) {
            rarityBonus = card.rarity === 5 ? 200 : 100; // 5성: +200, 4성: +100
        }
        
        // AI 분석 카드 보너스 (기존 유지)
        const analysisBonus = card.id && String(card.id).length > 10 ? 50 : 0;

        const cardTotalXP = rarityXp + valueXp + hpXp + powerXp + rarityBonus + analysisBonus;
        
        return total + cardTotalXP;
    }, 0);

    // 레벨업을 지금보다 10배 느리게: 누적 XP를 1/10로 축소
    return Math.floor(totalXp / 10);
}

/**
 * XP를 레벨로 변환하는 함수
 * 레벨업에 필요한 XP는 점진적으로 증가 (레벨 1: 0 XP, 레벨 2: 100 XP, 레벨 3: 210 XP, ...)
 * @param {number} xp - 현재 XP
 * @returns {number} 현재 레벨 (1 이상)
 */
export function calculateLevel(xp) {
    try {
        // null, undefined, NaN 체크
        if (xp === null || xp === undefined || isNaN(xp)) return 1;
        
        // 음수 체크
        const validXp = Math.max(0, Number(xp));
        if (validXp === 0) return 1;
        
        // 레벨업에 필요한 누적 XP 계산
        // 레벨 1 = 0 XP
        // 레벨 2 = 100 XP (레벨 1→2에 100 XP 필요)
        // 레벨 3 = 100 + 110 = 210 XP (레벨 2→3에 110 XP 필요)
        // 레벨 4 = 210 + 120 = 330 XP (레벨 3→4에 120 XP 필요)
        
        let level = 1;
        let totalXpNeeded = 0;
        let iterations = 0;
        const maxIterations = 1000; // 무한 루프 방지
        
        while (level < 999 && iterations < maxIterations) {
            iterations++;
            
            // 다음 레벨까지 필요한 XP 계산
            const xpForNextLevel = level === 1 ? 100 : (100 + (level - 1) * 10);
            const nextTotalXp = totalXpNeeded + xpForNextLevel;
            
            if (validXp >= nextTotalXp) {
                level++;
                totalXpNeeded = nextTotalXp;
            } else {
                break;
            }
        }
        
        return Math.min(level, 999);
    } catch (error) {
        console.error('calculateLevel error:', error);
        return 1; // 에러 발생 시 기본값 반환
    }
}

/**
 * 레벨에 따라 필요한 누적 XP 계산
 * @param {number} targetLevel - 목표 레벨
 * @returns {number} 목표 레벨까지 필요한 총 XP
 */
export function getXpForLevel(targetLevel) {
    if (targetLevel <= 1) return 0;
    
    let totalXp = 0;
    for (let level = 2; level <= targetLevel; level++) {
        totalXp += (100 + (level - 2) * 10);
    }
    
    return totalXp;
}

export function getPartnerStatus(partnerId, currentXp) {
    try {
        // 안전장치: partnerId와 currentXp 검증
        if (!partnerId || !PARTNERS[partnerId]) {
            console.warn('Invalid partnerId:', partnerId);
            return null;
        }
        
        const partner = PARTNERS[partnerId];
        
        // currentXp 검증
        const validXp = currentXp === null || currentXp === undefined || isNaN(currentXp) 
            ? 0 
            : Math.max(0, Number(currentXp));

        // XP를 레벨로 변환
        const currentLevel = calculateLevel(validXp);
        
        // stages 배열 검증
        if (!partner.stages || partner.stages.length === 0) {
            console.error('Partner stages not found:', partnerId);
            return null;
        }
        
        // 레벨에 따른 현재 진화 단계 찾기
        let currentStage = {
            ...partner.stages[0],
            level: currentLevel  // 기본값에도 레벨 추가
        };
        let nextStage = null;
        
        for (let i = 0; i < partner.stages.length; i++) {
            const stage = partner.stages[i];
            if (!stage || stage.minLevel === undefined || stage.maxLevel === undefined) {
                console.warn('Invalid stage:', stage);
                continue;
            }
            
            if (currentLevel >= stage.minLevel && currentLevel <= stage.maxLevel) {
                currentStage = {
                    ...stage,
                    level: currentLevel  // 현재 레벨 추가
                };
                
                // 다음 진화 단계 찾기
                if (i < partner.stages.length - 1) {
                    nextStage = partner.stages[i + 1];
                }
                break;
            }
        }
        
        // 다음 진화 단계까지의 진행도 계산
        let progress = 100;
        let xpForNext = 0;
        let levelForNext = null;

        if (nextStage && nextStage.minLevel !== undefined) {
            // 다음 진화 단계에 도달하기 위한 목표 레벨
            const targetLevel = nextStage.minLevel;
            
            // 현재 레벨이 다음 진화 단계 레벨 범위에 있는지 확인
            if (currentLevel < targetLevel) {
                // 현재 단계 내에서의 진행도 계산
                const currentStageMinLevel = currentStage.minLevel || 1;
                const currentStageMaxLevel = currentStage.maxLevel || 9;
                const currentStageLevelRange = currentStageMaxLevel - currentStageMinLevel + 1;
                const currentLevelInStage = currentLevel - currentStageMinLevel;
                
                // 현재 단계 내에서의 진행도 (0-100%)
                progress = currentStageLevelRange > 0 
                    ? Math.min(Math.max((currentLevelInStage / currentStageLevelRange) * 100, 0), 100)
                    : 0;
                
                // 다음 단계까지 남은 레벨
                levelForNext = targetLevel - currentLevel;
                
                // 다음 단계까지 필요한 XP 계산
                const xpForTargetLevel = getXpForLevel(targetLevel);
                xpForNext = Math.max(0, xpForTargetLevel - validXp);
            } else {
                // 이미 다음 단계 레벨에 도달했지만 아직 진화하지 않은 경우
                progress = 100;
                levelForNext = 0;
                xpForNext = 0;
            }
        }

        return {
            ...partner,
            stage: currentStage,      // 현재 모습 (레벨 포함)
            nextStage,                // 다음 진화 모습
            progress: Math.max(0, Math.min(100, progress)),  // 0-100 범위 보장
            xpForNext,                // 다음 진화까지 남은 XP
            levelForNext,             // 다음 진화까지 남은 레벨
            currentLevel,             // 현재 레벨
            currentXp: validXp        // 현재 XP
        };
    } catch (error) {
        console.error('getPartnerStatus error:', error);
        return null; // 에러 발생 시 null 반환
    }
}
