import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { analyzeCard } from '../services/geminiService'
import { saveCardToPokedex } from '../utils/pokedexUtils'
import { useLanguage } from '../contexts/LanguageContext'
import { compressImage } from '../utils/imageUtils'

export default function CameraScan() {
  const { translate, language } = useLanguage()
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [cameraError, setCameraError] = useState(null)
  const webcamRef = useRef(null)

  const videoConstraints = {
    width: { ideal: 1920, min: 1280 }, // 고해상도로 향상 (분석 정확도 개선)
    height: { ideal: 1080, min: 720 },
    facingMode: 'environment'
  }

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      // 원본 고화질 이미지 캡처 (분석 정확도를 위해 압축하지 않음)
      const originalImageSrc = webcamRef.current.getScreenshot()
      setCapturedImage(originalImageSrc)
      setIsScanning(false)
    }
  }, [webcamRef])

  const startScan = async () => {
    setError(null)
    setCameraError(null)
    setAnalysisResult(null)
    setCapturedImage(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setIsScanning(true)
    } catch (err) {
      console.error('카메라 권한 오류:', err)
      setCameraError(
        `${translate('cameraScan.cameraPermissionRequired')}\n${translate('cameraScan.cameraPermissionHint')}`
      )
      setIsScanning(true)
    }
  }

  const stopScan = () => {
    setIsScanning(false)
  }

  const analyzeImage = async () => {
    if (!capturedImage) return

    try {
      setError(null)
      setAnalysisResult(null)
      setIsAnalyzing(true)

      // 분석용: 고화질 이미지 사용 (800x800, 품질 0.8) - 정확도 향상
      let analysisImageSrc = capturedImage
      try {
        analysisImageSrc = await compressImage(capturedImage, 800, 800, 0.8)
      } catch (error) {
        console.warn('분석용 이미지 압축 실패, 원본 사용:', error)
        // 압축 실패 시 원본 사용
      }

      const response = await fetch(analysisImageSrc)
      const blob = await response.blob()

      const result = await analyzeCard(blob)

      // 추가 검증: 결과가 유효한지 확인
      if (!result || !result.name || !result.hp || !result.type) {
        throw new Error('몬스터 카드 정보를 올바르게 읽을 수 없습니다. 카드를 명확하게 스캔해주세요.')
      }

      setAnalysisResult(result)
      
      // 저장용: 압축된 이미지 사용 (400x400, 품질 0.4) - 저장 공간 절약
      let storageImageSrc = capturedImage
      try {
        storageImageSrc = await compressImage(capturedImage, 400, 400, 0.4)
      } catch (error) {
        console.warn('저장용 이미지 압축 실패, 원본 사용:', error)
      }
      
      await saveCardToPokedex(storageImageSrc, result)
    } catch (err) {
      let errorMessage = err.message || '카드 분석 중 오류가 발생했습니다.'

      // localStorage quota exceeded 에러 처리
      if (err.message === 'STORAGE_QUOTA_EXCEEDED') {
        errorMessage = translate('cameraScan.storageQuotaExceeded')
      }

      setError(errorMessage)
      console.error('분석 오류:', err)

      // 몬스터 카드가 아닌 경우, 분석 결과를 초기화하고 다시 찍을 수 있도록 함
      setAnalysisResult(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetScan = () => {
    setCapturedImage(null)
    setAnalysisResult(null)
    setError(null)
    setIsScanning(false)
  }

  // 타입을 영어 코드로 정규화하는 함수 (한국어/영어 모두 처리) - 모든 타입 지원
  const normalizeType = (type) => {
    if (!type) return 'normal';

    const koreanToEnglish = {
      '노말': 'normal', '불꽃': 'fire', '물': 'water', '전기': 'electric',
      '풀': 'grass', '얼음': 'ice', '격투': 'fighting', '독': 'poison',
      '땅': 'ground', '비행': 'flying', '에스퍼': 'psychic', '벌레': 'bug',
      '바위': 'rock', '고스트': 'ghost', '드래곤': 'dragon', '악': 'dark',
      '강철': 'steel', '페어리': 'fairy'
    };

    // 한국어 타입이면 영어로 변환
    if (koreanToEnglish[type]) {
      return koreanToEnglish[type];
    }

    // 이미 영어 코드인 경우 - 모든 포켓몬 타입 지원
    const lowerType = type.toLowerCase();
    const allTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    if (allTypes.includes(lowerType)) {
      return lowerType;
    }

    return 'normal';
  }

  const getTypeLabel = (type) => {
    const englishType = normalizeType(type);
    return translate(`types.${englishType}`) || type
  }

  const getTypeColor = (type) => {
    const englishType = normalizeType(type);
    const colorMap = {
      normal: 'bg-gray-400', fire: 'bg-red-500', water: 'bg-blue-500',
      electric: 'bg-yellow-400', grass: 'bg-green-500', ice: 'bg-cyan-300',
      fighting: 'bg-red-700', poison: 'bg-purple-500', ground: 'bg-yellow-700',
      flying: 'bg-indigo-300', psychic: 'bg-pink-500', bug: 'bg-green-600',
      rock: 'bg-yellow-800', ghost: 'bg-purple-700', dragon: 'bg-purple-600',
      dark: 'bg-gray-700', steel: 'bg-gray-500', fairy: 'bg-pink-300'
    }
    return colorMap[englishType] || 'bg-gray-500'
  }

  const getTypeIcon = (type) => {
    const englishType = normalizeType(type);
    const iconMap = {
      normal: '⚪', fire: '🔥', water: '💧', electric: '⚡',
      grass: '🌿', ice: '❄️', fighting: '🥊', poison: '☠️',
      ground: '⛰️', flying: '🕊️', psychic: '🔮', bug: '🐛',
      rock: '🪨', ghost: '👻', dragon: '🐉', dark: '🌑',
      steel: '⚙️', fairy: '✨'
    }
    return iconMap[englishType] || '✨'
  }

  // Viewfinder Overlay Component
  const ViewfinderOverlay = () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Darkened borders */}
      <div className="absolute top-0 left-0 w-full h-[15%] bg-black/50 backdrop-blur-[2px]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[15%] bg-black/50 backdrop-blur-[2px]"></div>
      <div className="absolute top-[15%] left-0 w-[10%] h-[70%] bg-black/50 backdrop-blur-[2px]"></div>
      <div className="absolute top-[15%] right-0 w-[10%] h-[70%] bg-black/50 backdrop-blur-[2px]"></div>

      {/* Corner guides */}
      <div className="relative w-[80%] h-[70%] border-2 border-white/30 rounded-xl">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-pokemon-yellow rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pokemon-yellow rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-pokemon-yellow rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-pokemon-yellow rounded-br-xl"></div>

        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-white/50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white/50 -translate-x-1/2 -translate-y-1/2"></div>

        <div className="absolute -top-10 left-0 right-0 text-center text-white font-bold text-shadow">
          {translate('cameraScan.cardInFrame')}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto pb-10">
      {!capturedImage && (
        <h2 className="text-3xl font-black mb-6 text-center text-pokemon-dark font-display drop-shadow-sm">
          📷 {translate('cameraScan.title')}
        </h2>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {!capturedImage ? (
        <div className="space-y-6">
          {!isScanning ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-lg border-4 border-pokemon-blue/20">
              <div className="mb-6 text-6xl animate-bounce-slow">📸</div>
              <button
                onClick={startScan}
                className="px-8 py-4 bg-pokemon-blue text-white rounded-2xl hover:bg-blue-700 transition-all text-xl font-bold shadow-lg hover:scale-105 active:scale-95"
              >
                {translate('cameraScan.startCamera')}
              </button>
              <p className="mt-4 text-gray-500">{translate('cameraScan.scanDescription')}</p>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-black aspect-[3/4] sm:aspect-[4/3]">
              {cameraError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gray-900 text-white text-center">
                  <p className="text-red-400 text-6xl mb-4">⚠️</p>
                  <p className="whitespace-pre-line mb-6">{cameraError}</p>
                  <button
                    onClick={stopScan}
                    className="px-6 py-2 bg-white text-gray-900 rounded-full font-bold"
                  >
                    {translate('cameraScan.close')}
                  </button>
                </div>
              ) : (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMedia={() => setCameraError(null)}
                    onUserMediaError={(err) => setCameraError(err.message)}
                    className="w-full h-full object-cover"
                  />
                  <ViewfinderOverlay />

                  {/* Pokeball Shutter Button */}
                  <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
                    <button
                      onClick={stopScan}
                      className="bg-gray-800/80 text-white rounded-full p-4 hover:bg-gray-700 backdrop-blur-sm"
                    >
                      ✖️
                    </button>
                    <button
                      onClick={capture}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-xl relative overflow-hidden transform hover:scale-105 active:scale-95 transition-all bg-white"
                    >
                      <div className="absolute top-0 left-0 w-full h-[50%] bg-red-600 border-b-4 border-gray-800"></div>
                      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-white"></div>
                      <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white border-4 border-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                    </button>
                    <button className="invisible p-4">✖️</button> {/* Spacing dummy */}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          {/* 이미지 섹션 - 모바일에서 적절한 크기로 표시 */}
          <div className="flex-shrink-0 mb-4 sm:mb-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white max-w-sm mx-auto max-h-[45vh] sm:max-h-[60vh] flex items-center justify-center bg-gray-50">
              <img
                src={capturedImage}
                alt="촬영된 카드"
                className="w-full h-full object-contain rounded-xl"
              />
              <div className="absolute inset-0 ring-4 ring-black/10 rounded-2xl pointer-events-none"></div>
            </div>
          </div>

          {/* 버튼 섹션 - 항상 보이도록 */}
          <div className="flex-1 flex flex-col justify-start">
            {isAnalyzing ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg border-2 border-pokemon-yellow animate-pulse">
                <div className="text-4xl mb-4 animate-spin-slow inline-block">⏳</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{translate('cameraScan.analyzing')}</h3>
                <p className="text-gray-500">{translate('cameraScan.analyzingSub')}</p>
              </div>
            ) : (
              !analysisResult && (
                <div className="flex flex-col gap-3 max-w-sm mx-auto w-full px-4 sm:px-0">
                  {error && (
                    <div className={`border-2 rounded-xl p-4 mb-2 ${error.includes('할당량') || error.includes('quota') || error.includes('저장 공간') || error.includes('Storage') || error.includes('Opslagruimte')
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-red-50 border-red-200'
                      }`}>
                      <div className="flex items-start gap-2">
                        <span className="text-2xl">{error.includes('할당량') || error.includes('저장 공간') || error.includes('Storage') || error.includes('Opslagruimte') ? '💾' : '⚠️'}</span>
                        <div className="flex-1">
                          <h4 className={`font-bold mb-1 ${error.includes('할당량') || error.includes('quota') || error.includes('저장 공간') || error.includes('Storage') || error.includes('Opslagruimte')
                              ? 'text-yellow-700'
                              : 'text-red-700'
                            }`}>
                            {error.includes('저장 공간') || error.includes('Storage') || error.includes('Opslagruimte')
                              ? translate('cameraScan.storageQuotaExceededTitle')
                              : error.includes('할당량') || error.includes('quota')
                                ? translate('cameraScan.quotaExceededTitle')
                                : translate('cameraScan.analysisFailed')}
                          </h4>
                          <p className={`text-sm ${error.includes('할당량') || error.includes('quota') || error.includes('저장 공간') || error.includes('Storage') || error.includes('Opslagruimte')
                              ? 'text-yellow-600'
                              : 'text-red-600'
                            }`}>
                            {error}
                          </p>
                          {!error.includes('할당량') && !error.includes('quota') && !error.includes('저장 공간') && !error.includes('Storage') && !error.includes('Opslagruimte') && (
                            <p className="text-xs text-red-500 mt-2">
                              {translate('cameraScan.scanTip')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={analyzeImage}
                    className="w-full py-4 bg-gradient-to-r from-pokemon-blue to-blue-600 text-white rounded-2xl font-black text-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">✨</span> {translate('cameraScan.analyzeButton')}
                  </button>
                  <button
                    onClick={resetScan}
                    className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200"
                  >
                    {translate('cameraScan.retake')}
                  </button>
                </div>
              )
            )}
          </div>

          {analysisResult && (
            <div className="mt-6 bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pokemon-yellow relative max-w-md mx-auto transform transition-all animate-pop">
              {/* Header Gradient */}
              <div className={`h-24 ${getTypeColor(analysisResult.type)} relative overflow-hidden`}>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-sm font-bold border border-white/30">
                  {getTypeIcon(analysisResult.type)} {getTypeLabel(analysisResult.type)}
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 -mt-12 relative z-10">
                <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 mb-6 text-center">
                  <h2 className="text-3xl font-black text-gray-800 mb-1">{analysisResult.name}</h2>
                  <p className="text-pokemon-blue font-bold text-sm bg-blue-50 inline-block px-3 py-1 rounded-lg">
                    "{analysisResult.nickname || '멋진 친구'}"
                  </p>

                  {/* HP Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                      <span>HP</span>
                      <span className="text-red-500">{analysisResult.hp}/200</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min((analysisResult.hp || 0) / 200 * 100, 100)}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-2xl mb-1">💪</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">Strong</div>
                    <div className="font-bold text-green-600 truncate">{getTypeLabel(analysisResult.strongAgainst)}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-2xl mb-1">⚠️</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">Weak</div>
                    <div className="font-bold text-red-500 truncate">{getTypeLabel(analysisResult.weakAgainst)}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetScan}
                    className="flex-1 py-3 bg-pokemon-dark text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-colors"
                  >
                    {translate('cameraScan.close')}
                  </button>
                  <button
                    onClick={startScan}
                    className="flex-1 py-3 bg-pokemon-yellow text-pokemon-dark rounded-xl font-bold shadow-lg hover:bg-yellow-400 transition-colors"
                  >
                    {translate('cameraScan.nextCard')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
