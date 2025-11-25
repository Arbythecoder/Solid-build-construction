const { z } = require('zod');

// User registration schema
const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z.string()
    .email('Please provide a valid email address')
    .toLowerCase(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password cannot exceed 50 characters'),
  role: z.enum(['admin', 'landlord', 'tenant', 'investor', 'agent']).optional().default('tenant'),
  phone: z.string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, 'Please provide a valid Nigerian phone number')
    .optional()
});

// Login schema
const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(1, 'Password is required')
});

// Property schema
const propertySchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description cannot exceed 2000 characters'),
  type: z.enum(['apartment', 'house', 'land', 'commercial', 'luxury']),
  price: z.number()
    .positive('Price must be a positive number')
    .max(10000000000, 'Price cannot exceed 10 billion'),
  location: z.object({
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    coordinates: z.object({
      lat: z.number().min(-90).max(90).optional(),
      lng: z.number().min(-180).max(180).optional()
    }).optional()
  }),
  features: z.object({
    bedrooms: z.number().int().min(0).max(20).optional(),
    bathrooms: z.number().int().min(0).max(20).optional(),
    parkingSpaces: z.number().int().min(0).max(20).optional(),
    furnished: z.boolean().optional(),
    size: z.number().positive().optional()
  }).optional()
});

// Inquiry schema
const inquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, 'Please provide a valid Nigerian phone number')
    .optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
  propertyId: z.string().optional()
});

// Password reset schema
const passwordResetSchema = z.object({
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password cannot exceed 50 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

// Profile update schema
const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  phone: z.string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, 'Please provide a valid Nigerian phone number')
    .optional(),
  address: z.string().max(200).optional()
});

// Validation middleware
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    next(error);
  }
};

// Nigerian states for validation
const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

module.exports = {
  registerSchema,
  loginSchema,
  propertySchema,
  inquirySchema,
  passwordResetSchema,
  profileUpdateSchema,
  validate,
  nigerianStates
};
