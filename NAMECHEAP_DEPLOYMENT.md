# 🌐 DEPLOY TO NAMECHEAP DOMAIN

## Overview

Since you have a Namecheap domain, here's how to connect it to your deployed website:

**Your Setup:**
- Frontend: Cloudflare Pages (FREE)
- Backend: Fly.io (FREE)
- Domain: Namecheap (your existing domain)

---

## 🚀 STEP 1: Deploy Frontend to Cloudflare Pages

### Deploy via CLI:

```powershell
cd frontend-react
npm run build
wrangler pages deploy dist --project-name=afodams-property
```

✅ You'll get: `https://afodams-property.pages.dev`

---

## 🚁 STEP 2: Deploy Backend to Fly.io

### Deploy via CLI:

```powershell
cd backend
fly deploy
```

✅ You'll get: `https://afodams-backend.fly.dev`

---

## 🌐 STEP 3: Connect Your Namecheap Domain

### Option A: Point Directly to Cloudflare Pages (Recommended)

**1. Login to Namecheap:**
- Go to: https://www.namecheap.com
- Login to your account
- Go to "Domain List"
- Click "Manage" next to your domain

**2. Add DNS Records:**

Go to "Advanced DNS" tab and add:

**For Main Domain (example.com):**
```
Type: CNAME
Host: @
Value: afodams-property.pages.dev
TTL: Automatic
```

**For WWW (www.example.com):**
```
Type: CNAME
Host: www
Value: afodams-property.pages.dev
TTL: Automatic
```

**For Backend API (api.example.com):**
```
Type: CNAME
Host: api
Value: afodams-backend.fly.dev
TTL: Automatic
```

**3. Wait for DNS Propagation:**
- Usually 10-60 minutes
- Check status: https://dnschecker.org

**4. Add Domain in Cloudflare:**

```powershell
wrangler pages domain add yourdomain.com --project-name=afodams-property
wrangler pages domain add www.yourdomain.com --project-name=afodams-property
```

**5. Add Certificate in Fly.io:**

```powershell
fly certs add api.yourdomain.com
```

---

### Option B: Transfer Domain to Cloudflare (Best Performance)

**1. Add Site to Cloudflare:**
- Go to: https://dash.cloudflare.com
- Click "Add a Site"
- Enter your domain
- Choose FREE plan
- Click "Add Site"

**2. Update Nameservers at Namecheap:**

Cloudflare will show you 2 nameservers like:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

In Namecheap:
- Domain List → Manage → Nameservers
- Select "Custom DNS"
- Enter Cloudflare's nameservers
- Save

**3. Wait 24-48 Hours:**
- DNS propagation time
- Cloudflare will email when ready

**4. Setup Pages:**
- Cloudflare Dashboard → Pages
- Connect your GitHub repo
- Deploy

**5. Domain Automatically Works!**
- Cloudflare handles everything
- Automatic SSL
- DDoS protection
- Better performance

---

## ✅ FINAL URLs

After setup, your website will be at:

- **Main Site:** https://yourdomain.com
- **WWW:** https://www.yourdomain.com
- **Backend API:** https://api.yourdomain.com
- **Health Check:** https://api.yourdomain.com/health

---

## 🔧 UPDATE FRONTEND TO USE CUSTOM DOMAIN

After deploying, update environment variable:

```powershell
wrangler pages secret put VITE_API_URL
# Enter: https://api.yourdomain.com
```

Rebuild and redeploy:
```powershell
npm run build
wrangler pages deploy dist --project-name=afodams-property
```

---

## 🧪 TEST YOUR DEPLOYMENT

**1. Check Frontend:**
- Visit: https://yourdomain.com
- Should load homepage
- Check all pages work

**2. Check Backend:**
- Visit: https://api.yourdomain.com/health
- Should show: `{"status":"ok"}`
- Visit: https://api.yourdomain.com/api-docs
- Should show Swagger docs

**3. Test Signup:**
- Go to signup page
- Register as tenant
- Should work!

**4. Test Login:**
- Use registered credentials
- Should login and redirect to dashboard

---

## 💰 COSTS

**Domain:** Whatever you paid at Namecheap (₦5k-₦15k/year)
**Cloudflare Pages:** FREE
**Fly.io:** FREE
**MongoDB Atlas:** FREE
**SSL Certificates:** FREE (automatic)

**Total Monthly Cost:** ₦0 🎉

---

## 🎯 WHICH OPTION TO CHOOSE?

### Option A (DNS Records Only)
**Pros:**
- ✅ Quick (1 hour)
- ✅ Keep domain at Namecheap
- ✅ Simple setup

**Cons:**
- ❌ Slower than Option B
- ❌ Less control

### Option B (Transfer to Cloudflare)
**Pros:**
- ✅ Fastest performance
- ✅ Better DDoS protection
- ✅ Free analytics
- ✅ Easy management

**Cons:**
- ❌ Takes 24-48 hours
- ❌ Need to move nameservers

**Recommendation:** Start with **Option A**, then move to **Option B** later if needed.

---

## 📞 Quick Command Summary

```powershell
# 1. Deploy Frontend
cd frontend-react
npm run build
wrangler pages deploy dist --project-name=afodams-property

# 2. Deploy Backend
cd ../backend
fly deploy

# 3. Add custom domain
wrangler pages domain add yourdomain.com --project-name=afodams-property
fly certs add api.yourdomain.com

# 4. Update API URL
wrangler pages secret put VITE_API_URL
# Enter: https://api.yourdomain.com

# 5. Redeploy frontend
cd ../frontend-react
npm run build
wrangler pages deploy dist --project-name=afodams-property
```

---

## 🆘 TROUBLESHOOTING

**Domain not working:**
- Check DNS propagation: https://dnschecker.org
- Wait 1-24 hours
- Verify DNS records in Namecheap

**SSL certificate error:**
- Wait for Cloudflare to provision cert (automatic)
- Usually takes 10-15 minutes

**API calls failing:**
- Check CORS settings in backend
- Verify `VITE_API_URL` is correct
- Check browser console for errors

---

**Your domain will be live within 1-24 hours after DNS setup!** 🚀
