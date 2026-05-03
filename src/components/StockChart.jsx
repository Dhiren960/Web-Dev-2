import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChartRange, setChartTicker } from '../store/uiSlice'
import { fetchIntraday, fetchDaily } from '../api/alphaVantage'
import { chartData as mockChartData } from '../data/mockData'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts'
import { Loader2 } from 'lucide-react'

const RANGES = ['1D', '1W', '1M', '1Y']
const TICKERS = ['AAPL', 'MSFT', 'NVDA']
const COLORS = { AAPL: '#6366f1', MSFT: '#10b981', NVDA: '#f59e0b' }

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-3 shadow-lg text-sm">
      <p className="text-gray-400 text-xs mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span style={{ color: p.color }} className="font-semibold">{p.dataKey}</span>
          <span className="text-gray-900 dark:text-white font-mono">${p.value?.toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}

export default function StockChart() {
  const dispatch = useDispatch()
  const { chartRange, chartTicker } = useSelector(s => s.ui)
  const [liveData, setLiveData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setApiError(false)
      try {
        let data
        if (chartRange === '1D' || chartRange === '1W') {
          data = await fetchIntraday(chartTicker)
        } else {
          data = await fetchDaily(chartTicker, chartRange)
        }
        if (!cancelled && data && data.length > 0) {
          setLiveData(data)
        } else if (!cancelled) {
          setApiError(true)
        }
      } catch {
        if (!cancelled) setApiError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [chartRange, chartTicker])

  const data = useMemo(() => {
    if (liveData && liveData.length > 0) return liveData
    return mockChartData[chartRange]
  }, [liveData, chartRange])

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Price Chart</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {loading ? 'Fetching live data…' : apiError ? 'Mock data (API rate limit)' : 'Live · Alpha Vantage'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {TICKERS.map(t => (
              <button key={t} onClick={() => dispatch(setChartTicker(t))}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors border ${
                  chartTicker === t
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                    : 'border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}>{t}</button>
            ))}
          </div>
          <div className="flex gap-1">
            {RANGES.map(r => (
              <button key={r} onClick={() => dispatch(setChartRange(r))}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  chartRange === r
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}>{r}</button>
            ))}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={24} className="animate-spin text-indigo-400" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-main" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[chartTicker] || '#6366f1'} stopOpacity={0.2} />
                <stop offset="95%" stopColor={COLORS[chartTicker] || '#6366f1'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} width={60} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey={chartTicker} stroke={COLORS[chartTicker] || '#6366f1'}
              strokeWidth={2.5} fill="url(#grad-main)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
      <div className="flex gap-4 mt-3">
        {TICKERS.map(t => (
          <div key={t} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-1 rounded-full inline-block" style={{ background: COLORS[t] }} />{t}
          </div>
        ))}
      </div>
    </div>
  )
}
