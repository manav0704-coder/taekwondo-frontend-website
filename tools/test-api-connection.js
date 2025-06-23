const axios = require('axios');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env files
const envFiles = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../.env.production')
];

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Loading environment from ${file}`);
    dotenv.config({ path: file });
  }
});

// Use environment variable for API URL with fallback
const API_URL = process.env.REACT_APP_API_URL || 'https://taekwondo-website-backend.onrender.com';

console.log('Testing connection to API:', API_URL);

async function testApiEndpoints() {
  const endpoints = [
    '/api/health',
    '/api/events',
    '/api/auth/test'
  ];
  
  console.log('\nTesting API endpoints:');
  console.log('-----------------------');
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\nTesting ${API_URL}${endpoint}...`);
      const startTime = Date.now();
      const response = await axios.get(`${API_URL}${endpoint}`, { 
        timeout: 10000,
        validateStatus: () => true // Accept any status code
      });
      const endTime = Date.now();
      const timeMs = endTime - startTime;
      
      console.log(`Status: ${response.status} ${response.statusText}`);
      console.log(`Response time: ${timeMs}ms`);
      
      if (response.status >= 200 && response.status < 300) {
        console.log('✅ Success');
        console.log('Response data:', typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data);
      } else {
        console.log('❌ Failed');
        console.log('Response:', response.data || 'No data');
      }
    } catch (error) {
      console.log('❌ Error:', error.message);
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      } else if (error.request) {
        console.log('No response received');
      }
    }
  }
}

async function testCors() {
  console.log('\nTesting CORS configuration:');
  console.log('---------------------------');
  
  try {
    console.log(`Sending preflight request to ${API_URL}/api/health...`);
    
    const response = await axios({
      method: 'OPTIONS',
      url: `${API_URL}/api/health`,
      headers: {
        'Origin': 'https://taekwondo-frontend-website.onrender.com',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type,Authorization'
      }
    });
    
    console.log('✅ Preflight request successful');
    console.log('Access-Control-Allow-Origin:', response.headers['access-control-allow-origin'] || 'Not set');
    console.log('Access-Control-Allow-Methods:', response.headers['access-control-allow-methods'] || 'Not set');
    console.log('Access-Control-Allow-Headers:', response.headers['access-control-allow-headers'] || 'Not set');
    
  } catch (error) {
    console.log('❌ CORS test failed:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Headers:', error.response.headers);
    }
  }
}

// Run tests
(async () => {
  await testApiEndpoints();
  await testCors();
  
  console.log('\n---------------------------------------');
  console.log('API connection test completed');
  console.log('---------------------------------------\n');
})(); 