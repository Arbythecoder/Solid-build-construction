import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Home, TrendingUp, CheckCircle, XCircle, Clock,
  Search, Filter, Eye, MoreVertical, Building2, UserCheck
} from 'lucide-react'
import Button from '../../components/ui/Button'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'agents' | 'users'>('properties')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock stats data
  const stats = [
    {
      label: 'Total Properties',
      value: '1,247',
      change: '+12%',
      icon: <Home className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      label: 'Total Users',
      value: '3,842',
      change: '+18%',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-700'
    },
    {
      label: 'Pending Approvals',
      value: '23',
      change: '-5%',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      label: 'Revenue (₦)',
      value: '156.4M',
      change: '+24%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-luxury-gold to-premium-orange'
    },
  ]

  // Mock pending properties
  const pendingProperties = [
    {
      id: '1',
      title: 'Luxury 5-Bedroom Villa',
      landlord: 'John Adebayo',
      location: 'Lekki Phase 1, Lagos',
      price: '₦150,000,000',
      submitted: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
    },
    {
      id: '2',
      title: 'Modern 3-Bedroom Apartment',
      landlord: 'Sarah Okonkwo',
      location: 'Victoria Island, Lagos',
      price: '₦75,000,000',
      submitted: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    },
    {
      id: '3',
      title: 'Commercial Office Space',
      landlord: 'David Eze',
      location: 'Ikoyi, Lagos',
      price: '₦200,000,000',
      submitted: '1 day ago',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    },
  ]

  // Mock agent applications
  const agentApplications = [
    {
      id: '1',
      name: 'Michael Okafor',
      email: 'michael@example.com',
      experience: '5 years',
      specialization: 'Luxury Properties',
      status: 'pending',
      applied: '1 day ago',
    },
    {
      id: '2',
      name: 'Grace Nwosu',
      email: 'grace@example.com',
      experience: '3 years',
      specialization: 'Commercial Real Estate',
      status: 'pending',
      applied: '2 days ago',
    },
  ]

  const handleApproveProperty = (id: string) => {
    console.log('Approving property:', id)
    // TODO: Implement API call
  }

  const handleRejectProperty = (id: string) => {
    console.log('Rejecting property:', id)
    // TODO: Implement API call
  }

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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your platform and approve listings
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
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
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-playfair font-bold text-premium-black mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-2 mb-8 inline-flex gap-2"
        >
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'properties'
                ? 'bg-gradient-gold text-premium-black shadow-md'
                : 'text-gray-600 hover:text-premium-black'
            }`}
          >
            <Building2 className="w-5 h-5 inline mr-2" />
            Properties ({pendingProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'agents'
                ? 'bg-gradient-gold text-premium-black shadow-md'
                : 'text-gray-600 hover:text-premium-black'
            }`}
          >
            <UserCheck className="w-5 h-5 inline mr-2" />
            Agent Applications ({agentApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-gold text-premium-black shadow-md'
                : 'text-gray-600 hover:text-premium-black'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            All Users
          </button>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Pending Properties Tab */}
          {activeTab === 'properties' && (
            <div>
              {/* Search & Filter */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                  <Button variant="outline" className="md:w-auto">
                    <Filter className="w-5 h-5" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Properties List */}
              <div className="space-y-6">
                {pendingProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/3 aspect-video md:aspect-auto">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-playfair font-bold text-premium-black mb-2">
                              {property.title}
                            </h3>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Landlord:</span> {property.landlord}
                            </p>
                            <p className="text-gray-600 mb-1">
                              <span className="font-semibold">Location:</span> {property.location}
                            </p>
                            <p className="text-luxury-gold font-bold text-xl">
                              {property.price}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                              Pending
                            </span>
                            <span className="text-sm text-gray-500">
                              {property.submitted}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 md:flex-initial"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </Button>
                          <Button
                            variant="gold"
                            size="sm"
                            onClick={() => handleApproveProperty(property.id)}
                            className="flex-1 md:flex-initial bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectProperty(property.id)}
                            className="flex-1 md:flex-initial border-red-500 text-red-500 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Agent Applications Tab */}
          {activeTab === 'agents' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Experience</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Specialization</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Applied</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {agentApplications.map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-premium-black">{agent.name}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{agent.email}</td>
                        <td className="px-6 py-4 text-gray-600">{agent.experience}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                            {agent.specialization}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{agent.applied}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                              <XCircle className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* All Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">User Management</h3>
              <p className="text-gray-600">User management interface coming soon...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
