import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Building2, Home, TrendingUp, Users, ArrowRight } from 'lucide-react'

const RoleSelector = () => {
  const navigate = useNavigate()

  const roles = [
    {
      id: 'landlord',
      title: 'Landlord',
      description: 'List and manage your properties',
      icon: <Building2 className="w-12 h-12" />,
      color: 'from-luxury-gold to-premium-orange',
      features: ['List unlimited properties', 'Manage tenants', 'Track payments', 'View analytics'],
      route: '/signup/landlord',
    },
    {
      id: 'tenant',
      title: 'Tenant',
      description: 'Find your perfect home',
      icon: <Home className="w-12 h-12" />,
      color: 'from-blue-500 to-blue-700',
      features: ['Browse properties', 'Pay rent online', 'Submit maintenance requests', 'Track lease'],
      route: '/signup/tenant',
    },
    {
      id: 'investor',
      title: 'Investor',
      description: 'Invest in premium properties',
      icon: <TrendingUp className="w-12 h-12" />,
      color: 'from-green-500 to-emerald-700',
      features: ['Track investments', 'View growth analytics', 'Portfolio management', 'Investment opportunities'],
      route: '/signup/investor',
    },
    {
      id: 'agent',
      title: 'Agent / Partner',
      description: 'Join our network of professionals',
      icon: <Users className="w-12 h-12" />,
      color: 'from-purple-500 to-indigo-700',
      features: ['Partnership program', 'Training & certification', 'Earn commissions', 'Exclusive leads'],
      route: '/signup/agent',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center py-16 px-4">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
            Join <span className="text-gradient-gold">Solid Build Construction Limited</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your account type to get started
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="glass-dark rounded-3xl p-8 h-full flex flex-col hover:bg-white/10 transition-all cursor-pointer"
                   onClick={() => navigate(role.route)}>
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {role.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-playfair font-bold text-white mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {role.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8 flex-grow">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors group-hover:bg-luxury-gold group-hover:text-premium-black">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Already have account */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-luxury-gold hover:underline font-semibold"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default RoleSelector
