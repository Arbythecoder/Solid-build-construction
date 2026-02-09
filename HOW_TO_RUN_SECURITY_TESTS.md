# 🧪 HOW TO RUN SECURITY SMOKE TESTS

## Overview
This guide explains how to run the comprehensive RBAC security smoke tests for the AFODAMS Property Management Platform.

---

## Prerequisites

### 1. Install Dependencies
```bash
cd backend
npm install
npm install --save-dev supertest jest
```

### 2. Configure Test Environment
Create `backend/.env.test` file (if not exists):
```env
# Test Database (separate from production!)
MONGO_URI_TEST=mongodb+srv://test_user:test_password@testcluster.mongodb.net/afodams-test?retryWrites=true&w=majority

# Or use local MongoDB
MONGO_URI_TEST=mongodb://localhost:27017/afodams-test

# JWT (can use same as dev)
JWT_SECRET=test_jwt_secret_for_security_smoke_tests_64_chars_minimum_required

# Cloudinary (use test account)
CLOUDINARY_CLOUD_NAME=test_cloud
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=test_secret

# Other configs
NODE_ENV=test
PORT=5001
```

### 3. Ensure package.json Has Test Script
**File:** `backend/package.json`
```json
{
  "scripts": {
    "test": "jest --verbose --forceExit",
    "test:security": "jest security-smoke-tests.js --verbose --forceExit",
    "test:watch": "jest --watch"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "testTimeout": 30000
  }
}
```

---

## Running the Tests

### Option 1: Run All Security Tests
```bash
cd backend
npm run test:security
```

### Option 2: Run Specific Test Suite
```bash
cd backend
npm test -- security-smoke-tests.js
```

### Option 3: Run with Coverage
```bash
cd backend
npm test -- security-smoke-tests.js --coverage
```

### Option 4: Run in Watch Mode (during development)
```bash
cd backend
npm run test:watch
```

---

## Expected Output

### ✅ Successful Test Run
```
🔒 RBAC Security Smoke Tests
  Setup: Create Users for Each Role
    ✓ should create admin user and get token (245ms)
    ✓ should create landlord user and get token (198ms)
    ✓ should create tenant user and get token (187ms)
    ✓ should create investor user and get token (192ms)
    ✓ should create agent user and get token (188ms)

  🔴 ADMIN Routes - Should Allow Admin Only
    ✓ ✅ Admin can access /api/admin/users (45ms)
    ✓ ❌ Landlord CANNOT access /api/admin/users (38ms)
    ✓ ❌ Tenant CANNOT access /api/admin/users (35ms)
    ✓ ❌ Investor CANNOT access /api/admin/stats (32ms)
    ✓ ❌ Agent CANNOT change user roles (39ms)

  🏠 PROPERTY Routes - Landlord Ownership
    ✓ ✅ Landlord can create property (156ms)
    ✓ ❌ Tenant CANNOT create property (41ms)
    ✓ ❌ Investor CANNOT edit landlord's property (43ms)
    ✓ ✅ Landlord can edit own property (87ms)
    ✓ ✅ Admin can edit ANY property (92ms)

  💰 INVESTOR Routes - Data Isolation
    ✓ ✅ Investor can access own dashboard (52ms)
    ✓ ❌ Landlord CANNOT access investor dashboard (37ms)
    ✓ ✅ Investor sees ONLY their investments (48ms)

  🏘️ TENANT Routes - Limited Access
    ✓ ✅ Tenant can access own dashboard (45ms)
    ✓ ❌ Tenant CANNOT access landlord routes (34ms)
    ✓ ✅ Tenant can view public properties (41ms)

  🤝 AGENT Routes - Profile Management
    ✓ ✅ Anyone can view approved agents (38ms)
    ✓ ✅ Agent can update own profile (76ms)
    ✓ ❌ Agent CANNOT update another agent's profile (41ms)

  🔐 AUTH Failures - Unauthorized Access
    ✓ ❌ Request without token is rejected (28ms)
    ✓ ❌ Request with invalid token is rejected (31ms)
    ✓ ❌ Expired token is rejected (29ms)

  🌐 PUBLIC Routes - Open Access
    ✓ ✅ Anyone can view properties (43ms)
    ✓ ✅ Anyone can register (124ms)
    ✓ ✅ Anyone can login (98ms)


🔒 SECURITY SMOKE TEST SUMMARY
================================
✅ Admin: Can access /admin routes
✅ Landlord: Can CRUD own properties
✅ Tenant: Limited to public + own dashboard
✅ Investor: Isolated investment data
✅ Agent: Can manage own profile only
✅ Ownership: Users cannot edit others' data
✅ Auth: Unauthorized requests rejected

⚠️  See SECURITY_AUDIT_REPORT.md for full audit

Test Suites: 1 passed, 1 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        4.523s
```

---

## Understanding Test Results

### Test Naming Convention
- **✅ Green checkmark** = Action SHOULD succeed (and did)
- **❌ Red X** = Action SHOULD fail (and correctly did)

### Example:
```
✅ Admin can access /api/admin/users
```
This means: Admin role successfully accessed admin-only route (EXPECTED)

```
❌ Tenant CANNOT create property
```
This means: Tenant was correctly blocked from creating property (EXPECTED)

---

## Troubleshooting

### Issue: Tests Fail with "MONGO_URI_TEST not defined"
**Solution:**
```bash
# Create .env.test file in backend/
echo "MONGO_URI_TEST=mongodb://localhost:27017/afodams-test" > .env.test
echo "JWT_SECRET=test_secret_minimum_32_characters_required_for_jwt" >> .env.test
```

### Issue: "Cannot find module 'supertest'"
**Solution:**
```bash
cd backend
npm install --save-dev supertest jest
```

### Issue: Tests timeout after 5000ms
**Solution:** Increase timeout in jest.config.js:
```javascript
module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000  // 30 seconds
};
```

### Issue: Database already has test users
**Solution:** Run cleanup:
```bash
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect(process.env.MONGO_URI_TEST).then(async () => {
  await User.deleteMany({ email: { \$regex: /test-rbac/ } });
  console.log('✅ Test users cleaned up');
  process.exit(0);
});
"
```

### Issue: Port 5000 already in use
**Solution:** Change port in .env.test:
```env
PORT=5001
```

---

## Test Coverage

### What's Tested:

1. **User Creation & Authentication**
   - Create 5 users (admin, landlord, tenant, investor, agent)
   - JWT token generation
   - Login functionality

2. **Admin Routes (5 tests)**
   - Admin can access admin-only routes
   - Non-admins are blocked (403)
   - Role-based authorization works

3. **Property Ownership (5 tests)**
   - Landlords can create properties
   - Tenants/investors cannot create
   - Ownership middleware blocks unauthorized edits
   - Admins can edit any property

4. **Investor Data Isolation (3 tests)**
   - Investors see only their investments
   - Other roles blocked from investor dashboard
   - Investment queries filtered by ownership

5. **Tenant Access Control (3 tests)**
   - Tenants can access own dashboard
   - Tenants blocked from landlord routes
   - Public properties accessible

6. **Agent Profile Management (3 tests)**
   - Agents can update own profile
   - Agents cannot edit others' profiles
   - Public can view approved agents

7. **Authentication Failures (3 tests)**
   - No token → 401
   - Invalid token → 401
   - Expired token → 401

8. **Public Routes (3 tests)**
   - Anyone can view properties
   - Anyone can register
   - Anyone can login

**Total: 32 tests across 8 security domains**

---

## CI/CD Integration

### GitHub Actions Example
**File:** `.github/workflows/security-tests.yml`
```yaml
name: Security Smoke Tests

on: [push, pull_request]

jobs:
  security-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: |
          cd backend
          npm install
      
      - name: Run Security Tests
        env:
          MONGO_URI_TEST: ${{ secrets.MONGO_URI_TEST }}
          JWT_SECRET: ${{ secrets.JWT_SECRET_TEST }}
        run: |
          cd backend
          npm run test:security
```

---

## Running Tests Manually (Step-by-Step)

### 1. Start MongoDB (if using local)
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### 2. Set Environment Variables
```bash
# Windows PowerShell
$env:MONGO_URI_TEST="mongodb://localhost:27017/afodams-test"
$env:JWT_SECRET="test_secret_minimum_32_characters_required"

# Mac/Linux
export MONGO_URI_TEST="mongodb://localhost:27017/afodams-test"
export JWT_SECRET="test_secret_minimum_32_characters_required"
```

### 3. Run Tests
```bash
cd backend
npm test -- security-smoke-tests.js
```

### 4. Review Results
- Green ✅ = Test passed
- Red ❌ = Test failed (check logs)
- Yellow ⚠️ = Warning (usually non-critical)

---

## Best Practices

1. **Run tests before every deployment**
   ```bash
   npm run test:security && npm run deploy
   ```

2. **Use separate test database** - Never test on production data

3. **Clean up after tests** - Tests should delete created data

4. **Run tests in CI/CD** - Automate with GitHub Actions/Jenkins

5. **Monitor test duration** - Should complete in < 10 seconds

6. **Update tests when adding roles** - Keep tests in sync with features

---

## Next Steps

After successful test run:
1. Review [SECURITY_AUDIT_REPORT.md](SECURITY_AUDIT_REPORT.md) for full findings
2. Follow [SECRET_ROTATION_GUIDE.md](SECRET_ROTATION_GUIDE.md) to rotate keys
3. Schedule monthly security test runs
4. Add tests to CI/CD pipeline

---

**Questions?** See [SECURITY_AUDIT_COMPLETE.md](SECURITY_AUDIT_COMPLETE.md) for complete audit summary.
