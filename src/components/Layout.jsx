import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const NavItem = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${isActive(to)
        ? 'text-pokemon-blue transform -translate-y-2'
        : 'text-gray-400 hover:text-pokemon-blue/60'
        }`}
    >
      <div className={`text-2xl sm:text-3xl filter ${isActive(to) ? 'drop-shadow-lg' : ''} transition-all`}>
        {icon}
      </div>
      <span className={`text-xs sm:text-sm font-bold font-display tracking-wide ${isActive(to) ? 'opacity-100' : 'opacity-70'}`}>
        {label}
      </span>
      {isActive(to) && (
        <div className="absolute bottom-2 w-1.5 h-1.5 bg-pokemon-blue rounded-full animate-bounce" />
      )}
    </Link>
  )

  return (
    <div className="min-h-screen font-sans bg-pokemon-light pb-24 sm:pb-0">
      {/* Desktop/Tablet Top Navigation (Hidden on Mobile) */}
      <nav className="bg-pokemon-red text-white shadow-xl sticky top-0 z-50 border-b-4 border-red-700 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-transform">
              <div className="w-10 h-10 bg-white rounded-full border-4 border-pokemon-dark flex items-center justify-center shadow-inner overflow-hidden relative">
                <div className="absolute top-1/2 w-full h-1 bg-pokemon-dark"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-pokemon-dark rounded-full z-10"></div>
              </div>
              <h1 className="text-2xl font-black font-display tracking-wider drop-shadow-md">
                <span className="text-pokemon-yellow">포켓 카드</span> 헌터
              </h1>
            </Link>

            <div className="flex space-x-4 items-center">
              {/* Desktop Nav Items can go here if we want duplicate or different structure, 
                   but for now let's keep it simple or hide specific mobile nav items if needed */}
              <Link to="/" className="hover:text-pokemon-yellow font-bold transition-colors">스캔</Link>
              <Link to="/pokedex" className="hover:text-pokemon-yellow font-bold transition-colors">도감</Link>
              <Link to="/parent" className="hover:text-pokemon-yellow font-bold transition-colors">부모 모드</Link>
              <div className="flex items-center gap-3 text-xs text-pokemon-yellow/80">
                <Link to="/privacy" className="hover:text-pokemon-yellow transition-colors">개인정보처리방침</Link>
                <span>|</span>
                <Link to="/terms" className="hover:text-pokemon-yellow transition-colors">이용약관</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar (Logo Only) */}
      <div className="bg-pokemon-red text-white shadow-lg py-3 px-4 sm:hidden sticky top-0 z-50 rounded-b-3xl border-b-4 border-red-700">
        <div className="flex justify-center items-center relative">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full border-4 border-pokemon-dark flex items-center justify-center shadow-inner overflow-hidden relative animate-spin-slow">
              <div className="absolute top-1/2 w-full h-1 bg-pokemon-dark"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-pokemon-dark rounded-full z-10"></div>
            </div>
            <h1 className="text-xl font-black font-display tracking-wider flex gap-1">
              <span className="text-pokemon-yellow drop-shadow-md">포켓 카드</span>
              <span>헌터</span>
            </h1>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-slate-100 sm:hidden z-50 h-20">
        <nav className="h-full flex justify-around items-center px-2">
          <NavItem to="/" icon="📸" label="스캔" />
          <NavItem to="/pokedex" icon="📖" label="도감" />
          <NavItem to="/parent" icon="👨‍👩‍👧" label="부모님" />
        </nav>
      </div>
    </div>
  )
}



