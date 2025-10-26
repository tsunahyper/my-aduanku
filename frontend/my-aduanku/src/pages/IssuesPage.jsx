import { AlertTriangle } from 'lucide-react';
import './PlaceholderPages.css';

const IssuesPage = () => {
  return (
    <div className="page-placeholder">
      <div className="placeholder-content">
        <AlertTriangle size={48} className="placeholder-icon" />
        <h2>Issues Management</h2>
        <p>Manage and track community issues</p>
        <div className="placeholder-features">
          <div className="feature-item">• View all reported issues</div>
          <div className="feature-item">• Filter by category and status</div>
          <div className="feature-item">• Assign issues to administrators</div>
          <div className="feature-item">• Update issue status</div>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
