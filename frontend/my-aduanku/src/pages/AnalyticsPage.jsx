import { BarChart3 } from 'lucide-react';
import './PlaceholderPages.css';

const AnalyticsPage = () => {
  return (
    <div className="page-placeholder">
      <div className="placeholder-content">
        <BarChart3 size={48} className="placeholder-icon" />
        <h2>Analytics Dashboard</h2>
        <p>View insights and performance metrics</p>
        <div className="placeholder-features">
          <div className="feature-item">• Issue resolution trends</div>
          <div className="feature-item">• User engagement metrics</div>
          <div className="feature-item">• Category-wise statistics</div>
          <div className="feature-item">• Performance reports</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
