import { motion } from 'framer-motion'
import { Building2, ClipboardCheck, TrendingUp, Users, Wrench, HardHat } from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Agency',
    description: 'Professional real estate agency services connecting buyers, sellers, and renters with their ideal properties across Lagos and beyond.',
    features: ['Property Listings', 'Client Matching', 'Market Analysis']
  },
  {
    icon: ClipboardCheck,
    title: 'Property Management',
    description: 'Comprehensive property management solutions ensuring your investments are well-maintained and generating optimal returns.',
    features: ['Tenant Management', 'Maintenance', 'Rent Collection']
  },
  {
    icon: TrendingUp,
    title: 'Deals Sourcing & Packaging',
    description: 'Expert identification and structuring of profitable real estate investment opportunities with detailed due diligence.',
    features: ['Market Research', 'Investment Analysis', 'Deal Structuring']
  },
  {
    icon: Users,
    title: 'JV Arrangement',
    description: 'Strategic joint venture partnerships that leverage combined resources for successful real estate development projects.',
    features: ['Partnership Setup', 'Profit Sharing', 'Legal Framework']
  },
  {
    icon: Wrench,
    title: 'Renovation',
    description: 'Professional renovation services that transform properties, increase value, and meet modern living standards.',
    features: ['Interior Design', 'Quality Materials', 'Timely Completion']
  },
  {
    icon: HardHat,
    title: 'Construction',
    description: 'End-to-end construction services from planning to completion, delivering quality buildings on time and within budget.',
    features: ['Project Management', 'Quality Assurance', 'On-Time Delivery']
  }
]

const ServicesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-luxury-gold/10 border border-brand-water/20 rounded-full px-6 py-2 mb-6"
          >
            <Building2 className="w-5 h-5 text-brand-water" />
            <span className="text-brand-water font-semibold text-sm uppercase tracking-wide">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-premium-black mb-6">
            Comprehensive Real Estate
            <span className="block bg-gradient-beach bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From agency services to construction, we provide end-to-end real estate solutions
            tailored to meet your investment and property needs in Nigeria.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-beach flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-premium-black" />
                </div>
                {/* Decorative element */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-luxury-gold/10 rounded-full blur-xl group-hover:bg-luxury-gold/20 transition-colors"></div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-premium-black mb-3 group-hover:text-brand-water transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-luxury-gold/0 to-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/#/contact"
              className="px-8 py-4 bg-gradient-beach text-premium-black font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </a>
            <a
              href="https://wa.me/2349115258580"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-premium-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors border-2 border-premium-black"
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '500+', label: 'Properties Managed' },
            { value: '1,200+', label: 'Happy Clients' },
            { value: '50+', label: 'JV Projects' },
            { value: '₦5B+', label: 'Deals Closed' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-beach bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default ServicesSection
