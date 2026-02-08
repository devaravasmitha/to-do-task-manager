@echo off
REM Start Frontend Angular Application
REM This script starts the Task Manager frontend on port 4200

echo.
echo ===============================================
echo  Task Manager Frontend Startup
echo ===============================================
echo.
echo Starting Angular development server on port 4200...
echo Application will be available at: http://localhost:4200
echo.

cd /d "%~dp0frontend\task-manager-frontend"

if exist package.json (
    npm start
) else (
    echo Error: package.json not found. Make sure you're in the correct directory.
    pause
)
