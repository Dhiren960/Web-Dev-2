# StockPulse – Stock Market Dashboard

A data-heavy React frontend capstone project for a **Stock Market Dashboard** with charts, watchlist, market trends, and search/filter/sort functionality.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Language | JavaScript (ES6+) |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| API/Data | Mock data (swap with Alpha Vantage / Finnhub) |

## Features

- **Dashboard** – Market indices, live area chart (AAPL/SPY/NVDA), paginated stock table, news feed
- **Stock Chart** – 1D / 1W / 1M / 1Y range selector, multi-ticker overlay, custom tooltip
- **Watchlist** – Star/unstar stocks, saved in Redux store
- **Market Trends** – Sector performance bar chart + cards
- **Stock Detail Page** – Full stats, 30-day chart, watchlist toggle
- **Search** – Debounced search across ticker + company name
- **Filter** – By sector (Technology, Finance, etc.)
- **Sort** – Click any column header (ticker, price, changePct, volume, mktCap, P/E)
- **Pagination** – 6 rows per page
- **Dark Mode** – Full Tailwind dark mode toggle
- **Auto Refresh** – Prices refresh every 15 seconds (simulated)

## Advanced Features Covered (Capstone Checklist)

- [x] Pagination
- [x] Search + filter + sort
- [x] Dark mode toggle
- [x] Real-time data refresh
- [x] Debounced API calls (search input)
- [x] Dashboard with charts (Recharts AreaChart + BarChart)
- [x] Redux Toolkit state management

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173)

## Connecting a Real API

Replace mock data in `src/data/mockData.js` with live API calls.

**Free APIs to consider:**
- [Alpha Vantage](https://www.alphavantage.co/) – Stock prices, fundamentals
- [Finnhub](https://finnhub.io/) – Real-time quotes, news
- [Polygon.io](https://polygon.io/) – Market data
- [Yahoo Finance (unofficial)](https://github.com/ranaroussi/yfinance)

Example Axios integration in `src/store/stocksSlice.js`:

```js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async (symbol) => {
  const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=YOUR_KEY`)
  return res.data
})
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Nav, search, dark mode
│   ├── Dashboard.jsx       # Main page layout
│   ├── MarketIndices.jsx   # Index cards (S&P, NASDAQ…)
│   ├── StockChart.jsx      # Area chart with range/ticker selector
│   ├── StockTable.jsx      # Sortable/filterable/paginated table
│   ├── NewsFeed.jsx        # Market news sidebar
│   ├── Watchlist.jsx       # Watchlist page
│   ├── MarketTrends.jsx    # Sector bar chart page
│   └── StockDetail.jsx     # Individual stock detail page
├── store/
│   ├── store.js            # Redux configureStore
│   ├── stocksSlice.js      # Stocks state + search/filter/sort/refresh
│   ├── watchlistSlice.js   # Watchlist CRUD
│   └── uiSlice.js          # Dark mode, active tab, chart range
├── data/
│   └── mockData.js         # Mock stocks, chart data, news, sectors
├── App.jsx                 # Router setup
├── main.jsx                # Entry point
└── index.css               # Tailwind base
```

## Deployment

Deploy instantly to Vercel:

```bash
npm install -g vercel
vercel
```

Or Netlify:
```bash
npm run build
# Upload dist/ folder to Netlify
```
