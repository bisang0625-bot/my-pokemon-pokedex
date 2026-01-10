/**
 * 다국어 번역 데이터
 */

export const translations = {
  ko: {
    // 앱 정보
    appName: '포켓 카드 헌터',
    appNameFull: '포켓 카드 헌터: 몬스터 키우기',
    appDescription: '7-10세 아이들을 위한 몬스터 카드 수집 및 도감 앱. 카드를 스캔하고 자신만의 도감을 만들어보세요!',
    
    // 네비게이션
    nav: {
      scan: '스캔',
      pokedex: '도감',
      parent: '부모님',
      parentMode: '부모 모드',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      language: '언어'
    },
    
    // Pokedex 페이지
    pokedex: {
      title: '내 몬스터 도감',
      searchPlaceholder: '몬스터 이름 또는 별명 검색...',
      totalCards: '총 카드',
      legendCards: '⭐ 5성 (전설)',
      ultraRareCards: '⭐ 4성 (초희귀)',
      rareCards: '⭐ 3성 (희귀)',
      typeFilter: '타입별',
      rarityFilter: '희귀도별',
      sortLabel: '정렬:',
      sortBy: {
        latest: '최신순',
        rarity: '희귀도순',
        hp: 'HP순',
        power: '파워순',
        name: '이름순'
      },
      all: '전체',
      noResults: '검색 결과가 없어요!',
      noResultsSub: '다른 필터를 선택해보세요.',
      deleteConfirm: '정말 이 몬스터 카드를 삭제하시겠습니까?',
      expand: '▼ 더 보기',
      collapse: '▲ 간략히 보기',
      description: '설명',
      strongAgainst: '💪 강점',
      weakAgainst: '⚠️ 약점',
      collectedDate: '수집 날짜',
      currentXP: '현재 XP',
      nextEvolution: '다음 진화',
      levelRemaining: '레벨 {level} 남음',
      level: '레벨 {level}',
      rareCardsHint: '* 희귀한 카드를 모으면 더 빨리 성장해요! (현재 레벨: {level})',
      finalEvolution: '🏆 최종 진화 완료! 정말 대단해요!'
    },
    
    // 타입 이름
    types: {
      all: '전체',
      normal: '노말',
      fire: '불꽃',
      water: '물',
      electric: '전기',
      grass: '풀',
      ice: '얼음',
      fighting: '격투',
      poison: '독',
      ground: '땅',
      flying: '비행',
      psychic: '에스퍼',
      bug: '벌레',
      rock: '바위',
      ghost: '고스트',
      dragon: '드래곤',
      dark: '악',
      steel: '강철',
      fairy: '페어리'
    },
    
    // 희귀도 설명
    rarity: {
      5: '👑 전설의 카드예요! 정말 특별해요!',
      4: '💎 초희귀 카드예요! 엄청나게 귀해요!',
      3: '✨ 희귀 카드예요! 좋은 카드예요!',
      2: '⭐ 보통 카드예요! 괜찮은 카드예요!',
      1: '🔸 일반 카드예요! 기본 카드예요!'
    },
    
    // CameraScan 페이지
    cameraScan: {
      title: '카드 스캔',
      startCamera: '카메라 켜기',
      scanDescription: '카드를 스캔해서 도감에 추가해보세요!',
      analyzeButton: '✨ 분석하기',
      retake: '다시 찍기',
      analyzing: '몬스터 분석 중...',
      analyzingSub: '도감을 펼치고 있어요!',
      close: '닫기',
      nextCard: '다음 카드 스캔',
      cardInFrame: '카드를 사각형 안에 맞춰주세요!',
      cameraPermissionRequired: '카메라 접근 권한이 필요합니다.',
      cameraPermissionHint: '브라우저 주소창의 자물쇠 아이콘(🔒)을 클릭하여 카메라 권한을 허용해주세요.',
      scanTip: '💡 몬스터 카드를 명확하게 스캔해주세요!',
      quotaExceeded: '오늘 카드 분석 할당량을 모두 사용했어요. {minutes}분 후에 다시 시도해주세요! 🕐',
      quotaExceededTitle: '분석 제한 안내',
      analysisFailed: '분석 실패'
    },
    
    // StarterSelection 컴포넌트
    starterSelection: {
      title: '파트너 몬스터를 선택하세요!',
      subtitle: '앞으로 함께 모험을 떠날 친구를 골라주세요.',
      selectButton: '선택하기',
      evolutionHint: '* 카드를 많이 모으면 몬스터가 진화합니다!'
    },
    
    // 공통
    common: {
      hp: 'HP',
      power: '⚡',
      cards: '장',
      level: '레벨'
    }
  },
  
  en: {
    appName: 'Pocket Card Hunter',
    appNameFull: 'Pocket Card Hunter: Monster Raising',
    appDescription: 'Monster card collection and Pokedex app for kids aged 7-10. Scan cards and create your own Pokedex!',
    
    nav: {
      scan: 'Scan',
      pokedex: 'Pokedex',
      parent: 'Parent',
      parentMode: 'Parent Mode',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      language: 'Language'
    },
    
    pokedex: {
      title: 'My Monster Pokedex',
      searchPlaceholder: 'Search monster name or nickname...',
      totalCards: 'Total Cards',
      legendCards: '⭐ 5★ (Legendary)',
      ultraRareCards: '⭐ 4★ (Ultra Rare)',
      rareCards: '⭐ 3★ (Rare)',
      typeFilter: 'By Type',
      rarityFilter: 'By Rarity',
      sortLabel: 'Sort:',
      sortBy: {
        latest: 'Latest',
        rarity: 'Rarity',
        hp: 'HP',
        power: 'Power',
        name: 'Name'
      },
      all: 'All',
      noResults: 'No results found!',
      noResultsSub: 'Try selecting different filters.',
      deleteConfirm: 'Are you sure you want to delete this monster card?',
      expand: '▼ Show More',
      collapse: '▲ Show Less',
      description: 'Description',
      strongAgainst: '💪 Strong Against',
      weakAgainst: '⚠️ Weak Against',
      collectedDate: 'Collected Date',
      currentXP: 'Current XP',
      nextEvolution: 'Next Evolution',
      levelRemaining: '{level} Levels Remaining',
      level: 'Level {level}',
      rareCardsHint: '* Collect rare cards to grow faster! (Current Level: {level})',
      finalEvolution: '🏆 Final Evolution Complete! Amazing!'
    },
    
    types: {
      all: 'All',
      normal: 'Normal',
      fire: 'Fire',
      water: 'Water',
      electric: 'Electric',
      grass: 'Grass',
      ice: 'Ice',
      fighting: 'Fighting',
      poison: 'Poison',
      ground: 'Ground',
      flying: 'Flying',
      psychic: 'Psychic',
      bug: 'Bug',
      rock: 'Rock',
      ghost: 'Ghost',
      dragon: 'Dragon',
      dark: 'Dark',
      steel: 'Steel',
      fairy: 'Fairy'
    },
    
    rarity: {
      5: '👑 Legendary Card! So special!',
      4: '💎 Ultra Rare Card! Extremely rare!',
      3: '✨ Rare Card! Great card!',
      2: '⭐ Common Card! Nice card!',
      1: '🔸 Basic Card! Standard card!'
    },
    
    cameraScan: {
      title: 'Card Scan',
      startCamera: 'Start Camera',
      scanDescription: 'Scan cards to add them to your Pokedex!',
      analyzeButton: '✨ Analyze',
      retake: 'Retake',
      analyzing: 'Analyzing Monster...',
      analyzingSub: 'Opening Pokedex!',
      close: 'Close',
      nextCard: 'Next Card Scan',
      cardInFrame: 'Place the card inside the frame!',
      cameraPermissionRequired: 'Camera access permission is required.',
      cameraPermissionHint: 'Click the lock icon (🔒) in the browser address bar to allow camera permission.',
      scanTip: '💡 Please scan the monster card clearly!',
      quotaExceeded: 'Daily card analysis quota exceeded. Please try again in {minutes} minutes! 🕐',
      quotaExceededTitle: 'Analysis Limit Notice',
      analysisFailed: 'Analysis Failed'
    },
    
    starterSelection: {
      title: 'Choose Your Partner Monster!',
      subtitle: 'Pick a friend to go on adventures with.',
      selectButton: 'Select',
      evolutionHint: '* Collect more cards to evolve your monster!'
    },
    
    common: {
      hp: 'HP',
      power: '⚡',
      cards: ' cards',
      level: 'Level'
    }
  },
  
  nl: {
    appName: 'Pocket Kaart Jager',
    appNameFull: 'Pocket Kaart Jager: Monster Opvoeding',
    appDescription: 'Monsterkaart verzamel- en Pokedex-app voor kinderen van 7-10 jaar. Scan kaarten en maak je eigen Pokedex!',
    
    nav: {
      scan: 'Scan',
      pokedex: 'Pokedex',
      parent: 'Ouder',
      parentMode: 'Ouder Modus',
      privacy: 'Privacybeleid',
      terms: 'Servicevoorwaarden',
      language: 'Taal'
    },
    
    pokedex: {
      title: 'Mijn Monster Pokedex',
      searchPlaceholder: 'Zoek monsternaam of bijnaam...',
      totalCards: 'Totaal Kaarten',
      legendCards: '⭐ 5★ (Legendarisch)',
      ultraRareCards: '⭐ 4★ (Ultra Zeldzaam)',
      rareCards: '⭐ 3★ (Zeldzaam)',
      typeFilter: 'Op Type',
      rarityFilter: 'Op Zeldzaamheid',
      sortLabel: 'Sorteer:',
      sortBy: {
        latest: 'Nieuwste',
        rarity: 'Zeldzaamheid',
        hp: 'HP',
        power: 'Kracht',
        name: 'Naam'
      },
      all: 'Alle',
      noResults: 'Geen resultaten gevonden!',
      noResultsSub: 'Probeer andere filters te selecteren.',
      deleteConfirm: 'Weet je zeker dat je deze monstarkaart wilt verwijderen?',
      expand: '▼ Meer Tonen',
      collapse: '▲ Minder Tonen',
      description: 'Beschrijving',
      strongAgainst: '💪 Sterk Tegen',
      weakAgainst: '⚠️ Zwak Tegen',
      collectedDate: 'Verzameldatum',
      currentXP: 'Huidige XP',
      nextEvolution: 'Volgende Evolutie',
      levelRemaining: '{level} Niveaus Resterend',
      level: 'Niveau {level}',
      rareCardsHint: '* Verzamel zeldzame kaarten om sneller te groeien! (Huidig Niveau: {level})',
      finalEvolution: '🏆 Laatste Evolutie Voltooid! Geweldig!'
    },
    
    types: {
      all: 'Alle',
      normal: 'Normaal',
      fire: 'Vuur',
      water: 'Water',
      electric: 'Elektrisch',
      grass: 'Gras',
      ice: 'IJs',
      fighting: 'Vechten',
      poison: 'Gif',
      ground: 'Grond',
      flying: 'Vliegen',
      psychic: 'Psychisch',
      bug: 'Insect',
      rock: 'Rots',
      ghost: 'Geest',
      dragon: 'Draak',
      dark: 'Donker',
      steel: 'Staal',
      fairy: 'Fee'
    },
    
    rarity: {
      5: '👑 Legendarische Kaart! Zo speciaal!',
      4: '💎 Ultra Zeldzame Kaart! Extreem zeldzaam!',
      3: '✨ Zeldzame Kaart! Geweldige kaart!',
      2: '⭐ Gewone Kaart! Mooie kaart!',
      1: '🔸 Basis Kaart! Standaard kaart!'
    },
    
    cameraScan: {
      title: 'Kaart Scannen',
      startCamera: 'Camera Starten',
      scanDescription: 'Scan kaarten om ze toe te voegen aan je Pokedex!',
      analyzeButton: '✨ Analyseren',
      retake: 'Opnieuw',
      analyzing: 'Monster Analyseren...',
      analyzingSub: 'Pokedex Openen!',
      close: 'Sluiten',
      nextCard: 'Volgende Kaart Scannen',
      cardInFrame: 'Plaats de kaart in het kader!',
      cameraPermissionRequired: 'Cameratoegangsmachtiging is vereist.',
      cameraPermissionHint: 'Klik op het slotpictogram (🔒) in de adresbalk van de browser om cameramachtiging toe te staan.',
      scanTip: '💡 Scan de monstarkaart duidelijk!',
      quotaExceeded: 'Dagelijkse kaartanalysequota overschreden. Probeer het over {minutes} minuten opnieuw! 🕐',
      quotaExceededTitle: 'Analyse Limiet Kennisgeving',
      analysisFailed: 'Analyse Mislukt'
    },
    
    starterSelection: {
      title: 'Kies Je Partnermonster!',
      subtitle: 'Kies een vriend om avonturen mee te beleven.',
      selectButton: 'Selecteren',
      evolutionHint: '* Verzamel meer kaarten om je monster te evolueren!'
    },
    
    common: {
      hp: 'HP',
      power: '⚡',
      cards: ' kaarten',
      level: 'Niveau'
    }
  }
};

// 언어 코드 목록
export const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' }
];

// 기본 언어
export const defaultLanguage = 'ko';

// 텍스트 치환 함수 (내부 사용)
export function translateText(text, params = {}) {
  if (!text) return '';
  
  let result = text;
  Object.keys(params).forEach(key => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(regex, params[key]);
  });
  
  return result;
}