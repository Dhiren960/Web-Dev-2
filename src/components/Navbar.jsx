import React, { useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../store/uiSlice'
import { setSearch, refreshPrices } from '../store/stocksSlice'
import { Moon, Sun, RefreshCw, TrendingUp, Search } from 'lucide-react'

const TABS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Watchlist', path: '/watchlist' },
  { label: 'Market Trends', path: '/trends' },
]

export default function Navbar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const darkMode = useSelector(s => s.ui.darkMode)
  const searchQuery = useSelector(s => s.stocks.searchQuery)
  const debounceRef = useRef(null)

  const handleSearch = useCallback((e) => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      dispatch(setSearch(e.target.value))
    }, 300)
  }, [dispatch])

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-6">
        {/* Brand */}
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white shrink-0">
          <TrendingUp size={20} className="text-indigo-500" />
          <span>StockPulse</span>
        </Link>

        {/* Nav Tabs */}
        <div className="flex gap-1">
          {TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors font-medium ${
                location.pathname === tab.path
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Market Status */}
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
          ● Market Open
        </span>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search stocks…"
            defaultValue={searchQuery}
            onChange={handleSearch}
            className="pl-8 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg w-44 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-white placeholder-gray-400"
          />
        </div>

        {/* Refresh */}
        <button
          onClick={() => dispatch(refreshPrices())}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          title="Refresh prices"
        >
          <RefreshCw size={16} />
        </button>

        {/* Dark Mode */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  )
}
