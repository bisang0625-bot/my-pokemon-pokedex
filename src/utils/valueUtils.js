/**
 * 아이들을 위한 가치 표현 유틸리티
 * 실제 가격 대신 게임적인 요소로 가치를 표현
 */

/**
 * 가격 기반으로 가치 등급 계산
 * @param {number} estimatedPrice - 추정 가격
 * @returns {Object} 가치 등급 정보
 */
export function getValueGrade(estimatedPrice) {
  if (estimatedPrice >= 50000) {
    return {
      level: 5,
      name: '전설',
      icon: '👑',
      color: 'from-yellow-200 via-yellow-300 to-yellow-400',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      description: '정말 특별한 카드예요!'
    }
  } else if (estimatedPrice >= 20000) {
    return {
      level: 4,
      name: '초희귀',
      icon: '💎',
      color: 'from-purple-200 via-purple-300 to-purple-400',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-800',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
      description: '엄청나게 귀한 카드예요!'
    }
  } else if (estimatedPrice >= 5000) {
    return {
      level: 3,
      name: '희귀',
      icon: '✨',
      color: 'from-blue-200 via-blue-300 to-blue-400',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      description: '좋은 카드예요!'
    }
  } else if (estimatedPrice >= 2000) {
    return {
      level: 2,
      name: '보통',
      icon: '⭐',
      color: 'from-green-200 via-green-300 to-green-400',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      description: '괜찮은 카드예요!'
    }
  } else {
    return {
      level: 1,
      name: '일반',
      icon: '🔸',
      color: 'from-gray-200 via-gray-300 to-gray-400',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-700',
      bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
      description: '기본 카드예요!'
    }
  }
}

/**
 * 가치 등급별 카테고리 이름
 */
export function getValueCategoryName(valueCategory) {
  const names = {
    all: '전체',
    high: '보물 (전설/초희귀)',
    medium: '좋은 것 (희귀)',
    low: '일반 (보통/일반)'
  }
  return names[valueCategory] || valueCategory
}

/**
 * 가치 레벨 아이콘 반복 (1~5)
 */
export function renderValueLevel(valueLevel) {
  const icons = []
  for (let i = 0; i < 5; i++) {
    if (i < valueLevel) {
      icons.push('💎')
    } else {
      icons.push('⚪')
    }
  }
  return icons.join('')
}

