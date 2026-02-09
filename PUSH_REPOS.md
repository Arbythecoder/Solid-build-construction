# 📤 Push Frontend & Backend to Separate Repos

## 🎯 Setup Plan

- **Frontend Repo:** `Solid Build-web` (existing - will repurpose for frontend only)
- **Backend Repo:** `Solid Build-backend` (new - you need to create this)

---

## ✅ STEP 1: Create Backend Repository on GitHub

1. **Go to:** https://github.com/new

2. **Fill in:**
   - **Repository name:** `Solid Build-backend`
   - **Description:** `Solid Build Construction Limited Backend API - Node.js + MongoDB`
   - **Visibility:** Public
   - **DO NOT check** any boxes (no README, no .gitignore, no license)

3. **Click "Create repository"**

4. **Keep the page open** - you'll see the URL: `https://github.com/Arbythecoder/Solid Build-backend.git`

---

## 🚀 STEP 2: Push Frontend (Using Existing Repo)

I'll push the frontend to your existing `Solid Build-web` repo.

**Just run this command:**

```bash
push-frontend.bat
```

Or manually:

```bash
cd frontend-react
git init
git add .
git commit -m "Initial commit: Solid Build Construction Limited Frontend"
git branch -M main
git remote add origin https://github.com/Arbythecoder/Solid Build-web.git
git push -u origin main --force
cd ..
```

**Frontend will be at:** https://github.com/Arbythecoder/Solid Build-web

---

## 🚀 STEP 3: Push Backend (New Repo)

After creating the backend repo on GitHub (Step 1), run:

```bash
push-backend.bat
```

Or manually:

```bash
cd backend
git init
git add .
git commit -m "Initial commit: Solid Build Construction Limited Backend API"
git branch -M main
git remote add origin https://github.com/Arbythecoder/Solid Build-backend.git
git push -u origin main --force
cd ..
```

**Backend will be at:** https://github.com/Arbythecoder/Solid Build-backend

---

## 🔒 Security Check

Before pushing, I've created proper `.gitignore` files to prevent secrets from being committed:

### Frontend (.gitignore)
- ✅ Blocks `.env` files
- ✅ Blocks `node_modules/`
- ✅ Blocks `dist/` build folder
- ✅ Only `.env.example` will be pushed (no secrets)

### Backend (.gitignore)
- ✅ Blocks `.env` files
- ✅ Blocks `node_modules/`
- ✅ Blocks `uploads/` folder
- ✅ Only `.env.example` will be pushed (no secrets)

**Files to copy into each folder:**
1. Copy `frontend-react/FRONTEND_GITIGNORE.txt` → rename to `frontend-react/.gitignore`
2. Copy `backend/BACKEND_GITIGNORE.txt` → rename to `backend/.gitignore`

---

## 📋 After Pushing - Deployment Setup

### Frontend (GitHub Pages)

1. Go to: https://github.com/Arbythecoder/Solid Build-web/settings/pages
2. **Source:** Select "GitHub Actions"
3. The workflow will auto-deploy on every push
4. **Live URL:** https://arbythecoder.github.io/Solid Build-web/

### Backend (Render.com)

1. Go to: https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub → Select `Solid Build-backend`
4. Render auto-detects `render.yaml`
5. **Add environment variable:**
   - `MONGO_URI` = Your MongoDB connection string
6. Click "Create Web Service"
7. **Live URL:** https://Solid Build-backend.onrender.com

---

## 🎯 Quick Start (Do This Now)

**Step 1:** Create backend repo on GitHub (see Step 1 above)

**Step 2:** Run these commands in order:

```bash
# Copy gitignore files first
copy frontend-react\FRONTEND_GITIGNORE.txt frontend-react\.gitignore
copy backend\BACKEND_GITIGNORE.txt backend\.gitignore

# Push frontend
push-frontend.bat

# Push backend
push-backend.bat
```

**That's it!** Both repos will be on GitHub and ready to deploy.

---

## ✅ Verification

After pushing, verify:

- [ ] Frontend repo: https://github.com/Arbythecoder/Solid Build-web
- [ ] Backend repo: https://github.com/Arbythecoder/Solid Build-backend
- [ ] No `.env` files in either repo (check on GitHub)
- [ ] Both have proper `.gitignore` files
- [ ] Both have README.md files

---

## 📞 Repository URLs

**Frontend:** https://github.com/Arbythecoder/Solid Build-web
**Backend:** https://github.com/Arbythecoder/Solid Build-backend

Ready to push? Create the backend repo first, then run the batch files! 🚀
