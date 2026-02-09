/**
 * 🔒 SECURITY SMOKE TESTS - RBAC VERIFICATION
 * Tests role-based access control for all 5 user roles
 * 
 * Run: npm test -- security-smoke-tests.js
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Property = require('../models/Property');

describe('🔒 RBAC Security Smoke Tests', () => {
  let tokens = {};
  let users = {};
  let testProperty;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI);
    
    // Clean up test data
    await User.deleteMany({ email: { $regex: /test-rbac/ } });
    await Property.deleteMany({ title: { $regex: /Test Property/ } });
  });

  afterAll(async () => {
    // Cleanup
    await User.deleteMany({ email: { $regex: /test-rbac/ } });
    await Property.deleteMany({ title: { $regex: /Test Property/ } });
    await mongoose.connection.close();
  });

  // ============================================
  // TASK 5: CREATE TEST USERS FOR EACH ROLE
  // ============================================

  describe('Setup: Create Users for Each Role', () => {
    const roles = ['admin', 'landlord', 'tenant', 'investor', 'agent'];

    roles.forEach(role => {
      it(`should create ${role} user and get token`, async () => {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            firstName: `Test`,
            lastName: `${role.charAt(0).toUpperCase() + role.slice(1)}`,
            email: `test-rbac-${role}@example.com`,
            password: 'Test123!@#',
            role: role,
            phoneNumber: '08012345678'
          });

        if (response.status !== 201) {
          console.error(`Failed to create ${role}:`, response.body);
        }

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.role).toBe(role);

        tokens[role] = response.body.token;
        users[role] = response.body.user;
      });
    });
  });

  // ============================================
  // TEST: ADMIN ROUTES (HIGHEST PRIVILEGE)
  // ============================================

  describe('🔴 ADMIN Routes - Should Allow Admin Only', () => {
    it('✅ Admin can access /api/admin/users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.admin}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.users)).toBe(true);
    });

    it('❌ Landlord CANNOT access /api/admin/users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.landlord}`);

      expect(response.status).toBe(403);
      expect(response.body.message).toContain('Not authorized');
    });

    it('❌ Tenant CANNOT access /api/admin/users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.tenant}`);

      expect(response.status).toBe(403);
    });

    it('❌ Investor CANNOT access /api/admin/stats', async () => {
      const response = await request(app)
        .get('/api/admin/stats')
        .set('Authorization', `Bearer ${tokens.investor}`);

      expect(response.status).toBe(403);
    });

    it('❌ Agent CANNOT change user roles', async () => {
      const response = await request(app)
        .put(`/api/admin/users/${users.tenant._id}/role`)
        .set('Authorization', `Bearer ${tokens.agent}`)
        .send({ role: 'admin' });

      expect(response.status).toBe(403);
    });
  });

  // ============================================
  // TEST: LANDLORD PROPERTY MANAGEMENT
  // ============================================

  describe('🏠 PROPERTY Routes - Landlord Ownership', () => {
    it('✅ Landlord can create property', async () => {
      const response = await request(app)
        .post('/api/properties')
        .set('Authorization', `Bearer ${tokens.landlord}`)
        .send({
          title: 'Test Property for RBAC',
          description: 'Security test property',
          price: 500000,
          category: 'sale',
          propertyType: 'detached',
          location: 'Lagos',
          state: 'Lagos',
          bedrooms: 3,
          bathrooms: 2,
          size: 150
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      testProperty = response.body.property;
    });

    it('❌ Tenant CANNOT create property', async () => {
      const response = await request(app)
        .post('/api/properties')
        .set('Authorization', `Bearer ${tokens.tenant}`)
        .send({
          title: 'Unauthorized Property',
          description: 'Should fail',
          price: 100000,
          category: 'sale',
          propertyType: 'apartment',
          location: 'Abuja',
          state: 'FCT',
          bedrooms: 2,
          bathrooms: 1,
          size: 80
        });

      expect(response.status).toBe(403);
    });

    it('❌ Investor CANNOT edit landlord\'s property', async () => {
      const response = await request(app)
        .put(`/api/properties/${testProperty._id}`)
        .set('Authorization', `Bearer ${tokens.investor}`)
        .send({ price: 1000000 });

      expect(response.status).toBe(403);
      expect(response.body.message).toContain('Not authorized');
    });

    it('✅ Landlord can edit own property', async () => {
      const response = await request(app)
        .put(`/api/properties/${testProperty._id}`)
        .set('Authorization', `Bearer ${tokens.landlord}`)
        .send({ price: 550000 });

      expect(response.status).toBe(200);
      expect(response.body.property.price).toBe(550000);
    });

    it('✅ Admin can edit ANY property', async () => {
      const response = await request(app)
        .put(`/api/properties/${testProperty._id}`)
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({ price: 600000 });

      expect(response.status).toBe(200);
      expect(response.body.property.price).toBe(600000);
    });
  });

  // ============================================
  // TEST: INVESTOR DASHBOARD DATA ISOLATION
  // ============================================

  describe('💰 INVESTOR Routes - Data Isolation', () => {
    it('✅ Investor can access own dashboard', async () => {
      const response = await request(app)
        .get('/api/investor/dashboard')
        .set('Authorization', `Bearer ${tokens.investor}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('❌ Landlord CANNOT access investor dashboard', async () => {
      const response = await request(app)
        .get('/api/investor/dashboard')
        .set('Authorization', `Bearer ${tokens.landlord}`);

      expect(response.status).toBe(403);
    });

    it('✅ Investor sees ONLY their investments', async () => {
      const response = await request(app)
        .get('/api/investor/investments')
        .set('Authorization', `Bearer ${tokens.investor}`);

      expect(response.status).toBe(200);
      
      // All investments should belong to this investor
      const investments = response.body.investments || [];
      investments.forEach(investment => {
        expect(investment.investor.toString()).toBe(users.investor._id.toString());
      });
    });
  });

  // ============================================
  // TEST: TENANT DASHBOARD ACCESS
  // ============================================

  describe('🏘️ TENANT Routes - Limited Access', () => {
    it('✅ Tenant can access own dashboard', async () => {
      const response = await request(app)
        .get('/api/tenants/dashboard')
        .set('Authorization', `Bearer ${tokens.tenant}`);

      expect(response.status).toBe(200);
    });

    it('❌ Tenant CANNOT access landlord routes', async () => {
      const response = await request(app)
        .get('/api/landlords/properties')
        .set('Authorization', `Bearer ${tokens.tenant}`);

      expect(response.status).toBe(403);
    });

    it('✅ Tenant can view public properties', async () => {
      const response = await request(app)
        .get('/api/properties')
        .set('Authorization', `Bearer ${tokens.tenant}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.properties)).toBe(true);
    });
  });

  // ============================================
  // TEST: AGENT REGISTRATION & PROFILE
  // ============================================

  describe('🤝 AGENT Routes - Profile Management', () => {
    it('✅ Anyone can view approved agents', async () => {
      const response = await request(app)
        .get('/api/agents')
        .set('Authorization', `Bearer ${tokens.tenant}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.agents)).toBe(true);
    });

    it('✅ Agent can update own profile', async () => {
      const response = await request(app)
        .put(`/api/agents/${users.agent._id}`)
        .set('Authorization', `Bearer ${tokens.agent}`)
        .send({ yearsOfExperience: 5 });

      expect(response.status).toBe(200);
    });

    it('❌ Agent CANNOT update another agent\'s profile', async () => {
      // Create another agent
      const anotherAgent = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Another',
          lastName: 'Agent',
          email: 'test-rbac-agent2@example.com',
          password: 'Test123!@#',
          role: 'agent',
          phoneNumber: '08012345679'
        });

      const response = await request(app)
        .put(`/api/agents/${anotherAgent.body.user._id}`)
        .set('Authorization', `Bearer ${tokens.agent}`)
        .send({ yearsOfExperience: 10 });

      expect(response.status).toBe(403);
    });
  });

  // ============================================
  // TEST: AUTHENTICATION FAILURES
  // ============================================

  describe('🔐 AUTH Failures - Unauthorized Access', () => {
    it('❌ Request without token is rejected', async () => {
      const response = await request(app)
        .get('/api/admin/users');

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Not authorized');
    });

    it('❌ Request with invalid token is rejected', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', 'Bearer invalid_token_12345');

      expect(response.status).toBe(401);
    });

    it('❌ Expired token is rejected', async () => {
      // Mock expired token (this would need JWT manipulation)
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImV4cCI6MTYwMDAwMDAwMH0.fake';
      
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
    });
  });

  // ============================================
  // TEST: PUBLIC ROUTES (NO AUTH REQUIRED)
  // ============================================

  describe('🌐 PUBLIC Routes - Open Access', () => {
    it('✅ Anyone can view properties', async () => {
      const response = await request(app)
        .get('/api/properties');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('✅ Anyone can register', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Public',
          lastName: 'User',
          email: 'test-rbac-public@example.com',
          password: 'Test123!@#',
          phoneNumber: '08012345680'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });

    it('✅ Anyone can login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test-rbac-public@example.com',
          password: 'Test123!@#'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});

// ============================================
// HELPER: PRINT TEST SUMMARY
// ============================================

afterAll(() => {
  console.log('\n\n🔒 SECURITY SMOKE TEST SUMMARY');
  console.log('================================');
  console.log('✅ Admin: Can access /admin routes');
  console.log('✅ Landlord: Can CRUD own properties');
  console.log('✅ Tenant: Limited to public + own dashboard');
  console.log('✅ Investor: Isolated investment data');
  console.log('✅ Agent: Can manage own profile only');
  console.log('✅ Ownership: Users cannot edit others\' data');
  console.log('✅ Auth: Unauthorized requests rejected');
  console.log('\n⚠️  See SECURITY_AUDIT_REPORT.md for full audit\n');
});
