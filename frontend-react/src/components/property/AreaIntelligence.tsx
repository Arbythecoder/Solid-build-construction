import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, School, Cross, ShoppingBag, Bus, Shield,
  Coffee, Home, TrendingUp, Users, Star,
  Navigation, Clock, DollarSign, AlertCircle, CheckCircle,
  X, Maximize2
} from 'lucide-react'

interface Property {
  location: {
    address: string
    city: string
    state: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  price: number
}

interface NearbyPlace {
  id: string
  name: string
  type: string
  distance: number // in km
  rating?: number
  reviews?: number
  address: string
}

interface AreaIntelligenceProps {
  property: Property
}

const AreaIntelligence = ({ property }: AreaIntelligenceProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'amenities' | 'transport' | 'safety'>('overview')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [commuteFrom, setCommuteFrom] = useState('')
  const [commuteTime, setCommuteTime] = useState<number | null>(null)
  const [mapFullscreen, setMapFullscreen] = useState(false)

  // Mock data - In production, this would come from Google Maps API
  const areaData = {
    overview: {
      areaScore: 8.5,
      population: '~250,000',
      medianIncome: '₦8,500,000/year',
      priceGrowth: '+12% YoY',
      livabilityScore: 85,
      walkScore: 72,
      transitScore: 68
    },
    schools: [
      {
        id: '1',
        name: 'Corona Secondary School',
        type: 'Secondary School',
        distance: 1.2,
        rating: 4.8,
        reviews: 245,
        address: 'Gbagada, Lagos'
      },
      {
        id: '2',
        name: 'Greensprings School',
        type: 'Primary & Secondary',
        distance: 2.1,
        rating: 4.9,
        reviews: 389,
        address: 'Anthony, Lagos'
      },
      {
        id: '3',
        name: 'Chrisland College',
        type: 'Secondary School',
        distance: 3.5,
        rating: 4.7,
        reviews: 512,
        address: 'Maryland, Lagos'
      },
      {
        id: '4',
        name: 'Greenwood House School',
        type: 'Nursery & Primary',
        distance: 0.8,
        rating: 4.6,
        reviews: 198,
        address: 'Ilupeju, Lagos'
      }
    ],
    hospitals: [
      {
        id: '1',
        name: 'Reddington Hospital',
        type: 'General Hospital',
        distance: 1.5,
        rating: 4.5,
        reviews: 432,
        address: 'Victoria Island, Lagos'
      },
      {
        id: '2',
        name: 'St. Nicholas Hospital',
        type: 'Multi-specialty',
        distance: 2.8,
        rating: 4.7,
        reviews: 578,
        address: 'Lagos Island, Lagos'
      },
      {
        id: '3',
        name: 'Lagoon Hospital',
        type: 'Private Hospital',
        distance: 3.2,
        rating: 4.6,
        reviews: 389,
        address: 'Ikeja, Lagos'
      }
    ],
    shopping: [
      {
        id: '1',
        name: 'The Palms Shopping Mall',
        type: 'Shopping Mall',
        distance: 2.0,
        rating: 4.4,
        reviews: 1250,
        address: 'Lekki, Lagos'
      },
      {
        id: '2',
        name: 'Shoprite',
        type: 'Supermarket',
        distance: 1.2,
        rating: 4.2,
        reviews: 890,
        address: 'Ikeja, Lagos'
      },
      {
        id: '3',
        name: 'Spar',
        type: 'Supermarket',
        distance: 0.9,
        rating: 4.3,
        reviews: 456,
        address: 'Lekki Phase 1, Lagos'
      }
    ],
    restaurants: [
      {
        id: '1',
        name: 'Yellow Chilli',
        type: 'Restaurant',
        distance: 1.1,
        rating: 4.6,
        reviews: 678,
        address: 'Lekki, Lagos'
      },
      {
        id: '2',
        name: 'Ofada Boy',
        type: 'Local Cuisine',
        distance: 0.7,
        rating: 4.5,
        reviews: 423,
        address: 'Victoria Island, Lagos'
      }
    ],
    transport: [
      {
        id: '1',
        name: 'Lekki Phase 1 Bus Stop',
        type: 'Bus Stop',
        distance: 0.5,
        rating: 3.8,
        reviews: 89,
        address: 'Lekki Phase 1'
      },
      {
        id: '2',
        name: 'Admiralty Way Station',
        type: 'Water Ferry',
        distance: 2.3,
        rating: 4.1,
        reviews: 156,
        address: 'Lekki Phase 1'
      }
    ],
    safety: {
      crimeRate: 'Low',
      policeStations: 2,
      emergencyResponse: '12 min average',
      streetLighting: 'Good',
      gatingSecurity: 'Estate gated 24/7',
      safetyScore: 78
    }
  }

  const calculateCommute = () => {
    if (!commuteFrom) return

    // Mock commute calculation
    // In production, use Google Maps Distance Matrix API
    const mockTimes: { [key: string]: number } = {
      'victoria island': 15,
      'vi': 15,
      'lekki': 10,
      'ikeja': 35,
      'island': 25,
      'mainland': 40,
      'ajah': 20,
      'ikoyi': 12
    }

    const location = commuteFrom.toLowerCase()
    const foundLocation = Object.keys(mockTimes).find(key =>
      location.includes(key)
    )

    if (foundLocation) {
      setCommuteTime(mockTimes[foundLocation])
    } else {
      setCommuteTime(30) // default
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
    { id: 'schools', label: 'Schools', icon: <School className="w-4 h-4" /> },
    { id: 'amenities', label: 'Amenities', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'transport', label: 'Transport', icon: <Bus className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-luxury-gold to-premium-orange">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-playfair font-bold text-white mb-2">
              Area Intelligence
            </h2>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span>{property.location.city}, {property.location.state}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">
              {areaData.overview.areaScore}
            </div>
            <div className="text-white/90 text-sm">Area Score</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b overflow-x-auto">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-brand-water text-brand-water'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab data={areaData.overview} city={property.location.city} state={property.location.state} />
          )}

          {activeTab === 'schools' && (
            <PlacesTab
              title="Nearby Schools"
              places={areaData.schools}
              icon={<School className="w-5 h-5" />}
            />
          )}

          {activeTab === 'amenities' && (
            <AmenitiesTab
              hospitals={areaData.hospitals}
              shopping={areaData.shopping}
              restaurants={areaData.restaurants}
            />
          )}

          {activeTab === 'transport' && (
            <TransportTab
              transport={areaData.transport}
              commuteFrom={commuteFrom}
              setCommuteFrom={setCommuteFrom}
              commuteTime={commuteTime}
              calculateCommute={calculateCommute}
            />
          )}

          {activeTab === 'safety' && (
            <SafetyTab data={areaData.safety} />
          )}
        </AnimatePresence>
      </div>

      {/* Map Preview */}
      <div className="p-6 bg-gray-50 border-t">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Location Map</h3>
          <button
            onClick={() => setMapFullscreen(true)}
            className="flex items-center gap-2 text-brand-water hover:text-brand-water/80 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="text-sm font-semibold">View Full Map</span>
          </button>
        </div>

        {/* Map placeholder - In production, integrate Google Maps */}
        <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/20 to-premium-orange/20" />
          <div className="relative z-10 text-center">
            <MapPin className="w-12 h-12 text-brand-water mx-auto mb-3" />
            <p className="text-gray-700 font-semibold">
              {property.location.address}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {property.location.city}, {property.location.state}
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Google Maps integration coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      <AnimatePresence>
        {mapFullscreen && (
          <MapModal
            property={property}
            onClose={() => setMapFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Overview Tab
const OverviewTab = ({ data, city, state }: { data: any, city: string, state: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={<Users className="w-6 h-6 text-brand-water" />}
          label="Population"
          value={data.population}
        />
        <MetricCard
          icon={<DollarSign className="w-6 h-6 text-brand-water" />}
          label="Median Income"
          value={data.medianIncome}
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6 text-brand-water" />}
          label="Price Growth"
          value={data.priceGrowth}
          positive
        />
      </div>

      {/* Scores */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 mb-4">Area Scores</h3>

        <ScoreBar label="Livability Score" score={data.livabilityScore} />
        <ScoreBar label="Walk Score" score={data.walkScore} />
        <ScoreBar label="Transit Score" score={data.transitScore} />
      </div>

      {/* Description */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">About This Area</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              {city} is a rapidly developing area in {state},
              known for its excellent schools, modern amenities, and strong property appreciation.
              The area offers a perfect balance of residential tranquility and urban convenience,
              with easy access to major business districts and entertainment hubs.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Places Tab (Schools)
const PlacesTab = ({
  title,
  places,
  icon
}: {
  title: string
  places: NearbyPlace[]
  icon: React.ReactNode
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">({places.length} nearby)</span>
      </div>

      <div className="space-y-3">
        {places.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </motion.div>
  )
}

// Amenities Tab
const AmenitiesTab = ({
  hospitals,
  shopping,
  restaurants
}: {
  hospitals: NearbyPlace[]
  shopping: NearbyPlace[]
  restaurants: NearbyPlace[]
}) => {
  const [activeCategory, setActiveCategory] = useState<'hospitals' | 'shopping' | 'restaurants'>('hospitals')

  const categories = [
    { id: 'hospitals', label: 'Healthcare', icon: <Cross className="w-4 h-4" />, data: hospitals },
    { id: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-4 h-4" />, data: shopping },
    { id: 'restaurants', label: 'Dining', icon: <Coffee className="w-4 h-4" />, data: restaurants }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Category Pills */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-luxury-gold text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Places List */}
      <div className="space-y-3">
        {categories.find(c => c.id === activeCategory)?.data.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </motion.div>
  )
}

// Transport Tab
const TransportTab = ({
  transport,
  commuteFrom,
  setCommuteFrom,
  commuteTime,
  calculateCommute
}: {
  transport: NearbyPlace[]
  commuteFrom: string
  setCommuteFrom: (value: string) => void
  commuteTime: number | null
  calculateCommute: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Commute Calculator */}
      <div className="bg-gradient-to-br from-luxury-gold/10 to-premium-orange/10 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-brand-water" />
          Commute Time Calculator
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter your work location (e.g., Victoria Island)"
            value={commuteFrom}
            onChange={(e) => setCommuteFrom(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-water"
          />
          <button
            onClick={calculateCommute}
            className="px-6 py-3 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors"
          >
            Calculate
          </button>
        </div>

        {commuteTime !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-white rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-brand-water" />
              <div>
                <p className="text-sm text-gray-600">Estimated commute time</p>
                <p className="text-2xl font-bold text-brand-water">{commuteTime} minutes</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Nearby Transport */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Nearby Transport</h3>
        <div className="space-y-3">
          {transport.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Safety Tab
const SafetyTab = ({ data }: { data: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Safety Score */}
      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          {data.safetyScore}/100
        </h3>
        <p className="text-gray-600">Safety Score</p>
      </div>

      {/* Safety Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SafetyMetric
          label="Crime Rate"
          value={data.crimeRate}
          icon={<Shield className="w-5 h-5" />}
          positive={data.crimeRate === 'Low'}
        />
        <SafetyMetric
          label="Police Stations"
          value={`${data.policeStations} nearby`}
          icon={<Shield className="w-5 h-5" />}
        />
        <SafetyMetric
          label="Emergency Response"
          value={data.emergencyResponse}
          icon={<Clock className="w-5 h-5" />}
        />
        <SafetyMetric
          label="Street Lighting"
          value={data.streetLighting}
          icon={<CheckCircle className="w-5 h-5" />}
          positive={data.streetLighting === 'Good'}
        />
      </div>

      {/* Gated Security */}
      <div className="bg-green-50 rounded-xl p-6">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Gated Community</h4>
            <p className="text-green-800 text-sm">{data.gatingSecurity}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Supporting Components
const MetricCard = ({
  icon,
  label,
  value,
  positive = false
}: {
  icon: React.ReactNode
  label: string
  value: string
  positive?: boolean
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`font-bold ${positive ? 'text-green-600' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

const ScoreBar = ({ label, score }: { label: string; score: number }) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{score}/100</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${getColor(score)}`}
        />
      </div>
    </div>
  )
}

const PlaceCard = ({ place }: { place: NearbyPlace }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-brand-water hover:bg-luxury-gold/5 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{place.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{place.type}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4" />
              <span>{place.distance} km away</span>
            </div>
            {place.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{place.rating} ({place.reviews})</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <button className="text-brand-water hover:text-brand-water/80 transition-colors text-sm font-semibold">
            Directions →
          </button>
        </div>
      </div>
    </div>
  )
}

const SafetyMetric = ({
  label,
  value,
  icon,
  positive = false
}: {
  label: string
  value: string
  icon: React.ReactNode
  positive?: boolean
}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${positive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`font-semibold ${positive ? 'text-green-600' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

// Map Modal
const MapModal = ({
  property,
  onClose
}: {
  property: Property
  onClose: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-2xl max-w-6xl w-full h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{property.location.address}</h3>
            <p className="text-sm text-gray-600">
              {property.location.city}, {property.location.state}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Map Content */}
        <div className="h-full bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-brand-water mx-auto mb-4" />
            <p className="text-gray-700 font-semibold mb-2">Interactive Map</p>
            <p className="text-sm text-gray-600">
              Google Maps integration will be added here
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AreaIntelligence
