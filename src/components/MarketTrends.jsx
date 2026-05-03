import React from 'react'
import { sectorData } from '../data/mockData'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine, Cell
} from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const v = payload[0].value
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 text-sm shadow-lg">
      <span className={`font-semibold ${v >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
        {v >= 0 ? '+' : ''}{v.toFixed(2)}%
      </span>
    </div>
  )
}

export default function MarketTrends() {
  const sorted = [...sectorData].sort((a, b) => b.change - a.change)

  return (
    <div className="space-y-5">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Market Trends</h1>

      {/* Sector Bar Chart */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Sector Performance (Today)</h2>
        <p className="text-xs text-gray-400 mb-5">Daily % change by sector</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={sorted} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="sector" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
            <ReferenceLine y={0} stroke="#e5e7eb" strokeDasharray="0" />
            <Bar dataKey="change" radius={[4, 4, 0, 0]}>
              {sorted.map((entry, i) => (
                <Cell key={i} fill={entry.change >= 0 ? '#10b981' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sector Cards */}
      <div className="grid grid-cols-4 gap-4">
        {sorted.map(s => (
          <div key={s.sector} className="card p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{s.sector}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xl font-semibold ${s.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
              </span>
              <div className={`w-2 h-2 rounded-full ${s.change >= 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
            </div>
            {/* Mini bar */}
            <div className="mt-3 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${s.change >= 0 ? 'bg-emerald-400' : 'bg-red-400'}`}
                style={{ width: `${Math.min(100, Math.abs(s.change) * 40)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
