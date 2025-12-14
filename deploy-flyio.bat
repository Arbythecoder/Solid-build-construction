@echo off
echo ========================================
echo  DEPLOYING BACKEND TO FLY.IO
echo ========================================
echo.

cd backend

echo [1/2] Checking Fly.io login...
fly auth whoami
if errorlevel 1 (
    echo Please login first: fly auth login
    pause
    exit /b 1
)
echo.

echo [2/2] Deploying backend to Fly.io...
fly deploy
if errorlevel 1 (
    echo ERROR: Deployment failed!
    echo.
    echo Make sure you've set these secrets:
    echo   fly secrets set MONGO_URI="your_mongodb_uri"
    echo   fly secrets set JWT_SECRET="your_secret_key"
    echo   fly secrets set CORS_ORIGIN="https://afodams-property.pages.dev"
    pause
    exit /b 1
)
echo.

echo ========================================
echo  BACKEND DEPLOYED SUCCESSFULLY!
echo ========================================
echo.
echo Backend API: https://afodams-backend.fly.dev
echo Health check: https://afodams-backend.fly.dev/health
echo API docs: https://afodams-backend.fly.dev/api-docs
echo.

echo Checking status...
fly status
echo.

pause
