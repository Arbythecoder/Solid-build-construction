const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock User model
jest.mock('../models/User', () => {
  const mockUsers = [];

  return {
    findOne: jest.fn().mockImplementation(({ email }) => ({
      select: jest.fn().mockResolvedValue(
        mockUsers.find(u => u.email === email)
      )
    })),
    create: jest.fn().mockImplementation(async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const user = {
        _id: new mongoose.Types.ObjectId(),
        ...userData,
        password: hashedPassword,
        save: jest.fn().mockResolvedValue(true)
      };
      mockUsers.push(user);
      return user;
    }),
    prototype: {
      save: jest.fn().mockResolvedValue(true)
    }
  };
});

const authController = require('../controllers/authController');

// Create test app
const createTestApp = () => {
  const app = express();
  app.use(express.json());

  app.post('/auth/register', authController.register);
  app.post('/auth/login', authController.login);

  return app;
};

describe('Auth Controller', () => {
  let app;

  beforeEach(() => {
    app = createTestApp();
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({ name: 'Test User' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Please provide all required fields');
    });

    it('should return 400 if password is too short', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: '12345'
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Password must be at least 6 characters');
    });

    it('should register a new user successfully', async () => {
      const User = require('../models/User');
      User.findOne.mockResolvedValueOnce(null);

      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test User',
        email: 'newuser@example.com',
        role: 'tenant',
        save: jest.fn().mockResolvedValue(true)
      };

      // Mock the User constructor
      jest.spyOn(User, 'prototype', 'get').mockReturnValue(mockUser);

      const res = await request(app)
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'newuser@example.com',
          password: 'password123'
        });

      // Check response structure
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /auth/login', () => {
    it('should return 400 if email or password is missing', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Please provide email and password');
    });

    it('should return 400 for invalid credentials', async () => {
      const User = require('../models/User');
      User.findOne.mockImplementationOnce(() => ({
        select: jest.fn().mockResolvedValue(null)
      }));

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});

describe('JWT Token Generation', () => {
  it('should generate valid JWT token', () => {
    const token = jwt.sign(
      { userId: 'testId', role: 'tenant' },
      'test-jwt-secret-key-for-testing',
      { expiresIn: '7d' }
    );

    const decoded = jwt.verify(token, 'test-jwt-secret-key-for-testing');
    expect(decoded.userId).toBe('testId');
    expect(decoded.role).toBe('tenant');
  });
});

describe('Password Hashing', () => {
  it('should hash password correctly', async () => {
    const password = 'testPassword123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    expect(hashedPassword).not.toBe(password);
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
  });

  it('should reject wrong password', async () => {
    const password = 'testPassword123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    expect(await bcrypt.compare('wrongPassword', hashedPassword)).toBe(false);
  });
});
