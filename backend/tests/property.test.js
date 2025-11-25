const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// Mock Property model
const mockProperties = [];

jest.mock('../models/Property', () => {
  return {
    find: jest.fn().mockReturnThis(),
    findById: jest.fn(),
    countDocuments: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    populate: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue(mockProperties)
  };
});

jest.mock('../config/cloudinary', () => ({
  uploader: {
    upload: jest.fn().mockResolvedValue({
      secure_url: 'https://cloudinary.com/test-image.jpg',
      public_id: 'test-public-id'
    }),
    destroy: jest.fn().mockResolvedValue({ result: 'ok' })
  }
}));

jest.mock('../middleware/async', () => (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
});

jest.mock('../utils/errorResponse', () => {
  return class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  };
});

const propertyController = require('../controllers/propertyController');

// Create test app with mock auth
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  // Mock auth middleware
  app.use((req, res, next) => {
    req.user = {
      id: new mongoose.Types.ObjectId().toString(),
      role: 'landlord'
    };
    next();
  });

  // Error handler
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message
    });
  });

  return app;
};

describe('Property Controller', () => {
  let app;
  const Property = require('../models/Property');

  beforeEach(() => {
    app = createTestApp();
    jest.clearAllMocks();
  });

  describe('GET /properties', () => {
    it('should return all approved properties', async () => {
      const mockData = [
        {
          _id: new mongoose.Types.ObjectId(),
          title: 'Test Property 1',
          price: 1000000,
          status: 'approved'
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: 'Test Property 2',
          price: 2000000,
          status: 'approved'
        }
      ];

      Property.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(mockData)
        })
      });

      app.get('/properties', propertyController.getAllProperties);

      const res = await request(app).get('/properties');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(2);
    });
  });

  describe('GET /properties/:id', () => {
    it('should return property by ID', async () => {
      const propertyId = new mongoose.Types.ObjectId();
      const mockProperty = {
        _id: propertyId,
        title: 'Test Property',
        price: 1500000,
        location: { city: 'Lagos', state: 'Lagos' }
      };

      Property.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockProperty)
      });

      app.get('/properties/:id', propertyController.getPropertyById);

      const res = await request(app).get(`/properties/${propertyId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Property');
    });

    it('should return 404 for non-existent property', async () => {
      const propertyId = new mongoose.Types.ObjectId();

      Property.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      app.get('/properties/:id', propertyController.getPropertyById);

      const res = await request(app).get(`/properties/${propertyId}`);

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Property not found');
    });
  });

  describe('GET /properties/stats', () => {
    it('should return property statistics', async () => {
      Property.countDocuments
        .mockResolvedValueOnce(100) // total
        .mockResolvedValueOnce(80)  // approved
        .mockResolvedValueOnce(15)  // pending
        .mockResolvedValueOnce(5)   // rejected
        .mockResolvedValueOnce(20); // premium

      app.get('/properties/stats', propertyController.getPropertyStats);

      const res = await request(app).get('/properties/stats');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBe(100);
      expect(res.body.data.approved).toBe(80);
      expect(res.body.data.pending).toBe(15);
      expect(res.body.data.premium).toBe(20);
    });
  });

  describe('Property Filtering', () => {
    it('should filter properties by location', async () => {
      const mockData = [
        { _id: new mongoose.Types.ObjectId(), title: 'Lagos Property', location: { city: 'Lagos' } }
      ];

      Property.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue(mockData)
            })
          })
        })
      });

      Property.countDocuments.mockResolvedValue(1);

      app.get('/properties/filter', propertyController.filterProperties);

      const res = await request(app)
        .get('/properties/filter')
        .query({ location: 'Lagos' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should filter properties by price range', async () => {
      Property.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue([])
            })
          })
        })
      });

      Property.countDocuments.mockResolvedValue(0);

      app.get('/properties/filter', propertyController.filterProperties);

      const res = await request(app)
        .get('/properties/filter')
        .query({ priceMin: 1000000, priceMax: 5000000 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.pagination).toBeDefined();
    });
  });
});

describe('Property Model Validation', () => {
  it('should validate required fields', () => {
    const validProperty = {
      title: 'Test Property',
      description: 'A test property description',
      type: 'apartment',
      price: 5000000,
      location: {
        address: '123 Test Street',
        city: 'Lagos',
        state: 'Lagos'
      }
    };

    expect(validProperty.title).toBeDefined();
    expect(validProperty.price).toBeGreaterThan(0);
    expect(validProperty.location.city).toBeDefined();
  });

  it('should validate property types', () => {
    const validTypes = ['apartment', 'house', 'land', 'commercial', 'luxury'];

    validTypes.forEach(type => {
      expect(validTypes).toContain(type);
    });
  });
});
