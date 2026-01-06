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
            { name: '이그니스', level: 1, image: ignis1, minXp: 0 },
            { name: '이그니스 워리어', level: 16, image: ignis2, minXp: 1000 },
            { name: '이그니스 드래곤', level: 36, image: ignis3, minXp: 5000 }
        ],
        color: 'bg-red-500',
        borderColor: 'border-red-500',
        textColor: 'text-red-500'
    },
    water: {
        id: 'water',
        name: '아쿠아',
        stages: [
            { name: '아쿠아', level: 1, image: waterImg, minXp: 0 },
            { name: '아쿠아 가디언', level: 16, image: waterImg, minXp: 1000 },
            { name: '아쿠아 로드', level: 36, image: waterImg, minXp: 5000 }
        ],
        color: 'bg-blue-500',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-500'
    },
    grass: {
        id: 'grass',
        name: '테라',
        stages: [
            { name: '테라', level: 1, image: grassImg, minXp: 0 },
            { name: '테라 스피릿', level: 16, image: grassImg, minXp: 1000 },
            { name: '테라 마스터', level: 36, image: grassImg, minXp: 5000 }
        ],
        color: 'bg-green-500',
        borderColor: 'border-green-500',
        textColor: 'text-green-500'
    }
};

export function calculateXP(cards) {
    if (!cards || cards.length === 0) return 0;

    return cards.reduce((total, card) => {
        // 희귀도(1~5) * 10
        const rarityXp = (card.rarity || 1) * 10;
        // 전투력 / 10
        const powerXp = Math.floor((card.powerLevel || 0) / 10);
        // AI 분석 카드 보너스 (50 XP)
        const analysisBonus = card.id && String(card.id).length > 10 ? 50 : 0;

        return total + rarityXp + powerXp + analysisBonus;
    }, 0);
}

export function getPartnerStatus(partnerId, currentXp) {
    const partner = PARTNERS[partnerId];
    if (!partner) return null;

    // 현재 XP에 맞는 진화 단계 찾기 (역순으로 검색)
    let currentStage = partner.stages[0];
    let nextStage = partner.stages[1];

    for (let i = partner.stages.length - 1; i >= 0; i--) {
        if (currentXp >= partner.stages[i].minXp) {
            currentStage = partner.stages[i];
            nextStage = partner.stages[i + 1] || null; // 다음 단계가 없으면 null (최종 진화)
            break;
        }
    }

    // 다음 단계까지 남은 XP 계산
    let progress = 100;
    let xpForNext = 0;

    if (nextStage) {
        const xpNeeded = nextStage.minXp - currentStage.minXp;
        const xpGained = currentXp - currentStage.minXp;
        progress = Math.min((xpGained / xpNeeded) * 100, 100);
        xpForNext = nextStage.minXp - currentXp;
    }

    return {
        ...partner,
        stage: currentStage, // 현재 모습
        nextStage,           // 다음 진화 모습
        progress,            // 다음 진화까지 퍼센트
        xpForNext            // 다음 진화까지 남은 XP
    };
}
