const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Solid Build Construction Limited API',
      version: '1.0.0',
      description: 'A comprehensive real estate property management API for Nigeria',
      contact: {
        name: 'Solid Build Construction Limited',
        email: 'support@solidbuild.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.solidbuild.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: {
              type: 'string',
              enum: ['admin', 'landlord', 'tenant', 'investor', 'agent'],
              example: 'tenant'
            },
            verified: { type: 'boolean', example: false },
            phone: { type: 'string', example: '+234 801 234 5678' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Property: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string', example: 'Luxury 3 Bedroom Apartment' },
            description: { type: 'string', example: 'Beautiful apartment in Lekki Phase 1' },
            type: {
              type: 'string',
              enum: ['apartment', 'house', 'land', 'commercial', 'luxury'],
              example: 'apartment'
            },
            price: { type: 'number', example: 50000000 },
            status: {
              type: 'string',
              enum: ['available', 'rented', 'sold', 'pending', 'approved', 'rejected'],
              example: 'available'
            },
            location: {
              type: 'object',
              properties: {
                address: { type: 'string', example: '123 Admiralty Way' },
                city: { type: 'string', example: 'Lagos' },
                state: { type: 'string', example: 'Lagos' }
              }
            },
            features: {
              type: 'object',
              properties: {
                bedrooms: { type: 'integer', example: 3 },
                bathrooms: { type: 'integer', example: 2 },
                parkingSpaces: { type: 'integer', example: 2 },
                furnished: { type: 'boolean', example: true }
              }
            },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: { type: 'string' },
                  public_id: { type: 'string' }
                }
              }
            },
            isPremium: { type: 'boolean', example: false },
            views: { type: 'integer', example: 150 }
          }
        },
        Inquiry: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Jane Smith' },
            email: { type: 'string', example: 'jane@example.com' },
            message: { type: 'string', example: 'I am interested in this property' },
            property: { type: 'string', description: 'Property ID' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            recipient: { type: 'string' },
            type: {
              type: 'string',
              enum: ['inquiry_received', 'property_approved', 'property_rejected', 'new_message', 'payment_received']
            },
            title: { type: 'string' },
            message: { type: 'string' },
            read: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Error message' }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' }
          }
        }
      }
    },
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints' },
      { name: 'Properties', description: 'Property management endpoints' },
      { name: 'Inquiries', description: 'Property inquiry endpoints' },
      { name: 'Notifications', description: 'User notification endpoints' },
      { name: 'Landlords', description: 'Landlord-specific endpoints' },
      { name: 'Agents', description: 'Agent management endpoints' },
      { name: 'Analytics', description: 'Analytics and statistics endpoints' }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
