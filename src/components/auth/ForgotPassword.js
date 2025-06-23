import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';
import { checkServerHealth, testDatabaseConnection } from '../../utils/serverHealth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { showError, showLoading, updateNotification } = useNotification();

  // Check if server and database are working on component mount
  useEffect(() => {
    const checkServerAndDatabase = async () => {
      try {
        // Check server health
        const healthStatus = await checkServerHealth();
        if (!healthStatus.isHealthy) {
          console.error('Server health check failed:', healthStatus.error);
          setError('Server is not responding. Please try again later.');
          return;
        }
        
        // Test database connection
        const dbStatus = await testDatabaseConnection();
        if (!dbStatus.isConnected) {
          console.error('Database connection issue:', dbStatus.message);
          setError('Database connection issue. Please try again later.');
          return;
        }
        
        console.log('Server and database are working properly');
      } catch (err) {
        console.error('Server check failed:', err.message);
      }
    };

    checkServerAndDatabase();
  }, []);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      showError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      showError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Show loading notification
    const toastId = showLoading('Sending password reset email...');
    
    try {
      console.log('Sending password reset request for:', email);
      
      // Define baseUrl with deployed URL from environment or default to render URL
      const baseUrl = process.env.REACT_APP_API_URL || 'https://taekwondo-website-backend.onrender.com';
      
      // Make the API call
      const endpoint = `${baseUrl}/api/auth/forgot-password`;
      console.log('Making request to:', endpoint);
      
      const response = await axios({
        method: 'post',
        url: endpoint,
        data: { email },
        headers: {
          'Content-Type': 'application/json'
        },
        // Add timeout to prevent hanging requests
        timeout: 20000
      });
      
      console.log('Password reset response:', response.data);
      const successMessage = response.data.message || 'Password reset instructions sent to your email';
      setSuccess(successMessage);
      setIsSubmitted(true);
      
      // Update loading toast to success
      updateNotification(toastId, successMessage, 'success');
    } catch (err) {
      console.error('Password reset error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText,
        url: err.config?.url
      });
      
      let errorMessage;
      
      if (err.response) {
        // Server responded with a status other than 2xx
        errorMessage = err.response.data?.message || 
          `Server error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your internet connection and try again.';
      } else {
        // Error in setting up the request
        errorMessage = `Request failed: ${err.message}`;
      }
      
      setError(errorMessage);
      
      // Update loading toast to error
      updateNotification(toastId, errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-secondary text-shadow">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-base text-secondary-500">
            We'll send you instructions to reset it
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg 
                    className="h-5 w-5 text-red-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg 
                    className="h-5 w-5 text-green-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">{success}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Please check both your inbox and spam folder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="mt-4 text-sm text-gray-600">
                Don't see the email? Check your spam folder or
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSuccess('');
                  }}
                  className="ml-1 text-primary hover:text-primary-dark focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  try again
                </button>
              </p>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Remember your password?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 