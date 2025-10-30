import { useState, useEffect } from 'react';
import { decodeToken } from '../utils/decodeToken';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  isLoading: boolean;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decoded = decodeToken(token);
      
      if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
        setUserRole(decoded.role);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  useEffect(() => {
    // Initial auth check
    checkAuth();

    // Listen for storage changes (when token is added/removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkAuth();
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return { isAuthenticated, userRole, isLoading, logout, checkAuth };
};
