import { useState, useEffect } from 'react';
import { decodeToken } from '../utils/decodeToken';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  isLoading: boolean;
  logout: () => void;
}

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  useEffect(() => {
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

    checkAuth();
  }, []);

  return { isAuthenticated, userRole, isLoading, logout };
};
