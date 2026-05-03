import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: false,
    activeTab: 'dashboard',
    chartRange: '1D',
    chartTicker: 'AAPL',
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload
    },
    setChartRange(state, action) {
      state.chartRange = action.payload
    },
    setChartTicker(state, action) {
      state.chartTicker = action.payload
    },
  },
})

export const { toggleDarkMode, setActiveTab, setChartRange, setChartTicker } = uiSlice.actions
export default uiSlice.reducer
