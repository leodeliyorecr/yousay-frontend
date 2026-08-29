import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TemplateView from './pages/TemplateView'
import CardView from './pages/CardView'
import TermsPage from './pages/TermsPage'
import BusinessCardView from './pages/BusinessCardView'
import BusinessCardForm from './pages/BusinessCardForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:lang/:slug" element={<Home />} />
        <Route path="/template/:id" element={<TemplateView />} />
        <Route path="/card/:hash" element={<CardView />} />
        <Route path="/terminos" element={<TermsPage />} />
        <Route path="/c/:code" element={<BusinessCardView />} />
        <Route path="/business-card/create" element={<BusinessCardForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App