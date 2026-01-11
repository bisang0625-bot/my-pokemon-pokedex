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
      storageQuotaExceeded: '저장 공간이 부족합니다. 부모 모드에서 일부 카드를 삭제한 후 다시 시도해주세요.',
      storageQuotaExceededTitle: '저장 공간 부족',
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
    },
    
    // ParentalGate 컴포넌트
    parentalGate: {
      newPassword: '새로운 보호자 비밀번호 설정',
      confirmPassword: '비밀번호 확인',
      enterPassword: '보호자 비밀번호 입력',
      mathChallenge: '성인 인증 (수학 문제)',
      enter4Digits: '4자리 숫자를 입력해주세요.',
      enterAgain: '한 번 더 입력해주세요.',
      enterPassword4Digits: '설정하신 4자리 숫자를 입력해주세요.',
      enterAnswer: '아래 문제의 정답을 입력하세요.',
      resetPassword: '비밀번호 초기화',
      wrongPassword: '비밀번호가 틀렸습니다.',
      passwordMismatch: '비밀번호가 일치하지 않습니다. 처음부터 다시 설정해주세요.',
      wrongAnswer: '틀렸습니다. 다시 시도해주세요.',
      resetSuccess: '초기화되었습니다. 새 비밀번호를 설정해주세요.',
      answerPlaceholder: '정답 입력',
      cancel: '취소',
      confirm: '확인'
    },
    
    // ParentMode 페이지
    parentMode: {
      title: '부모님 설정',
      secureConnection: '보안 연결됨',
      collectionStatus: '수집 현황',
      totalCollectedCards: '총 수집 카드',
      lastActivity: '마지막 활동',
      valueAnalysis: '가치 분석',
      calculating: '계산 중...',
      totalEstimatedValue: '총 추정 가치',
      averagePrice: '평균 단가',
      cardList: '보유 카드 목록',
      loading: '데이터를 불러오는 중입니다...',
      monster: '몬스터',
      estimatedValue: '추정 가치',
      range: '범위',
      aiAnalysis: 'AI 분석',
      estimated: '추정',
      dataReset: '데이터 초기화',
      dataResetDescription: '아이의 카드 도감 데이터를 모두 삭제합니다.',
      deleteData: '데이터 삭제',
      deleteConfirm: '모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      deleteSuccess: '모든 데이터가 삭제되었습니다.'
    },
    
    // 파트너 포켓몬 이름
    partners: {
      fire: {
        name: '이그니스',
        stages: {
          1: '이그니스',
          2: '이그니스 워리어',
          3: '이그니스 드래곤'
        }
      },
      water: {
        name: '아쿠아',
        stages: {
          1: '아쿠아',
          2: '아쿠아 가디언',
          3: '아쿠아 로드'
        }
      },
      grass: {
        name: '테라',
        stages: {
          1: '테라',
          2: '테라 스피릿',
          3: '테라 마스터'
        }
      }
    },
    
    // 개인정보 처리방침
    privacy: {
      title: '개인정보 처리방침',
      goBack: '← 돌아가기',
      section1Title: '1. 개인정보의 처리 목적',
      section1Desc: '포켓 카드 헌터: 몬스터 키우기는 다음과 같은 목적으로 개인정보를 처리합니다:',
      section1List1: '카드 스캔 및 분석 기능 제공',
      section1List2: '도감 데이터 저장 및 관리',
      section1List3: '앱 기능 개선 및 사용자 경험 향상',
      section2Title: '2. 수집하는 개인정보의 항목',
      section2Desc: '본 앱은 다음과 같은 정보를 수집합니다:',
      section2Camera: '카메라 권한: 몬스터 카드 스캔을 위해 필요합니다',
      section2Storage: '저장된 데이터: 스캔한 카드 이미지 및 분석 결과는 기기 내 로컬 스토리지에만 저장됩니다',
      section2ApiKey: 'API 키: 부모 모드에서 설정한 Gemini API 키는 기기 내에만 저장됩니다',
      section2Important: '⚠️ 중요: 모든 데이터는 사용자의 기기 내부에만 저장되며, 외부 서버로 전송되지 않습니다.',
      section3Title: '3. 개인정보의 처리 및 보유기간',
      section3Desc: '사용자가 직접 삭제할 때까지 모든 데이터는 기기 내 로컬 스토리지에 보관됩니다. 부모 모드에서 "데이터 초기화" 기능을 통해 언제든지 모든 데이터를 삭제할 수 있습니다.',
      section4Title: '4. 개인정보의 제3자 제공',
      section4Desc: '본 앱은 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 카드 분석 기능을 위해 Google의 Gemini API를 사용하며, 이 과정에서 이미지 데이터가 Google 서버로 전송될 수 있습니다. Google의 개인정보 처리방침은 여기에서 확인하실 수 있습니다.',
      section5Title: '5. 개인정보처리 위탁',
      section5Desc: '본 앱은 카드 분석 기능 제공을 위해 Google Gemini API 서비스를 위탁 처리하고 있습니다.',
      section6Title: '6. 정보주체의 권리·의무 및 그 행사방법',
      section6Desc: '사용자는 언제든지 다음의 권리를 행사할 수 있습니다:',
      section6List1: '개인정보 열람 요구',
      section6List2: '개인정보 삭제 요구 (부모 모드의 "데이터 초기화" 기능 사용)',
      section7Title: '7. 개인정보의 안전성 확보 조치',
      section7List1: '모든 데이터는 기기 내부에만 저장됩니다',
      section7List2: '외부 서버로의 데이터 전송을 최소화합니다',
      section7List3: '카드 이미지 분석 시에만 임시로 Google API로 전송되며, 결과만 저장됩니다',
      section8Title: '8. 개인정보 처리방침 변경',
      section8Desc: '이 개인정보 처리방침은 2024년 1월 1일부터 시행됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 앱 내 공지사항을 통하여 고지할 것입니다.',
      contactTitle: '문의처',
      contactDesc: '개인정보 처리방침에 관한 문의사항이 있으시면 앱 리뷰를 통해 문의해 주시기 바랍니다.'
    },
    
    // 이용약관
    terms: {
      title: '이용약관',
      goBack: '← 돌아가기',
      copyright: '⚠️ 저작권 고지: 본 앱은 몬스터 카드 이미지의 분석을 돕는 도구입니다. 포켓몬(Pokémon)은 Nintendo, Creatures Inc., Game Freak Inc.의 저작권 및 상표입니다. 본 앱은 공식 포켓몬 앱이 아니며, The Pokémon Company와 무관합니다.',
      article1Title: '제1조 (목적)',
      article1Desc: '본 약관은 포켓 카드 헌터: 몬스터 키우기 앱(이하 "본 앱")의 이용조건 및 절차, 이용자와 개발자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
      article2Title: '제2조 (정의)',
      article2App: '"앱"이란 포켓 카드 헌터: 몬스터 키우기 서비스를 의미합니다.',
      article2User: '"이용자"란 본 앱에 접속하여 본 약관에 따라 개발자가 제공하는 서비스를 받는 자를 의미합니다.',
      article2Service: '"서비스"란 개발자가 제공하는 몬스터 카드 스캔 및 분석 서비스를 의미합니다.',
      article3Title: '제3조 (약관의 게시와 개정)',
      article3Desc: '본 약관은 앱 내에서 게시하며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 앱 내 공지사항을 통하여 고지할 것입니다.',
      article4Title: '제4조 (서비스의 제공 및 변경)',
      article4ListTitle: '본 앱은 다음과 같은 서비스를 제공합니다:',
      article4List1: '몬스터 카드 스캔 및 AI 분석 기능',
      article4List2: '수집한 카드의 도감 관리 기능',
      article4List3: '카드 가치 추정 기능 (부모 모드)',
      article4Change: '개발자는 필요한 경우 서비스의 내용을 변경할 수 있으며, 변경 시 사전에 공지합니다.',
      article5Title: '제5조 (서비스의 중단)',
      article5Desc: '개발자는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.',
      article6Title: '제6조 (이용자의 의무)',
      article6Desc: '이용자는 다음 행위를 하여서는 안 됩니다:',
      article6List1: '타인의 정보 도용',
      article6List2: '개발자가 게시한 정보의 변경',
      article6List3: '본 앱에 게시된 정보의 변경',
      article6List4: '범죄와 결부된다고 객관적으로 인정되는 행위',
      article6List5: '기타 관련 법령에 위배되는 행위',
      article7Title: '제7조 (개인정보 보호)',
      article7Desc: '개발자는 이용자의 개인정보 보호를 위하여 노력합니다. 자세한 사항은 개인정보 처리방침을 참고하시기 바랍니다.',
      article8Title: '제8조 (면책 조항)',
      article8List1: '개발자는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.',
      article8List2: '개발자는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.',
      article8List3: '개발자는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.',
      article8List4: '개발자는 이용자 상호간 또는 이용자와 제3자 간에 서비스를 매개로 하여 발생한 분쟁 등에 대하여 책임을 지지 않습니다.',
      article8List5: '카드 분석 결과의 정확성을 보장하지 않으며, 제공되는 정보는 참고용입니다.',
      article9Title: '제9조 (준거법 및 관할법원)',
      article9Desc: '본 약관은 대한민국 법령에 따라 규율되고 해석되며, 개발자와 이용자 간에 발생한 분쟁에 대해서는 대한민국 법원을 관할 법원으로 합니다.',
      supplementTitle: '부칙',
      supplementDesc: '본 약관은 2024년 1월 1일부터 시행됩니다.'
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
      storageQuotaExceeded: 'Storage space is full. Please delete some cards in Parent Mode and try again.',
      storageQuotaExceededTitle: 'Storage Full',
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
    },
    
    // ParentalGate component
    parentalGate: {
      newPassword: 'Set New Guardian Password',
      confirmPassword: 'Confirm Password',
      enterPassword: 'Enter Guardian Password',
      mathChallenge: 'Adult Verification (Math Problem)',
      enter4Digits: 'Please enter a 4-digit number.',
      enterAgain: 'Please enter again.',
      enterPassword4Digits: 'Please enter your 4-digit password.',
      enterAnswer: 'Enter the answer to the problem below.',
      resetPassword: 'Reset Password',
      wrongPassword: 'Incorrect password.',
      passwordMismatch: 'Passwords do not match. Please set again from the beginning.',
      wrongAnswer: 'Incorrect. Please try again.',
      resetSuccess: 'Reset complete. Please set a new password.',
      answerPlaceholder: 'Enter answer',
      cancel: 'Cancel',
      confirm: 'Confirm'
    },
    
    // ParentMode page
    parentMode: {
      title: 'Parent Settings',
      secureConnection: 'Secure Connection',
      collectionStatus: 'Collection Status',
      totalCollectedCards: 'Total Collected Cards',
      lastActivity: 'Last Activity',
      valueAnalysis: 'Value Analysis',
      calculating: 'Calculating...',
      totalEstimatedValue: 'Total Estimated Value',
      averagePrice: 'Average Unit Price',
      cardList: 'Owned Card List',
      loading: 'Loading data...',
      monster: 'Monster',
      estimatedValue: 'Estimated Value',
      range: 'Range',
      aiAnalysis: 'AI Analysis',
      estimated: 'Estimated',
      dataReset: 'Data Reset',
      dataResetDescription: 'Deletes all of your child\'s card collection data.',
      deleteData: 'Delete Data',
      deleteConfirm: 'Are you sure you want to delete all data? This action cannot be undone.',
      deleteSuccess: 'All data has been deleted.'
    },
    
    // Partner monster names
    partners: {
      fire: {
        name: 'Ignis',
        stages: {
          1: 'Ignis',
          2: 'Ignis Warrior',
          3: 'Ignis Dragon'
        }
      },
      water: {
        name: 'Aqua',
        stages: {
          1: 'Aqua',
          2: 'Aqua Guardian',
          3: 'Aqua Lord'
        }
      },
      grass: {
        name: 'Terra',
        stages: {
          1: 'Terra',
          2: 'Terra Spirit',
          3: 'Terra Master'
        }
      }
    },
    
    // Privacy Policy
    privacy: {
      title: 'Privacy Policy',
      goBack: '← Go Back',
      section1Title: '1. Purpose of Personal Information Processing',
      section1Desc: 'Pocket Card Hunter: Monster Raising processes personal information for the following purposes:',
      section1List1: 'Providing card scanning and analysis features',
      section1List2: 'Storing and managing collection data',
      section1List3: 'Improving app features and enhancing user experience',
      section2Title: '2. Personal Information Collected',
      section2Desc: 'This app collects the following information:',
      section2Camera: 'Camera Permission: Required for scanning monster cards',
      section2Storage: 'Stored Data: Scanned card images and analysis results are stored only in local storage on the device',
      section2ApiKey: 'API Key: The Gemini API key set in Parent Mode is stored only on the device',
      section2Important: '⚠️ Important: All data is stored only on the user\'s device and is not transmitted to external servers.',
      section3Title: '3. Processing and Retention Period of Personal Information',
      section3Desc: 'All data will be retained in local storage on the device until the user deletes it. Users can delete all data at any time through the "Data Reset" feature in Parent Mode.',
      section4Title: '4. Third-Party Provision of Personal Information',
      section4Desc: 'This app does not provide users\' personal information to third parties. However, Google\'s Gemini API is used for card analysis features, and image data may be transmitted to Google servers during this process. Google\'s privacy policy can be viewed here.',
      section5Title: '5. Entrustment of Personal Information Processing',
      section5Desc: 'This app entrusts Google Gemini API service for providing card analysis features.',
      section6Title: '6. Rights and Obligations of Information Subjects and Methods of Exercise',
      section6Desc: 'Users may exercise the following rights at any time:',
      section6List1: 'Request to access personal information',
      section6List2: 'Request to delete personal information (use "Data Reset" feature in Parent Mode)',
      section7Title: '7. Measures to Ensure Security of Personal Information',
      section7List1: 'All data is stored only on the device',
      section7List2: 'Data transmission to external servers is minimized',
      section7List3: 'Images are temporarily transmitted to Google API only during card analysis, and only results are stored',
      section8Title: '8. Changes to Privacy Policy',
      section8Desc: 'This privacy policy takes effect from January 1, 2024. In case of additions, deletions, or corrections due to laws and policies, notice will be given through in-app announcements 7 days before the implementation of changes.',
      contactTitle: 'Contact',
      contactDesc: 'If you have any questions about this privacy policy, please contact us through app reviews.'
    },
    
    // Terms of Service
    terms: {
      title: 'Terms of Service',
      goBack: '← Go Back',
      copyright: '⚠️ Copyright Notice: This app is a tool to help analyze monster card images. Pokémon is a trademark and copyright of Nintendo, Creatures Inc., and Game Freak Inc. This app is not an official Pokémon app and is not affiliated with The Pokémon Company.',
      article1Title: 'Article 1 (Purpose)',
      article1Desc: 'These terms and conditions are intended to stipulate the conditions and procedures for using the Pocket Card Hunter: Monster Raising app (hereinafter "this app"), and the rights, obligations, and responsibilities of users and developers.',
      article2Title: 'Article 2 (Definitions)',
      article2App: '"App" refers to the Pocket Card Hunter: Monster Raising service.',
      article2User: '"User" refers to a person who accesses this app and receives services provided by the developer in accordance with these terms.',
      article2Service: '"Service" refers to the monster card scanning and analysis service provided by the developer.',
      article3Title: 'Article 3 (Posting and Revision of Terms)',
      article3Desc: 'These terms are posted within the app, and in case of additions, deletions, or corrections due to laws and policies, notice will be given through in-app announcements 7 days before the implementation of changes.',
      article4Title: 'Article 4 (Provision and Change of Service)',
      article4ListTitle: 'This app provides the following services:',
      article4List1: 'Monster card scanning and AI analysis features',
      article4List2: 'Collection management features for collected cards',
      article4List3: 'Card value estimation features (Parent Mode)',
      article4Change: 'The developer may change the content of services when necessary and will notify users in advance of such changes.',
      article5Title: 'Article 5 (Service Suspension)',
      article5Desc: 'The developer may temporarily suspend service provision in case of maintenance, replacement, or failure of information and communication facilities such as computers, or communication interruptions.',
      article6Title: 'Article 6 (User Obligations)',
      article6Desc: 'Users shall not engage in the following acts:',
      article6List1: 'Unauthorized use of others\' information',
      article6List2: 'Modification of information posted by the developer',
      article6List3: 'Modification of information posted on this app',
      article6List4: 'Acts objectively recognized as related to crimes',
      article6List5: 'Other acts in violation of related laws',
      article7Title: 'Article 7 (Privacy Protection)',
      article7Desc: 'The developer strives to protect users\' personal information. For details, please refer to the Privacy Policy.',
      article8Title: 'Article 8 (Disclaimer)',
      article8List1: 'The developer is exempt from liability for service provision when unable to provide services due to natural disasters or similar force majeure.',
      article8List2: 'The developer is not responsible for service interruptions caused by the user\'s fault.',
      article8List3: 'The developer is not responsible for loss of expected profits from using the service, nor for damages caused by materials obtained through the service.',
      article8List4: 'The developer is not responsible for disputes arising between users or between users and third parties through the service.',
      article8List5: 'The accuracy of card analysis results is not guaranteed, and provided information is for reference only.',
      article9Title: 'Article 9 (Governing Law and Jurisdiction)',
      article9Desc: 'These terms are governed by and interpreted in accordance with the laws of the Republic of Korea, and disputes between the developer and users shall be subject to the jurisdiction of Korean courts.',
      supplementTitle: 'Supplementary Provisions',
      supplementDesc: 'These terms take effect from January 1, 2024.'
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
      storageQuotaExceeded: 'Opslagruimte is vol. Verwijder enkele kaarten in Oudermodus en probeer het opnieuw.',
      storageQuotaExceededTitle: 'Opslagruimte Vol',
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
    },
    
    // ParentalGate component
    parentalGate: {
      newPassword: 'Nieuw Beveiligingswachtwoord Instellen',
      confirmPassword: 'Wachtwoord Bevestigen',
      enterPassword: 'Voer Beveiligingswachtwoord In',
      mathChallenge: 'Volwassenenverificatie (Wiskundige Vraag)',
      enter4Digits: 'Voer een 4-cijferig nummer in.',
      enterAgain: 'Voer opnieuw in.',
      enterPassword4Digits: 'Voer uw 4-cijferig wachtwoord in.',
      enterAnswer: 'Voer het antwoord op de onderstaande vraag in.',
      resetPassword: 'Wachtwoord Resetten',
      wrongPassword: 'Onjuist wachtwoord.',
      passwordMismatch: 'Wachtwoorden komen niet overeen. Stel opnieuw in vanaf het begin.',
      wrongAnswer: 'Onjuist. Probeer het opnieuw.',
      resetSuccess: 'Reset voltooid. Stel een nieuw wachtwoord in.',
      answerPlaceholder: 'Voer antwoord in',
      cancel: 'Annuleren',
      confirm: 'Bevestigen'
    },
    
    // ParentMode page
    parentMode: {
      title: 'Ouder Instellingen',
      secureConnection: 'Veilige Verbinding',
      collectionStatus: 'Verzamelstatus',
      totalCollectedCards: 'Totaal Verzamelde Kaarten',
      lastActivity: 'Laatste Activiteit',
      valueAnalysis: 'Waarde Analyse',
      calculating: 'Berekenen...',
      totalEstimatedValue: 'Totale Geschatte Waarde',
      averagePrice: 'Gemiddelde Prijs',
      cardList: 'Bezit Kaartenlijst',
      loading: 'Gegevens laden...',
      monster: 'Monster',
      estimatedValue: 'Geschatte Waarde',
      range: 'Bereik',
      aiAnalysis: 'AI Analyse',
      estimated: 'Geschat',
      dataReset: 'Gegevens Resetten',
      dataResetDescription: 'Verwijdert alle kaartverzamelgegevens van uw kind.',
      deleteData: 'Gegevens Verwijderen',
      deleteConfirm: 'Weet u zeker dat u alle gegevens wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.',
      deleteSuccess: 'Alle gegevens zijn verwijderd.'
    },
    
    // Partner monster names
    partners: {
      fire: {
        name: 'Ignis',
        stages: {
          1: 'Ignis',
          2: 'Ignis Krijger',
          3: 'Ignis Draak'
        }
      },
      water: {
        name: 'Aqua',
        stages: {
          1: 'Aqua',
          2: 'Aqua Wachter',
          3: 'Aqua Heer'
        }
      },
      grass: {
        name: 'Terra',
        stages: {
          1: 'Terra',
          2: 'Terra Geest',
          3: 'Terra Meester'
        }
      }
    },
    
    // Privacy Policy
    privacy: {
      title: 'Privacybeleid',
      goBack: '← Terug',
      section1Title: '1. Doel van Verwerking van Persoonsgegevens',
      section1Desc: 'Pocket Kaart Jager: Monster Opvoeding verwerkt persoonsgegevens voor de volgende doeleinden:',
      section1List1: 'Bieden van kaartscan- en analysefuncties',
      section1List2: 'Opslaan en beheren van verzamelgegevens',
      section1List3: 'Verbeteren van app-functies en gebruikerservaring',
      section2Title: '2. Verzamelde Persoonsgegevens',
      section2Desc: 'Deze app verzamelt de volgende informatie:',
      section2Camera: 'Cameramachtiging: Vereist voor het scannen van monsterkaarten',
      section2Storage: 'Opgeslagen Gegevens: Gescande kaartafbeeldingen en analyseresultaten worden alleen opgeslagen in lokale opslag op het apparaat',
      section2ApiKey: 'API-sleutel: De in Ouder Modus ingestelde Gemini API-sleutel wordt alleen op het apparaat opgeslagen',
      section2Important: '⚠️ Belangrijk: Alle gegevens worden alleen op het apparaat van de gebruiker opgeslagen en worden niet naar externe servers verzonden.',
      section3Title: '3. Verwerking en Bewaartermijn van Persoonsgegevens',
      section3Desc: 'Alle gegevens worden bewaard in lokale opslag op het apparaat totdat de gebruiker deze verwijdert. Gebruikers kunnen op elk moment alle gegevens verwijderen via de functie "Gegevens Resetten" in Ouder Modus.',
      section4Title: '4. Doorgifte van Persoonsgegevens aan Derden',
      section4Desc: 'Deze app geeft persoonsgegevens van gebruikers niet door aan derden. Echter, voor kaartanalysefuncties wordt Google\'s Gemini API gebruikt, en tijdens dit proces kunnen afbeeldingsgegevens naar Google-servers worden verzonden. Het privacybeleid van Google kan hier worden bekeken.',
      section5Title: '5. Uitbesteding van Verwerking van Persoonsgegevens',
      section5Desc: 'Deze app besteedt Google Gemini API-service uit voor het bieden van kaartanalysefuncties.',
      section6Title: '6. Rechten en Verplichtingen van Betrokkenen en Methoden van Uitoefening',
      section6Desc: 'Gebruikers kunnen te allen tijde de volgende rechten uitoefenen:',
      section6List1: 'Verzoek tot inzage in persoonsgegevens',
      section6List2: 'Verzoek tot verwijdering van persoonsgegevens (gebruik de functie "Gegevens Resetten" in Ouder Modus)',
      section7Title: '7. Maatregelen ter Waarborging van Beveiliging van Persoonsgegevens',
      section7List1: 'Alle gegevens worden alleen op het apparaat opgeslagen',
      section7List2: 'Gegevensoverdracht naar externe servers wordt geminimaliseerd',
      section7List3: 'Afbeeldingen worden tijdelijk alleen tijdens kaartanalyse naar Google API verzonden, en alleen resultaten worden opgeslagen',
      section8Title: '8. Wijzigingen in Privacybeleid',
      section8Desc: 'Dit privacybeleid treedt in werking vanaf 1 januari 2024. In geval van toevoegingen, verwijderingen of correcties als gevolg van wetten en beleid, wordt 7 dagen voor de uitvoering van wijzigingen kennisgeving gedaan via mededelingen in de app.',
      contactTitle: 'Contact',
      contactDesc: 'Als u vragen heeft over dit privacybeleid, neem dan contact met ons op via app-beoordelingen.'
    },
    
    // Terms of Service
    terms: {
      title: 'Servicevoorwaarden',
      goBack: '← Terug',
      copyright: '⚠️ Auteursrechtelijke Kennisgeving: Deze app is een hulpmiddel om monsterkaartafbeeldingen te analyseren. Pokémon is een handelsmerk en auteursrecht van Nintendo, Creatures Inc. en Game Freak Inc. Deze app is geen officiële Pokémon-app en is niet gelieerd aan The Pokémon Company.',
      article1Title: 'Artikel 1 (Doel)',
      article1Desc: 'Deze voorwaarden zijn bedoeld om de voorwaarden en procedures voor het gebruik van de Pocket Kaart Jager: Monster Opvoeding app (hierna "deze app") te regelen, en de rechten, verplichtingen en verantwoordelijkheden van gebruikers en ontwikkelaars.',
      article2Title: 'Artikel 2 (Definities)',
      article2App: '"App" verwijst naar de Pocket Kaart Jager: Monster Opvoeding service.',
      article2User: '"Gebruiker" verwijst naar een persoon die toegang heeft tot deze app en diensten ontvangt die door de ontwikkelaar worden verstrekt in overeenstemming met deze voorwaarden.',
      article2Service: '"Service" verwijst naar de monsterkaartscan- en analyseservice die door de ontwikkelaar wordt verstrekt.',
      article3Title: 'Artikel 3 (Posting en Herziening van Voorwaarden)',
      article3Desc: 'Deze voorwaarden worden in de app gepost, en in geval van toevoegingen, verwijderingen of correcties als gevolg van wetten en beleid, wordt 7 dagen voor de uitvoering van wijzigingen kennisgeving gedaan via mededelingen in de app.',
      article4Title: 'Artikel 4 (Verstrekking en Wijziging van Service)',
      article4ListTitle: 'Deze app biedt de volgende diensten:',
      article4List1: 'Monsterkaartscan- en AI-analysefuncties',
      article4List2: 'Verzamelbeheerfuncties voor verzamelde kaarten',
      article4List3: 'Kaartwaardeschattingfuncties (Ouder Modus)',
      article4Change: 'De ontwikkelaar kan de inhoud van diensten indien nodig wijzigen en zal gebruikers vooraf op de hoogte stellen van dergelijke wijzigingen.',
      article5Title: 'Artikel 5 (Serviceonderbreking)',
      article5Desc: 'De ontwikkelaar kan de serviceverlening tijdelijk opschorten in geval van onderhoud, vervanging of storing van informatie- en communicatiefaciliteiten zoals computers, of communicatieonderbrekingen.',
      article6Title: 'Artikel 6 (Gebruikersverplichtingen)',
      article6Desc: 'Gebruikers mogen de volgende handelingen niet verrichten:',
      article6List1: 'Ongeautoriseerd gebruik van informatie van anderen',
      article6List2: 'Wijziging van door de ontwikkelaar geposte informatie',
      article6List3: 'Wijziging van op deze app geposte informatie',
      article6List4: 'Handelingen die objectief worden erkend als gerelateerd aan misdrijven',
      article6List5: 'Andere handelingen in strijd met gerelateerde wetten',
      article7Title: 'Artikel 7 (Privacybescherming)',
      article7Desc: 'De ontwikkelaar streeft ernaar de persoonsgegevens van gebruikers te beschermen. Voor details, zie het Privacybeleid.',
      article8Title: 'Artikel 8 (Vrijwaring)',
      article8List1: 'De ontwikkelaar is vrijgesteld van aansprakelijkheid voor serviceverlening wanneer niet in staat om diensten te verlenen als gevolg van natuurrampen of soortgelijke overmacht.',
      article8List2: 'De ontwikkelaar is niet verantwoordelijk voor serviceonderbrekingen veroorzaakt door de fout van de gebruiker.',
      article8List3: 'De ontwikkelaar is niet verantwoordelijk voor verlies van verwachte winsten door het gebruik van de service, noch voor schade veroorzaakt door materialen verkregen via de service.',
      article8List4: 'De ontwikkelaar is niet verantwoordelijk voor geschillen die ontstaan tussen gebruikers of tussen gebruikers en derden via de service.',
      article8List5: 'De nauwkeurigheid van kaartanalyseresultaten is niet gegarandeerd, en verstrekte informatie is alleen ter referentie.',
      article9Title: 'Artikel 9 (Toepasselijk Recht en Rechtsbevoegdheid)',
      article9Desc: 'Deze voorwaarden worden beheerst door en uitgelegd in overeenstemming met de wetten van de Republiek Korea, en geschillen tussen de ontwikkelaar en gebruikers vallen onder de rechtsbevoegdheid van Koreaanse rechtbanken.',
      supplementTitle: 'Aanvullende Bepalingen',
      supplementDesc: 'Deze voorwaarden treden in werking vanaf 1 januari 2024.'
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