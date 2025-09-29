import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken, getUserProfile, logout as apiLogout } from '../config/api';

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

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for auth callback from backend first
      const urlParams = new URLSearchParams(window.location.search);
      const callbackToken = urlParams.get('token');
      const success = urlParams.get('success');
      const error = urlParams.get('error');
      
      if (callbackToken && success) {
        localStorage.setItem('token', callbackToken);
        // Get user profile from backend
        try {
          const userData = await getUserProfile();
          if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Failed to get user profile after auth:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        setLoading(false);
        return;
      }
      
      if (error) {
        console.error('Authentication error:', error);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        setLoading(false);
        return;
      }

      // Check if user is already logged in
      const storedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (storedToken && savedUser) {
        // Verify token with backend
        try {
          const userData = await verifyToken();
          if (userData) {
            setUser(userData);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // Clear invalid storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Redirect to home page
      window.location.href = '/';
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
