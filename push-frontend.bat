@echo off
echo ========================================
echo  PUSHING FRONTEND TO GITHUB
echo ========================================
echo.

cd frontend-react

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
git commit -m "Initial commit: Afodams Property Frontend (React + TypeScript)"

echo.
echo Setting main branch...
git branch -M main

echo.
echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Arbythecoder/afodams-web.git

echo.
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo  FRONTEND PUSHED SUCCESSFULLY!
echo ========================================
echo.
echo Repository: https://github.com/Arbythecoder/afodams-web
echo.

cd ..
pause
