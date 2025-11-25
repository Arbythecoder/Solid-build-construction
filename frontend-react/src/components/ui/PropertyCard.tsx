import { motion } from 'framer-motion'
import { Heart, Bed, Bath, Maximize, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

interface PropertyCardProps {
  id: string
  title: string
  price: number
  location: string
  image: string
  bedrooms: number
  bathrooms: number
  size: number
  status: 'For Sale' | 'For Rent'
  featured?: boolean
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  image,
  bedrooms,
  bathrooms,
  size,
  status,
  featured = false
}: PropertyCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleView = () => {
    navigate(`/properties/${id}`)
  }

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Open contact modal or navigate to contact page
    console.log('Contact agent for property:', id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="property-card"
      onClick={handleView}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="property-image"
          loading="lazy"
        />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 badge-premium">
            Featured
          </div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg z-10"
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Status and Location */}
        <div className="flex justify-between items-center mb-3">
          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
            status === 'For Sale'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {status}
          </span>
          <span className="text-luxury-gold flex items-center gap-1 text-sm">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold mb-2 line-clamp-2 hover:text-luxury-gold transition-colors">
          {title}
        </h4>

        {/* Price */}
        <div className="text-3xl font-playfair font-extrabold text-luxury-gold mb-4">
          ₦{price.toLocaleString()}
        </div>

        {/* Features */}
        <div className="flex gap-6 mb-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-luxury-gold" />
            <span className="text-sm">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-luxury-gold" />
            <span className="text-sm">{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-5 h-5 text-luxury-gold" />
            <span className="text-sm">{size} m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="gold"
            size="sm"
            className="flex-1"
            onClick={handleView}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleContact}
          >
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertyCard
