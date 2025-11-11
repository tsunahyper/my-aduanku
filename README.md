# ADUANKU - Community Issue Management System
A community issue management system for reporting and tracking local issues with separate user and admin interfaces.

## 🚀 Quick Start (Development)

### Prerequisites
- Docker and Docker Compose installed
- Git
- Node Js

### Setup and Run

```bash
# Clone the repository
git clone <your-repo-url>
cd my-aduanku

# Start development environment
./start-dev.sh

# Stop all services
./stop.sh
```

## 📱 Access the Application

- **Frontend**: http://localhost:3000
- **Auth Service**: http://localhost:5001
- **User Service**: http://localhost:5002
- **Issue Service**: http://localhost:5003
- **Comments Service**: http://localhost:5004
- **Analytics Service**: http://localhost:5005

## 🏗️ Tech Stack

### Frontend
- React 19 (TypeScript)
- React Router DOM
- Tailwind CSS
- Heroicons

### Backend
- Node.js microservices architecture
- Express.js
- MongoDB with replica set
- JWT authentication

### Services
- **auth-service** (Port 5001): User authentication
- **user-service** (Port 5002): User management
- **issue-service** (Port 5003): Issue tracking
- **comments-service** (Port 5004): Comments and discussions
- **analytics-service** (Port 5005): Analytics and reporting

## 🔑 Default Login Credentials

**Admin:**
- Email: `admin@example.com`
- Password: `Admin@1234`

**User:**
- Email: `john.doe@example.com`
- Password: `User@1234`

## 📁 Project Structure

```
my-aduanku/
├── frontend/           # React frontend application
├── backend/
│   ├── auth-service/       # Authentication service
│   ├── user-service/       # User management service
│   ├── issue-service/      # Issue tracking service
│   ├── comments-service/   # Comments service
│   └── analytics-service/  # Analytics service
├── docker-compose.dev.yml  # Development Docker Compose
├── start-dev.sh           # Development startup script
└── stop.sh                # Stop all services script
```

## 🧹 Clean Up

```bash
# Stop all services
./stop.sh
```

## 📝 Features

- User authentication (Admin/User roles)
- Issue reporting with geolocation
- Issue assignment workflow
- Comments and discussions
- Status tracking (Reported → In Review → Assigned → Resolved)
- Admin dashboard with analytics
- User dashboard
- Profile management

## 🐛 Troubleshooting

### Services not starting?
```bash
# Check Docker status
docker ps

# View logs for errors
docker-compose -f docker-compose.dev.yml logs
```

### Port conflicts?
Make sure ports 3000-3001 and 5001-5005 are not in use by other applications.

### MongoDB connection issues?
```bash
# Restart MongoDB
docker-compose -f docker-compose.dev.yml restart mongodb
```
