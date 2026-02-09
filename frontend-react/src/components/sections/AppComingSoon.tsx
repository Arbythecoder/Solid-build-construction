import { motion } from 'framer-motion'
import { Smartphone, Apple, PlayCircle, Bell, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../ui/Button'

const AppComingSoon = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    // Here you would send to backend
    console.log('Notify email:', email)
    toast.success('You\'ll be notified when the app launches!')
    setSubscribed(true)
    setEmail('')
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-premium-black via-gray-900 to-premium-black">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-luxury-gold rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full px-4 py-2 mb-6"
            >
              <Smartphone className="w-4 h-4 text-luxury-gold" />
              <span className="text-luxury-gold text-sm font-semibold">COMING SOON</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Solid Build Construction Limited
              </span>
              <br />
              Mobile App
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Take your property search on the go! Our mobile app brings you the same premium
              experience with faster access, push notifications, and exclusive mobile-only features.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                'Browse properties anywhere, anytime',
                'Instant notifications for new listings',
                'Save favorites and get price alerts',
                'Virtual property tours in AR',
                'Direct chat with agents',
                'Offline property viewing'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* App Store Badges (Coming Soon) */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                <Apple className="w-8 h-8 text-white" />
                <div>
                  <p className="text-xs text-gray-400">Available on</p>
                  <p className="text-white font-semibold">App Store</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                <PlayCircle className="w-8 h-8 text-white" />
                <div>
                  <p className="text-xs text-gray-400">Get it on</p>
                  <p className="text-white font-semibold">Google Play</p>
                </div>
              </div>
            </div>

            {/* Email Notification Form */}
            {!subscribed ? (
              <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-luxury-gold transition-colors"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-gold text-premium-black hover:opacity-90 whitespace-nowrap"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  Notify Me
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <p className="text-green-400 font-medium">
                    You're on the list! We'll notify you when the app launches.
                  </p>
                </div>
              </motion.div>
            )}

            <p className="text-sm text-gray-400 mt-4">
              🎉 <strong className="text-luxury-gold">Launching Q2 2025</strong> • iOS & Android
            </p>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Floating Phone Mockup */}
            <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-gold rounded-[3rem] blur-3xl opacity-20 animate-pulse"></div>

              {/* Phone Frame */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>

                {/* Screen */}
                <div className="relative bg-gradient-to-br from-premium-black to-gray-900 rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* App Interface Preview */}
                  <div className="h-full flex flex-col">
                    {/* Status Bar */}
                    <div className="px-8 pt-12 pb-4">
                      <div className="flex items-center justify-between text-white text-xs">
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-3 bg-white rounded-full"></div>
                          <div className="w-1 h-3 bg-white rounded-full opacity-75"></div>
                          <div className="w-1 h-3 bg-white rounded-full opacity-50"></div>
                          <div className="w-1 h-3 bg-white rounded-full opacity-25"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 px-6">
                      <h3 className="text-white font-bold text-2xl mb-4">Find Your Dream Home</h3>

                      {/* Search Bar */}
                      <div className="bg-white/10 rounded-2xl px-4 py-3 mb-6 backdrop-blur-sm">
                        <p className="text-white/60 text-sm">Search location...</p>
                      </div>

                      {/* Property Cards */}
                      <div className="space-y-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="bg-gradient-gold/10 backdrop-blur-sm rounded-2xl p-4 border border-luxury-gold/20">
                            <div className="flex gap-3">
                              <div className="w-20 h-20 bg-luxury-gold/20 rounded-xl"></div>
                              <div className="flex-1">
                                <div className="h-3 bg-white/20 rounded w-3/4 mb-2"></div>
                                <div className="h-2 bg-white/10 rounded w-1/2"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="px-8 py-6 bg-black/50 backdrop-blur-lg">
                      <div className="flex justify-around">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 bg-luxury-gold/20 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-20 bg-gradient-gold rounded-2xl p-4 shadow-2xl"
              >
                <Bell className="w-6 h-6 text-premium-black" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 bottom-32 bg-white rounded-2xl p-4 shadow-2xl"
              >
                <Smartphone className="w-6 h-6 text-luxury-gold" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}

export default AppComingSoon
