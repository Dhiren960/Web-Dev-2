import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchQuote, fetchOverview } from '../api/alphaVantage'
import { stocksData } from '../data/mockData'

export const fetchLiveQuote = createAsyncThunk(
  'stocks/fetchLiveQuote',
  async (ticker, { rejectWithValue }) => {
    try {
      const quote = await fetchQuote(ticker)
      if (!quote) return rejectWithValue('No data')
      return quote
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchStockOverview = createAsyncThunk(
  'stocks/fetchStockOverview',
  async (ticker, { rejectWithValue }) => {
    try {
      const overview = await fetchOverview(ticker)
      return { ticker, ...overview }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const stocksSlice = createSlice({
  name: 'stocks',
  initialState: {
    items: stocksData,
    searchQuery: '',
    filterSector: 'All',
    sortBy: 'ticker',
    sortDir: 'asc',
    selectedTicker: 'AAPL',
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    setSearch(state, action) { state.searchQuery = action.payload },
    setFilterSector(state, action) { state.filterSector = action.payload },
    setSort(state, action) {
      if (state.sortBy === action.payload) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc'
      } else {
        state.sortBy = action.payload
        state.sortDir = 'asc'
      }
    },
    setSelectedTicker(state, action) { state.selectedTicker = action.payload },
    refreshPrices(state) {
      state.items = state.items.map(s => {
        const delta = (Math.random() - 0.49) * 3
        return {
          ...s,
          price: parseFloat((s.price + delta).toFixed(2)),
          change: parseFloat(delta.toFixed(2)),
          changePct: parseFloat((s.changePct + (Math.random() - 0.5) * 0.3).toFixed(2)),
        }
      })
      state.lastUpdated = new Date().toISOString()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveQuote.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchLiveQuote.fulfilled, (state, action) => {
        state.loading = false
        state.lastUpdated = new Date().toISOString()
        const idx = state.items.findIndex(s => s.ticker === action.payload.ticker)
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload }
      })
      .addCase(fetchLiveQuote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch'
      })
      .addCase(fetchStockOverview.fulfilled, (state, action) => {
        const idx = state.items.findIndex(s => s.ticker === action.payload.ticker)
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload }
      })
  },
})

export const { setSearch, setFilterSector, setSort, setSelectedTicker, refreshPrices } = stocksSlice.actions
export default stocksSlice.reducer
