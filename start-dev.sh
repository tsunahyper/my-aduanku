#!/bin/bash

echo "🚀 Starting ADUANKU Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp backend/env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
fi

# Start all services
echo "🐳 Starting all services..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Initialize MongoDB replica set
echo "🔄 Initializing MongoDB replica set..."
./backend/init-replica-set.sh

# Check service status
echo "📊 Checking service status..."
docker-compose -f docker-compose.dev.yml ps

echo ""
echo "🎉 ADUANKU Development Environment is ready!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend Services:"
echo "   - Auth Service: http://localhost:5001"
echo "   - User Service: http://localhost:5002"
echo "   - Issue Service: http://localhost:5003"
echo "   - Comments Service: http://localhost:5004"
echo "   - Analytics Service: http://localhost:5005"
echo ""
echo "📝 To view logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "🛑 To stop: docker-compose -f docker-compose.dev.yml down"
echo ""
