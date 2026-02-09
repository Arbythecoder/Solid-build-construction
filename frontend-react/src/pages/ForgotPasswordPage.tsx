import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/ui/Button'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call - in production this would call a real endpoint
    setTimeout(() => {
      setSent(true)
      toast.success('If an account exists with that email, you will receive a reset link.')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-gold mb-6">
            <Mail className="w-10 h-10 text-premium-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            {sent ? 'Check Your Email' : 'Forgot Password?'}
          </h1>
          <p className="text-xl text-gray-300">
            {sent
              ? 'We sent you a password reset link'
              : "Enter your email and we'll send you a reset link"}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-3xl p-8 md:p-12"
        >
          {sent ? (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-green-400" />
              </div>
              <p className="text-gray-300 mb-8">
                If an account exists for <span className="text-luxury-gold">{email}</span>,
                you will receive an email with instructions on how to reset your password.
              </p>
              <Link to="/login">
                <Button variant="gold" className="w-full">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-premium-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Reset Link
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-luxury-gold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm">
            Need help?{' '}
            <Link to="/contact" className="text-luxury-gold hover:underline">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
