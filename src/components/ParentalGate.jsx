import { useState, useEffect } from 'react'

export default function ParentalGate({ onSuccess }) {
    const [pin, setPin] = useState(['', '', '', ''])
    const [storedPin, setStoredPin] = useState(null)
    const [mode, setMode] = useState('check') // 'check', 'create', 'confirm'
    const [tempPin, setTempPin] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('parentPin')
        if (saved) {
            setStoredPin(saved)
            setMode('check')
        } else {
            setMode('create')
        }
    }, [])

    const handleNumberClick = (num) => {
        const nextIndex = pin.findIndex(d => d === '')
        if (nextIndex === -1) return

        const newPin = [...pin]
        newPin[nextIndex] = num
        setPin(newPin)

        // 4자리 입력 완료 시 처리
        if (nextIndex === 3) {
            const inputPin = newPin.join('')
            handleComplete(inputPin)
        }
    }

    const handleClear = () => {
        setPin(['', '', '', ''])
        setError('')
    }

    const handleBackspace = () => {
        const lastFilledIndex = [...pin].reverse().findIndex(d => d !== '')
        if (lastFilledIndex === -1) return

        const realIndex = 3 - lastFilledIndex
        const newPin = [...pin]
        newPin[realIndex] = ''
        setPin(newPin)
        setError('')
    }

    const [mathProblem, setMathProblem] = useState(null)
    const [mathAnswer, setMathAnswer] = useState('')

    const generateMathProblem = () => {
        const a = Math.floor(Math.random() * 8) + 12 // 12~19
        const b = Math.floor(Math.random() * 8) + 3  // 3~10
        return { a, b, answer: a * b }
    }

    const handleResetRequest = () => {
        const problem = generateMathProblem()
        setMathProblem(problem)
        setMathAnswer('')
        setMode('reset_challenge')
        setPin(['', '', '', '']) // Clear PIN input visually
    }

    const checkMathAnswer = () => {
        if (parseInt(mathAnswer) === mathProblem.answer) {
            localStorage.removeItem('parentPin')
            alert('초기화되었습니다. 새 비밀번호를 설정해주세요.')
            window.location.reload()
        } else {
            setError('틀렸습니다. 다시 시도해주세요.')
            setMathAnswer('')
            setTimeout(() => {
                setError('')
                const newProblem = generateMathProblem()
                setMathProblem(newProblem)
            }, 1000)
        }
    }

    const handleComplete = (inputPin) => {
        if (mode === 'check') {
            if (inputPin === storedPin) {
                onSuccess()
            } else {
                setError('비밀번호가 틀렸습니다.')
                setTimeout(handleClear, 500)
            }
        } else if (mode === 'create') {
            setTempPin(inputPin)
            setMode('confirm')
            handleClear()
        } else if (mode === 'confirm') {
            if (inputPin === tempPin) {
                localStorage.setItem('parentPin', inputPin)
                onSuccess()
            } else {
                setError('비밀번호가 일치하지 않습니다. 처음부터 다시 설정해주세요.')
                setMode('create')
                setTempPin(null)
                setTimeout(handleClear, 1000)
            }
        }
    }

    const getTitle = () => {
        if (mode === 'create') return '새로운 보호자 비밀번호 설정'
        if (mode === 'confirm') return '비밀번호 확인'
        if (mode === 'reset_challenge') return '성인 인증 (수학 문제)'
        return '보호자 비밀번호 입력'
    }

    const getDescription = () => {
        if (mode === 'create') return '4자리 숫자를 입력해주세요.'
        if (mode === 'confirm') return '한 번 더 입력해주세요.'
        if (mode === 'reset_challenge') return '아래 문제의 정답을 입력하세요.'
        return '설정하신 4자리 숫자를 입력해주세요.'
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-pop">
                <div className="bg-pokemon-blue p-6 text-center text-white">
                    <div className="text-4xl mb-2">🔒</div>
                    <h2 className="text-xl font-black font-display">{getTitle()}</h2>
                    <p className="text-blue-100 text-sm mt-1">{getDescription()}</p>
                </div>

                <div className="p-6">
                    {mode === 'reset_challenge' ? (
                        <div className="text-center">
                            <div className="text-3xl font-black text-gray-800 mb-6 py-4 bg-gray-100 rounded-2xl">
                                {mathProblem.a} × {mathProblem.b} = ?
                            </div>
                            <input
                                type="number"
                                value={mathAnswer}
                                onChange={(e) => setMathAnswer(e.target.value)}
                                className="w-full text-center text-2xl font-bold py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-pokemon-blue outline-none"
                                placeholder="정답 입력"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setMode('check')
                                        handleClear()
                                    }}
                                    className="flex-1 py-3 bg-gray-200 rounded-xl font-bold text-gray-600"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={checkMathAnswer}
                                    className="flex-1 py-3 bg-pokemon-blue text-white rounded-xl font-bold"
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* PIN Display */}
                            <div className="flex justify-center gap-4 mb-8">
                                {pin.map((digit, i) => (
                                    <div
                                        key={i}
                                        className={`w-12 h-12 rounded-xl border-4 flex items-center justify-center text-2xl font-black transition-all ${digit
                                            ? 'border-pokemon-blue bg-blue-50 text-pokemon-blue'
                                            : 'border-gray-200 bg-gray-50'
                                            } ${error ? 'border-red-500 bg-red-50 animate-shake' : ''}`}
                                    >
                                        {digit ? '•' : ''}
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="text-red-500 text-center text-sm font-bold mb-4 animate-bounce">
                                    {error}
                                </div>
                            )}

                            {/* Keypad */}
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => handleNumberClick(String(num))}
                                        className="h-16 rounded-xl bg-gray-50 text-2xl font-bold text-gray-700 hover:bg-gray-100 active:scale-95 transition-all shadow-sm border-b-4 border-gray-200 active:border-b-0 active:translate-y-1"
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    onClick={handleClear}
                                    className="h-16 rounded-xl bg-red-50 text-red-500 font-bold hover:bg-red-100 active:scale-95 transition-all"
                                >
                                    C
                                </button>
                                <button
                                    onClick={() => handleNumberClick('0')}
                                    className="h-16 rounded-xl bg-gray-50 text-2xl font-bold text-gray-700 hover:bg-gray-100 active:scale-95 transition-all shadow-sm border-b-4 border-gray-200 active:border-b-0 active:translate-y-1"
                                >
                                    0
                                </button>
                                <button
                                    onClick={handleBackspace}
                                    className="h-16 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a1 1 0 001.414 0L19 21.414a1 1 0 001.414-1.414L3 12z" />
                                    </svg>
                                </button>
                            </div>

                            <button
                                onClick={handleResetRequest}
                                className="w-full text-center text-xs text-gray-400 mt-6 underline"
                            >
                                비밀번호 초기화
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
