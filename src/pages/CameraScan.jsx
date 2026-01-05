import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { analyzeCard } from '../services/geminiService'
import { saveCardToPokedex } from '../utils/pokedexUtils'

export default function CameraScan() {
  const [isScanning, setIsScanning] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [cameraError, setCameraError] = useState(null)
  const webcamRef = useRef(null)

  const videoConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'environment' // 후면 카메라 우선 (더 유연한 설정)
  }

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setCapturedImage(imageSrc)
      setIsScanning(false)
    }
  }, [webcamRef])

  const startScan = async () => {
    setError(null)
    setCameraError(null)
    setAnalysisResult(null)
    setCapturedImage(null)

    // 카메라 권한 확인 및 요청
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // 권한이 있으면 스트림 종료하고 스캔 시작
      stream.getTracks().forEach(track => track.stop())
      setIsScanning(true)
      console.log('카메라 권한 확인 완료, 스캔 시작')
    } catch (err) {
      console.error('카메라 권한 오류:', err)
      setCameraError(
        `카메라 접근 권한이 필요합니다. 
        브라우저 주소창의 자물쇠 아이콘(🔒)을 클릭하여 카메라 권한을 허용해주세요.
        또는 브라우저 설정에서 이 사이트의 카메라 권한을 확인해주세요.`
      )
      setIsScanning(true) // 에러 메시지를 보여주기 위해 true로 설정
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

      // base64 이미지를 Blob으로 변환
      const response = await fetch(capturedImage)
      const blob = await response.blob()

      const result = await analyzeCard(blob)
      setAnalysisResult(result)

      // 도감에 자동 저장
      saveCardToPokedex(capturedImage, result)
    } catch (err) {
      setError(err.message || '카드 분석 중 오류가 발생했습니다.')
      console.error('분석 오류:', err)
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

  // 타입 한글 변환
  const getTypeLabel = (type) => {
    const typeMap = {
      fire: '불꽃',
      water: '물',
      grass: '풀',
      electric: '전기'
    }
    return typeMap[type] || type
  }

  // 타입 색상
  const getTypeColor = (type) => {
    const colorMap = {
      fire: 'bg-red-100 border-red-300 text-red-800',
      water: 'bg-blue-100 border-blue-300 text-blue-800',
      grass: 'bg-green-100 border-green-300 text-green-800',
      electric: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    }
    return colorMap[type] || 'bg-gray-100 border-gray-300 text-gray-800'
  }

  // 타입 아이콘
  const getTypeIcon = (type) => {
    const iconMap = {
      fire: '🔥',
      water: '💧',
      grass: '🌿',
      electric: '⚡'
    }
    return iconMap[type] || '✨'
  }

  // 희귀도에 따른 배경 그라데이션
  const getRarityGradient = (rarity) => {
    const gradients = {
      1: 'from-gray-50 to-gray-100', // 일반
      2: 'from-blue-50 to-blue-100', // 희귀
      3: 'from-purple-50 to-purple-100', // 매우 희귀
      4: 'from-yellow-50 via-yellow-100 to-yellow-200', // 초희귀 (금색)
      5: 'from-pink-200 via-purple-200 via-blue-200 to-green-200' // 전설 (무지개)
    }
    return gradients[rarity] || gradients[1]
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          📷 카드 스캔
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!capturedImage ? (
          <div className="space-y-4">
            {!isScanning ? (
              <div className="text-center py-12">
                <button
                  onClick={startScan}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold shadow-md"
                >
                  📸 스캔하기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cameraError ? (
                  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                    <div className="mb-4">
                      <p className="text-red-700 font-semibold mb-2">⚠️ 카메라 권한 오류</p>
                      <p className="text-red-600 text-sm whitespace-pre-line">{cameraError}</p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={startScan}
                        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                      >
                        다시 시도
                      </button>
                      <button
                        onClick={stopScan}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative bg-black rounded-lg overflow-hidden" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        onUserMedia={(stream) => {
                          setCameraError(null)
                          console.log('카메라 접근 성공', stream)
                        }}
                        onUserMediaError={(error) => {
                          console.error('카메라 접근 오류:', error)
                          const errorMessage = error.message || error.name || '알 수 없는 오류'

                          let userMessage = '카메라에 접근할 수 없습니다.\n\n'

                          if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
                            userMessage += '브라우저 주소창의 자물쇠 아이콘(🔒)을 클릭하여 카메라 권한을 허용해주세요.\n또는 브라우저 설정에서 이 사이트의 카메라 권한을 확인해주세요.'
                          } else if (errorMessage.includes('NotFoundError') || errorMessage.includes('DevicesNotFoundError')) {
                            userMessage += '카메라를 찾을 수 없습니다. 카메라가 연결되어 있는지 확인해주세요.'
                          } else {
                            userMessage += `오류: ${errorMessage}\n카메라 권한을 확인해주세요.`
                          }

                          setCameraError(userMessage)
                        }}
                        className="w-full h-auto"
                        style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '600px' }}
                      />
                      <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                        카메라 로딩 중...
                      </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={capture}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md"
                      >
                        📷 촬영
                      </button>
                      <button
                        onClick={stopScan}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                      >
                        취소
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={capturedImage}
                alt="촬영된 카드"
                className="w-full h-auto"
              />
            </div>

            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-lg font-semibold text-gray-700">
                  피카츄가 열심히 찾는 중...
                </p>
              </div>
            ) : (
              <div className="flex justify-center space-x-4">
                {!analysisResult && (
                  <button
                    onClick={analyzeImage}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold shadow-md"
                  >
                    🔍 카드 분석하기
                  </button>
                )}
                <button
                  onClick={resetScan}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  다시 촬영
                </button>
              </div>
            )}

            {analysisResult && (
              <div className={`mt-6 p-6 bg-gradient-to-br ${getRarityGradient(analysisResult.rarity || 1)} rounded-2xl border-4 border-yellow-300 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]`}>
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 drop-shadow-lg break-words">
                  ✨ 분석 결과 ✨
                </h3>

                <div className="space-y-5">
                  {/* 별명 - 카드 이름 위에 크게 배치 */}
                  {analysisResult.nickname && (
                    <div className="text-center mb-3">
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full border-4 border-yellow-600 shadow-lg transform rotate-[-2deg] hover:rotate-0 transition-transform">
                        <span className="text-2xl font-black text-yellow-900 drop-shadow-md">
                          별명: {analysisResult.nickname} ⭐
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 포켓몬 이름 */}
                  <div className="text-center">
                    <h4 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 drop-shadow-lg break-words">
                      {analysisResult.name}
                    </h4>
                  </div>

                  {/* 타입 */}
                  <div className="text-center">
                    <div className={`inline-block px-6 py-3 rounded-full border-3 font-bold text-lg shadow-lg ${getTypeColor(analysisResult.type)}`}>
                      {getTypeIcon(analysisResult.type)} 타입: {getTypeLabel(analysisResult.type)} {getTypeIcon(analysisResult.type)}
                    </div>
                  </div>

                  {/* HP 에너지 바 */}
                  <div className="space-y-3">
                    {/* 큰 하트 아이콘과 숫자 */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-6xl animate-pulse">❤️</div>
                      <div className="text-5xl font-black text-red-600 drop-shadow-lg">
                        {analysisResult.hp || 0}
                      </div>
                    </div>

                    {/* 게임 스타일 에너지 바 */}
                    <div className="relative bg-gray-800 rounded-lg h-12 overflow-hidden shadow-2xl border-4 border-gray-600">
                      {/* 배경 그리드 패턴 */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                        backgroundSize: '20px 100%'
                      }}></div>

                      {/* 에너지 충전 바 */}
                      <div
                        className={`h-full transition-all duration-1000 ease-out relative overflow-hidden ${(analysisResult.hp || 0) >= 200
                            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-yellow-400 animate-fire'
                            : 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'
                          }`}
                        style={{ width: `${Math.min((analysisResult.hp || 0) / 200 * 100, 100)}%` }}
                      >
                        {/* 에너지 파동 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>

                        {/* HP 200 이상일 때 불꽃 효과 */}
                        {(analysisResult.hp || 0) >= 200 && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 via-orange-400/50 to-red-500/50 animate-pulse"></div>
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent animate-fire-top"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-fire-bottom"></div>
                          </>
                        )}

                        {/* 에너지 숫자 표시 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-black text-white drop-shadow-lg">
                            {analysisResult.hp || 0} / 200
                          </span>
                        </div>
                      </div>

                      {/* 에너지 충전 표시 */}
                      {(analysisResult.hp || 0) >= 200 && (
                        <div className="absolute top-1 right-2 text-yellow-300 text-xs font-black animate-bounce">
                          ⚡ MAX ENERGY ⚡
                        </div>
                      )}
                    </div>

                    {/* 에너지 상태 텍스트 */}
                    <div className="text-center">
                      <p className={`text-sm font-bold ${(analysisResult.hp || 0) >= 200
                          ? 'text-yellow-600 animate-pulse'
                          : (analysisResult.hp || 0) >= 150
                            ? 'text-orange-600'
                            : (analysisResult.hp || 0) >= 100
                              ? 'text-red-600'
                              : 'text-gray-600'
                        }`}>
                        {(analysisResult.hp || 0) >= 200
                          ? '🔥 최대 에너지 충전! 🔥'
                          : (analysisResult.hp || 0) >= 150
                            ? '⚡ 에너지 높음!'
                            : (analysisResult.hp || 0) >= 100
                              ? '💪 에너지 보통'
                              : '🔋 에너지 충전 필요'}
                      </p>
                    </div>
                  </div>

                  {/* 희귀도 */}
                  <div className="text-center p-4 bg-white/50 rounded-xl border-2 border-yellow-400 shadow-lg">
                    <p className="font-bold text-lg text-gray-800 mb-2">희귀도</p>
                    <div className="text-4xl">
                      {Array(analysisResult.rarity || 0).fill('⭐').join('')}
                    </div>
                  </div>

                  {/* 종합 능력 파워바 */}
                  {analysisResult.powerLevel && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-gray-800">⚡ 종합 능력</span>
                        <span className="font-bold text-xl text-purple-600">{analysisResult.powerLevel}점</span>
                      </div>
                      <div className="relative bg-gray-200 rounded-full h-10 overflow-hidden shadow-inner border-2 border-gray-300">
                        <div
                          className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                          style={{ width: `${analysisResult.powerLevel}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white drop-shadow-lg">
                            POWER {analysisResult.powerLevel}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 상성 정보 */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {analysisResult.strongAgainst && (
                      <div className="p-5 bg-gradient-to-br from-green-100 to-green-200 rounded-xl border-3 border-green-400 shadow-lg transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{getTypeIcon(analysisResult.strongAgainst)}</div>
                          <p className="text-sm font-semibold text-green-800 mb-1">강점</p>
                          <p className="text-lg font-black text-green-900 mb-2">
                            {getTypeLabel(analysisResult.strongAgainst)}
                          </p>
                          <p className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                            이 친구한테 강해요! 💪
                          </p>
                        </div>
                      </div>
                    )}
                    {analysisResult.weakAgainst && (
                      <div className="p-5 bg-gradient-to-br from-red-100 to-red-200 rounded-xl border-3 border-red-400 shadow-lg transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-4xl mb-2">{getTypeIcon(analysisResult.weakAgainst)}</div>
                          <p className="text-sm font-semibold text-red-800 mb-1">약점</p>
                          <p className="text-lg font-black text-red-900 mb-2">
                            {getTypeLabel(analysisResult.weakAgainst)}
                          </p>
                          <p className="text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                            이 친구는 조심해요! ⚠️
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 설명 */}
                  {analysisResult.description && (
                    <div className="mt-6 p-5 bg-white/80 rounded-xl border-3 border-blue-300 shadow-lg">
                      <p className="text-gray-800 text-base sm:text-lg font-semibold text-center leading-relaxed break-words">
                        {analysisResult.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
