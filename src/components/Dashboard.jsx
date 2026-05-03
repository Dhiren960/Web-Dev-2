import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { refreshPrices } from '../store/stocksSlice'
import { fetchLiveQuote } from '../store/stocksSlice'
import MarketIndices from './MarketIndices'
import StockChart from './StockChart'
import StockTable from './StockTable'
import NewsFeed from './NewsFeed'

// Only fetch a couple quotes on load to stay within free tier (5 req/min)
const LIVE_TICKERS = ['AAPL', 'MSFT']

export default function Dashboard() {
  const dispatch = useDispatch()
  const lastUpdated = useSelector(s => s.stocks.lastUpdated)
  const intervalRef = useRef(null)

  useEffect(() => {
    // Fetch live quotes for key tickers on mount
    LIVE_TICKERS.forEach(ticker => dispatch(fetchLiveQuote(ticker)))

    // Simulate refresh for rest every 15s (to avoid rate limit)
    intervalRef.current = setInterval(() => {
      dispatch(refreshPrices())
    }, 15000)
    return () => clearInterval(intervalRef.current)
  }, [dispatch])

  return (
    <div className="space-y-5">
      {lastUpdated && (
        <p className="text-xs text-gray-400 text-right">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      )}
      <MarketIndices />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2"><StockChart /></div>
        <div className="col-span-1"><NewsFeed /></div>
      </div>
      <StockTable />
    </div>
  )
}
