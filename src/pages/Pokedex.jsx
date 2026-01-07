import { useState, useEffect, useMemo } from 'react'
import { getCardsFromPokedex, deleteCardFromPokedex } from '../utils/pokedexUtils'
import { calculateXP, getPartnerStatus } from '../utils/partnerUtils'
import StarterSelection from '../components/StarterSelection'

export default function Pokedex() {
  const [cards, setCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [partnerId, setPartnerId] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)

  useEffect(() => {
    try {
      const savedCards = getCardsFromPokedex()
      setCards(savedCards || [])

      // 파트너 정보 로드
      const savedPartner = localStorage.getItem('partnerId')
      setPartnerId(savedPartner)
    } catch (error) {
      console.error('도감 데이터 로드 에러:', error)
      setCards([])
      setPartnerId(null)
    }
  }, [])

  const handleStarterSelect = (id) => {
    localStorage.setItem('partnerId', id)
    setPartnerId(id)
  }

  // 타입을 영어 코드로 정규화하는 함수 (먼저 정의)
  const normalizeType = (type) => {
    if (!type) {
      console.warn('normalizeType: 타입이 없음');
      return 'normal';
    }
    
    // 문자열로 변환
    const typeStr = String(type).trim();
    
    // 'all'은 특별 처리 (필터용)
    if (typeStr.toLowerCase() === 'all') {
      return 'all';
    }
    
    const koreanToEnglish = {
      '노말': 'normal',
      '불꽃': 'fire', 
      '물': 'water', 
      '전기': 'electric',
      '풀': 'grass',
      '얼음': 'ice',
      '격투': 'fighting',
      '독': 'poison',
      '땅': 'ground',
      '비행': 'flying',
      '에스퍼': 'psychic',
      '벌레': 'bug',
      '바위': 'rock',
      '고스트': 'ghost',
      '드래곤': 'dragon',
      '악': 'dark',
      '강철': 'steel',
      '페어리': 'fairy'
    };
    
    // 한국어 타입이면 영어로 변환 (정확한 매칭)
    if (koreanToEnglish.hasOwnProperty(typeStr)) {
      const result = koreanToEnglish[typeStr];
      return result;
    }
    
    // 이미 영어 코드인 경우 (소문자 변환) - 모든 포켓몬 타입 지원
    const lowerType = typeStr.toLowerCase();
    const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    if (allTypes.includes(lowerType)) {
      return lowerType;
    }
    
    // 디버깅: 알 수 없는 타입 로그
    console.warn('알 수 없는 타입:', type, '(원본:', typeStr, ') - 기본값 normal 반환');
    return 'normal';
  }

  // 파트너 상태 계산 (에러 방지)
  let totalXP = 0;
  let partnerStatus = null;
  
  try {
    totalXP = calculateXP(cards) || 0;
    partnerStatus = partnerId ? getPartnerStatus(partnerId, totalXP) : null;
  } catch (error) {
    console.error('파트너 상태 계산 에러:', error);
    totalXP = 0;
    partnerStatus = null;
  }

  // 필터링 로직 (에러 방지)
  const filteredCards = useMemo(() => {
    try {
      if (!cards || !Array.isArray(cards)) return []
      
      let filtered = cards

      // 타입 필터 (한국어/영어 모두 처리)
      if (selectedType !== 'all') {
        filtered = filtered.filter(card => {
          try {
            // type 또는 typeKorean 확인
            const cardType = card?.type || card?.typeKorean || '';
            return normalizeType(cardType) === selectedType
          } catch {
            return false
          }
        })
      }

      // 희귀도 필터
      if (selectedRarity !== 'all') {
        filtered = filtered.filter(card => {
          try {
            return card?.rarity === parseInt(selectedRarity)
          } catch {
            return false
          }
        })
      }

      // 검색 필터
      if (searchTerm) {
        filtered = filtered.filter(card => {
          try {
            return (
              card?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              card?.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          } catch {
            return false
          }
        })
      }

      return filtered
    } catch (error) {
      console.error('필터링 에러:', error)
      return []
    }
  }, [cards, selectedType, selectedRarity, searchTerm])

  // 정렬 (에러 방지)
  const sortedCards = useMemo(() => {
    try {
      if (!filteredCards || !Array.isArray(filteredCards)) return []
      
      const sorted = [...filteredCards].sort((a, b) => {
        try {
          switch (sortBy) {
            case 'hp':
              return (b?.hp || 0) - (a?.hp || 0)
            case 'rarity':
              return (b?.rarity || 0) - (a?.rarity || 0)
            case 'name':
              return (a?.name || '').localeCompare(b?.name || '')
            case 'power':
              return (b?.powerLevel || 0) - (a?.powerLevel || 0)
            case 'latest':
            default:
              const dateA = a?.scannedAt ? new Date(a.scannedAt).getTime() : 0
              const dateB = b?.scannedAt ? new Date(b.scannedAt).getTime() : 0
              return dateB - dateA
          }
        } catch {
          return 0
        }
      })
      return sorted
    } catch (error) {
      console.error('정렬 에러:', error)
      return []
    }
  }, [filteredCards, sortBy])

  // 통계 계산 (에러 방지)
  const stats = useMemo(() => {
    try {
      if (!cards || !Array.isArray(cards)) {
        return { rarityCounts: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}, legendCards: 0, ultraRareCards: 0, rareCards: 0 }
      }
      
      const rarityCounts = {
        1: cards.filter(c => c?.rarity === 1).length,
        2: cards.filter(c => c?.rarity === 2).length,
        3: cards.filter(c => c?.rarity === 3).length,
        4: cards.filter(c => c?.rarity === 4).length,
        5: cards.filter(c => c?.rarity === 5).length,
      }
      // 희귀도 기반 카드 수
      const legendCards = rarityCounts[5] || 0 // 5성 = 전설
      const ultraRareCards = rarityCounts[4] || 0 // 4성 = 초희귀
      const rareCards = rarityCounts[3] || 0 // 3성 = 희귀
      
      return { rarityCounts, legendCards, ultraRareCards, rareCards }
    } catch (error) {
      console.error('통계 계산 에러:', error)
      return { rarityCounts: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}, legendCards: 0, ultraRareCards: 0, rareCards: 0 }
    }
  }, [cards])

  const deleteCard = (id) => {
    if (window.confirm('정말 이 몬스터 카드를 삭제하시겠습니까?')) {
      try {
        const updatedCards = deleteCardFromPokedex(id)
        if (updatedCards.length === cards.length) {
          alert('삭제에 실패했습니다. (ID 불일치)')
          return
        }
        setCards(updatedCards)
        setTimeout(() => {
          const currentCards = getCardsFromPokedex()
          if (currentCards.length !== updatedCards.length) {
            window.location.reload()
          }
        }, 300)
      } catch (error) {
        console.error('Delete error:', error)
        alert('삭제 중 오류가 발생했습니다.')
      }
    }
  }

  // 타입별 카드 수 (한국어/영어 모두 처리, 에러 방지) - 모든 타입 지원
  const typeCounts = useMemo(() => {
    try {
      const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
      
      if (!cards || !Array.isArray(cards)) {
        const emptyCounts = { all: 0 };
        allTypes.forEach(type => { emptyCounts[type] = 0; });
        return emptyCounts;
      }
      
      const counts = { all: cards.length };
      allTypes.forEach(type => { counts[type] = 0; });
      
      cards.forEach(card => {
        try {
          const cardType = card?.type || card?.typeKorean || '';
          const normalizedType = normalizeType(cardType);
          if (allTypes.includes(normalizedType)) {
            counts[normalizedType]++;
          }
        } catch (err) {
          console.warn('카드 타입 정규화 에러:', card?.name, card?.type, err);
        }
      });
      
      return counts;
    } catch (error) {
      console.error('타입별 카드 수 계산 에러:', error)
      const emptyCounts = { all: 0 };
      const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
      allTypes.forEach(type => { emptyCounts[type] = 0; });
      return emptyCounts;
    }
  }, [cards])

  // 희귀도별 카드 수 (에러 방지)
  const rarityCounts = useMemo(() => {
    try {
      if (!cards || !Array.isArray(cards)) {
        return { all: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
      
      return {
        all: cards.length,
        1: cards.filter(c => c?.rarity === 1).length,
        2: cards.filter(c => c?.rarity === 2).length,
        3: cards.filter(c => c?.rarity === 3).length,
        4: cards.filter(c => c?.rarity === 4).length,
        5: cards.filter(c => c?.rarity === 5).length,
      }
    } catch (error) {
      console.error('희귀도별 카드 수 계산 에러:', error)
      return { all: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    }
  }, [cards])

  // 타입 아이콘 (한국어/영어 모두 처리) - 모든 타입 지원
  const getTypeIcon = (type) => {
    // 'all'은 직접 처리 (normalizeType 호출 전)
    if (String(type).toLowerCase() === 'all') {
      return '🌈';
    }
    const englishType = normalizeType(type);
    const icons = {
      normal: '⚪', fire: '🔥', water: '💧', electric: '⚡',
      grass: '🌿', ice: '❄️', fighting: '🥊', poison: '☠️',
      ground: '⛰️', flying: '🕊️', psychic: '🔮', bug: '🐛',
      rock: '🪨', ghost: '👻', dragon: '🐉', dark: '🌑',
      steel: '⚙️', fairy: '✨', all: '🌈'
    }
    return icons[englishType] || '✨'
  }

  // 타입 색상 (한국어/영어 모두 처리) - 모든 타입 지원
  const getTypeColor = (type) => {
    // 'all'은 직접 처리 (normalizeType 호출 전)
    if (String(type).toLowerCase() === 'all') {
      return 'bg-gray-800';
    }
    const englishType = normalizeType(type);
    const colors = {
      normal: 'bg-gray-400', fire: 'bg-red-500', water: 'bg-blue-500', 
      electric: 'bg-yellow-400', grass: 'bg-green-500', ice: 'bg-cyan-300',
      fighting: 'bg-red-700', poison: 'bg-purple-500', ground: 'bg-yellow-700',
      flying: 'bg-indigo-300', psychic: 'bg-pink-500', bug: 'bg-green-600',
      rock: 'bg-yellow-800', ghost: 'bg-purple-700', dragon: 'bg-purple-600',
      dark: 'bg-gray-700', steel: 'bg-gray-500', fairy: 'bg-pink-300'
    }
    return colors[englishType] || 'bg-gray-500'
  }

  const getTypeLabel = (type) => {
    // 'all'은 직접 처리 (normalizeType 호출 전)
    if (String(type).toLowerCase() === 'all') {
      return '전체';
    }
    // normalizeType 함수 사용
    const englishType = normalizeType(type);
    
    const labels = {
      normal: '노말', fire: '불꽃', water: '물', electric: '전기',
      grass: '풀', ice: '얼음', fighting: '격투', poison: '독',
      ground: '땅', flying: '비행', psychic: '에스퍼', bug: '벌레',
      rock: '바위', ghost: '고스트', dragon: '드래곤', dark: '악',
      steel: '강철', fairy: '페어리', all: '전체'
    }
    return labels[englishType] || type
  }

  // 희귀도별 별 표시
  const renderRarityStars = (rarity) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rarity ? 'text-yellow-400' : 'text-gray-200'}
        >
          ★
        </span>
      )
    }
    return <div className="flex gap-0.5 text-xs">{stars}</div>
  }

  // 희귀도 배경색 및 설명
  const getRarityColor = (rarity) => {
    const colors = {
      1: 'from-gray-100 to-gray-200',
      2: 'from-blue-100 to-blue-200',
      3: 'from-purple-100 to-purple-200',
      4: 'from-orange-100 to-orange-200',
      5: 'from-yellow-100 via-yellow-200 to-yellow-300'
    }
    return colors[rarity] || colors[1]
  }
  
  const getRarityDescription = (rarity) => {
    const descriptions = {
      5: '👑 전설의 카드예요! 정말 특별해요!',
      4: '💎 초희귀 카드예요! 엄청나게 귀해요!',
      3: '✨ 희귀 카드예요! 좋은 카드예요!',
      2: '⭐ 보통 카드예요! 괜찮은 카드예요!',
      1: '🔸 일반 카드예요! 기본 카드예요!'
    }
    return descriptions[rarity] || descriptions[1]
  }


  // 파트너 선택 전이라면 선택 화면 노출 (에러 방지)
  try {
    if (!partnerId) {
      return <StarterSelection onSelect={handleStarterSelect} />
    }
  } catch (error) {
    console.error('파트너 선택 화면 렌더링 에러:', error)
    // 에러 발생 시에도 기본 화면 표시
  }

  return (
    <div className="min-h-screen pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-pokemon-dark font-display drop-shadow-sm">
          📚 내 몬스터 도감
        </h2>
        {/* 파트너 미니 표시 (모바일용) */}
        <div className="sm:hidden flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          <img src={partnerStatus?.stage.image} alt={partnerStatus?.stage.name} className="w-8 h-8 object-contain" />
          <span className="text-sm font-bold text-gray-700">{partnerStatus?.stage.name}</span>
        </div>
      </div>

      {/* 파트너 몬스터 현황판 */}
      {partnerStatus && (
        <div className="mb-8 bg-white rounded-3xl p-6 border-4 border-pokemon-yellow shadow-xl relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 ${partnerStatus.color} opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20`}></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className={`w-28 h-28 ${partnerStatus.color} bg-opacity-10 rounded-full flex items-center justify-center border-4 ${partnerStatus.borderColor} shadow-lg transition-transform duration-500 hover:scale-110 overflow-hidden`}>
                <img
                  src={partnerStatus.stage.image}
                  alt={partnerStatus.stage.name}
                  className="w-full h-full object-contain filter drop-shadow-md animate-bounce-slow"
                />
              </div>
              <div className="absolute -bottom-2 w-full text-center">
                <span className={`bg-white px-3 py-1 rounded-full text-sm font-black shadow-sm border ${partnerStatus.borderColor} ${partnerStatus.textColor}`}>
                  Lv.{partnerStatus.stage?.level || partnerStatus.currentLevel || 1}
                </span>
              </div>
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-2">
                <h3 className={`text-2xl font-black ${partnerStatus.textColor}`}>
                  {partnerStatus.stage.name}
                </h3>
                <span className="text-gray-400 font-bold text-sm mb-1">
                  (현재 XP: {totalXP})
                </span>
              </div>
              {partnerStatus.nextStage ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-500">
                    <span>다음 진화: {partnerStatus.nextStage.name} (레벨 {partnerStatus.nextStage.minLevel})</span>
                    {partnerStatus.levelForNext !== null && partnerStatus.levelForNext > 0 ? (
                      <span>레벨 {partnerStatus.levelForNext} 남음</span>
                    ) : (
                      <span>XP: {partnerStatus.xpForNext.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="h-6 bg-gray-100 rounded-full overflow-hidden border border-gray-200 relative">
                    <div
                      className={`h-full ${partnerStatus.color} transition-all duration-1000 relative`}
                      style={{ width: `${partnerStatus.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 text-right">
                    * 희귀한 카드를 모으면 더 빨리 성장해요! (현재 레벨: {partnerStatus.currentLevel})
                  </p>
                </div>
              ) : (
                <div className="py-2 px-4 bg-yellow-50 rounded-xl border border-yellow-200 text-yellow-700 font-bold text-center sm:text-left">
                  🏆 최종 진화 완료! 정말 대단해요!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 통계 요약 */}
      {cards.length > 0 && (
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
            <div className="text-xs font-bold text-blue-600 mb-1">총 카드</div>
            <div className="text-2xl font-black text-blue-800">{cards.length}장</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-200">
            <div className="text-xs font-bold text-yellow-600 mb-1">⭐ 5성 (전설)</div>
            <div className="text-2xl font-black text-yellow-800">{stats.legendCards}장</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
            <div className="text-xs font-bold text-purple-600 mb-1">⭐ 4성 (초희귀)</div>
            <div className="text-2xl font-black text-purple-800">{stats.ultraRareCards}장</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
            <div className="text-xs font-bold text-green-600 mb-1">⭐ 3성 (희귀)</div>
            <div className="text-2xl font-black text-green-800">{stats.rareCards}장</div>
          </div>
        </div>
      )}

      {/* 검색 및 필터 */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
          <input
            type="text"
            placeholder="몬스터 이름 또는 별명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 shadow-sm focus:border-pokemon-blue focus:ring-4 focus:ring-pokemon-blue/20 transition-all text-lg font-bold"
          />
        </div>

        {/* 필터 탭들 */}
        <div className="space-y-3">
          {/* 타입 필터 */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-2 px-1">타입별</div>
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
              {['all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-sm border-2 ${selectedType === type
                    ? 'bg-pokemon-dark text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200'
                    }`}
                >
                  <span>{getTypeIcon(type)}</span>
                  <span className="text-sm">{getTypeLabel(type)}</span>
                  <span className="text-xs bg-black/10 px-1.5 py-0.5 rounded-full">
                    {typeCounts[type]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 희귀도 필터 */}
          <div>
            <div className="text-xs font-bold text-gray-500 mb-2 px-1">희귀도별</div>
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
              {['all', '5', '4', '3', '2', '1'].map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-sm border-2 ${selectedRarity === rarity
                    ? 'bg-yellow-400 text-yellow-900 border-yellow-600'
                    : 'bg-white text-gray-600 border-gray-200'
                    }`}
                >
                  {rarity === 'all' ? (
                    <>
                      <span>⭐</span>
                      <span className="text-sm">전체</span>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < parseInt(rarity) ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                        ))}
                      </div>
                      <span className="text-xs bg-black/10 px-1.5 py-0.5 rounded-full">
                        {rarityCounts[rarity]}
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>


          {/* 정렬 옵션 */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500">정렬:</span>
            {[
              { key: 'latest', label: '최신순', icon: '🕐' },
              { key: 'rarity', label: '희귀도순', icon: '⭐' },
              { key: 'hp', label: 'HP순', icon: '❤️' },
              { key: 'power', label: '파워순', icon: '⚡' },
              { key: 'name', label: '이름순', icon: '🔤' }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${sortBy === option.key
                  ? 'bg-pokemon-blue text-white border-pokemon-dark'
                  : 'bg-white text-gray-600 border-gray-200'
                  }`}
              >
                <span className="mr-1">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      {sortedCards.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4 grayscale opacity-50">⚡️</div>
          <p className="text-gray-500 font-bold text-lg">검색 결과가 없어요!</p>
          <p className="text-gray-400">다른 필터를 선택해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCards.map((card) => {
            const isExpanded = expandedCard === card.id
            
            return (
              <div
                key={card.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ring-4 ${
                  isExpanded ? 'ring-pokemon-yellow' : 'ring-transparent hover:ring-pokemon-yellow'
                }`}
              >
                {/* 희귀도에 따른 배경 그라데이션 */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${getRarityColor(card.rarity)} opacity-30`}></div>

                <div className="relative p-4">
                  {/* 헤더: 이미지와 기본 정보 */}
                  <div className="flex gap-3 mb-3">
                    {/* 이미지 영역 */}
                    <div className="relative flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-inner">
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                          이미지 없음
                        </div>
                      )}
                      {/* 타입 배지 */}
                      <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
                        <span className="text-base leading-none">{getTypeIcon(card.type)}</span>
                      </div>
                    </div>

                    {/* 기본 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-lg font-black text-gray-800 font-display leading-tight truncate">
                          {card.name || '???'}
                        </h3>
                      </div>

                      {card.nickname && (
                        <p className="text-xs text-pokemon-blue font-bold mb-2 truncate">"{card.nickname}"</p>
                      )}

                      {/* 희귀도 */}
                      <div className="mb-2">
                        {renderRarityStars(card.rarity || 1)}
                      </div>

                      {/* HP & 파워 레벨 */}
                      <div className="flex gap-2 mb-2">
                        <div className="bg-red-50 px-2 py-0.5 rounded text-xs font-bold text-red-600 border border-red-200">
                          ❤️ HP {card.hp || 50}
                        </div>
                        <div className="bg-yellow-50 px-2 py-0.5 rounded text-xs font-bold text-yellow-600 border border-yellow-200">
                          ⚡ {card.powerLevel || 50}
                        </div>
                      </div>

                      {/* 타입 */}
                      <div className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded text-xs font-bold border border-gray-200">
                        <span>{getTypeIcon(card.type)}</span>
                        <span>{getTypeLabel(card.type)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 희귀도 설명 */}
                  <div className={`mb-3 p-2.5 rounded-lg border-2 bg-gradient-to-r ${getRarityColor(card.rarity)} border-opacity-50`}>
                    <div className="text-xs font-bold text-gray-700 text-center">
                      {getRarityDescription(card.rarity || 1)}
                    </div>
                  </div>

                  {/* 확장 정보 토글 버튼 */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                    className="w-full py-2 text-xs font-bold text-gray-600 hover:text-pokemon-blue transition-colors border border-gray-200 rounded-lg hover:border-pokemon-blue mb-3"
                  >
                    {isExpanded ? '▲ 간략히 보기' : '▼ 더 보기'}
                  </button>

                  {/* 확장된 상세 정보 */}
                  {isExpanded && (
                    <div className="space-y-2 mb-3 pt-2 border-t border-gray-200">
                      {/* 설명 */}
                      {card.description && (
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <div className="text-xs font-bold text-gray-500 mb-1">설명</div>
                          <div className="text-xs text-gray-700">{card.description}</div>
                        </div>
                      )}

                      {/* 강점/약점 */}
                      <div className="grid grid-cols-2 gap-2">
                        {card.strongAgainst && (
                          <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                            <div className="text-xs font-bold text-green-600 mb-1">💪 강점</div>
                            <div className="text-xs text-green-700 font-bold">{getTypeLabel(card.strongAgainst)}</div>
                          </div>
                        )}
                        {card.weakAgainst && (
                          <div className="bg-red-50 p-2 rounded-lg border border-red-200">
                            <div className="text-xs font-bold text-red-600 mb-1">⚠️ 약점</div>
                            <div className="text-xs text-red-700 font-bold">{getTypeLabel(card.weakAgainst)}</div>
                          </div>
                        )}
                      </div>

                      {/* 수집 날짜 */}
                      <div className="text-xs text-gray-400 text-center pt-1">
                        📅 {new Date(card.scannedAt || card.createdAt || Date.now()).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  )}

                  {/* 삭제 버튼 */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteCard(card.id)
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      title="삭제"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
