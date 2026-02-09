# 🚀 Deploy via CLI - Cloudflare Pages + Fly.io

## Quick Overview

- **Frontend** → Cloudflare Pages (faster, free, unlimited bandwidth)
- **Backend** → Fly.io (free tier, fast, global)

---

## 📦 STEP 1: Install CLI Tools

### A. Install Cloudflare Wrangler (Frontend)

```powershell
npm install -g wrangler
```

Verify installation:
```powershell
wrangler --version
```

### B. Install Fly.io CLI (Backend)

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

Verify installation:
```powershell
fly version
```

---

## ☁️ STEP 2: Deploy Frontend to Cloudflare Pages

### Login to Cloudflare

```powershell
cd C:\Users\Arbythecoder\Desktop\Solid Buildpropertylimited\frontend-react
wrangler login
```

This will open browser → Login to Cloudflare account

### Deploy Frontend

```powershell
# Build first
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=Solid Build-property
```

**First time setup:**
- Wrangler will ask: "Create a new project?"
- Answer: **Yes**
- Project name: `Solid Build-property`
- Production branch: `main`

**Output:**
```
✨ Success! Deployed to Cloudflare Pages!
🌐 https://Solid Build-property.pages.dev
```

### Set Environment Variables (if needed)

```powershell
wrangler pages secret put VITE_API_URL
# Enter: https://Solid Build-backend.fly.dev
```

---

## 🚁 STEP 3: Deploy Backend to Fly.io

### Login to Fly.io

```powershell
cd C:\Users\Arbythecoder\Desktop\Solid Buildpropertylimited\backend
fly auth login
```

This will open browser → Login/Signup to Fly.io

### Initialize Fly App

```powershell
fly launch --no-deploy
```

**Answer the prompts:**
- App name: `Solid Build-backend` (or auto-generated)
- Region: `Frankfurt (fra)` or closest to Nigeria
- Setup Postgres database? → **No**
- Setup Redis? → **No**
- Deploy now? → **No** (we'll set secrets first)

This creates `fly.toml` file.

### Set Environment Variables (Secrets)

```powershell
# MongoDB URI (REQUIRED)
fly secrets set MONGO_URI="your_mongodb_atlas_connection_string"

# JWT Secret (REQUIRED)
fly secrets set JWT_SECRET="your_super_secret_jwt_key_32_characters_minimum"

# CORS (REQUIRED)
fly secrets set CORS_ORIGIN="https://Solid Build-property.pages.dev"

# Node Environment
fly secrets set NODE_ENV="production"
```

**Example MongoDB URI:**
```
fly secrets set MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/Solid Build"
```

### Deploy Backend

```powershell
fly deploy
```

**Output:**
```
==> Building image
==> Pushing image to fly
==> Deploying to Fly.io
✅ Deployed successfully!
🌐 https://Solid Build-backend.fly.dev
```

### Check Deployment Status

```powershell
fly status
fly logs
```

---

## ✅ STEP 4: Update Frontend with Backend URL

### Update Cloudflare Pages Environment Variable

```powershell
cd ../frontend-react
wrangler pages secret put VITE_API_URL
# Enter: https://Solid Build-backend.fly.dev
```

### Redeploy Frontend

```powershell
npm run build
wrangler pages deploy dist --project-name=Solid Build-property
```

---

## 🎯 STEP 5: Add Custom Domain (Optional)

### Cloudflare Pages (Frontend)

**Via CLI:**
```powershell
wrangler pages domain add Solid Buildproperty.com --project-name=Solid Build-property
```

**Or via Dashboard:**
1. Go to https://dash.cloudflare.com
2. Click your project
3. Custom domains → Add domain

### Fly.io (Backend)

**Via CLI:**
```powershell
fly certs add api.Solid Buildproperty.com
```

This creates SSL certificate automatically.

**Update DNS:**
- Add CNAME: `api` → `Solid Build-backend.fly.dev`

---

## 📊 Useful Commands

### Cloudflare Pages

```powershell
# View deployments
wrangler pages deployment list --project-name=Solid Build-property

# View logs
wrangler pages deployment tail --project-name=Solid Build-property

# Rollback to previous version
wrangler pages deployment rollback --project-name=Solid Build-property

# Delete deployment
wrangler pages delete --project-name=Solid Build-property
```

### Fly.io

```powershell
# View app status
fly status

# View logs (real-time)
fly logs

# View secrets
fly secrets list

# SSH into app
fly ssh console

# Scale app (add more instances)
fly scale count 2

# View metrics
fly dashboard metrics

# Restart app
fly apps restart Solid Build-backend

# Destroy app
fly apps destroy Solid Build-backend
```

---

## 🔄 Quick Redeploy Commands

### Update Frontend

```powershell
cd frontend-react
git pull origin main
npm run build
wrangler pages deploy dist --project-name=Solid Build-property
```

### Update Backend

```powershell
cd backend
git pull origin main
fly deploy
```

---

## 💰 Pricing (Both FREE!)

### Cloudflare Pages - FREE Tier
- ✅ Unlimited bandwidth
- ✅ Unlimited builds
- ✅ 500 builds/month
- ✅ Custom domains
- ✅ SSL certificates
- **Cost:** $0/month

### Fly.io - FREE Tier
- ✅ 3 shared-cpu VMs (256MB RAM)
- ✅ 3GB storage
- ✅ 160GB bandwidth/month
- ✅ SSL certificates
- **Cost:** $0/month

**Total:** $0/month for both! 🎉

---

## 🚨 Troubleshooting

### Cloudflare Issues

**"wrangler: command not found"**
```powershell
npm install -g wrangler
# Close and reopen PowerShell
```

**Build fails:**
```powershell
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Fly.io Issues

**"fly: command not found"**
```powershell
# Reinstall
iwr https://fly.io/install.ps1 -useb | iex
# Close and reopen PowerShell
```

**Deployment fails:**
```powershell
# Check logs
fly logs

# Check status
fly status

# Check secrets are set
fly secrets list
```

**App not starting:**
```powershell
# View recent logs
fly logs --app Solid Build-backend

# Common issue: Missing MONGO_URI
fly secrets set MONGO_URI="your_connection_string"
```

---

## 📝 Environment Variables Checklist

### Frontend (Cloudflare Pages)
- [ ] `VITE_API_URL` = Backend URL

### Backend (Fly.io)
- [ ] `MONGO_URI` = MongoDB connection string
- [ ] `JWT_SECRET` = Secret key (32+ characters)
- [ ] `CORS_ORIGIN` = Frontend URL
- [ ] `NODE_ENV` = production
- [ ] `PORT` = 8080 (auto-set by Fly.io)

---

## 🎯 Final URLs

After deployment:

**Frontend:** https://Solid Build-property.pages.dev
**Backend:** https://Solid Build-backend.fly.dev
**API Docs:** https://Solid Build-backend.fly.dev/api-docs
**Health Check:** https://Solid Build-backend.fly.dev/health

---

## ⚡ Quick Deploy Script

Save this as `deploy.bat` in project root:

```batch
@echo off
echo ========================================
echo  DEPLOYING Solid Build Construction Limited
echo ========================================
echo.

echo Building Frontend...
cd frontend-react
call npm run build
echo.

echo Deploying Frontend to Cloudflare...
call wrangler pages deploy dist --project-name=Solid Build-property
echo.

echo Deploying Backend to Fly.io...
cd ..\backend
call fly deploy
echo.

echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Frontend: https://Solid Build-property.pages.dev
echo Backend: https://Solid Build-backend.fly.dev
echo.
pause
```

Run with:
```powershell
.\deploy.bat
```

---

**Ready to deploy? Let's do it!** 🚀
