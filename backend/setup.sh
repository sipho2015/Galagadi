#!/bin/bash
# Galagadi Backend Quick Start Script
# Run this script to set up the backend quickly

echo "╔════════════════════════════════════════╗"
echo "║  Galagadi Backend - Quick Setup       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Navigate to backend directory
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your settings:"
    echo "   - EMAIL_USER: Your Gmail address"
    echo "   - EMAIL_PASS: Your Gmail app-specific password"
    echo "   - CONTACT_EMAIL: Where to receive inquiries"
    echo ""
    echo "   nano .env (or open with your editor)"
    echo ""
else
    echo "✅ .env file already exists"
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  Setup Complete!                      ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "1️⃣  Edit .env with your email settings"
echo "2️⃣  Run: npm run dev"
echo "3️⃣  Test at: http://localhost:5000/api/health"
echo ""
