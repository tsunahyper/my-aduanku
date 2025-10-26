import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService, UserService, apiUtils } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // For development: Check if it's a mock token
          if (process.env.NODE_ENV === 'development' && token.startsWith('mock-jwt-token-')) {
            // Mock user data - you could store this in localStorage too
            const mockUser = {
              id: '68fe4fb79ce15b974237f228',
              username: 'testuser',
              name: 'Test User',
              email: 'testuser@example.com',
              role: 'user',
              avatar: null,
              phone: '+1234567890',
              createdAt: new Date().toISOString()
            };
            setUser(mockUser);
            setIsAuthenticated(true);
          } else {
            // Production: Verify token by getting user profile
            const userProfile = await UserService.getProfile();
            setUser(userProfile);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', apiUtils.handleError(error));
        // Token is invalid, clear it
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Always try API first
      try {
        console.log('🔄 Attempting API login...');
        const response = await AuthService.login(credentials);
        console.log('✅ API login successful:', response);
        
        if (response.data && response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          setUser(response.data.user);
          setIsAuthenticated(true);
          return { success: true, user: response.data.user };
        } else if (response.token) {
          localStorage.setItem('authToken', response.token);
          setUser(response.user);
          setIsAuthenticated(true);
          return { success: true, user: response.user };
        } else {
          throw new Error('No token received from server');
        }
      } catch (apiError) {
        console.log('❌ API login failed, falling back to mock authentication:', apiError.message);
        
        // Fallback to mock authentication for development
        if (process.env.NODE_ENV === 'development') {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data based on email (matching database)
          const mockUsers = {
            'testuser@example.com': {
              id: '68fe4fb79ce15b974237f228',
              username: 'testuser',
              name: 'Test User',
              email: 'testuser@example.com',
              role: 'user',
              avatar: null,
              phone: '+1234567890',
              createdAt: new Date().toISOString()
            },
            'admin@aduanku.com': {
              id: '68fe45954823af498cd63be4',
              username: 'admin',
              name: 'Admin User',
              email: 'admin@aduanku.com',
              role: 'admin',
              avatar: null,
              phone: '+1234567890',
              createdAt: new Date().toISOString()
            },
            'superadmin@example.com': {
              id: '68fe45a74823af498cd63be8',
              username: 'superadmin',
              name: 'Super Admin',
              email: 'superadmin@example.com',
              role: 'superadmin',
              avatar: null,
              phone: '+1234567890',
              createdAt: new Date().toISOString()
            }
          };
          
          const user = mockUsers[credentials.email];
          
          // Check password based on user type
          let validPassword = false;
          if (user) {
            if (user.role === 'admin' || user.role === 'superadmin') {
              validPassword = credentials.password === 'password123';
            } else {
              validPassword = credentials.password === 'password';
            }
          }
          
          if (user && validPassword) {
            console.log('✅ Mock authentication successful');
            const mockToken = 'mock-jwt-token-' + Date.now();
            localStorage.setItem('authToken', mockToken);
            setUser(user);
            setIsAuthenticated(true);
            return { success: true, user: user };
          } else {
            return { 
              success: false, 
              error: 'Invalid email or password' 
            };
          }
        } else {
          // In production, re-throw the API error
          throw apiError;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorInfo = apiUtils.handleError(error);
      return { 
        success: false, 
        error: errorInfo.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await AuthService.register(userData);
      
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      const errorInfo = apiUtils.handleError(error);
      return { 
        success: false, 
        error: errorInfo.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', apiUtils.handleError(error));
    } finally {
      // Always clear local state regardless of API call result
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
