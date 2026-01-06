/**
 * 도감 관련 유틸리티 함수
 */

/**
 * 분석된 카드를 도감에 저장
 * @param {string} imageUrl - 카드 이미지 URL
 * @param {Object} analysisResult - 분석 결과 객체
 */
export function saveCardToPokedex(imageUrl, analysisResult) {
  const savedCards = JSON.parse(localStorage.getItem('pokedexCards') || '[]')

  const newCard = {
    id: Date.now().toString(),
    image: imageUrl,
    name: analysisResult.name || '알 수 없는 포켓몬',
    type: analysisResult.type || '알 수 없음',
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

