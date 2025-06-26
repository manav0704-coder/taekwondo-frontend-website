import API from './axios';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, getAuth } from 'firebase/auth';

// A helper function to set user data in localStorage and dispatch events
const updateAuthStorage = (token, userData) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  
  // Dispatch events to notify components about authentication changes
  try {
    // Standard event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'token'
    }));
    
    // Custom event for this app
    window.dispatchEvent(new Event('app-storage-update'));
  } catch (error) {
    console.error('Error dispatching storage events:', error);
  }
};

// Service for handling authentication-related API calls
const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      if (response.data.token) {
        updateAuthStorage(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      throw error.response ? 
        new Error(error.response.data.message || 'Registration error') : 
        new Error('Network error');
    }
  },

  // Register with Google - Main method for Google authentication
  registerWithGoogle: async () => {
    try {
      console.log('Starting Google authentication process');
      
      // Make sure auth is available and configured
      const currentAuth = auth || getAuth();
      
      if (!googleProvider || !currentAuth) {
        console.error('Firebase authentication is not properly initialized');
        throw new Error('Google authentication is not available. Please try again later.');
      }
      
      console.log('Opening Google sign-in popup...');
      const result = await signInWithPopup(currentAuth, googleProvider);
      
      if (!result || !result.user) {
        throw new Error('Failed to authenticate with Google');
      }
      
      // Get the ID token for server verification
      const idToken = await result.user.getIdToken();
      
      // Create user data object from Google profile
      const userData = {
        name: result.user.displayName || 'User',
        email: result.user.email,
        role: 'user',
        googleId: result.user.uid,
        photoURL: result.user.photoURL || ''
      };
      
      console.log('Google authentication successful, sending to backend');
      
      // Send user data to backend
      try {
        const response = await API.post('/auth/google', {
          ...userData,
          idToken
        });
        
        if (response.data.token) {
          updateAuthStorage(response.data.token, response.data.user);
        }
        
        return response.data;
      } catch (backendError) {
        console.error('Backend API error:', backendError);
        
        // Create fallback authentication if backend fails
        const fallbackUser = {
          _id: userData.googleId,
          name: userData.name,
          email: userData.email,
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
          photoURL: userData.photoURL
        };
        
        updateAuthStorage('google-auth-token', fallbackUser);
        
        return { user: fallbackUser, token: 'google-auth-token' };
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Google Sign-In is not enabled in Firebase. Please enable it in the Firebase console.');
      }
      
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in window was closed. Please try again.');
      }
      
      throw error;
    }
  },

  // Process Google ID token from direct sign-in
  processGoogleToken: async (idToken, userData) => {
    try {
      // Send data to backend
      const response = await API.post('/auth/google', {
        ...userData,
        idToken
      });
      
      if (response.data.token) {
        updateAuthStorage(response.data.token, response.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to process Google token:', error);
      
      // Create fallback authentication if backend fails
      const fallbackUser = {
        _id: userData.googleId,
        name: userData.name,
        email: userData.email,
        role: 'user',
        status: 'active',
        createdAt: new Date().toISOString(),
        photoURL: userData.photoURL || ''
      };
      
      updateAuthStorage('google-auth-token-temporary', fallbackUser);
      
      return { user: fallbackUser, token: 'google-auth-token-temporary' };
    }
  },

  // Login a user
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data.token) {
        updateAuthStorage(response.data.token, response.data.user);
      }
      return response.data;
    } catch (error) {
      throw error.response ? 
        new Error(error.response.data.message || 'Login error') : 
        new Error('Network error');
    }
  },

  // Logout the current user
  logout: async () => {
    try {
      // First, attempt to sign out from Firebase if auth is available
      if (auth) {
        console.log('Signing out from Firebase');
        await auth.signOut().catch(err => console.error('Firebase signout error:', err));
      }

      // Then call the backend API
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage, even if API or Firebase fails
      console.log('Clearing local storage');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Dispatch events for logout as well
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'token'
      }));
      window.dispatchEvent(new Event('app-storage-update'));
    }
  },

  // Get the current logged-in user
  getCurrentUser: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response ? 
        new Error(error.response.data.message || 'Authentication error') : 
        new Error('Network error');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get the current user from local storage
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Update password
  updatePassword: async (passwordData) => {
    try {
      console.log('AuthService: Sending password update request');
      const response = await API.put('/users/updatepassword', passwordData);
      console.log('AuthService: Password update successful');
      return response.data;
    } catch (error) {
      console.error('Update password error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error.response ? 
        new Error(error.response.data.message || 'Password update error') : 
        new Error('Network error');
    }
  },
  
  // Forgot password - Send password reset email
  forgotPassword: async (email) => {
    try {
      console.log('AuthService: Sending forgot password request for email:', email);
      // Use our API wrapper instead of direct axios call
      const response = await API.post('/auth/forgot-password', { email });
      console.log('AuthService: Forgot password response:', response.data);
      return response.data;
    } catch (error) {
      console.error('AuthService: Forgot password error:', error.response?.data || error.message);
      throw error.response ? 
        new Error(error.response.data.message || 'Failed to send reset email') : 
        new Error('Network error');
    }
  },

  // Verify reset token
  verifyResetToken: async (token) => {
    try {
      console.log('AuthService: Verifying reset token:', token);
      const response = await API.get(`/auth/reset-password/${token}/verify`);
      console.log('AuthService: Token verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error('AuthService: Token verification error:', error.response?.data || error.message);
      throw error.response ? 
        new Error(error.response.data.message || 'Invalid or expired token') : 
        new Error('Network error');
    }
  },
  
  // Reset password with token
  resetPassword: async (token, password) => {
    try {
      console.log('AuthService: Resetting password with token');
      const response = await API.post(`/auth/reset-password/${token}`, { password });
      console.log('AuthService: Password reset successful');
      return response.data;
    } catch (error) {
      console.error('AuthService: Password reset error:', error.response?.data || error.message);
      throw error.response ? 
        new Error(error.response.data.message || 'Failed to reset password') : 
        new Error('Network error');
    }
  }
};

export default AuthService; 