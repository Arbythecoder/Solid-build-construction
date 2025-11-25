import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { propertyAPI } from '../services/api'
import PropertyCard from '../components/ui/PropertyCard'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

// Sample properties data for display
const sampleProperties = [
  {
    id: '1',
    title: 'Exquisite 5-Bedroom Duplex in Lekki Phase 1',
    price: 185000000,
    location: 'Lekki Phase 1, Lagos',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    bedrooms: 5,
    bathrooms: 6,
    size: 450,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '2',
    title: 'Luxury 4-Bedroom Terrace in Banana Island',
    price: 250000000,
    location: 'Banana Island, Lagos',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    bedrooms: 4,
    bathrooms: 5,
    size: 380,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '3',
    title: 'Modern 3-Bedroom Apartment in Victoria Island',
    price: 4500000,
    location: 'Victoria Island, Lagos',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    bedrooms: 3,
    bathrooms: 4,
    size: 200,
    status: 'For Rent' as const,
    featured: true,
  },
  {
    id: '4',
    title: 'Stunning 6-Bedroom Mansion in Maitama',
    price: 450000000,
    location: 'Maitama, Abuja',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    bedrooms: 6,
    bathrooms: 7,
    size: 650,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '5',
    title: 'Executive 4-Bedroom Semi-Detached in Ikeja GRA',
    price: 120000000,
    location: 'Ikeja GRA, Lagos',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    bedrooms: 4,
    bathrooms: 4,
    size: 320,
    status: 'For Sale' as const,
    featured: false,
  },
  {
    id: '6',
    title: 'Waterfront 3-Bedroom Apartment in Ikoyi',
    price: 8500000,
    location: 'Ikoyi, Lagos',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    bedrooms: 3,
    bathrooms: 4,
    size: 220,
    status: 'For Rent' as const,
    featured: false,
  },
  {
    id: '7',
    title: 'Contemporary 5-Bedroom Villa in Asokoro',
    price: 380000000,
    location: 'Asokoro, Abuja',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    bedrooms: 5,
    bathrooms: 6,
    size: 500,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '8',
    title: 'Elegant 4-Bedroom Penthouse in Eko Atlantic',
    price: 320000000,
    location: 'Eko Atlantic, Lagos',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    bedrooms: 4,
    bathrooms: 5,
    size: 350,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '9',
    title: 'Spacious 3-Bedroom Flat in Ajah',
    price: 2500000,
    location: 'Ajah, Lagos',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    status: 'For Rent' as const,
    featured: false,
  },
  {
    id: '10',
    title: 'Premium 5-Bedroom Detached House in Magodo',
    price: 95000000,
    location: 'Magodo Phase 2, Lagos',
    image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
    bedrooms: 5,
    bathrooms: 5,
    size: 400,
    status: 'For Sale' as const,
    featured: false,
  },
  {
    id: '11',
    title: 'Luxury 2-Bedroom Service Apartment in VI',
    price: 3500000,
    location: 'Victoria Island, Lagos',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
    bedrooms: 2,
    bathrooms: 2,
    size: 120,
    status: 'For Rent' as const,
    featured: false,
  },
  {
    id: '12',
    title: 'Grand 7-Bedroom Mansion in Wuse 2',
    price: 550000000,
    location: 'Wuse 2, Abuja',
    image: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
    bedrooms: 7,
    bathrooms: 8,
    size: 800,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '13',
    title: 'Cozy 2-Bedroom Apartment in Surulere',
    price: 1800000,
    location: 'Surulere, Lagos',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
    bedrooms: 2,
    bathrooms: 2,
    size: 100,
    status: 'For Rent' as const,
    featured: false,
  },
  {
    id: '14',
    title: 'Modern 4-Bedroom Townhouse in Oniru',
    price: 180000000,
    location: 'Oniru, Lagos',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
    bedrooms: 4,
    bathrooms: 4,
    size: 300,
    status: 'For Sale' as const,
    featured: false,
  },
  {
    id: '15',
    title: 'Exclusive 6-Bedroom Estate Home in Gwarinpa',
    price: 280000000,
    location: 'Gwarinpa, Abuja',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    bedrooms: 6,
    bathrooms: 6,
    size: 550,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '16',
    title: 'Stylish 3-Bedroom Maisonette in Lekki Phase 2',
    price: 5500000,
    location: 'Lekki Phase 2, Lagos',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    bedrooms: 3,
    bathrooms: 3,
    size: 200,
    status: 'For Rent' as const,
    featured: false,
  },
  {
    id: '17',
    title: 'Beachfront 5-Bedroom Villa in Ilashe',
    price: 420000000,
    location: 'Ilashe, Lagos',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    bedrooms: 5,
    bathrooms: 6,
    size: 600,
    status: 'For Sale' as const,
    featured: true,
  },
  {
    id: '18',
    title: 'Commercial Office Space in Marina',
    price: 15000000,
    location: 'Marina, Lagos',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    bedrooms: 0,
    bathrooms: 2,
    size: 500,
    status: 'For Rent' as const,
    featured: false,
  },
]

const PropertyListPage = () => {
  const [searchParams] = useSearchParams()
  const [properties, setProperties] = useState<any[]>(sampleProperties)
  const [filteredProperties, setFilteredProperties] = useState<any[]>(sampleProperties)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    priceMin: '',
    priceMax: '',
    location: searchParams.get('location') || '',
    bedrooms: '',
    status: '',
  })
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    // Try to fetch from API, fallback to sample data
    fetchProperties()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchQuery, filters, sortBy, properties])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await propertyAPI.getAll()
      if (response.data && response.data.length > 0) {
        // Map API response to our format
        const apiProperties = response.data.map((p: any) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          location: p.location?.area
            ? `${p.location.area}, ${p.location.city}, ${p.location.state}`
            : `${p.location?.city || ''}, ${p.location?.state || ''}`,
          area: p.location?.area || '',
          image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          bedrooms: p.features?.bedrooms || 0,
          bathrooms: p.features?.bathrooms || 0,
          size: p.features?.size || 0,
          status: p.status === 'available' ? 'For Sale' : p.status === 'rented' ? 'For Rent' : 'For Sale',
          featured: p.isPremium || p.status === 'featured',
          description: p.description,
          type: p.type,
        }))
        // Prioritize API properties, then add sample properties
        setProperties([...apiProperties, ...sampleProperties])
        toast.success(`Found ${apiProperties.length} properties from database`)
      } else {
        // Use sample properties if no API data
        setProperties(sampleProperties)
      }
    } catch (error: any) {
      console.log('Using sample properties:', error.message)
      // Keep sample properties if API fails
      setProperties(sampleProperties)
      if (error.code === 'ERR_NETWORK') {
        toast.error('Backend not running. Showing sample properties.')
      }
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...properties]

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      )
    }

    // Location filter - search in both location and area
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase()
      result = result.filter((p) =>
        p.location.toLowerCase().includes(locationQuery) ||
        (p.area && p.area.toLowerCase().includes(locationQuery))
      )
    }

    // Status filter (For Sale / For Rent)
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status)
    }

    // Price filters
    if (filters.priceMin) {
      result = result.filter((p) => p.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= parseInt(filters.priceMax))
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      result = result.filter((p) => p.bedrooms >= parseInt(filters.bedrooms))
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
      default:
        // Keep original order (assumed newest first)
        break
    }

    setFilteredProperties(result)
  }

  const handleSearch = () => {
    applyFilters()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setFilters({
      type: '',
      priceMin: '',
      priceMax: '',
      location: '',
      bedrooms: '',
      status: '',
    })
    setSortBy('newest')
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`
    }
    return `₦${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-4">
            Browse Properties
          </h1>
          <p className="text-xl text-gray-600">
            Discover your perfect property from our exclusive listings across Nigeria
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              <Button variant="gold" onClick={handleSearch}>
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-4 mt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    <option value="Gbagada">Gbagada</option>
                    <option value="Ikeja">Ikeja / Allen</option>
                    <option value="Ogba">Ogba</option>
                    <option value="Lekki">Lekki</option>
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Banana Island">Banana Island</option>
                    <option value="Lagos">All Lagos</option>
                    <option value="Abuja">Abuja</option>
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <select
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  >
                    <option value="">No Min</option>
                    <option value="1000000">₦1M</option>
                    <option value="5000000">₦5M</option>
                    <option value="10000000">₦10M</option>
                    <option value="50000000">₦50M</option>
                    <option value="100000000">₦100M</option>
                  </select>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <select
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  >
                    <option value="">No Max</option>
                    <option value="10000000">₦10M</option>
                    <option value="50000000">₦50M</option>
                    <option value="100000000">₦100M</option>
                    <option value="200000000">₦200M</option>
                    <option value="500000000">₦500M</option>
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <p className="text-gray-600">
              Showing <span className="font-semibold text-luxury-gold">{filteredProperties.length}</span> of{' '}
              <span className="font-semibold">{properties.length}</span> properties
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-luxury-gold' : 'text-gray-500'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow text-luxury-gold' : 'text-gray-500'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-luxury-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
            <Button variant="gold" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProperties.length > 0 && filteredProperties.length < properties.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button variant="luxury" size="lg">
              Load More Properties
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PropertyListPage
