import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../api/authService';
import { toast } from 'react-toastify';

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
  const [currentUser, setCurrentUser] = useState(DEV_MODE_BYPASS_AUTH ? DEV_USER : null);
  const [loading, setLoading] = useState(!DEV_MODE_BYPASS_AUTH);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(DEV_MODE_BYPASS_AUTH ? 'dev-token' : localStorage.getItem('token'));

  // Check if user is logged in on page load (skip in DEV_MODE)
  useEffect(() => {
    if (DEV_MODE_BYPASS_AUTH) return;
    
    const initAuth = async () => {
      try {
        setLoading(true);
        if (AuthService.isAuthenticated()) {
          // Get user from storage first
          const storedUser = AuthService.getUser();
          const storedToken = localStorage.getItem('token');
          console.log('Auth initialized with stored token:', storedToken ? 'Token exists' : 'No token');
          console.log('Auth initialized with user:', storedUser ? storedUser.name : 'No user');
          
          setCurrentUser(storedUser);
          setToken(storedToken);
          
          // Then try to fetch fresh data from the server
          try {
            const userData = await AuthService.getCurrentUser();
            setCurrentUser(userData.data);
            console.log('User data refreshed from server:', userData.data.name);
            
            // No longer show welcome notification here since Login.js will handle it
          } catch (e) {
            // If server request fails, keep using stored user
            console.error('Error refreshing user data:', e);
          }
        } else {
          console.log('No authentication found in storage');
        }
      } catch (err) {
        setError(err.message || 'Authentication error');
        console.error('Auth initialization error:', err);
        toast.error('Session expired. Please login again.', {
          position: "top-right", 
          autoClose: 4000
        });
      } finally {
        setLoading(false);
      }
    };

    initAuth();
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

  // Register user with Google
  const registerWithGoogle = async () => {
    if (DEV_MODE_BYPASS_AUTH) {
      setCurrentUser(DEV_USER);
      setToken('dev-token');
      toast.success('Developer Google login successful');
      return { user: DEV_USER, token: 'dev-token' };
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await AuthService.registerWithGoogle();
      setCurrentUser(data.user);
      setToken(data.token);
      toast.success(`Welcome, ${data.user.name}!`, {
        position: "top-right", 
        autoClose: 3000
      });
      return data;
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      toast.error(err.message || 'Google sign-in failed. Please try again.', {
        position: "top-right", 
        autoClose: 4000
      });
      throw err;
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