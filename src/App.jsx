import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import CameraScan from './pages/CameraScan'
import Pokedex from './pages/Pokedex'
import ParentMode from './pages/ParentMode'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CameraScan />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/parent" element={<ParentMode />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  )
}

export default App



