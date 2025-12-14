@echo off
echo ========================================
echo  DEPLOYING FRONTEND TO CLOUDFLARE PAGES
echo ========================================
echo.

cd frontend-react

echo [1/3] Building frontend...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo [2/3] Deploying to Cloudflare Pages...
call wrangler pages deploy dist --project-name=afodams-property
if errorlevel 1 (
    echo ERROR: Deployment failed!
    echo Make sure you've run: wrangler login
    pause
    exit /b 1
)
echo.

echo ========================================
echo  FRONTEND DEPLOYED SUCCESSFULLY!
echo ========================================
echo.
echo Your website: https://afodams-property.pages.dev
echo.
pause
