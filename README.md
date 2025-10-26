# ADUANKU - Community Issue Management System

A comprehensive community issue management system with separate user and admin dashboards.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git

### Development Mode (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd my-aduanku

# Start development environment
./start-dev.sh
```

### Production Mode
```bash
# Start production environment
./start-prod.sh
```

### Stop All Services
```bash
./stop.sh
```

## 📱 Application URLs

- **Frontend**: http://localhost:5173 (dev) / http://localhost:3000 (prod)
- **Backend Services**: http://localhost:5001-5005

## 🏗️ Architecture

- **Frontend**: React 19 with Vite
- **Backend**: Node.js microservices
- **Database**: MongoDB with replica set
- **Containerization**: Docker & Docker Compose

## 📚 Documentation

- [Docker Setup Guide](DOCKER_SETUP.md) - Complete Docker setup instructions
- [Backend Documentation](backend/README.md) - Backend API documentation
- [Frontend Documentation](frontend/my-aduanku/README.md) - Frontend documentation

## 🔧 Manual Setup

If you prefer to run without Docker, see individual service documentation:
- [Backend Setup](backend/QUICK_START.md)
- [Frontend Setup](frontend/my-aduanku/README.md)
