// API Configuration
// Change this when deploying to production

const CONFIG = {
    // Development
    development: {
        API_URL: 'http://localhost:5000'
    },

    // Production - Update these values when deploying
    production: {
        API_URL: 'https://your-backend-url.com' // Replace with your actual backend URL
    }
};

// Automatically detect environment
// Set to 'production' when deploying
const ENVIRONMENT = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'development'
    : 'production';

// Export the API URL for the current environment
const API_URL = CONFIG[ENVIRONMENT].API_URL;

console.log(`Running in ${ENVIRONMENT} mode`);
console.log(`API URL: ${API_URL}`);
