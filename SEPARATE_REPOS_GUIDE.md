# 🔄 Separate Frontend & Backend Repositories Setup

This guide will help you push frontend and backend to separate GitHub repositories.

---

## 📁 Repository Structure

**Frontend Repo:** `afodams-frontend`
- Contains: `frontend-react/` folder
- Deploy to: GitHub Pages
- URL: `https://arbythecoder.github.io/afodams-frontend/`

**Backend Repo:** `afodams-backend`
- Contains: `backend/` folder
- Deploy to: Render.com
- URL: `https://afodams-backend.onrender.com`

---

## 🚀 STEP 1: Create GitHub Repositories

### A. Create Frontend Repository

1. Go to: https://github.com/new
2. **Repository name:** `afodams-frontend`
3. **Description:** `Afodams Property Limited - Frontend (React + TypeScript)`
4. **Visibility:** Public
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**
7. **COPY the URL:** `https://github.com/Arbythecoder/afodams-frontend.git`

### B. Create Backend Repository

1. Go to: https://github.com/new
2. **Repository name:** `afodams-backend`
3. **Description:** `Afodams Property Limited - Backend API (Node.js + MongoDB)`
4. **Visibility:** Public
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**
7. **COPY the URL:** `https://github.com/Arbythecoder/afodams-backend.git`

---

## 📝 STEP 2: Setup Files (I'll do this for you)

I'll create:
- Separate README files for each repo
- Separate .gitignore files
- Update deployment configurations
- Create push scripts

---

## 🔒 Security Check

✅ No .env files are tracked in git
✅ .gitignore properly configured
✅ Only .env.example files will be pushed
✅ All secrets stay local and on deployment platforms

---

## 📤 STEP 3: Push to Separate Repos (After I prepare files)

### Frontend:
```bash
cd frontend-react
git init
git add .
git commit -m "Initial commit: React frontend"
git branch -M main
git remote add origin https://github.com/Arbythecoder/afodams-frontend.git
git push -u origin main
```

### Backend:
```bash
cd backend
git init
git add .
git commit -m "Initial commit: Node.js backend API"
git branch -M main
git remote add origin https://github.com/Arbythecoder/afodams-backend.git
git push -u origin main
```

---

## 🎯 Ready?

1. First, create the two GitHub repositories (Step 1)
2. Tell me when done, and I'll prepare the files (Step 2)
3. Then run the push commands (Step 3)
