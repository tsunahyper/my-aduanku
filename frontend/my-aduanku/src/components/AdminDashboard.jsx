import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  AlertTriangle, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  TrendingUp,
  UserPlus,
  FileText,
  Shield
} from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
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
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for admin dashboard
  useEffect(() => {
    const mockStats = {
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
          assignedTo: null,
          reporter: "John Doe",
          location: "Jalan Ampang, Kuala Lumpur",
          createdAt: "2024-01-15T10:30:00Z",
          comments: 3
        },
        {
          id: 2,
          title: "Water leak at Taman Desa",
          category: "water",
          priority: "medium",
          status: "in_review",
          assignedTo: "Sarah Wilson",
          reporter: "Mike Chen",
          location: "Taman Desa, Kuala Lumpur",
          createdAt: "2024-01-15T09:15:00Z",
          comments: 7
        },
        {
          id: 3,
          title: "Street light not working",
          category: "electricity",
          priority: "low",
          status: "assigned",
          assignedTo: "David Lee",
          reporter: "Anna Kumar",
          location: "Jalan Bukit Bintang, Kuala Lumpur",
          createdAt: "2024-01-15T08:45:00Z",
          comments: 1
        }
      ]
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredIssues = stats.recentIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || issue.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'reported': return 'status-reported';
      case 'in_review': return 'status-review';
      case 'assigned': return 'status-assigned';
      case 'in_progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return 'status-reported';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'road': return '🛣️';
      case 'water': return '💧';
      case 'electricity': return '⚡';
      case 'safety': return '🛡️';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {user?.name || 'Administrator'}</p>
          </div>
          <div className="header-actions">
            <button className="primary-btn">
              <Plus size={20} />
              New Issue
            </button>
            <button className="secondary-btn">
              <UserPlus size={20} />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalIssues}</h3>
            <p>Total Issues</p>
            <span className="stat-change positive">+12%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
            <span className="stat-change positive">+5%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalComments}</h3>
            <p>Comments</p>
            <span className="stat-change positive">+8%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon teal">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.resolvedIssues}</h3>
            <p>Resolved</p>
            <span className="stat-change positive">+10%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={20} />
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'issues' ? 'active' : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          <AlertTriangle size={20} />
          Issues Management
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} />
          User Management
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={20} />
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="content-grid">
              <div className="recent-issues-card">
                <div className="card-header">
                  <h3>Recent Issues</h3>
                  <button className="view-all-btn">View All</button>
                </div>
                <div className="issues-list">
                  {stats.recentIssues.slice(0, 5).map(issue => (
                    <div key={issue.id} className="issue-item">
                      <div className="issue-info">
                        <div className="issue-header">
                          <span className="category-icon">{getCategoryIcon(issue.category)}</span>
                          <span className={`priority ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </span>
                        </div>
                        <h4>{issue.title}</h4>
                        <p>Reported by {issue.reporter}</p>
                      </div>
                      <div className="issue-actions">
                        <span className={`status ${getStatusColor(issue.status)}`}>
                          {issue.status.replace('_', ' ')}
                        </span>
                        <button className="action-btn">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-stats-card">
                <div className="card-header">
                  <h3>Quick Stats</h3>
                </div>
                <div className="quick-stats">
                  <div className="quick-stat">
                    <div className="stat-icon">
                      <Clock size={20} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{stats.pendingIssues}</span>
                      <span className="stat-label">Pending Issues</span>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">
                      <TrendingUp size={20} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">
                        {Math.round((stats.resolvedIssues / stats.totalIssues) * 100)}%
                      </span>
                      <span className="stat-label">Resolution Rate</span>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">
                      <MessageSquare size={20} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{stats.totalComments}</span>
                      <span className="stat-label">Total Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="issues-content">
            <div className="content-header">
              <h2>Issues Management</h2>
              <div className="filters">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="reported">Reported</option>
                  <option value="in_review">In Review</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="issues-table">
              <div className="table-header">
                <div className="col-title">Issue</div>
                <div className="col-category">Category</div>
                <div className="col-priority">Priority</div>
                <div className="col-status">Status</div>
                <div className="col-assigned">Assigned To</div>
                <div className="col-actions">Actions</div>
              </div>
              <div className="table-body">
                {filteredIssues.map(issue => (
                  <div key={issue.id} className="table-row">
                    <div className="col-title">
                      <div className="issue-title">{issue.title}</div>
                      <div className="issue-reporter">by {issue.reporter}</div>
                    </div>
                    <div className="col-category">
                      <span className="category-badge">
                        {getCategoryIcon(issue.category)} {issue.category}
                      </span>
                    </div>
                    <div className="col-priority">
                      <span className={`priority-badge ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                    <div className="col-status">
                      <span className={`status-badge ${getStatusColor(issue.status)}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="col-assigned">
                      {issue.assignedTo || 'Unassigned'}
                    </div>
                    <div className="col-actions">
                      <button className="action-btn" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn danger" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-content">
            <div className="content-header">
              <h2>User Management</h2>
              <button className="primary-btn">
                <UserPlus size={20} />
                Add New User
              </button>
            </div>
            <div className="users-grid">
              <div className="user-card">
                <div className="user-avatar">
                  <Users size={24} />
                </div>
                <div className="user-info">
                  <h4>John Doe</h4>
                  <p>john.doe@example.com</p>
                  <span className="user-role admin">Admin</span>
                </div>
                <div className="user-actions">
                  <button className="action-btn">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="user-card">
                <div className="user-avatar">
                  <Users size={24} />
                </div>
                <div className="user-info">
                  <h4>Sarah Wilson</h4>
                  <p>sarah.wilson@example.com</p>
                  <span className="user-role staff">Staff</span>
                </div>
                <div className="user-actions">
                  <button className="action-btn">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="user-card">
                <div className="user-avatar">
                  <Users size={24} />
                </div>
                <div className="user-info">
                  <h4>Mike Chen</h4>
                  <p>mike.chen@example.com</p>
                  <span className="user-role user">User</span>
                </div>
                <div className="user-actions">
                  <button className="action-btn">
                    <Edit size={16} />
                  </button>
                  <button className="action-btn danger">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-content">
            <div className="content-header">
              <h2>Analytics & Reports</h2>
              <button className="primary-btn">
                <FileText size={20} />
                Generate Report
              </button>
            </div>
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Issues by Category</h3>
                <div className="chart-placeholder">
                  <BarChart3 size={48} />
                  <p>Chart visualization would go here</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>Resolution Timeline</h3>
                <div className="chart-placeholder">
                  <TrendingUp size={48} />
                  <p>Timeline chart would go here</p>
                </div>
              </div>
              <div className="chart-card">
                <h3>User Activity</h3>
                <div className="chart-placeholder">
                  <Users size={48} />
                  <p>Activity chart would go here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
