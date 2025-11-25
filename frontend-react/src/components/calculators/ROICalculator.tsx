import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Percent, Clock } from 'lucide-react'
import Button from '../ui/Button'

interface ROICalculatorProps {
  propertyPrice?: number
}

const ROICalculator = ({ propertyPrice = 0 }: ROICalculatorProps) => {
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice || 50000000)
  const [monthlyRent, setMonthlyRent] = useState(2500000)
  const [annualExpenses, setAnnualExpenses] = useState(3000000)
  const [appreciationRate, setAppreciationRate] = useState(10) // annual %
  const [holdingPeriod, setHoldingPeriod] = useState(5) // years
  const [showResults, setShowResults] = useState(false)

  const calculateROI = () => {
    const annualRent = monthlyRent * 12
    const netAnnualIncome = annualRent - annualExpenses
    const totalRentalIncome = netAnnualIncome * holdingPeriod

    // Calculate property value after appreciation
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate / 100, holdingPeriod)
    const capitalGain = futureValue - purchasePrice

    // Total return
    const totalReturn = totalRentalIncome + capitalGain
    const totalROI = (totalReturn / purchasePrice) * 100
    const annualizedROI = totalROI / holdingPeriod

    // Rental yield
    const grossRentalYield = (annualRent / purchasePrice) * 100
    const netRentalYield = (netAnnualIncome / purchasePrice) * 100

    // Cash on cash return (assuming 20% down payment)
    const downPayment = purchasePrice * 0.2
    const cashOnCashReturn = (netAnnualIncome / downPayment) * 100

    // Break-even
    const breakEvenYears = purchasePrice / netAnnualIncome

    return {
      annualRent,
      netAnnualIncome,
      totalRentalIncome,
      futureValue,
      capitalGain,
      totalReturn,
      totalROI,
      annualizedROI,
      grossRentalYield,
      netRentalYield,
      cashOnCashReturn,
      breakEvenYears,
    }
  }

  const results = calculateROI()

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
  }

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-playfair font-bold text-premium-black">
            Investment ROI Calculator
          </h3>
          <p className="text-gray-600">Analyze your property investment potential</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {/* Purchase Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Purchase Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Monthly Rent */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expected Monthly Rent
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Annual Expenses */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Annual Expenses (maintenance, tax, insurance)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Appreciation Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Annual Appreciation Rate ({appreciationRate}%)
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={appreciationRate}
            onChange={(e) => setAppreciationRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Holding Period */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Holding Period ({holdingPeriod} years)
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={holdingPeriod}
            onChange={(e) => setHoldingPeriod(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 year</span>
            <span>30 years</span>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        variant="gold"
        size="lg"
        className="w-full mb-6 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800"
        onClick={() => setShowResults(true)}
      >
        <TrendingUp className="w-5 h-5" />
        Calculate Returns
      </Button>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Investment Score */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl p-6 text-white text-center">
            <p className="text-sm font-semibold mb-2 opacity-90">
              Total Return on Investment
            </p>
            <p className="text-5xl font-playfair font-extrabold mb-2">
              {formatPercent(results.totalROI)}
            </p>
            <p className="text-sm opacity-90">
              {formatPercent(results.annualizedROI)} per year
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-semibold text-gray-600">Total Return</p>
              </div>
              <p className="text-lg font-bold text-premium-black">
                {formatCurrency(results.totalReturn)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-semibold text-gray-600">Capital Gain</p>
              </div>
              <p className="text-lg font-bold text-premium-black">
                {formatCurrency(results.capitalGain)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-semibold text-gray-600">Rental Yield (Net)</p>
              </div>
              <p className="text-lg font-bold text-premium-black">
                {formatPercent(results.netRentalYield)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-semibold text-gray-600">Break-even</p>
              </div>
              <p className="text-lg font-bold text-premium-black">
                {results.breakEvenYears.toFixed(1)} years
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-premium-black mb-3">Detailed Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Rental Income:</span>
                <span className="font-semibold">{formatCurrency(results.annualRent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Net Annual Income:</span>
                <span className="font-semibold">{formatCurrency(results.netAnnualIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Rental Income ({holdingPeriod} years):</span>
                <span className="font-semibold">{formatCurrency(results.totalRentalIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Value (Future):</span>
                <span className="font-semibold">{formatCurrency(results.futureValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gross Rental Yield:</span>
                <span className="font-semibold">{formatPercent(results.grossRentalYield)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cash-on-Cash Return (20% down):</span>
                <span className="font-semibold">{formatPercent(results.cashOnCashReturn)}</span>
              </div>
            </div>
          </div>

          {/* Investment Rating */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-premium-black mb-2">Investment Rating</h4>
            <p className="text-sm text-gray-700">
              {results.annualizedROI > 15 ? (
                <span className="text-green-600 font-semibold">
                  ⭐⭐⭐⭐⭐ Excellent Investment
                </span>
              ) : results.annualizedROI > 10 ? (
                <span className="text-blue-600 font-semibold">
                  ⭐⭐⭐⭐ Good Investment
                </span>
              ) : results.annualizedROI > 5 ? (
                <span className="text-yellow-600 font-semibold">
                  ⭐⭐⭐ Moderate Investment
                </span>
              ) : (
                <span className="text-orange-600 font-semibold">
                  ⭐⭐ Below Average
                </span>
              )}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Based on projected returns and market conditions
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center">
            *This is a projection based on assumptions. Actual returns may vary due to market conditions,
            property management, and other factors. Consult with a financial advisor before investing.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ROICalculator
