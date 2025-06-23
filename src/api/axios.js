import axios from 'axios';

// Use environment variable for API URL with explicit fallback to the deployed API
const API_URL = process.env.REACT_APP_API_URL || 'https://taekwondo-website-backend.onrender.com';

// Log the API URL being used
console.log('API URL being used:', API_URL);

// Create an instance of axios with a base URL
const API = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  // Adding timeout for cloud database connections
  timeout: 60000, // 60 seconds - increased from 30 seconds
  withCredentials: true // Enable sending cookies in cross-origin requests
});

// Add a request interceptor to attach the auth token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    
    // Add retry configuration
    config.retry = 3; // Number of retries - increased from 2
    config.retryDelay = 1500; // Delay between retries in ms - increased from 1000
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle common response issues
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data ? 'Data received' : 'No data');
    return response;
  },
  async (error) => {
    // Get config and create a new config object for retry
    const originalRequest = error.config;
    
    // Log all errors for debugging
    console.error('API Error:', error.response ? error.response.status : 'Network Error', 
                  error.response ? error.response.data : error.message);
    
    // Handle timeout errors with retry logic
    if ((error.code === 'ECONNABORTED' || error.message.includes('timeout')) && originalRequest && originalRequest.retry > 0) {
      originalRequest.retry -= 1;
      console.log(`Request timeout - Retrying (${originalRequest.retry} attempts left)...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, originalRequest.retryDelay));
      
      // Retry the request
      return API(originalRequest);
    }
    
    // Handle network errors with retry logic
    if (error.message.includes('Network Error') && originalRequest && originalRequest.retry > 0) {
      originalRequest.retry -= 1;
      console.log(`Network error - Retrying (${originalRequest.retry} attempts left)...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, originalRequest.retryDelay));
      
      // Retry the request
      return API(originalRequest);
    }
    
    // Handle 401 (Unauthorized) responses
    if (error.response && error.response.status === 401) {
      console.log('Authentication error detected - clearing credentials and redirecting to login');
      // Clear local storage and redirect to login page if unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Save current location to redirect back after login
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        sessionStorage.setItem('redirectAfterLogin', currentPath);
      }
      
      // Only redirect if we're in a browser environment
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    // Handle 500 server errors that might be DB-related
    if (error.response && error.response.status === 500) {
      console.error('Server error - might be related to database connection');
    }
    
    // Handle 503 Service Unavailable (likely database connection issues)
    if (error.response && error.response.status === 503) {
      console.error('Service unavailable - database might be down');
      // Could implement a retry mechanism here
    }
    
    // Handle CORS errors
    if (error.message && error.message.includes('Network Error')) {
      console.error('CORS or Network error detected - ensure server is running and CORS is configured correctly');
    }
    
    return Promise.reject(error);
  }
);

// Export a function to test the API connection
export const testAPIConnection = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/health`);
    console.log('API connection test result:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API connection test failed:', error.message);
    return { success: false, error: error.message };
  }
};

export default API;