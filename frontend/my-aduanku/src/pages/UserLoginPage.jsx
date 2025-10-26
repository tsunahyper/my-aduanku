import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, AlertTriangle, Mail, Lock, Users, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './UserLoginPage.css';

const UserLoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setApiStatus('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      setApiStatus('🔄 Attempting to connect to server...');
      const result = await login(formData);
      if (result.success) {
        setApiStatus('✅ Login successful! Redirecting...');
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
        setApiStatus('');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setApiStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-login-page">
      <div className="user-login-container">
        <div className="login-header">
          <div className="logo">
            <Users className="logo-icon" />
            <span className="logo-text">ADUANKU</span>
          </div>
          <h1>Welcome Back, Citizen</h1>
          <p>Sign in to report and track community issues</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          {apiStatus && (
            <div className="api-status">
              {apiStatus}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading || loading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Community Issue Management System</p>
          <p className="version">Version 1.0.0</p>
          <div className="login-switch">
            <p>Are you an administrator?</p>
            <Link to="/admin/login" className="switch-link">
              Admin Login <ArrowLeft size={16} />
            </Link>
          </div>
          <div className="test-credentials">
            <p><strong>Test Credentials:</strong></p>
            <p>Email: testuser@example.com</p>
            <p>Password: password</p>
            <p style={{marginTop: '0.5rem', fontSize: '0.7rem', color: '#9ca3af'}}>Real API user - will try API first</p>
          </div>
        </div>
      </div>

      <div className="login-background">
        <div className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
