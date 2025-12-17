# Quick Start Script for Michel's Catering Admin Dashboard
# This script helps you set up the project quickly

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Michel's Catering - Admin Dashboard Setup" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$projectRoot = "C:\Users\miche\Desktop\Kamuta Ltd\Michel-s-Catering"

# Check if we're in the right directory
if (-not (Test-Path $projectRoot)) {
    Write-Host "Error: Project directory not found at $projectRoot" -ForegroundColor Red
    exit 1
}

Set-Location $projectRoot

Write-Host "Step 1: Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js is not installed. Please install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host "`nStep 2: Checking MongoDB installation..." -ForegroundColor Yellow
$mongoVersion = mongod --version 2>$null
if ($mongoVersion) {
    Write-Host "✓ MongoDB is installed" -ForegroundColor Green
} else {
    Write-Host "⚠ MongoDB is not installed locally." -ForegroundColor Yellow
    Write-Host "  You can either:" -ForegroundColor Yellow
    Write-Host "  1. Install MongoDB locally from https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    Write-Host "  2. Use MongoDB Atlas (cloud) - https://www.mongodb.com/cloud/atlas" -ForegroundColor Yellow
}

Write-Host "`nStep 3: Installing backend dependencies..." -ForegroundColor Yellow
if (Test-Path "server\package.json") {
    Set-Location server
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
    Set-Location ..
} else {
    Write-Host "✗ server\package.json not found" -ForegroundColor Red
    exit 1
}

Write-Host "`nStep 4: Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path "server\.env")) {
    Write-Host "⚠ .env file not found in server directory" -ForegroundColor Yellow
    if (Test-Path "server\.env.example") {
        Copy-Item "server\.env.example" "server\.env"
        Write-Host "✓ Created .env file from .env.example" -ForegroundColor Green
        Write-Host "⚠ IMPORTANT: Edit server\.env and update MONGODB_URI and JWT_SECRET" -ForegroundColor Yellow
    }
} else {
    Write-Host "✓ .env file exists" -ForegroundColor Green
}

Write-Host "`nStep 5: Updating frontend files..." -ForegroundColor Yellow
if (Test-Path "src\pages\AdminDashboard.new.jsx") {
    # Backup old file
    if (Test-Path "src\pages\AdminDashboard.jsx") {
        Copy-Item "src\pages\AdminDashboard.jsx" "src\pages\AdminDashboard.old.jsx" -Force
        Write-Host "✓ Backed up old AdminDashboard.jsx" -ForegroundColor Green
    }
    
    # Replace with new file
    Move-Item "src\pages\AdminDashboard.new.jsx" "src\pages\AdminDashboard.jsx" -Force
    Write-Host "✓ Installed new AdminDashboard.jsx" -ForegroundColor Green
}

if (Test-Path "src\styles\AdminDashboard.new.css") {
    # Backup old file
    if (Test-Path "src\styles\AdminDashboard.css") {
        Copy-Item "src\styles\AdminDashboard.css" "src\styles\AdminDashboard.old.css" -Force
        Write-Host "✓ Backed up old AdminDashboard.css" -ForegroundColor Green
    }
    
    # Replace with new file
    Move-Item "src\styles\AdminDashboard.new.css" "src\styles\AdminDashboard.css" -Force
    Write-Host "✓ Installed new AdminDashboard.css" -ForegroundColor Green
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Edit server\.env with your MongoDB connection and JWT secret" -ForegroundColor White
Write-Host "2. Create admin user: cd server && npm run seed" -ForegroundColor White
Write-Host "3. Start backend: cd server && npm run dev" -ForegroundColor White
Write-Host "4. Start frontend (new terminal): npm run dev" -ForegroundColor White
Write-Host "5. Login at http://localhost:5173/admin/login" -ForegroundColor White
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: KamutaAdmin2025!" -ForegroundColor White

Write-Host "`nFor detailed instructions, see ADMIN_SETUP_GUIDE.md" -ForegroundColor Cyan

Read-Host "`nPress Enter to exit"
