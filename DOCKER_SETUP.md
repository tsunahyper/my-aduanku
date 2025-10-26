# ADUANKU Docker Setup Guide

This guide explains how to run the entire ADUANKU application using Docker Compose.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git (to clone the repository)

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd my-aduanku
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
cp backend/env.example .env
```

Edit the `.env` file with your configuration:
```env
# MongoDB Configuration
AUTH_DB_URI=mongodb://mongodb:27017/aduanku_auth
USER_DB_URI=mongodb://mongodb:27017/aduanku_users
ISSUE_DB_URI=mongodb://mongodb:27017/aduanku_issues
COMMENTS_DB_URI=mongodb://mongodb:27017/aduanku_comments
ANALYTICS_DB_URI=mongodb://mongodb:27017/aduanku_analytics

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# AWS Configuration (Optional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
S3_BUCKET=aduanku-uploads
```

## 🐳 Docker Commands

### Development Mode (Recommended)
```bash
# Start all services in development mode
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop all services
docker-compose -f docker-compose.dev.yml down
```

### Production Mode
```bash
# Start all services in production mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Individual Services

#### Frontend Only
```bash
# Development
cd frontend
docker-compose -f docker-compose.dev.yml up -d

# Production
cd frontend
docker-compose up -d
```

#### Backend Only
```bash
# Development
cd backend
docker-compose -f docker-compose.dev.yml up -d

# Production
cd backend
docker-compose up -d
```

## 🔧 Service URLs

When running in development mode:
- **Frontend**: http://localhost:5173
- **Auth Service**: http://localhost:5001
- **User Service**: http://localhost:5002
- **Issue Service**: http://localhost:5003
- **Comments Service**: http://localhost:5004
- **Analytics Service**: http://localhost:5005
- **MongoDB**: localhost:27017

When running in production mode:
- **Frontend**: http://localhost:3000
- **Backend Services**: Same as development

## 📁 Project Structure

```
my-aduanku/
├── docker-compose.yml              # Production setup
├── docker-compose.dev.yml          # Development setup
├── .env                           # Environment variables
├── backend/
│   ├── docker-compose.yml         # Backend production
│   ├── docker-compose.dev.yml     # Backend development
│   └── [services...]
├── frontend/
│   ├── docker-compose.yml         # Frontend production
│   ├── docker-compose.dev.yml     # Frontend development
│   └── my-aduanku/
│       ├── Dockerfile             # Production frontend
│       └── Dockerfile.dev         # Development frontend
└── DOCKER_SETUP.md               # This file
```

## 🛠️ Development Workflow

### 1. Start Development Environment
```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# Initialize MongoDB replica set
./backend/init-replica-set.sh
```

### 2. Make Changes
- Frontend changes are automatically reflected (hot reload)
- Backend changes require container restart

### 3. View Logs
```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f frontend
docker-compose -f docker-compose.dev.yml logs -f auth-service
```

### 4. Restart Services
```bash
# Restart specific service
docker-compose -f docker-compose.dev.yml restart frontend

# Restart all services
docker-compose -f docker-compose.dev.yml restart
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :5173
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### 2. MongoDB Connection Issues
```bash
# Check MongoDB logs
docker-compose -f docker-compose.dev.yml logs mongodb

# Restart MongoDB
docker-compose -f docker-compose.dev.yml restart mongodb
```

#### 3. Frontend Not Loading
```bash
# Check frontend logs
docker-compose -f docker-compose.dev.yml logs frontend

# Rebuild frontend
docker-compose -f docker-compose.dev.yml up --build frontend
```

#### 4. Backend Services Not Starting
```bash
# Check backend logs
docker-compose -f docker-compose.dev.yml logs auth-service

# Rebuild backend services
docker-compose -f docker-compose.dev.yml up --build
```

### Clean Up
```bash
# Stop and remove all containers
docker-compose -f docker-compose.dev.yml down

# Remove all volumes (WARNING: This will delete all data)
docker-compose -f docker-compose.dev.yml down -v

# Remove all images
docker-compose -f docker-compose.dev.yml down --rmi all
```

## 🔒 Security Notes

1. **Change JWT Secret**: Update the JWT_SECRET in your `.env` file
2. **AWS Credentials**: Use proper AWS credentials for production
3. **Database Security**: Use strong passwords and proper authentication
4. **Network Security**: Configure proper firewall rules for production

## 📊 Monitoring

### Health Checks
```bash
# Check if all services are running
docker-compose -f docker-compose.dev.yml ps

# Check service health
curl http://localhost:5001/api/v1/auth/health
curl http://localhost:5002/api/v1/users/health
curl http://localhost:5003/api/v1/issues/health
curl http://localhost:5004/api/v1/comments/health
curl http://localhost:5005/api/v1/analytics/health
```

### Resource Usage
```bash
# Check resource usage
docker stats

# Check specific container
docker stats aduanku-frontend-dev
```

## 🚀 Production Deployment

1. **Environment Variables**: Set proper production environment variables
2. **SSL/TLS**: Configure SSL certificates
3. **Load Balancer**: Set up load balancer for multiple instances
4. **Monitoring**: Set up proper monitoring and logging
5. **Backup**: Configure database backups

## 📝 Additional Commands

```bash
# Build specific service
docker-compose -f docker-compose.dev.yml build frontend

# Run command in container
docker-compose -f docker-compose.dev.yml exec frontend npm install

# Access container shell
docker-compose -f docker-compose.dev.yml exec frontend sh

# View container logs
docker logs aduanku-frontend-dev
```

## 🆘 Support

If you encounter any issues:
1. Check the logs: `docker-compose -f docker-compose.dev.yml logs -f`
2. Verify environment variables in `.env`
3. Ensure all ports are available
4. Check Docker and Docker Compose versions
5. Restart the services: `docker-compose -f docker-compose.dev.yml restart`
