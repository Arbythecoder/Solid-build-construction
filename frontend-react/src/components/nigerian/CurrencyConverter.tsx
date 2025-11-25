import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, TrendingDown, RefreshCw,
  ArrowDownUp, Clock, AlertCircle, Info,
  BarChart3, Calendar, ExternalLink
} from 'lucide-react'

interface ExchangeRate {
  currency: string
  symbol: string
  flag: string
  buyRate: number
  sellRate: number
  change24h: number
  lastUpdated: string
}

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('NGN')
  const [toCurrency, setToCurrency] = useState('USD')
  const [amount, setAmount] = useState(50000000) // 50M Naira default (property price)
  const [result, setResult] = useState(0)
  const [loading, setLoading] = useState(false)

  // Mock exchange rates - In production, fetch from an API
  const exchangeRates: ExchangeRate[] = [
    {
      currency: 'USD',
      symbol: '$',
      flag: '🇺🇸',
      buyRate: 1550, // 1 USD = 1550 NGN
      sellRate: 1500,
      change24h: +0.5,
      lastUpdated: new Date().toISOString()
    },
    {
      currency: 'GBP',
      symbol: '£',
      flag: '🇬🇧',
      buyRate: 1900,
      sellRate: 1850,
      change24h: +0.8,
      lastUpdated: new Date().toISOString()
    },
    {
      currency: 'EUR',
      symbol: '€',
      flag: '🇪🇺',
      buyRate: 1650,
      sellRate: 1600,
      change24h: -0.3,
      lastUpdated: new Date().toISOString()
    },
    {
      currency: 'NGN',
      symbol: '₦',
      flag: '🇳🇬',
      buyRate: 1,
      sellRate: 1,
      change24h: 0,
      lastUpdated: new Date().toISOString()
    }
  ]

  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' }
  ]

  useEffect(() => {
    calculateConversion()
  }, [amount, fromCurrency, toCurrency])

  const calculateConversion = () => {
    if (fromCurrency === toCurrency) {
      setResult(amount)
      return
    }

    // Get rates
    const fromRate = exchangeRates.find(r => r.currency === fromCurrency)
    const toRate = exchangeRates.find(r => r.currency === toCurrency)

    if (!fromRate || !toRate) {
      setResult(0)
      return
    }

    // Convert to NGN first (base currency)
    let amountInNGN = amount
    if (fromCurrency !== 'NGN') {
      amountInNGN = amount * fromRate.sellRate
    }

    // Convert from NGN to target currency
    let converted = amountInNGN
    if (toCurrency !== 'NGN') {
      converted = amountInNGN / toRate.buyRate
    }

    setResult(converted)
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const refreshRates = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // In production, fetch new rates here
    }, 1000)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num)
  }

  const getSymbol = (code: string) => {
    const curr = currencies.find(c => c.code === code)
    return curr?.symbol || ''
  }

  const getRate = (from: string, to: string) => {
    if (from === to) return 1

    const fromRate = exchangeRates.find(r => r.currency === from)
    const toRate = exchangeRates.find(r => r.currency === to)

    if (!fromRate || !toRate) return 0

    if (from === 'NGN') {
      return 1 / toRate.buyRate
    } else if (to === 'NGN') {
      return fromRate.sellRate
    } else {
      return fromRate.sellRate / toRate.buyRate
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-luxury-gold to-premium-orange">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-playfair font-bold text-white mb-2">
              Currency Converter
            </h2>
            <p className="text-white/90">Real-time Naira exchange rates for property buyers</p>
          </div>
          <button
            onClick={refreshRates}
            disabled={loading}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-6 h-6 text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Converter */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* From Currency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From
            </label>
            <div className="relative">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold appearance-none"
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-4 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="hidden lg:flex items-center justify-center">
            <button
              onClick={swapCurrencies}
              className="p-4 bg-luxury-gold hover:bg-luxury-gold/90 rounded-full transition-colors"
            >
              <ArrowDownUp className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Swap Button Mobile */}
          <div className="lg:hidden flex items-center justify-center -my-2">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-luxury-gold hover:bg-luxury-gold/90 rounded-full transition-colors"
            >
              <ArrowDownUp className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To
            </label>
            <div className="relative">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold appearance-none"
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 bg-luxury-gold/10 border-2 border-luxury-gold rounded-xl px-4 py-4">
              <div className="text-3xl font-bold text-luxury-gold">
                {getSymbol(toCurrency)} {formatNumber(result)}
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">
              1 {fromCurrency} = {formatNumber(getRate(fromCurrency, toCurrency))} {toCurrency}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Updated: {new Date().toLocaleTimeString('en-NG')}
            </span>
          </div>
        </div>

        {/* Quick Amounts (for NGN to USD) */}
        {fromCurrency === 'NGN' && toCurrency === 'USD' && (
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Quick Convert (Property Prices)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[10000000, 50000000, 100000000, 250000000].map(quickAmount => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    amount === quickAmount
                      ? 'border-luxury-gold bg-luxury-gold/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-xs text-gray-600">₦{(quickAmount / 1000000).toFixed(0)}M</div>
                  <div className="text-sm font-bold text-gray-900">
                    ${formatNumber(quickAmount / exchangeRates.find(r => r.currency === 'USD')!.buyRate)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exchange Rates Table */}
      <div className="px-6 pb-6">
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-luxury-gold" />
              Current Exchange Rates
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Currency</th>
                  <th className="text-right p-3 text-sm font-semibold text-gray-700">Buy Rate</th>
                  <th className="text-right p-3 text-sm font-semibold text-gray-700">Sell Rate</th>
                  <th className="text-right p-3 text-sm font-semibold text-gray-700">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates.filter(r => r.currency !== 'NGN').map(rate => (
                  <tr key={rate.currency} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{rate.flag}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{rate.currency}</div>
                          <div className="text-xs text-gray-600">per ₦1</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right font-semibold text-gray-900">
                      ₦{formatNumber(rate.buyRate)}
                    </td>
                    <td className="p-3 text-right font-semibold text-gray-900">
                      ₦{formatNumber(rate.sellRate)}
                    </td>
                    <td className="p-3 text-right">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${
                        rate.change24h > 0
                          ? 'bg-green-100 text-green-700'
                          : rate.change24h < 0
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {rate.change24h > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : rate.change24h < 0 ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : null}
                        <span className="text-xs font-semibold">
                          {rate.change24h > 0 ? '+' : ''}{rate.change24h}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Important Info */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">About Exchange Rates</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• <strong>Buy Rate:</strong> Rate at which banks/bureaux buy foreign currency from you (you sell to them)</li>
                <li>• <strong>Sell Rate:</strong> Rate at which banks/bureaux sell foreign currency to you (you buy from them)</li>
                <li>• Rates update daily based on CBN (Central Bank of Nigeria) official rates</li>
                <li>• Actual rates may vary by bank and exchange bureau</li>
                <li>• Use for estimation only - confirm with your bank before transfers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Diaspora Info */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-br from-luxury-gold/10 to-premium-orange/10 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-luxury-gold" />
            Sending Money from Abroad?
          </h3>
          <p className="text-gray-700 mb-4">
            For property purchases from abroad, we recommend:
          </p>
          <ul className="space-y-2 text-sm text-gray-700 mb-4">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
              <span>Use official banking channels (wire transfers) for large amounts</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
              <span>Compare rates across multiple providers (banks, Wise, Western Union)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
              <span>Factor in transfer fees (typically $15-$50 per transaction)</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
              <span>Allow 2-5 business days for international transfers</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
              <span>Keep all transaction receipts for property documentation</span>
            </li>
          </ul>
          <button className="text-luxury-gold hover:text-luxury-gold/80 font-semibold flex items-center gap-1">
            View Diaspora Investment Guide
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Historical Chart Placeholder */}
      <div className="px-6 pb-6">
        <div className="border rounded-xl p-6 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Historical Exchange Rates</h3>
          <p className="text-sm text-gray-600 mb-4">
            View 30-day, 90-day, and 1-year exchange rate trends
          </p>
          <button className="px-6 py-2 bg-luxury-gold text-white rounded-xl hover:bg-luxury-gold/90 transition-colors">
            View Chart (Coming Soon)
          </button>
        </div>
      </div>

      {/* Warning */}
      <div className="px-6 pb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Disclaimer</h4>
              <p className="text-sm text-yellow-800">
                Exchange rates shown are for informational purposes only and may not reflect
                real-time market rates. Always verify current rates with your bank or exchange
                service before making financial decisions or property transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyConverter
