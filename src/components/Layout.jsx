import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <h1 className="text-base sm:text-xl font-bold text-gray-800">포켓몬 카드 스캐너</h1>
            </div>
            <div className="flex space-x-1 sm:space-x-2">
              <Link
                to="/"
                className={`px-2 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base font-medium ${isActive('/')
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
              >
                📷 스캔
              </Link>
              <Link
                to="/pokedex"
                className={`px-2 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base font-medium ${isActive('/pokedex')
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
              >
                📚 도감
              </Link>
              <Link
                to="/parent"
                className={`px-2 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base font-medium ${isActive('/parent')
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                  }`}
              >
                👨‍👩‍👧 부모 모드
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}



