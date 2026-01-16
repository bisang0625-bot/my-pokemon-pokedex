/**
 * 도감 관련 유틸리티 함수
 */

import { compressImage } from './imageUtils'

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

  // 소문자로 변환 후 확인 (모든 포켓몬 타입)
  const lowerType = koreanType.toLowerCase();
  const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
  if (allTypes.includes(lowerType)) {
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
export async function saveCardToPokedex(imageUrl, analysisResult) {
  try {
    const savedCards = JSON.parse(localStorage.getItem('pokedexCards') || '[]')

    // 타입을 영어 코드로 변환
    const typeEnglish = convertTypeToEnglish(analysisResult.type);

    // 저장 전 이미지 압축 강화 (200장 저장 목표)
    let finalImageUrl = imageUrl
    if (imageUrl && imageUrl.startsWith('data:image') && needsCompression(imageUrl)) {
      try {
        finalImageUrl = await compressImage(imageUrl, 400, 400, 0.4)
      } catch (error) {
        console.warn('저장 전 이미지 재압축 실패, 원본 사용:', error)
      }
    }

    const newCard = {
      id: Date.now().toString(),
      image: finalImageUrl,
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

    try {
      localStorage.setItem('pokedexCards', JSON.stringify(savedCards))
    } catch (storageError) {
      // localStorage quota exceeded 에러 처리
      if (storageError.name === 'QuotaExceededError' || storageError.name === 'NS_ERROR_DOM_QUOTA_REACHED' || storageError.message.includes('quota')) {
        throw new Error('STORAGE_QUOTA_EXCEEDED')
      }
      throw storageError
    }

    return newCard
  } catch (error) {
    // 이미 STORAGE_QUOTA_EXCEEDED 에러인 경우 그대로 throw
    if (error.message === 'STORAGE_QUOTA_EXCEEDED') {
      throw error
    }
    // 기타 에러는 다시 throw
    throw error
  }
}

/**
 * 이미지가 압축이 필요한지 확인 (큰 base64 이미지인지 체크)
 * @param {string} imageSrc - base64 이미지 문자열
 * @returns {boolean} 압축이 필요하면 true
 */
function needsCompression(imageSrc) {
  if (!imageSrc || typeof imageSrc !== 'string') return false
  if (!imageSrc.startsWith('data:image')) return false

  // base64 문자열 길이가 50KB (약 65,000자) 이상이면 압축 필요
  // 새 압축 기준: 400x400, 품질 0.4로 매우 작은 이미지 생성 (200장 저장 목표)
  return imageSrc.length > 65000
}

/**
 * 도감에서 카드 가져오기
 * @returns {Array} 저장된 카드 배열
 */
export function getCardsFromPokedex() {
  try {
    const cardsJson = localStorage.getItem('pokedexCards')
    if (!cardsJson) return []

    const cards = JSON.parse(cardsJson)
    return Array.isArray(cards) ? cards : []
  } catch (error) {
    console.error('도감 카드 로드 에러:', error)
    // 에러 발생 시 빈 배열 반환
    return []
  }
}

/**
 * 기존 이미지 압축 마이그레이션 (1회성, 앱 초기화 시 한 번만 실행)
 * @returns {Promise<void>}
 */
export async function runImageCompressionMigration() {
  const migrationKey = 'imageCompressionMigrationV3Done' // v3: 400x400, 품질 0.4로 강화 (200장 저장 목표)
  const migrationDone = localStorage.getItem(migrationKey) === 'true'

  // 이미 마이그레이션이 완료되었으면 실행하지 않음
  if (migrationDone) {
    return
  }

  try {
    const cardsJson = localStorage.getItem('pokedexCards')
    if (!cardsJson) {
      localStorage.setItem(migrationKey, 'true')
      return
    }

    const cards = JSON.parse(cardsJson)
    if (!Array.isArray(cards) || cards.length === 0) {
      localStorage.setItem(migrationKey, 'true')
      return
    }

    // 백그라운드에서 점진적으로 압축
    await compressExistingImages(cards, migrationKey)
  } catch (error) {
    console.error('이미지 압축 마이그레이션 에러:', error)
    // 에러 발생 시에도 완료 플래그 설정하여 무한 루프 방지
    localStorage.setItem(migrationKey, 'true')
  }
}

/**
 * 기존 이미지들을 점진적으로 압축 (백그라운드 작업)
 * @param {Array} cards - 카드 배열
 * @param {string} migrationKey - 마이그레이션 완료 플래그 키
 */
async function compressExistingImages(cards, migrationKey) {
  try {
    const cardsToCompress = cards.filter(card =>
      card.image && needsCompression(card.image)
    )

    if (cardsToCompress.length === 0) {
      localStorage.setItem(migrationKey, 'true')
      return
    }

    console.log(`압축 필요한 카드 ${cardsToCompress.length}장 발견. 백그라운드에서 압축 중...`)

    // 한 번에 하나씩 압축하여 localStorage quota 에러 방지
    let updatedCards = [...cards]
    let compressedCount = 0

    for (const card of cardsToCompress) {
      try {
        // 200장 저장 목표: 400x400, 품질 0.4로 더 강한 압축
        const compressedImage = await compressImage(card.image, 400, 400, 0.4)

        // 카드 배열에서 해당 카드 찾아서 업데이트
        const cardIndex = updatedCards.findIndex(c => c.id === card.id)
        if (cardIndex !== -1) {
          updatedCards[cardIndex] = { ...updatedCards[cardIndex], image: compressedImage }
          compressedCount++

          // 10장마다 저장하여 진행 상황 저장
          if (compressedCount % 10 === 0) {
            try {
              localStorage.setItem('pokedexCards', JSON.stringify(updatedCards))
              console.log(`${compressedCount}/${cardsToCompress.length}장 압축 완료`)
            } catch (error) {
              console.warn('중간 저장 실패 (용량 부족 가능성):', error)
              // 저장 실패 시 중단하지 않고 계속 진행
            }
          }
        }

        // 각 압축 사이에 짧은 지연 (브라우저 블로킹 방지)
        await new Promise(resolve => setTimeout(resolve, 50))
      } catch (error) {
        console.warn(`카드 ${card.id} 압축 실패:`, error)
        // 개별 카드 압축 실패는 무시하고 계속 진행
      }
    }

    // 최종 저장
    try {
      localStorage.setItem('pokedexCards', JSON.stringify(updatedCards))
      localStorage.setItem(migrationKey, 'true')
      console.log(`이미지 압축 마이그레이션 완료: ${compressedCount}/${cardsToCompress.length}장`)
    } catch (error) {
      console.warn('최종 저장 실패:', error)
      // 저장 실패해도 마이그레이션 완료로 표시하여 무한 루프 방지
      localStorage.setItem(migrationKey, 'true')
    }
  } catch (error) {
    console.error('이미지 압축 마이그레이션 전체 실패:', error)
    // 실패해도 마이그레이션 완료로 표시하여 무한 루프 방지
    localStorage.setItem(migrationKey, 'true')
  }
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

