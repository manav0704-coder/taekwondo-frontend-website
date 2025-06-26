import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import AuthService from '../../api/authService';
import { auth, googleProvider } from '../../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { refreshAuthStateApp } from '../../App';

const GoogleAuth = ({ onSuccess, buttonText = "Sign in with Google" }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      
      // Show pending toast
      const pendingToast = toast.info(
        <div className="flex items-center">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
          <span>Connecting to Google...</span>
        </div>,
        {
          autoClose: false,
          hideProgressBar: false,
          closeButton: false
        }
      );
      
      try {
        // Logging for debug purposes
        console.log('Starting Google authentication flow');
        
        // Use the already configured googleProvider from firebase/config
        console.log('Using signInWithPopup with the configured provider');
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Sign-in successful:', result.user.email);
        
        // Dismiss the pending toast
        toast.dismiss(pendingToast);
        
        if (result && result.user) {
          // Get the user's info
          const userData = {
            name: result.user.displayName || 'User',
            email: result.user.email,
            role: 'user',
            googleId: result.user.uid,
            photoURL: result.user.photoURL || ''
          };
          
          // Get ID token for backend verification
          const idToken = await result.user.getIdToken();
          
          // Process the authentication on the backend
          const response = await AuthService.processGoogleToken(idToken, userData);
          
          if (response && response.user) {
            // Trigger custom event to update auth state immediately
            window.dispatchEvent(new Event('app-storage-update'));
            
            // Use the app-level refresh function for good measure
            refreshAuthStateApp();
            
            if (onSuccess) {
              onSuccess(response.user);
            } else {
              toast.success(`Welcome, ${response.user.name}!`);
              
              // Force navigation to trigger route change and auth refresh
              navigate('/');
              
              // Add a small delay and refresh auth state again
              setTimeout(() => {
                refreshAuthStateApp();
              }, 500);
            }
          }
        } else {
          console.error('No user data returned from Google sign-in');
          toast.error('Failed to get user data from Google. Please try again.');
        }
      } catch (authError) {
        console.error('Google authentication error:', authError);
        toast.dismiss(pendingToast);
        
        // Handle specific error codes
        if (authError.code === 'auth/configuration-not-found') {
          console.error('Firebase configuration error - Google Sign-In is not enabled in Firebase console');
          toast.error('Authentication service is not properly configured. Please contact support.');
        } else if (authError.code === 'auth/popup-closed-by-user') {
          toast.info('Sign-in canceled. Please try again when ready.');
        } else if (authError.code === 'auth/popup-blocked') {
          toast.error('Popup was blocked by your browser. Please allow popups for this site.');
        } else if (authError.code === 'auth/unauthorized-domain') {
          toast.error('This domain is not authorized for authentication. Please contact support.');
          console.error('Domain not authorized:', window.location.origin);
        } else {
          toast.error(`Sign-in failed: ${authError.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Overall authentication error:', error);
      toast.error('Authentication failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Render Google button
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
    >
      {loading ? (
        <div className="animate-spin h-5 w-5 text-gray-500 mr-3">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <FcGoogle className="h-5 w-5 mr-2" />
      )}
      {loading ? 'Signing in...' : buttonText}
    </button>
  );
};

export default GoogleAuth; 