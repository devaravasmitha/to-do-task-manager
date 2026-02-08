@echo off
REM Install dependencies for both Frontend and Backend

echo.
echo ===============================================
echo  Installing Dependencies
echo ===============================================
echo.

echo [1/2] Installing Frontend dependencies...
cd /d "%~dp0frontend\task-manager-frontend"
if exist package.json (
    npm install
) else (
    echo Error: frontend package.json not found
)

echo.
echo [2/2] Installing Backend dependencies (via Maven)...
cd /d "%~dp0backend\taskmanager-backend"
if exist mvnw.cmd (
    call mvnw.cmd clean install
) else (
    echo Error: backend mvnw.cmd not found
)

echo.
echo ===============================================
echo  Dependencies Installation Complete!
echo ===============================================
echo.
echo Next steps:
echo 1. Open two terminal windows
echo 2. Run: start-backend.bat (in first terminal)
echo 3. Run: start-frontend.bat (in second terminal)
echo.
pause
