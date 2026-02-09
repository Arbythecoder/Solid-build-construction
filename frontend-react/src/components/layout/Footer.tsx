import { Link } from 'react-router-dom'
import {
  Facebook, Instagram, Twitter, Linkedin, Youtube,
  Mail, Phone, MapPin, Clock, ChevronRight, Send
} from 'lucide-react'
import { useState } from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/signup' },
  ]

  const propertyLinks = [
    { name: 'Properties for Sale', path: '/properties?type=sale' },
    { name: 'Properties for Rent', path: '/properties?type=rent' },
    { name: 'Luxury Homes', path: '/properties?category=luxury' },
    { name: 'Commercial Properties', path: '/properties?category=commercial' },
    { name: 'Land for Sale', path: '/properties?category=land' },
    { name: 'New Developments', path: '/properties?category=new' },
  ]

  const toolsLinks = [
    { name: 'Mortgage Calculator', path: '/tools/mortgage' },
    { name: 'ROI Calculator', path: '/tools/roi' },
    { name: 'C of O Verification', path: '/tools/cofo' },
    { name: 'Payment Plans', path: '/tools/payment-plan' },
    { name: 'Currency Converter', path: '/tools/currency' },
    { name: 'Investment Guide', path: '/tools/diaspora' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com/Solid Buildproperty', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/Solid Buildproperty', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com/Solid Buildproperty', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/company/Solid Buildproperty', label: 'LinkedIn' },
    { icon: <Youtube className="w-5 h-5" />, url: 'https://youtube.com/@Solid Buildproperty', label: 'YouTube' },
  ]

  return (
    <footer className="bg-premium-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-gold py-12">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-playfair font-bold text-premium-black mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-premium-charcoal">
                Get the latest property listings and market updates delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-premium-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-premium-black text-luxury-gold px-6 py-4 rounded-xl hover:bg-premium-charcoal transition-colors flex items-center gap-2 font-semibold"
              >
                {subscribed ? 'Subscribed!' : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Company Info - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-playfair font-bold text-luxury-gold mb-4">
              Solid Build Construction Limited
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Nigeria's premier real estate platform. We help you find your dream home,
              make smart investments, and navigate the property market with confidence.
              Trusted by thousands of Nigerians since 2014.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400">149 Ogudu Road,</span>
                  <br />
                  <span className="text-gray-400">Lagos, Nigeria</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <a href="tel:+2349115258580" className="text-gray-400 hover:text-luxury-gold transition-colors">
                  +234 911 525 8580
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <a href="mailto:Solid Buildproperty@gmail.com" className="text-gray-400 hover:text-luxury-gold transition-colors">
                  Solid Buildproperty@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <span className="text-gray-400">Mon - Sat: 8AM - 6PM</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-premium-black hover:shadow-gold hover:scale-110 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-gold mb-6">Properties</h4>
            <ul className="space-y-3">
              {propertyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-gold mb-6">Tools & Resources</h4>
            <ul className="space-y-3">
              {toolsLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-gold mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-luxury-gold transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold text-gray-400 mb-4">Trusted By</h5>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/10 px-3 py-1 rounded text-xs text-gray-300">CAC Registered</span>
                <span className="bg-white/10 px-3 py-1 rounded text-xs text-gray-300">SSL Secured</span>
                <span className="bg-white/10 px-3 py-1 rounded text-xs text-gray-300">NDPC Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Solid Build Construction Limited Limited. All rights reserved.
              <span className="hidden md:inline"> | RC: 1234567</span>
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/sitemap" className="text-gray-400 hover:text-luxury-gold transition-colors">
                Sitemap
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/accessibility" className="text-gray-400 hover:text-luxury-gold transition-colors">
                Accessibility
              </Link>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">Made with ❤️ in Lagos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
