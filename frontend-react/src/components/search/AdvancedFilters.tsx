import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal, X, Search, MapPin, Home, DollarSign,
  BedDouble, Bath, Maximize, Calendar, Check
} from 'lucide-react'
import Button from '../ui/Button'

interface FilterState {
  location: string
  propertyType: string[]
  priceMin: number
  priceMax: number
  bedrooms: number | null
  bathrooms: number | null
  sizeMin: number
  sizeMax: number
  listingType: string
  features: string[]
  addedWithin: string
  sortBy: string
}

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterState) => void
  initialFilters?: Partial<FilterState>
}

const AdvancedFilters = ({ onApplyFilters, initialFilters }: AdvancedFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    location: initialFilters?.location || '',
    propertyType: initialFilters?.propertyType || [],
    priceMin: initialFilters?.priceMin || 0,
    priceMax: initialFilters?.priceMax || 500000000,
    bedrooms: initialFilters?.bedrooms || null,
    bathrooms: initialFilters?.bathrooms || null,
    sizeMin: initialFilters?.sizeMin || 0,
    sizeMax: initialFilters?.sizeMax || 1000,
    listingType: initialFilters?.listingType || 'all',
    features: initialFilters?.features || [],
    addedWithin: initialFilters?.addedWithin || 'anytime',
    sortBy: initialFilters?.sortBy || 'newest',
  })

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: '🏢' },
    { value: 'house', label: 'House', icon: '🏠' },
    { value: 'villa', label: 'Villa', icon: '🏰' },
    { value: 'penthouse', label: 'Penthouse', icon: '🌆' },
    { value: 'duplex', label: 'Duplex', icon: '🏘️' },
    { value: 'office', label: 'Office', icon: '🏢' },
    { value: 'land', label: 'Land', icon: '🌳' },
    { value: 'commercial', label: 'Commercial', icon: '🏪' },
  ]

  const amenities = [
    'Swimming Pool',
    'Gym',
    'Garden',
    'Parking',
    'Security',
    'Generator',
    'Air Conditioning',
    'Elevator',
    'Balcony',
    'Fitted Kitchen',
    'WiFi',
    'CCTV',
    'Gated Estate',
    'BQ (Boys Quarters)',
    'Pop Ceiling',
    'Tiled Floor',
    'En-suite',
    'Walk-in Closet',
  ]

  const priceRanges = [
    { min: 0, max: 10000000, label: 'Under ₦10M' },
    { min: 10000000, max: 25000000, label: '₦10M - ₦25M' },
    { min: 25000000, max: 50000000, label: '₦25M - ₦50M' },
    { min: 50000000, max: 100000000, label: '₦50M - ₦100M' },
    { min: 100000000, max: 200000000, label: '₦100M - ₦200M' },
    { min: 200000000, max: 999999999, label: '₦200M+' },
  ]

  const togglePropertyType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type]
    }))
  }

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: [],
      priceMin: 0,
      priceMax: 500000000,
      bedrooms: null,
      bathrooms: null,
      sizeMin: 0,
      sizeMax: 1000,
      listingType: 'all',
      features: [],
      addedWithin: 'anytime',
      sortBy: 'newest',
    })
  }

  const handleApply = () => {
    onApplyFilters(filters)
    setShowFilters(false)
  }

  const activeFilterCount = () => {
    let count = 0
    if (filters.location) count++
    if (filters.propertyType.length > 0) count++
    if (filters.priceMin > 0 || filters.priceMax < 500000000) count++
    if (filters.bedrooms !== null) count++
    if (filters.bathrooms !== null) count++
    if (filters.features.length > 0) count++
    if (filters.addedWithin !== 'anytime') count++
    if (filters.listingType !== 'all') count++
    return count
  }

  return (
    <>
      {/* Filter Button */}
      <Button
        variant="outline"
        onClick={() => setShowFilters(true)}
        className="relative"
      >
        <SlidersHorizontal className="w-5 h-5" />
        Filters
        {activeFilterCount() > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-luxury-gold text-premium-black text-xs font-bold rounded-full flex items-center justify-center">
            {activeFilterCount()}
          </span>
        )}
      </Button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-premium-black">
                    Advanced Filters
                  </h2>
                  <p className="text-sm text-gray-600">
                    {activeFilterCount()} filter{activeFilterCount() !== 1 && 's'} applied
                  </p>
                </div>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Lekki, Ikoyi, Victoria Island"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-water focus:outline-none"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Home className="w-4 h-4 inline mr-2" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {propertyTypes.map(type => (
                      <button
                        key={type.value}
                        onClick={() => togglePropertyType(type.value)}
                        className={`p-3 rounded-xl border-2 transition-all text-left ${
                          filters.propertyType.includes(type.value)
                            ? 'border-brand-water bg-luxury-gold/10 text-premium-black'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-semibold">{type.label}</div>
                        {filters.propertyType.includes(type.value) && (
                          <Check className="w-4 h-4 text-brand-water absolute top-2 right-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Listing Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Listing Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['all', 'For Sale', 'For Rent'].map(type => (
                      <button
                        key={type}
                        onClick={() => setFilters({ ...filters, listingType: type })}
                        className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                          filters.listingType === type
                            ? 'border-brand-water bg-luxury-gold/10 text-premium-black'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type === 'all' ? 'All' : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
                      <select
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-water focus:outline-none"
                      >
                        <option value={0}>No Min</option>
                        {priceRanges.map(range => (
                          <option key={range.min} value={range.min}>
                            ₦{(range.min / 1000000).toFixed(0)}M
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
                      <select
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-water focus:outline-none"
                      >
                        <option value={999999999}>No Max</option>
                        {priceRanges.map(range => (
                          <option key={range.max} value={range.max}>
                            ₦{(range.max / 1000000).toFixed(0)}M
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <BedDouble className="w-4 h-4 inline mr-2" />
                      Bedrooms
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <button
                          key={num}
                          onClick={() => setFilters({ ...filters, bedrooms: num })}
                          className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-all ${
                            filters.bedrooms === num
                              ? 'border-brand-water bg-luxury-gold/10 text-premium-black'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {num}+
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Bath className="w-4 h-4 inline mr-2" />
                      Bathrooms
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <button
                          key={num}
                          onClick={() => setFilters({ ...filters, bathrooms: num })}
                          className={`flex-1 py-2 rounded-lg border-2 font-semibold transition-all ${
                            filters.bathrooms === num
                              ? 'border-brand-water bg-luxury-gold/10 text-premium-black'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {num}+
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Must-Have Features
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenities.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => toggleFeature(amenity)}
                        className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                          filters.features.includes(amenity)
                            ? 'border-brand-water bg-luxury-gold/10 text-premium-black'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {filters.features.includes(amenity) && (
                          <Check className="w-3 h-3 inline mr-1 text-brand-water" />
                        )}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Added Within */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Added to Site
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['anytime', '24hours', '7days', '14days', '30days'].map(period => (
                      <button
                        key={period}
                        onClick={() => setFilters({ ...filters, addedWithin: period })}
                        className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all ${
                          filters.addedWithin === period
                            ? 'border-brand-water bg-luxury-gold/10 text-premium-black'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {period === 'anytime' ? 'Anytime' :
                         period === '24hours' ? 'Last 24h' :
                         period === '7days' ? 'Last 7d' :
                         period === '14days' ? 'Last 14d' : 'Last 30d'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-water focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="bedrooms-desc">Most Bedrooms</option>
                    <option value="size-desc">Largest Size</option>
                  </select>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-4">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="flex-1"
                >
                  Reset All
                </Button>
                <Button
                  variant="gold"
                  onClick={handleApply}
                  className="flex-1"
                >
                  <Search className="w-5 h-5" />
                  Show Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdvancedFilters
