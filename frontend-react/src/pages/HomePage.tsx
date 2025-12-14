import { motion } from 'framer-motion'
import { Search, Shield, Headphones, Award, ChevronDown, TrendingUp, Users, Home, Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PropertyCard from '../components/ui/PropertyCard'
import WhatsAppButton from '../components/ui/WhatsAppButton'
import AppComingSoon from '../components/sections/AppComingSoon'
import ServicesSection from '../components/sections/ServicesSection'

const HomePage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('For Sale')

  // Counter animation
  const [counters, setCounters] = useState({ properties: 0, clients: 0, agents: 0 })

  useEffect(() => {
    const targets = { properties: 500, clients: 1200, agents: 50 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    const timer = setInterval(() => {
      setCounters(prev => ({
        properties: Math.min(prev.properties + targets.properties / steps, targets.properties),
        clients: Math.min(prev.clients + targets.clients / steps, targets.clients),
        agents: Math.min(prev.agents + targets.agents / steps, targets.agents),
      }))
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const handleSearch = () => {
    navigate(`/properties?search=${searchQuery}&type=${propertyType}`)
  }

  // Sample featured properties (replace with API call)
  const featuredProperties = [
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
      featured: true,
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
      featured: true,
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: 'Chief Emeka Okonkwo',
      role: 'Business Executive, Lagos',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      text: 'Afodams helped me find the perfect family home in Lekki. Their C of O verification service gave me peace of mind. Highly recommended!',
    },
    {
      name: 'Mrs. Aisha Bello',
      role: 'Doctor, Abuja',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      text: 'As a busy professional, I appreciated how Afodams handled everything. From property search to documentation, they were exceptional.',
    },
    {
      name: 'Mr. Oluwaseun Adeyemi',
      role: 'Diaspora Investor, UK',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      text: 'Living abroad, I was worried about investing in Nigerian property. Afodams made it seamless and transparent. My investment is secure.',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* HERO SECTION with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 container-premium text-center text-white px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="badge-premium">Premium Properties in Nigeria</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-playfair font-extrabold mb-6 leading-tight">
              Discover Your{' '}
              <span className="text-gradient-gold">Dream Home</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Luxury real estate in Lagos, Abuja, and across Nigeria
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-6 h-6 text-luxury-gold" />
                <input
                  type="text"
                  placeholder="Search by location, property type, or price..."
                  className="flex-1 outline-none text-gray-800 text-lg py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <select
                className="px-6 py-3 outline-none text-gray-800 rounded-xl md:rounded-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
              <Button variant="gold" size="lg" onClick={handleSearch}>
                <Search className="w-5 h-5" />
                Search
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-5xl font-playfair font-extrabold text-luxury-gold mb-2">
                  {Math.floor(counters.properties)}+
                </div>
                <div className="text-lg text-gray-300">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-playfair font-extrabold text-luxury-gold mb-2">
                  {Math.floor(counters.clients)}+
                </div>
                <div className="text-lg text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-playfair font-extrabold text-luxury-gold mb-2">
                  {Math.floor(counters.agents)}+
                </div>
                <div className="text-lg text-gray-300">Expert Agents</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section bg-gray-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-luxury-gold uppercase tracking-wider">
              Featured Listings
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-3 mb-4">
              Premium Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of luxury homes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <PropertyCard {...property} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="luxury" size="lg" onClick={() => navigate('/properties')}>
              View All Properties
            </Button>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-gradient-dark text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-luxury-gold uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-3">
              Your Trusted Real Estate Partner
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12" />,
                title: '100% Verified',
                description: 'All properties are thoroughly verified and legally documented.',
              },
              {
                icon: <Headphones className="w-12 h-12" />,
                title: '24/7 Support',
                description: 'Our expert agents are always available to assist you.',
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: 'Award Winning',
                description: "Recognized as Nigeria's leading property platform.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-8 text-center hover:bg-white/20 transition-all"
              >
                <div className="inline-flex items-center justify-center mb-6 text-luxury-gold">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section bg-gray-50">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Home />, value: '500+', label: 'Properties Listed' },
              { icon: <Users />, value: '1,200+', label: 'Happy Clients' },
              { icon: <TrendingUp />, value: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-gold rounded-full mb-4 text-premium-black">
                  {stat.icon}
                </div>
                <div className="text-5xl font-playfair font-extrabold text-luxury-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section bg-gradient-dark text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-luxury-gold uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mt-3">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-8 relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-luxury-gold/20" />
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-luxury-gold"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS SECTION */}
      <section className="section bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-luxury-gold uppercase tracking-wider">
              Our Locations
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3">
              Properties Across Nigeria
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Lagos', count: '250+ Properties', image: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=400' },
              { name: 'Abuja', count: '120+ Properties', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400' },
              { name: 'Port Harcourt', count: '80+ Properties', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400' },
              { name: 'Ibadan', count: '50+ Properties', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' },
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/properties?location=${location.name}`)}
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-xl">{location.name}</h3>
                  <p className="text-gray-300 text-sm">{location.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section bg-gradient-gold">
        <div className="container-premium text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-extrabold text-premium-black mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-premium-charcoal mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied homeowners who found their perfect property with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="luxury"
                size="lg"
                onClick={() => navigate('/properties')}
              >
                Browse Properties
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-premium-black border-premium-black text-luxury-gold hover:bg-premium-black hover:text-white"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Our Services Section */}
      <ServicesSection />


      {/* Mobile App Coming Soon Section */}
      <AppComingSoon />

      {/* WhatsApp Button - Floating */}
      <WhatsAppButton />
    </div>
  )
}

export default HomePage
