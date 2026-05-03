import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setFilterSector, setSort } from '../store/stocksSlice'
import { toggleWatchlist } from '../store/watchlistSlice'
import { Star, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

const SECTORS = ['All', 'Technology', 'Semiconductors', 'Finance', 'Automotive', 'E-Commerce', 'Entertainment']

export default function StockTable() {
  const dispatch = useDispatch()
  const { items, searchQuery, filterSector, sortBy, sortDir } = useSelector(s => s.stocks)
  const watchlist = useSelector(s => s.watchlist.tickers)
  const [page, setPage] = useState(1)
  const PER_PAGE = 6

  const filtered = useMemo(() => {
    let list = [...items]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(s => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q))
    }
    if (filterSector !== 'All') {
      list = list.filter(s => s.sector === filterSector)
    }
    list.sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy]
      if (typeof av === 'string') av = av.toLowerCase()
      if (typeof bv === 'string') bv = bv.toLowerCase()
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1)
    })
    return list
  }, [items, searchQuery, filterSector, sortBy, sortDir])

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  function SortIcon({ col }) {
    if (sortBy !== col) return <ArrowUpDown size={12} className="text-gray-300" />
    return sortDir === 'asc' ? <ArrowUp size={12} className="text-indigo-500" /> : <ArrowDown size={12} className="text-indigo-500" />
  }

  function Th({ col, label, right }) {
    return (
      <th
        onClick={() => dispatch(setSort(col))}
        className={`px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 select-none ${right ? 'text-right' : 'text-left'}`}
      >
        <span className="flex items-center gap-1 whitespace-nowrap" style={right ? { justifyContent: 'flex-end' } : {}}>
          {label} <SortIcon col={col} />
        </span>
      </th>
    )
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">All Stocks</h2>
        <div className="flex gap-1.5">
          {SECTORS.map(s => (
            <button
              key={s}
              onClick={() => { dispatch(setFilterSector(s)); setPage(1) }}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                filterSector === s
                  ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 w-8" />
              <Th col="ticker" label="Ticker" />
              <Th col="price" label="Price" right />
              <Th col="changePct" label="Change" right />
              <Th col="volume" label="Volume" right />
              <Th col="mktCap" label="Mkt Cap" right />
              <Th col="pe" label="P/E" right />
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {paginated.map(stock => {
              const inWL = watchlist.includes(stock.ticker)
              const up = stock.changePct >= 0
              return (
                <tr key={stock.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <button onClick={() => dispatch(toggleWatchlist(stock.ticker))} className="text-gray-300 dark:text-gray-600 hover:text-amber-400 transition-colors">
                      <Star size={15} fill={inWL ? '#f59e0b' : 'none'} stroke={inWL ? '#f59e0b' : 'currentColor'} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/stock/${stock.ticker}`} className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{stock.ticker}</span>
                      <span className="text-xs text-gray-400">{stock.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-medium text-gray-900 dark:text-white">${stock.price.toFixed(2)}</td>
                  <td className={`px-4 py-3 text-right text-sm font-medium ${up ? 'text-emerald-500' : 'text-red-500'}`}>
                    {up ? '+' : ''}{stock.changePct.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">{stock.volume}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">{stock.mktCap}</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">{stock.pe}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/stock/${stock.ticker}`} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                      Details →
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400">{filtered.length} results</p>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-7 h-7 text-xs rounded-md font-medium transition-colors ${
                  page === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
