@echo off
echo ========================================
echo  FULL DEPLOYMENT - CLOUDFLARE + FLY.IO
echo ========================================
echo.

echo Step 1: Deploying Backend to Fly.io...
echo ----------------------------------------
cd backend
call fly deploy
if errorlevel 1 (
    echo Backend deployment failed!
    pause
    exit /b 1
)
echo.
echo Backend deployed successfully!
echo.

echo Step 2: Building Frontend...
echo ----------------------------------------
cd ..\frontend-react
call npm run build
if errorlevel 1 (
    echo Frontend build failed!
    pause
    exit /b 1
)
echo.

echo Step 3: Deploying Frontend to Cloudflare...
echo ----------------------------------------
call wrangler pages deploy dist --project-name=afodams-property
if errorlevel 1 (
    echo Frontend deployment failed!
    pause
    exit /b 1
)
echo.

echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Frontend: https://afodams-property.pages.dev
echo Backend:  https://afodams-backend.fly.dev
echo.
echo Testing backend health...
curl https://afodams-backend.fly.dev/health
echo.
echo.
pause
