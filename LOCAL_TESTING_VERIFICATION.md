# 🧪 LOCAL TESTING VERIFICATION SCRIPT

**Date:** January 17, 2026
**Status:** Ready to Test

---

## ✅ YOUR APPLICATION IS RUNNING

**Frontend:** http://localhost:3001  
**Backend:** http://localhost:5000  
**API Docs:** http://localhost:5000/api-docs  

---

## 🚀 QUICK START - TEST LANDLORD SIGNUP

### **Step 1: Open the Application**

1. Go to: `http://localhost:3001`
2. Click "Get Started" or navigate to `/signup`

### **Step 2: Select Landlord Role**

1. Click on **"Landlord"** card
2. Should redirect to `/signup/landlord`

### **Step 3: Fill Signup Form**

**Use these test credentials:**

```
First Name:     John
Last Name:      Adebayo
Email:          johnlandlord@Solid Build.test
Phone:          +2348012345678
Password:       TestPassword123!
Confirm:        TestPassword123!

Address:        123 Lekki Phase 1
City:           Lagos
State:          Lagos
Country:        Nigeria

# of Properties: 1-5
Property Types: Apartment, House, Villa
Heard About:    Search Engine
Terms:          ✓ Checked
```

### **Step 4: Submit Form**

1. Click "Sign up" button
2. **Expected:** Success message appears
3. **Expected:** Auto-redirect to `/login` page
4. **Verify in Browser Console** (F12):
   - Should see success toast notification
   - No JavaScript errors

### **Step 5: Login**

1. On login page, enter:
   - Email: `johnlandlord@Solid Build.test`
   - Password: `TestPassword123!`
2. Click "Login"
3. **Expected:** Redirect to `/landlord/dashboard`
4. **Expected:** Welcome message with "John Adebayo"

### **Step 6: Verify in Database**

Open MongoDB Compass or use Mongo CLI:

```javascript
// Connect to your MongoDB
use Solid Build_db  // or your database name

// Check user was created
db.users.findOne({ 
  email: "johnlandlord@Solid Build.test" 
})

// Should return something like:
{
  _id: ObjectId("..."),
  name: "John Adebayo",
  email: "johnlandlord@Solid Build.test",
  password: "$2a$10$...",  // bcrypted password
  role: "landlord",
  phone: "+2348012345678",
  address: "123 Lekki Phase 1, Lagos, Lagos, Nigeria",
  verified: false,
  createdAt: ISODate("2026-01-17T..."),
  updatedAt: ISODate("2026-01-17T...")
}
```

---

## 📝 TEST SCENARIOS - ALL ROLES

### **Scenario 1: Tenant Signup**

```
URL: http://localhost:3001/signup/tenant

Name:           Jane Okonkwo
Email:          janetenanttt@Solid Build.test
Phone:          +2349087654321
Password:       TenantPass123!

City:           Ikoyi
Budget:         ₦5M - ₦10M
Property Type:  Apartment
```

**Expected Result:**
- Account created ✅
- Redirect to `/login` ✅
- Can login and access `/tenant/dashboard` ✅

---

### **Scenario 2: Agent Signup**

```
URL: http://localhost:3001/signup/agent

Name:           Michael Okafor
Email:          michaelAgent@Solid Build.test
Phone:          +2347061234567
Password:       AgentPass123!

Agency:         Premier Realty
Experience:     5 years
Specialization: Luxury Properties
```

**Expected Result:**
- Account created ✅
- Redirect to `/login` ✅
- Can login but dashboard shows "Pending Admin Approval" (optional feature)
- Access `/agent/dashboard` ✅

---

### **Scenario 3: Investor Signup**

```
URL: http://localhost:3001/signup/investor

Name:           Samuel Adeleke
Email:          samuelInvestor@Solid Build.test
Phone:          +2348156789012
Password:       InvestorPass123!

Budget:         ₦50M+
Investment Type: Long-term
Locations:      Lagos, Abuja
```

**Expected Result:**
- Account created ✅
- Redirect to `/login` ✅
- Access `/investor/dashboard` ✅

---

## 🛡️ VALIDATION TESTS

### **Test 1: Password Validation**

**Try to sign up with:**
- Password: `123` (too short)

**Expected:** Error message: "Password must be at least 6 characters"

---

### **Test 2: Email Validation**

**Try to sign up with:**
- Email: `invalid-email-format`

**Expected:** Error message: "Please enter a valid email"

---

### **Test 3: Duplicate Email**

**Sign up twice with same email:**
1. First signup: `duplicate@test.com` ✅
2. Second signup: `duplicate@test.com` ❌

**Expected on second attempt:** 
Error message: "User already exists with this email"

---

### **Test 4: Required Fields**

**Try to submit form with missing:**
- [ ] Name: Should show error
- [ ] Email: Should show error
- [ ] Password: Should show error

**Expected:** Form prevents submission

---

## 👨‍💼 ADMIN ACCESS TEST

### **How to Test Admin Features**

#### **Option A: Create Admin via Database**

```bash
# Open MongoDB Compass or terminal
use Solid Build_db

# Create admin user (with bcrypted password)
db.users.insertOne({
  name: "Admin User",
  email: "admin@Solid Build.com",
  password: "$2a$10$Y.rXzpMDVMXO.7fGOoN6LuJs2UU9wBVDGNwC7LQcvvbHKVBH.M5zu",
  // Password: "admin123" (bcrypted)
  role: "admin",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

#### **Option B: Login with existing admin**

```
Email:    admin@Solid Build.com
Password: admin123
```

#### **Admin Dashboard Test**

1. Login as admin
2. Navigate to: `http://localhost:3001/admin/dashboard`
3. **Should see:**
   - Stats cards (Properties, Users, Pending, Revenue)
   - Tabs: Properties, Agent Applications, Users
   - Search and filter functionality
   - Pending properties list
   - Agent applications list

---

## 🔍 CHECKING SUBSCRIBER DATA

### **Via API Endpoint**

1. **Get your JWT token:**
   - Login as any user
   - Open DevTools (F12)
   - Go to Application → LocalStorage
   - Find `user` key and copy the `token`

2. **Test inquiries endpoint:**

```bash
# Using cURL (Windows PowerShell)
$headers = @{
    "Authorization" = "Bearer YOUR_JWT_TOKEN_HERE"
    "Content-Type" = "application/json"
}

Invoke-RestMethod `
  -Uri "http://localhost:5000/api/inquiries" `
  -Method Get `
  -Headers $headers
```

**Expected Response:**
```json
[
  {
    "_id": "507f...",
    "name": "Subscriber Name",
    "email": "subscriber@email.com",
    "message": "I'm interested in this property",
    "property": "507f...",
    "createdAt": "2026-01-17T...",
    "updatedAt": "2026-01-17T..."
  }
]
```

### **Via MongoDB**

```javascript
// Count all inquiries
db.inquiries.countDocuments()

// List all inquiries
db.inquiries.find().pretty()

// Get inquiries by date (newest first)
db.inquiries.find().sort({ createdAt: -1 }).limit(10)

// Get inquiries for specific property
db.inquiries.find({ 
  property: ObjectId("PROPERTY_ID_HERE") 
})
```

---

## 📊 DATABASE VERIFICATION

### **Check Database Connection**

**Backend should log:**
```
✅ MongoDB connected successfully
Connected to Database: Solid Build_db
```

**Check in MongoDB Compass:**
1. Connection: `mongodb+srv://...` (from .env)
2. Database should exist
3. Collections: `users`, `inquiries`, `properties`, etc.

### **Check All Collections**

```javascript
use Solid Build_db

// Show all collections
show collections

// Count documents in each
db.users.countDocuments()        // Should be > 0 after signup
db.inquiries.countDocuments()    // Count of inquiries
db.properties.countDocuments()   // Count of properties
```

---

## 🐛 DEBUGGING

### **Enable Debug Mode**

**In browser console (F12):**

```javascript
// View stored user data
JSON.parse(localStorage.getItem('user'))

// View last auth action
console.log('Auth state:', window.__auth__)
```

### **Check Backend Logs**

**In backend terminal, you should see:**

```
POST /api/auth/register 201 in 150ms
✅ User registered successfully

POST /api/auth/login 200 in 100ms
✅ Login successful

GET /api/inquiries 200 in 50ms
✅ Inquiries retrieved
```

### **Common Issues**

| Issue | Solution |
|-------|----------|
| 404 on /signup/landlord | Restart frontend: `npm run dev` |
| "Cannot connect to server" | Restart backend: `node server.js` |
| Form submits but no redirect | Check console for errors: F12 |
| Blank page on dashboard | Check user role is correct in localStorage |
| Database query shows no user | User didn't actually signup, or wrong email |

---

## ✨ SUCCESS CRITERIA

**Your setup is working correctly when:**

- [ ] Frontend loads at `http://localhost:3001`
- [ ] Backend runs without errors
- [ ] Can navigate to `/signup/landlord`
- [ ] Can fill and submit signup form
- [ ] See success message
- [ ] Redirected to `/login`
- [ ] Can login with signup credentials
- [ ] Dashboard loads with correct role
- [ ] User exists in MongoDB
- [ ] Admin can view dashboard
- [ ] Inquiries collection accessible

---

## 🎯 NEXT STEPS

**Once all tests pass:**

1. ✅ Test all 4 user roles (Landlord, Tenant, Agent, Investor)
2. ✅ Test admin features
3. ✅ Create sample properties
4. ✅ Test inquiry submission
5. ✅ Test property search and filtering
6. ✅ Ready for domain purchase and deployment!

---

**Ready to test? Open http://localhost:3001 in your browser now!**

