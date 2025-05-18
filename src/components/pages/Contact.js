import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactService from '../../api/contactService';
import { useAuth } from '../../context/AuthContext';

// Placeholder image as data URI
const contactHeaderImg = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="600" viewBox="0 0 1920 600"%3E%3Crect width="1920" height="600" fill="%23343A40"%3E%3C/rect%3E%3Ctext x="960" y="300" font-family="Arial" font-size="32" fill="white" text-anchor="middle"%3EContact Header Image%3C/text%3E%3C/svg%3E';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    enquiryType: 'general'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });
  const { currentUser } = useAuth();
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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!currentUser) {
      setSubmitStatus({
        success: false,
        message: 'Please login or register to submit your message'
      });
      
      // Redirect to signup page after short delay
      setTimeout(() => {
        navigate('/register');
      }, 1500);
      
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await ContactService.submitContactForm(formData);
      setSubmitStatus({
        success: true,
        message: response.message || 'Your message has been sent successfully. We will get back to you soon!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        enquiryType: 'general'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Failed to submit form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Scroll to top to show message
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="relative bg-secondary py-24 overflow-hidden">
        <div className="overlay-dark z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${contactHeaderImg})` }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow-lg">Contact Us</h1>
          <p className="text-lg max-w-3xl mx-auto text-white opacity-90">
            Have questions about our Taekwondo programs? Want to learn more about our federation? 
            Get in touch with us and we'll be happy to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Status Message */}
        {submitStatus.message ? (
          <div className={`mb-10 p-5 rounded-xl text-center shadow-md ${
            submitStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <p className="font-medium text-lg">{submitStatus.message}</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="bg-secondary-50 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-8 text-secondary">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1 text-secondary">Address</h3>
                    <p className="text-secondary-600">
                    Mariyum High School and Jr.College,<br/> Gavhanevasti, Bhosari, Pimpri-Chinchwad, Maharashtra 411026
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1 text-secondary">Phone</h3>
                    <p className="text-secondary-600">
                      (+91) 8411917861
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1 text-secondary">Email</h3>
                    <p className="text-secondary-600">
                    hibronpluse@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1 text-secondary">Hours</h3>
                    <p className="text-secondary-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4 text-secondary">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61576077727717&sk=about" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/hibronplus" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@hibronplus?si=yl2yARRT185FCn1y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-8 text-secondary">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control ${errors.name ? 'border-red-300 ring-red-300' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'border-red-300 ring-red-300' : ''}`}
                      placeholder="Enter your email address"
                    />
                    {errors.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="enquiryType" className="form-label">
                      Enquiry Type
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="general">General Enquiry</option>
                      <option value="membership">Membership</option>
                      <option value="event">Event</option>
                      <option value="training">Training</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-control ${errors.subject ? 'border-red-300 ring-red-300' : ''}`}
                    placeholder="Enter message subject"
                  />
                  {errors.subject ? (
                    <p className="form-error">{errors.subject}</p>
                  ) : null}
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-control ${errors.message ? 'border-red-300 ring-red-300' : ''}`}
                    placeholder="Enter your message"
                  ></textarea>
                  {errors.message ? (
                    <p className="form-error">{errors.message}</p>
                  ) : null}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary shadow-lg ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
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
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <div className="w-full overflow-hidden rounded-lg shadow-lg relative">
          {/* Google Maps embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.9822529821276!2d73.84702177550038!3d18.61986798249307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c778941279f5%3A0x10d8af5f6a614b51!2sMariyum%20High%20School%20and%20Jr.College!5e0!3m2!1sen!2sin!4v1747206537055!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mariyum High School and Jr.College Location"
            className="w-full"
          ></iframe>
          
          {/* Location info with Get Directions button */}
          <div className="absolute top-4 right-4 bg-white p-6 rounded-xl shadow-lg max-w-sm">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary ml-4">Find Us Here</h3>
            </div>
            <p className="text-secondary-600 mb-4">Mariyum High School and Jr.College, Gavhanevasti, Bhosari, Pimpri-Chinchwad, Maharashtra 411026</p>
            <a 
              href="https://www.google.com/maps/place/Mariyum+High+School+and+Jr.College/@18.6198679,73.8470218,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c778941279f5:0x10d8af5f6a614b51!8m2!3d18.619863!4d73.8495967!16s%2Fg%2F11clls8psp?entry=tts" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary w-full text-center"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 