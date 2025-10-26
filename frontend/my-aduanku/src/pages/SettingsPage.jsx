import { Settings } from 'lucide-react';
import './PlaceholderPages.css';

const SettingsPage = () => {
  return (
    <div className="page-placeholder">
      <div className="placeholder-content">
        <Settings size={48} className="placeholder-icon" />
        <h2>System Settings</h2>
        <p>Configure system preferences and options</p>
        <div className="placeholder-features">
          <div className="feature-item">• General system settings</div>
          <div className="feature-item">• Notification preferences</div>
          <div className="feature-item">• User role configurations</div>
          <div className="feature-item">• System maintenance tools</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
