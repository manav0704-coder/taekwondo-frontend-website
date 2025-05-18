import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { FaUser, FaEnvelope, FaIdCard, FaCalendarAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const { currentUser, token, logout, updatePassword } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Password states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/enrollments`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        setEnrollments(response.data.data);
        if (response.data.data.length > 0) {
          showInfo(`Loaded ${response.data.data.length} enrollment(s)`);
        }
      } else {
        throw new Error(response.data.message || 'Failed to fetch enrollments');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch enrollments';
      setError(errorMessage);
      showError(errorMessage);
      console.error('Error fetching enrollments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token, showInfo, showError]);

  useEffect(() => {
    if (activeTab === 'enrollments') {
      fetchEnrollments();
    }
  }, [activeTab, fetchEnrollments]);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    logout();
    showSuccess('You have been successfully logged out');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      showInfo('Viewing your profile information');
    } else if (tab === 'enrollments') {
      showInfo('Fetching your enrollment history...');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when typing
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      // Show notification for validation errors
      const firstError = Object.values(passwordErrors)[0];
      if (firstError) {
        showError(firstError);
      }
      return;
    }
    
    setIsSubmittingPassword(true);
    
    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      showSuccess('Password updated successfully');
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      showError(error.message || 'Failed to update password');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  // Profile tab content
  const renderProfileContent = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl mb-4 sm:mb-0 sm:mr-6">
          {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{currentUser?.name}</h2>
          <p className="text-gray-500">Member since {currentUser?.createdAt ? formatDate(currentUser.createdAt) : 'N/A'}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
        <ul className="space-y-3">
          <li className="flex items-center">
            <FaUser className="text-primary mr-3" />
            <span className="text-gray-700 font-medium w-24">Name:</span>
            <span className="text-gray-600">{currentUser?.name || 'N/A'}</span>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="text-primary mr-3" />
            <span className="text-gray-700 font-medium w-24">Email:</span>
            <span className="text-gray-600">{currentUser?.email || 'N/A'}</span>
          </li>
          <li className="flex items-center">
            <FaIdCard className="text-primary mr-3" />
            <span className="text-gray-700 font-medium w-24">Role:</span>
            <span className="text-gray-600 capitalize">{currentUser?.role || 'student'}</span>
          </li>
        </ul>
      </div>
      
      {/* Password Change Section */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Security</h3>
        
        {!isChangingPassword ? (
          <button 
            onClick={() => setIsChangingPassword(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FaLock className="mr-2 text-primary" />
            Change Password
          </button>
        ) : (
          <form onSubmit={handleSubmitPasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.currentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`block w-full px-3 py-2 border ${passwordErrors.currentPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={() => togglePasswordVisibility('currentPassword')}
                >
                  {showPasswords.currentPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.newPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`block w-full px-3 py-2 border ${passwordErrors.newPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`block w-full px-3 py-2 border ${passwordErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmittingPassword}
                className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isSubmittingPassword ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmittingPassword ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                  setPasswordErrors({});
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="mt-8">
        <button 
          onClick={handleLogout}
          className="btn btn-secondary"
        >
          Logout
        </button>
      </div>
    </div>
  );

  // Enrollments tab content
  const renderEnrollmentsContent = () => (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Enrollments</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700">
          {error}
        </div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't enrolled in any programs yet.</p>
          <button 
            onClick={() => window.location.href = '/enroll'} 
            className="btn btn-primary"
          >
            Enroll Now
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary">
                      {enrollment.referenceNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {enrollment.program.replace('-', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(enrollment.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${enrollment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        enrollment.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 bg-primary text-white">
                <h2 className="text-xl font-bold">Account Dashboard</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                <li>
                  <button 
                    onClick={() => handleTabChange('profile')}
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'profile' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FaUser className="mr-3" /> Profile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('enrollments')}
                    className={`w-full text-left px-4 py-3 flex items-center ${
                      activeTab === 'enrollments' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FaCalendarAlt className="mr-3" /> Enrollments
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'profile' ? renderProfileContent() : renderEnrollmentsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 