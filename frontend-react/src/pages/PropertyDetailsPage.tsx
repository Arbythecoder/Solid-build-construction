import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Bed, Bath, Maximize, Heart, Share2, Phone, Mail,
  ChevronLeft, ChevronRight, Check, Shield, Calendar, Home,
  Car, Loader2
} from 'lucide-react'
import Button from '../components/ui/Button'
import { propertyAPI, inquiryAPI } from '../services/api'
import toast from 'react-hot-toast'

// Sample property for fallback
const sampleProperty = {
  id: '1',
  title: 'Exquisite 5-Bedroom Duplex in Lekki Phase 1',
  price: 185000000,
  location: 'Lekki Phase 1, Lagos',
  address: '123 Admiralty Way, Lekki Phase 1, Lagos',
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
  ],
  bedrooms: 5,
  bathrooms: 6,
  size: 450,
  status: 'For Sale',
  yearBuilt: 2022,
  parking: 3,
  description: `This stunning 5-bedroom fully detached duplex represents the epitome of luxury living in Lekki Phase 1. Built with premium materials and featuring contemporary architectural design, this property offers an exceptional lifestyle for discerning buyers.

The ground floor welcomes you with a grand entrance hall leading to spacious living and dining areas with high ceilings and large windows that flood the space with natural light. The modern kitchen is equipped with premium appliances and granite countertops.

The first floor houses the master bedroom with an en-suite bathroom featuring Italian tiles and a walk-in closet. Three additional bedrooms, each with en-suite facilities, offer privacy and comfort for family members.

The property sits on 650sqm of land with a beautiful garden, swimming pool, and a 3-car garage. 24/7 security and power supply make this an ideal home for families seeking comfort, security, and prestige.`,
  features: [
    'Swimming Pool',
    'Smart Home System',
    '24/7 Security',
    'Backup Generator',
    'Fitted Kitchen',
    'Central Air Conditioning',
    'Boys Quarters',
    'Landscaped Garden',
  ],
  agent: {
    name: 'Adewale Johnson',
    phone: '+234 911 525 8580',
    email: 'adewale@afodamsproperty.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200',
  },
  verified: true,
  cofO: true,
}

const PropertyDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      if (id) {
        const response = await propertyAPI.getById(id)
        if (response.data) {
          setProperty({
            ...response.data,
            images: response.data.images?.map((img: any) => img.url) || sampleProperty.images,
          })
        } else {
          setProperty(sampleProperty)
        }
      }
    } catch (error) {
      console.log('Using sample property')
      setProperty(sampleProperty)
    } finally {
      setLoading(false)
    }
  }

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setInquiryLoading(true)
    try {
      await inquiryAPI.create({
        name: inquiryForm.name,
        email: inquiryForm.email,
        message: `Property: ${property.title}\nPhone: ${inquiryForm.phone}\n\n${inquiryForm.message}`,
        property: id,
      })
      toast.success('Inquiry sent successfully! We will contact you soon.')
      setShowInquiryModal(false)
      setInquiryForm({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.')
    } finally {
      setInquiryLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-luxury-gold mx-auto mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Button variant="gold" onClick={() => navigate('/properties')}>
            Browse Properties
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Image Gallery */}
      <section className="relative h-[60vh] bg-black">
        <motion.img
          key={currentImageIndex}
          src={property.images?.[currentImageIndex] || sampleProperty.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {property.images?.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-luxury-gold' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Status */}
        <div className="absolute top-6 right-6">
          <span className={`px-4 py-2 rounded-full font-semibold ${
            property.status === 'For Sale'
              ? 'bg-gradient-gold text-premium-black'
              : 'bg-blue-500 text-white'
          }`}>
            {property.status}
          </span>
        </div>
      </section>

      {/* Content */}
      <div className="container-premium py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-3">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-luxury-gold" />
                    {property.address || property.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-white rounded-full shadow hover:shadow-lg transition-shadow">
                    <Heart className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="p-3 bg-white rounded-full shadow hover:shadow-lg transition-shadow">
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-4xl font-playfair font-bold text-luxury-gold">
                {formatPrice(property.price)}
                {property.status === 'For Rent' && <span className="text-lg text-gray-600">/year</span>}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <Bed className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <div className="text-2xl font-bold">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <Bath className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <div className="text-2xl font-bold">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <Maximize className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <div className="text-2xl font-bold">{property.size}</div>
                <div className="text-sm text-gray-600">Sq. Meters</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow">
                <Car className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                <div className="text-2xl font-bold">{property.parking || 2}</div>
                <div className="text-sm text-gray-600">Parking</div>
              </div>
            </motion.div>

            {/* Badges */}
            {(property.verified || property.cofO) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-4">
                {property.verified && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Verified Property</span>
                  </div>
                )}
                {property.cofO && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">C of O Available</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-8 shadow">
              <h2 className="text-2xl font-playfair font-bold mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-8 shadow">
              <h2 className="text-2xl font-playfair font-bold mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(property.features || sampleProperty.features).map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow sticky top-24">
              <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={property.agent?.image || sampleProperty.agent.image}
                  alt={property.agent?.name || sampleProperty.agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-luxury-gold"
                />
                <div>
                  <h4 className="font-semibold">{property.agent?.name || sampleProperty.agent.name}</h4>
                  <p className="text-sm text-gray-600">Property Agent</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${property.agent?.phone || sampleProperty.agent.phone}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Phone className="w-5 h-5 text-luxury-gold" />
                  <span>{property.agent?.phone || sampleProperty.agent.phone}</span>
                </a>
                <a href={`mailto:${property.agent?.email || sampleProperty.agent.email}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Mail className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm">{property.agent?.email || sampleProperty.agent.email}</span>
                </a>
              </div>

              <Button variant="gold" className="w-full mb-3" onClick={() => setShowInquiryModal(true)}>
                Send Inquiry
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.open(`https://wa.me/2349115258580?text=I'm interested in: ${property.title}`, '_blank')}>
                WhatsApp
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-dark rounded-2xl p-6 text-white">
              <Calendar className="w-10 h-10 text-luxury-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Schedule a Tour</h3>
              <p className="text-gray-300 mb-4">Visit this property in person with our agent.</p>
              <Button variant="gold" className="w-full" onClick={() => setShowInquiryModal(true)}>
                Book Viewing
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Send Inquiry</h2>
            <form onSubmit={handleInquiry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required value={inquiryForm.name} onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={inquiryForm.email} onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={inquiryForm.phone} onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} required value={inquiryForm.message} onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })} placeholder={`I'm interested in ${property.title}`} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-luxury-gold focus:border-transparent resize-none" />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowInquiryModal(false)}>Cancel</Button>
                <Button type="submit" variant="gold" className="flex-1" disabled={inquiryLoading}>{inquiryLoading ? 'Sending...' : 'Send'}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsPage
