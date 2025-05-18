import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EnrollmentService from '../../api/enrollmentService';

const Enroll = () => {
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    emergencyContact: '',
    emergencyPhone: '',
    program: 'beginners',
    experience: 'none',
    medicalConditions: '',
    howDidYouHear: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Make sure token exists
      if (!token) {
        // Redirect to login if not authenticated
        setSubmitError('You must be logged in to enroll. Please log in and try again.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
        return;
      }
      
      // Format date properly for API
      const apiData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth // Ensure date is in correct format
      };
      
      console.log('Sending enrollment data:', apiData);
      console.log('Using token:', token ? 'Token exists (length: ' + token.length + ')' : 'Token missing');
      
      // Try regular enrollment first
      try {
        // Use the enrollment service instead of direct axios call
        const response = await EnrollmentService.createEnrollment(apiData, token);
        
        console.log('API Response:', response);
        
        if (response.success) {
          setReferenceNumber(response.data.referenceNumber);
          setSubmitSuccess(true);
          // Reset form after successful submission
          window.scrollTo(0, 0);
          return;
        } else {
          throw new Error(response.message || 'Failed to submit enrollment');
        }
      } catch (enrollError) {
        console.error('Regular enrollment failed, trying test endpoint:', enrollError);
        
        // Try the test endpoint as a fallback
        try {
          const testResponse = await EnrollmentService.testEnrollment(apiData);
          console.log('Test endpoint response:', testResponse);
          
          if (testResponse.success) {
            setReferenceNumber(testResponse.data.referenceNumber);
            setSubmitSuccess(true);
            // Reset form after successful submission
            window.scrollTo(0, 0);
            return;
          } else {
            throw new Error(testResponse.message || 'Failed test enrollment');
          }
        } catch (testError) {
          console.error('Test enrollment also failed:', testError);
          throw enrollError; // Throw the original error
        }
      }
    } catch (error) {
      console.error('Enrollment error details:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx
        console.error('Response error:', error.response.status, error.response.data);
        
        if (error.response.status === 401) {
          setSubmitError('Your session has expired. Please log in again.');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else if (error.response.status === 404) {
          setSubmitError('The enrollment service is currently unavailable. Please try again later.');
        } else {
          setSubmitError(error.response.data?.message || 'Failed to submit enrollment. Please try again.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error (no response):', error.request);
        setSubmitError('No response from server. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        setSubmitError(error.message || 'Failed to submit enrollment. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Enrollment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for enrolling with the Maharashtra Taekwondo Federation. We've received your application and will contact you shortly with next steps.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
              <p className="font-medium text-gray-800">
                Your enrollment reference number: <span className="text-primary font-bold">{referenceNumber}</span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/programs')} 
                className="btn btn-secondary"
              >
                View Programs
              </button>
              <button 
                onClick={() => navigate('/')} 
                className="btn btn-primary"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Join Maharashtra Taekwondo Federation</h1>
          <p className="text-lg text-gray-600">
            Complete the form below to enroll in our Taekwondo programs and begin your martial arts journey.
          </p>
        </div>
        
        {submitError && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{submitError}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="dateOfBirth" className="form-label">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="form-label">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="address" className="form-label">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="Enter your address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="form-label">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Enter city"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="form-label">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        readOnly
                        className="form-control bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pincode" className="form-label">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Enter PIN code"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="emergencyContact" className="form-label">
                        Emergency Contact Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Enter emergency contact name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="emergencyPhone" className="form-label">
                        Emergency Contact Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        required
                        className="form-control"
                        placeholder="Enter emergency contact phone"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Program Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="program" className="form-label">
                      Program of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                      className="form-control"
                    >
                      <option value="beginners">Beginners Program</option>
                      <option value="intermediate">Intermediate Program</option>
                      <option value="advanced">Advanced Program</option>
                      <option value="competitive">Competitive Training</option>
                      <option value="childrens">Children's Program (4-12)</option>
                      <option value="teens">Teens Program (13-17)</option>
                      <option value="adults">Adults Program (18+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="form-label">
                      Previous Martial Arts Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="form-control"
                    >
                      <option value="none">None</option>
                      <option value="less-than-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-plus">5+ years</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="medicalConditions" className="form-label">
                      Medical Conditions or Allergies
                    </label>
                    <textarea
                      id="medicalConditions"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleChange}
                      rows="3"
                      className="form-control"
                      placeholder="Please list any medical conditions, injuries or allergies that we should be aware of"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="howDidYouHear" className="form-label">
                      How did you hear about us? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select an option</option>
                      <option value="friend">Friend or Family</option>
                      <option value="social-media">Social Media</option>
                      <option value="search-engine">Search Engine</option>
                      <option value="event">Event or Demonstration</option>
                      <option value="advertisement">Advertisement</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the terms and conditions. I understand that Taekwondo involves physical contact and there is a risk of injury. I confirm that the information provided is accurate and complete.
                </label>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary px-8 py-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Enrollment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll; 