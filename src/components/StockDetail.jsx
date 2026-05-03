import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWatchlist } from '../store/watchlistSlice'
import { Star, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react'
import { chartData } from '../data/mockData'
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts'

export default function StockDetail() {
  const { ticker } = useParams()
  const dispatch = useDispatch()
  const stock = useSelector(s => s.stocks.items.find(st => st.ticker === ticker))
  const inWL = useSelector(s => s.watchlist.tickers.includes(ticker))

  if (!stock) {
    return (
      <div className="card p-16 text-center">
        <p className="text-gray-500">Stock not found.</p>
        <Link to="/dashboard" className="mt-4 inline-block btn-primary">Back to Dashboard</Link>
      </div>
    )
  }

  const up = stock.changePct >= 0
  const data = chartData['1M']
  const chartKey = ['AAPL', 'SPY', 'NVDA'].includes(ticker) ? ticker : 'AAPL'

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="card p-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{stock.ticker}</h1>
            <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{stock.sector}</span>
          </div>
          <p className="text-gray-400 text-sm">{stock.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-3xl font-bold font-mono text-gray-900 dark:text-white">${stock.price.toFixed(2)}</p>
            <div className={`flex items-center justify-end gap-1 text-sm font-medium mt-0.5 ${up ? 'text-emerald-500' : 'text-red-500'}`}>
              {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {up ? '+' : ''}{stock.change.toFixed(2)} ({up ? '+' : ''}{stock.changePct.toFixed(2)}%)
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleWatchlist(ticker))}
            className={`p-2.5 rounded-xl border transition-colors ${inWL ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800' : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <Star size={18} fill={inWL ? '#f59e0b' : 'none'} stroke={inWL ? '#f59e0b' : '#9ca3af'} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          ['52W High', `$${stock.high52}`],
          ['52W Low', `$${stock.low52}`],
          ['Volume', stock.volume],
          ['Mkt Cap', stock.mktCap],
          ['P/E Ratio', stock.pe],
        ].map(([label, val]) => (
          <div key={label} className="card p-4">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">{val}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">30-Day Price History</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={up ? '#10b981' : '#ef4444'} stopOpacity={0.2} />
                <stop offset="95%" stopColor={up ? '#10b981' : '#ef4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} width={55} />
            <Tooltip formatter={v => [`$${v}`, chartKey]} />
            <Area type="monotone" dataKey={chartKey} stroke={up ? '#10b981' : '#ef4444'} strokeWidth={2} fill="url(#detailGrad)" dot={false} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
