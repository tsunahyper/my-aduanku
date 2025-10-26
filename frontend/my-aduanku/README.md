# ADUANKU Frontend Dashboard

A modern React-based dashboard for the ADUANKU community issue management system.

## Features

### 🏠 Dashboard Homepage
- **Overview Statistics**: Total issues, users, comments, and resolution rates
- **Quick Stats**: Pending issues and resolution percentage
- **Recent Issues**: Latest reported issues with status and priority
- **Quick Actions**: Easy access to common tasks

### 🧭 Navigation
- **Responsive Sidebar**: Collapsible navigation with mobile support
- **Tab Navigation**: Easy switching between different sections
- **Active State Indicators**: Clear visual feedback for current page

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Mobile navigation and interactions
- **Modern UI**: Clean, professional design with smooth animations

## Pages

1. **Dashboard** (`/`) - Main overview with statistics and recent activity
2. **Issues** (`/issues`) - Issue management and tracking
3. **Comments** (`/comments`) - Comment moderation and management
4. **Users** (`/users`) - User management and administration
5. **Analytics** (`/analytics`) - Performance metrics and insights
6. **Settings** (`/settings`) - System configuration and preferences

## Tech Stack

- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with modern features

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Main layout with sidebar navigation
│   └── Layout.css          # Layout styles
├── pages/
│   ├── HomePage.jsx        # Dashboard homepage
│   ├── HomePage.css        # Homepage styles
│   ├── IssuesPage.jsx      # Issues management page
│   ├── CommentsPage.jsx    # Comments management page
│   ├── UsersPage.jsx       # User management page
│   ├── AnalyticsPage.jsx   # Analytics dashboard page
│   ├── SettingsPage.jsx    # Settings page
│   └── PlaceholderPages.css # Shared placeholder styles
├── services/
│   └── api.js              # API service layer
├── hooks/
│   └── useApi.js           # Custom API hooks
├── App.jsx                 # Main app component with routing
├── main.jsx                # App entry point
└── index.css               # Global styles
```

## API Integration

The frontend integrates with the following microservices:

- **Auth Service** (Port 5001) - Authentication and authorization
- **User Service** (Port 5002) - User management
- **Issue Service** (Port 5003) - Issue reporting and management
- **Comments Service** (Port 5004) - Comments and discussions
- **Analytics Service** (Port 5005) - Analytics and reporting

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Features Overview

### Dashboard Statistics
- Real-time data from analytics service
- Fallback to mock data if API unavailable
- Trend indicators for key metrics
- Responsive card layout

### Navigation System
- Collapsible sidebar with mobile overlay
- Active page highlighting
- Smooth transitions and animations
- Touch-friendly mobile interface

### API Service Layer
- Centralized API configuration
- Automatic token management
- Error handling and retry logic
- Request/response interceptors

### Custom Hooks
- `useApi` - Generic API call hook
- `useApiOnMount` - API calls on component mount
- `usePaginatedApi` - Paginated data handling
- `useFormSubmit` - Form submission handling
- `useRealtimeData` - Real-time data updates

## Design System

### Colors
- **Primary**: Gradient blue-purple (#667eea to #764ba2)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale (#1e293b to #f8fafc)

### Typography
- **Font**: Inter system font stack
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes**: Responsive scaling from mobile to desktop

### Components
- **Cards**: Elevated containers with hover effects
- **Buttons**: Multiple variants (primary, secondary)
- **Icons**: Consistent Lucide React icon set
- **Forms**: Clean, accessible form elements

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Data visualization charts
- [ ] Export functionality
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Progressive Web App features