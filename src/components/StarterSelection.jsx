import { PARTNERS } from '../utils/partnerUtils'

export default function StarterSelection({ onSelect }) {
    const starters = [PARTNERS.fire, PARTNERS.water, PARTNERS.grass]

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pb-28 sm:pb-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-pop max-h-[90vh] sm:max-h-[85vh] flex flex-col">
                <div className="bg-pokemon-blue p-6 sm:p-8 text-center text-white relative overflow-hidden flex-shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')] bg-repeat space-x-4"></div>
                    <h2 className="text-2xl sm:text-3xl font-black font-display relative z-10 mb-2">
                        파트너 포켓몬을 선택하세요!
                    </h2>
                    <p className="text-blue-100 font-bold text-sm sm:text-base relative z-10">
                        앞으로 함께 모험을 떠날 친구를 골라주세요.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {starters.map((starter) => (
                            <button
                                key={starter.id}
                                onClick={() => onSelect(starter.id)}
                                className={`group relative flex flex-col items-center p-4 sm:p-6 rounded-2xl border-4 transition-all duration-300 hover:scale-105 active:scale-95 ${starter.borderColor} bg-white hover:bg-gray-50`}
                            >
                                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg flex items-center justify-center">
                                    <img
                                        src={starter.stages[0].image}
                                        alt={starter.name}
                                        className="w-full h-full object-contain filter drop-shadow-lg"
                                    />
                                </div>
                                <h3 className={`text-lg sm:text-xl font-black mb-2 ${starter.textColor}`}>
                                    {starter.name}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${starter.color}`}>
                                    선택하기
                                </span>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-3 sm:p-4 bg-gray-50 text-center text-gray-500 text-xs sm:text-sm font-bold border-t border-gray-100 flex-shrink-0">
                    * 카드를 많이 모으면 포켓몬이 진화합니다!
                </div>
            </div>
        </div>
    )
}
