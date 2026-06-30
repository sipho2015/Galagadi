@echo off
REM Galagadi Backend Quick Start Script for Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║  Galagadi Backend - Quick Setup       ║
echo ╚════════════════════════════════════════╝
echo.

REM Navigate to backend directory
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
) else (
    echo ✅ Dependencies already installed
)

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo.
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit .env file with your settings:
    echo    - EMAIL_USER: Your Gmail address
    echo    - EMAIL_PASS: Your Gmail app-specific password
    echo    - CONTACT_EMAIL: Where to receive inquiries
    echo.
    echo    Open .env in your editor and update the values
    echo.
) else (
    echo ✅ .env file already exists
)

echo.
echo ╔════════════════════════════════════════╗
echo ║  Setup Complete!                      ║
echo ╚════════════════════════════════════════╝
echo.
echo Next steps:
echo 1️⃣  Edit .env with your email settings
echo 2️⃣  Run: npm run dev
echo 3️⃣  Test at: http://localhost:5000/api/health
echo.
pause
