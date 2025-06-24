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
        className="bg-secondary text-white shadow-md fixed top-0 z-40 w-full transition-all duration-300 shadow-md" 
      >
        <div className="container-fluid px-1">
          <div className="flex justify-between items-center h-14 md:h-16 relative">
            <div className="relative z-10 ml-2 md:ml-6 flex items-center py-1 md:py-0">
              <Link to="/" className="block">
                <img 
                  src={logo} 
                  alt="AMTA Logo" 
                  className="h-12 md:h-14 w-auto object-contain logo" 
                />
              </Link>
            </div>

            <nav className="hidden md:flex flex-1 justify-center space-x-4 lg:space-x-8 mx-auto pl-[70px] md:pl-[120px]">
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
                  className="dual-border-link relative inline-block px-2 lg:px-3 py-4 transition-colors duration-300"
                >
                  <span className={`relative text-base ${isActiveRoute(item.path) ? 'text-primary font-medium' : 'text-white'}`}>
                    {item.label}
                  </span>
                  <span className={`top-border ${isActiveRoute(item.path) ? 'active' : ''}`}></span>
                  <span className={`bottom-border ${isActiveRoute(item.path) ? 'active' : ''}`}></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center md:justify-end flex-shrink-0 mr-2 md:mr-8" style={{ minWidth: '60px' }}>
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
                          className="relative w-8 h-8 rounded-full bg-green-500 flex items-center justify-center transition-all duration-200 hover:bg-green-600 border border-green-400"
                          style={{ animation: 'pulse-animation 2s infinite' }}
                        >
                          <FaUserCircle className="text-xl text-white group-hover:text-white" />
                          {isUserDropdownOpen && <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-300 rounded-full border-2 border-secondary"></span>}
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
                        className="dual-border-link relative inline-block px-3 py-4 transition-colors duration-300 flex items-center"
                      >
                        <span className="relative text-white">
                          Account
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-4 w-4 transition-transform duration-200 ${isAccountDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="top-border"></span>
                        <span className="bottom-border"></span>
                      </button>
                      {isAccountDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-secondary rounded-md shadow-xl py-1 z-50 border border-gray-100 transform transition-all duration-200 origin-top-right">
                          <Link to="/login" className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors">
                            Sign In
                          </Link>
                          <Link to="/register" className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors border-t border-gray-100">
                            Create Account
                          </Link>
                        </div>
                      )}
                    </div>
                    <Link 
                      to="/enroll" 
                      className="inline-block whitespace-nowrap bg-primary text-white hover:bg-opacity-90 px-5 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
                    >
                      Enroll Now
                    </Link>
                  </>
                )}
              </div>

              <button 
                onClick={toggleSidebar} 
                className="md:hidden p-2 rounded-md hover:bg-secondary-600 focus:outline-none"
                aria-label="Open menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        
        <div 
          className={`fixed top-0 right-0 w-64 h-full bg-secondary z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-5 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center">
                <img src={logo} alt="AMTA Logo" className="h-12 w-auto object-contain logo" />
              </Link>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="p-1.5 rounded-md hover:bg-secondary-600 focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="space-y-1 mb-6">
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
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActiveRoute(item.path) 
                      ? 'bg-primary text-white' 
                      : 'text-white hover:bg-secondary-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-2">
              <div className="border-t border-gray-700 pt-4">
                <button
                  onClick={toggleMobileAccount}
                  className="flex items-center justify-between w-full px-3 py-2 text-white hover:bg-secondary-600 rounded-md"
                >
                  <span className="flex items-center">
                    <FaUserCircle className="mr-2" />
                    Account
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isMobileAccountOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isMobileAccountOpen && (
                  <div className="bg-secondary-dark mt-1 rounded-md overflow-hidden">
                    {currentUser ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Signed in as</p>
                          <p className="text-white font-medium truncate">{currentUser.name}</p>
                        </div>
                        <Link 
                          to="/profile" 
                          className="flex items-center w-full px-4 py-2 hover:bg-secondary-600 text-white text-sm transition-colors"
                        >
                          <FaUserCog className="mr-3 text-gray-400" />
                          Profile &amp; Settings
                        </Link>
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center w-full text-left px-4 py-2 hover:bg-secondary-600 text-white text-sm transition-colors border-t border-gray-700"
                        >
                          <FaSignOutAlt className="mr-3 text-gray-400" />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-2 hover:bg-secondary-600 text-white text-sm">
                          Sign In
                        </Link>
                        <Link to="/register" className="block px-4 py-2 hover:bg-secondary-600 text-white text-sm border-t border-gray-700">
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <Link 
                to="/enroll" 
                className="block w-full bg-primary text-white text-center hover:bg-primary-dark px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm mt-4"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="h-14 md:h-16"></div>
    </>
  );
};

export default Header; 