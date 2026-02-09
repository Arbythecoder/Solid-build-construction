# 🔐 CRITICAL: SECRET ROTATION PROCEDURE
**URGENT ACTION REQUIRED**

## 🚨 STEP 1: SANITIZE EXPOSED FILES (Do This NOW)

### File: `.env.production.example`
**Current (EXPOSED):**
```env
MONGO_URI=mongodb+srv://forfashionpassion690_db_user:SLXc5rx1y1eKzbU2@afodamscluster.5aauutk.mongodb.net/afodams-properties?retryWrites=true&w=majority&appName=Afodamscluster
```

**Replace with:**
```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here_use_64_character_random_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

---

## 🔄 STEP 2: ROTATE MONGODB PASSWORD

### 2.1 Generate New Password
```bash
# Use strong password generator
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2.2 Update MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to: **Database Access** → **Database Users**
3. Find user: `forfashionpassion690_db_user`
4. Click **Edit** → **Edit Password**
5. Enter new generated password
6. Click **Update User**

### 2.3 Update Production Environment
```bash
# SSH into production server (Render/Railway/Fly.io)
# Update environment variable MONGO_URI with new password

# Example for Render.com:
# Dashboard → Service → Environment → Edit MONGO_URI

# Example for Railway:
# Project → Variables → MONGO_URI → Update

# Example for Fly.io:
fly secrets set MONGO_URI="mongodb+srv://forfashionpassion690_db_user:NEW_PASSWORD@afodamscluster.5aauutk.mongodb.net/afodams-properties"
```

### 2.4 Test Connection
```bash
cd backend
node test-db-connection.js
```

---

## 🔑 STEP 3: ROTATE JWT SECRET

### 3.1 Generate New JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Output: 128-character hex string
```

### 3.2 Update All Environments

**Local Development (.env):**
```env
JWT_SECRET=your_new_128_character_secret_here
```

**Production:**
```bash
# Render/Railway/Fly.io environment variables
JWT_SECRET=your_new_128_character_secret_here
JWT_EXPIRES_IN=30d  # Keep same expiry
```

### 3.3 ⚠️ WARNING: All users will be logged out
- Existing JWT tokens will be invalid
- Users must re-login
- Consider scheduling during low-traffic hours

---

## 🖼️ STEP 4: ROTATE CLOUDINARY KEYS (If Exposed)

### 4.1 Regenerate API Secret
1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to: **Settings** → **Security** → **Access Keys**
3. Click **Reset API Secret**
4. Copy new API Secret

### 4.2 Update Environment Variables
```env
CLOUDINARY_CLOUD_NAME=afodamscluster  # Same
CLOUDINARY_API_KEY=123456789012345    # Same
CLOUDINARY_API_SECRET=NEW_SECRET_HERE # Updated
```

---

## 💳 STEP 5: ROTATE PAYSTACK SECRET KEY (If Exposed)

### 5.1 Generate New Secret Key
1. Go to [Paystack Dashboard](https://dashboard.paystack.com/)
2. Navigate to: **Settings** → **API Keys & Webhooks**
3. Click **Regenerate Secret Key**
4. Confirm action
5. Copy new secret key

### 5.2 Update Environment
```env
PAYSTACK_SECRET_KEY=sk_live_NEW_SECRET_HERE
PAYSTACK_PUBLIC_KEY=pk_live_SAME_PUBLIC_KEY  # Public key can stay
```

---

## ✅ STEP 6: VERIFY ALL SERVICES

### 6.1 Backend Health Check
```bash
cd backend
npm start

# Test endpoints
curl http://localhost:5000/api/properties
curl -H "Authorization: Bearer NEW_JWT_TOKEN" http://localhost:5000/api/admin/users
```

### 6.2 Database Connection
```bash
node test-db-connection.js
# Should output: ✅ MongoDB Connected Successfully
```

### 6.3 Image Upload (Cloudinary)
```bash
# Test in frontend - upload property image
# Should upload to Cloudinary without errors
```

### 6.4 Payment Processing (Paystack)
```bash
# Test payment integration
# Should process test transactions
```

---

## 📋 STEP 7: UPDATE .gitignore (Prevent Future Leaks)

### 7.1 Ensure These Lines Exist
```gitignore
# Environment variables
.env
.env.local
.env.development
.env.production
.env.test
*.env

# Backend env files
backend/.env
backend/.env.local
backend/.env.production

# Frontend env files
frontend-react/.env
frontend-react/.env.local
frontend-react/.env.production

# Sensitive configs
config/secrets.js
config/production.json
```

### 7.2 Verify .gitignore Works
```bash
git status
# Should NOT show any .env files
```

---

## 🔒 STEP 8: ADD SECRET VALIDATION

### 8.1 Create Environment Validator
**File:** `backend/utils/validateEnv.js`
```javascript
const validateEnv = () => {
  const required = [
    'MONGO_URI',
    'JWT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    process.exit(1);
  }

  // Validate JWT secret length
  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters');
    process.exit(1);
  }

  console.log('✅ All environment variables validated');
};

module.exports = validateEnv;
```

### 8.2 Add to server.js
```javascript
const validateEnv = require('./utils/validateEnv');
validateEnv();  // Add this at the top of server.js
```

---

## 📅 STEP 9: CREATE ROTATION SCHEDULE

### 9.1 Quarterly Rotation (Every 90 Days)
- **JWT_SECRET** - Rotate every 90 days
- **MONGO_URI password** - Rotate every 90 days
- **Cloudinary API Secret** - Rotate every 180 days
- **Paystack Secret Key** - Rotate after any security incident

### 9.2 Set Calendar Reminders
- Next rotation: **May 9, 2026**
- Add to team calendar: "Q2 2026 Security Key Rotation"

---

## 🚨 STEP 10: EMERGENCY RESPONSE PLAN

### If Keys Are Compromised:

1. **Immediately rotate ALL secrets** (Steps 2-5)
2. **Invalidate all active sessions**
   ```javascript
   // Add to User model
   tokenVersion: { type: Number, default: 0 }
   
   // Increment on password/key rotation
   user.tokenVersion += 1;
   await user.save();
   ```
3. **Monitor for suspicious activity**
   - Check MongoDB Atlas access logs
   - Review Cloudinary upload logs
   - Check Paystack transaction logs
4. **Notify users** (if data breach suspected)
5. **Document incident** for compliance

---

## ✅ COMPLETION CHECKLIST

- [ ] `.env.production.example` sanitized (no real passwords)
- [ ] MongoDB password rotated in Atlas
- [ ] Production `MONGO_URI` updated
- [ ] Database connection tested
- [ ] JWT secret regenerated (128 chars)
- [ ] All users logged out (tokens invalidated)
- [ ] Cloudinary API secret rotated (if exposed)
- [ ] Paystack secret key rotated (if exposed)
- [ ] `.gitignore` verified
- [ ] Environment validator added to `server.js`
- [ ] Rotation schedule created (90-day reminder)
- [ ] Team notified of rotation

---

## 📞 SUPPORT CONTACTS

**MongoDB Atlas Support:** https://www.mongodb.com/cloud/atlas/support  
**Cloudinary Support:** https://support.cloudinary.com/  
**Paystack Support:** support@paystack.com  

---

## ⏰ ESTIMATED TIME
- Sanitize files: **5 minutes**
- Rotate MongoDB: **10 minutes**
- Rotate JWT: **5 minutes**
- Rotate Cloudinary: **10 minutes**
- Rotate Paystack: **10 minutes**
- Testing: **15 minutes**
- **TOTAL: ~1 hour**

---

**🔴 PRIORITY: CRITICAL**  
**⏰ DEADLINE: Within 24 hours**  
**👤 ASSIGNED TO: DevOps/Backend Team**
