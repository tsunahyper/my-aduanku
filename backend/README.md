# ADUANKU Backend Services

A microservices-based backend for the ADUANKU community issue management system built with Node.js, Express, and MongoDB.

## 🏗️ Architecture

The backend consists of 5 microservices, each handling a specific domain:

- **Auth Service** (Port 5001) - Authentication and authorization
- **User Service** (Port 5002) - User management and profiles
- **Issue Service** (Port 5003) - Issue reporting and management
- **Comments Service** (Port 5004) - Comments and discussions
- **Analytics Service** (Port 5005) - Analytics and reporting

## 🚀 Services Overview

### Auth Service (Port 5001)
- **Endpoints**: `/api/v1/auth/*`
- **Features**: User registration, login, logout, JWT token management
- **Database**: MongoDB for user authentication data
- **Security**: Password hashing, JWT tokens, rate limiting

### User Service (Port 5002)
- **Endpoints**: `/api/v1/users/*`
- **Features**: User CRUD operations, profile management, avatar uploads
- **Database**: MongoDB for user profiles and data
- **Storage**: AWS S3 for file uploads

### Issue Service (Port 5003)
- **Endpoints**: `/api/v1/issues/*`
- **Features**: Issue CRUD, geospatial queries, file attachments, assignment
- **Database**: MongoDB with geospatial indexing
- **Storage**: AWS S3 for attachments

### Comments Service (Port 5004)
- **Endpoints**: `/api/v1/comments/*`
- **Features**: Comment CRUD, likes, nested replies, file attachments
- **Database**: MongoDB for comment data
- **Storage**: AWS S3 for attachments

### Analytics Service (Port 5005)
- **Endpoints**: `/api/v1/analytics/*`
- **Features**: Dashboard statistics, issue analytics, performance metrics
- **Database**: MongoDB for analytics data
- **Access**: Admin and superadmin only

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Containerization**: Docker & Docker Compose
- **Security**: bcrypt, rate limiting, CORS
- **Validation**: Built-in Express validation

## 📁 Project Structure

```
backend/
├── auth-service/
│   ├── config/env.js
│   ├── controllers/auth.controller.js
│   ├── database/mongodb.js
│   ├── middlewares/
│   ├── models/auth.model.js
│   ├── routes/auth.router.js
│   └── index.js
├── user-service/
│   ├── config/env.js
│   ├── controllers/user.controller.js
│   ├── database/mongodb.js
│   ├── middlewares/
│   ├── models/user.model.js
│   ├── routes/users.router.js
│   └── index.js
├── issue-service/
│   ├── config/env.js
│   ├── controllers/issues.controller.js
│   ├── database/mongodb.js
│   ├── middlewares/
│   ├── models/issues.model.js
│   ├── routes/issues.router.js
│   └── index.js
├── comments-service/
│   ├── config/env.js
│   ├── controllers/comments.controller.js
│   ├── database/mongodb.js
│   ├── middlewares/
│   ├── models/comment.model.js
│   ├── routes/comments.router.js
│   └── index.js
├── analytics-service/
│   ├── config/env.js
│   ├── controllers/analytics.controller.js
│   ├── database/mongodb.js
│   ├── middlewares/
│   ├── models/analytics.model.js
│   ├── routes/analytics.router.js
│   └── index.js
└── docker-compose.yml
```

## 🔧 API Endpoints

### Authentication Service
```
POST /api/v1/auth/register    # User registration
POST /api/v1/auth/login       # User login
POST /api/v1/auth/logout      # User logout
GET  /api/v1/auth/health      # Service health check
```

### User Service
```
GET    /api/v1/users          # Get all users (admin)
GET    /api/v1/users/:id      # Get user by ID
PUT    /api/v1/users/:id      # Update user (admin)
DELETE /api/v1/users/:id      # Delete user (superadmin)
GET    /api/v1/users/profile  # Get current user profile
PUT    /api/v1/users/profile  # Update current user profile
POST   /api/v1/users/profile/avatar # Upload avatar
GET    /health                # Service health check
```

### Issue Service
```
GET    /api/v1/issues         # Get all issues
GET    /api/v1/issues/:id     # Get issue by ID
POST   /api/v1/issues         # Create new issue
PUT    /api/v1/issues/:id     # Update issue
DELETE /api/v1/issues/:id     # Delete issue (superadmin)
PUT    /api/v1/issues/:id/assign # Assign issue (admin)
POST   /api/v1/issues/:id/attachments # Upload attachments
GET    /api/v1/issues/near    # Get issues near location
GET    /health                # Service health check
```

### Comments Service
```
GET    /api/v1/comments/issue/:issueId # Get comments for issue
POST   /api/v1/comments       # Create comment
PUT    /api/v1/comments/:id   # Update comment
DELETE /api/v1/comments/:id   # Delete comment
POST   /api/v1/comments/:id/like # Like/unlike comment
GET    /health                # Service health check
```

### Analytics Service
```
GET    /api/v1/analytics/summary      # Dashboard summary (admin)
GET    /api/v1/analytics/statistics   # Detailed statistics (superadmin)
POST   /api/v1/analytics/generate     # Generate analytics (superadmin)
GET    /api/v1/analytics/health       # Service health check
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Docker & Docker Compose (optional)
- AWS S3 bucket (for file uploads)

### 1. Environment Setup

Create environment files for each service:

```bash
# Copy the example files
cp auth-service/.env.example auth-service/.env
cp user-service/.env.example user-service/.env
cp issue-service/.env.example issue-service/.env
cp comments-service/.env.example comments-service/.env
cp analytics-service/.env.example analytics-service/.env
```

### 2. Install Dependencies

```bash
# Install dependencies for each service
cd auth-service && npm install
cd ../user-service && npm install
cd ../issue-service && npm install
cd ../comments-service && npm install
cd ../analytics-service && npm install
```

### 3. Start Services

#### Option A: Docker Compose (Recommended)
```bash
docker-compose up -d
```

#### Option B: Individual Services
```bash
# Start each service individually
cd auth-service && npm start
cd user-service && npm start
cd issue-service && npm start
cd comments-service && npm start
cd analytics-service && npm start
```

### 4. Verify Services

Check that all services are running:
```bash
curl http://localhost:5001/health  # Auth service
curl http://localhost:5002/health  # User service
curl http://localhost:5003/health  # Issue service
curl http://localhost:5004/health  # Comments service
curl http://localhost:5005/health  # Analytics service
```

## 🔐 Authentication & Authorization

### User Roles
- **user**: Regular community members
- **admin**: Can manage issues and users
- **superadmin**: Full system access

### JWT Token
- **Expiration**: 15 minutes
- **Refresh**: Automatic token refresh on API calls
- **Storage**: HTTP-only cookies (recommended) or localStorage

### Protected Routes
- Most endpoints require authentication
- Admin routes require `admin` or `superadmin` role
- Superadmin routes require `superadmin` role

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['user', 'admin', 'superadmin'],
  isActive: Boolean,
  area: String,
  categoriesHandled: [String],
  avatar: String (URL),
  phone: String,
  address: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Issue Model
```javascript
{
  title: String,
  description: String,
  category: Enum ['road', 'water', 'electricity', 'safety', 'other'],
  tags: [String],
  priority: Enum ['low', 'medium', 'high'],
  status: Enum ['reported', 'in_review', 'assigned', 'resolved', 'archived'],
  createdBy: ObjectId (User),
  assignedTo: ObjectId (User),
  location: {
    type: 'Point',
    coordinates: [Number, Number], // [lng, lat]
    address: Object
  },
  attachments: [Object],
  timeline: [Object],
  resolution: Object,
  isPublic: Boolean,
  isAnonymous: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model
```javascript
{
  text: String,
  author: ObjectId (User),
  issue: ObjectId (Issue),
  parentComment: ObjectId (Comment),
  attachments: [Object],
  isEdited: Boolean,
  editedAt: Date,
  isDeleted: Boolean,
  deletedAt: Date,
  likes: [Object],
  likeCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **CORS**: Cross-origin resource sharing configuration
- **Input Validation**: Request validation and sanitization
- **File Upload Security**: File type and size restrictions
- **Environment Variables**: Sensitive data in environment files

## 📈 Performance Features

- **Geospatial Queries**: Efficient location-based searches
- **Connection Pooling**: MongoDB connection optimization

## 🐳 Docker Support

Each service includes:
- `Dockerfile` for containerization
- `docker-compose.yml` for orchestration
- Health checks for service monitoring
- Environment variable configuration

## 🧪 Testing

```bash
# Run tests for each service
cd auth-service && npm test
cd user-service && npm test
cd issue-service && npm test
cd comments-service && npm test
cd analytics-service && npm test
```

## 📝 API Documentation

- **Health Endpoints**: All services have `/health` endpoints
- **Error Handling**: Consistent error response format
- **Status Codes**: Standard HTTP status codes
- **Response Format**: JSON responses with consistent structure

## 🚀 Deployment

### Production Checklist
- [ ] Set secure JWT secrets
- [ ] Configure production MongoDB
- [ ] Set up AWS S3 buckets
- [ ] Configure CORS for frontend domain
- [ ] Set up monitoring and logging
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL certificates
- [ ] Configure backup strategies

## 𖢥 Troubleshoot

For troubleshooting issues:
- Check service health endpoints
- Review logs for error details
- Verify environment configuration
- Test API endpoints with tools like Postman

## 🔄 Future Enhancements

- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics and reporting
- [ ] File compression and optimization
- [ ] API versioning strategy
- [ ] Comprehensive logging system
- [ ] Performance monitoring
- [ ] Automated testing pipeline
- [ ] CI/CD deployment