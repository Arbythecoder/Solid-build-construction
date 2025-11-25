import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'

export type UserRole = 'admin' | 'landlord' | 'tenant' | 'investor' | 'agent'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  token?: string
  investorToken?: string // For investors only
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: any, role: UserRole) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Call the real backend API
      const data = await authAPI.login(email, password)

      const userData: User = {
        id: data.user._id || data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        avatar: data.user.avatar,
        token: data.token,
        investorToken: data.user.investorToken,
      }

      setUser(userData)

      toast.success(`Welcome back, ${userData.name}!`)

      // Redirect based on role
      switch (userData.role) {
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
          navigate('/dashboard')
      }
    } catch (error: any) {
      // Better error handling for network errors
      let errorMessage = 'Login failed'

      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: any, role: UserRole) => {
    try {
      setLoading(true)

      // Call the real backend API
      await authAPI.register({ ...userData, role })

      toast.success('Account created successfully! Please login.')
      navigate('/login')
    } catch (error: any) {
      // Better error handling for network errors
      let errorMessage = 'Signup failed'

      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authAPI.logout()
    setUser(null)
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
