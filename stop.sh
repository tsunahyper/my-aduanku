#!/bin/bash

echo "🛑 Stopping ADUANKU Environment..."

# Stop development environment
echo "Stopping development services..."
docker-compose -f docker-compose.dev.yml down

# Stop production environment
echo "Stopping production services..."
docker-compose down

echo "✅ All ADUANKU services stopped!"
echo ""
echo "To remove all data and volumes, run:"
echo "  docker-compose -f docker-compose.dev.yml down -v"
echo "  docker-compose down -v"
echo ""
