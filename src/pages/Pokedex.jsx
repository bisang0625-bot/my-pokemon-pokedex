import { useState, useEffect } from 'react'
import { getCardsFromPokedex, deleteCardFromPokedex } from '../utils/pokedexUtils'
import { calculateXP, getPartnerStatus } from '../utils/partnerUtils'
import StarterSelection from '../components/StarterSelection'

export default function Pokedex() {
  const [cards, setCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [partnerId, setPartnerId] = useState(null)

  useEffect(() => {
    const savedCards = getCardsFromPokedex()
    setCards(savedCards)

    // 파트너 정보 로드
    const savedPartner = localStorage.getItem('partnerId')
    setPartnerId(savedPartner)
  }, [])

  const handleStarterSelect = (id) => {
    localStorage.setItem('partnerId', id)
    setPartnerId(id)
  }

  // 파트너 상태 계산
  const totalXP = calculateXP(cards)
  const partnerStatus = partnerId ? getPartnerStatus(partnerId, totalXP) : null

  // 타입 필터링
  const typeFilteredCards = selectedType === 'all'
    ? cards
    : cards.filter(card => card.type === selectedType)

  // 검색 필터링
  const searchFilteredCards = typeFilteredCards.filter(card =>
    card.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 정렬
  const sortedCards = [...searchFilteredCards].sort((a, b) => {
    if (sortBy === 'hp') {
      return (b.hp || 0) - (a.hp || 0)
    } else if (sortBy === 'latest') {
      return new Date(b.scannedAt || 0) - new Date(a.scannedAt || 0)
    }
    return 0
  })

  const deleteCard = (id) => {
    if (window.confirm('정말 이 포켓몬 카드를 삭제하시겠습니까?')) {
      try {
        const updatedCards = deleteCardFromPokedex(id)

        // 삭제 전후 개수 비교
        if (updatedCards.length === cards.length) {
          alert('삭제에 실패했습니다. (ID 불일치)');
          return;
        }

        setCards(updatedCards)

        // 상태 업데이트가 즉시 반영되지 않는 경우를 대비한 강제 UI 갱신 (0.1초 후)
        setTimeout(() => {
          const currentCards = getCardsFromPokedex();
          if (currentCards.length !== updatedCards.length) {
            window.location.reload();
          }
        }, 300);

      } catch (error) {
        console.error('Delete error:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  }

  // 타입별 카드 수
  const typeCounts = {
    all: cards.length,
    fire: cards.filter(c => c.type === 'fire').length,
    water: cards.filter(c => c.type === 'water').length,
    grass: cards.filter(c => c.type === 'grass').length,
    electric: cards.filter(c => c.type === 'electric').length
  }

  // 타입 아이콘
  const getTypeIcon = (type) => {
    const icons = {
      fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
      psychic: '🔮', ice: '❄️', dragon: '🐉', dark: '🌑',
      fairy: '✨', normal: '⚪', fighting: '🥊',
      all: '🌈'
    }
    return icons[type] || '✨'
  }

  // 타입 색상 (배경용)
  const getTypeColor = (type) => {
    const colors = {
      fire: 'bg-red-500', water: 'bg-blue-500', grass: 'bg-green-500', electric: 'bg-yellow-400',
      psychic: 'bg-pink-500', ice: 'bg-cyan-300', dragon: 'bg-purple-600', dark: 'bg-gray-700',
      fairy: 'bg-pink-300', normal: 'bg-gray-400', fighting: 'bg-red-700',
    }
    return colors[type] || 'bg-gray-500'
  }

  const getTypeLabel = (type) => {
    const labels = {
      fire: '불꽃', water: '물', grass: '풀', electric: '전기',
      psychic: '에스퍼', ice: '얼음', dragon: '드래곤', dark: '악',
      fairy: '페어리', normal: '노말', fighting: '격투',
      all: '전체'
    }
    return labels[type] || type
  }

  // 파트너 선택 전이라면 선택 화면 노출
  if (!partnerId) {
    return <StarterSelection onSelect={handleStarterSelect} />
  }

  return (
    <div className="min-h-screen pb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-pokemon-dark font-display drop-shadow-sm">
          📚 내 포켓몬 도감
        </h2>
        {/* 파트너 미니 표시 (모바일용) */}
        <div className="sm:hidden flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          <img src={partnerStatus?.stage.image} alt={partnerStatus?.stage.name} className="w-8 h-8 object-contain" />
          <span className="text-sm font-bold text-gray-700">{partnerStatus?.stage.name}</span>
        </div>
      </div>

      {/* 파트너 포켓몬 현황판 */}
      {partnerStatus && (
        <div className="mb-8 bg-white rounded-3xl p-6 border-4 border-pokemon-yellow shadow-xl relative overflow-hidden">
          {/* 배경 장식 */}
          <div className={`absolute top-0 right-0 w-64 h-64 ${partnerStatus.color} opacity-10 rounded-full blur-3xl transform translate-x-20 -translate-y-20`}></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            {/* 파트너 이미지 */}
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
                  Lv.{partnerStatus.stage.level}
                </span>
              </div>
            </div>

            {/* 정보 및 진행도 */}
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
                    <span>다음 진화: {partnerStatus.nextStage.name}</span>
                    <span>남은 XP: {partnerStatus.xpForNext}</span>
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
                    * 희귀한 카드를 모으면 더 빨리 성장해요!
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

      {/* 검색 및 필터 */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
          <input
            type="text"
            placeholder="포켓몬 이름 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 shadow-sm focus:border-pokemon-blue focus:ring-4 focus:ring-pokemon-blue/20 transition-all text-lg font-bold"
          />
        </div>

        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
          {['all', 'fire', 'water', 'grass', 'electric'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-sm border-b-4 active:border-b-0 active:translate-y-1 ${selectedType === type
                ? 'bg-pokemon-dark text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200'
                }`}
            >
              <span>{getTypeIcon(type)}</span>
              <span>{getTypeLabel(type)}</span>
              <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full">
                {typeCounts[type]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 */}
      {sortedCards.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4 grayscale opacity-50">⚡️</div>
          <p className="text-gray-500 font-bold text-lg">아직 잡은 포켓몬이 없어요!</p>
          <p className="text-gray-400">카메라로 포켓몬 카드를 스캔해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden ring-4 ring-transparent hover:ring-pokemon-yellow"
            >
              {/* 카드 배경 그라데이션 (타입 기반) */}
              <div className={`absolute top-0 left-0 w-full h-32 opacity-10 ${getTypeColor(card.type)}`}></div>

              {/* 이미지 영역 */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-3 border-2 border-gray-100 shadow-inner">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    이미지 없음
                  </div>
                )}
                {/* 홀로그램 효과 레이어 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />

                {/* 타입 배지 */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                  <span className="text-lg leading-none">{getTypeIcon(card.type)}</span>
                </div>
              </div>

              {/* 정보 영역 */}
              <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-black text-gray-800 font-display tracking-tight leading-tight">
                    {card.name || '???'}
                  </h3>
                  <div className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold text-gray-500">
                    HP {card.hp || 50}
                  </div>
                </div>

                {card.nickname && (
                  <p className="text-sm text-pokemon-blue font-bold mb-2">"{card.nickname}"</p>
                )}

                <div className="flex justify-between items-end mt-3 border-t pt-3 border-gray-100">
                  <span className="text-xs text-gray-400 font-bold">
                    {new Date(card.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteCard(card.id);
                    }}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
