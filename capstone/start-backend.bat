@echo off
REM Start Backend Spring Boot Application
REM This script starts the Task Manager backend on port 8081

echo.
echo ===============================================
echo  Task Manager Backend Startup
echo ===============================================
echo.
echo Starting Spring Boot application on port 8081...
echo API will be available at: http://localhost:8081/api/tasks
echo.

cd /d "%~dp0backend\taskmanager-backend"

if exist mvnw.cmd (
    call mvnw.cmd spring-boot:run
) else (
    echo Error: mvnw.cmd not found. Make sure you're in the correct directory.
    pause
)
