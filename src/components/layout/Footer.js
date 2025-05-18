import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-secondary text-white py-4 relative">
      {/* Scroll to Top Button */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
        <button 
          onClick={scrollToTop}
          className="bg-primary hover:bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Copyright Text */}
          <div className="text-gray-400 text-sm">
            <p>Copyright © {currentYear} Maharashtra Taekwondo | All rights reserved</p>
          </div>
          
          {/* Footer Links */}
          <div className="flex flex-wrap items-center text-gray-400 text-sm">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Statement</Link>
            <span className="mx-2">|</span>
            <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie policy</Link>
            <span className="mx-2">|</span>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <span className="mx-2">|</span>
            <Link to="/login" className="hover:text-primary transition-colors">Sign in</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 