import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showConfigError, setShowConfigError] = useState(false);

  const { register, registerWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setSubmitError('');
    
    try {
      // Add role user by default
      const userData = { ...formData, role: 'user' };
      await register(userData);
      
      // If registration is successful, redirect to home page directly
      console.log('Registration successful, redirecting to home page');
      navigate('/');
    } catch (error) {
      setSubmitError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setSubmitError('');
    setShowConfigError(false);
    
    try {
      await registerWithGoogle();
      // Google Auth now handles redirect in the authService
    } catch (error) {
      console.error('Google sign-in error in Register.js:', error);
      
      // Format error message for display
      let errorMessage = error.message || 'Failed to sign in with Google. Please try again.';
      
      // Clean up Firebase error messages for better user experience
      if (errorMessage.includes('Firebase:')) {
        errorMessage = errorMessage.split('Firebase:')[1].trim();
      }
      
      if (errorMessage.includes('auth/') || errorMessage.includes('Error (auth/')) {
        // Extract error code from message pattern like "Error (auth/popup-closed-by-user)."
        const codeMatch = errorMessage.match(/\(auth\/([^)]+)\)/);
        if (codeMatch && codeMatch[1]) {
          const errorCode = codeMatch[1];
          switch (errorCode) {
            case 'popup-blocked':
              errorMessage = 'Sign-in popup was blocked. Please allow popups for this site.';
              break;
            case 'popup-closed-by-user':
              errorMessage = 'Sign-in was cancelled. Please try again.';
              break;
            case 'cancelled-popup-request':
              errorMessage = 'Sign-in was cancelled. Please try again.';
              break;
            case 'account-exists-with-different-credential':
              errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
              break;
            case 'invalid-credential':
              errorMessage = 'The sign-in credential is invalid. Please try again.';
              break;
            case 'operation-not-allowed':
              errorMessage = 'Google sign-in is not enabled for this application.';
              setShowConfigError(true);
              break;
            case 'user-disabled':
              errorMessage = 'This user account has been disabled.';
              break;
            default:
              errorMessage = `Authentication error: ${errorCode}`;
          }
        }
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-secondary text-shadow">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-base text-secondary-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark animate-hover">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg rounded-xl sm:px-10">
          {submitError ? (
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
                  <p className="text-sm text-red-700 font-medium">{submitError}</p>
                  {showConfigError && (
                    <p className="text-xs text-red-600 mt-1">
                      The Firebase API key needs to be configured in the project. Please see the firebase/config.js file.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* Google Sign In Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {isGoogleLoading ? (
                <svg className="animate-spin h-5 w-5 text-gray-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FcGoogle className="h-5 w-5 mr-2" />
              )}
              {isGoogleLoading ? 'Signing in...' : 'Sign up with Google'}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.name ? 'border-red-300 ring-red-300' : ''
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name ? (
                  <p className="form-error">{errors.name}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.email ? 'border-red-300 ring-red-300' : ''
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.password ? 'border-red-300 ring-red-300' : ''
                  }`}
                  placeholder="Create a password"
                />
                {errors.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.confirmPassword ? 'border-red-300 ring-red-300' : ''
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword ? (
                  <p className="form-error">{errors.confirmPassword}</p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms-and-conditions" className="text-primary hover:text-primary-dark">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-primary hover:text-primary-dark">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full btn btn-primary ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 