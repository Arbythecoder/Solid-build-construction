import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Bed, Bath, Maximize, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

interface PropertyCardProps {
  id: string
  title: string
  price: number
  location: string
  image: string
  images?: string[] // Multiple images for slider
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
  images,
  bedrooms,
  bathrooms,
  size,
  status,
  featured = false
}: PropertyCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  // Use images array or fallback to single image
  const propertyImages = images && images.length > 0 ? images : [image]

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const handleView = () => {
    navigate(`/properties/${id}`)
  }

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log('Contact agent for property:', id)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, boxShadow: '0 20px 60px rgba(14, 165, 233, 0.25)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="property-card group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-water-lg transition-all duration-300"
      onClick={handleView}
    >
      {/* Image Slider */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-brand-water-light to-brand-sand">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={propertyImages[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 right-4 px-4 py-2 bg-gradient-water text-white rounded-full text-xs font-bold shadow-water animate-pulse-water"
          >
            ⭐ Featured
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg z-10 transition-all duration-300 hover:bg-brand-water hover:shadow-water"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700 group-hover:text-brand-water'
            }`}
          />
        </motion.button>

        {/* Image Navigation */}
        {propertyImages.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-water hover:text-white z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-water hover:text-white z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {propertyImages.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.3 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-4 py-2 rounded-lg text-xs font-bold backdrop-blur-md shadow-lg ${
              status === 'For Sale'
                ? 'bg-emerald-500/90 text-white'
                : 'bg-brand-water/90 text-white'
            }`}
          >
            {status}
          </motion.span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-white to-brand-cream">
        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-3 text-brand-slate"
        >
          <MapPin className="w-4 h-4 text-brand-water" />
          <span className="text-sm font-medium">{location}</span>
        </motion.div>

        {/* Title */}
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-brand-water transition-colors duration-300"
        >
          {title}
        </motion.h4>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-playfair font-extrabold bg-gradient-beach bg-clip-text text-transparent mb-4"
        >
          ₦{price.toLocaleString()}
          {status === 'For Rent' && <span className="text-base font-normal text-brand-slate">/month</span>}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-6 mb-5 text-brand-slate"
        >
          <div className="flex items-center gap-2 group/feature">
            <div className="p-2 bg-brand-water/10 rounded-lg group-hover/feature:bg-brand-water/20 transition-colors">
              <Bed className="w-5 h-5 text-brand-water" />
            </div>
            <span className="text-sm font-semibold">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2 group/feature">
            <div className="p-2 bg-brand-sand/30 rounded-lg group-hover/feature:bg-brand-sand/40 transition-colors">
              <Bath className="w-5 h-5 text-brand-brown" />
            </div>
            <span className="text-sm font-semibold">{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2 group/feature">
            <div className="p-2 bg-brand-water/10 rounded-lg group-hover/feature:bg-brand-water/20 transition-colors">
              <Maximize className="w-5 h-5 text-brand-water" />
            </div>
            <span className="text-sm font-semibold">{size} m²</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <Button
            variant="gold"
            size="sm"
            className="flex-1 bg-gradient-water hover:shadow-water-lg border-0 text-white font-bold transform hover:scale-105 transition-all duration-300"
            onClick={handleView}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-brand-sand hover:bg-brand-sand hover:text-white hover:shadow-sand transform hover:scale-105 transition-all duration-300"
            onClick={handleContact}
          >
            <Phone className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-beach opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

export default PropertyCard
