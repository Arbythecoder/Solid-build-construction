import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, MapPin, DollarSign, FileText, Shield, Users,
  CheckCircle, AlertTriangle, Phone, Mail, Video,
  BookOpen, ChevronRight, ExternalLink, Download,
  Building, Plane, Clock, TrendingUp
} from 'lucide-react'

const DiasporaInvestmentGuide = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState('USA')
  const [showContactForm, setShowContactForm] = useState(false)

  const steps = [
    {
      id: 1,
      title: 'Research & Planning',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Understand the Nigerian property market',
      details: [
        'Research property prices and locations',
        'Understand investment returns (ROI)',
        'Compare different property types',
        'Check area development plans',
        'Review market trends and forecasts'
      ]
    },
    {
      id: 2,
      title: 'Legal Requirements',
      icon: <FileText className="w-6 h-6" />,
      description: 'Navigate Nigerian property laws',
      details: [
        'Understand C of O requirements',
        'Learn about land use regulations',
        'Know your rights as a foreign investor',
        'Understand tax obligations (CGT, Property Tax)',
        'Review inheritance laws'
      ]
    },
    {
      id: 3,
      title: 'Find Trusted Partners',
      icon: <Users className="w-6 h-6" />,
      description: 'Work with verified professionals',
      details: [
        'Hire a licensed real estate agent',
        'Engage a property lawyer',
        'Find a reliable property manager',
        'Connect with experienced developers',
        'Get a surveyor for inspections'
      ]
    },
    {
      id: 4,
      title: 'Property Viewing',
      icon: <Video className="w-6 h-6" />,
      description: 'Inspect properties remotely or in-person',
      details: [
        'Schedule virtual property tours',
        'Request detailed photos and videos',
        'Plan inspection trips to Nigeria',
        'Use trusted agents for site visits',
        'Verify all property documents'
      ]
    },
    {
      id: 5,
      title: 'Payment & Transfer',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Secure fund transfers from abroad',
      details: [
        'Use official banking channels',
        'Consider currency exchange rates',
        'Explore payment plan options',
        'Keep all transaction receipts',
        'Understand foreign exchange regulations'
      ]
    },
    {
      id: 6,
      title: 'Documentation',
      icon: <Shield className="w-6 h-6" />,
      description: 'Complete all legal paperwork',
      details: [
        'Sign Sales Agreement remotely',
        'Process Power of Attorney if needed',
        'Transfer property title',
        'Obtain Certificate of Occupancy',
        'Register property ownership'
      ]
    }
  ]

  const countries = [
    {
      name: 'USA',
      flag: '🇺🇸',
      timezone: 'EST (UTC-5)',
      offices: '5 Partner Agents',
      support: '24/7 Support'
    },
    {
      name: 'UK',
      flag: '🇬🇧',
      timezone: 'GMT (UTC+0)',
      offices: '8 Partner Agents',
      support: '24/7 Support'
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      timezone: 'EST (UTC-5)',
      offices: '3 Partner Agents',
      support: '24/7 Support'
    },
    {
      name: 'UAE',
      flag: '🇦🇪',
      timezone: 'GST (UTC+4)',
      offices: '4 Partner Agents',
      support: '24/7 Support'
    }
  ]

  const faqs = [
    {
      question: 'Can I buy property in Nigeria as a non-resident?',
      answer: 'Yes! Nigerian law allows both citizens and non-citizens to own property in Nigeria. However, the process and requirements may vary by state.'
    },
    {
      question: 'Do I need to travel to Nigeria to buy property?',
      answer: 'Not necessarily. You can complete most of the process remotely through virtual tours, online documentation, and Power of Attorney. However, we recommend at least one site visit.'
    },
    {
      question: 'How do I transfer money from abroad to buy property?',
      answer: 'Use official banking channels like wire transfers. Ensure you comply with both your local country\'s and Nigeria\'s foreign exchange regulations. Keep all receipts.'
    },
    {
      question: 'What taxes do I need to pay?',
      answer: 'Property buyers pay stamp duty (~3-5% of property value). After purchase, you\'ll pay annual property tax. If you sell, Capital Gains Tax (CGT) applies.'
    },
    {
      question: 'How can I manage my property from abroad?',
      answer: 'Hire a reliable property management company. They\'ll handle tenants, maintenance, rent collection, and provide regular updates and reports.'
    },
    {
      question: 'Is my investment protected?',
      answer: 'Ensure you obtain a valid Certificate of Occupancy (C of O) and register with the Land Registry. Work only with verified developers and use a property lawyer.'
    }
  ]

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: 'High ROI Potential',
      description: 'Nigerian property market offers 15-25% annual returns'
    },
    {
      icon: <Building className="w-6 h-6 text-blue-600" />,
      title: 'Growing Market',
      description: 'Rapid urbanization creating strong property demand'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-luxury-gold" />,
      title: 'Affordable Entry',
      description: 'Lower property prices compared to UK/US markets'
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      title: 'Diaspora Support',
      description: 'Dedicated support for overseas Nigerian investors'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-luxury-gold/10 rounded-full mb-6">
          <Globe className="w-10 h-10 text-luxury-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-premium-black mb-4">
          Diaspora Investment Guide
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Your complete guide to investing in Nigerian property from anywhere in the world
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setShowContactForm(true)}
            className="px-8 py-4 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Talk to Expert
          </button>
          <button className="px-8 py-4 border-2 border-luxury-gold text-luxury-gold rounded-xl font-semibold hover:bg-luxury-gold/5 transition-colors flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Guide
          </button>
        </div>
      </div>

      {/* Country Selector */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-luxury-gold" />
          Select Your Location
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {countries.map(country => (
            <button
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedCountry === country.name
                  ? 'border-luxury-gold bg-luxury-gold/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{country.flag}</div>
              <div className="font-semibold text-gray-900">{country.name}</div>
              <div className="text-xs text-gray-600 mt-1">{country.timezone}</div>
              <div className="text-xs text-luxury-gold mt-2">{country.offices}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Why Invest Benefits */}
      <div className="bg-gradient-to-br from-luxury-gold/10 to-premium-orange/10 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6 text-center">
          Why Invest in Nigerian Property?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-luxury-gold to-premium-orange">
          <h2 className="text-2xl font-playfair font-bold text-white">
            6-Step Investment Process
          </h2>
          <p className="text-white/90 mt-2">
            Follow these steps to successfully invest from abroad
          </p>
        </div>

        <div className="p-6">
          {/* Step Navigator */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  activeStep === index
                    ? 'border-luxury-gold bg-luxury-gold/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`mb-2 ${activeStep === index ? 'text-luxury-gold' : 'text-gray-400'}`}>
                  {step.icon}
                </div>
                <div className="text-xs font-semibold text-gray-900">Step {step.id}</div>
                <div className="text-xs text-gray-600 mt-1">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-luxury-gold rounded-xl text-white">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-gray-600">{steps[activeStep].description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {steps[activeStep].details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mt-6">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-6 py-2 bg-luxury-gold text-white rounded-lg hover:bg-luxury-gold/90 transition-colors flex items-center gap-2"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-playfair font-bold text-premium-black mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* Support Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Phone className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">24/7 Diaspora Support</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dedicated support team in your timezone
          </p>
          <button className="text-luxury-gold hover:text-luxury-gold/80 font-semibold flex items-center gap-1 mx-auto">
            Contact Now
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Video className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Virtual Property Tours</h3>
          <p className="text-sm text-gray-600 mb-4">
            View properties via live video calls
          </p>
          <button className="text-luxury-gold hover:text-luxury-gold/80 font-semibold flex items-center gap-1 mx-auto">
            Schedule Tour
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Users className="w-12 h-12 text-luxury-gold mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Trusted Partners</h3>
          <p className="text-sm text-gray-600 mb-4">
            Verified lawyers, agents, and managers
          </p>
          <button className="text-luxury-gold hover:text-luxury-gold/80 font-semibold flex items-center gap-1 mx-auto">
            View Partners
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 mb-2">Important Warning</h3>
            <p className="text-red-800 mb-3">
              Beware of property scams targeting diaspora investors. Always:
            </p>
            <ul className="space-y-1 text-sm text-red-800">
              <li>• Verify seller and property documents</li>
              <li>• Use only licensed professionals</li>
              <li>• Never send money without verified documentation</li>
              <li>• Visit the property (physically or virtually) before purchase</li>
              <li>• Work with established platforms like Solid Build</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <ContactFormModal onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <ChevronRight
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-gray-700 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Contact Form Modal
const ContactFormModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'USA',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you! Our diaspora team will contact you within 24 hours.')
    onClose()
  }

  return (
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
        className="bg-white rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-playfair font-bold text-premium-black">
            Talk to Diaspora Expert
          </h2>
          <p className="text-gray-600 mt-1">We'll help you invest with confidence</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Location
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            >
              <option value="USA">🇺🇸 USA</option>
              <option value="UK">🇬🇧 UK</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="UAE">🇦🇪 UAE</option>
              <option value="Other">🌍 Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-gold"
              rows={3}
              placeholder="Tell us about your investment goals..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-luxury-gold text-white rounded-xl font-semibold hover:bg-luxury-gold/90 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default DiasporaInvestmentGuide
