import { configureStore } from '@reduxjs/toolkit'
import stocksReducer from './stocksSlice'
import watchlistReducer from './watchlistSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    watchlist: watchlistReducer,
    ui: uiReducer,
  },
})
