import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { languages } from '../utils/translations'

export default function Layout({ children }) {
  const location = useLocation()
  const { language, changeLanguage, translate } = useLanguage()
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
                <span className="text-pokemon-yellow">{translate('appName')}</span>
              </h1>
            </Link>

            <div className="flex space-x-4 items-center">
              <Link to="/" className="hover:text-pokemon-yellow font-bold transition-colors">{translate('nav.scan')}</Link>
              <Link to="/pokedex" className="hover:text-pokemon-yellow font-bold transition-colors">{translate('nav.pokedex')}</Link>
              <Link to="/parent" className="hover:text-pokemon-yellow font-bold transition-colors">{translate('nav.parentMode')}</Link>

              {/* 언어 선택 */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-sm">
                  <span>{languages.find(l => l.code === language)?.flag || '🌐'}</span>
                  <span className="hidden md:inline">{translate('nav.language')}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${language === lang.code ? 'bg-pokemon-blue/10 font-bold text-pokemon-blue' : 'text-gray-700'
                        }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-pokemon-yellow/80">
                <Link to="/privacy" className="hover:text-pokemon-yellow transition-colors">{translate('nav.privacy')}</Link>
                <span>|</span>
                <Link to="/terms" className="hover:text-pokemon-yellow transition-colors">{translate('nav.terms')}</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar (Logo Only) */}
      <div 
        className="bg-pokemon-red text-white shadow-lg pb-4 px-4 sm:hidden sticky top-0 z-50 rounded-b-3xl border-b-4 border-red-700"
        style={{ paddingTop: `max(env(safe-area-inset-top, 0px), 20px)` }}
      >
        <div className="flex justify-between items-center relative min-h-[44px]">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full border-4 border-pokemon-dark flex items-center justify-center shadow-inner overflow-hidden relative animate-spin-slow">
              <div className="absolute top-1/2 w-full h-1 bg-pokemon-dark"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border-2 border-pokemon-dark rounded-full z-10"></div>
            </div>
            <h1 className="text-xl font-black font-display tracking-wider flex gap-1">
              <span className="text-pokemon-yellow drop-shadow-md">{translate('appName')}</span>
            </h1>
          </Link>

          {/* 모바일 언어 선택 */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs">
              <span>{languages.find(l => l.code === language)?.flag || '🌐'}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${language === lang.code ? 'bg-pokemon-blue/10 font-bold text-pokemon-blue' : 'text-gray-700'
                    }`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-xs">{lang.name}</span>
                </button>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link to="/privacy" className="block w-full text-left px-3 py-2 text-[10px] text-gray-400 hover:text-pokemon-blue transition-colors">
                  {translate('nav.privacy')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-slate-100 sm:hidden z-50 h-20">
        <nav className="h-full flex justify-around items-center px-2">
          <NavItem to="/" icon="📸" label={translate('nav.scan')} />
          <NavItem to="/pokedex" icon="📖" label={translate('nav.pokedex')} />
          <NavItem to="/parent" icon="👨‍👩‍👧" label={translate('nav.parent')} />
        </nav>
      </div>
    </div>
  )
}



