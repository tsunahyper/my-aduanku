import { MessageSquare } from 'lucide-react';
import './PlaceholderPages.css';

const CommentsPage = () => {
  return (
    <div className="page-placeholder">
      <div className="placeholder-content">
        <MessageSquare size={48} className="placeholder-icon" />
        <h2>Comments Management</h2>
        <p>Review and moderate community comments</p>
        <div className="placeholder-features">
          <div className="feature-item">• View all comments on issues</div>
          <div className="feature-item">• Moderate inappropriate content</div>
          <div className="feature-item">• Reply to community members</div>
          <div className="feature-item">• Track comment engagement</div>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
