import axios from 'axios';
import API from './axios';

// Always use deployed API
const BASE_URL = 'https://taekwondo-website-backend.onrender.com/api';

// Service for handling enrollment-related API calls
const EnrollmentService = {
  // Create a new enrollment
  createEnrollment: async (enrollmentData, token) => {
    try {
      console.log('EnrollmentService: Submitting enrollment data');
      console.log('API base URL:', BASE_URL);
      console.log('Token available:', !!token);
      
      // Try direct axios call first
      try {
        console.log('Attempting direct axios call to:', `${BASE_URL}/enrollments`);
        
        const directResponse = await axios({
          method: 'post',
          url: `${BASE_URL}/enrollments`,
          data: enrollmentData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Direct call successful:', directResponse);
        return directResponse.data;
      } catch (directError) {
        console.error('Direct call failed, error:', directError);
        console.log('Falling back to API instance');
        
        // Fall back to API instance
        const response = await API.post('/enrollments', enrollmentData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('EnrollmentService Error details:', error);
      if (error.response) {
        console.error('Status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received. Request details:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },

  // Get user's enrollments
  getUserEnrollments: async (token) => {
    try {
      console.log('Fetching user enrollments with token:', token ? 'Token available' : 'No token');
      
      // Try direct axios call first for better debugging
      try {
        const url = `${BASE_URL}/enrollments`;
        console.log('Making direct enrollment fetch request to:', url);
        
        const directResponse = await axios({
          method: 'get',
          url: url,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Direct enrollment fetch successful:', directResponse.status);
        return directResponse.data;
      } catch (directError) {
        console.error('Direct enrollment fetch failed:', directError.message);
        console.log('Falling back to API instance');
        
        // Fall back to API instance
        const response = await API.get('/enrollments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
      }
    } catch (error) {
      console.error('EnrollmentService Error:', error);
      throw error;
    }
  },

  // Get a specific enrollment
  getEnrollment: async (enrollmentId, token) => {
    try {
      const response = await API.get(`/enrollments/${enrollmentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('EnrollmentService Error:', error);
      throw error;
    }
  },

  // Test enrollment without authentication
  testEnrollment: async (enrollmentData) => {
    try {
      console.log('Trying test enrollment endpoint');
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/enrollments/test`,
        data: enrollmentData,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Test enrollment successful:', response);
      return response.data;
    } catch (error) {
      console.error('Test enrollment error:', error);
      throw error;
    }
  }
};

export default EnrollmentService; 