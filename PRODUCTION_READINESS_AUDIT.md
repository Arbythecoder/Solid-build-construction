# 🔍 PRODUCTION READINESS AUDIT - Solid Build Construction Limited

**Audit Date:** February 9, 2026  
**Auditor:** Senior Full-Stack Auditor  
**Status:** CRITICAL ISSUES IDENTIFIED

---

## 📊 PRODUCTION READINESS MAP

### 1️⃣ TECH STACK & APPLICATIONS

#### **Backend Stack**
- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (jsonwebtoken)
- **File Upload:** Multer + Cloudinary
- **Real-time:** Socket.io
- **Security:** Helmet, CORS, XSS-Clean, HPP, Mongo-Sanitize, Rate Limiting
- **Email:** SendGrid
- **Payment:** Paystack SDK
- **API Docs:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Testing:** Jest + Supertest
- **Validation:** Zod

**File:** [backend/package.json](backend/package.json)

#### **Frontend Stack**
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Lucide React
- **HTTP Client:** Axios
- **Real-time:** Socket.io-client
- **Toast Notifications:** React Hot Toast
- **SEO:** React Helmet Async

**File:** [frontend-react/package.json](frontend-react/package.json)

#### **Applications Present**
1. ✅ **Web App (React)** - [frontend-react/](frontend-react/)
2. ✅ **Static Site (HTML)** - [frontend/](frontend/) (Legacy, appears unused)
3. ✅ **REST API** - [backend/](backend/)
4. ❌ **Admin Dashboard** - Frontend exists but incomplete backend
5. ❌ **Mobile App** - NOT IMPLEMENTED (mentioned in UI as "Coming Soon")

---

### 2️⃣ AUTH SYSTEM

#### **Type:** JWT-based Authentication
- **Library:** jsonwebtoken
- **Token Expiry:** 7 days (login) / 30 days (user schema method)
- **Token Location:** localStorage (frontend) + Bearer header
- **Password Hashing:** bcryptjs (10 salt rounds)

#### **Auth System Location:**
- **Backend:**
  - Model: [backend/models/User.js](backend/models/User.js) (lines 1-60)
  - Routes: [backend/routes/authRoutes.js](backend/routes/authRoutes.js) (lines 1-9)
  - Controller: [backend/controllers/authController.js](backend/controllers/authController.js) (lines 1-100)
  - Middleware: [backend/middleware/authMiddleware.js](backend/middleware/authMiddleware.js) (lines 1-68)
  
- **Frontend:**
  - Context: [frontend-react/src/context/AuthContext.tsx](frontend-react/src/context/AuthContext.tsx) (lines 1-165)
  - API Service: [frontend-react/src/services/api.ts](frontend-react/src/services/api.ts) (lines 1-100)

#### **Auth Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- No logout endpoint (client-side only)
- ❌ **MISSING:** Password reset, email verification, refresh tokens

---

### 3️⃣ ROLE MODEL

#### **Roles Defined:**
```javascript
enum: ["admin", "landlord", "tenant", "investor", "agent"]
```
**Location:** [backend/models/User.js](backend/models/User.js#L19)

#### **Where Roles Are Stored:**
- **Primary:** `User` collection in MongoDB
- **Field:** `role` (String, default: "tenant")
- ⚠️ **CRITICAL ISSUE:** Separate collections exist but are NOT used:
  - [backend/models/Landlord.js](backend/models/Landlord.js) - Orphaned schema
  - [backend/models/Tenant.js](backend/models/Tenant.js) - Orphaned schema
  - [backend/models/Agent.js](backend/models/Agent.js) - Orphaned schema
  - ❌ No `Investor` model exists

#### **Where Roles Are Enforced:**
- **Middleware:** [backend/middleware/authMiddleware.js](backend/middleware/authMiddleware.js)
  - `protect` - Authentication check (lines 5-29)
  - `admin` - Admin-only (lines 31-37)
  - `landlordOrAdmin` - Landlord or Admin (lines 39-46)
  - `authorize(...roles)` - Generic role check (lines 48-62)

- **Usage in Routes:**
  - Admin: [backend/routes/adminRoutes.js](backend/routes/adminRoutes.js#L10-11)
  - Properties: [backend/routes/propertyRoutes.js](backend/routes/propertyRoutes.js#L23)
  - Investor: [backend/routes/investorRoutes.js](backend/routes/investorRoutes.js#L8)

---

### 4️⃣ SIGNUP/LOGIN FLOWS

#### **Login Flow (All Roles)**
1. **Route:** `POST /api/auth/login`
2. **Frontend:** [frontend-react/src/pages/LoginPage.tsx](frontend-react/src/pages/LoginPage.tsx) → AuthContext.login()
3. **Request:** `{ email, password }`
4. **Backend Controller:** [backend/controllers/authController.js](backend/controllers/authController.js#L55-100)
   - Find user by email
   - Compare password (bcrypt)
   - Generate JWT token (userId, role)
   - Return: `{ token, user: { id, name, email, role } }`
5. **Database:** `User` collection only
6. ✅ **STATUS:** Working correctly

---

#### **Signup Flow: LANDLORD**
1. **Route:** `POST /api/auth/register`
2. **Frontend:** [frontend-react/src/pages/auth/LandlordSignup.tsx](frontend-react/src/pages/auth/LandlordSignup.tsx#L70-80)
3. **Request Payload:**
   ```javascript
   {
     name: "FirstName LastName",
     email: "...",
     phone: "...",
     password: "...",
     address: "..., ..., ..., ...",
     numberOfProperties: "1-5",
     propertyTypes: [...],
     hearAboutUs: "..."
   }
   ```
4. **Backend Controller:** [backend/controllers/authController.js](backend/controllers/authController.js#L5-54)
   - ✅ Validates required fields (name, email, password)
   - ❌ **FAILURE POINT:** Does NOT validate or store `numberOfProperties`, `propertyTypes`, `hearAboutUs`
   - Creates `User` with role="landlord"
   - Does NOT create `Landlord` collection entry
5. **Database Write:** `User` collection only
6. ⚠️ **STATUS:** Partially working - extra fields are silently ignored

---

#### **Signup Flow: TENANT**
1. **Route:** `POST /api/auth/register`
2. **Frontend:** [frontend-react/src/pages/auth/TenantSignup.tsx](frontend-react/src/pages/auth/TenantSignup.tsx#L42-55)
3. **Request Payload:**
   ```javascript
   {
     name: "FirstName LastName",
     email: "...",
     phone: "...",
     password: "...",
     occupation: "...",
     employer: "...",
     monthlyIncome: "...",
     preferredLocation: "...",
     moveInDate: "..."
   }
   ```
4. **Backend Controller:** Same as landlord
   - ❌ **FAILURE POINT:** Does NOT validate or store tenant-specific fields
5. **Database Write:** `User` collection only
6. ⚠️ **STATUS:** Partially working - extra fields are silently ignored

---

#### **Signup Flow: INVESTOR**
1. **Route:** `POST /api/auth/register`
2. **Frontend:** [frontend-react/src/pages/auth/InvestorSignup.tsx](frontend-react/src/pages/auth/InvestorSignup.tsx#L42-56)
3. **Request Payload:**
   ```javascript
   {
     name: "FirstName LastName",
     email: "...",
     phone: "...",
     password: "...",
     occupation: "...",
     investmentBudget: "...",
     investmentGoal: "...",
     riskTolerance: "...",
     investmentHorizon: "..."
   }
   ```
4. **Backend Controller:** Same as others
   - ❌ **CRITICAL FAILURE:** No investor token is generated or stored
   - ❌ **FAILURE POINT:** Does NOT validate or store investor-specific fields
5. **Database Write:** `User` collection only (no `investorToken` field in schema)
6. ⚠️ **STATUS:** Partially working - missing investor token system

---

#### **Signup Flow: AGENT**
1. **Route:** `POST /api/auth/register`
2. **Frontend:** [frontend-react/src/pages/auth/AgentSignup.tsx](frontend-react/src/pages/auth/AgentSignup.tsx#L49-68)
3. **Request Payload:**
   ```javascript
   {
     name: "FirstName LastName",
     email: "...",
     phone: "...",
     password: "...",
     yearsOfExperience: "...",
     currentEmployer: "...",
     licenseNumber: "...",
     specialization: [...],
     motivation: "..."
   }
   ```
4. **Backend Controller:** Same as others
   - ❌ **FAILURE POINT:** Does NOT validate or store agent-specific fields
5. **Database Write:** `User` collection only
6. ⚠️ **STATUS:** Partially working - extra fields are silently ignored

---

### 5️⃣ PAGES IMPLEMENTED vs MISSING

#### **Frontend React Pages (Implemented):**
✅ [src/pages/HomePage.tsx](frontend-react/src/pages/HomePage.tsx)  
✅ [src/pages/AboutPage.tsx](frontend-react/src/pages/AboutPage.tsx)  
✅ [src/pages/ContactPage.tsx](frontend-react/src/pages/ContactPage.tsx)  
✅ [src/pages/LoginPage.tsx](frontend-react/src/pages/LoginPage.tsx)  
✅ [src/pages/PropertyListPage.tsx](frontend-react/src/pages/PropertyListPage.tsx)  
✅ [src/pages/PropertyDetailsPage.tsx](frontend-react/src/pages/PropertyDetailsPage.tsx)  
✅ [src/pages/DashboardPage.tsx](frontend-react/src/pages/DashboardPage.tsx)  
✅ [src/pages/ForgotPasswordPage.tsx](frontend-react/src/pages/ForgotPasswordPage.tsx) - UI only, no backend  

**Role-Based Signup Pages:**  
✅ [src/pages/auth/RoleSelector.tsx](frontend-react/src/pages/auth/RoleSelector.tsx)  
✅ [src/pages/auth/LandlordSignup.tsx](frontend-react/src/pages/auth/LandlordSignup.tsx)  
✅ [src/pages/auth/TenantSignup.tsx](frontend-react/src/pages/auth/TenantSignup.tsx)  
✅ [src/pages/auth/InvestorSignup.tsx](frontend-react/src/pages/auth/InvestorSignup.tsx)  
✅ [src/pages/auth/AgentSignup.tsx](frontend-react/src/pages/auth/AgentSignup.tsx)  

**Role-Based Dashboards:**  
✅ [src/pages/dashboards/AdminDashboard.tsx](frontend-react/src/pages/dashboards/AdminDashboard.tsx)  
✅ [src/pages/dashboards/LandlordDashboard.tsx](frontend-react/src/pages/dashboards/LandlordDashboard.tsx)  
✅ [src/pages/dashboards/TenantDashboard.tsx](frontend-react/src/pages/dashboards/TenantDashboard.tsx)  
✅ [src/pages/dashboards/InvestorDashboard.tsx](frontend-react/src/pages/dashboards/InvestorDashboard.tsx)  
✅ [src/pages/dashboards/AgentDashboard.tsx](frontend-react/src/pages/dashboards/AgentDashboard.tsx)  

#### **Static HTML Pages (Legacy - Unused):**
[frontend/*.html](frontend/) - 18 HTML files (not integrated with React app)

#### **Missing Pages/Features:**
❌ Email verification page  
❌ Password reset page (exists in UI, no backend)  
❌ User profile edit page  
❌ Payment/transaction pages  
❌ Property approval workflow UI for admin  
❌ Deal sealing/closing UI  
❌ Investment tracking pages  
❌ Agent training/onboarding pages  
❌ Maintenance request pages  

---

### 6️⃣ BACKEND ROUTES IMPLEMENTED

| Route | File | Auth | Description |
|-------|------|------|-------------|
| `/api/auth/*` | [authRoutes.js](backend/routes/authRoutes.js) | Public | Login, Register only |
| `/api/properties/*` | [propertyRoutes.js](backend/routes/propertyRoutes.js) | Mixed | CRUD, filtering, premium |
| `/api/inquiries/*` | [inquiryRoutes.js](backend/routes/inquiryRoutes.js) | Protected | Property inquiries |
| `/api/tenants/*` | [tenantRoutes.js](backend/routes/tenantRoutes.js) | Protected | Tenant operations |
| `/api/agents/*` | [agentRoutes.js](backend/routes/agentRoutes.js) | Protected | Agent operations |
| `/api/landlords/*` | [landlordRoutes.js](backend/routes/landlordRoutes.js) | Protected | Landlord dashboard |
| `/api/notifications/*` | [notificationRoutes.js](backend/routes/notificationRoutes.js) | Protected | Notifications |
| `/api/favorites/*` | [favoriteRoutes.js](backend/routes/favoriteRoutes.js) | Protected | Favorite properties |
| `/api/admin/*` | ⚠️ [adminRoutes.js](backend/routes/adminRoutes.js) | Admin only | User management, stats |
| `/api/investor/*` | [investorRoutes.js](backend/routes/investorRoutes.js) | Protected | Investor dashboard |

**Note:** Admin routes exist but are NOT registered in [server.js](backend/server.js) - routes are NOT accessible!

---

## ⚠️ TOP 10 PRODUCTION RISKS/BUGS

### 🔴 CRITICAL (Show Stoppers)

#### 1. **Admin Routes Not Registered**
- **File:** [backend/server.js](backend/server.js#L110-119)
- **Issue:** Admin routes exist at [backend/routes/adminRoutes.js](backend/routes/adminRoutes.js) but are NOT imported or mounted
- **Impact:** Cannot access `/api/admin/*` endpoints - admin functionality is completely broken
- **Fix Required:** Add `const adminRoutes = require("./routes/adminRoutes");` and `app.use("/api/admin", adminRoutes);`

#### 2. **Investor Routes Not Registered**
- **File:** [backend/server.js](backend/server.js#L110-119)
- **Issue:** Investor routes exist at [backend/routes/investorRoutes.js](backend/routes/investorRoutes.js) but are NOT imported or mounted
- **Impact:** Investor dashboard will fail to load data
- **Fix Required:** Add `const investorRoutes = require("./routes/investorRoutes");` and `app.use("/api/investor", investorRoutes);`

#### 3. **Role-Specific Signup Data Loss**
- **File:** [backend/controllers/authController.js](backend/controllers/authController.js#L5-40)
- **Issue:** Register endpoint only saves `name, email, password, role` - all role-specific fields (occupation, investmentBudget, propertyTypes, etc.) are silently ignored
- **Impact:** Users sign up successfully but their profile data is lost, causing errors in dashboards
- **Root Cause:** No validation or storage for extended user fields
- **Fix Required:** Extend User schema or create role-specific collections

#### 4. **Investor Token System Missing**
- **Issue:** Investor signup promises "unique investor token" but:
  - No `investorToken` field in User schema ([backend/models/User.js](backend/models/User.js))
  - No token generation logic in registration
  - Frontend expects `investorToken` ([frontend-react/src/context/AuthContext.tsx](frontend-react/src/context/AuthContext.tsx#L15))
- **Impact:** Investors cannot track investments or growth
- **Evidence:** Only found in seed script ([backend/seed-database.js](backend/seed-database.js#L228))
- **Fix Required:** Add field to schema + generation logic

#### 5. **Property Approval System Missing Status Enum**
- **File:** [backend/models/Property.js](backend/models/Property.js#L20-24)
- **Issue:** Property status enum is `['available', 'rented', 'sold', 'featured']` but code uses `'pending'`, `'approved'`, `'rejected'` everywhere
- **Impact:** Property approval workflow is completely broken - new properties cannot be marked as pending
- **Evidence:** 
  - Code uses: [backend/controllers/landlordController.js](backend/controllers/landlordController.js#L36)
  - Schema doesn't allow it: [backend/models/Property.js](backend/models/Property.js#L21)
- **Fix Required:** Change enum to `['pending', 'approved', 'rejected', 'rented', 'sold']`

#### 6. **No Property Approval Endpoints**
- **Issue:** Admin routes exist but have no endpoints for:
  - Approving properties
  - Rejecting properties
  - Viewing pending properties
- **Impact:** Landlords submit properties but admin cannot approve them
- **Evidence:** Email template exists ([backend/utils/emailTemplates.js](backend/utils/emailTemplates.js#L176)) but no endpoint calls it
- **Fix Required:** Add `PUT /api/admin/properties/:id/approve` and `PUT /api/admin/properties/:id/reject`

### 🟠 HIGH (Will Cause Errors)

#### 7. **Orphaned Database Models**
- **Files:** 
  - [backend/models/Landlord.js](backend/models/Landlord.js)
  - [backend/models/Tenant.js](backend/models/Tenant.js)
  - [backend/models/Agent.js](backend/models/Agent.js)
- **Issue:** Separate role models exist but are NEVER used - all data goes to User collection
- **Impact:** Schema duplication, confusion, potential data inconsistency
- **Decision Needed:** Delete unused models OR migrate to role-specific collections
- **Risk:** Breaking code that might reference these models

#### 8. **No Deal/Transaction Model**
- **Issue:** "Seal Deal" flow mentioned in requirements but no database model exists
- **Impact:** Cannot implement payment tracking, deal closing, or landlord notifications
- **Evidence:** Only text reference in [backend/utils/emailTemplates.js](backend/utils/emailTemplates.js#L160)
- **Fix Required:** Create `Deal` or `Transaction` model with:
  - propertyId, userId, landlordId, amount, status, paymentDetails, createdAt

#### 9. **Missing RBAC on Property Endpoints**
- **File:** [backend/routes/propertyRoutes.js](backend/routes/propertyRoutes.js#L21-28)
- **Issue:** `GET /api/properties/:id` and `GET /api/properties` have NO role checks
- **Current State:** Anyone can view all properties (might be intentional for public listings)
- **Risk:** If properties have "draft" or "private" status, they're exposed
- **Fix Needed:** Add query filters based on user role (investors see approved only, landlords see their own)

#### 10. **Token Payload Inconsistency**
- **Issue:** JWT token payload inconsistent across files:
  - User model: `{ id: this._id, role: this.role }` ([backend/models/User.js](backend/models/User.js#L51))
  - Auth controller: `{ userId: newUser._id, role: newUser.role }` ([backend/controllers/authController.js](backend/controllers/authController.js#L37))
  - Middleware expects: `decoded.id` ([backend/middleware/authMiddleware.js](backend/middleware/authMiddleware.js#L16))
- **Impact:** Some tokens might fail authentication due to field name mismatch
- **Fix Required:** Standardize on either `id` or `userId` everywhere

---

## 🟡 MEDIUM RISKS (Stability Issues)

- No email verification (verified field exists but never set to true)
- No password reset backend implementation
- No refresh token mechanism (tokens expire after 7 days, forcing re-login)
- Cloudinary credentials likely in .env (not validated on startup)
- MongoDB connection has no retry logic
- No rate limiting on signup endpoint (only on auth routes generally)
- Socket.io initialized but not fully utilized
- CORS allows all origins in development mode
- No database migration system
- No API versioning (/v1/)

---

## 📋 SCHEMA MISMATCH TABLE

| Collection | Schema File | Used By | Status |
|------------|-------------|---------|--------|
| User | [models/User.js](backend/models/User.js) | Auth, all roles | ✅ Active |
| Property | [models/Property.js](backend/models/Property.js) | Property routes | ⚠️ Broken status enum |
| Landlord | [models/Landlord.js](backend/models/Landlord.js) | **NONE** | ❌ Orphaned |
| Tenant | [models/Tenant.js](backend/models/Tenant.js) | **NONE** | ❌ Orphaned |
| Agent | [models/Agent.js](backend/models/Agent.js) | **NONE** | ❌ Orphaned |
| Inquiry | [models/Inquiry.js](backend/models/Inquiry.js) | Inquiry routes | ✅ Active |
| Notification | [models/Notification.js](backend/models/Notification.js) | Notification routes | ✅ Active |
| Favorite | [models/Favorite.js](backend/models/Favorite.js) | Favorite routes | ✅ Active |
| PropertyType | [models/PropertyType.js](backend/models/PropertyType.js) | Unknown | ⚠️ Not verified |
| Investor | **MISSING** | Investor routes | ❌ Should exist |
| Deal | **MISSING** | **NONE** | ❌ Needed |
| Investment | **MISSING** | Investor routes | ❌ Needed |

---

## 🎯 IMMEDIATE ACTION ITEMS

### Must Fix Today:
1. ✅ Add admin routes to server.js
2. ✅ Add investor routes to server.js
3. ✅ Fix Property status enum
4. ✅ Add property approval endpoints
5. ✅ Add investorToken to User schema + generation logic

### Fix This Week:
6. ✅ Extend User schema with role-specific fields OR create proper role collections
7. ✅ Create Deal/Transaction model
8. ✅ Implement deal sealing endpoints
9. ✅ Add RBAC enforcement to property queries
10. ✅ Standardize JWT payload structure

---

## 📈 SYSTEM ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ HomePage │  │  Login   │  │ Signup   │  │Dashboard │   │
│  │          │  │  Page    │  │  Pages   │  │  Pages   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       └─────────────┴─────────────┴─────────────┘           │
│                        │                                     │
│                   AuthContext                                │
│                   (Zustand State)                            │
│                        │                                     │
│                   API Service                                │
│                   (Axios + JWT)                              │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Middleware Layer                    │ │
│  │  • CORS  • Helmet  • Rate Limit  • Auth (JWT)         │ │
│  └────────────────────────────────────────────────────────┘ │
│                         │                                    │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │  Auth    │ Property │ Landlord │ Investor │  Admin   │  │
│  │  Routes  │  Routes  │  Routes  │  Routes  │  Routes  │  │
│  │          │          │          │  (❌)    │  (❌)    │  │
│  └────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬─────┘  │
│       │          │          │          │          │          │
│  ┌────┴──────────┴──────────┴──────────┴──────────┴─────┐  │
│  │                   Controllers                         │  │
│  │  • registerUser  • getProperties  • getDashboard      │  │
│  └───────────────────────────┬───────────────────────────┘  │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│                                                              │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │   User   │ Property │ Inquiry  │ Favorite │  Notif.  │  │
│  │   (✅)   │  (⚠️)    │   (✅)   │   (✅)   │   (✅)   │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│                                                              │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Landlord │  Tenant  │  Agent   │ Investor │   Deal   │  │
│  │  (❌)    │  (❌)    │  (❌)    │  (❌)    │  (❌)    │  │
│  │ Orphaned │ Orphaned │ Orphaned │ Missing  │ Missing  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘

Legend:
✅ Fully Implemented
⚠️  Partially Working / Has Issues
❌ Missing / Not Registered / Broken
```

---

## 🔐 SECURITY AUDIT SUMMARY

### ✅ Security Measures Present:
- Helmet (XSS protection)
- CORS configuration
- MongoDB sanitization (SQL injection prevention)
- HPP (parameter pollution)
- Rate limiting on auth routes
- Password hashing (bcrypt)
- JWT authentication

### ⚠️ Security Concerns:
- No refresh tokens (long-lived access tokens)
- Tokens stored in localStorage (XSS vulnerable)
- No HTTPS enforcement check
- No input validation library (only manual checks)
- Admin routes not protected from discovery (once registered)
- No CSRF protection
- No 2FA/MFA option

---

**End of Production Readiness Map**

---

# 🔧 NEXT STEPS

Proceed to detailed debugging and fixes in the following order:
1. Role-based Signup Debugger
2. RBAC Lockdown
3. Investor Token Implementation
4. Property Approval System
5. Deal Sealing Flow
6. Rename Solid Build → Solid Build Construction Limited
7. Production Checklist & Today's Deliverables
