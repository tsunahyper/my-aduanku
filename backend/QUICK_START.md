# 🚀 ADUANKU Backend Quick Start Guide

## ✅ What's Fixed:

1. **Backend README.md** - Now contains proper backend documentation instead of frontend content
2. **Environment Files** - Created example environment files for all services
3. **Setup Script** - Automated script to create all .env files

## 🔧 Quick Setup:

### Step 1: Run the Setup Script
```bash
cd backend
./setup-env.sh
```

This will create all the necessary `.env` files from the examples.

### Step 2: Update Environment Variables

#### For Local Development (Simplest):
1. **Install MongoDB locally**:
   ```bash
   # macOS
   brew install mongodb-community
   brew services start mongodb-community
   
   # Or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Update JWT Secret** in all `.env` files:
   ```bash
   # Generate a secure secret
   openssl rand -base64 32
   ```

3. **Skip AWS S3** for now (set dummy values):
   ```env
   AWS_ACCESS_KEY_ID=dummy
   AWS_SECRET_ACCESS_KEY=dummy
   S3_BUCKET=dummy
   ```

#### For Production:
1. **Use MongoDB Atlas** (cloud database)
2. **Set up AWS S3** for file uploads
3. **Use strong JWT secrets**

### Step 3: Start Services

#### Option A: Docker Compose (Recommended)
```bash
docker-compose up -d
```

#### Option B: Individual Services
```bash
# Start each service individually
cd auth-service && npm start &
cd user-service && npm start &
cd issue-service && npm start &
cd comments-service && npm start &
cd analytics-service && npm start &
```

### Step 4: Verify Services
```bash
# Check all services are running
curl http://localhost:5001/health  # Auth service
curl http://localhost:5002/health  # User service
curl http://localhost:5003/health  # Issue service
curl http://localhost:5004/health  # Comments service
curl http://localhost:5005/health  # Analytics service
```

## 📁 Environment Files Created:

- `backend/.env` - Main docker-compose environment
- `backend/auth-service/.env` - Auth service configuration
- `backend/user-service/.env` - User service configuration
- `backend/issue-service/.env` - Issue service configuration
- `backend/comments-service/.env` - Comments service configuration
- `backend/analytics-service/.env` - Analytics service configuration

## 🔑 Key Environment Variables:

### Required for Basic Setup:
- `DB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Service port (5001-5005)

### Optional (for file uploads):
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET` - S3 bucket name

## 🧪 Test the Integration:

1. **Start Backend Services**:
   ```bash
   docker-compose up -d
   ```

2. **Start Frontend**:
   ```bash
   cd frontend/my-aduanku
   npm run dev
   ```

3. **Test Login**:
   - Open http://localhost:5173
   - You'll see the login page
   - Create a user via API first:
     ```bash
     curl -X POST http://localhost:5001/api/v1/auth/register \
       -H "Content-Type: application/json" \
       -d '{"username":"admin","name":"Admin User","email":"admin@aduanku.com","password":"password123","role":"admin"}'
     ```

4. **Login with Created User**:
   - Use the credentials from step 3
   - Should redirect to dashboard

## 🐛 Troubleshooting:

### Common Issues:

1. **"Variable is not set" warnings**:
   - Run `./setup-env.sh` to create .env files
   - Update the .env files with actual values

2. **MongoDB connection errors**:
   - Make sure MongoDB is running
   - Check connection string in .env files

3. **Port already in use**:
   - Stop other services using ports 5001-5005
   - Or change ports in .env files

4. **JWT errors**:
   - Make sure JWT_SECRET is the same in all services
   - Use a strong, random secret

### Quick Fixes:

```bash
# Stop all services
docker-compose down

# Recreate .env files
./setup-env.sh

# Start services again
docker-compose up -d
```

## 🎯 Next Steps:

1. **Create Admin User** via API
2. **Test Frontend Login** with created user
3. **Verify Dashboard** loads with real data
4. **Set up AWS S3** for file uploads (optional)
5. **Configure Production** environment variables

The backend is now properly configured and ready to work with your frontend! 🚀
