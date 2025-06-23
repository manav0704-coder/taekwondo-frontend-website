import API from './axios';
import axios from 'axios';
import { googleProvider } from '../firebase/config';
import { signInWithPopup, getAuth, getRedirectResult } from 'firebase/auth';

// Service for handling authentication-related API calls
const AuthService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? 
        new Error(error.response.data.message || 'Registration error') : 
        new Error('Network error');
    }
  },

  // Register with Google
  registerWithGoogle: async () => {
    try {
      // Reinitialize auth to ensure we have fresh credentials
      const currentAuth = getAuth();
      
      // Set custom parameters for the auth provider
      googleProvider.setCustomParameters({
        // Force account selection
        prompt: 'select_account'
      });
      
      // Try popup method first
      try {
        const result = await signInWithPopup(currentAuth, googleProvider);
        
        if (!result || !result.user) {
          throw new Error('Failed to authenticate with Google. Please try again.');
        }
        
        // Google user data
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          googleId: result.user.uid,
          role: 'user',
          photoURL: result.user.photoURL || ''
        };
        
        console.log('Google authentication successful, sending data to backend:', userData);
        
        // Register or login with the backend
        try {
          const response = await API.post('/auth/google', userData);
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Automatically redirect to home page after successful Google login
            window.location.href = '/';
            
            return response.data;
          }
          return response.data;
        } catch (backendError) {
          console.error('Backend API error:', backendError);
          
          // Try a direct call to bypass any API issues
          try {
            const directResponse = await axios({
              method: 'post',
              url: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/google`,
              data: userData,
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            if (directResponse.data.token) {
              localStorage.setItem('token', directResponse.data.token);
              localStorage.setItem('user', JSON.stringify(directResponse.data.user));
              
              // Automatically redirect to home page
              window.location.href = '/';
              
              return directResponse.data;
            }
          } catch (directError) {
            console.error('Direct API call also failed:', directError);
          }
          
          // Fallback to client-side session
          console.warn('Creating client-side session as fallback');
          
          const mockUser = {
            _id: userData.googleId,
            name: userData.name,
            email: userData.email,
            role: 'user',
            status: 'active',
            createdAt: new Date().toISOString()
          };
          
          localStorage.setItem('token', 'google-auth-token');
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          // Automatically redirect to home page
          window.location.href = '/';
          
          return { user: mockUser, token: 'google-auth-token' };
        }
      } catch (popupError) {
        console.error('Google sign-in popup error:', popupError);
        
        // Handle specific errors
        if (popupError.code === 'auth/popup-blocked') {
          throw new Error('Popup was blocked by your browser. Please allow popups for this site or try again.');
        }
        
        if (popupError.code === 'auth/popup-closed-by-user' || 
            popupError.code === 'auth/cancelled-popup-request') {
          throw new Error('Sign-in was cancelled. Please try again.');
        }
        
        throw new Error(`Google sign-in failed: ${popupError.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw new Error(error.message || 'Google sign-in failed. Please try again.');
    }
  },

  // Handle redirect result for Google auth
  handleRedirectResult: async () => {
    try {
      const auth = getAuth();
      const result = await getRedirectResult(auth);
      
      if (!result) {
        // No redirect result, user might not have been redirected yet
        return null;
      }
      
      // Google user data
      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        googleId: result.user.uid,
        role: 'user',
        photoURL: result.user.photoURL || ''
      };
      
      // Complete the authentication process
      try {
        const response = await API.post('/auth/google', userData);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Automatically redirect to home page
          window.location.href = '/';
          
          return response.data;
        }
        return response.data;
      } catch (backendError) {
        console.error('Backend API error during redirect handling:', backendError);
        
        // Try a direct call to bypass any API issues
        try {
          const directResponse = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/google`,
            data: userData,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (directResponse.data.token) {
            localStorage.setItem('token', directResponse.data.token);
            localStorage.setItem('user', JSON.stringify(directResponse.data.user));
            
            // Redirect to home page
            window.location.href = '/';
            
            return directResponse.data;
          }
        } catch (directError) {
          console.error('Direct API call also failed during redirect handling:', directError);
        }
        
        // Fallback to client-side session
        console.warn('Creating client-side session for redirect result');
        
        const mockUser = {
          _id: userData.googleId,
          name: userData.name,
          email: userData.email,
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('token', 'google-auth-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Redirect to home page
        window.location.href = '/';
        
        return { user: mockUser, token: 'google-auth-token' };
      }
    } catch (error) {
      console.error('Error handling redirect result:', error);
      return null;
    }
  },

  // Login a user
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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