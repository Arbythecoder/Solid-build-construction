# ⚡ QUICK TEST - Once MongoDB is Whitelisted

**Your Current IP:** `105.113.65.114`

---

## Step 1: Whitelist Your IP in MongoDB Atlas

1. Go to: https://cloud.mongodb.com
2. Click: **"Network Access"** (left sidebar)
3. Click: **"ADD IP ADDRESS"** button

**Option A - Specific IP (More Secure):**
- Add IP: `105.113.65.114`
- Click "Confirm"

**Option B - Allow From Anywhere (Easier for Testing):**
- Click "ALLOW ACCESS FROM ANYWHERE"
- IP will be: `0.0.0.0/0`
- Click "Confirm"

4. **WAIT 2-3 MINUTES** for changes to apply

---

## Step 2: Test Connection

Open terminal and run:

```bash
cd backend
node test-db-connection.js
```

**Expected Output:**
```
✅ SUCCESS! MongoDB Connected
📍 Database: afodams-properties
✅ Connection is working perfectly!
```

---

## Step 3: Seed Database with Sample Data

```bash
cd backend
node seed-database.js
```

**Expected Output:**
```
✅ MongoDB Connected
🗑️  Cleaning database...
✅ Database cleaned
👥 Creating users...
✅ Admin created: admin@afodams.com / Admin123!
✅ Landlord created: landlord@test.com / Test123456
✅ Tenant created: tenant@test.com / Test123456
✅ Investor created: investor@test.com / Test123456
✅ Agent created: agent@test.com / Test123456
🏠 Creating properties...
✅ Created 6 properties

🎉 DATABASE SEEDED SUCCESSFULLY!

📋 TEST ACCOUNTS:
================================
Admin:     admin@afodams.com / Admin123!
Landlord:  landlord@test.com / Test123456
Tenant:    tenant@test.com / Test123456
Investor:  investor@test.com / Test123456
Agent:     agent@test.com / Test123456
================================
```

---

## Step 4: Start Backend Server

**Terminal 1:**
```bash
cd backend
npm start
```

**Expected Output:**
```
Server running in production mode on port 5000
✅ MongoDB Connected Successfully
📍 Database: afodams-properties
```

---

## Step 5: Start Frontend Server

**Terminal 2:**
```bash
cd frontend-react
npm run dev
```

**Expected Output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:3002/
```

---

## Step 6: Test the Application

1. **Open Browser:** http://localhost:3002

2. **Test Login:**
   - Go to: http://localhost:3002/login
   - Email: `landlord@test.com`
   - Password: `Test123456`
   - Should redirect to dashboard

3. **Test Properties:**
   - Go to: http://localhost:3002/properties
   - Should see 6 sample properties

4. **Test Property Detail:**
   - Click any property
   - Should see full property details

---

## ❌ If Still Not Working:

### Error: "Could not connect to any servers"
**Solution:** IP not whitelisted yet. Wait 2-3 minutes and try again.

### Error: "Authentication failed"
**Solution:** Check username/password in .env file matches MongoDB Atlas user.

### Error: "Network timeout"
**Solution:** Check your internet connection.

---

## 📞 Once Working:

Let me know and I'll:
1. ✅ Integrate all 10 Week 2+3 components
2. ✅ Test everything end-to-end
3. ✅ Fix any bugs
4. ✅ Prepare for production deployment

---

**Next:** Just whitelist the IP and run the tests above! 🚀
