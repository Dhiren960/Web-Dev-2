import axios from 'axios'

const BASE_URL = 'https://www.alphavantage.co/query'
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY

// Fetch real-time quote for a single ticker
export async function fetchQuote(symbol) {
  const res = await axios.get(BASE_URL, {
    params: {
      function: 'GLOBAL_QUOTE',
      symbol,
      apikey: API_KEY,
    },
  })
  const q = res.data['Global Quote']
  if (!q || !q['05. price']) return null
  return {
    ticker: q['01. symbol'],
    price: parseFloat(q['05. price']),
    change: parseFloat(q['09. change']),
    changePct: parseFloat(q['10. change percent'].replace('%', '')),
    volume: formatVolume(parseInt(q['06. volume'])),
    high52: parseFloat(q['03. high']),
    low52: parseFloat(q['04. low']),
  }
}

// Fetch intraday chart data (1min intervals, compact)
export async function fetchIntraday(symbol) {
  const res = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval: '30min',
      outputsize: 'compact',
      apikey: API_KEY,
    },
  })
  const series = res.data['Time Series (30min)']
  if (!series) return []
  return Object.entries(series)
    .slice(0, 14)
    .reverse()
    .map(([time, vals]) => ({
      label: time.slice(11, 16),
      [symbol]: parseFloat(vals['4. close']),
    }))
}

// Fetch daily chart data for 1M / 1Y
export async function fetchDaily(symbol, range = '1M') {
  const res = await axios.get(BASE_URL, {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize: 'compact',
      apikey: API_KEY,
    },
  })
  const series = res.data['Time Series (Daily)']
  if (!series) return []
  const entries = Object.entries(series).reverse()
  const sliced = range === '1Y' ? entries.slice(-252) : entries.slice(-22)
  return sliced.map(([date, vals]) => ({
    label: range === '1Y' ? date.slice(5, 10) : date.slice(5),
    [symbol]: parseFloat(vals['4. close']),
  }))
}

// Fetch company overview (P/E, mktCap, sector)
export async function fetchOverview(symbol) {
  const res = await axios.get(BASE_URL, {
    params: {
      function: 'OVERVIEW',
      symbol,
      apikey: API_KEY,
    },
  })
  const d = res.data
  return {
    sector: d.Sector || 'N/A',
    mktCap: formatCap(d.MarketCapitalization),
    pe: parseFloat(d.PERatio) || 'N/A',
    high52: parseFloat(d['52WeekHigh']) || 0,
    low52: parseFloat(d['52WeekLow']) || 0,
    name: d.Name || symbol,
  }
}

// Search tickers
export async function searchTickers(query) {
  const res = await axios.get(BASE_URL, {
    params: {
      function: 'SYMBOL_SEARCH',
      keywords: query,
      apikey: API_KEY,
    },
  })
  return (res.data.bestMatches || []).slice(0, 6).map(m => ({
    ticker: m['1. symbol'],
    name: m['2. name'],
    region: m['4. region'],
  }))
}

// ── Helpers ────────────────────────────────────────────────────────────────
function formatVolume(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return String(n)
}

function formatCap(n) {
  n = parseInt(n)
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(2) + 'T'
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + 'M'
  return String(n)
}
