@echo off
echo ========================================
echo   AFODAMS PROPERTY - DEPLOYMENT SCRIPT
echo ========================================
echo.

REM Build React Frontend
echo [1/4] Building React Frontend...
cd frontend-react
call npm run build
if errorlevel 1 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)
cd ..
echo ✓ Frontend build complete!
echo.

REM Copy backend files
echo [2/4] Preparing backend...
if not exist "production" mkdir production
xcopy /E /I /Y backend production\backend
echo ✓ Backend files copied!
echo.

REM Copy built frontend
echo [3/4] Copying frontend build...
xcopy /E /I /Y frontend-react\dist production\frontend
echo ✓ Frontend build copied!
echo.

REM Create production package
echo [4/4] Creating deployment package...
echo.
echo ========================================
echo   DEPLOYMENT PACKAGE READY!
echo ========================================
echo.
echo Location: %cd%\production
echo.
echo Next steps:
echo 1. Upload 'production' folder to your server
echo 2. Install Node.js on server
echo 3. Run: npm install in backend folder
echo 4. Set up environment variables
echo 5. Run: node server.production.js
echo.
echo Your app will serve both frontend and API!
echo.
pause
