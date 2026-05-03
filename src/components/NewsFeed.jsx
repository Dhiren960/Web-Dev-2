import React from 'react'
import { newsData } from '../data/mockData'
import { Newspaper } from 'lucide-react'

export default function NewsFeed() {
  return (
    <div className="card p-5 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper size={16} className="text-indigo-500" />
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Market News</h2>
      </div>
      <div className="space-y-3 flex-1">
        {newsData.map(item => (
          <div key={item.id} className="pb-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                {item.ticker}
              </span>
              <span className="text-xs text-gray-400">{item.time}</span>
              <span className={`ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full ${
                item.sentiment === 'positive'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-50 dark:bg-red-950 text-red-500'
              }`}>
                {item.sentiment === 'positive' ? '▲' : '▼'}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.headline}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
