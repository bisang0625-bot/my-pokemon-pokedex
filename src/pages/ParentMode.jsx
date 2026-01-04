import { useState, useEffect } from 'react'
import { getCardsFromPokedex } from '../utils/pokedexUtils'
import { calculateTotalValue, estimateCardPrice, formatPrice, getRealCardPrice } from '../services/priceService'

export default function ParentMode() {
  const [stats, setStats] = useState({
    totalCards: 0,
    lastScanDate: null
  })
  const [cardPrices, setCardPrices] = useState([])
  const [totalValue, setTotalValue] = useState(null)
  const [isLoadingPrices, setIsLoadingPrices] = useState(false)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = () => {
    const cards = getCardsFromPokedex()
    setStats({
      totalCards: cards.length,
      lastScanDate: cards.length > 0 ? cards[cards.length - 1].scannedAt : null
    })
    loadCardPrices(cards)
  }

  const loadCardPrices = async (cards) => {
    if (cards.length === 0) return;
    setIsLoadingPrices(true)
    try {
      const pricesWithRealData = await Promise.all(
        cards.map(async (card) => {
          try {
            const realPrice = await getRealCardPrice(card)
            return { ...card, price: realPrice }
          } catch (error) {
            console.error(`카드 ${card.name} 시세 조회 실패:`, error)
            return {
              ...card,
              price: { ...estimateCardPrice(card), isRealPrice: false }
            }
          }
        })
      )
      
      setCardPrices(pricesWithRealData)
      
      const totalMin = pricesWithRealData.reduce((sum, card) => sum + (card.price.min || 0), 0)
      const totalMax = pricesWithRealData.reduce((sum, card) => sum + (card.price.max || 0), 0)
      const totalEstimated = pricesWithRealData.reduce((sum, card) => sum + (card.price.estimated || 0), 0)
      
      setTotalValue({
        totalMin,
        totalMax,
        totalEstimated,
        cardCount: cards.length,
        averagePrice: Math.round(totalEstimated / cards.length) || 0
      })
    } catch (error) {
      console.error('시세 조회 중 오류:', error)
      const prices = cards.map(card => ({ ...card, price: estimateCardPrice(card) }))
      setCardPrices(prices)
      setTotalValue(calculateTotalValue(cards))
    } finally {
      setIsLoadingPrices(false)
    }
  }

  const clearAllData = () => {
    if (confirm('모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      localStorage.removeItem('pokedexCards')
      setStats({ totalCards: 0, lastScanDate: null })
      setCardPrices([])
      setTotalValue(null)
      alert('모든 데이터가 삭제되었습니다.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">👨‍👩‍👧 부모 관리 모드</h2>
          <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200">
            보안 연결됨 (ENV)
          </span>
        </div>

        <div className="space-y-6">
          {/* 통계 섹션 */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">수집 통계</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">총 수집 카드</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalCards}장</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">마지막 스캔</p>
                <p className="text-lg font-semibold text-blue-600">
                  {stats.lastScanDate ? new Date(stats.lastScanDate).toLocaleDateString('ko-KR') : '없음'}
                </p>
              </div>
            </div>
          </div>

          {/* 시세 정보 섹션 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              💰 카드 가치 분석
            </h3>
            
            {isLoadingPrices ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-2"></div>
                <p className="text-gray-600 text-sm">AI 시세 조회 중...</p>
              </div>
            ) : totalValue ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-2 border-green-400 shadow-md">
                  <p className="text-sm text-gray-600 mb-1">총 예상 가치</p>
                  <p className="text-3xl font-black text-green-600">{formatPrice(totalValue.totalEstimated)}</p>
                  <p className="text-xs text-gray-400 mt-2">평균 카드 가격: {formatPrice(totalValue.averagePrice)}</p>
                </div>
                {/* 개별 리스트는 생략 가능하거나 필요시 유지 */}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">수집한 카드가 없습니다.</p>
            )}
          </div>

          {/* 데이터 관리 섹션 */}
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-red-700">데이터 관리</h3>
            <button
              onClick={clearAllData}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
            >
              모든 데이터 초기화
            </button>
            <p className="mt-2 text-xs text-gray-500">주의: 모든 카드 도감 정보가 스마트폰에서 영구적으로 삭제됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}