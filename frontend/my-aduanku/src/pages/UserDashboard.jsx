import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  AlertTriangle, 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Calendar,
  FileText,
  Camera,
  Upload,
  Send
} from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'road',
    priority: 'medium',
    location: '',
    image: null
  });

  // Mock data for user dashboard
  useEffect(() => {
    const mockTickets = [
      {
        id: 1,
        title: "Pothole on Jalan Ampang",
        description: "Large pothole causing traffic issues and potential damage to vehicles",
        category: "road",
        priority: "high",
        status: "reported",
        location: "Jalan Ampang, Kuala Lumpur",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
        comments: 3,
        assignedTo: null,
        image: null
      },
      {
        id: 2,
        title: "Water leak at Taman Desa",
        description: "Water leaking from main pipe near the playground",
        category: "water",
        priority: "medium",
        status: "in_review",
        location: "Taman Desa, Kuala Lumpur",
        createdAt: "2024-01-14T15:20:00Z",
        updatedAt: "2024-01-15T09:15:00Z",
        comments: 7,
        assignedTo: "Sarah Wilson",
        image: null
      },
      {
        id: 3,
        title: "Street light not working",
        description: "Street light has been out for 3 days, making the area unsafe at night",
        category: "electricity",
        priority: "low",
        status: "assigned",
        location: "Jalan Bukit Bintang, Kuala Lumpur",
        createdAt: "2024-01-13T08:45:00Z",
        updatedAt: "2024-01-14T14:20:00Z",
        comments: 1,
        assignedTo: "David Lee",
        image: null
      },
      {
        id: 4,
        title: "Broken playground equipment",
        description: "Swing set is broken and poses safety risk to children",
        category: "safety",
        priority: "high",
        status: "resolved",
        location: "Taman Tasik Perdana, Kuala Lumpur",
        createdAt: "2024-01-10T11:00:00Z",
        updatedAt: "2024-01-12T16:30:00Z",
        comments: 5,
        assignedTo: "Mike Chen",
        image: null
      }
    ];

    setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
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
      case 'waste': return '🗑️';
      case 'noise': return '🔊';
      default: return '📋';
    }
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: 'reported',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: 0,
      assignedTo: null
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({
      title: '',
      description: '',
      category: 'road',
      priority: 'medium',
      location: '',
      image: null
    });
    setShowCreateTicket(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTicket(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  if (loading) {
    return (
      <div className="user-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name || 'Citizen'}!</h1>
            <p>Track and manage your community issues</p>
          </div>
          <button 
            className="create-ticket-btn"
            onClick={() => setShowCreateTicket(true)}
          >
            <Plus size={20} />
            Create New Ticket
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3>{tickets.length}</h3>
            <p>Total Tickets</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{tickets.filter(t => t.status === 'reported' || t.status === 'in_review').length}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <MessageSquare size={24} />
          </div>
          <div className="stat-content">
            <h3>{tickets.reduce((sum, ticket) => sum + ticket.comments, 0)}</h3>
            <p>Comments</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FileText size={20} />
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'tickets' ? 'active' : ''}`}
          onClick={() => setActiveTab('tickets')}
        >
          <AlertTriangle size={20} />
          My Tickets
        </button>
        <button 
          className={`tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          <Plus size={20} />
          Create Ticket
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="content-grid">
              <div className="recent-tickets-card">
                <div className="card-header">
                  <h3>Recent Tickets</h3>
                  <button 
                    className="view-all-btn"
                    onClick={() => setActiveTab('tickets')}
                  >
                    View All
                  </button>
                </div>
                <div className="tickets-list">
                  {tickets.slice(0, 5).map(ticket => (
                    <div key={ticket.id} className="ticket-item">
                      <div className="ticket-info">
                        <div className="ticket-header">
                          <span className="category-icon">{getCategoryIcon(ticket.category)}</span>
                          <span className={`priority ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <h4>{ticket.title}</h4>
                        <p>{ticket.description.substring(0, 100)}...</p>
                        <div className="ticket-meta">
                          <span className="ticket-location">
                            <MapPin size={14} />
                            {ticket.location}
                          </span>
                          <span className="ticket-date">
                            <Clock size={14} />
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ticket-actions">
                        <span className={`status ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
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
                      <span className="stat-number">{tickets.filter(t => t.status === 'reported' || t.status === 'in_review').length}</span>
                      <span className="stat-label">Pending Tickets</span>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">
                      <CheckCircle size={20} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">
                        {Math.round((tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length / tickets.length) * 100)}%
                      </span>
                      <span className="stat-label">Resolution Rate</span>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <div className="stat-icon">
                      <MessageSquare size={20} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{tickets.reduce((sum, ticket) => sum + ticket.comments, 0)}</span>
                      <span className="stat-label">Total Comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="tickets-content">
            <div className="content-header">
              <h2>My Tickets</h2>
              <div className="filters">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search tickets..."
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

            <div className="tickets-grid">
              {filteredTickets.length === 0 ? (
                <div className="no-tickets">
                  <AlertTriangle size={48} />
                  <h3>No tickets found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredTickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-card-header">
                      <div className="ticket-category">
                        <span className="category-icon">{getCategoryIcon(ticket.category)}</span>
                        <span className="category-name">{ticket.category}</span>
                      </div>
                      <div className="ticket-meta">
                        <span className={`priority ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`status ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="ticket-card-content">
                      <h3 className="ticket-title">{ticket.title}</h3>
                      <p className="ticket-description">{ticket.description}</p>
                      <div className="ticket-location">
                        <MapPin size={16} />
                        <span>{ticket.location}</span>
                      </div>
                    </div>
                    <div className="ticket-card-footer">
                      <div className="ticket-dates">
                        <div className="ticket-date">
                          <Calendar size={16} />
                          <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                        {ticket.updatedAt !== ticket.createdAt && (
                          <div className="ticket-date">
                            <Clock size={16} />
                            <span>Updated {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="ticket-actions">
                        <button className="action-btn" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="action-btn" title="Add Comment">
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="create-ticket-content">
            <div className="content-header">
              <h2>Create New Ticket</h2>
            </div>
            <form onSubmit={handleCreateTicket} className="create-ticket-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Ticket Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTicket.title}
                    onChange={handleInputChange}
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={newTicket.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="road">Road & Infrastructure</option>
                    <option value="water">Water & Sewage</option>
                    <option value="electricity">Electricity</option>
                    <option value="safety">Safety & Security</option>
                    <option value="waste">Waste Management</option>
                    <option value="noise">Noise Pollution</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">Priority *</label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTicket.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newTicket.location}
                    onChange={handleInputChange}
                    placeholder="Street address or landmark"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTicket.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the issue..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Attach Image (Optional)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <label htmlFor="image" className="file-upload-label">
                    <Camera size={20} />
                    <span>Choose Image</span>
                  </label>
                  {newTicket.image && (
                    <span className="file-name">{newTicket.image.name}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setNewTicket({
                    title: '',
                    description: '',
                    category: 'road',
                    priority: 'medium',
                    location: '',
                    image: null
                  })}
                >
                  Clear Form
                </button>
                <button type="submit" className="submit-btn">
                  <Send size={20} />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
