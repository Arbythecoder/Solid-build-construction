import axios from 'axios'

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Create axios instance with defaults
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ==================== AUTHENTICATION ====================

export const authAPI = {
  // Register new user
  register: async (userData: {
    name: string
    email: string
    password: string
    phone: string
    role: 'landlord' | 'tenant' | 'investor' | 'agent'
    [key: string]: any
  }) => {
    const response = await api.post('/auth/register', userData)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Login user
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}

// ==================== PROPERTIES ====================

export const propertyAPI = {
  // Get all properties
  getAll: async (filters?: {
    location?: string
    priceMin?: number
    priceMax?: number
    type?: string
    status?: string
  }) => {
    const response = await api.get('/properties', { params: filters })
    return response.data
  },

  // Get property by ID
  getById: async (id: string) => {
    const response = await api.get(`/properties/${id}`)
    return response.data
  },

  // Create property
  create: async (propertyData: FormData) => {
    const response = await api.post('/properties', propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Update property
  update: async (id: string, propertyData: any) => {
    const response = await api.put(`/properties/${id}`, propertyData)
    return response.data
  },

  // Delete property
  delete: async (id: string) => {
    const response = await api.delete(`/properties/${id}`)
    return response.data
  },

  // Upload property images
  uploadImages: async (id: string, images: FormData) => {
    const response = await api.post(`/properties/${id}/images`, images, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get property stats (admin)
  getStats: async () => {
    const response = await api.get('/properties/stats/overview')
    return response.data
  },

  // Advanced filter
  filter: async (filters: any) => {
    const response = await api.get('/properties/search/advanced', { params: filters })
    return response.data
  },
}

// ==================== LANDLORD ====================

export const landlordAPI = {
  // Get landlord properties
  getMyProperties: async () => {
    const response = await api.get('/landlords/properties')
    return response.data
  },

  // Get landlord dashboard stats
  getStats: async () => {
    const response = await api.get('/landlords/stats')
    return response.data
  },

  // Get maintenance requests
  getMaintenanceRequests: async () => {
    const response = await api.get('/landlords/maintenance')
    return response.data
  },

  // Update maintenance request
  updateMaintenanceRequest: async (id: string, status: string) => {
    const response = await api.put(`/landlords/maintenance/${id}`, { status })
    return response.data
  },
}

// ==================== TENANT ====================

export const tenantAPI = {
  // Get tenant dashboard
  getDashboard: async () => {
    const response = await api.get('/tenants/dashboard')
    return response.data
  },

  // Get current lease
  getCurrentLease: async () => {
    const response = await api.get('/tenants/lease')
    return response.data
  },

  // Get payment history
  getPaymentHistory: async () => {
    const response = await api.get('/tenants/payments')
    return response.data
  },

  // Submit maintenance request
  submitMaintenanceRequest: async (data: {
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
  }) => {
    const response = await api.post('/tenants/maintenance', data)
    return response.data
  },

  // Get maintenance requests
  getMaintenanceRequests: async () => {
    const response = await api.get('/tenants/maintenance')
    return response.data
  },
}

// ==================== AGENT ====================

export const agentAPI = {
  // Apply as agent
  apply: async (agentData: any) => {
    const response = await api.post('/agents/apply', agentData)
    return response.data
  },

  // Get agent dashboard
  getDashboard: async () => {
    const response = await api.get('/agents/dashboard')
    return response.data
  },

  // Get agent properties
  getAssignedProperties: async () => {
    const response = await api.get('/agents/properties')
    return response.data
  },

  // Get agent stats
  getStats: async () => {
    const response = await api.get('/agents/stats')
    return response.data
  },

  // Get all agent applications (admin)
  getAllApplications: async () => {
    const response = await api.get('/agents/applications')
    return response.data
  },

  // Approve agent application (admin)
  approveApplication: async (id: string) => {
    const response = await api.put(`/agents/${id}/approve`)
    return response.data
  },

  // Reject agent application (admin)
  rejectApplication: async (id: string, reason: string) => {
    const response = await api.put(`/agents/${id}/reject`, { reason })
    return response.data
  },
}

// ==================== ADMIN ====================

export const adminAPI = {
  // Get pending properties
  getPendingProperties: async () => {
    const response = await api.get('/properties?status=pending')
    return response.data
  },

  // Approve property
  approveProperty: async (id: string) => {
    const response = await api.put(`/properties/${id}`, { status: 'approved' })
    return response.data
  },

  // Reject property
  rejectProperty: async (id: string, reason: string) => {
    const response = await api.put(`/properties/${id}`, {
      status: 'rejected',
      rejectionReason: reason,
    })
    return response.data
  },

  // Get all users
  getUsers: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },

  // Get dashboard stats
  getStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data
  },
}

// ==================== PAYMENTS ====================

export const paymentAPI = {
  // Initialize payment
  initializePayment: async (data: {
    amount: number
    email: string
    reference: string
    metadata?: any
  }) => {
    const response = await api.post('/payments/initialize', data)
    return response.data
  },

  // Verify payment
  verifyPayment: async (reference: string) => {
    const response = await api.get(`/payments/verify/${reference}`)
    return response.data
  },

  // Get payment history
  getPaymentHistory: async () => {
    const response = await api.get('/payments/history')
    return response.data
  },
}

// ==================== INQUIRIES ====================

export const inquiryAPI = {
  // Create inquiry (contact form)
  create: async (data: { name: string; email: string; message: string; property?: string }) => {
    const response = await api.post('/inquiries', data)
    return response.data
  },

  // Get all inquiries (admin)
  getAll: async () => {
    const response = await api.get('/inquiries')
    return response.data
  },

  // Get inquiry by ID (admin)
  getById: async (id: string) => {
    const response = await api.get(`/inquiries/${id}`)
    return response.data
  },

  // Delete inquiry (admin)
  delete: async (id: string) => {
    const response = await api.delete(`/inquiries/${id}`)
    return response.data
  },
}

// ==================== INVESTOR ====================

export const investorAPI = {
  // Get investor dashboard
  getDashboard: async () => {
    const response = await api.get('/investors/dashboard')
    return response.data
  },

  // Get investments
  getInvestments: async () => {
    const response = await api.get('/investors/investments')
    return response.data
  },

  // Create investment
  createInvestment: async (data: {
    propertyId: string
    amount: number
  }) => {
    const response = await api.post('/investors/investments', data)
    return response.data
  },

  // Get investment opportunities
  getOpportunities: async () => {
    const response = await api.get('/investors/opportunities')
    return response.data
  },
}

export default api
