import { createSlice } from '@reduxjs/toolkit'
import { stocksData } from '../data/mockData'

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    tickers: stocksData.filter(s => s.inWatchlist).map(s => s.ticker),
  },
  reducers: {
    toggleWatchlist(state, action) {
      const ticker = action.payload
      if (state.tickers.includes(ticker)) {
        state.tickers = state.tickers.filter(t => t !== ticker)
      } else {
        state.tickers.push(ticker)
      }
    },
  },
})

export const { toggleWatchlist } = watchlistSlice.actions
export default watchlistSlice.reducer
