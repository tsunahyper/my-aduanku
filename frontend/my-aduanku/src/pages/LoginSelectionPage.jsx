import { Link } from 'react-router-dom';
import { Users, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import './LoginSelectionPage.css';

const LoginSelectionPage = () => {
  return (
    <div className="login-selection-page">
      <div className="selection-container">
        <div className="selection-header">
          <div className="logo">
            <AlertTriangle className="logo-icon" />
            <span className="logo-text">ADUANKU</span>
          </div>
          <h1>Welcome to ADUANKU</h1>
          <p>Choose your login type to continue</p>
        </div>

        <div className="login-options">
          <Link to="/login" className="login-option user-option">
            <div className="option-icon">
              <Users size={48} />
            </div>
            <div className="option-content">
              <h3>Citizen Login</h3>
              <p>Report and track community issues</p>
              <ul className="option-features">
                <li>Report new issues</li>
                <li>Track issue status</li>
                <li>View community updates</li>
                <li>Comment on issues</li>
              </ul>
            </div>
            <div className="option-arrow">
              <ArrowRight size={24} />
            </div>
          </Link>

          <Link to="/admin/login" className="login-option admin-option">
            <div className="option-icon">
              <Shield size={48} />
            </div>
            <div className="option-content">
              <h3>Admin Login</h3>
              <p>Manage community issues and users</p>
              <ul className="option-features">
                <li>Manage all issues</li>
                <li>Assign to staff</li>
                <li>View analytics</li>
                <li>User management</li>
              </ul>
            </div>
            <div className="option-arrow">
              <ArrowRight size={24} />
            </div>
          </Link>
        </div>

        <div className="selection-footer">
          <p>Community Issue Management System</p>
          <p className="version">Version 1.0.0</p>
        </div>
      </div>

      <div className="selection-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelectionPage;
