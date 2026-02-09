import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Home, DollarSign, Wrench, FileText, Calendar, CreditCard,
  AlertCircle, CheckCircle, Clock, Send
} from 'lucide-react'
import Button from '../../components/ui/Button'

const TenantDashboard = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)

  // Mock data
  const stats = [
    {
      label: 'Monthly Rent',
      value: '₦2,500,000',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-luxury-gold to-premium-orange'
    },
    {
      label: 'Lease Expires',
      value: '6 Months',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      label: 'Maintenance Requests',
      value: '2 Pending',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      label: 'Documents',
      value: '5 Files',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-700'
    },
  ]

  const currentProperty = {
    name: 'Luxury 3-Bedroom Apartment',
    address: 'Plot 45, Lekki Phase 1, Lagos',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    landlord: 'John Adebayo',
    leaseStart: 'Jan 1, 2024',
    leaseEnd: 'Dec 31, 2024',
    monthlyRent: '₦2,500,000',
  }

  const paymentHistory = [
    { month: 'October 2024', amount: '₦2,500,000', status: 'paid', date: 'Oct 1, 2024' },
    { month: 'September 2024', amount: '₦2,500,000', status: 'paid', date: 'Sep 1, 2024' },
    { month: 'August 2024', amount: '₦2,500,000', status: 'paid', date: 'Aug 1, 2024' },
  ]

  const maintenanceRequests = [
    {
      id: '1',
      issue: 'Kitchen sink leaking',
      status: 'In Progress',
      submitted: '2 days ago',
      priority: 'Medium'
    },
    {
      id: '2',
      issue: 'Air conditioning not cooling',
      status: 'Pending',
      submitted: '5 days ago',
      priority: 'High'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">
            Tenant Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your rental and payments
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-playfair font-bold text-premium-black mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={currentProperty.image}
              alt={currentProperty.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h2 className="text-2xl font-playfair font-bold text-premium-black mb-4">
                Current Property
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-premium-black">{currentProperty.name}</h3>
                  <p className="text-gray-600">{currentProperty.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Monthly Rent</div>
                    <div className="text-lg font-bold text-brand-water">{currentProperty.monthlyRent}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Landlord</div>
                    <div className="font-semibold text-premium-black">{currentProperty.landlord}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Lease Start</div>
                    <div className="font-medium text-premium-black">{currentProperty.leaseStart}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Lease End</div>
                    <div className="font-medium text-premium-black">{currentProperty.leaseEnd}</div>
                  </div>
                </div>
                <Button
                  variant="gold"
                  className="w-full mt-6"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Rent
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-lg text-premium-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowMaintenanceModal(true)}
                >
                  <Wrench className="w-5 h-5" />
                  Request Maintenance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-5 h-5" />
                  View Lease Agreement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Home className="w-5 h-5" />
                  Contact Landlord
                </Button>
              </div>
            </div>

            {/* Next Payment */}
            <div className="bg-gradient-to-br from-luxury-gold to-premium-orange rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="font-semibold">Next Payment Due</h3>
              </div>
              <div className="text-3xl font-bold mb-2">Nov 1, 2024</div>
              <div className="text-sm opacity-90">₦2,500,000 monthly rent</div>
            </div>
          </motion.div>
        </div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 text-sm font-semibold text-gray-700">Month</th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-700">Date Paid</th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentHistory.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 text-premium-black font-medium">{payment.month}</td>
                    <td className="py-4 text-premium-black">{payment.amount}</td>
                    <td className="py-4 text-gray-600">{payment.date}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Maintenance Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">
            Maintenance Requests
          </h2>
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-xl p-6 hover:border-brand-water transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-premium-black mb-2">{request.issue}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Submitted {request.submitted}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        request.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {request.priority} Priority
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TenantDashboard
