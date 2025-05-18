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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import the CSS directly

// Google Auth Redirect Handler
const GoogleRedirectHandler = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await AuthService.handleRedirectResult();
        if (result) {
          // If we have a result, authentication was successful
          navigate('/');
        } else {
          // If we don't have a result but we're on this component, 
          // we might be waiting for a redirect or there was a subtle error
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to handle redirect:", err);
        setError(err.message || "Authentication failed");
        setIsLoading(false);
      }
    };

    // Only run this if we're returning from a redirect
    // Check URLSearchParams for signs of a redirect
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('state') || urlParams.has('code') || urlParams.has('scope')) {
      handleRedirect();
    } else {
      setIsLoading(false);
    }
  }, [navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded max-w-md mb-4">
          <p className="text-red-700">{error}</p>
        </div>
        <button 
          onClick={() => navigate('/register')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Back to Sign Up
        </button>
      </div>
    );
  }

  // If no loading or error, but also no redirect result, go to register page
  return <Navigate to="/register" replace />;
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

// App component with routes
const AppRoutes = () => {
  return (
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
