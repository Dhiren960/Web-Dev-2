import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Watchlist from './components/Watchlist'
import MarketTrends from './components/MarketTrends'
import StockDetail from './components/StockDetail'

export default function App() {
  const darkMode = useSelector(s => s.ui.darkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main className="max-w-screen-xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/trends" element={<MarketTrends />} />
            <Route path="/stock/:ticker" element={<StockDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
