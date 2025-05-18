import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaKey } from 'react-icons/fa';
import AuthService from '../../api/authService';

const Profile = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle input changes for password form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError(null);
    setSuccess(null);
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }
    
    // Update password
    try {
      setLoading(true);
      await AuthService.updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      setSuccess('Password updated successfully');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => {
        setShowPasswordForm(false);
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">Not Signed In</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your profile</p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-primary text-4xl font-bold shadow-md">
                {currentUser.name?.charAt(0) || 'U'}
              </div>
              <div className="md:ml-6 text-center md:text-left">
                <h1 className="text-3xl font-bold">{currentUser.name}</h1>
                <p className="text-white opacity-90">{currentUser.email}</p>
                {currentUser.role && (
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                    {currentUser.role}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {/* Account Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <FaUser className="text-primary mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{currentUser.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <FaEnvelope className="text-primary mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-800">{currentUser.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <FaPhone className="text-primary mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-800">{currentUser.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <FaIdCard className="text-primary mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>
                      <p className="font-medium text-gray-800 capitalize">{currentUser.status || 'Active'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-primary mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Joined On</p>
                      <p className="font-medium text-gray-800">{formatDate(currentUser.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Password Management */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Password Management</h2>
              
              {/* Change Password Button */}
              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="btn btn-secondary"
                >
                  <FaKey className="mr-2" /> Change Password
                </button>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Change Your Password</h3>
                  
                  {/* Error message */}
                  {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Success message */}
                  {success && (
                    <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">{success}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="mb-4">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        required
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setError(null);
                          setSuccess(null);
                          setFormData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 