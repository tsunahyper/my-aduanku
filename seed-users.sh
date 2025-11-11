#!/bin/bash

# Seed Users Script for ADUANKU
# This script creates default users (superadmin, admin, user) in the database

echo "🌱 ADUANKU - Seed Users Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Docker containers are running
if ! docker ps | grep -q "auth-service"; then
    echo "❌ Error: auth-service container is not running!"
    echo "Please start the development environment first:"
    echo "  ./start-dev.sh"
    exit 1
fi

echo "🔍 Checking auth-service container..."
echo ""

# Run the seed script inside the auth-service container
echo "🌱 Seeding default users..."
docker exec -it auth-service node seed-users.js

echo ""
echo "✅ Done!"

