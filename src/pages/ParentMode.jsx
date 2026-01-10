import { useState, useEffect } from 'react'
import { getCardsFromPokedex } from '../utils/pokedexUtils'
import { calculateTotalValue, estimateCardPrice, formatPrice, getRealCardPrice } from '../services/priceService'
import ParentalGate from '../components/ParentalGate'
import { useLanguage } from '../contexts/LanguageContext'

export default function ParentMode() {
  const { translate, language } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalCards: 0,
    lastScanDate: null
  })
  const [cardPrices, setCardPrices] = useState([])
  const [totalValue, setTotalValue] = useState(null)
  const [isLoadingPrices, setIsLoadingPrices] = useState(false)

  useEffect(() => {
    // 이미 세션에 인증 정보가 있다면 스킵할 수도 있지만,
    // 부모 모드는 들어올 때마다 확인하는 것이 안전하므로 여기서는 매번 확인하도록 둠.
    // 만약 새로고침 시 유지를 원하면 sessionStorage를 사용할 수 있음.
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

      const totalEstimated = pricesWithRealData.reduce((sum, card) => sum + (card.price.estimated || 0), 0)
      const totalMin = pricesWithRealData.reduce((sum, card) => sum + (card.price.min || 0), 0)
      const totalMax = pricesWithRealData.reduce((sum, card) => sum + (card.price.max || 0), 0)

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
    if (confirm(translate('parentMode.deleteConfirm'))) {
      localStorage.removeItem('pokedexCards')
      setStats({ totalCards: 0, lastScanDate: null })
      setCardPrices([])
      setTotalValue(null)
      alert(translate('parentMode.deleteSuccess'))
    }
  }

  if (!isAuthenticated) {
    return <ParentalGate onSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border-4 border-pokemon-blue/10 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-black text-pokemon-dark font-display flex items-center gap-3">
            <span className="text-4xl">👨‍👩‍👧</span> {translate('parentMode.title')}
          </h2>
          <span className="text-sm font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full border border-green-200 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {translate('parentMode.secureConnection')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 통계 카드 */}
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              📊 {translate('parentMode.collectionStatus')}
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">{translate('parentMode.totalCollectedCards')}</span>
              <span className="text-3xl font-black text-blue-600">{stats.totalCards}{translate('common.cards')}</span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-200 pt-3">
              <span className="text-sm text-gray-500">{translate('parentMode.lastActivity')}</span>
              <span className="text-sm font-bold text-blue-700">
                {stats.lastScanDate ? new Date(stats.lastScanDate).toLocaleDateString(language === 'ko' ? 'ko-KR' : language === 'nl' ? 'nl-NL' : 'en-US') : '-'}
              </span>
            </div>
          </div>

          {/* 가치 카드 */}
          <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
              💰 {translate('parentMode.valueAnalysis')}
            </h3>
            {isLoadingPrices ? (
              <div className="flex items-center gap-2 text-green-600 font-bold animate-pulse">
                <span className="text-2xl">⏳</span> {translate('parentMode.calculating')}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{translate('parentMode.totalEstimatedValue')}</span>
                  <span className="text-3xl font-black text-green-600 tracking-tight">
                    {totalValue ? formatPrice(totalValue.totalEstimated) : formatPrice(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-green-200 pt-3">
                  <span className="text-sm text-gray-500">{translate('parentMode.averagePrice')}</span>
                  <span className="text-sm font-bold text-green-700">
                    {totalValue ? formatPrice(totalValue.averagePrice) : formatPrice(0)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 상세 목록 */}
        {cardPrices.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4 px-2">📋 {translate('parentMode.cardList')}</h3>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden max-h-[500px] overflow-y-auto custom-scrollbar">
              {isLoadingPrices ? (
                <div className="p-8 text-center text-gray-500">{translate('parentMode.loading')}</div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-gray-100 sticky top-0 z-10 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{translate('parentMode.monster')}</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">{translate('parentMode.estimatedValue')}</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right text-xs sm:text-sm hidden sm:table-cell">{translate('parentMode.range')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[...cardPrices].sort((a, b) => (b.price?.estimated || 0) - (a.price?.estimated || 0)).map((card) => (
                      <tr key={card.id} className="hover:bg-white transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          {card.image ? (
                            <img src={card.image} alt={card.name} className="w-10 h-14 object-cover rounded shadow-sm border border-gray-200" />
                          ) : (
                            <div className="w-10 h-14 bg-gray-200 rounded"></div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800">{card.name}</p>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold">
                              {card.price?.isRealPrice ? translate('parentMode.aiAnalysis') : translate('parentMode.estimated')}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right font-black text-green-600">
                          {formatPrice(card.price?.estimated || 0)}
                        </td>
                        <td className="p-4 text-right text-xs text-gray-500 hidden sm:table-cell">
                          {formatPrice(card.price?.min || 0)} ~ {formatPrice(card.price?.max || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* 데이터 초기화 */}
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-1">⚠️ {translate('parentMode.dataReset')}</h3>
            <p className="text-sm text-red-600/80">
              {translate('parentMode.dataResetDescription')}
            </p>
          </div>
          <button
            onClick={clearAllData}
            className="px-6 py-3 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-400 transition-all font-bold shadow-sm whitespace-nowrap"
          >
            {translate('parentMode.deleteData')}
          </button>
        </div>
      </div>
    </div>
  )
}