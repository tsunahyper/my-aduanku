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

## 📝 Features

- User authentication (Admin/User roles)
- Issue reporting with geolocation
- Issue assignment workflow
- Comments and discussions
- Status tracking (Reported → In Review → Assigned → Resolved)
- Admin dashboard with analytics
- User dashboard
- Profile management

## 📸 Screenshots

### Login Interface

<table>
  <tr>
    <td width="33%">
      <img src="aduanku-reference/login-interface.png" alt="Login Selection" />
      <p align="center"><strong>Login Selection</strong></p>
    </td>
    <td width="33%">
      <img src="aduanku-reference/admin-login-portal.png" alt="Admin Login" />
      <p align="center"><strong>Admin Login Portal</strong></p>
    </td>
    <td width="33%">
      <img src="aduanku-reference/user-login-portal.png" alt="User Login" />
      <p align="center"><strong>User Login Portal</strong></p>
    </td>
  </tr>
</table>

### Admin Dashboard

<table>
  <tr>
    <td width="50%">
      <img src="aduanku-reference/admin-dashboard.png" alt="Admin Dashboard" />
      <p align="center"><strong>Admin Dashboard</strong></p>
    </td>
    <td width="50%">
      <img src="aduanku-reference/admin-user-mgt.png" alt="User Management" />
      <p align="center"><strong>User Management</strong></p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="aduanku-reference/admin-issue-mgt.png" alt="Issue Management" />
      <p align="center"><strong>Issue Management</strong></p>
    </td>
    <td width="50%">
      <img src="aduanku-reference/admin-analytics-1.png" alt="Analytics - Overview" />
      <p align="center"><strong>Analytics - Overview</strong></p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="aduanku-reference/admin-analytics-2.png" alt="Analytics - Charts" />
      <p align="center"><strong>Analytics - Charts</strong></p>
    </td>
    <td width="50%">
      <img src="aduanku-reference/admin-analytics-3.png" alt="Analytics - Details" />
      <p align="center"><strong>Analytics - Details</strong></p>
    </td>
  </tr>
</table>

### User Dashboard

<table>
  <tr>
    <td width="50%">
      <img src="aduanku-reference/user-dashboard.png" alt="User Dashboard" />
      <p align="center"><strong>User Dashboard</strong></p>
    </td>
    <td width="50%">
      <img src="aduanku-reference/user-issue management.png" alt="Issue Management" />
      <p align="center"><strong>Issue Management</strong></p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <img src="aduanku-reference/profile-settings.png" alt="Profile Settings" />
      <p align="center"><strong>Profile Settings</strong></p>
    </td>
  </tr>
</table>

