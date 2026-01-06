/**
 * 도감 관련 유틸리티 함수
 */

/**
 * 한국어 타입명을 영어 코드로 변환
 * @param {string} koreanType - 한국어 타입명 (예: "불꽃", "물")
 * @returns {string} 영어 타입 코드 (예: "fire", "water")
 */
function convertTypeToEnglish(koreanType) {
  if (!koreanType) return 'normal';
  
  const typeMap = {
    '불꽃': 'fire',
    '물': 'water',
    '풀': 'grass',
    '전기': 'electric',
    '에스퍼': 'psychic',
    '얼음': 'ice',
    '드래곤': 'dragon',
    '악': 'dark',
    '페어리': 'fairy',
    '노말': 'normal',
    '격투': 'fighting',
    '비행': 'flying',
    '독': 'poison',
    '땅': 'ground',
    '바위': 'rock',
    '벌레': 'bug',
    '고스트': 'ghost',
    '강철': 'steel'
  };
  
  // 이미 영어 코드인 경우 그대로 반환
  if (typeMap.hasOwnProperty(koreanType)) {
    return typeMap[koreanType];
  }
  
  // 소문자로 변환 후 확인
  const lowerType = koreanType.toLowerCase();
  if (['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'normal', 'fighting'].includes(lowerType)) {
    return lowerType;
  }
  
  // 매칭되지 않으면 기본값 반환
  console.warn('알 수 없는 타입:', koreanType);
  return 'normal';
}

/**
 * 분석된 카드를 도감에 저장
 * @param {string} imageUrl - 카드 이미지 URL
 * @param {Object} analysisResult - 분석 결과 객체
 */
export function saveCardToPokedex(imageUrl, analysisResult) {
  const savedCards = JSON.parse(localStorage.getItem('pokedexCards') || '[]')

  // 타입을 영어 코드로 변환
  const typeEnglish = convertTypeToEnglish(analysisResult.type);

  const newCard = {
    id: Date.now().toString(),
    image: imageUrl,
    name: analysisResult.name || '알 수 없는 몬스터',
    type: typeEnglish, // 영어 코드로 저장
    typeKorean: analysisResult.type || '노말', // 한국어 타입도 별도로 저장 (표시용)
    hp: analysisResult.hp || 0,
    rarity: analysisResult.rarity || 1,
    description: analysisResult.description || '',
    powerLevel: analysisResult.powerLevel || 50,
    strongAgainst: analysisResult.strongAgainst || '',
    weakAgainst: analysisResult.weakAgainst || '',
    nickname: analysisResult.nickname || '',
    scannedAt: new Date().toISOString(),
    // _isOfficial: 내부 전용 필드 (위조/비공식 카드 여부, UI에는 표시 안 함)
    _isOfficial: analysisResult._isOfficial !== false // 기본값은 true
  }

  savedCards.push(newCard)
  localStorage.setItem('pokedexCards', JSON.stringify(savedCards))

  return newCard
}

/**
 * 도감에서 카드 가져오기
 * @returns {Array} 저장된 카드 배열
 */
export function getCardsFromPokedex() {
  return JSON.parse(localStorage.getItem('pokedexCards') || '[]')
}

/**
 * 도감에서 카드 삭제
 * @param {string} cardId - 삭제할 카드 ID
 */
export function deleteCardFromPokedex(cardId) {
  console.log('[Utils] deleteCardFromPokedex called with:', cardId);
  const savedCards = JSON.parse(localStorage.getItem('pokedexCards') || '[]')

  console.log('[Utils] Current IDs in storage:', savedCards.map(c => c.id));

  const updatedCards = savedCards.filter(card => {
    const isMatch = String(card.id) === String(cardId);
    if (isMatch) console.log('[Utils] Found match for deletion:', card.name, card.id);
    return !isMatch;
  });

  console.log('[Utils] IDs after filter:', updatedCards.map(c => c.id));

  if (savedCards.length === updatedCards.length) {
    console.warn('[Utils] No cards were removed! Check ID types.');
  } else {
    console.log('[Utils] Saving updated list to localStorage');
    localStorage.setItem('pokedexCards', JSON.stringify(updatedCards))
  }

  return updatedCards
}

