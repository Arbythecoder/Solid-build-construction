# ✅ NAMECHEAP DEPLOYMENT - PRE-FLIGHT CHECKLIST

**Date:** December 30, 2024
**Your Setup:** Namecheap Domain + Cloudflare Pages + Fly.io

---

## 🎯 DEPLOYMENT OVERVIEW

You're deploying:
- **Frontend:** Cloudflare Pages (FREE) → Your Namecheap domain
- **Backend:** Fly.io (FREE) → api.yourdomain.com
- **Database:** MongoDB Atlas (Already configured ✅)
- **Domain:** Namecheap (your existing domain)

**Total Monthly Cost:** ₦0 (100% FREE hosting) + Your domain renewal

---

## ✅ WHAT'S ALREADY CONFIGURED

### Backend ✅
- ✅ MongoDB Atlas connection string configured
- ✅ All dependencies installed
- ✅ `fly.toml` configuration ready
- ✅ JWT secret configured
- ✅ All API routes working
- ✅ Socket.io configured
- ✅ File upload (Multer) configured
- ✅ Security middleware (Helmet, CORS, Rate limiting)

### Frontend ✅
- ✅ All dependencies installed
- ✅ `wrangler.toml` configured for Cloudflare
- ✅ `vite.config.ts` properly set with `base: '/'`
- ✅ React Router configured
- ✅ API service layer ready
- ✅ Responsive design complete
- ✅ All pages functional

---

## ⚠️ ITEMS THAT NEED ATTENTION BEFORE DEPLOYMENT

### 1. Backend Environment Variables (CRITICAL)

Your [backend/.env](backend/.env) currently has:
- ✅ `MONGO_URI` - Configured with MongoDB Atlas
- ✅ `JWT_SECRET` - Configured
- ⚠️ `NODE_ENV=development` - **NEEDS TO CHANGE to `production`**
- ⚠️ `CORS_ORIGIN=http://localhost:5173` - **NEEDS TO CHANGE to your domain**

**What you need to do:**

```env
# Update these in backend/.env for production
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**For Fly.io deployment**, you'll set these as secrets (not in .env):

```powershell
fly secrets set MONGO_URI="mongodb+srv://forfashionpassion690_db_user:SLXc5rx1y1eKzbU2@Solid Buildcluster.5aauutk.mongodb.net/Solid Build-properties?retryWrites=true&w=majority&appName=Solid Buildcluster"
fly secrets set JWT_SECRET="43c3d8cb8b59e724943b5a2a0287b9c54b78eaa363f931dd5c5acd760318bdc4"
fly secrets set CORS_ORIGIN="https://yourdomain.com"
```

### 2. Frontend Environment Variables (CRITICAL)

Your [frontend-react/.env.production](frontend-react/.env.production) currently has:
- ⚠️ `VITE_API_URL=https://your-railway-app.railway.app` - **PLACEHOLDER**

**What you need to do:**

After deploying backend to Fly.io, update this to:
```env
VITE_API_URL=https://Solid Build-backend.fly.dev
```

Or if using custom domain:
```env
VITE_API_URL=https://api.yourdomain.com
```

### 3. Optional Services (Can add later)

These are configured in `.env` but not required immediately:
- ⏳ **Cloudinary** (for image uploads) - Currently has placeholder
- ⏳ **Paystack** (for payments) - Currently has placeholder
- ⏳ **SendGrid** (for emails) - Currently has placeholder

**Action:** Leave as-is for now. Add real credentials later when needed.

---

## 📋 STEP-BY-STEP DEPLOYMENT CHECKLIST

### Phase 1: Prepare Backend ✅

- [ ] **Test backend locally**
  ```powershell
  cd backend
  npm install
  npm start
  ```
  Should see: "Server running on port 5000" and "MongoDB Connected"

- [ ] **Install Fly.io CLI** (if not installed)
  ```powershell
  iwr https://fly.io/install.ps1 -useb | iex
  ```

- [ ] **Login to Fly.io**
  ```powershell
  fly auth login
  ```

- [ ] **Create Fly.io app** (first time only)
  ```powershell
  cd backend
  fly launch --name Solid Build-backend --region fra --no-deploy
  ```

- [ ] **Set production secrets**
  ```powershell
  fly secrets set MONGO_URI="[your MongoDB Atlas URI]"
  fly secrets set JWT_SECRET="[your JWT secret]"
  fly secrets set CORS_ORIGIN="https://yourdomain.com"
  fly secrets set NODE_ENV="production"
  ```

- [ ] **Deploy backend**
  ```powershell
  fly deploy
  ```

- [ ] **Test backend deployment**
  - Visit: `https://Solid Build-backend.fly.dev/health`
  - Should return: `{"status":"ok"}`
  - Visit: `https://Solid Build-backend.fly.dev/api-docs`
  - Swagger docs should load

### Phase 2: Prepare Frontend ✅

- [ ] **Update `.env.production` with backend URL**
  ```env
  VITE_API_URL=https://Solid Build-backend.fly.dev
  ```

- [ ] **Test frontend build locally**
  ```powershell
  cd frontend-react
  npm run build
  ```
  Should create `dist/` folder without errors

- [ ] **Install Wrangler CLI** (if not installed)
  ```powershell
  npm install -g wrangler
  ```

- [ ] **Login to Cloudflare**
  ```powershell
  wrangler login
  ```

- [ ] **Deploy to Cloudflare Pages**
  ```powershell
  cd frontend-react
  npm run build
  wrangler pages deploy dist --project-name=Solid Build-property
  ```

- [ ] **Test Cloudflare deployment**
  - Visit: `https://Solid Build-property.pages.dev`
  - Should load homepage
  - Test signup/login

### Phase 3: Connect Namecheap Domain 🌐

- [ ] **Login to Namecheap**
  - Go to: https://www.namecheap.com
  - Domain List → Manage your domain

- [ ] **Add DNS Records (Advanced DNS tab)**

  **For main domain:**
  ```
  Type: CNAME
  Host: @
  Value: Solid Build-property.pages.dev
  TTL: Automatic
  ```

  **For www:**
  ```
  Type: CNAME
  Host: www
  Value: Solid Build-property.pages.dev
  TTL: Automatic
  ```

  **For backend API:**
  ```
  Type: CNAME
  Host: api
  Value: Solid Build-backend.fly.dev
  TTL: Automatic
  ```

- [ ] **Wait for DNS propagation** (10-60 minutes)
  - Check status: https://dnschecker.org

- [ ] **Add custom domain to Cloudflare Pages**
  ```powershell
  wrangler pages domain add yourdomain.com --project-name=Solid Build-property
  wrangler pages domain add www.yourdomain.com --project-name=Solid Build-property
  ```

- [ ] **Add SSL certificate to Fly.io**
  ```powershell
  fly certs add api.yourdomain.com
  ```

- [ ] **Update CORS_ORIGIN in Fly.io**
  ```powershell
  fly secrets set CORS_ORIGIN="https://yourdomain.com,https://www.yourdomain.com"
  ```

- [ ] **Rebuild and redeploy frontend with custom domain**
  ```powershell
  # Update .env.production
  VITE_API_URL=https://api.yourdomain.com

  # Build and deploy
  npm run build
  wrangler pages deploy dist --project-name=Solid Build-property
  ```

### Phase 4: Final Testing 🧪

- [ ] **Test main domain**
  - Visit: `https://yourdomain.com`
  - Homepage loads ✅
  - All pages work ✅
  - Mobile responsive ✅

- [ ] **Test www domain**
  - Visit: `https://www.yourdomain.com`
  - Should redirect or work ✅

- [ ] **Test backend API**
  - Visit: `https://api.yourdomain.com/health`
  - Returns `{"status":"ok"}` ✅
  - Visit: `https://api.yourdomain.com/api-docs`
  - Swagger loads ✅

- [ ] **Test user registration**
  - Go to signup page
  - Register as tenant
  - Should succeed ✅

- [ ] **Test user login**
  - Login with registered account
  - Should redirect to dashboard ✅

- [ ] **Test properties**
  - Properties load on homepage ✅
  - Search works ✅
  - Filters work ✅
  - Property details page loads ✅

- [ ] **Test contact form**
  - Submit inquiry
  - Should save to database ✅

- [ ] **Test mobile**
  - Open on phone
  - Navigation works ✅
  - Forms work ✅
  - Responsive design ✅

---

## 🚨 IMPORTANT NOTES

### MongoDB Atlas
✅ **Already configured** - Your connection string is working
- Database: `Solid Build-properties`
- Cluster: `Solid Buildcluster`
- **Action needed:** Make sure IP whitelist allows all IPs (0.0.0.0/0) for Fly.io

### Cloudinary (Optional - for image uploads)
⏳ **Not required immediately**
- Current config uses Multer (local file storage)
- Can add Cloudinary later for better image hosting
- **Action:** Update credentials when ready

### Paystack (Optional - for payments)
⏳ **Not required immediately**
- Payment features not critical for launch
- **Action:** Add real API keys when ready to accept payments

### SendGrid (Optional - for emails)
⏳ **Not required immediately**
- Email notifications not critical for launch
- **Action:** Configure when you want automated emails

---

## 💰 COST BREAKDOWN

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Namecheap Domain | Paid | ₦[your renewal cost]/year |
| Cloudflare Pages | FREE | ₦0 |
| Fly.io | FREE | ₦0 |
| MongoDB Atlas | FREE (M0) | ₦0 |
| SSL Certificates | FREE | ₦0 |
| **TOTAL** | | **₦0/month** 🎉 |

---

## 🆘 TROUBLESHOOTING

### Issue: Backend not connecting to MongoDB
**Solution:**
1. Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
2. Verify `MONGO_URI` secret in Fly.io is correct
3. Check Fly.io logs: `fly logs`

### Issue: CORS errors in browser console
**Solution:**
1. Verify `CORS_ORIGIN` includes your domain
2. Check frontend is using correct API URL
3. Clear browser cache

### Issue: DNS not resolving
**Solution:**
1. Wait longer (can take up to 24 hours)
2. Check https://dnschecker.org
3. Verify CNAME records in Namecheap

### Issue: SSL certificate error
**Solution:**
1. Wait 10-15 minutes for auto-provisioning
2. Cloudflare and Fly.io handle SSL automatically
3. Check certificate status: `fly certs show api.yourdomain.com`

### Issue: Frontend shows 404 for routes
**Solution:**
- Not applicable - you're using BrowserRouter correctly
- Cloudflare Pages handles SPA routing automatically

### Issue: Fly.io app sleeps/slow first request
**Solution:**
- FREE tier sleeps after inactivity
- First request wakes it up (~5 seconds)
- Upgrade to paid tier OR use UptimeRobot to ping every 14 min

---

## 📞 QUICK REFERENCE

### Useful Commands

**Backend:**
```powershell
fly status                    # Check backend status
fly logs                      # View backend logs
fly secrets list              # List environment variables
fly secrets set KEY=value     # Add/update secret
fly deploy                    # Redeploy backend
fly certs list                # List SSL certificates
```

**Frontend:**
```powershell
npm run build                             # Build for production
wrangler pages deploy dist                # Deploy to Cloudflare
wrangler pages deployment list            # List deployments
wrangler pages domain list                # List custom domains
```

**Testing:**
```powershell
# Test backend
curl https://Solid Build-backend.fly.dev/health

# Test frontend
curl -I https://yourdomain.com
```

### Important URLs

- **MongoDB Atlas:** https://cloud.mongodb.com
- **Fly.io Dashboard:** https://fly.io/dashboard
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **Namecheap:** https://www.namecheap.com
- **DNS Checker:** https://dnschecker.org

---

## 🎯 WHAT YOUR DOMAIN SHOULD BE

Please tell me:
1. **What domain did you purchase from Namecheap?**
   - Example: `Solid Buildproperty.com` or `yourdomain.ng`

2. **Do you want to use:**
   - Option A: Main domain only (`yourdomain.com`)
   - Option B: Both main and www (`yourdomain.com` + `www.yourdomain.com`)
   - Option C: Subdomain for API (`api.yourdomain.com`)

Once you tell me your domain, I can give you exact DNS records to add in Namecheap.

---

## ✅ FINAL CHECKLIST BEFORE GOING LIVE

- [ ] Backend deployed to Fly.io and responding
- [ ] Frontend deployed to Cloudflare Pages
- [ ] DNS records added in Namecheap
- [ ] Custom domain working on Cloudflare
- [ ] SSL certificates active (automatic)
- [ ] CORS configured with production domain
- [ ] All environment variables set correctly
- [ ] Database connection working
- [ ] User registration/login working
- [ ] Properties loading correctly
- [ ] Forms submitting successfully
- [ ] Mobile testing complete
- [ ] Browser compatibility tested (Chrome, Firefox, Safari, Edge)

---

## 🚀 ESTIMATED DEPLOYMENT TIME

- **Backend to Fly.io:** 5-10 minutes
- **Frontend to Cloudflare:** 5-10 minutes
- **DNS configuration:** 10-60 minutes (propagation time)
- **Testing:** 15-30 minutes

**Total Time:** 35-110 minutes (~1-2 hours)

---

## 🎉 READY TO DEPLOY?

Everything is configured and ready! Here's what you need:

1. **Your Namecheap domain name** (what domain did you buy?)
2. **15-20 minutes** for the deployment
3. **Coffee** ☕ while DNS propagates

**Reply with your domain name and I'll guide you through each step!**
