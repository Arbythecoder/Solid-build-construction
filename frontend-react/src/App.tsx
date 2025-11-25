import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Context
import { AuthProvider } from './context/AuthContext'

// Pages
import HomePage from './pages/HomePage'
import PropertyListPage from './pages/PropertyListPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'

// Auth Pages
import RoleSelector from './pages/auth/RoleSelector'
import LandlordSignup from './pages/auth/LandlordSignup'
import TenantSignup from './pages/auth/TenantSignup'
import InvestorSignup from './pages/auth/InvestorSignup'
import AgentSignup from './pages/auth/AgentSignup'

// Dashboard Pages
import DashboardPage from './pages/DashboardPage'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import LandlordDashboard from './pages/dashboards/LandlordDashboard'
import TenantDashboard from './pages/dashboards/TenantDashboard'
import InvestorDashboard from './pages/dashboards/InvestorDashboard'
import AgentDashboard from './pages/dashboards/AgentDashboard'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Protected Route
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertyListPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Signup Routes */}
              <Route path="/signup" element={<RoleSelector />} />
              <Route path="/signup/landlord" element={<LandlordSignup />} />
              <Route path="/signup/tenant" element={<TenantSignup />} />
              <Route path="/signup/investor" element={<InvestorSignup />} />
              <Route path="/signup/agent" element={<AgentSignup />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Role-Specific Dashboards */}
              <Route
                path="/landlord/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['landlord', 'admin']}>
                    <LandlordDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tenant/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['tenant', 'admin']}>
                    <TenantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/investor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['investor', 'admin']}>
                    <InvestorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agent/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['agent', 'admin']}>
                    <AgentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFA500 100%)',
                color: '#0A0A0A',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
              },
              success: {
                iconTheme: {
                  primary: '#0A0A0A',
                  secondary: '#D4AF37',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
