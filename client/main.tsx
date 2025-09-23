import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import './global.css'
import NotFound from './pages/NotFound'
import ResumeBuilder from './pages/ResumeBuilder'
import Templates from './pages/Templates'
import Placeholder from './pages/Placeholder'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/placeholder" element={<Placeholder title={''} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
)