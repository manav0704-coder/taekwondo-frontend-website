import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';
import { FaUserCircle, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

// Add keyframes for animations
const animations = `
@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

@keyframes borderTopIn {
  from {
    width: 0;
    left: 0;
  }
  to {
    width: 100%;
    left: 0;
  }
}

@keyframes borderBottomIn {
  from {
    width: 0;
    right: 0;
  }
  to {
    width: 100%;
    right: 0;
  }
}
`;

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);
  
  // We don't need headerOpacity state anymore since we're using fixed opacity

  // Close sidebar when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) setIsSidebarOpen(false);
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scrolling when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  // Close mobile account dropdown when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) {
      setIsMobileAccountOpen(false);
    }
  }, [isSidebarOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileAccount = () => {
    setIsMobileAccountOpen(!isMobileAccountOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsSidebarOpen(false);
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check if a route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Click handler to navigate to enroll page
  const handleEnrollClick = () => {
    navigate('/enroll');
  };

  return (
    <>
      {/* Add the animations */}
      <style>{animations}</style>
      
      <header 
        className="bg-secondary text-white shadow-md md:relative md:static fixed top-0 z-40 w-full transition-all duration-300 shadow-md" 
      >
        <div className="container-fluid px-1">
          <div className="flex justify-between items-center h-14 md:h-24 relative">
            {/* Logo - with positioning for larger size */}
            <div className="relative z-10 ml-1 md:ml-6 flex items-center justify-center py-1 md:py-0">
              <Link to="/" className="block">
                <img 
                  src={logo} 
                  alt="AMTA Logo" 
                  className="h-[54px] md:h-[156px] w-auto object-contain md:mt-[30px]" 
                />
              </Link>
            </div>

            {/* Desktop Navigation - explicitly centered */}
            <nav className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8 mx-auto pl-[70px] md:pl-[180px]">
              {[
                { path: '/', label: 'Home' },
                { path: '/programs', label: 'Programs' },
                { path: '/events', label: 'Events' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="dual-border-link relative inline-block px-2 lg:px-3 py-6 transition-colors duration-300"
                >
                  <span className={`relative text-base ${isActiveRoute(item.path) ? 'text-primary font-medium' : 'text-white'}`}>
                    {item.label}
                  </span>
                  <span className={`top-border ${isActiveRoute(item.path) ? 'active' : ''}`}></span>
                  <span className={`bottom-border ${isActiveRoute(item.path) ? 'active' : ''}`}></span>
                </Link>
              ))}
            </nav>

            {/* Right side: Authentication & Menu Button with fixed positioning */}
            <div className="flex items-center md:justify-end flex-shrink-0 mr-1 md:mr-8" style={{ minWidth: '60px' }}>
              {/* Desktop Authentication Buttons */}
              <div className="hidden md:flex items-center">
                {currentUser ? (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleEnrollClick}
                      className="inline-block whitespace-nowrap bg-primary text-white hover:bg-opacity-90 px-5 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm mr-3"
                    >
                      Enroll Now
                    </button>
                    <div className="relative" ref={userDropdownRef}>
                      <button 
                        onClick={toggleUserDropdown}
                        className="flex items-center justify-center gap-1 group"
                      >
                        <div 
                          className="relative w-9 h-9 rounded-full bg-green-500 flex items-center justify-center transition-all duration-200 hover:bg-green-600 border border-green-400"
                          style={{ animation: 'pulse-animation 2s infinite' }}
                        >
                          <FaUserCircle className="text-2xl text-white group-hover:text-white" />
                          {isUserDropdownOpen && <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-300 rounded-full border-2 border-secondary"></span>}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isUserDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white text-secondary rounded-md shadow-xl py-1 z-50 border border-gray-100 transform transition-all duration-200 origin-top-right">
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-md">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Signed in as</p>
                            <p className="font-medium text-gray-800 truncate">{currentUser.name}</p>
                          </div>
                          <Link 
                            to="/profile" 
                            className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                          >
                            <FaUserCog className="mr-3 text-gray-500" />
                            Profile &amp; Settings
                          </Link>
                          <button 
                            onClick={handleLogout} 
                            className="flex items-center w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors border-t border-gray-100"
                          >
                            <FaSignOutAlt className="mr-3 text-gray-500" />
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative mr-4" ref={accountDropdownRef}>
                      <button 
                        onClick={toggleAccountDropdown}
                        className="dual-border-link relative inline-block px-3 py-6 transition-colors duration-300 flex items-center"
                      >
                        <span className="relative text-white">
                          Account
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="top-border"></span>
                        <span className="bottom-border"></span>
                      </button>
                      {isAccountDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-secondary rounded-md shadow-lg py-1 z-50">
                          <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary transition-colors">Login</Link>
                          <Link to="/register" className="block px-4 py-2 hover:bg-gray-100 hover:text-primary transition-colors">Sign up</Link>
                        </div>
                      )}
                    </div>
                    <Link to="/enroll" className="inline-block whitespace-nowrap bg-primary text-white hover:bg-opacity-90 px-5 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">Enroll Now</Link>
                  </>
                )}
              </div>

              {/* Mobile hamburger button fixed at far right */}
              <div className="md:hidden ml-auto flex items-center hamburger-container">
                <button
                  onClick={toggleSidebar}
                  className="text-white focus:outline-none bg-secondary-700 p-1.5 rounded-md hover:bg-secondary-600 transition-colors flex items-center justify-center h-[42px] w-[42px]"
                  aria-label="Toggle menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div 
          className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0 pointer-events-none backdrop-blur-none'
          }`} 
          onClick={toggleSidebar}
          style={{ opacity: 1 }} /* Force full opacity */
        ></div>
        
        {/* Mobile Sidebar */}
        <div 
          className={`fixed top-0 right-0 w-[85%] sm:w-96 max-w-[360px] h-full bg-gradient-to-b from-secondary to-secondary-800 shadow-2xl z-50 transform transition-all duration-300 ease-in-out md:hidden ${
            isSidebarOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-95'
          }`}
          style={{ opacity: 1 }} /* Force full opacity */
        >
          <div className="flex flex-col h-full">
            {/* Header & Close Button - with improved alignment */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <Link to="/" onClick={toggleSidebar} className="flex items-center">
                <img src={logo} alt="AMTA Logo" className="h-14 w-auto object-contain" />
              </Link>
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors duration-200 focus:outline-none flex items-center justify-center h-[40px] w-[40px]"
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links - scrollable area */}
            <div className="flex-1 overflow-y-auto py-3 px-5">
              <nav className="flex flex-col space-y-1.5">
                {/* Main Navigation */}
                {[
                  { path: '/', label: 'Home' },
                  { path: '/programs', label: 'Programs' },
                  { path: '/events', label: 'Events' },
                  { path: '/gallery', label: 'Gallery' },
                  { path: '/about', label: 'About' },
                  { path: '/contact', label: 'Contact' },
                  ...(currentUser ? [{ path: '/enroll', label: 'Enroll' }] : [])
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center w-full px-4 py-3.5 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.path) 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-base">{item.label}</span>
                    {isActiveRoute(item.path) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                ))}
              </nav>
              
              {/* Divider */}
              <div className="my-3 border-t border-white/10"></div>
              
              {/* Account section */}
              <div className="flex flex-col space-y-1">
                <h3 className="px-3 py-2 text-xs font-semibold text-white/70 uppercase tracking-wider">Account</h3>
                
                {currentUser ? (
                  <>
                    <div className="px-3 py-3 mb-2 bg-secondary-700/50 rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 border border-green-400"
                          style={{ animation: 'pulse-animation 2s infinite' }}
                        >
                          <FaUserCircle className="text-xl text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-white/90">Signed in as</p>
                          <p className="font-medium text-white">{currentUser.name}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center w-full px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center w-full px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={toggleMobileAccount}
                      className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Account Options
                      </div>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transform transition-transform duration-200 ${isMobileAccountOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div 
                      className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileAccountOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <Link 
                        to="/login" 
                        className="flex items-center w-full px-3 py-3 pl-11 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="flex items-center w-full px-3 py-3 pl-11 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Sign Up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Bottom Action Button */}
            {!currentUser && (
              <div className="p-4 border-t border-white/10">
                <Link 
                  to="/enroll" 
                  className="flex items-center justify-center w-full py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg shadow-lg transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Enroll Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Add the custom CSS for navbar animations and mobile fixes */}
      <style jsx="true">{`
        /* Remove default anchor underline */
        a {
          text-decoration: none !important;
        }
        
        /* Dual border link styles */
        .dual-border-link {
          position: relative;
          padding: 6px 12px;
          text-decoration: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
          outline: none !important;
        }
        
        .dual-border-link:hover {
          color: #FF6B35;
          text-decoration: none !important;
        }
        
        .dual-border-link span {
          text-decoration: none !important;
          border-bottom: none !important;
        }
        
        /* Top border */
        .top-border {
          position: absolute;
          top: 0;
          left: 0;
          height: 2px;
          width: 0;
          background-color: #FF6B35;
          transition: width 0.3s ease;
        }
        
        .dual-border-link:hover .top-border {
          animation: borderTopIn 0.3s forwards;
        }
        
        /* Bottom border */
        .bottom-border {
          position: absolute;
          bottom: 0;
          right: 0;
          height: 2px;
          width: 0;
          background-color: #FF6B35;
          transition: width 0.3s ease;
        }
        
        .dual-border-link:hover .bottom-border {
          animation: borderBottomIn 0.3s forwards;
        }
        
        /* Active state */
        .top-border.active,
        .bottom-border.active {
          width: 100%;
          background-color: #FF6B35;
        }
        
        /* Fix for any other potential styling causing underlines */
        .dual-border-link:focus,
        .dual-border-link:active,
        .dual-border-link * {
          text-decoration: none !important;
          outline: none;
          box-shadow: none;
        }
        
        /* Hide hamburger menu on desktop with !important */
        @media (min-width: 768px) {
          .hamburger-container {
            display: none !important;
          }
        }
        
        /* Fix for sticky header on mobile */
        @supports (-webkit-touch-callout: none) {
          /* iOS specific fix */
          header.sticky {
            position: -webkit-sticky;
          }
        }
        
        /* Add padding to the top of the page content to prevent content from hiding under sticky header */
        body {
          scroll-padding-top: 80px; /* Equal to the height of the mobile header */
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default Header; 