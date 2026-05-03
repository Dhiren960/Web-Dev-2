import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { indices } from '../data/mockData'

export default function MarketIndices() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {indices.map(idx => (
        <div key={idx.name} className="card p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">{idx.name}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">{idx.value}</p>
          <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${idx.up ? 'text-emerald-500' : 'text-red-500'}`}>
            {idx.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {idx.change}
          </div>
        </div>
      ))}
    </div>
  )
}
