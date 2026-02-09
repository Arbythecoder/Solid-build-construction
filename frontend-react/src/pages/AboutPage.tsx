import { motion } from 'framer-motion'
import {
  Shield, Award, Users, Home, CheckCircle, Star,
  TrendingUp, Heart, Building, MapPin, Phone, Mail,
  Clock, Target, Eye, UserCheck
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const AboutPage = () => {
  const navigate = useNavigate()

  const stats = [
    { value: '10+', label: 'Years Experience', icon: <Clock className="w-6 h-6" /> },
    { value: '500+', label: 'Properties Sold', icon: <Home className="w-6 h-6" /> },
    { value: '1,200+', label: 'Happy Clients', icon: <Heart className="w-6 h-6" /> },
    { value: '50+', label: 'Expert Agents', icon: <Users className="w-6 h-6" /> },
  ]

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'We believe in honest dealings and transparent transactions. Every property is verified and every document is authenticated.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from customer service to property presentation and legal documentation.'
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: 'Client First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure you find the perfect property.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results Driven',
      description: 'We focus on delivering results - helping you buy, sell, or rent properties efficiently and profitably.'
    },
  ]

  const team = [
    {
      name: 'Chief Adewale Solid Build',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'Over 15 years of experience in Nigerian real estate market.'
    },
    {
      name: 'Mrs. Ngozi Okonkwo',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Expert in luxury property sales across Lagos and Abuja.'
    },
    {
      name: 'Mr. Emeka Johnson',
      role: 'Legal Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Ensures all transactions are legally sound and documented.'
    },
    {
      name: 'Mrs. Aisha Mohammed',
      role: 'Client Relations Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Dedicated to providing exceptional customer service.'
    },
  ]

  const milestones = [
    { year: '2014', event: 'Solid Build Construction Limited founded in Lagos' },
    { year: '2016', event: 'Expanded to Abuja and Port Harcourt' },
    { year: '2018', event: 'Launched digital property platform' },
    { year: '2020', event: 'Celebrated 500th successful transaction' },
    { year: '2022', event: 'Introduced C of O verification service' },
    { year: '2024', event: 'Launched premium investment analytics tools' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="Lagos Skyline"
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
            <span className="badge-premium mb-6 inline-block">About Us</span>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Nigeria's Premier{' '}
              <span className="text-gradient-gold">Property Partner</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              For over a decade, Solid Build Construction Limited has been helping Nigerians find their dream homes,
              make smart investments, and build wealth through real estate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-beach rounded-full mb-4 text-premium-black">
                  {stat.icon}
                </div>
                <div className="text-4xl font-playfair font-bold text-brand-water mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-4xl font-playfair font-bold mt-3 mb-6">
                Building Dreams Since 2014
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Solid Build Construction Limited Limited was founded with a simple mission: to make property
                  ownership accessible, transparent, and stress-free for every Nigerian.
                </p>
                <p>
                  Starting from a small office on Ogudu Road, Lagos, we have grown to become
                  one of Nigeria's most trusted real estate companies, with presence in Lagos,
                  Abuja, and Port Harcourt.
                </p>
                <p>
                  Our commitment to transparency, particularly in document verification and
                  legal compliance, has earned us the trust of thousands of clients - from
                  first-time homebuyers to seasoned investors.
                </p>
                <p>
                  Today, we continue to innovate with our advanced digital platform, offering
                  features like C of O verification, investment analytics, and payment plan
                  calculators that no other Nigerian property platform provides.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                alt="Luxury Property in Lagos"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-gradient-beach p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-playfair font-bold text-premium-black">10+</div>
                <div className="text-premium-charcoal font-medium">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-dark text-white">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-10"
            >
              <div className="w-16 h-16 bg-gradient-beach rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-premium-black" />
              </div>
              <h3 className="text-3xl font-playfair font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To democratize access to quality real estate in Nigeria by providing transparent,
                verified, and affordable property solutions. We aim to be the bridge between
                property dreams and reality for every Nigerian, whether at home or in the diaspora.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-dark rounded-2xl p-10"
            >
              <div className="w-16 h-16 bg-gradient-beach rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-premium-black" />
              </div>
              <h3 className="text-3xl font-playfair font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become Africa's most trusted and innovative real estate platform, known for
                integrity, technology-driven solutions, and exceptional customer service. We
                envision a Nigeria where property ownership is secure, transparent, and accessible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
              Our Core Values
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-8 text-center hover:shadow-gold transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-beach rounded-full mb-6 text-premium-black">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3">
              Milestones
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8 mb-8"
              >
                <div className="w-24 text-right">
                  <span className="text-2xl font-playfair font-bold text-brand-water">
                    {milestone.year}
                  </span>
                </div>
                <div className="w-4 h-4 bg-gradient-beach rounded-full flex-shrink-0" />
                <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-lg text-gray-700">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3 mb-4">
              Meet the Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to helping you find your perfect property
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-brand-water font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-dark text-white">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-montserrat font-bold text-brand-water uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-playfair font-bold mt-3">
              The Solid Build Advantage
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <CheckCircle />, title: 'Verified Properties', text: 'Every property is personally inspected and verified' },
              { icon: <Shield />, title: 'Legal Assurance', text: 'Complete documentation and C of O verification' },
              { icon: <Star />, title: 'Premium Listings', text: 'Access to exclusive luxury properties' },
              { icon: <TrendingUp />, title: 'Investment Guidance', text: 'Expert advice on property investments' },
              { icon: <Users />, title: 'Dedicated Support', text: '24/7 customer service and agent assistance' },
              { icon: <Building />, title: 'Wide Network', text: 'Presence in Lagos, Abuja, and Port Harcourt' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gradient-beach rounded-lg flex items-center justify-center flex-shrink-0 text-premium-black">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-beach">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-playfair font-bold text-premium-black mb-6">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-premium-charcoal mb-8 max-w-2xl mx-auto">
              Let our expert team help you navigate the Nigerian real estate market.
              Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="luxury" size="lg" onClick={() => navigate('/properties')}>
                Browse Properties
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white border-premium-black text-premium-black hover:bg-premium-black hover:text-white"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-premium-black" />
                <span className="text-premium-black font-semibold">+234 911 525 8580</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-premium-black" />
                <span className="text-premium-black font-semibold">Solid Buildproperty@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-premium-black" />
                <span className="text-premium-black font-semibold">149 Ogudu Road, Lagos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
