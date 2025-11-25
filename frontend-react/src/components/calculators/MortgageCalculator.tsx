import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Calculator, TrendingUp, Home } from 'lucide-react'
import Button from '../ui/Button'

interface MortgageCalculatorProps {
  propertyPrice?: number
}

const MortgageCalculator = ({ propertyPrice = 0 }: MortgageCalculatorProps) => {
  const [price, setPrice] = useState(propertyPrice || 50000000)
  const [deposit, setDeposit] = useState(20) // percentage
  const [interestRate, setInterestRate] = useState(15) // annual %
  const [loanTerm, setLoanTerm] = useState(20) // years
  const [showResults, setShowResults] = useState(false)

  const calculateMortgage = () => {
    const depositAmount = (price * deposit) / 100
    const loanAmount = price - depositAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    // Monthly payment calculation using formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - loanAmount

    return {
      depositAmount,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
    }
  }

  const results = calculateMortgage()

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-premium-black" />
        </div>
        <div>
          <h3 className="text-2xl font-playfair font-bold text-premium-black">
            Mortgage Calculator
          </h3>
          <p className="text-gray-600">Estimate your monthly payments</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {/* Property Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              ₦
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-luxury-gold focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Deposit */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Deposit ({deposit}%)
            </label>
            <span className="text-sm font-bold text-luxury-gold">
              {formatCurrency(results.depositAmount)}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Interest Rate ({interestRate}% per annum)
            </label>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="0.5"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5%</span>
            <span>30%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Loan Term ({loanTerm} years)
            </label>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxury-gold"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        variant="gold"
        size="lg"
        className="w-full mb-6"
        onClick={() => setShowResults(true)}
      >
        <Calculator className="w-5 h-5" />
        Calculate Mortgage
      </Button>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Monthly Payment (Highlighted) */}
          <div className="bg-gradient-gold rounded-xl p-6 text-center">
            <p className="text-sm font-semibold text-premium-charcoal mb-2">
              Estimated Monthly Payment
            </p>
            <p className="text-4xl font-playfair font-extrabold text-premium-black">
              {formatCurrency(results.monthlyPayment)}
            </p>
          </div>

          {/* Other Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-luxury-gold" />
                <p className="text-xs font-semibold text-gray-600">Loan Amount</p>
              </div>
              <p className="text-lg font-bold text-premium-black">
                {formatCurrency(results.loanAmount)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-luxury-gold" />
                <p className="text-xs font-semibold text-gray-600">Total Interest</p>
              </div>
              <p className="text-lg font-bold text-premium-black">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Home className="w-4 h-4 text-luxury-gold" />
                <p className="text-xs font-semibold text-gray-600">
                  Total Amount Payable
                </p>
              </div>
              <p className="text-xl font-bold text-premium-black">
                {formatCurrency(results.totalPayment)}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center mt-4">
            *This is an estimate. Actual terms may vary based on lender requirements and
            your credit profile.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MortgageCalculator
