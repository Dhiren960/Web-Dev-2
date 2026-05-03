import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleWatchlist } from '../store/watchlistSlice'
import { Star, TrendingUp, TrendingDown } from 'lucide-react'

export default function Watchlist() {
  const dispatch = useDispatch()
  const tickers = useSelector(s => s.watchlist.tickers)
  const stocks = useSelector(s => s.stocks.items.filter(st => tickers.includes(st.ticker)))

  if (stocks.length === 0) {
    return (
      <div className="card p-16 text-center">
        <Star size={40} className="mx-auto text-gray-200 dark:text-gray-700 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Your watchlist is empty.</p>
        <p className="text-sm text-gray-400 mt-1">Star stocks from the Dashboard to add them here.</p>
        <Link to="/dashboard" className="mt-4 inline-block btn-primary">Browse Stocks</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Watchlist <span className="text-sm text-gray-400 font-normal">({stocks.length} stocks)</span></h1>
      <div className="grid grid-cols-2 gap-4">
        {stocks.map(stock => {
          const up = stock.changePct >= 0
          return (
            <div key={stock.id} className="card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <Link to={`/stock/${stock.ticker}`} className="font-bold text-gray-900 dark:text-white text-lg hover:text-indigo-600 dark:hover:text-indigo-400">{stock.ticker}</Link>
                  <p className="text-xs text-gray-400">{stock.name}</p>
                </div>
                <button onClick={() => dispatch(toggleWatchlist(stock.ticker))} className="text-amber-400 hover:text-gray-300 transition-colors">
                  <Star size={18} fill="#f59e0b" />
                </button>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold font-mono text-gray-900 dark:text-white">${stock.price.toFixed(2)}</span>
                <div className={`flex items-center gap-1 text-sm font-medium ${up ? 'text-emerald-500' : 'text-red-500'}`}>
                  {up ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                  {up ? '+' : ''}{stock.changePct.toFixed(2)}%
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50 dark:border-gray-800">
                {[['Volume', stock.volume], ['P/E', stock.pe], ['Mkt Cap', stock.mktCap]].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
