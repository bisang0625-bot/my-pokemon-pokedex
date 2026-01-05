import { useState, useEffect } from 'react'
import { getCardsFromPokedex, deleteCardFromPokedex } from '../utils/pokedexUtils'
import { estimateCardPrice, formatPrice } from '../services/priceService'

export default function Pokedex() {
  const [cards, setCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  useEffect(() => {
    const savedCards = getCardsFromPokedex()
    setCards(savedCards)
  }, [])

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
    const updatedCards = deleteCardFromPokedex(id)
    setCards(updatedCards)
  }

  // 통계 계산
  const totalCards = cards.length
  const targetCards = 100 // 목표 카드 수
  const collectionProgress = Math.min((totalCards / targetCards) * 100, 100)

  // 알 에너지 계산 (카드 수에 따라 0~100%)
  const eggEnergy = Math.min((totalCards / 50) * 100, 100) // 50장이면 100%

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
      fire: '🔥',
      water: '💧',
      grass: '🌿',
      electric: '⚡',
      all: '✨'
    }
    return icons[type] || '✨'
  }

  // 타입 한글
  const getTypeLabel = (type) => {
    const labels = {
      fire: '불꽃',
      water: '물',
      grass: '풀',
      electric: '전기',
      all: '전체'
    }
    return labels[type] || type
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen" style={{
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(255, 192, 203, 0.1) 0%, transparent 50%)',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 m-4 border-2 border-yellow-200">
        <h2 className="text-3xl sm:text-4xl font-black mb-6 text-center text-gray-800 drop-shadow-lg">
          📚 내 포켓몬 도감
        </h2>

        {/* 상단 통계 섹션 */}
        <div className="mb-6 space-y-4">
          {/* 수집 진행률 게이지 바 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base sm:text-lg font-bold text-gray-800">수집 진행률</span>
              <span className="text-xl sm:text-2xl font-black text-blue-600">
                {totalCards} / {targetCards}장
              </span>
            </div>
            <div className="relative bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner border-2 border-gray-300">
              <div
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${collectionProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white drop-shadow-lg">
                  {Math.round(collectionProgress)}%
                </span>
              </div>
            </div>
          </div>

          {/* 알 부화 에너지 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-300 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base sm:text-lg font-bold text-gray-800">🥚 알 부화 에너지</span>
              <span className="text-lg sm:text-xl font-black text-orange-600">
                {Math.round(eggEnergy)}%
              </span>
            </div>
            <div className="relative bg-gray-200 rounded-full h-12 overflow-hidden shadow-inner border-2 border-gray-300">
              <div
                className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${eggEnergy}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                {eggEnergy >= 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl animate-bounce">✨ 부화 준비 완료! ✨</span>
                  </div>
                )}
              </div>
            </div>
            {eggEnergy < 100 && (
              <p className="text-xs text-gray-600 mt-2 text-center">
                {Math.round(50 - (eggEnergy / 100 * 50))}장 더 수집하면 부화할 수 있어요!
              </p>
            )}
          </div>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="mb-6 space-y-4">
          {/* 검색 바 */}
          <div>
            <input
              type="text"
              placeholder="🔍 포켓몬 이름으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-md"
            />
          </div>

          {/* 타입 필터 버튼 */}
          <div className="flex flex-wrap gap-3">
            {['all', 'fire', 'water', 'grass', 'electric'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md ${selectedType === type
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-2 border-yellow-600 scale-105'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-yellow-400'
                  }`}
              >
                <span className="text-xl">{getTypeIcon(type)}</span>
                <span>{getTypeLabel(type)}</span>
                <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full">
                  {typeCounts[type]}
                </span>
              </button>
            ))}
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">정렬:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold shadow-md"
            >
              <option value="latest">최신순</option>
              <option value="hp">HP 높은순</option>
            </select>
          </div>
        </div>

        {/* 카드 리스트 */}
        {sortedCards.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-gray-600 text-base sm:text-xl font-semibold break-words px-4">
              {searchTerm || selectedType !== 'all'
                ? '검색 결과가 없습니다.'
                : '아직 수집한 카드가 없습니다. 카메라로 스캔해보세요!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCards.map((card) => (
              <div
                key={card.id}
                className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-2xl shadow-xl p-5 border-2 border-orange-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
              >
                {card.image && (
                  <div className="mb-4 rounded-xl overflow-hidden bg-white shadow-lg border-2 border-gray-200">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-auto"
                    />
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-black mb-1 text-gray-800 break-words">
                  {card.name || '알 수 없는 포켓몬'}
                </h3>
                {card.nickname && (
                  <p className="text-sm text-yellow-700 font-bold mb-2 bg-yellow-100 px-2 py-1 rounded-lg inline-block">
                    ✨ {card.nickname}
                  </p>
                )}
                {/* 카드 가치 표시 */}
                <div className="mb-3">
                  <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                    💰 {formatPrice(estimateCardPrice(card).estimated)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  {card.type && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(card.type)}</span>
                      <p><strong>타입:</strong> {getTypeLabel(card.type)}</p>
                    </div>
                  )}
                  {card.hp && (
                    <div className="flex items-center space-x-1">
                      <span><strong>HP:</strong></span>
                      <span className="text-lg">{Array(Math.min(card.hp || 0, 10)).fill('❤️').join('')}</span>
                      <span className="text-gray-600 font-bold">({card.hp})</span>
                    </div>
                  )}
                  {card.rarity && (
                    <div className="flex items-center space-x-1">
                      <span><strong>희귀도:</strong></span>
                      <span className="text-xl">{Array(card.rarity || 0).fill('⭐').join('')}</span>
                    </div>
                  )}
                  {card.powerLevel && (
                    <div>
                      <span><strong>종합 능력:</strong></span>
                      <div className="mt-1 bg-gray-200 rounded-full h-4 relative overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                          style={{ width: `${card.powerLevel}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
                          {card.powerLevel}점
                        </span>
                      </div>
                    </div>
                  )}
                  {(card.strongAgainst || card.weakAgainst) && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {card.strongAgainst && (
                        <div className="text-xs p-2 bg-green-100 rounded-lg border border-green-300">
                          <p className="text-gray-600">이기기 쉬운</p>
                          <p className="font-bold text-green-700">
                            {getTypeIcon(card.strongAgainst)} {getTypeLabel(card.strongAgainst)}
                          </p>
                        </div>
                      )}
                      {card.weakAgainst && (
                        <div className="text-xs p-2 bg-red-100 rounded-lg border border-red-300">
                          <p className="text-gray-600">조심해야 할</p>
                          <p className="font-bold text-red-700">
                            {getTypeIcon(card.weakAgainst)} {getTypeLabel(card.weakAgainst)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => deleteCard(card.id)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-bold shadow-lg transform hover:scale-105"
                >
                  🗑️ 삭제
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
