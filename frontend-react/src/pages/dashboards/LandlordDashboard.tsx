import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Home, DollarSign, Users, TrendingUp, Eye, Edit, Trash2,
  X, Upload, MapPin, BedDouble, Bath, Maximize, Image as ImageIcon
} from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../../components/ui/Button'
import { landlordAPI, propertyAPI } from '../../services/api'

const LandlordDashboard = () => {
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [loading, setLoading] = useState(true)
  const [myProperties, setMyProperties] = useState<any[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    views: 0,
    revenue: '0'
  })
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    listingType: 'For Sale',
    price: '',
    location: '',
    address: '',
    city: '',
    state: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    features: [] as string[],
  })

  // Fetch landlord data on mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [propertiesRes, statsRes] = await Promise.all([
        landlordAPI.getMyProperties(),
        landlordAPI.getStats()
      ])

      setMyProperties(propertiesRes.data || [])
      if (statsRes.data) {
        setStats(statsRes.data)
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error)
      // Show error but don't block UI
      if (error.response?.status !== 404) {
        toast.error('Failed to load dashboard data')
      }
    } finally {
      setLoading(false)
    }
  }

  const statsDisplay = [
    { label: 'Total Properties', value: stats.total.toString(), icon: <Home className="w-6 h-6" />, color: 'from-blue-500 to-blue-700' },
    { label: 'Active Listings', value: stats.active.toString(), icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-700' },
    { label: 'Total Views', value: stats.views.toLocaleString(), icon: <Eye className="w-6 h-6" />, color: 'from-purple-500 to-indigo-700' },
    { label: 'Revenue (₦)', value: stats.revenue, icon: <DollarSign className="w-6 h-6" />, color: 'from-luxury-gold to-premium-orange' },
  ]

  const featureOptions = [
    'Swimming Pool', 'Gym', 'Garden', 'Parking', 'Security', 'Generator',
    'Air Conditioning', 'Fitted Kitchen', 'Balcony', 'Elevator'
  ]

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const propertyData = new FormData()

      // Append all form fields
      propertyData.append('title', formData.title)
      propertyData.append('description', formData.description)
      propertyData.append('type', formData.type)
      propertyData.append('listingType', formData.listingType)
      propertyData.append('price', formData.price)
      propertyData.append('location[address]', formData.address)
      propertyData.append('location[city]', formData.city)
      propertyData.append('location[state]', formData.state)
      propertyData.append('features[bedrooms]', formData.bedrooms)
      propertyData.append('features[bathrooms]', formData.bathrooms)
      propertyData.append('features[size]', formData.size)

      // Append features array
      formData.features.forEach((feature, index) => {
        propertyData.append(`amenities[${index}]`, feature)
      })

      await propertyAPI.create(propertyData)
      toast.success('Property submitted for approval!')

      // Reset form and close modal
      setShowAddProperty(false)
      setFormData({
        title: '',
        description: '',
        type: 'apartment',
        listingType: 'For Sale',
        price: '',
        location: '',
        address: '',
        city: '',
        state: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        features: [],
      })

      // Refresh properties list
      fetchDashboardData()
    } catch (error: any) {
      console.error('Error creating property:', error)
      toast.error(error.response?.data?.message || 'Failed to create property')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return
    }

    try {
      await propertyAPI.delete(id)
      toast.success('Property deleted successfully')
      fetchDashboardData()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete property')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-2">
              My Properties
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and track your property listings
            </p>
          </div>
          <Button
            variant="gold"
            size="lg"
            onClick={() => setShowAddProperty(true)}
            className="mt-6 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            Add New Property
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsDisplay.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-playfair font-bold text-premium-black mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Properties Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">
            Your Listings
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-water mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading properties...</p>
            </div>
          ) : myProperties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first property listing</p>
              <Button variant="gold" onClick={() => setShowAddProperty(true)}>
                <Plus className="w-5 h-5" />
                Add Property
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={property.images?.[0]?.url || property.image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      property.status === 'approved'
                        ? 'bg-green-500 text-white'
                        : property.status === 'pending'
                        ? 'bg-orange-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {property.status?.charAt(0).toUpperCase() + property.status?.slice(1) || 'Pending'}
                    </span>
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white rounded-full text-xs font-semibold">
                      {property.views || 0} views
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-premium-black mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {property.location?.city}, {property.location?.state}
                  </p>
                  <div className="text-2xl font-bold text-brand-water mb-4">
                    ₦{Number(property.price).toLocaleString()}
                  </div>

                  {/* Property Details */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      {property.features?.bedrooms || property.bedrooms || 0} beds
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      {property.features?.bathrooms || property.bathrooms || 0} baths
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      {property.features?.size || property.size || 0}m²
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleDeleteProperty(property._id || property.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Property Modal */}
      <AnimatePresence>
        {showAddProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowAddProperty(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h2 className="text-3xl font-playfair font-bold text-premium-black">
                    Add New Property
                  </h2>
                  <p className="text-gray-600 mt-1">Fill in the details below</p>
                </div>
                <button
                  onClick={() => setShowAddProperty(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Basic Info */}
                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                        placeholder="e.g., Luxury 5-Bedroom Villa with Pool"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors resize-none"
                        placeholder="Describe your property..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property Type *
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                        >
                          <option value="apartment">Apartment</option>
                          <option value="house">House</option>
                          <option value="villa">Villa</option>
                          <option value="office">Office</option>
                          <option value="land">Land</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Listing Type *
                        </label>
                        <select
                          value={formData.listingType}
                          onChange={(e) => setFormData({...formData, listingType: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                        >
                          <option value="For Sale">For Sale</option>
                          <option value="For Rent">For Rent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (₦) *
                        </label>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                          placeholder="150000000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-4">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                      >
                        <option value="">Select State</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Rivers">Rivers</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms *
                      </label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms *
                      </label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size (m²) *
                      </label>
                      <input
                        type="number"
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-water transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-4">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {featureOptions.map(feature => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => handleFeatureToggle(feature)}
                        className={`py-3 px-4 rounded-xl font-medium transition-all text-sm ${
                          formData.features.includes(feature)
                            ? 'bg-gradient-beach text-premium-black'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div>
                  <h3 className="text-xl font-semibold text-premium-black mb-4">Images</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-brand-water transition-colors cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddProperty(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="gold"
                    className="flex-1"
                  >
                    Submit for Approval
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LandlordDashboard
