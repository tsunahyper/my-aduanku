import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import {
  AlertTriangle,
  MessageSquare,
  Users,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { AnalyticsService, apiUtils } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalIssues: 0,
    totalUsers: 0,
    totalComments: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    recentIssues: []
  });

  const [loading, setLoading] = useState(true);

  // Show appropriate dashboard based on user role
  if (user) {
    if (user.role === 'admin' || user.role === 'superadmin') {
      return <AdminDashboard />;
    } else {
      return <UserDashboard />;
    }
  }

  useEffect(() => {
    // Fetch dashboard stats from API
    const fetchStats = async () => {
      try {
        const dashboardStats = await AnalyticsService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', apiUtils.handleError(error));
        // Fallback to mock data if API fails
        setStats({
          totalIssues: 1247,
          totalUsers: 342,
          totalComments: 2891,
          resolvedIssues: 892,
          pendingIssues: 355,
          recentIssues: [
            {
              id: 1,
              title: "Pothole on Jalan Ampang",
              category: "road",
              priority: "high",
              status: "reported",
              createdAt: "2024-01-15T10:30:00Z"
            },
            {
              id: 2,
              title: "Water leak at Taman Desa",
              category: "water",
              priority: "medium",
              status: "in_review",
              createdAt: "2024-01-15T09:15:00Z"
            },
            {
              id: 3,
              title: "Street light not working",
              category: "electricity",
              priority: "low",
              status: "assigned",
              createdAt: "2024-01-15T08:45:00Z"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className={`stat-icon ${color}`}>
          <Icon size={24} />
        </div>
        <div className="stat-trend">
          {trend && (
            <div className={`trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
              <TrendingUp size={16} />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value.toLocaleString()}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle size={16} className="status-resolved" />;
      case 'assigned':
        return <Clock size={16} className="status-assigned" />;
      case 'in_review':
        return <Clock size={16} className="status-review" />;
      default:
        return <XCircle size={16} className="status-reported" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'road':
        return '🛣️';
      case 'water':
        return '💧';
      case 'electricity':
        return '⚡';
      case 'safety':
        return '🛡️';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <div className="homepage-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      <div className="homepage-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome to ADUANKU Community Management System</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Issues"
          value={stats.totalIssues}
          icon={AlertTriangle}
          color="blue"
          trend={12}
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          color="green"
          trend={8}
        />
        <StatCard
          title="Total Comments"
          value={stats.totalComments}
          icon={MessageSquare}
          color="purple"
          trend={15}
        />
        <StatCard
          title="Resolved Issues"
          value={stats.resolvedIssues}
          icon={CheckCircle}
          color="emerald"
          trend={-3}
        />
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="quick-stat">
          <div className="quick-stat-icon pending">
            <Clock size={20} />
          </div>
          <div className="quick-stat-content">
            <h4>{stats.pendingIssues}</h4>
            <p>Pending Issues</p>
          </div>
        </div>
        <div className="quick-stat">
          <div className="quick-stat-icon resolved">
            <CheckCircle size={20} />
          </div>
          <div className="quick-stat-content">
            <h4>{Math.round((stats.resolvedIssues / stats.totalIssues) * 100)}%</h4>
            <p>Resolution Rate</p>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="recent-section">
        <div className="section-header">
          <h3>Recent Issues</h3>
          <button className="view-all-btn">View All</button>
        </div>
        
        <div className="recent-issues">
          {stats.recentIssues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <div className="issue-category">
                  <span className="category-icon">
                    {getCategoryIcon(issue.category)}
                  </span>
                  <span className="category-name">
                    {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
                  </span>
                </div>
                <div className={`priority-badge ${getPriorityColor(issue.priority)}`}>
                  {issue.priority}
                </div>
              </div>
              
              <h4 className="issue-title">{issue.title}</h4>
              
              <div className="issue-footer">
                <div className="issue-status">
                  {getStatusIcon(issue.status)}
                  <span className="status-text">
                    {issue.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="issue-date">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn primary">
            <AlertTriangle size={20} />
            <span>Report New Issue</span>
          </button>
          <button className="action-btn secondary">
            <BarChart3 size={20} />
            <span>View Analytics</span>
          </button>
          <button className="action-btn secondary">
            <Users size={20} />
            <span>Manage Users</span>
          </button>
          <button className="action-btn secondary">
            <MessageSquare size={20} />
            <span>Review Comments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
