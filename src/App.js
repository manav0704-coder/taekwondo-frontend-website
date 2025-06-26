import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { useAuth } from './context/AuthContext';
import AuthService from './api/authService';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Programs from './components/pages/Programs';
import Events from './components/pages/Events';
import Gallery from './components/pages/Gallery';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/pages/Profile';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import EventDetail from './components/pages/EventDetail';
import Enroll from './components/pages/Enroll';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsAndConditions from './components/pages/TermsAndConditions';
import CookiePolicy from './components/pages/CookiePolicy';
import ChatBot from './components/ChatBot';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import the CSS directly

// Force a refresh of the authentication state across the app
export const refreshAuthStateApp = () => {
  window.dispatchEvent(new Event('app-storage-update'));
};

// Authentication state observer wrapper
const AuthObserver = ({ children }) => {
  const location = useLocation();
  
  // Check for changes in localStorage on each route change
  useEffect(() => {
    // Trigger auth refresh on route changes only, without excessive logging
    refreshAuthStateApp();
  }, [location.pathname]);
  
  return <>{children}</>;
};

// Google Auth Redirect Handler
const GoogleRedirectHandler = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        console.log("GoogleRedirectHandler: Processing redirect result");
        setLoading(true);
        
        // Show loading toast
        const pendingToast = toast.info(
          <div className="flex items-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
            <span>Completing authentication...</span>
          </div>,
          {
            autoClose: false,
            hideProgressBar: false,
            closeButton: false
          }
        );
        
        // Import necessary Firebase auth functions
        const { getAuth, getRedirectResult } = await import('firebase/auth');
        const auth = getAuth();
        
        try {
          // Get redirect result
          const result = await getRedirectResult(auth);
          
          // Dismiss the loading toast
          toast.dismiss(pendingToast);
          
          if (result && result.user) {
            // Process the result with our backend
            const userData = {
              name: result.user.displayName || 'User',
              email: result.user.email,
              role: 'user',
              googleId: result.user.uid,
              photoURL: result.user.photoURL || ''
            };
            
            console.log('Sending Google user data to backend:', userData);
            
            // Send the data to our backend and get authentication token
            await AuthService.directAuthenticationFlow();
            
            // Show success toast
            toast.success(`Welcome, ${userData.name}!`, {
              position: "top-right",
              autoClose: 4000
            });
            
            // Navigate to the home page
            navigate('/', { replace: true });
          } else {
            console.log('No redirect result, using fallback authentication');
            // Use direct authentication as fallback
            const fallbackResult = await AuthService.directAuthenticationFlow();
            
            if (fallbackResult && fallbackResult.user) {
              toast.success(`Welcome, ${fallbackResult.user.name}!`, {
                position: "top-right",
                autoClose: 4000
              });
              navigate('/', { replace: true });
            } else {
              // Redirect to login page as last resort
              navigate('/login', { replace: true });
            }
          }
        } catch (redirectError) {
          // Handle specific redirect errors
          console.error("Redirect result error:", redirectError);
          toast.dismiss(pendingToast);
          
          // Fall back to direct authentication
          console.log("Falling back to direct authentication");
          const fallbackResult = await AuthService.directAuthenticationFlow();
          
          if (fallbackResult && fallbackResult.user) {
            toast.success(`Welcome, ${fallbackResult.user.name}!`, {
              position: "top-right",
              autoClose: 4000
            });
            navigate('/', { replace: true });
          } else {
            toast.error("Authentication failed. Please try again.");
            navigate('/login', { replace: true });
          }
        }
      } catch (err) {
        console.error("Authentication failed:", err);
        toast.error("Authentication failed. Please try again with email signup.");
        setLoading(false);
        navigate('/register', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    // Run the redirect handler immediately when this component mounts
    handleRedirect();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    );
  }
  
  // This won't render as navigation will happen before loading becomes false
  return null;
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading indicator while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/register" replace />;
  }
  return children;
};

// App routes with AuthObserver wrapper
const AppRoutes = () => {
  return (
    <AuthObserver>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/programs" element={<Layout><Programs /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events/:eventId" element={<Layout><EventDetail /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-and-conditions" element={<Layout><TermsAndConditions /></Layout>} />
        <Route path="/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
        
        {/* Google Auth Redirect Handler */}
        <Route path="/auth/google/callback" element={<GoogleRedirectHandler />} />
        
        {/* Protected routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="/enroll" element={
          <ProtectedRoute>
            <Layout><Enroll /></Layout>
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<Layout><div className="container mx-auto px-4 py-16 text-center"><h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1><p>The page you are looking for doesn't exist.</p></div></Layout>} />
      </Routes>
    </AuthObserver>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <React.Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }>
            <AppRoutes />
            <ChatBot />
            <ToastContainer 
              position="top-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              closeButton={true}
              toastClassName={(context) => 
                context?.type === 'info' ? 'custom-toast Toastify__toast--info' :
                context?.type === 'success' ? 'custom-toast Toastify__toast--success' :
                context?.type === 'warning' ? 'custom-toast Toastify__toast--warning' :
                context?.type === 'error' ? 'custom-toast Toastify__toast--error' : 'custom-toast'
              }
            />
          </React.Suspense>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
