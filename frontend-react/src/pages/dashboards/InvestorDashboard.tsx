import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, DollarSign, Briefcase, Target, Copy, Check,
  ArrowUpRight, ArrowDownRight, Eye, Plus, Sparkles
} from 'lucide-react'
import Button from '../../components/ui/Button'

const InvestorDashboard = () => {
  const [copiedToken, setCopiedToken] = useState(false)

  // Mock investor token (UUID)
  const investorToken = 'INV-A3F2-B9C1-D4E5'

  // Mock data
  const portfolioStats = [
    {
      label: 'Total Investment',
      value: '₦45,000,000',
      change: '+0%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      label: 'Current Value',
      value: '₦58,500,000',
      change: '+30%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-700'
    },
    {
      label: 'Total ROI',
      value: '₦13,500,000',
      change: '+30%',
      icon: <Target className="w-6 h-6" />,
      color: 'from-luxury-gold to-premium-orange'
    },
    {
      label: 'Properties',
      value: '3',
      change: '+0%',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-700'
    },
  ]

  const myInvestments = [
    {
      id: '1',
      property: 'Lekki Phase 1 Luxury Villa',
      location: 'Lagos, Nigeria',
      invested: '₦15,000,000',
      currentValue: '₦19,500,000',
      growth: '+30%',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
      date: 'Jan 2024'
    },
    {
      id: '2',
      property: 'Ikoyi Modern Apartments',
      location: 'Lagos, Nigeria',
      invested: '₦20,000,000',
      currentValue: '₦26,000,000',
      growth: '+30%',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      date: 'Mar 2024'
    },
    {
      id: '3',
      property: 'Victoria Island Commercial',
      location: 'Lagos, Nigeria',
      invested: '₦10,000,000',
      currentValue: '₦13,000,000',
      growth: '+30%',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
      date: 'Jun 2024'
    },
  ]

  const investmentOpportunities = [
    {
      id: '1',
      title: 'Abuja Smart City Development',
      location: 'Abuja, Nigeria',
      minInvestment: '₦5,000,000',
      expectedROI: '35%',
      duration: '24 months',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600',
      category: 'Commercial'
    },
    {
      id: '2',
      title: 'Lagos Waterfront Residences',
      location: 'Lagos, Nigeria',
      minInvestment: '₦10,000,000',
      expectedROI: '40%',
      duration: '18 months',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600',
      category: 'Residential'
    },
  ]

  const handleCopyToken = () => {
    navigator.clipboard.writeText(investorToken)
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  // Mock monthly growth data for chart
  const monthlyGrowth = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 47 },
    { month: 'Mar', value: 49 },
    { month: 'Apr', value: 52 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 58.5 },
  ]

  const maxValue = Math.max(...monthlyGrowth.map(d => d.value))

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header with Token */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">
                Investment Portfolio
              </h1>
              <p className="text-gray-600 text-lg">
                Track your real estate investments and growth
              </p>
            </div>

            {/* Investor Token */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium opacity-90">Your Investor Token</span>
              </div>
              <div className="flex items-center gap-3">
                <code className="text-2xl font-bold tracking-wider">{investorToken}</code>
                <button
                  onClick={handleCopyToken}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {copiedToken ? (
                    <Check className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {portfolioStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {stat.change.startsWith('+') && <ArrowUpRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-playfair font-bold text-premium-black mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-premium-black mb-2">
                Portfolio Growth
              </h2>
              <p className="text-gray-600">Your investment value over time</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-500">+30%</div>
              <div className="text-sm text-gray-600">Last 6 months</div>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-4 h-64">
            {monthlyGrowth.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.value / maxValue) * 100}%` }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="flex-1 relative group"
              >
                <div className="h-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-xl flex items-end justify-center pb-2 hover:from-green-600 hover:to-emerald-500 transition-all cursor-pointer">
                  <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    ₦{data.value}M
                  </span>
                </div>
                <div className="text-center mt-3 text-sm font-medium text-gray-600">
                  {data.month}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">
            My Investments
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {myInvestments.map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={investment.image}
                    alt={investment.property}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                      {investment.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-premium-black mb-2">
                    {investment.property}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{investment.location}</p>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Invested:</span>
                      <span className="font-semibold text-premium-black">{investment.invested}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Value:</span>
                      <span className="font-semibold text-green-600">{investment.currentValue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Growth:</span>
                      <span className="font-bold text-green-500 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        {investment.growth}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investment Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-premium-black mb-2">
                New Opportunities
              </h2>
              <p className="text-gray-600">Curated investment opportunities for you</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={opportunity.image}
                    alt={opportunity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-full text-xs font-semibold">
                      {opportunity.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-premium-black mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{opportunity.location}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Min. Investment</div>
                      <div className="font-semibold text-premium-black text-sm">
                        {opportunity.minInvestment}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Expected ROI</div>
                      <div className="font-bold text-green-500 text-sm">{opportunity.expectedROI}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Duration</div>
                      <div className="font-semibold text-premium-black text-sm">
                        {opportunity.duration}
                      </div>
                    </div>
                  </div>

                  <Button variant="gold" size="sm" className="w-full">
                    <Plus className="w-4 h-4" />
                    Invest Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InvestorDashboard
