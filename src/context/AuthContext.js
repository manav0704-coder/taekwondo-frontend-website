import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import AuthService from '../api/authService';

// Enable this flag to bypass authentication for development/testing
const DEV_MODE_BYPASS_AUTH = false;

// Mock regular user for development
const DEV_USER = {
  _id: 'dev-user-id',
  name: 'Developer User',
  email: 'dev@example.com',
  role: 'user',
  status: 'active',
  createdAt: new Date().toISOString()
};

// Create auth context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Initialize currentUser from localStorage on mount
    if (DEV_MODE_BYPASS_AUTH) return DEV_USER;
    
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [loading, setLoading] = useState(!DEV_MODE_BYPASS_AUTH);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(DEV_MODE_BYPASS_AUTH ? 'dev-token' : localStorage.getItem('token'));
  
  // Refresh authentication state from localStorage
  const refreshAuthState = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setToken(storedToken);
      } catch (err) {
        console.error('Error parsing user from storage:', err);
      }
    } else if (!storedToken) {
      // If token is removed, clear the user
      setCurrentUser(null);
      setToken(null);
    }
  };

  // Check if user is logged in on page load (skip in DEV_MODE)
  useEffect(() => {
    if (DEV_MODE_BYPASS_AUTH) return;
    
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // First check if we have data in localStorage (done in initial state)
        if (AuthService.isAuthenticated()) {
          // Then try to fetch fresh data from the server
          try {
            const userData = await AuthService.getCurrentUser();
            if (userData && userData.data) {
              setCurrentUser(userData.data);
            }
          } catch (e) {
            console.error('Error refreshing user data:', e);
          }
        }
      } catch (err) {
        setError(err.message || 'Authentication error');
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user' || e.key === null) {
        refreshAuthState();
      }
    };
    
    // Set up custom event listener
    const handleAppStorageUpdate = () => {
      refreshAuthState();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('app-storage-update', handleAppStorageUpdate);
    
    // Use a lower frequency for polling to reduce performance impact
    const interval = setInterval(refreshAuthState, 10000); // Check every 10 seconds instead of 2
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('app-storage-update', handleAppStorageUpdate);
      clearInterval(interval);
    };
  }, []);

  // Login user
  const login = async (credentials) => {
    if (DEV_MODE_BYPASS_AUTH) {
      setCurrentUser(DEV_USER);
      setToken('dev-token');
      toast.success('Developer login successful');
      return { user: DEV_USER, token: 'dev-token' };
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await AuthService.login(credentials);
      setCurrentUser(data.user);
      setToken(data.token);
      return data;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    if (DEV_MODE_BYPASS_AUTH) {
      setCurrentUser(DEV_USER);
      setToken('dev-token');
      toast.success('Developer registration successful');
      return { user: DEV_USER, token: 'dev-token' };
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await AuthService.register(userData);
      setCurrentUser(data.user);
      setToken(data.token);
      toast.success(`Welcome, ${data.user.name}! Your account has been created.`, {
        position: "top-right", 
        autoClose: 4000
      });
      return data;
    } catch (err) {
      setError(err.message || 'Registration failed');
      toast.error(err.message || 'Registration failed. Please try again.', {
        position: "top-right", 
        autoClose: 4000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register with Google
  const registerWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('AuthContext: Starting Google authentication');
      
      // Use the AuthService for Google authentication
      const result = await AuthService.registerWithGoogle();
      
      if (result && result.user) {
        setCurrentUser(result.user);
        setToken(result.token);
        console.log('Google auth successful, user set:', result.user.name);
      }
      
      return result;
    } catch (error) {
      setError(error.message || 'Google authentication failed');
      console.error('AuthContext: Google authentication error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    if (DEV_MODE_BYPASS_AUTH) {
      console.log('DEV MODE: Logout ignored');
      return;
    }
    
    try {
      setLoading(true);
      await AuthService.logout();
      setCurrentUser(null);
      setToken(null);
      // NOTE: We don't need to show toast here as it's handled in the Profile component
    } catch (err) {
      setError(err.message || 'Logout failed');
      console.error('Logout error:', err);
      toast.error('Logout failed. Please try again.', {
        position: "top-right", 
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // Update user password
  const updatePassword = async (passwordData) => {
    if (DEV_MODE_BYPASS_AUTH) {
      console.log('DEV MODE: Password update simulated');
      toast.success('Password updated successfully (Development Mode)');
      return { success: true };
    }
    
    try {
      setLoading(true);
      setError(null);
      const result = await AuthService.updatePassword(passwordData);
      toast.success('Password updated successfully', {
        position: "top-right", 
        autoClose: 3000
      });
      return result;
    } catch (err) {
      setError(err.message || 'Password update failed');
      toast.error(err.message || 'Password update failed. Please try again.', {
        position: "top-right", 
        autoClose: 4000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    token,
    login,
    register,
    registerWithGoogle,
    logout,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 