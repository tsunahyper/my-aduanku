import { Users } from 'lucide-react';
import './PlaceholderPages.css';

const UsersPage = () => {
  return (
    <div className="page-placeholder">
      <div className="placeholder-content">
        <Users size={48} className="placeholder-icon" />
        <h2>User Management</h2>
        <p>Manage community members and administrators</p>
        <div className="placeholder-features">
          <div className="feature-item">• View all registered users</div>
          <div className="feature-item">• Manage user roles and permissions</div>
          <div className="feature-item">• View user activity and reports</div>
          <div className="feature-item">• Handle user verification</div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
