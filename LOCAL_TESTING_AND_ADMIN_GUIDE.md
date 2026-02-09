# 🚀 LOCAL TESTING & ADMIN GUIDE - Solid Build Construction Limited Platform

**Date:** January 17, 2026  
**Version:** 1.0

---

## 📋 TABLE OF CONTENTS

1. [Local Testing Setup](#local-testing-setup)
2. [Signup Flow Explanation](#signup-flow-explanation)
3. [Admin Dashboard Guide](#admin-dashboard-guide)
4. [Database & Subscriber Information](#database--subscriber-information)
5. [Testing Checklist](#testing-checklist)
6. [Troubleshooting](#troubleshooting)

---

## 🏃‍♂️ LOCAL TESTING SETUP

### **Prerequisites**
- Node.js installed (v14+)
- MongoDB running (Atlas connection configured)
- Two terminal windows open

### **Step 1: Start the Backend**

```bash
cd backend
npm install  # Only needed first time
node server.js
```

**Expected Output:**
```
✅ MongoDB connected successfully
✅ Backend running on http://localhost:5000
✅ Swagger API docs available at http://localhost:5000/api-docs
```

**Backend is ready when you see:**
- No errors about port 5000
- Database connection confirmed

### **Step 2: Start the Frontend**

In a **NEW terminal**:

```bash
cd frontend-react
npm install  # Only needed first time
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### **Step 3: Access the Application**

Open your browser:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`
- **API Documentation:** `http://localhost:5000/api-docs`

---

## 🔐 SIGNUP FLOW EXPLANATION

### **Why the Account "Disappears"**

**This is INTENTIONAL and CORRECT behavior:**

1. **User fills signup form** → Account is created in database ✅
2. **Backend returns success** → Account stored in MongoDB ✅
3. **Frontend shows success message** → "Account created successfully!"
4. **Frontend redirects to login** → `/login` page ✅
5. **User must now LOGIN** → Verify credentials and get JWT token

**The account data IS SAVED, but you must login to access your dashboard.**

### **Signup Flow for Each Role**

#### **1. Landlord Signup** ✅

**URL:** `http://localhost:5173/signup/landlord`

**Multi-step form:**
1. **Step 1: Personal Info**
   - First Name
   - Last Name
   - Email
   - Phone
   - Password (min 6 characters)
   - Confirm Password

2. **Step 2: Location**
   - Address
   - City
   - State
   - Country (Default: Nigeria)

3. **Step 3: Business Details**
   - Number of Properties
   - Property Types (Apartment, House, Villa, Office, Land, Commercial)
   - How did you hear about us?
   - Terms & Conditions (checkbox)

**What gets stored:**
```javascript
{
  name: "First Last",
  email: "landlord@email.com",
  password: "[hashed]",
  phone: "+234...",
  address: "Full address with city, state, country",
  role: "landlord",
  verified: false,  // Set to true when email verified
  createdAt: "2026-01-17T10:30:00Z"
}
```

**After signup:**
- ✅ User account created in `User` collection
- ✅ Redirect to `/login`
- ✅ User must enter email + password to login
- ✅ On successful login → redirected to `/landlord/dashboard`

#### **2. Tenant Signup** ✅

**URL:** `http://localhost:5173/signup/tenant`

**Form:**
- Name, Email, Phone, Password
- Preferred Location
- Budget Range
- Property Type Preference

**After signup:** Redirects to `/login` → `/tenant/dashboard`

#### **3. Agent Signup** ✅

**URL:** `http://localhost:5173/signup/agent`

**Form:**
- Personal Info
- Agency Details
- Specialization
- Years of Experience

**After signup:** Redirects to `/login` → Pending admin approval → `/agent/dashboard`

#### **4. Investor Signup** ✅

**URL:** `http://localhost:5173/signup/investor`

**Form:**
- Personal Info
- Investment Details
- Budget
- Preferences

**After signup:** Redirects to `/login` → `/investor/dashboard`

---

## 👨‍💼 ADMIN DASHBOARD GUIDE

### **How to Access Admin Features**

#### **Option 1: Direct Admin Creation** (Database)

```bash
# Connect to MongoDB
# Insert admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@Solid Build.com",
  password: "[bcrypted-password]",
  role: "admin",
  verified: true,
  createdAt: new Date()
})
```

#### **Option 2: Use Admin Signup** (Frontend)

Since there's no admin signup page yet, you need to:
1. Create an admin account via backend
2. Or modify an existing user role to admin

### **Admin Dashboard URL**

```
http://localhost:5173/admin/dashboard
```

### **Admin Capabilities**

Once logged in as admin, you have access to:

#### **1. Properties Tab** 📋
- **View:** All pending property listings
- **Approve:** Accept and publish properties
- **Reject:** Decline property listings
- **Search:** Find properties by title/location
- **Filter:** By status, date, price, location
- **Details visible:**
  - Title, Location, Price
  - Landlord name & contact
  - Submission date
  - Property images

#### **2. Agent Applications Tab** 👤
- **View:** All pending agent applications
- **Approve:** Grant agent access
- **Reject:** Deny agent application
- **Details visible:**
  - Agent name & email
  - Experience level
  - Specialization
  - Application date

#### **3. All Users Tab** 👥
- **View:** All registered users (Landlords, Tenants, Investors, Agents)
- **Filter:** By user role
- **Search:** By name or email
- **Actions:** View profile, manage user status

---

## 📧 DATABASE & SUBSCRIBER INFORMATION

### **Email Subscribers (Inquiry Model)**

**Collection:** `inquiries`

**Fields:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  property: ObjectId (reference to Property),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### **How to View Subscriber Details**

#### **Option 1: Via Admin Dashboard (RECOMMENDED)**

Currently, the admin dashboard shows:
- ✅ Pending properties
- ✅ Agent applications
- ✅ User count

**Missing implementation:**
- ❌ Subscriber/Inquiry list (TODO in code)

#### **Option 2: Via API Endpoint**

**Endpoint:** `GET /api/inquiries`

**Requirements:**
- Must be authenticated as admin
- Provide JWT token in header

**Example using cURL:**
```bash
curl -X GET http://localhost:5000/api/inquiries \
  -H "Authorization: Bearer [YOUR_JWT_TOKEN]"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in your property",
    "property": "507f1f77bcf86cd799439012",
    "createdAt": "2026-01-17T10:30:00Z",
    "updatedAt": "2026-01-17T10:30:00Z"
  }
]
```

#### **Option 3: Via MongoDB Compass / CLI**

**View all inquiries:**
```javascript
db.inquiries.find().pretty()
```

**Get inquiry count:**
```javascript
db.inquiries.countDocuments()
```

**Get inquiries for specific property:**
```javascript
db.inquiries.find({ property: ObjectId("507f1f77bcf86cd799439012") })
```

### **User Database Structure**

**Collection:** `users`

**Fields:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypted),
  role: ["admin", "landlord", "tenant", "investor", "agent"],
  phone: String,
  address: String,
  profileImage: String,
  verified: Boolean (default: false),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

**View all users by role:**
```javascript
db.users.find({ role: "landlord" })    // All landlords
db.users.find({ role: "tenant" })      // All tenants
db.users.find({ role: "agent" })       // All agents
db.users.find({ role: "investor" })    // All investors
db.users.find({ role: "admin" })       // All admins
```

---

## ✅ TESTING CHECKLIST

### **1. Signup Flow Testing**

- [ ] Navigate to `http://localhost:5173/signup`
- [ ] Click "Landlord" option
- [ ] Fill **Step 1: Personal Info**
  - [ ] Enter valid name
  - [ ] Enter unique email
  - [ ] Enter password (6+ chars)
  - [ ] Click "Next"
- [ ] Fill **Step 2: Location**
  - [ ] Enter address
  - [ ] Enter city, state
  - [ ] Click "Next"
- [ ] Fill **Step 3: Business Details**
  - [ ] Select number of properties
  - [ ] Select property types
  - [ ] Check "I agree to terms"
  - [ ] Click "Sign up"
- [ ] **Expected:** "Account created successfully!" message
- [ ] **Expected:** Redirect to `/login` page
- [ ] Account is saved in MongoDB ✅

### **2. Login After Signup Testing**

- [ ] On login page, enter:
  - [ ] Email from signup
  - [ ] Password from signup
- [ ] Click "Login"
- [ ] **Expected:** Redirect to `/landlord/dashboard`
- [ ] **Expected:** Welcome message with your name
- [ ] **Expected:** Dashboard loads with landlord-specific features

### **3. Role-Based Dashboard Testing**

- [ ] Login as **Landlord** → Verify `/landlord/dashboard` loads
- [ ] Login as **Tenant** → Verify `/tenant/dashboard` loads
- [ ] Login as **Agent** → Verify `/agent/dashboard` loads
- [ ] Login as **Investor** → Verify `/investor/dashboard` loads
- [ ] Login as **Admin** → Verify `/admin/dashboard` loads

### **4. Database Verification**

**Open MongoDB Compass or use CLI:**

```javascript
// Check user was created
db.users.findOne({ email: "your-test-email@email.com" })

// Should return:
{
  _id: ObjectId(...),
  name: "Your Name",
  email: "your-test-email@email.com",
  role: "landlord",
  password: "[encrypted]",
  verified: false,
  createdAt: ISODate("2026-01-17T..."),
  updatedAt: ISODate("2026-01-17T...")
}
```

---

## 🔧 TROUBLESHOOTING

### **Issue 1: "Cannot connect to server" error**

**Cause:** Backend not running

**Solution:**
```bash
# Terminal 1
cd backend
node server.js

# Should see:
# ✅ MongoDB connected successfully
# ✅ Backend running on http://localhost:5000
```

---

### **Issue 2: "Account created but immediately disappears"**

**This is expected behavior!** ✅

The account is NOT disappearing - it's saved in the database.
You must login with the credentials to access your dashboard.

**Why this happens:**
1. Form submits successfully
2. Backend confirms account creation
3. Frontend shows success message
4. Frontend redirects to login page
5. You must enter email + password again

**This is correct and secure!**

---

### **Issue 3: "Email already exists" error on signup**

**Cause:** You're using an email that already exists

**Solution:**
- Use a different email address
- Or delete the existing user from MongoDB:

```javascript
db.users.deleteOne({ email: "existing@email.com" })
```

---

### **Issue 4: "Invalid credentials" on login**

**Cause:** Wrong email or password

**Solution:**
1. Double-check email (case-sensitive for some systems)
2. Verify password has no extra spaces
3. Check password is 6+ characters
4. Verify account exists in database:

```javascript
db.users.findOne({ email: "your-email@email.com" })
```

---

### **Issue 5: Cannot access `/admin/dashboard`**

**Cause:** Not logged in as admin

**Solution:**
1. Create admin account (see Database section above)
2. Login with admin credentials
3. Navigate to `http://localhost:5173/admin/dashboard`

---

### **Issue 6: "Role not found" during signup**

**Cause:** Selected role not matching backend

**Solution:**
- Ensure backend is running
- Check role is exactly: `landlord`, `tenant`, `agent`, `investor`, or `admin` (lowercase)
- Restart backend

---

## 📊 NEXT STEPS

### **To Implement Admin Inquiry Viewer:**

The inquiry collection is created and working, but the admin UI needs to be updated.

**Add to AdminDashboard.tsx:**
1. New tab: "Inquiries"
2. Fetch inquiries from `/api/inquiries`
3. Display in table with:
   - Subscriber name
   - Email
   - Message
   - Property (linked)
   - Date received
   - Contact action

---

## 🎯 DOMAIN & DEPLOYMENT

When ready to deploy:

1. **Purchase domain** (e.g., `Solid Build.com` on Namecheap)
2. **Update frontend** with production API URL
3. **Deploy backend** to Fly.io
4. **Deploy frontend** to Cloudflare Pages
5. **Update DNS** to point to Cloudflare nameservers

---

**Questions?** Check the [HOW_TO_RUN.md](HOW_TO_RUN.md) file for more details.

