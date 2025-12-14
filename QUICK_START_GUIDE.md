# 🚀 QUICK START GUIDE - Run Your Website Locally

## ⚡ FASTEST WAY TO RUN

### Option 1: Use Start Script (Easiest!)

**I'll create a single script to start everything:**

Create `start-all.bat`:
```batch
@echo off
start "Backend Server" cmd /k "cd backend && node server.js"
timeout /t 3
start "Frontend Server" cmd /k "cd frontend-react && npm start"
start http://localhost:3000
```

**Just double-click `start-all.bat`!** Done! ✅

---

### Option 2: Manual Start (2 Terminals)

**Terminal 1 - Backend:**
```powershell
cd C:\Users\Arbythecoder\Desktop\afodamspropertylimited\backend
node server.js
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\Arbythecoder\Desktop\afodamspropertylimited\frontend-react
npm start
```

---

## 🔧 IF SIGNUP/LOGIN ISN'T WORKING

### Check These:

**1. Is Backend Running?**
Open: http://localhost:5000/health
- Should show: `{"status":"ok"}`
- If not, backend isn't running

**2. Is MongoDB Connected?**
Look at backend terminal:
- Should show: `✅ MongoDB Connected Successfully`
- If not, check `.env` file has `MONGO_URI`

**3. Is Frontend Connecting?**
Check browser console (F12):
- Should NOT show "ERR_CONNECTION_REFUSED"
- Should NOT show "Cannot connect to server"

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: "Cannot connect to server"

**Cause:** Backend not running
**Fix:**
```powershell
cd backend
node server.js
```

---

### Issue 2: "MongoDB connection failed"

**Cause:** MongoDB Atlas not accessible
**Fix:** Check internet connection and `.env` file

---

### Issue 3: Port already in use

**Cause:** Old server still running
**Fix:**
```powershell
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

### Issue 4: Frontend shows 404

**Cause:** Wrong API URL
**Fix:** Check `frontend-react/src/services/api.ts`:
```typescript
const API_URL = 'http://localhost:5000'
```

---

## ✅ VERIFICATION CHECKLIST

After starting both servers:

- [ ] Backend running: http://localhost:5000/health shows "ok"
- [ ] Frontend running: http://localhost:3000 shows homepage
- [ ] Can see properties on homepage
- [ ] WhatsApp button visible (green, bottom right)
- [ ] Services section visible (scroll down)
- [ ] Can open signup page
- [ ] Can type in signup form

---

## 🌐 URLS TO OPEN

**Frontend:**
- Homepage: http://localhost:3000
- Properties: http://localhost:3000/#/properties
- Contact: http://localhost:3000/#/contact
- Login: http://localhost:3000/#/login
- Signup: http://localhost:3000/#/signup

**Backend:**
- Health: http://localhost:5000/health
- API Docs: http://localhost:5000/api-docs

---

## 🎯 WHAT YOU SHOULD SEE

### Backend Terminal:
```
🚀 Server running in development mode on port 5000
📚 API Docs available at http://localhost:5000/api-docs
✅ MongoDB Connected Successfully
📍 Database: afodams-properties
```

### Frontend Terminal:
```
VITE v5.4.21  ready in 500 ms

➜  Local:   http://localhost:3000/
```

### Browser (http://localhost:3000):
- Beautiful homepage with hero section
- Search bar
- Featured properties
- Services section (6 cards)
- Mobile App Coming Soon section
- Green WhatsApp button (bottom right)
- Footer

---

## 🔄 TO RESTART

**Stop:**
- Press `Ctrl + C` in each terminal

**Start Again:**
- Run commands from "Option 2" above
- OR double-click `start-all.bat`

---

**Need Help?** Check the error message in terminal and match it to the fixes above!
