@echo off
setlocal enabledelayedexpansion

REM Set console colors and title
title Feedback App - Startup
color 0A

echo.
echo ============================================================
echo              FEEDBACK APP - STARTUP SCRIPT
echo ============================================================
echo.

REM ============================================================
REM STEP 1: Check Docker Installation
REM ============================================================
echo [STEP 1/7] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [X] ERROR: Docker is NOT installed!
    echo.
    echo Please install Docker Desktop from:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)
echo [OK] Docker is installed
docker --version
echo.

REM ============================================================
REM STEP 2: Check if Docker is Running
REM ============================================================
echo [STEP 2/7] Checking if Docker daemon is running...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [X] ERROR: Docker is NOT running!
    echo.
    echo Please start Docker Desktop and wait for it to fully start.
    echo Then run this script again.
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)
echo [OK] Docker is running
echo.

REM ============================================================
REM STEP 3: Check Node.js Installation
REM ============================================================
echo [STEP 3/7] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel%==0 (
    echo [OK] Node.js is installed
    for /f "delims=" %%v in ('node -v') do echo Version: %%v
    for /f "delims=" %%v in ('npm -v') do echo npm: %%v
) else (
    color 0C
    echo.
    echo [X] ERROR: Node.js is NOT installed!
    echo.
    echo Please install Node.js v16 or higher
    echo Download: https://nodejs.org/
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)
echo.

REM ============================================================
REM STEP 4: Start MongoDB with Docker Compose
REM ============================================================
echo [STEP 4/7] Starting MongoDB container...
cd backend
if not exist docker-compose.yml (
    color 0C
    echo.
    echo [X] ERROR: docker-compose.yml not found in backend folder!
    echo Please ensure the file exists.
    cd ..
    echo.
    pause
    exit /b 1
)

docker-compose down >nul 2>&1
docker-compose up -d
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [X] ERROR: Failed to start MongoDB!
    echo Check if port 27017 is already in use.
    cd ..
    echo.
    pause
    exit /b 1
)
echo [OK] MongoDB container started successfully
echo MongoDB URI: mongodb://localhost:27017/feedback-app
cd ..
echo.

REM Wait for MongoDB to be ready
echo Waiting for MongoDB to initialize...
timeout /t 3 /nobreak >nul
echo.

REM ============================================================
REM STEP 5: Install Backend Dependencies
REM ============================================================
echo [STEP 5/7] Setting up backend...
cd backend
if not exist package.json (
    color 0C
    echo.
    echo [X] ERROR: package.json not found in backend folder!
    cd ..
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [X] ERROR: Failed to install backend dependencies!
        cd ..
        echo.
        pause
        exit /b 1
    )
    echo [OK] Backend dependencies installed
) else (
    echo [OK] Backend dependencies already installed
)
cd ..
echo.

REM ============================================================
REM STEP 6: Install Frontend Dependencies
REM ============================================================
echo [STEP 6/7] Setting up frontend...
cd frontend
if not exist package.json (
    color 0C
    echo.
    echo [X] ERROR: package.json not found in frontend folder!
    cd ..
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [X] ERROR: Failed to install frontend dependencies!
        cd ..
        echo.
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [OK] Frontend dependencies already installed
)
cd ..
echo.

REM ============================================================
REM STEP 7: Start Application Servers
REM ============================================================
echo [STEP 7/7] Starting application servers...
echo.
echo ============================================================
echo                  SETUP COMPLETED!
echo ============================================================
echo.
echo Application URLs:
echo   - Backend:  http://localhost:5000
echo   - Frontend: http://localhost:5173
echo   - MongoDB:  mongodb://localhost:27017/feedback-app
echo.
echo Two new windows will open:
echo   1. Backend Server
echo   2. Frontend Development Server
echo.
echo To STOP the application:
echo   1. Press Ctrl+C in both server windows
echo   2. Run: cd backend ^&^& docker-compose down
echo.
echo ============================================================
echo.
echo Press any key to start the servers...
pause >nul

REM Start backend server in new window
echo.
echo [*] Starting backend server...
start "Feedback App - Backend Server" cmd /k "color 0B && cd /d "%~dp0backend" && echo Starting backend on http://localhost:5000 && echo. && node server.js"

REM Wait for backend to start
timeout /t 2 /nobreak >nul

REM Start frontend server in new window
echo [*] Starting frontend server...
start "Feedback App - Frontend Server" cmd /k "color 0E && cd /d "%~dp0frontend" && echo Starting frontend development server... && echo. && npm run dev"

echo.
echo ============================================================
echo [OK] Both servers are starting in separate windows!
echo ============================================================
echo.
echo Check the new windows for server logs and status.
echo This window can be closed now.
echo.
timeout /t 5
exit