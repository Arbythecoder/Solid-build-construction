@echo off
echo ========================================
echo  STARTING AFODAMS PROPERTY WEBSITE
echo ========================================
echo.

echo Starting Backend Server...
start "Afodams Backend" cmd /k "cd backend && node server.js"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak

echo.
echo Starting Frontend Server...
start "Afodams Frontend" cmd /k "cd frontend-react && npm start"

echo.
echo Waiting 10 seconds for frontend to build...
timeout /t 10 /nobreak

echo.
echo Opening website in browser...
start http://localhost:3000

echo.
echo ========================================
echo  SERVERS RUNNING!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
