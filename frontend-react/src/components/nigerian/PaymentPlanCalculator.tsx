import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calculator, Calendar, TrendingUp, Download, Share2,
  CheckCircle, AlertCircle, DollarSign, Clock, FileText
} from 'lucide-react'

interface PaymentSchedule {
  month: number
  date: string
  amount: number
  principal: number
  balance: number
  status: 'paid' | 'upcoming' | 'pending'
}

const PaymentPlanCalculator = ({ propertyPrice: initialPrice }: { propertyPrice?: number }) => {
  const [propertyPrice, setPropertyPrice] = useState(initialPrice || 50000000)
  const [downPayment, setDownPayment] = useState(20) // percentage
  const [duration, setDuration] = useState(24) // months
  const [interestRate, setInterestRate] = useState(5) // percentage per annum
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [activeTab, setActiveTab] = useState<'schedule' | 'summary' | 'options'>('summary')

  const calculatePaymentPlan = () => {
    const downPaymentAmount = (propertyPrice * downPayment) / 100
    const loanAmount = propertyPrice - downPaymentAmount
    const monthlyInterestRate = interestRate / 100 / 12
    const monthlyPayment = monthlyInterestRate > 0
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, duration)) /
        (Math.pow(1 + monthlyInterestRate, duration) - 1)
      : loanAmount / duration

    const schedule: PaymentSchedule[] = []
    let balance = loanAmount
    const start = new Date(startDate)

    for (let month = 1; month <= duration; month++) {
      const paymentDate = new Date(start)
      paymentDate.setMonth(start.getMonth() + month)

      const interestPayment = balance * monthlyInterestRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        date: paymentDate.toISOString().split('T')[0],
        amount: monthlyPayment,
        principal: principalPayment,
        balance: Math.max(0, balance),
        status: 'upcoming'
      })
    }

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalInterest: (monthlyPayment * duration) - loanAmount,
      totalPayment: downPaymentAmount + (monthlyPayment * duration),
      schedule
    }
  }

  const plan = calculatePaymentPlan()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const exportSchedule = () => {
    // Create CSV content
    let csv = 'Month,Date,Payment Amount,Principal,Balance\n'
    plan.schedule.forEach(payment => {
      csv += `${payment.month},${payment.date},${payment.amount.toFixed(2)},${payment.principal.toFixed(2)},${payment.balance.toFixed(2)}\n`
    })

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payment-plan-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const shareSchedule = async () => {
    const text = `Property Payment Plan
Property Price: ${formatCurrency(propertyPrice)}
Down Payment: ${formatCurrency(plan.downPaymentAmount)}
Monthly Payment: ${formatCurrency(plan.monthlyPayment)}
Duration: ${duration} months

Total: ${formatCurrency(plan.totalPayment)}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Plan - Afodams',
          text,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    } else {
      navigator.clipboard.writeText(text)
      alert('Payment plan copied to clipboard!')
    }
  }

  const tabs = [
    { id: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
    { id: 'schedule', label: 'Payment Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: 'options', label: 'Plan Options', icon: <TrendingUp className="w-4 h-4" /> }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-luxury-gold to-premium-orange">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-playfair font-bold text-white mb-2">
              Payment Plan Calculator
            </h2>
            <p className="text-white/90">Create flexible payment schedules for your property</p>
          </div>
          <Calculator className="w-12 h-12 text-white/80" />
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Price (₦)
            </label>
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            />
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Down Payment ({downPayment}%)
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-luxury"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span className="font-semibold text-luxury-gold">
                {formatCurrency(plan.downPaymentAmount)}
              </span>
              <span>50%</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            >
              <option value={6}>6 months</option>
              <option value={12}>12 months (1 year)</option>
              <option value={18}>18 months</option>
              <option value={24}>24 months (2 years)</option>
              <option value={36}>36 months (3 years)</option>
              <option value={48}>48 months (4 years)</option>
              <option value={60}>60 months (5 years)</option>
            </select>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interest Rate ({interestRate}% per annum)
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-luxury"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="font-semibold text-luxury-gold">{interestRate}%</span>
              <span>20%</span>
            </div>
          </div>

          {/* Start Date */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-luxury-gold text-luxury-gold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'summary' && (
          <SummaryTab plan={plan} duration={duration} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab schedule={plan.schedule} formatCurrency={formatCurrency} />
        )}

        {activeTab === 'options' && (
          <OptionsTab
            propertyPrice={propertyPrice}
            downPayment={downPayment}
            formatCurrency={formatCurrency}
          />
        )}
      </div>

      {/* Actions */}
      <div className="p-6 bg-gray-50 border-t flex gap-3">
        <button
          onClick={exportSchedule}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Schedule
        </button>
        <button
          onClick={shareSchedule}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share Plan
        </button>
      </div>
    </div>
  )
}

// Summary Tab
const SummaryTab = ({
  plan,
  duration,
  formatCurrency
}: {
  plan: any
  duration: number
  formatCurrency: (amount: number) => string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-green-700 font-semibold">Monthly Payment</span>
          </div>
          <p className="text-3xl font-bold text-green-900">
            {formatCurrency(plan.monthlyPayment)}
          </p>
          <p className="text-sm text-green-700 mt-1">for {duration} months</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-blue-700 font-semibold">Down Payment</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">
            {formatCurrency(plan.downPaymentAmount)}
          </p>
          <p className="text-sm text-blue-700 mt-1">Pay upfront</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Breakdown</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-700">Loan Amount</span>
            <span className="font-bold text-gray-900">{formatCurrency(plan.loanAmount)}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-700">Total Interest</span>
            <span className="font-bold text-orange-600">{formatCurrency(plan.totalInterest)}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="text-gray-700">Down Payment</span>
            <span className="font-bold text-gray-900">{formatCurrency(plan.downPaymentAmount)}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-lg font-semibold text-gray-900">Total Amount Payable</span>
            <span className="text-2xl font-bold text-luxury-gold">{formatCurrency(plan.totalPayment)}</span>
          </div>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Distribution</h3>
        <div className="h-12 w-full rounded-lg overflow-hidden flex">
          <div
            style={{ width: `${(plan.downPaymentAmount / plan.totalPayment) * 100}%` }}
            className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
          >
            Down
          </div>
          <div
            style={{ width: `${(plan.loanAmount / plan.totalPayment) * 100}%` }}
            className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
          >
            Principal
          </div>
          <div
            style={{ width: `${(plan.totalInterest / plan.totalPayment) * 100}%` }}
            className="bg-orange-500 flex items-center justify-center text-white text-xs font-semibold"
          >
            Interest
          </div>
        </div>
        <div className="flex justify-between mt-3 text-xs text-gray-600">
          <span>Down: {((plan.downPaymentAmount / plan.totalPayment) * 100).toFixed(1)}%</span>
          <span>Principal: {((plan.loanAmount / plan.totalPayment) * 100).toFixed(1)}%</span>
          <span>Interest: {((plan.totalInterest / plan.totalPayment) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">Important Note</h4>
            <p className="text-sm text-yellow-800">
              This is an estimate only. Actual payment terms may vary based on the developer's
              policies, your credit score, and negotiated terms. Always consult with the
              property developer or financial advisor before committing to a payment plan.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Schedule Tab
const ScheduleTab = ({
  schedule,
  formatCurrency
}: {
  schedule: PaymentSchedule[]
  formatCurrency: (amount: number) => string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left p-3 text-sm font-semibold text-gray-700">Month</th>
            <th className="text-left p-3 text-sm font-semibold text-gray-700">Date</th>
            <th className="text-right p-3 text-sm font-semibold text-gray-700">Payment</th>
            <th className="text-right p-3 text-sm font-semibold text-gray-700">Principal</th>
            <th className="text-right p-3 text-sm font-semibold text-gray-700">Balance</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((payment, index) => (
            <tr
              key={payment.month}
              className={`border-b hover:bg-gray-50 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              <td className="p-3 font-semibold text-gray-900">{payment.month}</td>
              <td className="p-3 text-gray-700">
                {new Date(payment.date).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td className="p-3 text-right font-bold text-luxury-gold">
                {formatCurrency(payment.amount)}
              </td>
              <td className="p-3 text-right text-gray-700">
                {formatCurrency(payment.principal)}
              </td>
              <td className="p-3 text-right font-semibold text-gray-900">
                {formatCurrency(payment.balance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

// Options Tab
const OptionsTab = ({
  propertyPrice,
  downPayment,
  formatCurrency
}: {
  propertyPrice: number
  downPayment: number
  formatCurrency: (amount: number) => string
}) => {
  const plans = [
    { duration: 6, interest: 0, name: 'Quick Pay (6 months)' },
    { duration: 12, interest: 3, name: 'Standard (1 year)' },
    { duration: 24, interest: 5, name: 'Flexible (2 years)' },
    { duration: 36, interest: 7, name: 'Extended (3 years)' },
  ]

  const calculatePlan = (duration: number, interest: number) => {
    const downPaymentAmount = (propertyPrice * downPayment) / 100
    const loanAmount = propertyPrice - downPaymentAmount
    const monthlyInterestRate = interest / 100 / 12
    const monthlyPayment = monthlyInterestRate > 0
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, duration)) /
        (Math.pow(1 + monthlyInterestRate, duration) - 1)
      : loanAmount / duration

    return {
      monthlyPayment,
      totalInterest: (monthlyPayment * duration) - loanAmount,
      totalPayment: downPaymentAmount + (monthlyPayment * duration)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <p className="text-gray-700 mb-6">
        Compare different payment plan options to find the best fit for your budget:
      </p>

      {plans.map(plan => {
        const calculation = calculatePlan(plan.duration, plan.interest)
        return (
          <div
            key={plan.duration}
            className="border-2 border-gray-200 rounded-xl p-6 hover:border-luxury-gold transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.interest}% interest per annum</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-luxury-gold">
                  {formatCurrency(calculation.monthlyPayment)}
                </p>
                <p className="text-xs text-gray-600">per month</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                <p className="font-bold text-gray-900">{formatCurrency(calculation.totalInterest)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Payment</p>
                <p className="font-bold text-gray-900">{formatCurrency(calculation.totalPayment)}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">
                {plan.duration} monthly installments
              </span>
            </div>
          </div>
        )
      })}

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-800">
              Shorter payment plans have lower total interest but higher monthly payments.
              Choose a plan that fits comfortably within your monthly budget while minimizing
              total interest paid.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentPlanCalculator
