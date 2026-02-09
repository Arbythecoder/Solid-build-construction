import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, Send, MessageSquare,
  Building, Users, CheckCircle, Loader2
} from 'lucide-react'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'
import { inquiryAPI } from '../services/api'
import ChatBot from '../components/ui/ChatBot'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await inquiryAPI.create({
        name: formData.name,
        email: formData.email,
        message: `Subject: ${formData.subject}\nPhone: ${formData.phone}\n\n${formData.message}`
      })
      setSubmitted(true)
      toast.success('Your message has been sent successfully!')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['+234 911 525 8580', '+234 802 123 4567'],
      action: 'tel:+2349115258580'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['Solid Buildproperty@gmail.com', 'info@Solid Buildproperty.com'],
      action: 'mailto:Solid Buildproperty@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Head Office',
      details: ['149 Ogudu Road', 'Ogudu, Lagos, Nigeria'],
      action: 'https://maps.google.com/?q=149+Ogudu+Road+Lagos'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      action: null
    },
  ]

  const offices = [
    {
      city: 'Lagos (Head Office)',
      address: '149 Ogudu Road, Ogudu, Lagos',
      phone: '+234 911 525 8580',
      image: 'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=600'
    },
    {
      city: 'Abuja',
      address: 'Plot 123, Wuse Zone 5, Abuja',
      phone: '+234 802 123 4567',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600'
    },
    {
      city: 'Port Harcourt',
      address: '45 Aba Road, GRA Phase 2',
      phone: '+234 803 456 7890',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'
    },
  ]

  const faqs = [
    {
      question: 'How do I verify a property\'s C of O?',
      answer: 'Our platform provides a C of O verification tool. Simply enter the property details and we\'ll verify with the relevant land registry.'
    },
    {
      question: 'What payment plans are available?',
      answer: 'We offer flexible payment plans including outright purchase, installment payments (6-24 months), and mortgage assistance through partner banks.'
    },
    {
      question: 'How long does the buying process take?',
      answer: 'Typically 2-4 weeks for outright purchases with verified documents. Mortgage-backed purchases may take 4-8 weeks depending on bank processing.'
    },
    {
      question: 'Do you help with property management?',
      answer: 'Yes! We offer comprehensive property management services for landlords, including tenant screening, rent collection, and maintenance coordination.'
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <span className="badge-premium mb-6 inline-block">Contact Us</span>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Get in{' '}
              <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about a property? Need investment advice? Our team of experts
              is ready to assist you on your real estate journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.action || '#'}
                target={info.action?.startsWith('http') ? '_blank' : undefined}
                rel={info.action?.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-6 text-center hover:shadow-gold transition-all group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-beach rounded-full mb-4 text-premium-black group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600">{detail}</p>
                ))}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
                Send Us a Message
              </span>
              <h2 className="text-4xl font-playfair font-bold mt-3 mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600 mb-6">
                    Thank you for contacting us. We'll respond within 24 hours.
                  </p>
                  <Button variant="gold" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-water focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-water focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-water focus:border-transparent transition-all"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-water focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="Property Inquiry">Property Inquiry</option>
                        <option value="Investment Opportunity">Investment Opportunity</option>
                        <option value="Rental Services">Rental Services</option>
                        <option value="Property Management">Property Management</option>
                        <option value="C of O Verification">C of O Verification</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-water focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button type="submit" variant="gold" size="lg" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4!2d3.38!3d6.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzQnNDguMCJOIDPCsDIyJzQ4LjAiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Solid Build Construction Limited Location"
                />
              </div>

              {/* Quick Contact Card */}
              <div className="glass-dark rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-playfair font-bold mb-6">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <a href="tel:+2349115258580" className="flex items-center gap-4 hover:text-brand-water transition-colors">
                    <div className="w-12 h-12 bg-gradient-beach rounded-full flex items-center justify-center text-premium-black">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Call Us</p>
                      <p className="font-semibold">+234 911 525 8580</p>
                    </div>
                  </a>
                  <a href="mailto:Solid Buildproperty@gmail.com" className="flex items-center gap-4 hover:text-brand-water transition-colors">
                    <div className="w-12 h-12 bg-gradient-beach rounded-full flex items-center justify-center text-premium-black">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email Us</p>
                      <p className="font-semibold">Solid Buildproperty@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/2349115258580"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:text-brand-water transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-beach rounded-full flex items-center justify-center text-premium-black">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">WhatsApp</p>
                      <p className="font-semibold">Chat with us</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Offices */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
              Our Locations
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3 mb-4">
              Visit Our Offices
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We have offices across Nigeria's major cities to serve you better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{office.city}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-brand-water flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-water" />
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-600 hover:text-brand-water transition-colors">
                      {office.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
              FAQs
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-6"
              >
                <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                  <span className="w-8 h-8 bg-gradient-beach rounded-full flex items-center justify-center text-premium-black text-sm flex-shrink-0">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-11">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-beach">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-playfair font-bold text-premium-black mb-6">
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl text-premium-charcoal mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing, our team is here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="luxury"
                size="lg"
                onClick={() => window.location.href = '/properties'}
              >
                <Building className="w-5 h-5" />
                Browse Properties
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white border-premium-black text-premium-black hover:bg-premium-black hover:text-white"
                onClick={() => window.location.href = '/signup'}
              >
                <Users className="w-5 h-5" />
                Join Today
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ChatBot - Floating */}
      <ChatBot />
    </div>
  )
}

export default ContactPage
