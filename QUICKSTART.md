# ⚡ QUICKSTART - Get Everything Working in 10 Minutes

**Last Updated:** November 17, 2025

---

## 🚨 CURRENT BLOCKER: MongoDB Connection

Your MongoDB Atlas cluster blocks your IP address. Here's the fix:

### ✅ FASTEST FIX (2 minutes)

1. **Open browser:** https://cloud.mongodb.com
2. **Login** with your MongoDB account
3. **Click:** "Network Access" (left sidebar)
4. **Click:** "Add IP Address" button
5. **Click:** "ALLOW ACCESS FROM ANYWHERE" button
6. **Click:** "Confirm"
7. **Wait:** 2 minutes for changes to apply
8. **Test:** Restart backend server

---

## 🏃 ONCE MONGODB IS FIXED

### Start Backend (Terminal 1)
```bash
cd backend
npm start
```

**You should see:**
```
✅ MongoDB Connected Successfully
📍 Database: Solid Build-properties
Server running in production mode on port 5000
```

### Start Frontend (Terminal 2)
```bash
cd frontend-react
npm run dev
```

**You should see:**
```
VITE ready in XXX ms
Local: http://localhost:3002/
```

---

## 🧪 TEST IT WORKS

### Test 1: Register
1. Go to: http://localhost:3002/signup/landlord
2. Fill form and submit
3. You should see success message
4. Check MongoDB - user should be saved

### Test 2: Login
1. Go to: http://localhost:3002/login
2. Login with email/password from step 1
3. You should be redirected to dashboard

### Test 3: Add Property
1. In landlord dashboard, click "Add New Property"
2. Fill all fields
3. Submit
4. Property should appear in your listings

---

## ❌ IF STILL NOT WORKING

Try local MongoDB instead:

### Windows:
```bash
# Download: https://www.mongodb.com/try/download/community
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo
```

### Update backend/.env:
```
MONGO_URI=mongodb://localhost:27017/Solid Build-properties
```

### Restart backend:
```bash
cd backend
npm start
```

---

## 📞 NEXT STEPS

Once MongoDB works:
1. I'll create test data
2. I'll test all endpoints
3. I'll fix any bugs
4. We'll build Week 1 features systematically

**Your turn: Fix MongoDB Atlas whitelist (2 minutes) ⏰**
