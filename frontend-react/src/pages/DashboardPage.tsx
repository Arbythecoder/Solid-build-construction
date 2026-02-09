import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Redirect based on user role
    switch (user?.role?.toLowerCase()) {
      case 'admin':
        navigate('/admin/dashboard')
        break
      case 'landlord':
        navigate('/landlord/dashboard')
        break
      case 'tenant':
        navigate('/tenant/dashboard')
        break
      case 'investor':
        navigate('/investor/dashboard')
        break
      case 'agent':
        navigate('/agent/dashboard')
        break
      default:
        // Stay on generic dashboard for unknown roles
        break
    }
  }, [user, isAuthenticated, navigate])

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-brand-water mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading your dashboard...</p>
      </div>
    </div>
  )
}

export default DashboardPage
