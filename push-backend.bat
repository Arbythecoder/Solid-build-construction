@echo off
echo ========================================
echo  PUSHING BACKEND TO GITHUB
echo ========================================
echo.
echo IMPORTANT: First create the backend repository on GitHub!
echo Go to: https://github.com/new
echo Repository name: afodams-backend
echo Then press any key to continue...
pause >nul
echo.

cd backend

echo Initializing git repository...
if exist .git (
    echo Git already initialized
) else (
    git init
)

echo.
echo Adding files...
git add .

echo.
echo Creating commit...
git commit -m "Initial commit: Afodams Property Backend API (Node.js + MongoDB)"

echo.
echo Setting main branch...
git branch -M main

echo.
echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Arbythecoder/afodams-backend.git

echo.
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo  BACKEND PUSHED SUCCESSFULLY!
echo ========================================
echo.
echo Repository: https://github.com/Arbythecoder/afodams-backend
echo.

cd ..
pause
