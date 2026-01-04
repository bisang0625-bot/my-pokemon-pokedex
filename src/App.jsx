import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CameraScan from './pages/CameraScan'
import Pokedex from './pages/Pokedex'
import ParentMode from './pages/ParentMode'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CameraScan />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/parent" element={<ParentMode />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App



