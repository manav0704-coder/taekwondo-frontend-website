import axios from 'axios';

/**
 * Checks the health of the server API
 * @returns {Promise<Object>} The health status object
 */
export const checkServerHealth = async () => {
  try {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const response = await axios.get(`${baseUrl}/api/health`, { timeout: 5000 });
    console.log('Server health check:', response.data);
    return {
      isHealthy: true,
      data: response.data,
      error: null
    };
  } catch (error) {
    console.error('Server health check failed:', error.message);
    return {
      isHealthy: false,
      data: null,
      error: error.message
    };
  }
};

/**
 * Tests the MongoDB connection via the server
 * @returns {Promise<Object>} The connection test result
 */
export const testDatabaseConnection = async () => {
  try {
    const healthCheck = await checkServerHealth();
    
    if (!healthCheck.isHealthy) {
      return {
        isConnected: false,
        message: 'Server is not responding',
        error: healthCheck.error
      };
    }
    
    const mongoStatus = healthCheck.data.mongodbState || {};
    const isConnected = mongoStatus.readyState === 1;
    
    return {
      isConnected,
      message: isConnected 
        ? `Connected to MongoDB at ${mongoStatus.host}` 
        : `MongoDB connection issue: ${mongoStatus.status}`,
      details: mongoStatus
    };
  } catch (error) {
    console.error('Database connection test failed:', error.message);
    return {
      isConnected: false,
      message: 'Failed to test database connection',
      error: error.message
    };
  }
};

/**
 * Tests the email configuration via the server
 * @returns {Promise<Object>} The email configuration test result
 */
export const testEmailConfiguration = async () => {
  try {
    const healthCheck = await checkServerHealth();
    
    if (!healthCheck.isHealthy) {
      return {
        isConfigured: false,
        message: 'Server is not responding',
        error: healthCheck.error
      };
    }
    
    const emailConfig = healthCheck.data.emailConfig || {};
    const isConfigured = emailConfig.configured !== false;
    
    return {
      isConfigured,
      message: isConfigured 
        ? `Email configured with host: ${emailConfig.host}` 
        : 'Email is not properly configured',
      details: emailConfig
    };
  } catch (error) {
    console.error('Email configuration test failed:', error.message);
    return {
      isConfigured: false,
      message: 'Failed to test email configuration',
      error: error.message
    };
  }
};

// Create a named object before exporting as default
const serverHealthUtils = {
  checkServerHealth,
  testDatabaseConnection,
  testEmailConfiguration
};

export default serverHealthUtils; 