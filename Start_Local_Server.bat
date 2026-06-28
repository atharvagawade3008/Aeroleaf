@echo off
title Car Brand Website Local Server
echo ===================================================
echo   Starting Car Brand Website Local Development Server...
echo ===================================================
echo.

:: Navigate to the project folder
cd /d "%~dp0car-brand-website"

:: Check if node_modules exists; if not, run npm install
if not exist "node_modules\" (
    echo node_modules not found. Installing dependencies first (this may take a minute)...
    call npm install
)

:: Run the Vite development server and open the browser automatically
echo Starting server...
call npm run dev -- --open

pause
