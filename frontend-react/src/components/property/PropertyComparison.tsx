import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Plus, Check, Minus, MapPin, Home, Bed, Bath,
  Ruler, ParkingCircle, Wifi, ShieldCheck, Download,
  Share2, TrendingUp, Calendar, Eye, Heart
} from 'lucide-react'

interface Property {
  _id: string
  title: string
  type: string
  listingType: string
  price: number
  location: {
    address: string
    city: string
    state: string
  }
  features: {
    bedrooms: number
    bathrooms: number
    size: number
    furnished?: boolean
    parking?: number
  }
  amenities: string[]
  images: { url: string; alt?: string }[]
  createdAt?: string
  views?: number
  isPremium?: boolean
}

interface PropertyComparisonProps {
  availableProperties: Property[]
  initialSelectedProperties?: Property[]
}

const PropertyComparison = ({
  availableProperties,
  initialSelectedProperties = []
}: PropertyComparisonProps) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(
    initialSelectedProperties.slice(0, 3)
  )
  const [showSelector, setShowSelector] = useState(false)
  const [selectorSlot, setSelectorSlot] = useState<number | null>(null)

  const maxProperties = 3

  const addProperty = (slotIndex: number) => {
    setSelectorSlot(slotIndex)
    setShowSelector(true)
  }

  const selectProperty = (property: Property) => {
    const newSelected = [...selectedProperties]

    if (selectorSlot !== null) {
      newSelected[selectorSlot] = property
    } else {
      if (newSelected.length < maxProperties) {
        newSelected.push(property)
      }
    }

    setSelectedProperties(newSelected)
    setShowSelector(false)
    setSelectorSlot(null)
  }

  const removeProperty = (index: number) => {
    const newSelected = selectedProperties.filter((_, i) => i !== index)
    setSelectedProperties(newSelected)
  }

  const exportToPDF = () => {
    // Create print-friendly version
    window.print()
  }

  const shareComparison = async () => {
    const propertyTitles = selectedProperties.map(p => p.title).join(', ')

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Property Comparison - Solid Build',
          text: `Compare: ${propertyTitles}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    } else {
      // Fallback: Copy to clipboard
      const text = `Property Comparison:\n${propertyTitles}\n\n${window.location.href}`
      navigator.clipboard.writeText(text)
      alert('Comparison link copied to clipboard!')
    }
  }

  // Comparison metrics
  const getComparisonData = () => {
    if (selectedProperties.length < 2) return null

    const prices = selectedProperties.map(p => p.price)
    const sizes = selectedProperties.map(p => p.features.size)
    const pricePerSqm = selectedProperties.map(p => p.price / p.features.size)

    return {
      lowestPrice: Math.min(...prices),
      highestPrice: Math.max(...prices),
      averagePrice: prices.reduce((a, b) => a + b, 0) / prices.length,
      largestSize: Math.max(...sizes),
      smallestSize: Math.min(...sizes),
      bestValue: Math.min(...pricePerSqm),
    }
  }

  const comparisonData = getComparisonData()

  // Common amenities
  const getAllAmenities = () => {
    const allAmenities = new Set<string>()
    selectedProperties.forEach(property => {
      property.amenities.forEach(amenity => allAmenities.add(amenity))
    })
    return Array.from(allAmenities)
  }

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

  if (selectedProperties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-luxury-gold/10 rounded-full mb-6">
            <Home className="w-10 h-10 text-luxury-gold" />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-premium-black mb-4">
            Compare Properties
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Select up to {maxProperties} properties to compare features, prices, and amenities side-by-side
          </p>
          <button
            onClick={() => addProperty(0)}
            className="inline-flex items-center gap-2 bg-luxury-gold hover:bg-luxury-gold/90 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Select Properties to Compare
          </button>
        </div>

        {/* Property Selector Modal */}
        <PropertySelector
          isOpen={showSelector}
          onClose={() => setShowSelector(false)}
          properties={availableProperties.filter(
            p => !selectedProperties.find(sp => sp._id === p._id)
          )}
          onSelect={selectProperty}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-premium-black mb-2">
            Property Comparison
          </h1>
          <p className="text-gray-600">
            Comparing {selectedProperties.length} of {maxProperties} properties
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={shareComparison}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-luxury-gold text-white rounded-lg hover:bg-luxury-gold/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {selectedProperties.map((property, index) => (
          <PropertyCard
            key={property._id}
            property={property}
            onRemove={() => removeProperty(index)}
            onReplace={() => addProperty(index)}
            isLowestPrice={comparisonData?.lowestPrice === property.price}
            isLargestSize={comparisonData?.largestSize === property.features.size}
            isBestValue={comparisonData ?
              (property.price / property.features.size) === comparisonData.bestValue : false
            }
          />
        ))}

        {/* Add More Slot */}
        {selectedProperties.length < maxProperties && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] hover:border-luxury-gold transition-colors cursor-pointer group"
            onClick={() => addProperty(selectedProperties.length)}
          >
            <div className="w-16 h-16 bg-gray-100 group-hover:bg-luxury-gold/10 rounded-full flex items-center justify-center mb-4 transition-colors">
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-luxury-gold transition-colors" />
            </div>
            <p className="text-gray-600 font-semibold group-hover:text-luxury-gold transition-colors">
              Add Property
            </p>
          </motion.div>
        )}
      </div>

      {/* Detailed Comparison Table */}
      {selectedProperties.length >= 2 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-luxury-gold to-premium-orange">
            <h2 className="text-2xl font-playfair font-bold text-white">
              Detailed Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-gray-700">Feature</th>
                  {selectedProperties.map(property => (
                    <th key={property._id} className="p-4 text-center font-semibold text-gray-700">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <ComparisonRow
                  label="Price"
                  icon={<TrendingUp className="w-5 h-5" />}
                  values={selectedProperties.map(p => formatCurrency(p.price))}
                  highlights={selectedProperties.map(p =>
                    p.price === comparisonData?.lowestPrice
                  )}
                />

                {/* Price per sqm */}
                <ComparisonRow
                  label="Price per m²"
                  icon={<Ruler className="w-5 h-5" />}
                  values={selectedProperties.map(p =>
                    formatCurrency(p.price / p.features.size)
                  )}
                  highlights={selectedProperties.map(p =>
                    (p.price / p.features.size) === comparisonData?.bestValue
                  )}
                />

                {/* Bedrooms */}
                <ComparisonRow
                  label="Bedrooms"
                  icon={<Bed className="w-5 h-5" />}
                  values={selectedProperties.map(p => p.features.bedrooms.toString())}
                />

                {/* Bathrooms */}
                <ComparisonRow
                  label="Bathrooms"
                  icon={<Bath className="w-5 h-5" />}
                  values={selectedProperties.map(p => p.features.bathrooms.toString())}
                />

                {/* Size */}
                <ComparisonRow
                  label="Size"
                  icon={<Home className="w-5 h-5" />}
                  values={selectedProperties.map(p => `${formatNumber(p.features.size)} m²`)}
                  highlights={selectedProperties.map(p =>
                    p.features.size === comparisonData?.largestSize
                  )}
                />

                {/* Parking */}
                <ComparisonRow
                  label="Parking"
                  icon={<ParkingCircle className="w-5 h-5" />}
                  values={selectedProperties.map(p =>
                    p.features.parking ? `${p.features.parking} spaces` : 'N/A'
                  )}
                />

                {/* Furnished */}
                <ComparisonRow
                  label="Furnished"
                  icon={<Home className="w-5 h-5" />}
                  values={selectedProperties.map(p =>
                    p.features.furnished ? 'Yes' : 'No'
                  )}
                />

                {/* Location */}
                <ComparisonRow
                  label="Location"
                  icon={<MapPin className="w-5 h-5" />}
                  values={selectedProperties.map(p =>
                    `${p.location.city}, ${p.location.state}`
                  )}
                />

                {/* Listing Type */}
                <ComparisonRow
                  label="Listing Type"
                  icon={<Calendar className="w-5 h-5" />}
                  values={selectedProperties.map(p => p.listingType)}
                />

                {/* Views */}
                <ComparisonRow
                  label="Views"
                  icon={<Eye className="w-5 h-5" />}
                  values={selectedProperties.map(p =>
                    formatNumber(p.views || 0)
                  )}
                />

                {/* Amenities Section */}
                <tr className="border-b bg-gray-50">
                  <td colSpan={selectedProperties.length + 1} className="p-4 font-semibold text-gray-700">
                    Amenities
                  </td>
                </tr>

                {getAllAmenities().map(amenity => (
                  <ComparisonRow
                    key={amenity}
                    label={amenity}
                    values={selectedProperties.map(p =>
                      p.amenities.includes(amenity) ? '✓' : '✗'
                    )}
                    highlights={selectedProperties.map(p =>
                      p.amenities.includes(amenity)
                    )}
                    isAmenity
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Property Selector Modal */}
      <PropertySelector
        isOpen={showSelector}
        onClose={() => {
          setShowSelector(false)
          setSelectorSlot(null)
        }}
        properties={availableProperties.filter(
          p => !selectedProperties.find(sp => sp._id === p._id)
        )}
        onSelect={selectProperty}
      />
    </div>
  )
}

// Property Card Component
const PropertyCard = ({
  property,
  onRemove,
  onReplace,
  isLowestPrice,
  isLargestSize,
  isBestValue
}: {
  property: Property
  onRemove: () => void
  onReplace: () => void
  isLowestPrice: boolean
  isLargestSize: boolean
  isBestValue: boolean
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
    >
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isLowestPrice && (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Lowest Price
          </span>
        )}
        {isLargestSize && (
          <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Largest Size
          </span>
        )}
        {isBestValue && (
          <span className="bg-luxury-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            Best Value
          </span>
        )}
        {property.isPremium && (
          <span className="bg-premium-orange text-white text-xs font-bold px-3 py-1 rounded-full">
            Premium
          </span>
        )}
      </div>

      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={property.images[0]?.url || '/placeholder-property.jpg'}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-playfair font-bold text-xl text-premium-black mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {property.location.city}, {property.location.state}
          </span>
        </div>

        <div className="text-3xl font-bold text-luxury-gold mb-4">
          {formatCurrency(property.price)}
        </div>

        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span className="text-sm">{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span className="text-sm">{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            <span className="text-sm">{property.features.size}m²</span>
          </div>
        </div>

        <button
          onClick={onReplace}
          className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
        >
          Replace Property
        </button>
      </div>
    </motion.div>
  )
}

// Comparison Row Component
const ComparisonRow = ({
  label,
  icon,
  values,
  highlights = [],
  isAmenity = false
}: {
  label: string
  icon?: React.ReactNode
  values: string[]
  highlights?: boolean[]
  isAmenity?: boolean
}) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="flex items-center gap-2 text-gray-700">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
      </td>
      {values.map((value, index) => (
        <td
          key={index}
          className={`p-4 text-center ${
            highlights[index]
              ? isAmenity
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'bg-luxury-gold/10 text-luxury-gold font-bold'
              : isAmenity && value === '✗'
                ? 'text-gray-300'
                : ''
          }`}
        >
          {value}
        </td>
      ))}
    </tr>
  )
}

// Property Selector Modal
const PropertySelector = ({
  isOpen,
  onClose,
  properties,
  onSelect
}: {
  isOpen: boolean
  onClose: () => void
  properties: Property[]
  onSelect: (property: Property) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-playfair font-bold text-premium-black">
                Select a Property
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search */}
            <div className="p-6 border-b">
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              />
            </div>

            {/* Property List */}
            <div className="p-6 overflow-y-auto max-h-[500px]">
              {filteredProperties.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No properties found
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProperties.map(property => (
                    <div
                      key={property._id}
                      onClick={() => onSelect(property)}
                      className="border rounded-xl p-4 hover:border-luxury-gold hover:bg-luxury-gold/5 cursor-pointer transition-all group"
                    >
                      <div className="flex gap-4">
                        <img
                          src={property.images[0]?.url || '/placeholder-property.jpg'}
                          alt={property.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-premium-black mb-1 line-clamp-1 group-hover:text-luxury-gold transition-colors">
                            {property.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {property.location.city}, {property.location.state}
                          </p>
                          <p className="font-bold text-luxury-gold">
                            {formatCurrency(property.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PropertyComparison
