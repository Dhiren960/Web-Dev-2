// ── Mock Stock Data ────────────────────────────────────────────────────────
export const stocksData = [
  { id: 1, ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 189.30, change: 2.45, changePct: 1.31, volume: '58.2M', mktCap: '2.94T', high52: 199.62, low52: 164.08, pe: 30.2, inWatchlist: true },
  { id: 2, ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: 415.60, change: -3.10, changePct: -0.74, volume: '22.1M', mktCap: '3.09T', high52: 430.82, low52: 309.45, pe: 37.1, inWatchlist: true },
  { id: 3, ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 171.95, change: 1.80, changePct: 1.06, volume: '24.3M', mktCap: '2.14T', high52: 191.75, low52: 130.67, pe: 26.8, inWatchlist: false },
  { id: 4, ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Semiconductors', price: 875.40, change: 22.30, changePct: 2.62, volume: '41.8M', mktCap: '2.16T', high52: 974.00, low52: 373.21, pe: 68.5, inWatchlist: true },
  { id: 5, ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', price: 177.90, change: -5.40, changePct: -2.95, volume: '94.7M', mktCap: '567B', high52: 299.29, low52: 138.80, pe: 45.2, inWatchlist: false },
  { id: 6, ticker: 'META', name: 'Meta Platforms', sector: 'Technology', price: 511.80, change: 8.60, changePct: 1.71, volume: '16.4M', mktCap: '1.31T', high52: 531.49, low52: 274.38, pe: 33.7, inWatchlist: true },
  { id: 7, ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-Commerce', price: 185.70, change: 0.95, changePct: 0.51, volume: '35.6M', mktCap: '1.93T', high52: 201.20, low52: 118.35, pe: 60.1, inWatchlist: false },
  { id: 8, ticker: 'JPM',  name: 'JPMorgan Chase', sector: 'Finance', price: 198.45, change: -1.20, changePct: -0.60, volume: '11.2M', mktCap: '572B', high52: 205.88, low52: 140.27, pe: 12.4, inWatchlist: false },
  { id: 9, ticker: 'V',    name: 'Visa Inc.', sector: 'Finance', price: 276.30, change: 3.15, changePct: 1.15, volume: '7.8M', mktCap: '565B', high52: 290.96, low52: 220.64, pe: 31.6, inWatchlist: false },
  { id: 10, ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', price: 628.90, change: 11.40, changePct: 1.85, volume: '5.2M', mktCap: '274B', high52: 700.00, low52: 344.73, pe: 47.3, inWatchlist: true },
]

// ── Generate Chart Data ───────────────────────────────────────────────────
function genSeries(base, points, volatility = 0.015) {
  const data = []
  let price = base
  for (let i = 0; i < points; i++) {
    price = price * (1 + (Math.random() - 0.48) * volatility)
    data.push(parseFloat(price.toFixed(2)))
  }
  return data
}

const dayLabels = ['9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00']
const weekLabels = ['Mon','Tue','Wed','Thu','Fri']
const monthLabels = Array.from({ length: 22 }, (_, i) => `D${i + 1}`)
const yearLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export const chartData = {
  '1D': dayLabels.map((label, i) => ({ label, AAPL: genSeries(186, 14)[i], SPY: genSeries(520, 14)[i], NVDA: genSeries(860, 14)[i] })),
  '1W': weekLabels.map((label, i) => ({ label, AAPL: genSeries(183, 5)[i], SPY: genSeries(517, 5)[i], NVDA: genSeries(845, 5)[i] })),
  '1M': monthLabels.map((label, i) => ({ label, AAPL: genSeries(178, 22)[i], SPY: genSeries(510, 22)[i], NVDA: genSeries(820, 22)[i] })),
  '1Y': yearLabels.map((label, i) => ({ label, AAPL: genSeries(165, 12)[i], SPY: genSeries(475, 12)[i], NVDA: genSeries(600, 12)[i] })),
}

// ── Market Indices ────────────────────────────────────────────────────────
export const indices = [
  { name: 'S&P 500',   value: '5,243.77', change: '+0.87%', up: true  },
  { name: 'NASDAQ',    value: '16,384.20', change: '+1.12%', up: true  },
  { name: 'DOW JONES', value: '39,118.86', change: '-0.23%', up: false },
  { name: 'VIX',       value: '14.32',    change: '-3.41%', up: false },
]

// ── Sector Performance ────────────────────────────────────────────────────
export const sectorData = [
  { sector: 'Technology',    change: 1.84 },
  { sector: 'Healthcare',    change: 0.43 },
  { sector: 'Finance',       change: -0.31 },
  { sector: 'Energy',        change: -1.20 },
  { sector: 'Consumer',      change: 0.67 },
  { sector: 'Industrials',   change: 0.12 },
  { sector: 'Real Estate',   change: -0.88 },
  { sector: 'Utilities',     change: -0.54 },
]

// ── News Feed ─────────────────────────────────────────────────────────────
export const newsData = [
  { id: 1, ticker: 'NVDA', headline: 'NVIDIA smashes Q1 expectations on AI chip demand surge', time: '2m ago', sentiment: 'positive' },
  { id: 2, ticker: 'TSLA', headline: 'Tesla cuts prices in Europe amid slowing EV demand', time: '15m ago', sentiment: 'negative' },
  { id: 3, ticker: 'META', headline: 'Meta launches new AI assistant across all apps', time: '42m ago', sentiment: 'positive' },
  { id: 4, ticker: 'AAPL', headline: 'Apple plans major expansion of App Store developer tools', time: '1h ago', sentiment: 'positive' },
  { id: 5, ticker: 'JPM',  headline: 'Fed signals rate cuts may be delayed to late 2024', time: '2h ago', sentiment: 'negative' },
]
